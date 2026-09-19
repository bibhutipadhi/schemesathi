import { Scheme } from '../types';

const STORAGE_KEY_VIEWS = 'schemesathi_browsing_history';
const STORAGE_KEY_CATEGORIES = 'schemesathi_category_clicks';
const STORAGE_KEY_SEARCHES = 'schemesathi_recent_searches';

export interface UserInteractionEvent {
  schemeId: string;
  category: string;
  type: string;
  tags?: string[];
  department?: string;
  state?: string;
  whoCanApply?: string;
  timestamp: number;
}

export interface RecommendationMetadata {
  isRecommended: boolean;
  score: number;
  reason: string;
  matchedFeature?: string;
}

/**
 * Record a scheme view when user clicks details or explains eligibility
 */
export function trackSchemeView(scheme: Scheme): void {
  if (typeof window === 'undefined') return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_VIEWS);
    const history: UserInteractionEvent[] = raw ? JSON.parse(raw) : [];

    const newEvent: UserInteractionEvent = {
      schemeId: scheme.id,
      category: scheme.category,
      type: scheme.type,
      tags: scheme.tags || [],
      department: scheme.department,
      state: scheme.state,
      whoCanApply: scheme.whoCanApply,
      timestamp: Date.now(),
    };

    // Filter duplicate of same scheme in last 5 minutes to avoid inflating with rapid clicks
    const filtered = history.filter(
      (item) => !(item.schemeId === scheme.id && Date.now() - item.timestamp < 300000)
    );

    // Keep the most recent 50 interaction events
    const updated = [newEvent, ...filtered].slice(0, 50);
    localStorage.setItem(STORAGE_KEY_VIEWS, JSON.stringify(updated));

    // Also bump category clicks
    trackCategoryClick(scheme.category);
  } catch (err) {
    console.warn('Failed to record scheme view:', err);
  }
}

/**
 * Track category filter interactions
 */
export function trackCategoryClick(category: string): void {
  if (typeof window === 'undefined' || !category || category === 'All') return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    const catMap: Record<string, number> = raw ? JSON.parse(raw) : {};
    catMap[category] = (catMap[category] || 0) + 1;
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(catMap));
  } catch (err) {
    console.warn('Failed to record category interaction:', err);
  }
}

/**
 * Track user search keywords
 */
export function trackSearchQuery(query: string): void {
  if (typeof window === 'undefined' || !query || query.trim().length < 3) return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_SEARCHES);
    const searches: string[] = raw ? JSON.parse(raw) : [];
    const clean = query.trim().toLowerCase();
    const updated = [clean, ...searches.filter((s) => s !== clean)].slice(0, 15);
    localStorage.setItem(STORAGE_KEY_SEARCHES, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to record search query:', err);
  }
}

/**
 * Get browsing history from localStorage
 */
export function getBrowsingHistory(): UserInteractionEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VIEWS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

/**
 * Clear user browsing history (optional privacy reset)
 */
export function clearBrowsingHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY_VIEWS);
    localStorage.removeItem(STORAGE_KEY_CATEGORIES);
    localStorage.removeItem(STORAGE_KEY_SEARCHES);
  } catch (err) {
    console.warn('Failed to clear browsing history:', err);
  }
}

/**
 * Flagship schemes used for intelligent starter recommendations
 * when a first-time user has no saved items or browsing patterns yet.
 */
const STARTER_FLAGSHIP_IDS = new Set([
  'pm-kisan',
  'ayushman-bharat',
  'pm-awas-gramin',
  'pm-svanidhi',
  'ishan-uday-scholarship',
  'post-matric-sc-st',
]);

/**
 * Main recommendation algorithm:
 * Analyzes:
 * 1. Saved Schemes (Weight: 4.0) - Categories, tags, target beneficiaries, level
 * 2. Browsing History (Weight: 2.0) - Recently viewed scheme details
 * 3. Category Interactions (Weight: 1.0)
 * 4. Recent search terms
 *
 * Produces a Map of Scheme ID -> RecommendationMetadata with human-readable reason
 */
