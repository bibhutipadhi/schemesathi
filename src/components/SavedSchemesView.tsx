import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Scale, 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Bell,
  BellRing,
  Sparkles,
  Printer
} from 'lucide-react';
import { Scheme, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SchemeCard } from './SchemeCard';
import { ApplicationProgressTracker } from './ApplicationProgressTracker';
import { PrintDossierModal } from './PrintDossierModal';
import { 
  getDaysRemaining, 
  getNotificationPermission, 
  requestNotificationPermission,
  sendBrowserNotification 
} from '../utils/notificationService';

interface SavedSchemesViewProps {
  savedSchemes: Scheme[];
  currentLanguage: LanguageCode;
  onRemoveSave: (id: string) => void;
  onClearAll: () => void;
  onViewDetails: (scheme: Scheme) => void;
  onExplainEligibility: (scheme: Scheme) => void;
  onOpenCompare: () => void;
  selectedForCompare: string[];
  onToggleCompare: (id: string) => void;
  onBrowseMore: () => void;
  thresholdDays?: number;
  onTriggerTestAlert?: () => void;
  recommendationsMap?: Map<string, { isRecommended: boolean; reason: string }>;
}

export const SavedSchemesView: React.FC<SavedSchemesViewProps> = ({
  savedSchemes,
  currentLanguage,
  onRemoveSave,
  onClearAll,
  onViewDetails,
  onExplainEligibility,
  onOpenCompare,
  selectedForCompare,
  onToggleCompare,
  onBrowseMore,
  thresholdDays = 3,
  onTriggerTestAlert,
  recommendationsMap,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  useEffect(() => {
    setPermission(getNotificationPermission());
  }, []);

  const handleEnableAlerts = async () => {
    const perm = await requestNotificationPermission();
    setPermission(perm);
    if (perm === 'granted') {
      sendBrowserNotification('🔔 SchemeSathi Deadline Alerts Active', {
        body: `Local browser reminders are enabled. We will alert you ${thresholdDays} days before deadlines.`,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Bookmark className="w-3.5 h-3.5 text-amber-700" />
              <span>Personal Citizen Tracker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              {t.savedSection.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {t.savedSection.subtitle}
            </p>
          </div>

          {savedSchemes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsPrintModalOpen(true)}
                className="px-4 py-2 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                title="Print application dossier and document checklist for Jan Seva Kendra / CSC"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print CSC Dossier</span>
              </button>

              {selectedForCompare.length >= 2 && (
                <button
                  onClick={onOpenCompare}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Scale className="w-4 h-4" />
                  <span>Compare ({selectedForCompare.length})</span>
                </button>
              )}
              <button
                onClick={onClearAll}
                className="px-3.5 py-2 text-stone-500 hover:text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t.savedSection.clearAll}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {savedSchemes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">{t.savedSection.emptyTitle}</h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
            {t.savedSection.emptyDesc}
          </p>
          <button
            onClick={onBrowseMore}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <span>Browse Schemes &amp; Scholarships</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Application Progress Tracker */}
          <ApplicationProgressTracker
            savedSchemes={savedSchemes}
            currentLanguage={currentLanguage}
            onViewDetails={onViewDetails}
          />

          {/* Deadline Timeline Tracker */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-amber-200/60">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-700" />
                <div>
                  <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">
                    {t.savedSection.deadlinesTitle}
                  </h3>
                  <p className="text-xs text-amber-800/80">
                    Local browser alerts trigger automatically {thresholdDays} days before deadlines.
                  </p>
                </div>
              </div>

              {/* Notification Control in Saved View */}
              <div className="flex flex-wrap items-center gap-2">
                {permission === 'granted' ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Browser Alerts Active</span>
                  </div>
                ) : (
                  <button
                    onClick={handleEnableAlerts}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    <span>Enable Browser Alerts</span>
                  </button>
                )}

                {onTriggerTestAlert && (
                  <button
                    onClick={onTriggerTestAlert}
                    className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    Test Alert
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {savedSchemes.map((s) => {
                const daysRemaining = getDaysRemaining(s.deadlineDate, s.deadline);
                const isNearDeadline = daysRemaining !== null && daysRemaining >= 0 && daysRemaining <= thresholdDays;

                return (
                  <div
                    key={s.id}
                    className={`bg-white p-3.5 rounded-xl border shadow-xs flex flex-col justify-between transition-all ${
                      isNearDeadline
                        ? 'border-red-300 ring-2 ring-red-400/20 shadow-sm'
                        : 'border-amber-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-stone-500 uppercase">
                          {s.level} Govt • {s.category}
                        </span>
                        {isNearDeadline && (
                          <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-red-200 animate-pulse">
                            ⏰ {daysRemaining === 0 ? 'Closes Today' : daysRemaining === 1 ? '1 Day Left' : `${daysRemaining} Days Left`}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1 mt-0.5">{s.name}</h4>
                    </div>
                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-semibold text-amber-800">{s.deadline}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isNearDeadline
                          ? 'bg-red-100 text-red-900'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isNearDeadline ? 'Closing Soon' : s.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(savedSchemes || []).filter((s) => s && s.id).map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                currentLanguage={currentLanguage}
                isSaved={true}
                onToggleSave={onRemoveSave}
                onViewDetails={onViewDetails}
                onExplainEligibility={onExplainEligibility}
                isSelectedForCompare={selectedForCompare.includes(scheme.id)}
                onToggleCompare={onToggleCompare}
                isRecommended={recommendationsMap?.get(scheme.id)?.isRecommended}
                recommendationReason={recommendationsMap?.get(scheme.id)?.reason}
              />
            ))}
          </div>
        </div>
      )}

      {/* Jan Seva Kendra / CSC Printable Dossier Modal */}
      <PrintDossierModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        savedSchemes={savedSchemes}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};
