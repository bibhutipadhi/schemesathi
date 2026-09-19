import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Building, 
  Bot, 
  AlertTriangle,
  HelpCircle,
  Clock,
  IndianRupee,
  Share2,
  Zap,
  Bell
} from 'lucide-react';
import { Scheme, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { shareScheme } from '../utils/shareScheme';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onOpenAssistantWithPrompt: (prompt: string) => void;
  onOpenReportModal: (schemeId: string) => void;
  isRecommended?: boolean;
  recommendationReason?: string;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  isOpen,
  onClose,
  currentLanguage,
  isSaved,
  onToggleSave,
  onOpenAssistantWithPrompt,
  onOpenReportModal,
  isRecommended,
  recommendationReason,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'steps'>('overview');
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [simplifiedEligibility, setSimplifiedEligibility] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  if (!isOpen || !scheme) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const translatedTitle = scheme.titleTranslations?.[currentLanguage] || scheme.name;
  const translatedDesc = scheme.descriptionTranslations?.[currentLanguage] || scheme.description;

  const handleToggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const handleExplainWithAI = async () => {
    setIsExplaining(true);
    try {
      const res = await fetch('/api/explain-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemeId: scheme.id, language: currentLanguage }),
      });
      const data = await res.json();
      if (data.simplifiedText) {
        setSimplifiedEligibility(data.simplifiedText);
      }
    } catch (e) {
      setSimplifiedEligibility(`- Open to: ${scheme.whoCanApply}\n- Income condition: ${scheme.eligibility.incomeDescription || 'Check portal'}\n- Check official website for full rules.`);
    } finally {
      setIsExplaining(false);
    }
  };

  const handleShare = async () => {
    const result = await shareScheme(scheme);
    if (result.shared) {
      setShareFeedback('Shared successfully via Web Share!');
      setTimeout(() => setShareFeedback(null), 3500);
    } else if (result.copied) {
      setShareFeedback('Scheme details & link copied to clipboard! Ready to share via WhatsApp, Telegram, or SMS.');
      setTimeout(() => setShareFeedback(null), 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 relative my-auto overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {scheme.isNewlyAdded && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 px-2.5 py-0.5 rounded-full shadow-xs animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    NEW SCHEME
                  </span>
                )}
                {scheme.isUpdated && !scheme.isNewlyAdded && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-sky-600 px-2.5 py-0.5 rounded-full shadow-xs">
                    <Bell className="w-3.5 h-3.5 fill-current" />
                    RECENTLY UPDATED
                  </span>
                )}
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.card.verifiedSource}
                </span>
                <span className="text-[11px] font-medium text-stone-700 bg-stone-200/80 px-2 py-0.5 rounded-md">
                  {scheme.level === 'Central' ? 'Central Government of India' : `State of ${scheme.state}`}
                </span>
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                  {scheme.category}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif leading-snug">
                {translatedTitle}
              </h2>
              <p className="text-xs text-stone-700 flex items-center gap-1.5 mt-1">
                <Building className="w-3.5 h-3.5 text-stone-400" />
                <span>{scheme.department}</span>
              </p>
              {scheme.updateSummary && (
                <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-sky-100 border border-sky-300 text-xs text-sky-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-sky-700 shrink-0" />
                  <span><strong>Recent Revision / Update:</strong> {scheme.updateSummary}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleShare}
                className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200/70 rounded-xl transition-colors cursor-pointer"
                title="Share Scheme"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onToggleSave(scheme.id)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/70'
                }`}
                title={isSaved ? 'Saved' : 'Save Scheme'}
              >
                {isSaved ? <BookmarkCheck className="w-5 h-5 text-amber-700" /> : <Bookmark className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {shareFeedback && (
            <div className="mt-2.5 text-xs font-semibold text-emerald-900 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{shareFeedback}</span>
            </div>
          )}

          {/* Recommended for You Banner */}
          {isRecommended && (
            <div
              className="mt-3 px-3.5 py-2 rounded-xl border border-amber-300 text-amber-950 flex flex-wrap items-center justify-between gap-2 text-xs"
              style={{ backgroundImage: 'linear-gradient(to right, rgb(245 158 11 / 15%), rgb(245 158 11 / 10%), rgb(245 158 11 / 5%))' }}
            >
              <div className="flex items-center gap-2 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
                <span>Recommended for You</span>
              </div>
              {recommendationReason && (
                <span className="font-medium text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-lg border border-amber-200 text-[11px]">
                  {recommendationReason}
                </span>
              )}
            </div>
          )}

          {/* Quick Tab Selectors */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-200 overflow-x-auto text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'overview' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              Benefits &amp; Overview
            </button>
            <button
              onClick={() => setActiveTab('eligibility')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'eligibility' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              Eligibility Criteria
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'documents' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              Required Documents ({(scheme.documents || []).length})
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'steps' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              How to Apply
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-stone-800 text-sm">
          {/* TAB 1: OVERVIEW & BENEFITS */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl">
                <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                  <span>Key Benefits &amp; Assistance</span>
                </h3>
                <p className="text-base font-bold text-stone-900 mb-3">
                  {scheme.benefitsHighlight}
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                  {(scheme.benefits || []).map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-stone-900 mb-1.5">Description</h3>
                <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                  {translatedDesc}
                </p>
              </div>

              {/* Deadline & Status block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-500 font-medium block">Application Deadline</span>
                  <span className="text-sm font-bold text-stone-900 mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-700" />
                    {scheme.deadline}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-500 font-medium block">Current Status</span>
                  <span className="text-sm font-bold text-emerald-800 mt-0.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {scheme.status}
                  </span>
                </div>
              </div>

              {/* Citizen Security Warning */}
              <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl text-xs text-stone-700 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Safety Notice:</strong> Official government applications never require registration fees or bank OTPs. Verify the domain in your browser bar is <strong>.gov.in</strong> or <strong>.nic.in</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY CRITERIA */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900">Who Qualifies for this Scheme?</h3>
                <button
                  onClick={handleExplainWithAI}
                  disabled={isExplaining}
                  className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isExplaining ? 'Simplifying...' : 'Explain in Simple Words'}</span>
                </button>
              </div>

              {simplifiedEligibility && (
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl animate-in fade-in">
                  <div className="text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Simplified Explanation by SchemeSathi AI:</span>
                  </div>
                  <div className="text-xs sm:text-sm text-stone-800 whitespace-pre-line leading-relaxed">
                    {simplifiedEligibility}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 font-medium block text-xs">Primary Target Group</span>
                  <span className="font-semibold text-stone-900 mt-1 block">{scheme.whoCanApply}</span>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 font-medium block text-xs">Age Requirements</span>
                  <span className="font-semibold text-stone-900 mt-1 block">
                    {scheme.eligibility?.minAge ? `${scheme.eligibility.minAge} years` : 'No minimum'} 
                    {' '}to{' '}
                    {scheme.eligibility?.maxAge ? `${scheme.eligibility.maxAge} years` : 'No upper limit'}
                  </span>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 font-medium block text-xs">Family Income Limit</span>
                  <span className="font-semibold text-stone-900 mt-1 block">
                    {scheme.eligibility?.incomeLimit 
                      ? `₹${scheme.eligibility.incomeLimit.toLocaleString('en-IN')}/year or less`
                      : 'No specific income cap'}
                  </span>
                  {scheme.eligibility?.incomeDescription && (
                    <span className="text-[11px] text-stone-500 mt-0.5 block">{scheme.eligibility.incomeDescription}</span>
                  )}
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 font-medium block text-xs">State / Residence</span>
                  <span className="font-semibold text-stone-900 mt-1 block">
                    {!scheme.eligibility?.residenceState || scheme.eligibility.residenceState === 'All India' 
                      ? 'All citizens residing in India' 
                      : `Permanent resident of ${scheme.eligibility.residenceState}`}
                  </span>
                </div>

                {scheme.eligibility?.educationRequired && (
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl sm:col-span-2">
                    <span className="text-stone-500 font-medium block text-xs">Education Requirement</span>
                    <span className="font-semibold text-stone-900 mt-1 block">
                      {scheme.eligibility.educationRequired}
                    </span>
                  </div>
                )}
              </div>

              {scheme.eligibility?.otherCriteria && scheme.eligibility.otherCriteria.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide mb-2">
                    Additional Conditions
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {scheme.eligibility.otherCriteria.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REQUIRED DOCUMENTS CHECKLIST */}
          {activeTab === 'documents' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Required Documents Checklist</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Check off the documents you already have ready before opening the government portal.
                </p>
              </div>

              <div className="space-y-2.5">
                {(scheme.documents || []).map((doc, idx) => {
                  const isChecked = checkedDocs[doc.name];
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleDoc(doc.name)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300'
                          : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-stone-900 text-xs sm:text-sm">{doc.name}</span>
                            {doc.mandatory ? (
                              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                                Mandatory
                              </span>
                            ) : (
                              <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded">
                                Conditional
                              </span>
                            )}
                          </div>
                          {doc.description && (
                            <p className="text-xs text-stone-500 mt-0.5">{doc.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-xs text-stone-500 flex items-center justify-between">
                <span>
                  {Object.values(checkedDocs).filter(Boolean).length} of {scheme.documents.length} documents ready
                </span>
                <button
                  onClick={() => onOpenAssistantWithPrompt(`What documents do I need for ${scheme.name} and how can I obtain them if missing?`)}
                  className="text-amber-800 hover:text-amber-900 font-semibold cursor-pointer"
                >
                  Help me arrange missing documents →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: HOW TO APPLY */}
          {activeTab === 'steps' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Official Step-by-Step Application Guide</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Follow these steps to submit your application on the official government portal.
                </p>
              </div>

              <div className="space-y-3">
                {(scheme.howToApplySteps || []).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {idx + 1}
                    </div>
                    <div className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                      {step}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-emerald-900 uppercase">Official Verified Application Portal</h4>
                  <p className="text-xs text-emerald-800 font-mono mt-0.5">{scheme.officialWebsite}</p>
                </div>
                {scheme.hasVerifiedApplicationLink ? (
                  <a
                    href={scheme.officialPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
                  >
                    <span>Proceed to Official Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-amber-900 bg-amber-100 px-3 py-1.5 rounded-lg font-medium">
                    {t.card.officialLinkUnavailable}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAssistantWithPrompt(`Can you guide me through applying for ${scheme.name}?`)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-200 hover:bg-stone-300 text-stone-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4 text-amber-700" />
              <span>Ask AI Assistant</span>
            </button>
            <button
              onClick={() => onOpenReportModal(scheme.id)}
              className="text-xs text-stone-500 hover:text-red-700 px-2.5 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Report Error
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Scheme Button */}
            <button
              onClick={handleShare}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Share this scheme with friends and family via social messaging"
            >
              <Share2 className="w-4 h-4 text-amber-700" />
              <span>Share Scheme</span>
            </button>

            {scheme.hasVerifiedApplicationLink ? (
              <a
                href={scheme.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>{t.card.applyOfficially}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-xs text-amber-900 bg-amber-100 px-3 py-2 rounded-xl font-medium">
                {t.card.officialLinkUnavailable}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