export function getRecommendationsMap(
  allSchemes: Scheme[],
  savedSchemeIds: string[]
): Map<string, RecommendationMetadata> {
  const resultMap = new Map<string, RecommendationMetadata>();
  const validSchemes = Array.isArray(allSchemes) ? allSchemes.filter((s) => s && s.id) : [];
  const validSavedIds = Array.isArray(savedSchemeIds) ? savedSchemeIds : [];
  const history = getBrowsingHistory();

  // Find actual saved scheme objects
  const savedSchemes = validSchemes.filter((s) => validSavedIds.includes(s.id));

  // Determine user interest profiles
  const categoryWeights: Record<string, number> = {};
  const tagWeights: Record<string, number> = {};
  const beneficiaryKeywords = new Set<string>();
  let scholarshipInterestCount = 0;
  let schemeInterestCount = 0;

  // 1. Ingest Saved Schemes (Strongest signal)
  for (const s of savedSchemes) {
    if (!s) continue;
    if (s.category) {
      categoryWeights[s.category] = (categoryWeights[s.category] || 0) + 4.0;
    }

    if (s.type === 'scholarship') scholarshipInterestCount += 3;
    else schemeInterestCount += 2;

    if (s.tags && Array.isArray(s.tags)) {
      for (const t of s.tags) {
        if (t && typeof t === 'string') {
          const key = t.toLowerCase();
          tagWeights[key] = (tagWeights[key] || 0) + 3.0;
        }
      }
    }

    // Extract beneficiary clues
    const occStr = Array.isArray(s.eligibility?.occupation) ? s.eligibility.occupation.join(' ') : '';
    const who = ((s.whoCanApply || '') + ' ' + occStr).toLowerCase();
    if (who.includes('farmer') || who.includes('agriculture') || who.includes('crop')) beneficiaryKeywords.add('Farmers');
    if (who.includes('student') || who.includes('college') || who.includes('school')) beneficiaryKeywords.add('Students');
    if (who.includes('women') || who.includes('girl') || who.includes('female')) beneficiaryKeywords.add('Women');
    if (who.includes('elderly') || who.includes('senior') || who.includes('pension')) beneficiaryKeywords.add('Senior Citizens');
    if (who.includes('vendor') || who.includes('business') || who.includes('msme') || who.includes('artisan')) beneficiaryKeywords.add('Small Businesses & Vendors');
  }

  // 2. Ingest Browsing History (Moderate signal)
  for (const event of (Array.isArray(history) ? history : [])) {
    if (!event) continue;
    // Recency decay: events within the last 24h get full weight, older events get 0.6x
    const timestamp = typeof event.timestamp === 'number' ? event.timestamp : Date.now();
    const hoursOld = (Date.now() - timestamp) / 3600000;
    const recencyMultiplier = hoursOld < 24 ? 1.0 : hoursOld < 72 ? 0.7 : 0.4;

    if (event.category) {
      categoryWeights[event.category] = (categoryWeights[event.category] || 0) + 2.0 * recencyMultiplier;
    }

    if (event.type === 'scholarship') scholarshipInterestCount += 1.5;
    else schemeInterestCount += 1;

    if (event.tags && Array.isArray(event.tags)) {
      for (const t of event.tags) {
        if (t && typeof t === 'string') {
          const key = t.toLowerCase();
          tagWeights[key] = (tagWeights[key] || 0) + 1.5 * recencyMultiplier;
        }
      }
    }

    const who = (event.whoCanApply || '').toLowerCase();
    if (who.includes('farmer')) beneficiaryKeywords.add('Farmers');
    if (who.includes('student')) beneficiaryKeywords.add('Students');
    if (who.includes('women') || who.includes('girl')) beneficiaryKeywords.add('Women');
  }

  // 3. Ingest Category Click counts
  if (typeof window !== 'undefined') {
    try {
      const rawCat = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      if (rawCat) {
        const catClicks: Record<string, number> = JSON.parse(rawCat);
        for (const [cat, clicks] of Object.entries(catClicks)) {
          categoryWeights[cat] = (categoryWeights[cat] || 0) + Math.min((clicks || 0) * 0.8, 4.0);
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // Check if we have active user activity profile
  const hasActivity = savedSchemes.length > 0 || (Array.isArray(history) && history.length > 0);

  // Find top categories by weight
  const sortedCategories = Object.entries(categoryWeights)
    .sort((a, b) => b[1] - a[1])
    .filter(([_, w]) => w >= 2.0);

  const topCategoryName = sortedCategories.length > 0 ? sortedCategories[0][0] : null;

  // Score all schemes
  const scoredList: { scheme: Scheme; score: number; reason: string }[] = [];

  for (const s of validSchemes) {
    let score = 0;
    let reason = '';

    // If scheme matches user's top categories
    const catWeight = (s.category && categoryWeights[s.category]) || 0;
    if (catWeight > 0) {
      score += catWeight * 1.5;
    }

    // If scheme tags match user tags
    if (s.tags && Array.isArray(s.tags)) {
      for (const t of s.tags) {
        if (t && typeof t === 'string') {
          const tw = tagWeights[t.toLowerCase()] || 0;
          if (tw > 0) {
            score += tw * 1.2;
          }
        }
      }
    }

    // Type preference bonus
    if (s.type === 'scholarship' && scholarshipInterestCount > schemeInterestCount) {
      score += 2.0;
    } else if (s.type === 'scheme' && schemeInterestCount > scholarshipInterestCount) {
      score += 1.0;
    }

    // Beneficiary match bonus
    const occStr = Array.isArray(s.eligibility?.occupation) ? s.eligibility.occupation.join(' ') : '';
    const schemeBeneficiaryText = ((s.whoCanApply || '') + ' ' + occStr).toLowerCase();
    for (const b of beneficiaryKeywords) {
      if (
        (b === 'Farmers' && (schemeBeneficiaryText.includes('farmer') || schemeBeneficiaryText.includes('agriculture'))) ||
        (b === 'Students' && (schemeBeneficiaryText.includes('student') || schemeBeneficiaryText.includes('college'))) ||
        (b === 'Women' && (schemeBeneficiaryText.includes('women') || schemeBeneficiaryText.includes('girl'))) ||
        (b === 'Senior Citizens' && (schemeBeneficiaryText.includes('senior') || schemeBeneficiaryText.includes('pension'))) ||
        (b === 'Small Businesses & Vendors' && (schemeBeneficiaryText.includes('vendor') || schemeBeneficiaryText.includes('business')))
      ) {
        score += 3.5;
        if (!reason) {
          reason = `Recommended for ${b} based on your interests`;
        }
      }
    }

    // Open or closing soon status bonus
    if (s.status === 'Open' || s.status === 'Closing Soon') {
      score += 1.0;
    }

    // Formulate a clean, specific reason
    if (!reason && s.category === topCategoryName) {
      if (savedSchemes.some((saved) => saved?.category === s.category)) {
        reason = `Based on your saved ${s.category} schemes`;
      } else {
        reason = `Matches your frequent browsing in ${s.category}`;
      }
    } else if (!reason && catWeight >= 3.0) {
      reason = `Matches your interest in ${s.category}`;
    } else if (!reason && s.type === 'scholarship' && scholarshipInterestCount > 3) {
      reason = `Recommended scholarship based on your student profile`;
    }

    scoredList.push({ scheme: s, score, reason });
  }

  // Sort by highest score
  scoredList.sort((a, b) => b.score - a.score);

  // If user has activity: top 25-30% of highest-scoring schemes (min score 4.5) get recommended
  if (hasActivity) {
    const thresholdScore = 4.5;
    const maxRecommendations = Math.min(12, Math.max(4, Math.floor(validSchemes.length * 0.25)));

    let count = 0;
    for (const item of scoredList) {
      if (item.score >= thresholdScore && count < maxRecommendations) {
        resultMap.set(item.scheme.id, {
          isRecommended: true,
          score: item.score,
          reason: item.reason || (topCategoryName ? `Matches your interest in ${topCategoryName}` : 'Recommended based on your activity'),
        });
        count++;
      } else {
        resultMap.set(item.scheme.id, {
          isRecommended: false,
          score: item.score,
          reason: '',
        });
      }
    }
  } else {
    // New user fallback: highlight flagship starter schemes
    for (const s of validSchemes) {
      if (STARTER_FLAGSHIP_IDS.has(s.id)) {
        resultMap.set(s.id, {
          isRecommended: true,
          score: 5.0,
          reason: 'National Flagship Scheme • High Public Impact',
        });
      } else {
        resultMap.set(s.id, {
          isRecommended: false,
          score: 0,
          reason: '',
        });
      }
    }
  }

  return resultMap;
}
