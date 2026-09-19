import React, { useState } from 'react';
import { 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  Coins,
  HeartHandshake
} from 'lucide-react';
import { Scheme, LanguageCode } from '../types';
import { ALL_INDIAN_STATES } from '../data/states';
import { TRANSLATIONS } from '../data/translations';
import { SchemeCard } from './SchemeCard';

interface FindSchemesWizardProps {
  schemes: Scheme[];
  currentLanguage: LanguageCode;
  savedSchemeIds: string[];
  onToggleSave: (schemeId: string) => void;
  onViewDetails: (scheme: Scheme) => void;
  onExplainEligibility: (scheme: Scheme) => void;
  recommendationsMap?: Map<string, { isRecommended: boolean; reason: string }>;
}

export const FindSchemesWizard: React.FC<FindSchemesWizardProps> = ({
  schemes,
  currentLanguage,
  savedSchemeIds,
  onToggleSave,
  onViewDetails,
  onExplainEligibility,
  recommendationsMap,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<{
    state: string;
    age: number;
    occupation: string;
    education: string;
    income: number;
    supportType: string;
  }>({
    state: 'All India',
    age: 22,
    occupation: 'Student',
    education: 'College / Undergraduate',
    income: 200000,
    supportType: 'All',
  });

  const [hasCompleted, setHasCompleted] = useState(false);

  const occupations = [
    'Student',
    'Farmer / Cultivator',
    'Street Vendor / Small Trader',
    'Artisan / Craftsman',
    'Business Owner / MSME',
    'Unemployed Youth / Jobseeker',
    'Woman / Homemaker',
    'Senior Citizen',
    'Daily Wage Earner / Construction Worker',
    'Employed / Professional',
  ];

  const educationLevels = [
    'Below 10th',
    '10th Pass (Matriculate)',
    '12th Pass (Higher Secondary)',
    'Diploma / ITI',
    'College / Undergraduate (BA, BSc, BCom, BTech, MBBS, etc.)',
    'Postgraduate / Research (MA, MSc, MTech, PhD)',
  ];

  const incomeBrackets = [
    { label: 'Below ₹1,00,000 / year (Low income / BPL)', value: 90000 },
    { label: '₹1,00,000 – ₹2,50,000 / year', value: 200000 },
    { label: '₹2,50,000 – ₹4,50,000 / year', value: 350000 },
    { label: '₹4,50,000 – ₹8,00,000 / year (EWS limit)', value: 600000 },
    { label: 'Above ₹8,00,000 / year', value: 1000000 },
  ];

  const supportTypes = [
    { label: 'All Benefits', value: 'All' },
    { label: 'Scholarships & Higher Education', value: 'Education' },
    { label: 'Agriculture & Farm Subsidies', value: 'Agriculture' },
    { label: 'Free Healthcare & Treatment', value: 'Healthcare' },
    { label: 'Business, Loans & Self-Employment', value: 'Business' },
    { label: 'Housing & Home Construction (Awas)', value: 'Housing' },
    { label: 'Women & Girls Welfare', value: 'Women' },
    { label: 'Skill Training & Employment', value: 'Employment' },
  ];

  // Match ranking algorithm
  const matchedSchemes = (Array.isArray(schemes) ? schemes : []).filter((s) => {
    if (!s || !s.id) return false;

    // 1. State check
    if (s.state && s.state !== 'All India' && answers.state !== 'All India' && s.state !== answers.state) {
      return false;
    }

    // 2. Age check
    if (s.eligibility?.minAge && answers.age < s.eligibility.minAge) {
      return false;
    }
    if (s.eligibility?.maxAge && answers.age > s.eligibility.maxAge) {
      return false;
    }

    // 3. Income check
    if (s.eligibility?.incomeLimit && answers.income > s.eligibility.incomeLimit) {
      return false;
    }

    // 4. Support type category check
    if (answers.supportType !== 'All') {
      if (answers.supportType === 'Education' && s.type !== 'scholarship' && s.category !== 'Education') {
        return false;
      }
      if (answers.supportType !== 'Education' && s.category !== answers.supportType) {
        return false;
      }
    }

    return true;
  });

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      setHasCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setHasCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Wizard Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3 border border-amber-200">
          <Compass className="w-3.5 h-3.5 text-amber-700" />
          <span>{t.wizard.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
          {t.wizard.title}
        </h2>
        <p className="mt-2 text-sm text-stone-600 max-w-xl mx-auto">
          {t.wizard.subtitle}
        </p>
      </div>

      {!hasCompleted ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          {/* Step Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
              <span>{t.wizard.step} {currentStep} {t.wizard.of} 6</span>
              <span className="text-amber-800">{Math.round((currentStep / 6) * 100)}% Completed</span>
            </div>
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* QUESTION 1: STATE */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-stone-900">{t.wizard.q1}</h3>
              </div>
              <p className="text-xs text-stone-500">
                Some schemes are nationwide Central schemes, while others are sponsored exclusively by your state government.
              </p>
              <select
                value={answers.state}
                onChange={(e) => setAnswers({ ...answers, state: e.target.value })}
                className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-amber-500"
              >
                <option value="All India">All India (Central Government Schemes)</option>
                {ALL_INDIAN_STATES.map((st) => (
                  <option key={st.code} value={st.name}>
                    {st.name} ({st.type})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* QUESTION 2: AGE */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-lg font-bold text-stone-900">{t.wizard.q2}</h3>
              <p className="text-xs text-stone-500">
                Different scholarships and pension/welfare schemes have specific minimum and maximum age criteria.
              </p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="90"
                  value={answers.age}
                  onChange={(e) => setAnswers({ ...answers, age: parseInt(e.target.value) || 20 })}
                  className="w-full accent-amber-600 h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
                <div className="w-20 text-center py-2 px-3 bg-amber-50 border border-amber-300 rounded-xl font-bold text-amber-900 text-lg">
                  {answers.age} <span className="text-xs font-normal">yrs</span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-stone-500 px-1">
                <span>5 yrs</span>
                <span>18 yrs (Adult)</span>
                <span>60+ yrs (Senior)</span>
                <span>90 yrs</span>
              </div>
            </div>
          )}

          {/* QUESTION 3: OCCUPATION */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-stone-900">{t.wizard.q3}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {occupations.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setAnswers({ ...answers, occupation: occ })}
                    className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      answers.occupation === occ
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 4: EDUCATION */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-stone-900">{t.wizard.q4}</h3>
              </div>
              <div className="space-y-2">
                {educationLevels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setAnswers({ ...answers, education: lvl })}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      answers.education === lvl
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 5: ANNUAL INCOME */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-stone-900">{t.wizard.q5}</h3>
              </div>
              <p className="text-xs text-stone-500">
                Most scholarships and welfare subsidies are designed for citizens within specific income ceilings.
              </p>
              <div className="space-y-2">
                {incomeBrackets.map((bracket) => (
                  <button
                    key={bracket.label}
                    onClick={() => setAnswers({ ...answers, income: bracket.value })}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      answers.income === bracket.value
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {bracket.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUESTION 6: SUPPORT TYPE */}
          {currentStep === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-rose-600" />
                <h3 className="text-lg font-bold text-stone-900">{t.wizard.q6}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {supportTypes.map((st) => (
                  <button
                    key={st.value}
                    onClick={() => setAnswers({ ...answers, supportType: st.value })}
                    className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      answers.supportType === st.value
                        ? 'bg-amber-100 border-amber-600 text-amber-950 font-bold shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.wizard.back}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>{currentStep === 6 ? t.wizard.seeMatches : t.wizard.next}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* RESULTS VIEW */
        <div className="space-y-6 animate-in fade-in">
          {/* Mandatory Government Match Disclaimer */}
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Important Civic Notice
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/90 font-medium leading-relaxed mt-0.5">
                {t.wizard.disclaimer}
              </p>
            </div>
          </div>

          {/* Matched Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200">
            <div>
              <h3 className="text-lg font-bold text-stone-900">
                {matchedSchemes.length} {t.wizard.matchedTitle}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Profile: {answers.state} • Age {answers.age} • {answers.occupation} • ₹{answers.income.toLocaleString('en-IN')}/yr
              </p>
            </div>
            <button
              onClick={handleRestart}
              className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-lg border border-stone-300 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.wizard.startAgain}</span>
            </button>
          </div>

          {/* Matched Schemes Grid */}
          {matchedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedSchemes.map((scheme) => (
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
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900">No Direct Matches for These Exact Filters</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try selecting &quot;All India&quot; for the state, or choose &quot;All Benefits&quot; in the support type question.
              </p>
              <button
                onClick={handleRestart}
                className="mt-2 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl"
              >
                Modify Answers
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
