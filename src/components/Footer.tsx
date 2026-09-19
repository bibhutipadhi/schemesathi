import React from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  PhoneCall, 
  Globe, 
  Heart, 
  Landmark, 
  GraduationCap, 
  Compass,
  AlertTriangle,
  Mail
} from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (code: LanguageCode) => void;
  onSelectTab: (tab: string) => void;
  onOpenAssistant: () => void;
  onOpenReportModal: () => void;
  onOpenStorageModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onSelectLanguage,
  onSelectTab,
  onOpenAssistant,
  onOpenReportModal,
  onOpenStorageModal,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <footer className="bg-stone-950 text-stone-300 pt-12 pb-24 lg:pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-stone-800">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 via-stone-800 to-emerald-600 p-0.5 shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <span className="text-xl">🇮🇳</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-serif">
                  SchemeSathi
                </span>
                <span className="ml-2 text-[10px] bg-amber-900/60 text-amber-300 font-bold px-1.5 py-0.5 rounded border border-amber-700/50">
                  CIVIC TECH
                </span>
                <p className="text-[11px] text-stone-400">{t.tagline}</p>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed max-w-md">
              Helping Indian citizens, students, farmers, women, and small business owners discover and apply for verified government benefits without middlemen or fraud.
            </p>

            <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl flex items-start gap-2.5 max-w-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-stone-300 leading-normal">
                <strong>Verified Sources Pledge:</strong> Every scheme listed on SchemeSathi is cross-checked against official <strong>.gov.in</strong> and <strong>.nic.in</strong> gazettes and portals.
              </p>
            </div>
          </div>

          {/* Col 3: Discovery Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3 font-mono">
              Quick Discovery
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('schemes')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Government Schemes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('scholarships')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Scholarships for Students
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('states')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  State-wise Portals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('find-wizard')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Find Schemes for Me (Quiz)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAssistant}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left text-amber-300 font-semibold"
                >
                  SchemeSathi AI Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Citizen Safety & Cyber Helpline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3 font-mono">
              Citizen Safety
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={onOpenReportModal}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Report Incorrect Information</span>
                </button>
              </li>
              <li className="pt-2">
                <span className="text-stone-300 font-semibold block text-[11px]">Cyber Crime Helpline:</span>
                <a
                  href="tel:1930"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-bold text-sm mt-0.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Dial 1930</span>
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  <span>cybercrime.gov.in</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:bibhutibhusanpadhi2@gmail.com?subject=SchemeSathi%20Contact&body=Hello%20SchemeSathi%20team,%0A%0A"
                  className="text-stone-400 hover:text-amber-300 flex items-center gap-1 text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Us</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Major Languages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-100 mb-3 font-mono flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>12 Languages</span>
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLanguage(lang.code)}
                  className={`text-left px-2 py-1 rounded transition-colors cursor-pointer truncate ${
                    currentLanguage === lang.code
                      ? 'bg-amber-900/60 text-amber-300 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Bar */}
        <div className="mt-8 text-[11px] text-stone-500 leading-relaxed space-y-2">
          <p>
            <strong>Official Legal Disclaimer:</strong> SchemeSathi is an independent civic-tech initiative dedicated to promoting digital transparency and benefit awareness for the citizens of the Republic of India. SchemeSathi is NOT an official government agency and is NOT affiliated with, sponsored by, or endorsed by any central or state government department or ministry. All application forms, submissions, and eligibility verifications must be completed solely on the designated official government portals (ending in .gov.in or .nic.in).
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-stone-900 text-stone-400">
            <div>
              &copy; {new Date().getFullYear()} SchemeSathi.
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span>Privacy &amp; Security</span>
              <span>•</span>
              <span>Terms of Use</span>
              {onOpenStorageModal && (
                <>
                  <span>•</span>
                  <button
                    onClick={onOpenStorageModal}
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Storage &amp; Cache
                  </button>
                </>
              )}
              <span>•</span>
              <a
                href="/api/download-netlify-drop"
                download="schemesathi-netlify-drop.zip"
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                title="Download static production package ready for Netlify Drop"
              >
                <span>⚡ Netlify Drop (.zip)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
