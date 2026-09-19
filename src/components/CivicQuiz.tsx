import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Share2, 
  BookOpen, 
  Trophy,
  Bot,
  Languages,
  Sparkles
} from 'lucide-react';
import { 
  CIVIC_QUIZ_QUESTIONS, 
  getLocalizedQuizQuestion, 
  getQuizUIStrings 
} from '../data/quizQuestions';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, TOP_LANGUAGE_OBJECTS } from '../data/languages';

interface CivicQuizProps {
  currentLanguage: LanguageCode;
  onExploreSchemes: () => void;
  onAskAI?: (prompt: string) => void;
}

export const CivicQuiz: React.FC<CivicQuizProps> = ({
  currentLanguage,
  onExploreSchemes,
  onAskAI,
}) => {
  const [quizLanguage, setQuizLanguage] = useState<LanguageCode>(currentLanguage);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [shareToast, setShareToast] = useState<boolean>(false);

  // Sync if outer app language changes
  useEffect(() => {
    setQuizLanguage(currentLanguage);
  }, [currentLanguage]);

  const ui = getQuizUIStrings(quizLanguage);
  const totalQuestions = CIVIC_QUIZ_QUESTIONS.length;
  const rawQ = CIVIC_QUIZ_QUESTIONS[currentIndex];
  const currentQ = getLocalizedQuizQuestion(rawQ, quizLanguage);

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  // Score Calculation
  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
    const q = CIVIC_QUIZ_QUESTIONS[Number(qIdx)];
    if (q && q.correctIndex === ansIdx) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const getCitizenBadge = (userScore: number, total: number) => {
    const pct = (userScore / total) * 100;
    if (pct === 100) {
      return {
        title: ui.championTitle,
        desc: ui.championDesc,
        badgeColor: 'bg-amber-500 text-stone-950 font-bold',
      };
    } else if (pct >= 75) {
      return {
        title: ui.vigilantTitle,
        desc: ui.vigilantDesc,
        badgeColor: 'bg-emerald-600 text-white font-bold',
      };
    } else if (pct >= 50) {
      return {
        title: ui.awareTitle,
        desc: ui.awareDesc,
        badgeColor: 'bg-sky-600 text-white font-bold',
      };
    } else {
      return {
        title: ui.learnerTitle,
        desc: ui.learnerDesc,
        badgeColor: 'bg-stone-800 text-white font-bold',
      };
    }
  };

  const badge = getCitizenBadge(score, totalQuestions);

  const handleShareResult = async () => {
    const text = `I scored ${score}/${totalQuestions} on the SchemeSathi Civic Rights & Scheme Quiz! Earned badge: ${badge.title}. Test your welfare awareness here!`;
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 4000);
    }
  };

  const handleAskAIAboutQuestion = () => {
    if (onAskAI) {
      const prompt = `Please explain this civic rule in detail (${quizLanguage}): "${currentQ.question}". Why is the answer: "${currentQ.options[rawQ.correctIndex]}"?`;
      onAskAI(prompt);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>{ui.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white mb-2">
              {ui.title}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {ui.subtitle}
            </p>
          </div>

          {/* Language Selector in Quiz Header */}
          <div className="bg-stone-800/80 backdrop-blur-xs border border-amber-500/30 rounded-2xl p-3.5 self-start md:self-center shrink-0 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold mb-2">
              <Languages className="w-4 h-4" />
              <span>{ui.changeLanguage}</span>
            </div>
            <select
              value={quizLanguage}
              onChange={(e) => setQuizLanguage(e.target.value as LanguageCode)}
              className="w-full bg-stone-900 text-white text-xs font-medium px-3 py-2 rounded-xl border border-stone-700 focus:outline-hidden focus:border-amber-400 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Language Switcher Pills */}
        <div className="mt-5 pt-4 border-t border-stone-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-stone-400 shrink-0 text-[11px] font-medium mr-1">Quick Select:</span>
          {TOP_LANGUAGE_OBJECTS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setQuizLanguage(l.code)}
              className={`px-3 py-1 rounded-full text-xs transition-all shrink-0 cursor-pointer ${
                quizLanguage === l.code
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700/60'
              }`}
            >
              {l.nativeName}
            </button>
          ))}
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-900 dark:text-stone-100">
                {ui.questionOf} {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold text-[11px]">
                {currentQ.category}
              </span>
            </div>

            <div className="font-semibold text-amber-700 dark:text-amber-400">
              {ui.scoreLabel}: {score}/{currentIndex + (selectedAnswers[currentIndex] !== undefined ? 1 : 0)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.schemeRelated && (
              <span className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 block">
                {ui.relatedScheme}: <strong className="text-amber-700 dark:text-amber-400">{currentQ.schemeRelated}</strong>
              </span>
            )}
          </div>

          {/* Options List */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentIndex] === idx;
              const hasAnswered = selectedAnswers[currentIndex] !== undefined;
              const isCorrect = idx === rawQ.correctIndex;

              let btnStyle = 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-amber-400 hover:bg-stone-100 dark:hover:bg-stone-750';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold ring-1 ring-emerald-500/50';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 font-bold ring-1 ring-rose-500/50';
                } else {
                  btnStyle = 'bg-stone-50/50 dark:bg-stone-900/30 border-stone-200 dark:border-stone-800 opacity-40';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </div>

                  {hasAnswered && (
                    <div className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-200">
                  <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{ui.explanationHeader}</span>
                </div>

                {onAskAI && (
                  <button
                    type="button"
                    onClick={handleAskAIAboutQuestion}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 hover:bg-black text-amber-300 text-xs font-medium cursor-pointer transition-colors shadow-xs"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>{ui.askAIHint}</span>
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls */}
          {selectedAnswers[currentIndex] !== undefined && (
            <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800 animate-in fade-in">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <span>{currentIndex === totalQuestions - 1 ? ui.viewResults : ui.nextQuestion}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-8 sm:p-10 shadow-xs text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div>
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-3 shadow-xs">
              <span className={`px-4 py-1.5 rounded-full text-xs sm:text-sm ${badge.badgeColor}`}>
                {badge.title}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black font-serif text-stone-900 dark:text-stone-100">
              {ui.youScored} {score} / {totalQuestions}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-lg mx-auto mt-3 leading-relaxed">
              {badge.desc}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{ui.retakeQuiz}</span>
            </button>

            <button
              onClick={handleShareResult}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>{ui.shareScore}</span>
            </button>

            <button
              onClick={onExploreSchemes}
              className="px-5 py-2.5 bg-stone-900 hover:bg-black dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <span>{ui.exploreSchemes}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {shareToast && (
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in">
              {ui.scoreCopied}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
