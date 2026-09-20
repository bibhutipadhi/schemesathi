import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Compass, 
  GraduationCap, 
  Tractor, 
  HeartPulse, 
  Building2, 
  Briefcase, 
  Coins, 
  ShieldCheck, 
  Users, 
  ExternalLink,
  Mic,
  MicOff,
  AlertCircle,
  Calculator,
  FolderLock,
  PhoneCall,
  Award,
  ArrowRight,
  SunMedium
} from 'lucide-react';
import { LanguageCode, SchemeCategory } from '../types';
import { TRANSLATIONS } from '../data/translations';

const LANGUAGE_SPEECH_MAP: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  or: 'or-IN',
  kn: 'kn-IN',
  bn: 'bn-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
  as: 'as-IN',
  ur: 'ur-IN',
  sa: 'sa-IN',
  mai: 'hi-IN',
  ne: 'ne-NP',
  kok: 'kok-IN',
  sat: 'sat-IN',
  sd: 'sd-IN',
  doi: 'doi-IN',
  mni: 'mni-IN',
  brx: 'as-IN',
  ks: 'ks-IN',
};

interface HeroProps {
  currentLanguage: LanguageCode;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: SchemeCategory | 'All') => void;
  selectedCategory: SchemeCategory | 'All';
  onLaunchWizard: () => void;
  totalSchemesCount: number;
  onSelectTab?: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLanguage,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  selectedCategory,
  onLaunchWizard,
  totalSchemesCount,
  onSelectTab,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Voice Search State
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Check speech recognition capability on mount
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const handleToggleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setSpeechError('Voice search is not supported in this browser. Please try Chrome or Edge.');
      return;
    }

    // If already listening, stop
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    // Start recognition
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = LANGUAGE_SPEECH_MAP[currentLanguage] || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        onSearchChange(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition notice:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone access was denied. Please allow microphone permissions.');
        } else if (event.error === 'no-speech') {
          setSpeechError('No speech detected. Please speak clearly into your microphone.');
        } else {
          setSpeechError(`Microphone error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Speech recognition start failed:', err);
      setSpeechError('Could not start voice search. Please check your browser settings.');
      setIsListening(false);
    }
  };

  const popularCategories: { label: string; icon: React.ReactNode; cat: SchemeCategory }[] = [
    { label: 'Scholarships', icon: <GraduationCap className="w-4 h-4 text-emerald-600" />, cat: 'Education' },
    { label: 'Agriculture / Farmers', icon: <Tractor className="w-4 h-4 text-amber-600" />, cat: 'Agriculture' },
    { label: 'Healthcare', icon: <HeartPulse className="w-4 h-4 text-rose-600" />, cat: 'Healthcare' },
    { label: 'Women & Girls', icon: <Users className="w-4 h-4 text-purple-600" />, cat: 'Women' },
    { label: 'Business & Mudra Loans', icon: <Coins className="w-4 h-4 text-blue-600" />, cat: 'Business' },
    { label: 'Housing (Awas)', icon: <Building2 className="w-4 h-4 text-orange-600" />, cat: 'Housing' },
    { label: 'Jobs & Skilling', icon: <Briefcase className="w-4 h-4 text-stone-600" />, cat: 'Employment' },
  ];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      // Do not trigger submission if IME composition is in progress
      if ((e.nativeEvent as any)?.isComposing) {
        return;
      }
    }
    const el = document.getElementById('schemes-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-stone-900 via-stone-900 to-stone-800 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[16px_16px]" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/90 border border-stone-700 text-stone-200 text-xs font-medium mb-6 shadow-xs backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{t.hero.verifiedBadge}</span>
          <span className="w-1 h-1 rounded-full bg-stone-500" />
          <span className="text-amber-300 font-semibold">{t.tagline}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-tight">
          {t.hero.title}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* Large Search Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <form 
            onSubmit={handleSearchSubmit}
            className="relative flex items-center bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-1.5 sm:p-2 border border-stone-200 dark:border-stone-700 focus-within:ring-4 focus-within:ring-amber-500/20 transition-all"
          >
            <div className="pl-3 pr-2 text-stone-400">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 dark:text-amber-500" />
            </div>
            <input
              type="text"
              id="hero-search-input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder={t.hero.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if ((e.nativeEvent as any).isComposing) {
                    return;
                  }
                  e.preventDefault();
                  handleSearchSubmit();
                }
              }}
              className="flex-1 min-w-0 text-stone-900 dark:text-stone-100 text-sm sm:text-base placeholder-stone-500 dark:placeholder-stone-400 focus:outline-hidden py-2 sm:py-2.5 bg-transparent"
            />
            {searchQuery && (
              <button
                type="button"
                id="search-clear-btn"
                onClick={() => onSearchChange('')}
                className="px-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}

            {/* Voice-to-Text Search Button */}
            <button
              type="button"
              id="voice-search-btn"
              onClick={handleToggleVoiceSearch}
              title={
                isListening
                  ? 'Stop listening'
                  : speechSupported
                  ? `Search by voice (${LANGUAGE_SPEECH_MAP[currentLanguage] || 'en-IN'})`
                  : 'Voice search not supported in this browser'
              }
              aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
              className={`p-2 sm:p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 mr-1 ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-400/40 shadow-md'
                  : 'text-stone-500 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-stone-800'
              }`}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            <button
              type="submit"
              id="search-submit-btn"
              className="shrink-0 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>{t.hero.searchBtn}</span>
            </button>
          </form>

          {/* Quick Trending Search Pills */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="text-stone-400 text-[11px] font-medium mr-1">Trending:</span>
            {[
              'PM-KISAN',
              'Ayushman Bharat',
              'Mudra Loan',
              'Scholarship',
              'Awas Yojana',
              'Ladli Behna',
              'Odisha'
            ].map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => {
                  onSearchChange(keyword);
                  const el = document.getElementById('schemes-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700/80 transition-colors text-[11px] font-medium cursor-pointer"
              >
                {keyword}
              </button>
            ))}
          </div>

          {/* Active Search Query Feedback */}
          {searchQuery.trim() && (
            <div className="mt-2 text-xs text-amber-300 flex items-center justify-center gap-2 animate-in fade-in">
              <span>Searching: <strong>"{searchQuery}"</strong></span>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('schemes-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="underline hover:text-white font-medium cursor-pointer"
              >
                Jump to results ↓
              </button>
            </div>
          )}

          {/* Active Voice Listening Banner */}
          {isListening && (
            <div
              id="voice-listening-indicator"
              className="mt-3 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-red-950/95 text-red-100 border border-red-700/80 text-xs shadow-xl backdrop-blur-md animate-in fade-in"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-semibold text-white">Listening... Speak now to search schemes</span>
              <span className="text-[10px] bg-red-900/80 text-red-200 px-2 py-0.5 rounded-full font-mono">
                {LANGUAGE_SPEECH_MAP[currentLanguage] || 'en-IN'}
              </span>
              <button
                type="button"
                onClick={() => handleToggleVoiceSearch()}
                className="ml-1 text-[11px] font-bold underline text-red-300 hover:text-white cursor-pointer"
              >
                Done
              </button>
            </div>
          )}

          {/* Voice Search Notice / Error */}
          {speechError && (
            <div
              id="voice-search-error"
              className="mt-3 text-xs text-amber-200 bg-stone-900/90 border border-amber-500/40 px-3.5 py-1.5 rounded-xl inline-flex items-center gap-2 shadow-md animate-in fade-in"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{speechError}</span>
              <button
                type="button"
                onClick={() => setSpeechError(null)}
                className="text-stone-400 hover:text-white font-bold text-xs cursor-pointer ml-1"
              >
                ×
              </button>
            </div>
          )}

          {/* Action CTA: Guided Wizard */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <button
              onClick={onLaunchWizard}
              className="bg-stone-800/90 hover:bg-stone-700 text-amber-300 border border-amber-500/30 px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 cursor-pointer backdrop-blur-xs"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{t.hero.findForMeBtn}</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-200 px-1.5 py-0.5 rounded">6 Qs</span>
            </button>

          </div>

          {/* Quick Citizen Tools Gateway */}
          {onSelectTab && (
            <div className="mt-8 pt-6 border-t border-stone-800/80">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
                <button
                  type="button"
                  onClick={() => onSelectTab('calculator')}
                  className="p-3.5 rounded-2xl bg-stone-800/70 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 text-stone-200 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      Benefits Calculator
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      Estimate family subsidies &amp; ₹5L health cover
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('locker')}
                  className="p-3.5 rounded-2xl bg-stone-800/70 hover:bg-stone-800 border border-emerald-500/30 hover:border-emerald-400 text-stone-200 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <FolderLock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                      Document Locker
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      Check e-KYC, Aadhaar &amp; NPCI readiness
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('helplines')}
                  className="p-3.5 rounded-2xl bg-stone-800/70 hover:bg-stone-800 border border-sky-500/30 hover:border-sky-400 text-stone-200 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                      Helplines &amp; CSC
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      Dial 1930 fraud line &amp; locate Jan Seva
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTab('quiz')}
                  className="p-3.5 rounded-2xl bg-stone-800/70 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 text-stone-200 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      Civic Rights Quiz
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                      Test scheme literacy &amp; earn badges
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Popular Category Chips */}
        <div className="mt-8 pt-6 border-t border-stone-800">
          <p className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-3">
            {t.hero.browseCategories}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
              }`}
            >
              All Categories
            </button>
            {popularCategories.map((item) => (
              <button
                key={item.label}
                onClick={() => onSelectCategory(item.cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === item.cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="bg-stone-800/60 border border-stone-700/60 rounded-xl p-3.5">
            <div className="text-2xl font-bold text-amber-400 font-serif">{totalSchemesCount}+</div>
            <div className="text-xs text-stone-400 mt-0.5">{t.hero.totalSchemes}</div>
          </div>
          <div className="bg-stone-800/60 border border-stone-700/60 rounded-xl p-3.5">
            <div className="text-2xl font-bold text-emerald-400 font-serif">36</div>
            <div className="text-xs text-stone-400 mt-0.5">{t.hero.totalStates}</div>
          </div>
          <div className="bg-stone-800/60 border border-stone-700/60 rounded-xl p-3.5">
            <div className="text-2xl font-bold text-sky-400 font-serif">.gov.in</div>
            <div className="text-xs text-stone-400 mt-0.5">{t.hero.officialSources}</div>
          </div>
          <div className="bg-stone-800/60 border border-stone-700/60 rounded-xl p-3.5">
            <div className="text-2xl font-bold text-purple-400 font-serif">₹0</div>
            <div className="text-xs text-stone-400 mt-0.5">100% Free &amp; No Login/OTP Required</div>
          </div>
        </div>
      </div>
    </section>
  );
};
