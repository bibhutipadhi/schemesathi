import React, { useState } from 'react';
import { 
  Globe, 
  Bookmark, 
  Bot, 
  Menu, 
  X, 
  ShieldCheck, 
  GraduationCap, 
  Landmark, 
  Compass, 
  MapPin,
  Settings,
  AlertTriangle,
  Sun,
  Moon,
  HardDrive,
  Calculator,
  FolderLock,
  PhoneCall,
  Award,
  ChevronDown,
  Wrench
} from 'lucide-react';
import { LanguageCode, Scheme } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { TRANSLATIONS } from '../data/translations';
import { DeadlineNotificationCenter } from './DeadlineNotificationCenter';
import { StorageStats } from '../utils/storageManager';

interface NavbarProps {
  currentLanguage: LanguageCode;
  onSelectLanguage: (code: LanguageCode) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  savedCount: number;
  savedSchemes: Scheme[];
  onOpenAssistant: () => void;
  onOpenReportModal: () => void;
  onViewDetails: (scheme: Scheme) => void;
  thresholdDays: number;
  onUpdateThresholdDays: (days: number) => void;
  onTriggerTestAlert: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  storageStats?: StorageStats;
  onOpenStorageModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onSelectLanguage,
  activeTab,
  onSelectTab,
  savedCount,
  savedSchemes,
  onOpenAssistant,
  onOpenReportModal,
  onViewDetails,
  thresholdDays,
  onUpdateThresholdDays,
  onTriggerTestAlert,
  theme,
  onToggleTheme,
  storageStats,
  onOpenStorageModal,
}) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const handleNav = (tab: string) => {
    onSelectTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
      {/* Top Gov-Assurance Ribbon */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-stone-200">
              {t.hero.verifiedBadge}
            </span>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="hidden md:inline text-stone-400">
              National Civic Information Portal for Indian Citizens
            </span>
          </div>
          <div className="flex items-center gap-3">
            {storageStats && onOpenStorageModal && (
              <>
                <span className="hidden sm:inline text-stone-700">|</span>
                <button
                  onClick={onOpenStorageModal}
                  className={`flex items-center gap-1 transition-colors cursor-pointer text-[11px] ${
                    storageStats.isCritical
                      ? 'text-rose-400 hover:text-rose-300 font-bold'
                      : storageStats.isWarning
                      ? 'text-amber-400 hover:text-amber-300 font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Inspect storage and cache cleanup status"
                >
                  <HardDrive className="w-3 h-3 shrink-0" />
                  <span>Cache: {storageStats.totalFormatted}</span>
                  {storageStats.isWarning && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </button>
              </>
            )}
            <span className="hidden sm:inline text-stone-700">|</span>
            <button
              onClick={onOpenReportModal}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer text-[11px]"
              title="Report inaccurate link or details"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>{t.scamWarning.reportIssue}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Tricolor Motif */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 via-stone-800 to-emerald-600 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-white dark:bg-stone-900 rounded-[10px] flex items-center justify-center">
                <span className="text-xl">🇮🇳</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-serif">
                  SchemeSathi
                </span>
                <span className="text-xs bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-semibold px-1.5 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                  INDIA
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 hidden 2xl:block truncate max-w-xs">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Cleanly spaced for xl+ screens) */}
          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNav('schemes')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'schemes'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Landmark className="w-4 h-4 text-amber-600" />
              {t.nav.schemes}
            </button>
            <button
              onClick={() => handleNav('scholarships')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'scholarships'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              {t.nav.scholarships}
            </button>
            <button
              onClick={() => handleNav('states')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'states'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <MapPin className="w-4 h-4 text-sky-600" />
              {t.nav.stateSchemes}
            </button>
            <button
              onClick={() => handleNav('find-wizard')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'find-wizard'
                  ? 'bg-amber-500 text-white font-semibold'
                  : 'text-amber-800 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/80'
              }`}
            >
              <Compass className="w-4 h-4" />
              {t.nav.findSchemes}
            </button>

            {/* Citizen Tools Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                  ['calculator', 'locker', 'helplines', 'quiz'].includes(activeTab)
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
                title="Citizen Welfare Tools"
              >
                <Wrench className="w-4 h-4 text-amber-600" />
                <span>Citizen Tools</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {isToolsMenuOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setIsToolsMenuOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800 mb-1">
                    Direct Citizen Services
                  </div>

                  <button
                    onClick={() => {
                      handleNav('calculator');
                      setIsToolsMenuOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer ${
                      activeTab === 'calculator'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Benefits Calculator</div>
                      <div className="text-[11px] text-stone-500">Estimate family cash &amp; solar subsidies</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNav('locker');
                      setIsToolsMenuOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer ${
                      activeTab === 'locker'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5">
                      <FolderLock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Document Locker</div>
                      <div className="text-[11px] text-stone-500">Track e-KYC, Aadhaar &amp; certificates</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNav('helplines');
                      setIsToolsMenuOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer ${
                      activeTab === 'helplines'
                        ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-200'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-sky-700 dark:text-sky-400 shrink-0 mt-0.5">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Helplines &amp; CSC Kiosks</div>
                      <div className="text-[11px] text-stone-500">Dial 1930 fraud line &amp; locate Jan Seva</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleNav('quiz');
                      setIsToolsMenuOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-colors cursor-pointer ${
                      activeTab === 'quiz'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200'
                        : 'hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold">Civic Quiz Challenge</div>
                      <div className="text-[11px] text-stone-500">Test rights, scam awareness &amp; win badges</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Cluster: Theme Toggle, Language Switcher, Saved, AI Assistant, Admin */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle (Light / Dark Mode) */}
            <button
              onClick={onToggleTheme}
              id="navbar-theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-stone-700 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm font-medium bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                <span className="font-semibold text-stone-900 dark:text-stone-100">{currentLangObj.nativeName}</span>
                <span className="text-[10px] text-stone-600 dark:text-stone-400 hidden md:inline">({currentLangObj.name})</span>
              </button>

              {isLangMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setIsLangMenuOpen(false)}
                >
                  <div className="px-2 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800 mb-1 flex items-center justify-between">
                    <span>12 Indian Languages</span>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-normal">ଭାଷା ଚୟନ</span>
                  </div>
                  <div className="grid grid-cols-1 max-h-72 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onSelectLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                          currentLanguage === lang.code
                            ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-950 dark:text-amber-200 font-bold'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                        }`}
                      >
                        <div>
                          <span className="font-medium text-sm block">{lang.nativeName}</span>
                          <span className="text-[11px] text-stone-600 dark:text-stone-400">{lang.name}</span>
                        </div>
                        {currentLanguage === lang.code && (
                          <span className="w-2 h-2 rounded-full bg-amber-700 dark:bg-amber-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Schemes Counter Button */}
            <button
              onClick={() => handleNav('saved')}
              className="relative p-2 text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title="Saved Schemes"
              aria-label="View Saved Schemes"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-stone-900 shadow-xs">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Deadline Notification Center */}
            <DeadlineNotificationCenter
              savedSchemes={savedSchemes}
              onViewDetails={onViewDetails}
              onNavigateToSaved={() => handleNav('saved')}
              thresholdDays={thresholdDays}
              onUpdateThresholdDays={onUpdateThresholdDays}
              onTriggerTestAlert={onTriggerTestAlert}
            />

            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenAssistant}
              className="hidden sm:flex items-center gap-1.5 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer hover:shadow-md"
            >
              <Bot className="w-4 h-4" />
              <span>{t.nav.assistant}</span>
            </button>

            {/* Admin Portal Link */}
            <button
              onClick={() => handleNav('admin')}
              className="hidden md:flex p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              title="Admin Portal"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between px-3 py-2 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/80 dark:border-stone-700/80 mb-2">
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
              {theme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-600" />}
              Appearance
            </span>
            <button
              onClick={onToggleTheme}
              id="mobile-theme-toggle"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold cursor-pointer border border-stone-200 dark:border-stone-600 shadow-xs"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium ${
              activeTab === 'home'
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNav('schemes')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-2 ${
              activeTab === 'schemes'
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            <Landmark className="w-5 h-5 text-amber-600" />
            {t.nav.schemes}
          </button>
          <button
            onClick={() => handleNav('scholarships')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-2 ${
              activeTab === 'scholarships'
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            {t.nav.scholarships}
          </button>
          <button
            onClick={() => handleNav('states')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center gap-2 ${
              activeTab === 'states'
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                : 'text-stone-700 dark:text-stone-300'
            }`}
          >
            <MapPin className="w-5 h-5 text-sky-600" />
            {t.nav.stateSchemes}
          </button>
          <button
            onClick={() => handleNav('find-wizard')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold flex items-center gap-2 bg-amber-500 text-white"
          >
            <Compass className="w-5 h-5" />
            {t.nav.findSchemes}
          </button>

          {/* Citizen Welfare Tools in Mobile Drawer */}
          <div className="pt-2 pb-1 border-t border-stone-100 dark:border-stone-800">
            <div className="px-3 text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Citizen Welfare Tools
            </div>
            <button
              onClick={() => handleNav('calculator')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Benefits &amp; Subsidy Calculator</span>
            </button>
            <button
              onClick={() => handleNav('locker')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeTab === 'locker'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <FolderLock className="w-4 h-4 text-emerald-600" />
              <span>Document Locker &amp; e-KYC</span>
            </button>
            <button
              onClick={() => handleNav('helplines')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeTab === 'helplines'
                  ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-900 dark:text-sky-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-sky-600" />
              <span>Helplines &amp; CSC Directory</span>
            </button>
            <button
              onClick={() => handleNav('quiz')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                activeTab === 'quiz'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Civic Rights &amp; Scheme Quiz</span>
            </button>
          </div>

          <button
            onClick={() => handleNav('saved')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-stone-700 dark:text-stone-300 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-600" />
              {t.nav.saved}
            </span>
            {savedCount > 0 && (
              <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-xs px-2 py-0.5 rounded-full font-bold">
                {savedCount}
              </span>
            )}
          </button>
          {onOpenStorageModal && (
            <button
              onClick={() => {
                onOpenStorageModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-stone-700 dark:text-stone-300 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-amber-600" />
                Storage &amp; Cache
              </span>
              {storageStats && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  storageStats.isWarning 
                    ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300' 
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}>
                  {storageStats.totalFormatted}
                </span>
              )}
            </button>
          )}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex gap-2">
            <button
              onClick={() => {
                onOpenAssistant();
                setIsMobileMenuOpen(false);
              }}
              className="flex-1 bg-amber-600 text-white py-2.5 px-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>{t.nav.assistant}</span>
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 py-2.5 px-3 rounded-lg text-sm font-medium flex items-center justify-center"
              title="Admin"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
