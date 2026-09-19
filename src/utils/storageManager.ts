/**
 * SchemeSathi LocalStorage Size Monitor & Auto-Cleanup Engine
 * Monitors storage quota usage, detects thresholds, and performs automatic or manual
 * pruning of older cached searches, browsing history, and temporary cache entries.
 */

export interface StorageItemBreakdown {
  key: string;
  label: string;
  category: 'searches' | 'history' | 'categories' | 'schemes_cache' | 'saved' | 'progress' | 'notifications' | 'test_cache' | 'system';
  bytes: number;
  formatted: string;
  itemCount?: number;
  isSafeToClean: boolean;
}

export interface StorageStats {
  totalBytes: number;
  totalFormatted: string;
  maxQuotaBytes: number;
  maxQuotaFormatted: string;
  percentageUsed: number;
  isWarning: boolean;
  isCritical: boolean;
  breakdown: StorageItemBreakdown[];
  searchCount: number;
  historyCount: number;
}

export interface CleanupResult {
  success: boolean;
  bytesFreed: number;
  freedFormatted: string;
  prunedSearches: number;
  prunedHistory: number;
  message: string;
}

// Storage Key Constants
export const STORAGE_KEYS = {
  SEARCHES: 'schemesathi_recent_searches',
  VIEWS: 'schemesathi_browsing_history',
  CATEGORIES: 'schemesathi_category_clicks',
  SCHEMES_DB: 'schemesathi_schemes_db',
  SAVED: 'schemesathi_saved',
  PROGRESS: 'schemesathi_application_progress',
  NOTIFIED: 'schemesathi_notified_deadlines',
  REPORTS: 'schemesathi_reports',
  THEME: 'schemesathi_theme',
  LANG: 'schemesathi_lang',
  NOTIFY_DAYS: 'schemesathi_notify_days',
  AUTO_CLEANUP: 'schemesathi_auto_cleanup',
  TEST_CACHE: 'schemesathi_test_cache_dummy',
} as const;

// Browser standard localStorage limit is typically ~5MB (5,242,880 bytes)
export const MAX_STORAGE_QUOTA_BYTES = 5 * 1024 * 1024;

// Warning threshold: 60% of quota (~3.0 MB)
export const WARNING_THRESHOLD_BYTES = 3 * 1024 * 1024;

// Critical threshold: 80% of quota (~4.0 MB)
export const CRITICAL_THRESHOLD_BYTES = 4 * 1024 * 1024;

/**
 * Format bytes into human-readable string (B, KB, MB)
 */
export function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Calculate the exact UTF-16 byte length of a key-value pair in localStorage
 */
function getEntryBytes(key: string, value: string): number {
  // UTF-16 in JavaScript browser engine uses 2 bytes per code unit
  return (key.length + value.length) * 2;
}

/**
 * Inspect all keys in localStorage and return structured storage statistics
 */
