import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  Filter, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Bot, 
  ShieldCheck, 
  Scale, 
  Layers,
  GraduationCap,
  Landmark,
  Compass,
  MapPin,
  Bookmark,
  X,
  HardDrive,
  AlertTriangle,
  RefreshCw,
  Zap,
  Bell
} from 'lucide-react';
import { Scheme, LanguageCode, SchemeCategory } from './types';
import { INITIAL_SCHEMES } from './data/schemes';
import { ALL_INDIAN_STATES } from './data/states';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ScamWarningBanner } from './components/ScamWarningBanner';
import { Hero } from './components/Hero';
import { SchemeCard } from './components/SchemeCard';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { LiveUpdatesTicker } from './components/LiveUpdatesTicker';
import { NewlyUpdatedSchemesSection } from './components/NewlyUpdatedSchemesSection';
import { FindSchemesWizard } from './components/FindSchemesWizard';
import { ScholarshipsView } from './components/ScholarshipsView';
import { StateSchemesView } from './components/StateSchemesView';
import { SavedSchemesView } from './components/SavedSchemesView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { SchemeComparisonModal } from './components/SchemeComparisonModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ReportIssueModal } from './components/ReportIssueModal';
import { Footer } from './components/Footer';
import { DeadlineNotificationBanner } from './components/DeadlineNotificationBanner';
import { StorageManagerModal } from './components/StorageManagerModal';
import { BenefitsCalculator } from './components/BenefitsCalculator';
import { DocumentLocker } from './components/DocumentLocker';
import { HelplineDirectory } from './components/HelplineDirectory';
import { CivicQuiz } from './components/CivicQuiz';
import { 
  checkAndNotifyApproachingDeadlines, 
  ApproachingDeadline,
  requestNotificationPermission,
  sendBrowserNotification 
} from './utils/notificationService';
import { 
  getRecommendationsMap, 
  trackSchemeView, 
  trackCategoryClick, 
  trackSearchQuery 
} from './utils/recommendationEngine';
import { matchSchemeSearch } from './utils/searchSchemes';
import { sanitizeScheme } from './utils/sanitizeScheme';
import { 
  getLocalStorageStats, 
  cleanupOlderSearchesAndHistory, 
  StorageStats, 
  STORAGE_KEYS 
} from './utils/storageManager';

