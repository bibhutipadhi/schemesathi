import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  FileText, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Building,
  GraduationCap,
  Share2,
  Check,
  Zap,
  Bell
} from 'lucide-react';
import { Scheme, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { shareScheme } from '../utils/shareScheme';

interface SchemeCardProps {
  scheme: Scheme;
  currentLanguage: LanguageCode;
  isSaved: boolean;
  onToggleSave: (schemeId: string) => void;
  onViewDetails: (scheme: Scheme) => void;
  onExplainEligibility: (scheme: Scheme) => void;
  isSelectedForCompare?: boolean;
  onToggleCompare?: (schemeId: string) => void;
  isRecommended?: boolean;
  recommendationReason?: string;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  currentLanguage,
  isSaved,
  onToggleSave,
  onViewDetails,
  onExplainEligibility,
  isSelectedForCompare,
  onToggleCompare,
  isRecommended,
  recommendationReason,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await shareScheme(scheme);
    if (result.copied) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Language translated title/description fallback
  const translatedTitle = scheme.titleTranslations?.[currentLanguage] || scheme.name;
  const translatedDesc = scheme.descriptionTranslations?.[currentLanguage] || scheme.description;

  // Status color styles
  const getStatusBadge = () => {
    switch (scheme.status as string) {
      case 'Open':
      case 'Ongoing':
        return {
          label: 'Application Open',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
        };
      case 'Closing Soon':
        return {
          label: 'Closing Soon',
          bg: 'bg-amber-50 text-amber-800 border-amber-200 animate-pulse',
          dot: 'bg-amber-500',
        };
      case 'Closed':
        return {
          label: 'Applications Closed',
          bg: 'bg-stone-100 text-stone-600 border-stone-200',
          dot: 'bg-stone-400',
        };
      case 'Coming Soon':
        return {
          label: 'Coming Soon',
          bg: 'bg-sky-50 text-sky-800 border-sky-200',
          dot: 'bg-sky-500',
        };
      default:
        return {
          label: scheme.status,
          bg: 'bg-stone-100 text-stone-700 border-stone-200',
          dot: 'bg-stone-400',
        };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <div className={`bg-white dark:bg-stone-900 rounded-2xl border shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group ${
      isRecommended
        ? 'border-amber-400 dark:border-amber-500 ring-2 ring-amber-400/25 dark:ring-amber-500/20 shadow-sm'
        : 'border-stone-200/90 dark:border-stone-800'
    }`}>
      {/* Card Header & Badges */}
      <div className="p-5 pb-3">
        {/* Recommended for You Prominent Badge */}
        {isRecommended && (
          <div className="mb-3 px-3 py-1.5 rounded-xl bg-linear-to-r from-amber-600 via-amber-600 to-amber-700 text-white shadow-xs flex items-center justify-between gap-2 border border-amber-500/50">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 fill-current text-amber-200 shrink-0" />
              <span className="text-xs font-bold tracking-wide shrink-0">Recommended for You</span>
            </div>
            {recommendationReason && (
              <span 
                className="text-[10px] font-medium text-amber-100 bg-amber-800/60 px-2 py-0.5 rounded-md border border-amber-400/30 truncate max-w-47.5"
                title={recommendationReason}
              >
                {recommendationReason}
              </span>
            )}
          </div>
        )}

        {/* Verification Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100 dark:border-stone-800 text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.card.verifiedSource}</span>
            <span className="text-stone-300 dark:text-stone-700">•</span>
            <span className="text-stone-700 dark:text-stone-300 font-mono">{scheme.verifiedSource}</span>
          </div>
          <div className="text-stone-600 dark:text-stone-400 flex items-center gap-1">
            <span>{t.card.lastVerified}:</span>
            <span className="font-semibold text-stone-700 dark:text-stone-300">{scheme.verifiedDate}</span>
          </div>
        </div>

        {/* Tags Row: Type, Level, Category, and Application Status */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          {scheme.isNewlyAdded && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-600 text-white shadow-xs flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3 fill-current" />
              NEW
            </span>
          )}
          {scheme.isUpdated && !scheme.isNewlyAdded && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-600 text-white shadow-xs flex items-center gap-1">
              <Bell className="w-3 h-3 fill-current" />
              UPDATED
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">
            {scheme.level === 'Central' ? t.card.centralGov : `${scheme.state} ${t.card.stateGov}`}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80">
            {scheme.category}
          </span>
          {scheme.type === 'scholarship' && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              Scholarship
            </span>
          )}
          <span className={`ml-auto px-2 py-0.5 rounded-md text-[11px] font-semibold border flex items-center gap-1.5 ${statusInfo.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
            {statusInfo.label}
          </span>
        </div>

        {/* Department Name */}
        <p className="text-[11px] text-stone-700 dark:text-stone-400 flex items-center gap-1 mb-1 font-medium">
          <Building className="w-3 h-3 text-stone-500 dark:text-stone-400" />
          <span className="truncate">{scheme.department}</span>
        </p>

        {/* Scheme Title */}
        <h3 
          onClick={() => onViewDetails(scheme)}
          className="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors cursor-pointer font-serif leading-snug"
        >
          {translatedTitle}
        </h3>

        {/* Short Description */}
        <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
          {translatedDesc}
        </p>

        {/* Update note if recently modified */}
        {scheme.updateSummary && (
          <div className="mt-2 px-2.5 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/70 text-[11px] text-sky-800 dark:text-sky-300 flex items-start gap-1.5">
            <Bell className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <span className="font-medium"><strong>Recent Update:</strong> {scheme.updateSummary}</span>
          </div>
        )}

        {/* Key Benefits Highlight Banner */}
        <div className="mt-3.5 p-2.5 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-xl">
          <div className="text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wide flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{t.card.benefits}</span>
          </div>
          <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
            {scheme.benefitsHighlight}
          </p>
        </div>

        {/* Who Can Apply Summary */}
        <div className="mt-3 text-xs">
          <span className="font-semibold text-stone-800 dark:text-stone-200">{t.card.whoCanApply}: </span>
          <span className="text-stone-600 dark:text-stone-400">{scheme.whoCanApply}</span>
        </div>

        {/* Required Documents Mini Badges */}
        {Array.isArray(scheme.documents) && scheme.documents.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 text-xs">
            <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1 mb-1.5">
              <FileText className="w-3 h-3 text-stone-500 dark:text-stone-400" />
              <span>{t.card.documents}:</span>
            </span>
            <div className="flex flex-wrap gap-1">
              {scheme.documents.slice(0, 3).map((doc, i) => (
                <span 
                  key={i} 
                  className="text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700"
                >
                  {doc?.name || 'Document'}
                </span>
              ))}
              {scheme.documents.length > 3 && (
                <span className="text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-1.5 py-0.5 rounded border border-stone-200 dark:border-stone-700">
                  +{scheme.documents.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Deadline Information */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 font-medium">
          <Clock className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          <span>{t.card.deadline}:</span>
          <span className="font-bold text-stone-900 dark:text-stone-100">{scheme.deadline}</span>
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div className="p-4 bg-stone-50/80 dark:bg-stone-900/90 border-t border-stone-100 dark:border-stone-800 flex flex-col gap-2">
        {/* Primary Action Button: Apply Officially */}
        {scheme.hasVerifiedApplicationLink ? (
          <a
            href={scheme.officialPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <span>{t.card.applyOfficially}</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
          </a>
        ) : (
          <div className="p-2 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 rounded-lg text-[11px] text-amber-900 dark:text-amber-200 leading-snug">
            {t.card.officialLinkUnavailable}
          </div>
        )}

        {/* Secondary Row: Save, Explain Eligibility, View Details, Compare */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {/* Save Button */}
          <button
            onClick={() => onToggleSave(scheme.id)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isSaved
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-semibold'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Scheme'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            ) : (
              <Bookmark className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            )}
            <span>{isSaved ? t.card.saved : t.card.save}</span>
          </button>

          {/* Web Share Button */}
          <button
            onClick={handleShare}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isCopied
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
            }`}
            title="Share Scheme with friends and family via social messaging"
            aria-label="Share Scheme"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
            )}
            <span>{isCopied ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Quick AI Explain Eligibility */}
          <button
            onClick={() => onExplainEligibility(scheme)}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-amber-800 dark:text-amber-400 hover:bg-amber-100/70 dark:hover:bg-amber-950/50 rounded-lg font-medium transition-colors cursor-pointer"
            title="Explain eligibility criteria in simple words"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{t.card.explainEligibility}</span>
          </button>

          {/* View Details */}
          <button
            onClick={() => onViewDetails(scheme)}
            className="px-2.5 py-1.5 text-xs text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 font-semibold hover:bg-stone-200/70 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            {t.card.viewDetails}
          </button>

          {/* Compare Checkbox */}
          {onToggleCompare && (
            <label className="flex items-center gap-1 text-[11px] text-stone-700 dark:text-stone-300 cursor-pointer ml-auto hover:text-stone-900 dark:hover:text-stone-100">
              <input
                type="checkbox"
                checked={isSelectedForCompare || false}
                onChange={() => onToggleCompare(scheme.id)}
                className="rounded border-stone-300 dark:border-stone-700 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
              />
              <span>{t.card.compare}</span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
