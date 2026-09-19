import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Calendar, 
  ExternalLink, 
  Coins, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Bookmark, 
  BookmarkCheck,
  Building,
  Sparkles
} from 'lucide-react';
import { Scheme, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SchemeCard } from './SchemeCard';

interface ScholarshipsViewProps {
  schemes: Scheme[];
  currentLanguage: LanguageCode;
  savedSchemeIds: string[];
  onToggleSave: (id: string) => void;
  onViewDetails: (scheme: Scheme) => void;
  onExplainEligibility: (scheme: Scheme) => void;
  recommendationsMap?: Map<string, { isRecommended: boolean; reason: string }>;
}

export const ScholarshipsView: React.FC<ScholarshipsViewProps> = ({
  schemes,
  currentLanguage,
  savedSchemeIds,
  onToggleSave,
  onViewDetails,
  onExplainEligibility,
  recommendationsMap,
}) => {
  const [scholarshipFilter, setScholarshipFilter] = useState<'All' | 'School' | 'Higher Education' | 'Girls' | 'Technical'>('All');
  const [scholarshipSearch, setScholarshipSearch] = useState('');

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  // Filter only scholarship-type schemes or education category
  const allScholarships = (Array.isArray(schemes) ? schemes : []).filter(
    (s) => s && s.id && (s.type === 'scholarship' || s.category === 'Education')
  );

  const filteredScholarships = allScholarships.filter((s) => {
    // Search query
    const q = (scholarshipSearch || '').toLowerCase();
    const matchSearch =
      !q ||
      (s.name || '').toLowerCase().includes(q) ||
      (s.department || '').toLowerCase().includes(q) ||
      (s.whoCanApply || '').toLowerCase().includes(q) ||
      (s.shortDescription || s.description || '').toLowerCase().includes(q);

    // Tag filter
    if (scholarshipFilter === 'Girls') {
      return matchSearch && (s.eligibility?.gender === 'Female' || (s.name || '').toLowerCase().includes('pragati') || (s.name || '').toLowerCase().includes('girls'));
    }
    if (scholarshipFilter === 'Higher Education') {
      return matchSearch && ((s.eligibility?.educationRequired || '').toLowerCase().includes('college') || (s.eligibility?.educationRequired || '').toLowerCase().includes('undergraduate'));
    }
    if (scholarshipFilter === 'Technical') {
      return matchSearch && ((s.name || '').toLowerCase().includes('aicte') || (s.eligibility?.educationRequired || '').toLowerCase().includes('technical') || (s.eligibility?.educationRequired || '').toLowerCase().includes('diploma'));
    }
    if (scholarshipFilter === 'School') {
      return matchSearch && ((s.eligibility?.educationRequired || '').toLowerCase().includes('class') || (s.eligibility?.educationRequired || '').toLowerCase().includes('matric'));
    }

    return matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-900 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-md border border-emerald-800/40 relative overflow-hidden mb-8">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold mb-3 border border-emerald-700/60">
            <GraduationCap className="w-4 h-4 text-emerald-300" />
            <span>National &amp; State Student Portal</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif leading-tight">
            Scholarships for Indian Students
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
            Verified scholarships from the Ministry of Education, UGC, AICTE, and State Welfare Boards. 
            All links lead to official government portals like <strong>scholarships.gov.in</strong>.
          </p>

          {/* Search within scholarships */}
          <div className="mt-6 flex items-center bg-white dark:bg-stone-900 rounded-xl p-1.5 max-w-lg shadow-md border border-stone-200 dark:border-stone-700">
            <Search className="w-5 h-5 text-stone-400 ml-2" />
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Search scholarship name, course, state..."
              value={scholarshipSearch}
              onChange={(e) => setScholarshipSearch(e.target.value)}
              className="flex-1 min-w-0 px-3 py-1.5 text-stone-900 dark:text-stone-100 bg-transparent text-xs sm:text-sm focus:outline-hidden placeholder-stone-400"
            />
            {scholarshipSearch && (
              <button
                onClick={() => setScholarshipSearch('')}
                className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 px-2 font-semibold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Student Anti-Scam Notice */}
        <div className="mt-6 sm:mt-8 p-3.5 bg-emerald-950/80 border border-emerald-700/40 rounded-xl text-xs text-emerald-200 flex items-start gap-2.5 max-w-2xl">
          <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong>Warning for Students:</strong> National Scholarship Portal (NSP) applications are 100% free. Never pay any fee, commission, or OTP to anyone claiming to approve your scholarship.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['All', 'School', 'Higher Education', 'Girls', 'Technical'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setScholarshipFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                scholarshipFilter === tab
                  ? 'bg-emerald-800 dark:bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {tab === 'All' ? 'All Scholarships' : tab}
            </button>
          ))}
        </div>

        <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
          Showing <strong>{filteredScholarships.length}</strong> verified scholarships
        </div>
      </div>

      {/* Scholarship Grid */}
      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scheme) => (
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
        <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 space-y-3">
          <GraduationCap className="w-10 h-10 text-stone-300 dark:text-stone-600 mx-auto" />
          <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">No Scholarships Found</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            Try clearing your search term or switching to the &quot;All Scholarships&quot; tab.
          </p>
          <button
            onClick={() => {
              setScholarshipFilter('All');
              setScholarshipSearch('');
            }}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold rounded-xl cursor-pointer"
          >
            Reset Scholarship Filters
          </button>
        </div>
      )}
    </div>
  );
};
