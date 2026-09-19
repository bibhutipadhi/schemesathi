import React from 'react';
import { Home, Landmark, GraduationCap, Compass, Bookmark } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface MobileBottomNavProps {
  currentLanguage: LanguageCode;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  savedCount: number;
  onOpenAssistant: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentLanguage,
  activeTab,
  onSelectTab,
  savedCount,
  onOpenAssistant,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
      <button
        onClick={() => {
          onSelectTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
          activeTab === 'home' ? 'text-amber-700 font-semibold' : 'text-stone-700 hover:text-stone-900'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{t.nav.home}</span>
      </button>

      <button
        onClick={() => {
          onSelectTab('schemes');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
          activeTab === 'schemes' ? 'text-amber-700 font-semibold' : 'text-stone-700 hover:text-stone-900'
        }`}
      >
        <Landmark className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{t.nav.schemes}</span>
      </button>

      {/* Center Action - Match / Wizard */}
      <button
        onClick={() => {
          onSelectTab('find-wizard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex flex-col items-center justify-center -mt-4 bg-linear-to-b from-amber-500 to-amber-600 text-white p-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform"
      >
        <Compass className="w-5 h-5" />
        <span className="text-[9px] font-bold mt-0.5">Match</span>
      </button>

      <button
        onClick={() => {
          onSelectTab('scholarships');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
          activeTab === 'scholarships' ? 'text-amber-700 font-semibold' : 'text-stone-700 hover:text-stone-900'
        }`}
      >
        <GraduationCap className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">{t.nav.scholarships}</span>
      </button>

      <button
        onClick={() => {
          onSelectTab('saved');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`relative flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
          activeTab === 'saved' ? 'text-amber-700 font-semibold' : 'text-stone-700 hover:text-stone-900'
        }`}
      >
        <Bookmark className="w-5 h-5" />
        {savedCount > 0 && (
          <span className="absolute top-0 right-1 bg-amber-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {savedCount}
          </span>
        )}
        <span className="text-[10px] mt-0.5">{t.nav.saved}</span>
      </button>
    </nav>
  );
};
