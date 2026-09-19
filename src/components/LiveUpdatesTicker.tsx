import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, RefreshCw, X, ChevronRight, Bell } from 'lucide-react';
import { Scheme, LanguageCode } from '../types';

interface LiveUpdatesTickerProps {
  schemes: Scheme[];
  currentLanguage: LanguageCode;
  onViewDetails: (scheme: Scheme) => void;
  onFilterNewUpdates?: () => void;
}

export const LiveUpdatesTicker: React.FC<LiveUpdatesTickerProps> = ({
  schemes,
  currentLanguage,
  onViewDetails,
  onFilterNewUpdates,
}) => {
  // Find schemes that are either newly added or recently updated
  const recentUpdates = schemes.filter(
    (s) => s.isNewlyAdded || s.isUpdated || (s.updateSummary && s.updateSummary.trim().length > 0)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Auto-rotate ticker every 5 seconds if not paused
  useEffect(() => {
    if (recentUpdates.length <= 1 || isPaused || isDismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentUpdates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [recentUpdates.length, isPaused, isDismissed]);

  if (recentUpdates.length === 0 || isDismissed) return null;

  const currentItem = recentUpdates[currentIndex] || recentUpdates[0];

  return (
    <div 
      id="live-scheme-updates-ticker"
      className="bg-linear-to-r from-amber-950 via-stone-900 to-amber-950 border-y border-amber-500/30 text-white py-2.5 px-4 sm:px-6 shadow-sm transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Left Badge: Live Updates Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="inline-flex items-center gap-1 font-bold text-amber-300 uppercase tracking-wider text-[10px] sm:text-[11px] bg-amber-900/60 px-2.5 py-0.5 rounded-full border border-amber-500/40">
            <Zap className="w-3 h-3 text-amber-300" />
            <span>Latest Scheme Updates ({recentUpdates.length})</span>
          </div>
        </div>

        {/* Center: Sliding update item */}
        <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-3 overflow-hidden">
          {currentItem.isNewlyAdded ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white shrink-0 uppercase tracking-wide">
              New Scheme
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500 text-white shrink-0 uppercase tracking-wide flex items-center gap-1">
              <Bell className="w-2.5 h-2.5" />
              Updated
            </span>
          )}

          <button
            onClick={() => onViewDetails(currentItem)}
            className="text-left font-medium text-stone-100 hover:text-amber-300 truncate cursor-pointer transition-colors flex items-center gap-1.5"
            title={`${currentItem.name} - ${currentItem.updateSummary || currentItem.benefitsHighlight}`}
          >
            <span className="font-bold underline decoration-amber-500/50 underline-offset-2">{currentItem.name}:</span>
            <span className="text-stone-300 text-xs truncate">
              {currentItem.updateSummary || currentItem.benefitsHighlight}
            </span>
          </button>
        </div>

        {/* Right action & controls */}
        <div className="flex items-center gap-2 shrink-0">
          {onFilterNewUpdates && (
            <button
              onClick={onFilterNewUpdates}
              className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-900/40 hover:bg-amber-900/80 px-2.5 py-1 rounded-lg border border-amber-500/30 transition-colors cursor-pointer"
            >
              <span>View All Updates</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={() => onViewDetails(currentItem)}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
          >
            <span>View</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-stone-400 hover:text-stone-200 rounded cursor-pointer"
            title="Dismiss updates banner"
            aria-label="Dismiss updates banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