export function getLocalStorageStats(): StorageStats {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      totalBytes: 0,
      totalFormatted: '0 B',
      maxQuotaBytes: MAX_STORAGE_QUOTA_BYTES,
      maxQuotaFormatted: formatBytes(MAX_STORAGE_QUOTA_BYTES),
      percentageUsed: 0,
      isWarning: false,
      isCritical: false,
      breakdown: [],
      searchCount: 0,
      historyCount: 0,
    };
  }

  let totalBytes = 0;
  const breakdown: StorageItemBreakdown[] = [];
  let searchCount = 0;
  let historyCount = 0;

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      const value = localStorage.getItem(key) || '';
      const bytes = getEntryBytes(key, value);
      totalBytes += bytes;

      let label = key;
      let category: StorageItemBreakdown['category'] = 'system';
      let isSafeToClean = false;
      let itemCount: number | undefined;

      switch (key) {
        case STORAGE_KEYS.SEARCHES:
          label = 'Cached Search Queries';
          category = 'searches';
          isSafeToClean = true;
          try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
              itemCount = parsed.length;
              searchCount = parsed.length;
            }
          } catch (e) {
            // ignore
          }
          break;

        case STORAGE_KEYS.VIEWS:
          label = 'Browsing & View History';
          category = 'history';
          isSafeToClean = true;
          try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
              itemCount = parsed.length;
              historyCount = parsed.length;
            }
          } catch (e) {
            // ignore
          }
          break;

        case STORAGE_KEYS.CATEGORIES:
          label = 'Category Interaction Counters';
          category = 'categories';
          isSafeToClean = true;
          try {
            const parsed = JSON.parse(value);
            if (parsed && typeof parsed === 'object') {
              itemCount = Object.keys(parsed).length;
            }
          } catch (e) {
            // ignore
          }
          break;

        case STORAGE_KEYS.SCHEMES_DB:
          label = 'Offline Schemes Cache';
          category = 'schemes_cache';
          isSafeToClean = true;
          try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
              itemCount = parsed.length;
            }
          } catch (e) {
            // ignore
          }
          break;

        case STORAGE_KEYS.SAVED:
          label = 'Saved Bookmarks (Protected)';
          category = 'saved';
          isSafeToClean = false;
          try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) {
              itemCount = parsed.length;
            }
          } catch (e) {
            // ignore
          }
          break;

        case STORAGE_KEYS.PROGRESS:
          label = 'Application Progress Tracker (Protected)';
          category = 'progress';
          isSafeToClean = false;
          try {
            const parsed = JSON.parse(value);
            if (parsed && typeof parsed === 'object') {
              itemCount = Object.keys(parsed).length;
            }
          } catch (e) {
            // ignore
          }
          break;

        case STORAGE_KEYS.NOTIFIED:
          label = 'Deadline Notification Logs';
          category = 'notifications';
          isSafeToClean = true;
          break;

        case STORAGE_KEYS.TEST_CACHE:
          label = 'Simulation Test Dummy Cache';
          category = 'test_cache';
          isSafeToClean = true;
          break;

        case STORAGE_KEYS.REPORTS:
          label = 'Citizen Inaccuracy Reports';
          category = 'system';
          isSafeToClean = false;
          break;

        default:
          if (key.startsWith('schemesathi_')) {
            label = key.replace('schemesathi_', '').replace(/_/g, ' ');
          }
          break;
      }

      breakdown.push({
        key,
        label,
        category,
        bytes,
        formatted: formatBytes(bytes),
        itemCount,
        isSafeToClean,
      });
    }
  } catch (err) {
    console.warn('Error computing localStorage stats:', err);
  }

  // Sort breakdown descending by bytes
  breakdown.sort((a, b) => b.bytes - a.bytes);

  const percentageUsed = Math.min(100, (totalBytes / MAX_STORAGE_QUOTA_BYTES) * 1024);
  const isWarning = totalBytes >= WARNING_THRESHOLD_BYTES;
  const isCritical = totalBytes >= CRITICAL_THRESHOLD_BYTES;

  return {
    totalBytes,
    totalFormatted: formatBytes(totalBytes),
    maxQuotaBytes: MAX_STORAGE_QUOTA_BYTES,
    maxQuotaFormatted: formatBytes(MAX_STORAGE_QUOTA_BYTES),
    percentageUsed: Number(((totalBytes / MAX_STORAGE_QUOTA_BYTES) * 100).toFixed(1)),
    isWarning,
    isCritical,
    breakdown,
    searchCount,
    historyCount,
  };
}

/**
 * Prune or cleanup older cached search queries and browsing history.
 * Protects user-saved bookmarks and application tracking progress.
 */
export function cleanupOlderSearchesAndHistory(options: {
  keepSearchesCount?: number;
  keepHistoryCount?: number;
  clearTestCache?: boolean;
} = {}): CleanupResult {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      success: false,
      bytesFreed: 0,
      freedFormatted: '0 B',
      prunedSearches: 0,
      prunedHistory: 0,
      message: 'Storage not accessible',
    };
  }

  const {
    keepSearchesCount = 3,
    keepHistoryCount = 5,
    clearTestCache = true,
  } = options;

  const initialStats = getLocalStorageStats();
  let prunedSearches = 0;
  let prunedHistory = 0;

  try {
    // 1. Prune or clear test simulation dummy cache
    if (clearTestCache && localStorage.getItem(STORAGE_KEYS.TEST_CACHE)) {
      localStorage.removeItem(STORAGE_KEYS.TEST_CACHE);
    }

    // 2. Prune older cached search queries (keep only the newest N)
    const rawSearches = localStorage.getItem(STORAGE_KEYS.SEARCHES);
    if (rawSearches) {
      try {
        const searches: string[] = JSON.parse(rawSearches);
        if (Array.isArray(searches) && searches.length > keepSearchesCount) {
          prunedSearches = searches.length - keepSearchesCount;
          const trimmed = searches.slice(0, keepSearchesCount);
          if (trimmed.length > 0) {
            localStorage.setItem(STORAGE_KEYS.SEARCHES, JSON.stringify(trimmed));
          } else {
            localStorage.removeItem(STORAGE_KEYS.SEARCHES);
          }
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.SEARCHES);
      }
    }

    // 3. Prune older browsing & view history events (keep only newest N)
    const rawHistory = localStorage.getItem(STORAGE_KEYS.VIEWS);
    if (rawHistory) {
      try {
        const history: any[] = JSON.parse(rawHistory);
        if (Array.isArray(history) && history.length > keepHistoryCount) {
          prunedHistory = history.length - keepHistoryCount;
          const trimmed = history.slice(0, keepHistoryCount);
          if (trimmed.length > 0) {
            localStorage.setItem(STORAGE_KEYS.VIEWS, JSON.stringify(trimmed));
          } else {
            localStorage.removeItem(STORAGE_KEYS.VIEWS);
          }
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.VIEWS);
      }
    }

    // 4. Prune deadline notifications cache if bloated
    const rawNotified = localStorage.getItem(STORAGE_KEYS.NOTIFIED);
    if (rawNotified && rawNotified.length > 2048) {
      try {
        const notified: Record<string, number> = JSON.parse(rawNotified);
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        const fresh: Record<string, number> = {};
        for (const [key, timestamp] of Object.entries(notified)) {
          if (typeof timestamp === 'number' && timestamp > thirtyDaysAgo) {
            fresh[key] = timestamp;
          }
        }
        localStorage.setItem(STORAGE_KEYS.NOTIFIED, JSON.stringify(fresh));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.NOTIFIED);
      }
    }

    // 5. Prune category click counters if bloated
    const rawCat = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (rawCat && rawCat.length > 1024) {
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    }
  } catch (err) {
    console.error('Error during cleanup of search and history cache:', err);
  }

  const finalStats = getLocalStorageStats();
  const bytesFreed = Math.max(0, initialStats.totalBytes - finalStats.totalBytes);

  return {
    success: true,
    bytesFreed,
    freedFormatted: formatBytes(bytesFreed),
    prunedSearches,
    prunedHistory,
    message: `Freed ${formatBytes(bytesFreed)} of storage by pruning ${prunedSearches} search queries and ${prunedHistory} browsing history entries.`,
  };
}

