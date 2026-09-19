import React from 'react';
import { Sparkles, Zap, Bell, ArrowRight, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { Scheme, LanguageCode } from '../types';

interface NewlyUpdatedSchemesSectionProps {
  schemes: Scheme[];
  currentLanguage: LanguageCode;
  onViewDetails: (scheme: Scheme) => void;
  onViewAllUpdates: () => void;
}

export const NewlyUpdatedSchemesSection: React.FC<NewlyUpdatedSchemesSectionProps> = ({
  schemes,
  currentLanguage,
  onViewDetails,
  onViewAllUpdates,
}) => {
  // Collect all newly added or recently updated schemes
  const updatedSchemes = schemes.filter(
    (s) => s.isNewlyAdded || s.isUpdated || (s.updateSummary && s.updateSummary.trim().length > 0)
  );

  if (updatedSchemes.length === 0) return null;

  return (
    <section 
      id="newly-updated-schemes-section" 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4"
    >
      <div className="bg-linear-to-br from-amber-50 via-orange-50/50 to-stone-50 dark:from-stone-900 dark:via-amber-950/20 dark:to-stone-900 rounded-3xl border border-amber-200/90 dark:border-amber-800/60 p-5 sm:p-7 shadow-sm transition-all">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-amber-200/60 dark:border-amber-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <Zap className="w-5 h-5 fill-current text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  New &amp; Recently Updated Schemes
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-600 text-white shadow-xs">
                  {updatedSchemes.length} Active
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                Schemes newly launched, revisions gazetted, or application guidelines updated this month.
              </p>
            </div>
          </div>

          <button
            onClick={onViewAllUpdates}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:text-amber-700 dark:hover:text-amber-400 border border-stone-300 dark:border-stone-700 rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-sm cursor-pointer"
          >
            <span>Filter in Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Schemes Horizontal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {updatedSchemes.slice(0, 6).map((scheme) => {
            const isNew = scheme.isNewlyAdded;

            return (
              <div
                key={scheme.id}
                onClick={() => onViewDetails(scheme)}
                className="bg-white dark:bg-stone-800/90 rounded-2xl border border-stone-200 dark:border-stone-700/80 p-4 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Badge & Department */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    {isNew ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                        <Zap className="w-3 h-3 fill-current" />
                        NEW LAUNCH
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-600 text-white shadow-xs">
                        <Bell className="w-3 h-3 fill-current" />
                        UPDATED
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                      {scheme.level === 'Central' ? 'Central' : scheme.state}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 font-serif leading-snug line-clamp-2">
                    {scheme.titleTranslations?.[currentLanguage] || scheme.name}
                  </h3>

                  {/* Update Note / Highlight */}
                  {scheme.updateSummary ? (
                    <div className="mt-2.5 p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/80 text-[11px] text-sky-900 dark:text-sky-200">
                      <span className="font-bold">Update: </span>
                      <span>{scheme.updateSummary}</span>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      {scheme.shortDescription || scheme.benefitsHighlight}
                    </p>
                  )}
                </div>

                {/* Footer strip */}
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{scheme.benefitsHighlight}</span>
                  </div>
                  <span className="text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-[11px] shrink-0">
                    Details &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
