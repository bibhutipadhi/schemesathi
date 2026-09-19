import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ChevronRight, X, PhoneCall } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ScamWarningBannerProps {
  currentLanguage: LanguageCode;
  onOpenReportModal: () => void;
}

export const ScamWarningBanner: React.FC<ScamWarningBannerProps> = ({
  currentLanguage,
  onOpenReportModal,
}) => {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <>
      <section className="bg-amber-50 dark:bg-amber-950/40 border-y border-amber-200 dark:border-amber-900/60 py-3 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-600 dark:bg-amber-600 text-white rounded-lg shrink-0 mt-0.5 shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
                <span>{t.scamWarning.title}</span>
                <span className="text-[11px] bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-semibold px-2 py-0.2 rounded-full">
                  Official Advisory
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-300/90 leading-relaxed mt-0.5 max-w-4xl">
                {t.scamWarning.body}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={() => setShowGuideModal(true)}
              className="text-xs font-semibold text-amber-900 dark:text-amber-200 bg-white dark:bg-stone-900 hover:bg-amber-100 dark:hover:bg-stone-800 border border-amber-300 dark:border-amber-700 px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{t.scamWarning.learnMore}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenReportModal}
              className="text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t.scamWarning.reportIssue}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Citizen Safety & Scam Prevention Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 dark:border-stone-800 relative my-8 text-stone-900 dark:text-stone-100">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded-xl">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  Citizen Safety & Anti-Fraud Checklist
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Follow these 5 rules when discovering or applying for government benefits
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3.5 text-sm">
              <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">1. Look for .gov.in or .nic.in domains</h4>
                  <p className="text-stone-700 dark:text-stone-300 text-xs mt-0.5">
                    Official Central and State government portals only end in <strong>.gov.in</strong> or <strong>.nic.in</strong>. Never submit documents or pay fees on websites ending in .com, .org, or .xyz claiming to represent government schemes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">2. No application fees for direct benefit transfers (DBT)</h4>
                  <p className="text-stone-700 dark:text-stone-300 text-xs mt-0.5">
                    Schemes like PM-Kisan, PM Awas Yojana, and national scholarships do not charge money or commissions to approve applications. Any caller demanding &quot;file clearance charges&quot; is a scammer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">3. Never share OTP or UPI PIN</h4>
                  <p className="text-stone-700 dark:text-stone-300 text-xs mt-0.5">
                    Your UPI PIN is only required to SEND money from your bank account, never to RECEIVE government assistance or subsidy funds into your account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">4. Beware of WhatsApp & Telegram fake links</h4>
                  <p className="text-stone-700 dark:text-stone-300 text-xs mt-0.5">
                    Viral messages claiming &quot;Free laptops for all students&quot; or &quot;₹50,000 festive relief&quot; with third-party shortened links (bit.ly, tinyurl) are phishing traps.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-red-900 block">National Cyber Crime Helpline</span>
                  <span className="text-xs text-red-800">Dial 1930 or visit cybercrime.gov.in immediately if scammed</span>
                </div>
                <a
                  href="tel:1930"
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call 1930</span>
                </a>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-xl cursor-pointer"
              >
                I Understand &amp; Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