/**
 * Deep cache reset: Clears all search queries and browsing history completely
 */
export function clearAllSearchAndHistory(): CleanupResult {
  const initialStats = getLocalStorageStats();
  let prunedSearches = initialStats.searchCount;
  let prunedHistory = initialStats.historyCount;

  try {
    localStorage.removeItem(STORAGE_KEYS.SEARCHES);
    localStorage.removeItem(STORAGE_KEYS.VIEWS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.TEST_CACHE);
  } catch (e) {
    console.error('Failed to clear search and history:', e);
  }

  const finalStats = getLocalStorageStats();
  const bytesFreed = Math.max(0, initialStats.totalBytes - finalStats.totalBytes);

  return {
    success: true,
    bytesFreed,
    freedFormatted: formatBytes(bytesFreed),
    prunedSearches,
    prunedHistory,
    message: `Cleared all cached search queries and browsing history. Freed ${formatBytes(bytesFreed)}.`,
  };
}

/**
 * Simulate filling storage for testing warning thresholds and auto-cleanup mechanism.
 * Creates a dummy string in `schemesathi_test_cache_dummy`.
 */
export function simulateStorageFill(targetBytes: number): boolean {
  try {
    // Each character is 2 bytes in UTF-16
    const charCount = Math.floor(targetBytes / 2);
    const chunk = 'SchemeSathiStorageFillTestData1234567890';
    const repeatTimes = Math.ceil(charCount / chunk.length);
    const dummyString = chunk.repeat(repeatTimes).substring(0, charCount);
    localStorage.setItem(STORAGE_KEYS.TEST_CACHE, dummyString);
    return true;
  } catch (e) {
    console.warn('Simulation exceeded browser limit:', e);
    return false;
  }
}

/**
 * Remove test simulation cache
 */
export function clearSimulatedStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.TEST_CACHE);
  } catch (e) {
    // ignore
  }
}

/**
 * Detects if an error is a browser QuotaExceededError
 */
export function isQuotaExceededError(err: unknown): boolean {
  return (
    err instanceof DOMException &&
    (err.code === 22 ||
      err.code === 1014 ||
      err.name === 'QuotaExceededError' ||
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  );
}

/**
 * Safe wrapper for localStorage.setItem with automatic quota recovery.
 * If quota is exceeded, it triggers cleanup and retries once.
 */
export function safeLocalStorageSetItem(
  key: string,
  value: string,
  onAutoClean?: (result: CleanupResult) => void
): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    if (isQuotaExceededError(err)) {
      console.warn(`LocalStorage quota exceeded while setting "${key}". Triggering automatic cleanup...`);
      const cleanupResult = cleanupOlderSearchesAndHistory();
      if (onAutoClean) {
        onAutoClean(cleanupResult);
      }
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (retryErr) {
        console.error(`LocalStorage write failed even after cleanup for key "${key}":`, retryErr);
        return false;
      }
    }
    return false;
  }
}
