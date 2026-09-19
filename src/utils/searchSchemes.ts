import { Scheme } from '../types';

/**
 * Normalizes text by removing punctuation while preserving Unicode alphanumeric characters
 * (such as Devanagari, Bengali, Odia, Tamil, Telugu) and collapsing extra spaces.
 */
function normalizeText(text: string): string {
  return (text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Common civic terms synonym expansions to ensure citizens find schemes even when using common colloquial or Indic terms.
 */
const SYNONYM_MAP: Record<string, string[]> = {
  'pm': ['pradhan', 'mantri', 'pm', 'central', 'प्रधान', 'मंत्री'],
  'kisan': ['farmer', 'agriculture', 'krushak', 'farming', 'crop', 'किसान', 'କୃଷକ', 'krishi'],
  'farmer': ['kisan', 'agriculture', 'krushak', 'cultivator', 'किसान', 'କୃଷକ'],
  'farmers': ['kisan', 'agriculture', 'krushak', 'cultivator', 'किसान'],
  'किसान': ['kisan', 'farmer', 'agriculture', 'krushak', 'pm-kisan'],
  'କୃଷକ': ['kisan', 'farmer', 'agriculture', 'kalia'],
  'scholarship': ['scholarships', 'education', 'stipend', 'student', 'college', 'school', 'tuition', 'छात्रवृत्ति', 'ଛାତ୍ରବୃତ୍ତି'],
  'scholarships': ['scholarship', 'education', 'stipend', 'student', 'छात्रवृत्ति'],
  'छात्रवृत्ति': ['scholarship', 'scholarships', 'student', 'education', 'stipend'],
  'student': ['scholarship', 'education', 'college', 'school', 'matric', 'छात्र', 'ଛାତ୍ର'],
  'students': ['scholarship', 'education', 'college', 'school', 'matric', 'छात्र'],
  'छात्र': ['student', 'students', 'scholarship'],
  'girl': ['female', 'women', 'daughter', 'pragati', 'ladli', 'kanya', 'बेटी', 'बालिका'],
  'girls': ['female', 'women', 'daughter', 'pragati', 'ladli', 'kanya', 'बेटी', 'बालिका'],
  'women': ['female', 'girl', 'girls', 'mother', 'mahila', 'महिला'],
  'महिला': ['women', 'female', 'mahila', 'ladli'],
  'health': ['healthcare', 'hospital', 'medical', 'ayushman', 'pmjay', 'treatment', 'स्वास्थ्य', 'ଚିକିତ୍ସା'],
  'स्वास्थ्य': ['health', 'ayushman', 'pmjay', 'hospital', 'medical'],
  'hospital': ['health', 'healthcare', 'medical', 'ayushman', 'pmjay'],
  'loan': ['credit', 'mudra', 'svanidhi', 'pmegp', 'subsidy', 'business', 'ऋण', 'लोन'],
  'ऋण': ['loan', 'mudra', 'credit', 'subsidy'],
  'लोन': ['loan', 'mudra', 'credit', 'subsidy'],
  'business': ['msme', 'loan', 'mudra', 'enterprise', 'startup', 'vendor', 'व्यापार'],
  'house': ['housing', 'awas', 'pmay', 'home', 'आवास', 'घर'],
  'housing': ['house', 'awas', 'pmay', 'home', 'shelter', 'आवास'],
  'awas': ['housing', 'house', 'pmay', 'home', 'आवास'],
  'आवास': ['awas', 'housing', 'house', 'pmay', 'home'],
  'योजना': ['scheme', 'yojana', 'pradhan'],
  'ayushman': ['pmjay', 'health', 'hospital', 'cashless', 'medical'],
  'pension': ['atal', 'apy', 'retirement', 'senior', 'old age', 'पेंशन'],
  'ration': ['food', 'grain', 'pds', 'nfsa', 'free ration', 'राशन'],
  'राशन': ['ration', 'food', 'grain', 'pds', 'nfsa'],
  'solar': ['surya', 'rooftop', 'bijli', 'electricity', 'सौर', 'सोलर'],
  'बिजली': ['electricity', 'bijli', 'solar', 'surya'],
};

/**
 * Advanced multi-token, alias-aware search matcher for government schemes and scholarships.
 */
export function matchSchemeSearch(scheme: Scheme, rawQuery: string): boolean {
  if (!scheme || typeof scheme !== 'object') {
    return false;
  }

  if (!rawQuery || rawQuery.trim() === '') {
    return true;
  }

  const query = rawQuery.trim().toLowerCase();
  const normalizedQuery = normalizeText(query);
  const queryTokens = normalizedQuery.split(' ').filter((t) => t.length > 0);

  if (queryTokens.length === 0) {
    return true;
  }

  // Build searchable text corpus safely
  const rawFields: string[] = [
    scheme.id || '',
    (scheme.id || '').replace(/-/g, ' '),
    scheme.name || '',
    scheme.shortDescription || '',
    scheme.description || '',
    scheme.department || '',
    scheme.state || '',
    scheme.category || '',
    scheme.level || '',
    scheme.type || '',
    scheme.whoCanApply || '',
    scheme.benefitsHighlight || '',
    scheme.verifiedSource || '',
    ...(Array.isArray(scheme.benefits) ? scheme.benefits : []),
    ...(Array.isArray(scheme.tags) ? scheme.tags : []),
    ...(Array.isArray(scheme.documents) ? scheme.documents.map((d) => d?.name || '') : []),
    scheme.eligibility?.gender || '',
    scheme.eligibility?.educationRequired || '',
    ...(Array.isArray(scheme.eligibility?.casteCategory) ? scheme.eligibility.casteCategory : []),
    ...(Array.isArray(scheme.eligibility?.occupation) ? scheme.eligibility.occupation : []),
  ];

  const rawCorpus = rawFields.join(' ').toLowerCase();
  const normalizedCorpus = normalizeText(rawCorpus);

  // 1. Direct continuous match
  if (rawCorpus.includes(query) || normalizedCorpus.includes(normalizedQuery)) {
    return true;
  }

  // 2. All tokens must match or have an expanded synonym match
  const allTokensMatch = queryTokens.every((token) => {
    // Exact token match in normalized corpus
    if (normalizedCorpus.includes(token)) {
      return true;
    }

    // Check token with hyphens (e.g. "pm-kisan")
    if (rawCorpus.includes(token)) {
      return true;
    }

    // Check synonyms
    const synonyms = SYNONYM_MAP[token];
    if (synonyms && synonyms.some((syn) => normalizedCorpus.includes(syn))) {
      return true;
    }

    return false;
  });

  return allTokensMatch;
}
