import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ClipboardCheck, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Calendar, 
  FileText, 
  RotateCcw, 
  ShieldCheck, 
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Scheme, LanguageCode, ApplicationProgressStep, SchemeApplicationProgress } from '../types';

export const DEFAULT_APPLICATION_STEPS: ApplicationProgressStep[] = [
  {
    id: 'step_eligibility',
    title: 'Eligibility Verified',
    description: 'Confirmed all official criteria: age limit, annual family income ceiling, domicile state, and caste/category prerequisites.',
  },
  {
    id: 'step_documents',
    title: 'Documents Collected',
    description: 'Gathered official proofs: Aadhaar, income certificate, bank passbook/account details, residence certificate, and educational marksheets.',
  },
  {
    id: 'step_portal_reg',
    title: 'Official Portal Registration',
    description: 'Created a verified citizen account or login ID on the designated official .gov.in, .nic.in, or state DBT portal.',
  },
  {
    id: 'step_form_submitted',
    title: 'Form Submitted',
    description: 'Completed application details, uploaded attested documents, previewed draft, and submitted before the declared deadline.',
  },
  {
    id: 'step_ref_saved',
    title: 'Application Reference ID Saved',
    description: 'Recorded the official application tracking number/acknowledgement ID and downloaded the submission receipt PDF.',
  },
  {
    id: 'step_verification',
    title: 'Field / Institutional Verification',
    description: 'Cleared local inspection, physical verification at CSC/Tehsil, or college nodal officer endorsement if mandated.',
  },
  {
    id: 'step_benefit_received',
    title: 'Benefit / DBT Disbursed',
    description: 'Financial assistance credited directly via Direct Benefit Transfer (DBT), scholarship sanctioned, or official approval card issued.',
  },
];

interface ApplicationProgressTrackerProps {
  savedSchemes: Scheme[];
  currentLanguage: LanguageCode;
  onViewDetails?: (scheme: Scheme) => void;
}

