import React, { useState } from 'react';
import { 
  HardDrive, 
  X, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  Database,
  History,
  Search,
  Sparkles
} from 'lucide-react';
import { 
  StorageStats, 
  CleanupResult,
  cleanupOlderSearchesAndHistory, 
  clearAllSearchAndHistory,
  simulateStorageFill,
  clearSimulatedStorage,
  getLocalStorageStats,
  WARNING_THRESHOLD_BYTES
} from '../utils/storageManager';

interface StorageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: StorageStats;
  onRefreshStats: () => void;
  autoCleanupEnabled: boolean;
  onToggleAutoCleanup: (enabled: boolean) => void;
  onCleanupComplete: (result: CleanupResult) => void;
}

export const StorageManagerModal: React.FC<StorageManagerModalProps> = ({
  isOpen,
  onClose,
  stats,
  onRefreshStats,
  autoCleanupEnabled,
  onToggleAutoCleanup,
  onCleanupComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'testing'>('overview');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePrune = () => {
    const res = cleanupOlderSearchesAndHistory();
    onRefreshStats();
    onCleanupComplete(res);
    setActionFeedback(res.message);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleClearAll = () => {
    const res = clearAllSearchAndHistory();
    onRefreshStats();
    onCleanupComplete(res);
    setActionFeedback(res.message);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleSimulateWarning = () => {
    // Fill to ~3.2MB to cross the 3MB warning threshold
    const success = simulateStorageFill(WARNING_THRESHOLD_BYTES + 200 * 1024);
    onRefreshStats();
    if (success) {
      setActionFeedback('Simulated test cache added (~3.2 MB). Storage warning banner is now active.');
    } else {
      setActionFeedback('Browser restricted simulated quota write.');
    }
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleSimulateCritical = () => {
    // Fill to ~4.2MB to trigger critical auto-cleanup
    const success = simulateStorageFill(4.2 * 1024 * 1024);
    onRefreshStats();
    if (success) {
      setActionFeedback('Simulated critical storage (~4.2 MB). Automatic cleanup should trigger on next monitor check.');
    } else {
      setActionFeedback('Browser restricted simulated quota write.');
    }
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleClearSimulation = () => {
    clearSimulatedStorage();
    onRefreshStats();
    setActionFeedback('Simulated test cache removed. Storage returned to normal.');
    setTimeout(() => setActionFeedback(null), 4000);
  };

  // Color code based on usage
  const getProgressColor = () => {
    if (stats.isCritical) return 'bg-rose-600 dark:bg-rose-500';
    if (stats.isWarning) return 'bg-amber-600 dark:bg-amber-500';
    return 'bg-emerald-600 dark:bg-emerald-500';
  };

  const hasTestCache = stats.breakdown.some((b) => b.category === 'test_cache');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="storage-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shadow-xs">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 id="storage-modal-title" className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 font-serif">
                Storage &amp; Cache Monitor
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Manage local storage quota, cached search queries, and browsing history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action feedback toast inside modal */}
        {actionFeedback && (
          <div className="px-6 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionFeedback}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 px-6 bg-white dark:bg-stone-900">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-amber-600 text-amber-900 dark:text-amber-300'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Overview &amp; Auto-Cleanup</span>
          </button>
          <button
            onClick={() => setActiveTab('breakdown')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'breakdown'
                ? 'border-amber-600 text-amber-900 dark:text-amber-300'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Storage Breakdown ({stats.breakdown.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('testing')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'testing'
                ? 'border-amber-600 text-amber-900 dark:text-amber-300'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Test Cleanup Simulation</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Storage Meter Widget */}
          <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-stone-600 dark:text-stone-400">Total Storage Consumed</span>
              <span className="font-bold text-stone-900 dark:text-stone-100">
                {stats.totalFormatted} of ~{stats.maxQuotaFormatted} ({stats.percentageUsed}%)
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 rounded-full ${getProgressColor()}`}
                style={{ width: `${Math.min(100, Math.max(1, stats.percentageUsed))}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Normal (&lt; 60%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Warning (&ge; 60%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical / Auto-Clean (&ge; 80%)
              </span>
            </div>

            {stats.isCritical ? (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>
                  <strong>Storage is at critical capacity!</strong> Automatic cleanup will prune older search queries and history to prevent browser storage failures.
                </span>
              </div>
            ) : stats.isWarning ? (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <span>
                  <strong>Storage warning threshold reached.</strong> Pruning older cache entries is recommended to ensure smooth offline access.
                </span>
              </div>
            ) : null}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Auto Cleanup Toggle Card */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700">
                <div className="space-y-0.5 max-w-[80%]">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                    Automatic Limit Cleanup
                  </span>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    Automatically prunes older search queries and browsing history when storage reaches 80% capacity or browser reports quota restrictions.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoCleanupEnabled}
                    onChange={(e) => onToggleAutoCleanup(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-stone-300 dark:bg-stone-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                </label>
              </div>

              {/* Quick Actions Grid */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                  Quick Cache Maintenance
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handlePrune}
                    className="p-3.5 text-left bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700/80 border border-stone-200 dark:border-stone-700 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-semibold text-xs mb-1">
                      <History className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                      <span>Prune Older Searches &amp; History</span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Retains latest 3 searches and 5 history events. Frees space safely without losing current preferences.
                    </p>
                  </button>

                  <button
                    onClick={handleClearAll}
                    className="p-3.5 text-left bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700/80 border border-stone-200 dark:border-stone-700 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold text-xs mb-1">
                      <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Clear All Searches &amp; History</span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Clears entire browsing history and search query log for total privacy and maximum freed memory.
                    </p>
                  </button>
                </div>
              </div>

              {/* Safe Persistence Guarantee Callout */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs text-stone-700 dark:text-stone-300">
                  <span className="font-bold block text-stone-900 dark:text-stone-100">
                    Protected Citizen Data
                  </span>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                    Your bookmarked schemes (<strong>Saved Schemes</strong>) and multi-step <strong>Application Progress</strong> are strictly protected and will <strong>never</strong> be deleted during automatic or manual cache cleanups.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Stored Keys &amp; Memory Allocation</span>
                <button
                  onClick={onRefreshStats}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> Refresh
                </button>
              </div>

              <div className="divide-y divide-stone-100 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-white dark:bg-stone-900">
                {stats.breakdown.length === 0 ? (
                  <div className="p-6 text-center text-xs text-stone-500">
                    No items found in local storage.
                  </div>
                ) : (
                  stats.breakdown.map((item) => (
                    <div
                      key={item.key}
                      className="p-3 flex items-center justify-between hover:bg-stone-50/60 dark:hover:bg-stone-800/40 transition-colors"
                    >
                      <div className="space-y-0.5 max-w-[65%]">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                            {item.label}
                          </span>
                          {item.isSafeToClean ? (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                              Cache / History
                            </span>
                          ) : (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                              Protected
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono block truncate">
                          {item.key} {item.itemCount !== undefined ? `(${item.itemCount} records)` : ''}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-stone-900 dark:text-stone-100 block">
                          {item.formatted}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {((item.bytes / Math.max(1, stats.totalBytes)) * 100).toFixed(1)}% of used
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'testing' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs space-y-1.5">
                <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Testing &amp; Demonstration Sandbox
                </span>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-[11px]">
                  Simulate hitting the storage warning and critical limits instantly. This fills temporary test data in local storage so you can observe the warning banner in `App` and verify that the automatic cleanup works when the limit is exceeded.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleSimulateWarning}
                  className="p-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-xl text-left border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                    1. Fill to Warning Limit (3.2 MB)
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                    Triggers the persistent storage warning banner on the main page.
                  </span>
                </button>

                <button
                  onClick={handleSimulateCritical}
                  className="p-3 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-xl text-left border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block mb-0.5">
                    2. Fill to Critical Limit (4.2 MB)
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                    Triggers immediate automatic cleanup of queries and history.
                  </span>
                </button>
              </div>

              {hasTestCache && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900 flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">
                    Test cache is active in your browser.
                  </span>
                  <button
                    onClick={handleClearSimulation}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-xs"
                  >
                    Remove Test Cache
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 flex items-center justify-between">
          <button
            onClick={handlePrune}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Clean Older Queries &amp; History</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
