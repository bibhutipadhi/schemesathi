import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ExternalLink, 
  Landmark, 
  ShieldCheck, 
  CheckCircle2, 
  Filter 
} from 'lucide-react';
import { Scheme, LanguageCode } from '../types';
import { ALL_INDIAN_STATES } from '../data/states';
import { TRANSLATIONS } from '../data/translations';
import { SchemeCard } from './SchemeCard';

interface StateSchemesViewProps {
  schemes: Scheme[];
  currentLanguage: LanguageCode;
  savedSchemeIds: string[];
  onToggleSave: (id: string) => void;
  onViewDetails: (scheme: Scheme) => void;
  onExplainEligibility: (scheme: Scheme) => void;
  recommendationsMap?: Map<string, { isRecommended: boolean; reason: string }>;
}

export const StateSchemesView: React.FC<StateSchemesViewProps> = ({
  schemes,
  currentLanguage,
  savedSchemeIds,
  onToggleSave,
  onViewDetails,
  onExplainEligibility,
  recommendationsMap,
}) => {
  const [selectedState, setSelectedState] = useState<string>('Odisha');
  const [stateSearch, setStateSearch] = useState('');
  const [showStateOnly, setShowStateOnly] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const filteredStates = ALL_INDIAN_STATES.filter((st) => {
    const q = (stateSearch || '').toLowerCase();
    if (!q) return true;
    return (st?.name || '').toLowerCase().includes(q);
  });

  const currentStateObj = ALL_INDIAN_STATES.find((s) => s.name === selectedState) || ALL_INDIAN_STATES[0];

  // Schemes for this state: either matches state name or is Central (All India)
  const stateSchemes = (Array.isArray(schemes) ? schemes : []).filter((s) => {
    if (!s || !s.id) return false;
    if (showStateOnly) {
      return s.state === selectedState;
    }
    return s.state === selectedState || s.state === 'All India';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* State View Header */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-sky-700" />
              <span>State &amp; Union Territory Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              Government Schemes in {selectedState}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Explore state-specific welfare initiatives and nationwide Central schemes for residents of {selectedState}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={currentStateObj.officialPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Official {selectedState} Govt Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* State Selector Buttons Grid & Search */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Select State / UT:
            </label>
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Find state..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Quick Clickable Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {filteredStates.map((st) => (
              <button
                key={st.code}
                onClick={() => setSelectedState(st.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedState === st.name
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Count Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowStateOnly(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              !showStateOnly
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Available in {selectedState} (State + Central)
          </button>
          <button
            onClick={() => setShowStateOnly(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              showStateOnly
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {selectedState} State Government Exclusives
          </button>
        </div>

        <div className="text-xs text-stone-500">
          Showing <strong>{stateSchemes.length}</strong> verified schemes
        </div>
      </div>

      {/* Schemes Grid */}
      {stateSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stateSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              currentLanguage={currentLanguage}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={onToggleSave}
              onViewDetails={onViewDetails}
              onExplainEligibility={onExplainEligibility}
              isRecommended={recommendationsMap?.get(scheme.id)?.isRecommended}
              recommendationReason={recommendationsMap?.get(scheme.id)?.reason}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
          <MapPin className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-900">No Exclusive State Schemes Cataloged Yet</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You can toggle to view all Central government schemes accessible to residents of {selectedState}.
          </p>
          <button
            onClick={() => setShowStateOnly(false)}
            className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Show All Available Schemes
          </button>
        </div>
      )}
    </div>
  );
};