export const ApplicationProgressTracker: React.FC<ApplicationProgressTrackerProps> = ({
  savedSchemes,
  currentLanguage,
  onViewDetails,
}) => {
  // 1. Progress State map: schemeId -> SchemeApplicationProgress
  const [progressMap, setProgressMap] = useState<Record<string, SchemeApplicationProgress>>(() => {
    try {
      const cached = localStorage.getItem('schemesathi_application_progress');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      // Ignore parse failure
    }
    return {};
  });

  // Selected scheme in the progress tracker
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(() => {
    return savedSchemes.length > 0 ? savedSchemes[0].id : '';
  });

  // Update selected scheme if current one disappears
  useEffect(() => {
    if (savedSchemes.length > 0) {
      if (!selectedSchemeId || !savedSchemes.some((s) => s.id === selectedSchemeId)) {
        setSelectedSchemeId(savedSchemes[0].id);
      }
    } else {
      setSelectedSchemeId('');
    }
  }, [savedSchemes, selectedSchemeId]);

  // Save to localStorage when progressMap updates
  useEffect(() => {
    localStorage.setItem('schemesathi_application_progress', JSON.stringify(progressMap));
  }, [progressMap]);

  // Helper to get or init progress for a scheme
  const getSchemeProgress = (schemeId: string): SchemeApplicationProgress => {
    return (
      progressMap[schemeId] || {
        schemeId,
        completedSteps: [],
        customSteps: [],
        referenceNumber: '',
        submissionDate: '',
        notes: '',
        updatedAt: new Date().toISOString(),
      }
    );
  };

  const activeScheme = savedSchemes.find((s) => s.id === selectedSchemeId) || savedSchemes[0];
  const activeProgress = activeScheme ? getSchemeProgress(activeScheme.id) : null;

  // Custom step input state
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDesc, setNewStepDesc] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Toggle step completion
  const handleToggleStep = (schemeId: string, stepId: string) => {
    setProgressMap((prev) => {
      const current = prev[schemeId] || {
        schemeId,
        completedSteps: [],
        customSteps: [],
        referenceNumber: '',
        submissionDate: '',
        notes: '',
        updatedAt: new Date().toISOString(),
      };

      const isCompleted = current.completedSteps.includes(stepId);
      const nextCompleted = isCompleted
        ? current.completedSteps.filter((id) => id !== stepId)
        : [...current.completedSteps, stepId];

      return {
        ...prev,
        [schemeId]: {
          ...current,
          completedSteps: nextCompleted,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  // Mark all steps complete
  const handleMarkAllComplete = (schemeId: string) => {
    const current = getSchemeProgress(schemeId);
    const allStepIds = [
      ...DEFAULT_APPLICATION_STEPS.map((s) => s.id),
      ...(current.customSteps || []).map((s) => s.id),
    ];

    setProgressMap((prev) => ({
      ...prev,
      [schemeId]: {
        ...current,
        completedSteps: allStepIds,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  // Reset steps for scheme
  const handleResetSteps = (schemeId: string) => {
    if (window.confirm('Reset all progress checkmarks for this scheme?')) {
      setProgressMap((prev) => {
        const current = getSchemeProgress(schemeId);
        return {
          ...prev,
          [schemeId]: {
            ...current,
            completedSteps: [],
            updatedAt: new Date().toISOString(),
          },
        };
      });
    }
  };

  // Update Reference Number
  const handleUpdateRefNumber = (schemeId: string, ref: string) => {
    setProgressMap((prev) => {
      const current = getSchemeProgress(schemeId);
      return {
        ...prev,
        [schemeId]: {
          ...current,
          referenceNumber: ref,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  // Update Submission Date
  const handleUpdateSubmissionDate = (schemeId: string, date: string) => {
    setProgressMap((prev) => {
      const current = getSchemeProgress(schemeId);
      return {
        ...prev,
        [schemeId]: {
          ...current,
          submissionDate: date,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  // Update Notes
  const handleUpdateNotes = (schemeId: string, notes: string) => {
    setProgressMap((prev) => {
      const current = getSchemeProgress(schemeId);
      return {
        ...prev,
        [schemeId]: {
          ...current,
          notes,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  // Add custom step
  const handleAddCustomStep = () => {
    if (!newStepTitle.trim() || !activeScheme) return;

    const newStep: ApplicationProgressStep = {
      id: `custom_${Date.now()}`,
      title: newStepTitle.trim(),
      description: newStepDesc.trim() || 'Custom applicant milestone',
      isCustom: true,
    };

    setProgressMap((prev) => {
      const current = getSchemeProgress(activeScheme.id);
      const existingCustom = current.customSteps || [];
      return {
        ...prev,
        [activeScheme.id]: {
          ...current,
          customSteps: [...existingCustom, newStep],
          updatedAt: new Date().toISOString(),
        },
      };
    });

    setNewStepTitle('');
    setNewStepDesc('');
    setIsAddingStep(false);
  };

  // Delete custom step
  const handleDeleteCustomStep = (schemeId: string, stepId: string) => {
    setProgressMap((prev) => {
      const current = getSchemeProgress(schemeId);
      const updatedCustom = (current.customSteps || []).filter((s) => s.id !== stepId);
      const updatedCompleted = current.completedSteps.filter((id) => id !== stepId);
      return {
        ...prev,
        [schemeId]: {
          ...current,
          customSteps: updatedCustom,
          completedSteps: updatedCompleted,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  };

  // Copy ref ID to clipboard
  const handleCopyRef = (refText: string) => {
    if (!refText) return;
    navigator.clipboard.writeText(refText);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  // If no saved schemes, don't render tracker
  if (savedSchemes.length === 0) {
    return null;
  }

  // Calculate high-level stats across all saved schemes
  let totalSavedCount = savedSchemes.length;
  let inProgressCount = 0;
  let fullyCompletedCount = 0;
  let totalCompletedStepsAcrossAll = 0;

  savedSchemes.forEach((s) => {
    const prog = getSchemeProgress(s.id);
    const totalForScheme = DEFAULT_APPLICATION_STEPS.length + (prog.customSteps?.length || 0);
    const doneForScheme = prog.completedSteps.length;
    totalCompletedStepsAcrossAll += doneForScheme;

    if (doneForScheme === 0) {
      // not started
    } else if (doneForScheme >= totalForScheme) {
      fullyCompletedCount++;
    } else {
      inProgressCount++;
    }
  });

  // Calculate active scheme metrics
  const activeAllSteps: ApplicationProgressStep[] = activeProgress
    ? [...DEFAULT_APPLICATION_STEPS, ...(activeProgress.customSteps || [])]
    : DEFAULT_APPLICATION_STEPS;

  const activeCompletedCount = activeProgress?.completedSteps.length || 0;
  const activeTotalCount = activeAllSteps.length;
  const activePercent = activeTotalCount > 0 ? Math.round((activeCompletedCount / activeTotalCount) * 100) : 0;

  return (
    <section id="application-progress-tracker" className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden mb-8">
      {/* Tracker Header */}
      <div className="p-6 sm:p-8 bg-linear-to-r from-stone-900 via-stone-900 to-stone-800 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2.5">
              <ClipboardCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Citizen Application Journey</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
              Application Progress Tracker
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              Keep track of documents collected, online submissions, acknowledgement reference IDs, and verification statuses for your saved schemes.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl px-4 py-2.5 text-center min-w-[100px]">
              <span className="text-[10px] text-stone-400 font-mono uppercase block">Saved</span>
              <span className="text-xl font-bold text-white">{totalSavedCount}</span>
            </div>
            <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl px-4 py-2.5 text-center min-w-[100px]">
              <span className="text-[10px] text-amber-300 font-mono uppercase block">In Progress</span>
              <span className="text-xl font-bold text-amber-400">{inProgressCount}</span>
            </div>
            <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl px-4 py-2.5 text-center min-w-[100px]">
              <span className="text-[10px] text-emerald-300 font-mono uppercase block">Completed</span>
              <span className="text-xl font-bold text-emerald-400">{fullyCompletedCount}</span>
            </div>
          </div>
        </div>

        {/* Scheme Selector Tabs */}
        <div className="mt-6 pt-5 border-t border-stone-800">
          <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5 font-mono">
            Select Scheme to Track ({savedSchemes.length}):
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {savedSchemes.map((scheme) => {
              const prog = getSchemeProgress(scheme.id);
              const total = DEFAULT_APPLICATION_STEPS.length + (prog.customSteps?.length || 0);
              const done = prog.completedSteps.length;
              const isSelected = scheme.id === activeScheme?.id;

              return (
                <button
                  key={scheme.id}
                  id={`tracker-tab-${scheme.id}`}
                  onClick={() => setSelectedSchemeId(scheme.id)}
                  className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md scale-102'
                      : 'bg-stone-800/90 text-stone-300 hover:text-white hover:bg-stone-800 border-stone-700'
                  }`}
                >
                  <span className="truncate max-w-[180px] sm:max-w-[220px]">
                    {scheme.name}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isSelected
                        ? 'bg-stone-950/20 text-stone-950'
                        : done === total
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : done > 0
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-stone-700 text-stone-300'
                    }`}
                  >
                    {done}/{total}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Scheme Tracker Body */}
      {activeScheme && activeProgress && (
        <div className="p-6 sm:p-8 space-y-6">
          {/* Active Scheme Header Card */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200 uppercase font-mono">
                  {activeScheme.level} Government • {activeScheme.category}
                </span>
                <span className="text-[11px] font-medium text-stone-600 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Deadline: <strong>{activeScheme.deadline}</strong></span>
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
                {activeScheme.name}
              </h3>
              <p className="text-xs text-stone-600">
                {activeScheme.department} • Official Source:{' '}
                <span className="font-mono text-stone-800">{activeScheme.verifiedSource}</span>
              </p>
            </div>

            {/* Quick Actions & Official Link */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {onViewDetails && (
                <button
                  onClick={() => onViewDetails(activeScheme)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                >
                  View Scheme Details
                </button>
              )}
              {activeScheme.officialPortal && (
                <a
                  href={activeScheme.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Progress Bar & Status Pill */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono">
                  Progress Status:
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 ${
                    activePercent === 100
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : activePercent > 0
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-stone-200 text-stone-700 border border-stone-300'
                  }`}
                >
                  {activePercent === 100 ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Application Completed</span>
                    </>
                  ) : activePercent > 0 ? (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>In Progress ({activeCompletedCount} of {activeTotalCount} steps)</span>
                    </>
                  ) : (
                    <span>Not Started (0 of {activeTotalCount} steps)</span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <button
                  onClick={() => handleMarkAllComplete(activeScheme.id)}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline cursor-pointer"
                >
                  Mark All Complete
                </button>
                <span className="text-stone-300">•</span>
                <button
                  onClick={() => handleResetSteps(activeScheme.id)}
                  className="text-stone-500 hover:text-stone-800 font-semibold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="relative w-full h-3.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  activePercent === 100
                    ? 'bg-emerald-600'
                    : activePercent >= 50
                    ? 'bg-amber-500'
                    : 'bg-amber-400'
                }`}
                style={{ width: `${activePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-stone-500 font-medium">
              <span>{activeCompletedCount} steps checked off</span>
              <span className="font-bold text-stone-800">{activePercent}% Completed</span>
            </div>
          </div>

          {/* Reference ID & Application Details Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-stone-50/70 border border-stone-200/80 rounded-2xl p-4 sm:p-5">
            {/* Reference Number */}
            <div className="space-y-1.5">
              <label
                htmlFor={`ref-input-${activeScheme.id}`}
                className="text-xs font-bold text-stone-800 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Application / Acknowledgement Reference No.</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`ref-input-${activeScheme.id}`}
                  type="text"
                  placeholder="e.g. PMK-2026-981244 or NSP-REG-019"
                  value={activeProgress.referenceNumber || ''}
                  onChange={(e) => handleUpdateRefNumber(activeScheme.id, e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 font-mono"
                />
                {activeProgress.referenceNumber && (
                  <button
                    onClick={() => handleCopyRef(activeProgress.referenceNumber || '')}
                    className="shrink-0 p-2 text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
                    title="Copy Reference ID"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
              <p className="text-[10px] text-stone-500">
                Keep your tracking slip or SMS reference ID handy for verification inquiries.
              </p>
            </div>

            {/* Submission Date & Notes */}
            <div className="space-y-1.5">
              <label
                htmlFor={`date-input-${activeScheme.id}`}
                className="text-xs font-bold text-stone-800 flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>Submission Date &amp; Notes</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  id={`date-input-${activeScheme.id}`}
                  type="date"
                  value={activeProgress.submissionDate || ''}
                  onChange={(e) => handleUpdateSubmissionDate(activeScheme.id, e.target.value)}
                  className="text-xs sm:text-sm bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <input
                  type="text"
                  placeholder="Notes (e.g., CSC visit on Friday)"
                  value={activeProgress.notes || ''}
                  onChange={(e) => handleUpdateNotes(activeScheme.id, e.target.value)}
                  className="text-xs sm:text-sm bg-white border border-stone-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
              <p className="text-[10px] text-stone-500">
                Data is saved securely on this device in your personal browser storage.
              </p>
            </div>
          </div>

          {/* Interactive Steps Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-2">
                <span>Application Milestones Checklist</span>
                <span className="text-xs font-normal text-stone-500 lowercase">
                  (check off as you complete)
                </span>
              </h4>

              <button
                id="add-custom-step-btn"
                onClick={() => setIsAddingStep(!isAddingStep)}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Custom Step</span>
              </button>
            </div>

            {/* Inline Custom Step Creator */}
            {isAddingStep && (
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-3 animate-in fade-in">
                <div className="text-xs font-bold text-amber-950">Add a custom milestone for this application:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Step Title (e.g., College Principal Signature)"
                    value={newStepTitle}
                    onChange={(e) => setNewStepTitle(e.target.value)}
                    className="sm:col-span-1 text-xs bg-white border border-amber-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Brief description or instructions (optional)"
                    value={newStepDesc}
                    onChange={(e) => setNewStepDesc(e.target.value)}
                    className="sm:col-span-2 text-xs bg-white border border-amber-300 rounded-xl px-3 py-2 text-stone-900 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddCustomStep}
                    disabled={!newStepTitle.trim()}
                    className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs"
                  >
                    Save Step
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingStep(false);
                      setNewStepTitle('');
                      setNewStepDesc('');
                    }}
                    className="px-3 py-1.5 text-stone-600 hover:text-stone-800 text-xs font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Checklist Items */}
            <div className="space-y-2.5">
              {activeAllSteps.map((step, index) => {
                const isChecked = activeProgress.completedSteps.includes(step.id);

                return (
                  <div
                    key={step.id}
                    id={`step-item-${step.id}`}
                    onClick={() => handleToggleStep(activeScheme.id, step.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-200/90 shadow-2xs'
                        : 'bg-white hover:bg-stone-50 border-stone-200 shadow-xs'
                    }`}
                  >
                    {/* Checkbox Trigger */}
                    <button
                      type="button"
                      id={`step-checkbox-${step.id}`}
                      aria-label={`Mark step ${step.title} as ${isChecked ? 'pending' : 'completed'}`}
                      className="mt-0.5 shrink-0 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStep(activeScheme.id, step.id);
                      }}
                    >
                      {isChecked ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-stone-300 hover:border-amber-500 bg-white flex items-center justify-center transition-colors">
                          <span className="text-[10px] text-stone-400 font-bold">{index + 1}</span>
                        </div>
                      )}
                    </button>

                    {/* Step Title & Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs sm:text-sm font-bold ${
                              isChecked ? 'text-emerald-950 line-through decoration-emerald-600/50' : 'text-stone-900'
                            }`}
                          >
                            {step.title}
                          </span>
                          {step.isCustom && (
                            <span className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded border border-stone-200">
                              Custom
                            </span>
                          )}
                        </div>

                        {/* If custom step, allow deletion */}
                        {step.isCustom && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCustomStep(activeScheme.id, step.id);
                            }}
                            className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete custom step"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <p
                        className={`text-xs mt-0.5 leading-relaxed ${
                          isChecked ? 'text-emerald-800/80' : 'text-stone-600'
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