export const App: React.FC = () => {
  // Theme State (Light / Dark mode persisted in localStorage)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('schemesathi_theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('schemesathi_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 1. Language State
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('schemesathi_lang');
    return (saved as LanguageCode) || 'en';
  });

  const handleSelectLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('schemesathi_lang', lang);
  };

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // 2. Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');

  // 3. Schemes Database
  const [schemes, setSchemes] = useState<Scheme[]>(() => {
    const cached = localStorage.getItem('schemesathi_schemes_db');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter((s) => s && s.id).map(sanitizeScheme);
        }
      } catch (e) {
        return INITIAL_SCHEMES.map(sanitizeScheme);
      }
    }
    return INITIAL_SCHEMES.map(sanitizeScheme);
  });

  // Save to localStorage when schemes change
  useEffect(() => {
    try {
      localStorage.setItem('schemesathi_schemes_db', JSON.stringify(schemes));
    } catch (e) {
      // If quota exceeded, auto-clean older searches and history
      try {
        cleanupOlderSearchesAndHistory();
        localStorage.setItem('schemesathi_schemes_db', JSON.stringify(schemes));
      } catch (retryErr) {
        // ignore
      }
    }
  }, [schemes]);

  // 3.1 LocalStorage Monitoring & Automatic Cleanup State
  const [storageStats, setStorageStats] = useState<StorageStats>(() => getLocalStorageStats());
  const [autoCleanupEnabled, setAutoCleanupEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(STORAGE_KEYS.AUTO_CLEANUP);
    return stored !== 'false';
  });
  const [storageWarningDismissed, setStorageWarningDismissed] = useState<boolean>(false);
  const [cleanupNotification, setCleanupNotification] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);
  const [isStorageModalOpen, setIsStorageModalOpen] = useState<boolean>(false);

  const refreshStorage = useCallback(() => {
    const stats = getLocalStorageStats();
    setStorageStats(stats);
    return stats;
  }, []);

  const handleToggleAutoCleanup = (enabled: boolean) => {
    setAutoCleanupEnabled(enabled);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTO_CLEANUP, String(enabled));
    } catch (e) {
      // ignore
    }
  };

  const handleManualStorageCleanup = () => {
    const result = cleanupOlderSearchesAndHistory();
    refreshStorage();
    setCleanupNotification({
      message: result.message,
      type: 'success',
    });
    setStorageWarningDismissed(true);
    setTimeout(() => setCleanupNotification(null), 5000);
  };

  // Monitor storage quota periodically and trigger auto-cleanup if critical limit is reached
  useEffect(() => {
    const checkStorageAndAutoClean = () => {
      const stats = refreshStorage();

      // If critical limit reached and auto cleanup is enabled
      if (stats.isCritical && autoCleanupEnabled) {
        console.warn('LocalStorage limit reached! Automatically cleaning older queries and history...');
        const result = cleanupOlderSearchesAndHistory();
        refreshStorage();
        setCleanupNotification({
          message: `Storage limit reached: Automatically freed ${result.freedFormatted} by pruning older search queries and browsing history.`,
          type: 'success',
        });
        setTimeout(() => setCleanupNotification(null), 6000);
      }
    };

    // Initial check
    checkStorageAndAutoClean();

    // Check periodically every 20 seconds
    const interval = setInterval(checkStorageAndAutoClean, 20000);

    window.addEventListener('focus', checkStorageAndAutoClean);
    window.addEventListener('storage', checkStorageAndAutoClean);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkStorageAndAutoClean);
      window.removeEventListener('storage', checkStorageAndAutoClean);
    };
  }, [autoCleanupEnabled, refreshStorage]);

  // Fetch from server on mount if available
  useEffect(() => {
    fetch('/api/schemes')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.schemes) && data.schemes.length > 0) {
          // Keep user additions while synchronizing
          setSchemes((prev) => {
            const map = new Map(prev.filter((s) => s && s.id).map((s) => [s.id, s]));
            data.schemes.forEach((s: any) => {
              if (s && s.id && !map.has(s.id)) {
                map.set(s.id, sanitizeScheme(s));
              }
            });
            return Array.from(map.values());
          });
        }
      })
      .catch(() => {
        // Use local state if server is offline
      });
  }, []);

  // 4. Saved Bookmarks
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('schemesathi_saved');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    }
    return ['pm-kisan', 'ishan-uday-scholarship'];
  });

  const handleToggleSave = (schemeId: string) => {
    setSavedSchemeIds((prev) => {
      const next = prev.includes(schemeId)
        ? prev.filter((id) => id !== schemeId)
        : [...prev, schemeId];
      try {
        localStorage.setItem('schemesathi_saved', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const handleClearAllSaved = () => {
    setSavedSchemeIds([]);
    try {
      localStorage.removeItem('schemesathi_saved');
    } catch (e) {
      // ignore
    }
  };

  // 5. Comparison State
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareToast, setCompareToast] = useState<string | null>(null);

  const handleToggleCompare = (id: string) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        setCompareToast('You can compare a maximum of 3 schemes at a time.');
        setTimeout(() => setCompareToast(null), 3500);
        return prev;
      }
      return [...prev, id];
    });
  };

  // 6. Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory | 'All'>('All');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('All');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'All' | 'scheme' | 'scholarship'>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [showRecommendedOnly, setShowRecommendedOnly] = useState(false);
  const [showNewAndUpdatedOnly, setShowNewAndUpdatedOnly] = useState(false);
  const [browsingVersion, setBrowsingVersion] = useState(0);

  // Recommendations calculated based on saved schemes, category interest, and browsing history
  const recommendationsMap = useMemo(() => {
    return getRecommendationsMap(schemes, savedSchemeIds);
  }, [schemes, savedSchemeIds, browsingVersion]);

  const recommendedCount = useMemo(() => {
    let count = 0;
    recommendationsMap.forEach((meta) => {
      if (meta.isRecommended) count++;
    });
    return count;
  }, [recommendationsMap]);

  const newAndUpdatedCount = useMemo(() => {
    return (Array.isArray(schemes) ? schemes : []).filter(
      (s) => s && (s.isNewlyAdded || s.isUpdated || (s.updateSummary && s.updateSummary.trim().length > 0))
    ).length;
  }, [schemes]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStateFilter('All');
    setSelectedTypeFilter('All');
    setSelectedStatusFilter('All');
    setShowRecommendedOnly(false);
    setShowNewAndUpdatedOnly(false);
  };

  // 7. Modals & Drawer State
  const [detailModalScheme, setDetailModalScheme] = useState<Scheme | null>(null);

  const handleViewDetails = (scheme: Scheme) => {
    trackSchemeView(scheme);
    setBrowsingVersion((v) => v + 1);
    setDetailModalScheme(scheme);
    refreshStorage();
  };

  const handleSelectCategory = (category: SchemeCategory | 'All') => {
    setSelectedCategory(category);
    if (category !== 'All') {
      trackCategoryClick(category);
      setBrowsingVersion((v) => v + 1);
      refreshStorage();
    }
  };

  // Debounced search query tracking ref to avoid blocking UI typing thread in Chrome
  const searchTrackTimerRef = useRef<any>(null);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (searchTrackTimerRef.current) {
      clearTimeout(searchTrackTimerRef.current);
    }
    if (q.trim().length >= 3) {
      searchTrackTimerRef.current = setTimeout(() => {
        trackSearchQuery(q);
      }, 600);
    }
  };

  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantInitialPrompt, setAssistantInitialPrompt] = useState<string>('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportPreSelectedSchemeId, setReportPreSelectedSchemeId] = useState<string>('');

  // 8. Citizen Reports for Admin
  const [reports, setReports] = useState<Array<{
    id: string;
    schemeId: string;
    schemeName: string;
    issueType: string;
    description: string;
    reportedAt: string;
    contactEmail?: string;
  }>>(() => {
    const cached = localStorage.getItem('schemesathi_reports');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'rep_init_1',
        schemeId: 'pm-kisan-01',
        schemeName: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        issueType: 'Expired Deadline',
        description: 'The 17th installment release date needs update to the latest notification.',
        reportedAt: new Date(Date.now() - 86400000).toISOString(),
        contactEmail: 'citizen@example.gov.in',
      },
    ];
  });

  const handleAddReport = (report: any) => {
    setReports((prev) => {
      const updated = [report, ...prev];
      localStorage.setItem('schemesathi_reports', JSON.stringify(updated));
      return updated;
    });
  };

  const handleResolveReport = (reportId: string) => {
    setReports((prev) => {
      const updated = prev.filter((r) => r.id !== reportId);
      localStorage.setItem('schemesathi_reports', JSON.stringify(updated));
      return updated;
    });
  };

  // 9. Admin Scheme Operations
  const handleAddScheme = (newScheme: Scheme) => {
    setSchemes((prev) => [newScheme, ...prev]);
  };

  const handleUpdateScheme = (updatedScheme: Scheme) => {
    setSchemes((prev) => prev.map((s) => (s.id === updatedScheme.id ? updatedScheme : s)));
  };

  const handleDeleteScheme = (id: string) => {
    setSchemes((prev) => prev.filter((s) => s.id !== id));
  };

  // 10. Filtered Schemes Memo
  const filteredSchemes = useMemo(() => {
    return (Array.isArray(schemes) ? schemes : []).filter((scheme) => {
      if (!scheme || !scheme.id) return false;

      // Search term (smart multi-token and synonym-aware matcher)
      if (searchQuery.trim() !== '') {
        if (!matchSchemeSearch(scheme, searchQuery)) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && scheme.category !== selectedCategory) {
        return false;
      }

      // State / UT
      if (selectedStateFilter !== 'All') {
        if (scheme.state !== selectedStateFilter && scheme.state !== 'All India') {
          return false;
        }
      }

      // Type (scheme vs scholarship)
      if (selectedTypeFilter !== 'All' && scheme.type !== selectedTypeFilter) {
        return false;
      }

      // Status
      if (selectedStatusFilter !== 'All' && scheme.status !== selectedStatusFilter) {
        return false;
      }

      // Recommended Only Filter
      if (showRecommendedOnly && !recommendationsMap.get(scheme.id)?.isRecommended) {
        return false;
      }

      // New & Updated Only Filter
      if (showNewAndUpdatedOnly && !scheme.isNewlyAdded && !scheme.isUpdated && !(scheme.updateSummary && scheme.updateSummary.trim().length > 0)) {
        return false;
      }

      return true;
    });
  }, [schemes, searchQuery, selectedCategory, selectedStateFilter, selectedTypeFilter, selectedStatusFilter, showRecommendedOnly, showNewAndUpdatedOnly, recommendationsMap]);

  // Overall search match count across all schemes (ignoring category/state filters)
  const totalSearchMatches = useMemo(() => {
    const list = Array.isArray(schemes) ? schemes.filter((s) => s && s.id) : [];
    if (!searchQuery.trim()) return list.length;
    return list.filter((s) => matchSchemeSearch(s, searchQuery)).length;
  }, [schemes, searchQuery]);

  // Derived Saved Schemes
  const savedSchemes = useMemo(() => {
    return (Array.isArray(schemes) ? schemes : []).filter((s) => s && s.id && savedSchemeIds.includes(s.id));
  }, [schemes, savedSchemeIds]);

  // Derived Compared Schemes
  const comparedSchemes = useMemo(() => {
    return (Array.isArray(schemes) ? schemes : []).filter((s) => s && s.id && selectedForCompare.includes(s.id));
  }, [schemes, selectedForCompare]);

  // 7. Approaching Deadline Alert System
  const [notificationThresholdDays, setNotificationThresholdDays] = useState<number>(() => {
    const saved = localStorage.getItem('schemesathi_notify_days');
    return saved ? parseInt(saved, 10) : 3;
  });

  const handleUpdateThresholdDays = (days: number) => {
    setNotificationThresholdDays(days);
    localStorage.setItem('schemesathi_notify_days', days.toString());
  };

  const [activeDeadlineAlert, setActiveDeadlineAlert] = useState<ApproachingDeadline | null>(null);

  // Check approaching deadlines when savedSchemes or threshold changes
  useEffect(() => {
    if (savedSchemes.length > 0) {
      const urgentList = checkAndNotifyApproachingDeadlines(
        savedSchemes,
        notificationThresholdDays,
        (scheme) => setDetailModalScheme(scheme)
      );

      if (urgentList.length > 0) {
        const sessionDismissed = sessionStorage.getItem('schemesathi_dismissed_alert_id');
        if (sessionDismissed !== urgentList[0].scheme.id) {
          setActiveDeadlineAlert(urgentList[0]);
        }
      }
    }
  }, [savedSchemes, notificationThresholdDays]);

  const handleTriggerTestAlert = async () => {
    const target = savedSchemes.find((s) => s.id === 'ishan-uday-scholarship') || savedSchemes[0] || schemes[0];
    if (!target) return;

    await requestNotificationPermission();
    sendBrowserNotification(`⏰ Deadline Alert: ${target.name}`, {
      body: `Application deadline closes in 3 days (${target.deadline}). Don't miss out on your benefits!`,
      tag: 'test-deadline-alert',
      onClick: () => setDetailModalScheme(target),
    });

    setActiveDeadlineAlert({
      scheme: target,
      daysRemaining: 3,
      deadlineText: target.deadline,
      isUrgent: true,
    });
  };

  // Open Assistant with specific prompt
  const handleOpenAssistantWithPrompt = (prompt: string) => {
    setAssistantInitialPrompt(prompt);
    setIsAssistantOpen(true);
  };

  const handleOpenReportModal = (schemeId?: string) => {
    setReportPreSelectedSchemeId(schemeId || '');
    setIsReportModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans flex flex-col selection:bg-amber-200 dark:selection:bg-amber-800 selection:text-amber-950 dark:selection:text-amber-100 transition-colors">
      {/* 1. Official Header & Language Selector */}
      <Navbar
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        savedCount={savedSchemeIds.length}
        savedSchemes={savedSchemes}
        onOpenAssistant={() => {
          setAssistantInitialPrompt('');
          setIsAssistantOpen(true);
        }}
        onOpenReportModal={() => handleOpenReportModal()}
        onViewDetails={handleViewDetails}
        thresholdDays={notificationThresholdDays}
        onUpdateThresholdDays={handleUpdateThresholdDays}
        onTriggerTestAlert={handleTriggerTestAlert}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        storageStats={storageStats}
        onOpenStorageModal={() => setIsStorageModalOpen(true)}
      />

      {/* 2. Official Scam Warning Banner */}
      <ScamWarningBanner
        currentLanguage={currentLanguage}
        onOpenReportModal={() => handleOpenReportModal()}
      />

      {/* 2.05 Real-Time Scheme Updates & Gazette Ticker */}
      <LiveUpdatesTicker
        schemes={schemes}
        currentLanguage={currentLanguage}
        onViewDetails={handleViewDetails}
        onFilterNewUpdates={() => {
          setActiveTab('home');
          setShowNewAndUpdatedOnly(true);
          const el = document.getElementById('schemes-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2.1 Storage Limit Warning Banner */}
      {storageStats.isWarning && !storageWarningDismissed && (
        <div 
          id="storage-limit-warning-banner"
          className="bg-amber-500 text-stone-950 px-4 py-2.5 shadow-md border-b border-amber-600 transition-all animate-in slide-in-from-top-2"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-stone-950/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-stone-950 animate-bounce" />
              </div>
              <div className="leading-tight">
                <span className="font-bold text-stone-950 block sm:inline mr-1">
                  Storage Limit Warning:
                </span>
                <span className="text-stone-900">
                  Local cache usage has reached <strong>{storageStats.totalFormatted}</strong> ({storageStats.percentageUsed}% of ~{storageStats.maxQuotaFormatted}). 
                  Older search queries and browsing history will be automatically cleaned when limits are exceeded.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={handleManualStorageCleanup}
                className="px-3 py-1.5 bg-stone-950 hover:bg-stone-900 text-white font-semibold rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1.5 shadow-xs"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Clean Searches &amp; History</span>
              </button>
              <button
                onClick={() => setIsStorageModalOpen(true)}
                className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-stone-950 hover:text-white font-medium rounded-lg transition-colors cursor-pointer text-xs"
              >
                Manage Storage
              </button>
              <button
                onClick={() => setStorageWarningDismissed(true)}
                className="p-1.5 hover:bg-amber-600/30 rounded-lg text-stone-900 cursor-pointer"
                title="Dismiss warning"
                aria-label="Dismiss storage warning"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2.2 Floating Auto-Cleanup Toast Notification */}
      {cleanupNotification && (
        <div 
          id="storage-cleanup-toast"
          className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:max-w-md bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-4 py-3 rounded-2xl shadow-2xl border border-stone-700 dark:border-stone-300 text-xs flex items-center gap-3 animate-in slide-in-from-bottom-3"
        >
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="flex-1 font-medium leading-relaxed">{cleanupNotification.message}</span>
          <button 
            onClick={() => setCleanupNotification(null)}
            className="p-1 text-stone-400 hover:text-white dark:hover:text-stone-950 rounded cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3. Main Views Router */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {activeTab === 'home' && (
          <div>
            <Hero
              currentLanguage={currentLanguage}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
              onLaunchWizard={() => {
                setActiveTab('find-wizard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAssistant={() => {
                setAssistantInitialPrompt('');
                setIsAssistantOpen(true);
              }}
              totalSchemesCount={schemes.length}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Newly Added & Recently Updated Schemes Highlight Showcase */}
            <NewlyUpdatedSchemesSection
              schemes={schemes}
              currentLanguage={currentLanguage}
              onViewDetails={handleViewDetails}
              onViewAllUpdates={() => {
                setShowNewAndUpdatedOnly(true);
                const el = document.getElementById('schemes-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Filter and Scheme Grid Section */}
            <section id="schemes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Filter Controls Bar */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-4 sm:p-5 shadow-xs mb-8 transition-colors">
                {/* Search Bar inside Filter Controls */}
                <div className="mb-4">
                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                      <Search className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                    </div>
                    <input
                      id="filter-inline-search-input"
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      placeholder="Search schemes by name, keyword, state, beneficiary or department (e.g. 'Kisan', 'Mudra', 'Scholarship', 'Odisha')..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.nativeEvent as any).isComposing) {
                          return;
                        }
                      }}
                      className="w-full pl-10 pr-10 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 text-xs sm:text-sm placeholder-stone-500 dark:placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        id="filter-search-clear-btn"
                        onClick={() => handleSearchChange('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                        title="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-amber-700 dark:text-amber-500" />
                    <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {t.filters.title}
                    </h2>
                    <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-full font-semibold">
                      {filteredSchemes.length} schemes found
                    </span>
                    {searchQuery.trim() && (
                      <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                        for "{searchQuery}"
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowRecommendedOnly(!showRecommendedOnly)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        showRecommendedOnly
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80'
                      }`}
                      title="Filter schemes flagged as Recommended for You based on your saved items & activity"
                    >
                      <Sparkles className={`w-3.5 h-3.5 ${showRecommendedOnly ? 'text-amber-200 fill-amber-200' : 'text-amber-600 fill-amber-500'}`} />
                      <span>Recommended for You</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        showRecommendedOnly ? 'bg-amber-800 text-white' : 'bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100'
                      }`}>
                        {recommendedCount}
                      </span>
                    </button>

                    <button
                      onClick={() => setShowNewAndUpdatedOnly(!showNewAndUpdatedOnly)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        showNewAndUpdatedOnly
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80'
                      }`}
                      title="Filter schemes that are newly added or recently updated"
                    >
                      <Zap className={`w-3.5 h-3.5 ${showNewAndUpdatedOnly ? 'text-emerald-200 fill-emerald-200' : 'text-emerald-600 fill-emerald-500'}`} />
                      <span>New &amp; Updated</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        showNewAndUpdatedOnly ? 'bg-emerald-800 text-white' : 'bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100'
                      }`}>
                        {newAndUpdatedCount}
                      </span>
                    </button>

                    {selectedForCompare.length >= 2 && (
                      <button
                        onClick={() => setIsCompareModalOpen(true)}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Scale className="w-4 h-4" />
                        <span>Compare ({selectedForCompare.length})</span>
                      </button>
                    )}
                    {(searchQuery || selectedCategory !== 'All' || selectedStateFilter !== 'All' || selectedTypeFilter !== 'All' || selectedStatusFilter !== 'All' || showRecommendedOnly || showNewAndUpdatedOnly) && (
                      <button
                        onClick={handleResetFilters}
                        className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 px-3 py-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{t.filters.reset}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Dropdowns Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-xs">
                  {/* Category Dropdown */}
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      {t.filters.categoryLabel}
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl p-2 font-medium text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="All">{t.filters.allCategories}</option>
                      <option value="Education">Education &amp; Scholarships</option>
                      <option value="Agriculture">Agriculture &amp; Farmers</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Business">Business &amp; Loans</option>
                      <option value="Housing">Housing</option>
                      <option value="Women">Women &amp; Girls</option>
                      <option value="Employment">Jobs &amp; Skilling</option>
                      <option value="Financial Assistance">Financial Assistance</option>
                    </select>
                  </div>

                  {/* State Dropdown */}
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      {t.filters.stateLabel}
                    </label>
                    <select
                      value={selectedStateFilter}
                      onChange={(e) => setSelectedStateFilter(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl p-2 font-medium text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="All">{t.filters.allStates}</option>
                      <option value="All India">All India (Central Schemes)</option>
                      {ALL_INDIAN_STATES.map((st) => (
                        <option key={st.code} value={st.name}>
                          {st.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Type Dropdown */}
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      {t.filters.typeLabel}
                    </label>
                    <select
                      value={selectedTypeFilter}
                      onChange={(e) => setSelectedTypeFilter(e.target.value as any)}
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl p-2 font-medium text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="All">{t.filters.allTypes}</option>
                      <option value="scheme">Government Schemes Only</option>
                      <option value="scholarship">Student Scholarships Only</option>
                    </select>
                  </div>

                  {/* Application Status Dropdown */}
                  <div>
                    <label className="block font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      {t.filters.statusLabel}
                    </label>
                    <select
                      value={selectedStatusFilter}
                      onChange={(e) => setSelectedStatusFilter(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl p-2 font-medium text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
                    >
                      <option value="All">{t.filters.allStatuses}</option>
                      <option value="Open">Application Open</option>
                      <option value="Closing Soon">Closing Soon</option>
                      <option value="Ongoing">Ongoing / Year-round</option>
                      <option value="Closed">Applications Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Schemes Grid */}
              {filteredSchemes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSchemes.map((scheme) => (
                    <SchemeCard
                      key={scheme.id}
                      scheme={scheme}
                      currentLanguage={currentLanguage}
                      isSaved={savedSchemeIds.includes(scheme.id)}
                      onToggleSave={handleToggleSave}
                      onViewDetails={handleViewDetails}
                      onExplainEligibility={(s) => {
                        handleViewDetails(s);
                      }}
                      isSelectedForCompare={selectedForCompare.includes(scheme.id)}
                      onToggleCompare={handleToggleCompare}
                      isRecommended={recommendationsMap.get(scheme.id)?.isRecommended}
                      recommendationReason={recommendationsMap.get(scheme.id)?.reason}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-4 max-w-lg mx-auto shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6 text-amber-600 dark:text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">{t.filters.noResults}</h3>
                  {totalSearchMatches > 0 && searchQuery.trim() ? (
                    <div className="space-y-3">
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                        No schemes match <strong>"{searchQuery}"</strong> with current category ({selectedCategory}) or state filters, but <strong>{totalSearchMatches}</strong> scheme(s) match across all categories.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory('All');
                          setSelectedStateFilter('All');
                          setSelectedTypeFilter('All');
                          setSelectedStatusFilter('All');
                          setShowRecommendedOnly(false);
                        }}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs"
                      >
                        Clear Filters &amp; Show All {totalSearchMatches} Results
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                        {t.filters.noResultsDesc}
                      </p>
                      {searchQuery.trim() && (
                        <div className="pt-2 flex flex-wrap justify-center gap-2">
                          {['PM-KISAN', 'Ayushman', 'Mudra', 'Scholarship', 'Odisha', 'Housing'].map((k) => (
                            <button
                              key={k}
                              type="button"
                              onClick={() => handleSearchChange(k)}
                              className="px-2.5 py-1 text-xs rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 cursor-pointer"
                            >
                              {k}
                            </button>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={handleResetFilters}
                        className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl cursor-pointer mt-2"
                      >
                        Clear All Active Filters
                      </button>
                    </>
                  )}
                </div>
              )}
            </section>
          </div>
        )}

        {/* VIEW 2: SCHEMES ONLY */}
        {activeTab === 'schemes' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 mb-8 shadow-xs">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
                <Landmark className="w-3.5 h-3.5 text-amber-700" />
                <span>Central &amp; State Welfare Programs</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
                All Verified Government Schemes
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Direct benefit transfers, healthcare coverage, agricultural assistance, housing subsidies, and small business credit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schemes.filter((s) => s.type === 'scheme').map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  currentLanguage={currentLanguage}
                  isSaved={savedSchemeIds.includes(scheme.id)}
                  onToggleSave={handleToggleSave}
                  onViewDetails={handleViewDetails}
                  onExplainEligibility={handleViewDetails}
                  isSelectedForCompare={selectedForCompare.includes(scheme.id)}
                  onToggleCompare={handleToggleCompare}
                  isRecommended={recommendationsMap.get(scheme.id)?.isRecommended}
                  recommendationReason={recommendationsMap.get(scheme.id)?.reason}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: SCHOLARSHIPS ONLY */}
        {activeTab === 'scholarships' && (
          <ScholarshipsView
            schemes={schemes}
            currentLanguage={currentLanguage}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onExplainEligibility={handleViewDetails}
            recommendationsMap={recommendationsMap}
          />
        )}

        {/* VIEW 4: STATE SCHEMES */}
        {activeTab === 'states' && (
          <StateSchemesView
            schemes={schemes}
            currentLanguage={currentLanguage}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onExplainEligibility={handleViewDetails}
            recommendationsMap={recommendationsMap}
          />
        )}

        {/* VIEW 5: FIND SCHEMES WIZARD */}
        {activeTab === 'find-wizard' && (
          <FindSchemesWizard
            schemes={schemes}
            currentLanguage={currentLanguage}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onViewDetails={handleViewDetails}
            onExplainEligibility={handleViewDetails}
            recommendationsMap={recommendationsMap}
          />
        )}

        {/* VIEW 6: SAVED SCHEMES */}
        {activeTab === 'saved' && (
          <SavedSchemesView
            savedSchemes={savedSchemes}
            currentLanguage={currentLanguage}
            onRemoveSave={handleToggleSave}
            onClearAll={handleClearAllSaved}
            onViewDetails={handleViewDetails}
            onExplainEligibility={handleViewDetails}
            onOpenCompare={() => setIsCompareModalOpen(true)}
            selectedForCompare={selectedForCompare}
            onToggleCompare={handleToggleCompare}
            onBrowseMore={() => setActiveTab('home')}
            thresholdDays={notificationThresholdDays}
            onTriggerTestAlert={handleTriggerTestAlert}
            recommendationsMap={recommendationsMap}
          />
        )}

        {/* VIEW 7: BENEFITS & SUBSIDY CALCULATOR */}
        {activeTab === 'calculator' && (
          <BenefitsCalculator
            schemes={schemes}
            currentLanguage={currentLanguage}
            onViewDetails={handleViewDetails}
            onToggleSave={handleToggleSave}
            savedSchemeIds={savedSchemeIds}
          />
        )}

        {/* VIEW 8: CITIZEN DOCUMENT LOCKER */}
        {activeTab === 'locker' && (
          <DocumentLocker
            savedSchemes={savedSchemes}
            currentLanguage={currentLanguage}
            onViewSchemeDetails={handleViewDetails}
          />
        )}

        {/* VIEW 9: OFFICIAL HELPLINES & CSC DIRECTORY */}
        {activeTab === 'helplines' && (
          <HelplineDirectory
            currentLanguage={currentLanguage}
          />
        )}

        {/* VIEW 10: CIVIC RIGHTS & SCHEME QUIZ */}
        {activeTab === 'quiz' && (
          <CivicQuiz
            currentLanguage={currentLanguage}
            onExploreSchemes={() => {
              setActiveTab('schemes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAskAI={(prompt) => {
              setAssistantInitialPrompt(prompt);
              setIsAssistantOpen(true);
            }}
          />
        )}

        {/* VIEW 11: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <AdminDashboard
            schemes={schemes}
            onAddScheme={handleAddScheme}
            onUpdateScheme={handleUpdateScheme}
            onDeleteScheme={handleDeleteScheme}
            reports={reports}
            onResolveReport={handleResolveReport}
          />
        )}
      </main>

      {/* Floating AI Assistant Trigger Button (Always accessible) */}
      <div className="fixed bottom-20 lg:bottom-6 right-5 z-40">
        <button
          onClick={() => {
            setAssistantInitialPrompt('');
            setIsAssistantOpen(true);
          }}
          className="flex items-center gap-2 bg-stone-900 hover:bg-black text-white px-4 py-3 rounded-full shadow-2xl border-2 border-amber-500/80 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          aria-label="Ask SchemeSathi AI"
        >
          <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 font-bold text-xs">
            <Bot className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight pr-1">
            Ask SchemeSathi AI
          </span>
        </button>
      </div>

      {/* Floating Comparison Drawer if 2+ items selected */}
      {selectedForCompare.length >= 2 && !isCompareModalOpen && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100%-2rem)] bg-stone-900 text-white px-5 py-2.5 rounded-full shadow-2xl border border-stone-700 flex items-center gap-4 animate-in slide-in-from-bottom-3">
          <div className="flex items-center gap-2 text-xs">
            <Scale className="w-4 h-4 text-amber-400" />
            <span><strong>{selectedForCompare.length}</strong> schemes selected to compare</span>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="px-3.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
          >
            Compare Now
          </button>
          <button
            onClick={() => setSelectedForCompare([])}
            className="text-stone-400 hover:text-white text-xs cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}

      {/* 4. Scheme Detail Modal */}
      <SchemeDetailModal
        scheme={detailModalScheme}
        isOpen={!!detailModalScheme}
        onClose={() => setDetailModalScheme(null)}
        currentLanguage={currentLanguage}
        isSaved={detailModalScheme ? savedSchemeIds.includes(detailModalScheme.id) : false}
        onToggleSave={handleToggleSave}
        onOpenAssistantWithPrompt={handleOpenAssistantWithPrompt}
        onOpenReportModal={handleOpenReportModal}
        isRecommended={detailModalScheme ? recommendationsMap.get(detailModalScheme.id)?.isRecommended : false}
        recommendationReason={detailModalScheme ? recommendationsMap.get(detailModalScheme.id)?.reason : ''}
      />

      {/* 5. AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        currentLanguage={currentLanguage}
        initialPrompt={assistantInitialPrompt}
      />

      {/* 6. Comparison Modal */}
      <SchemeComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        schemes={comparedSchemes}
        onRemoveFromCompare={handleToggleCompare}
        onApplyOfficially={(url) => window.open(url, '_blank')}
      />

      {/* 7. Citizen Report Issue Modal */}
      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        schemes={schemes}
        preSelectedSchemeId={reportPreSelectedSchemeId}
        onSubmitReport={handleAddReport}
      />

      {/* 8. Mobile Fixed Bottom Nav */}
      <MobileBottomNav
        currentLanguage={currentLanguage}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        savedCount={savedSchemeIds.length}
        onOpenAssistant={() => {
          setAssistantInitialPrompt('');
          setIsAssistantOpen(true);
        }}
      />

      {/* 9. Floating In-App Deadline Notification Alert Banner */}
      {activeDeadlineAlert && (
        <DeadlineNotificationBanner
          scheme={activeDeadlineAlert.scheme}
          daysRemaining={activeDeadlineAlert.daysRemaining}
          onViewDetails={(s) => setDetailModalScheme(s)}
          onDismiss={() => {
            sessionStorage.setItem('schemesathi_dismissed_alert_id', activeDeadlineAlert.scheme.id);
            setActiveDeadlineAlert(null);
          }}
        />
      )}

      {/* Compare Limit Toast Notification */}
      {compareToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100%-2rem)] px-4 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-stone-700 dark:border-stone-300 animate-in fade-in slide-in-from-bottom-2">
          <span>{compareToast}</span>
        </div>
      )}

      {/* 10. Comprehensive Civic-Tech Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onSelectLanguage={handleSelectLanguage}
        onSelectTab={setActiveTab}
        onOpenAssistant={() => {
          setAssistantInitialPrompt('');
          setIsAssistantOpen(true);
        }}
        onOpenReportModal={() => handleOpenReportModal()}
        onOpenStorageModal={() => setIsStorageModalOpen(true)}
      />

      {/* 11. Storage & Cache Monitor Modal */}
      <StorageManagerModal
        isOpen={isStorageModalOpen}
        onClose={() => setIsStorageModalOpen(false)}
        stats={storageStats}
        onRefreshStats={refreshStorage}
        autoCleanupEnabled={autoCleanupEnabled}
        onToggleAutoCleanup={handleToggleAutoCleanup}
        onCleanupComplete={(result) => {
          setCleanupNotification({
            message: result.message,
            type: 'success',
          });
          setTimeout(() => setCleanupNotification(null), 5000);
        }}
      />
    </div>
  );
};

export default App;
