import React from 'react';
import { BellRing, Clock, ExternalLink, X, ArrowRight } from 'lucide-react';
import { Scheme } from '../types';

interface DeadlineNotificationBannerProps {
  scheme: Scheme;
  daysRemaining: number;
  onViewDetails: (scheme: Scheme) => void;
  onDismiss: () => void;
}

export const DeadlineNotificationBanner: React.FC<DeadlineNotificationBannerProps> = ({
  scheme,
  daysRemaining,
  onViewDetails,
  onDismiss,
}) => {
  const dayText =
    daysRemaining === 0
      ? 'Closing Today'
      : daysRemaining === 1
      ? 'Closing Tomorrow'
      : `Closing in ${daysRemaining} Days`;

  return (
    <div 
      id="deadline-alert-toast"
      className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 sm:max-w-md bg-stone-900 text-white rounded-2xl shadow-2xl border border-amber-500/40 p-4 animate-in slide-in-from-bottom-5 duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
          <BellRing className="w-5 h-5 text-amber-400 animate-pulse" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 border border-red-500/40 uppercase font-mono">
              ⏰ {dayText}
            </span>
            <span className="text-[10px] text-stone-400 truncate">Saved Scheme Alert</span>
          </div>

          <h4 className="text-sm font-bold text-white line-clamp-1 font-serif">
            {scheme.name}
          </h4>

          <p className="text-xs text-stone-300 mt-0.5">
            Deadline: <span className="text-amber-300 font-semibold">{scheme.deadline}</span>
          </p>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => {
                onViewDetails(scheme);
                onDismiss();
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <span>View Requirements</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {scheme.officialPortal && (
              <a
                href={scheme.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
