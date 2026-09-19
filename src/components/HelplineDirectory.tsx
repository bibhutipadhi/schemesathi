import React, { useState, useMemo } from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Search, 
  Building2, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  LifeBuoy,
  FileText,
  BadgeAlert
} from 'lucide-react';
import { LanguageCode } from '../types';
import { OFFICIAL_HELPLINES } from '../data/helplines';

interface HelplineDirectoryProps {
  currentLanguage: LanguageCode;
}

export const HelplineDirectory: React.FC<HelplineDirectoryProps> = ({
  currentLanguage,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredHelplines = useMemo(() => {
    return OFFICIAL_HELPLINES.filter((h) => {
      const matchesCat = selectedCategory === 'all' || h.category === selectedCategory;
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.number.includes(searchQuery) ||
        h.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-stone-900 via-sky-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-sky-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-semibold mb-3">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>National Citizen Welfare Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white mb-2">
            Official Helplines &amp; CSC Centers
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            Direct, verified, toll-free Indian Government assistance lines for cyber financial fraud, Ayushman healthcare, PM-KISAN farmer status, student scholarship disputes, and authorized Common Service Centre (Jan Seva Kendra) guidelines.
          </p>
        </div>
      </div>

      {/* Emergency Fraud Notice Banner */}
      <div className="bg-red-50 dark:bg-red-950/40 border-2 border-red-500/40 rounded-3xl p-6 mb-8 text-stone-900 dark:text-stone-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                Golden Hour Fraud Freeze
              </span>
              <span className="text-[10px] bg-red-200 dark:bg-red-900/80 text-red-900 dark:text-red-200 px-2 py-0.5 rounded-full font-bold">
                Dial 1930
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
              Lost money to a fake scheme link, OTP scam, or fraudulent portal?
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1 max-w-2xl">
              Immediately call national cyber fraud helpline <strong>1930</strong> or report on <em>cybercrime.gov.in</em>. Reporting within the first 1–2 hours allows authorities to freeze stolen funds in bank nodes before withdrawal.
            </p>
          </div>
        </div>

        <a
          href="tel:1930"
          className="shrink-0 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 1930 Toll-Free</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Helplines Directory (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs">
            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100 dark:border-stone-800">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search helpline (e.g., Ayushman, Kisan, Scholarship, 14555)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'All Helplines' },
                  { id: 'emergency_fraud', label: 'Fraud / Cyber' },
                  { id: 'health', label: 'Health' },
                  { id: 'agriculture', label: 'Farmers' },
                  { id: 'education', label: 'Students' },
                  { id: 'social_welfare', label: 'Social Welfare' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded-xl font-medium cursor-pointer transition-colors ${
                      selectedCategory === c.id
                        ? 'bg-sky-600 text-white font-semibold'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Helpline Cards */}
            <div className="space-y-4">
              {filteredHelplines.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-sky-300 dark:hover:border-sky-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 uppercase">
                        {item.category.replace('_', ' ')}
                      </span>
                      {item.tollFree && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                          Toll-Free
                        </span>
                      )}
                      <span className="text-[11px] text-stone-400">
                        {item.department}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{item.operatingHours}</span>
                      </span>
                      {item.officialWebsite && (
                        <a
                          href={item.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sky-600 hover:underline"
                        >
                          <span>Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* 1-Click Dial Action */}
                  <div className="shrink-0 flex items-center sm:flex-col sm:items-end justify-between sm:justify-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">
                        Hotline Number
                      </span>
                      <span className="text-lg font-black font-mono text-stone-900 dark:text-stone-100">
                        {item.number}
                      </span>
                    </div>

                    <a
                      href={`tel:${item.number.replace(/[^0-9]/g, '')}`}
                      className="px-4 py-2 bg-stone-900 hover:bg-black dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-xs hover:scale-105 active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
                      <span>Dial Now</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Jan Seva Kendra / CSC Citizen Guide (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <Building2 className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                CSC / Jan Seva Kendra Guide
              </h2>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              If you lack a smartphone or computer, authorized <strong>Common Service Centres (CSCs / Jan Seva Kendra / MeeSeva / Banglar Sahayata Kendra)</strong> are present in every Gram Panchayat across India.
            </p>

            {/* Official Fee Caps Warning */}
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Beware of Overcharging!</span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 text-[11px] leading-relaxed">
                Government schemes have statutory maximum fee caps for CSC operators:
              </p>
              <ul className="space-y-1 text-[11px] text-stone-600 dark:text-stone-400 list-disc list-inside">
                <li>Ayushman Card PVC Print: <strong>₹0 - Free</strong></li>
                <li>PM-KISAN e-KYC Biometric: <strong>Max ₹15</strong></li>
                <li>Certificate Application (Income/Caste): <strong>₹30 - ₹50</strong></li>
                <li>NSP Scholarship Registration: <strong>Free / ₹30 scan</strong></li>
              </ul>
              <p className="text-[10px] text-stone-500">
                Report illegal extortion to the National Consumer Helpline at <strong>1915</strong>.
              </p>
            </div>

            {/* What to carry to CSC */}
            <div className="space-y-2.5 text-xs">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>What to Carry to the CSC Center</span>
              </h3>
              <ul className="space-y-2 text-stone-600 dark:text-stone-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Physical Original Aadhaar Card</strong> and active mobile phone for receiving SMS OTPs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bank Passbook</strong> with clear IFSC code and NPCI DBT seeding stamp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Passport-size Photographs</strong> (2 copies) and active Ration card copy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Always collect your <strong>Acknowledgment Receipt &amp; Application Reference ID</strong> before leaving the kiosk!</span>
                </li>
              </ul>
            </div>

            {/* Locator Link */}
            <div className="pt-2">
              <a
                href="https://findmycsc.nic.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
                <span>Locate Authorized CSC Near Me</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
