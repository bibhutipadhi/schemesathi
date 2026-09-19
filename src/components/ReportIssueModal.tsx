import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Scheme } from '../types';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  schemes: Scheme[];
  preSelectedSchemeId?: string;
  onSubmitReport: (report: {
    id: string;
    schemeId: string;
    schemeName: string;
    issueType: string;
    description: string;
    reportedAt: string;
    contactEmail?: string;
  }) => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  schemes,
  preSelectedSchemeId,
  onSubmitReport,
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState(preSelectedSchemeId || (schemes[0]?.id || ''));
  const [issueType, setIssueType] = useState('Expired Deadline');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scheme = schemes.find((s) => s.id === selectedSchemeId);
    onSubmitReport({
      id: 'rep_' + Date.now(),
      schemeId: selectedSchemeId,
      schemeName: scheme ? scheme.name : 'General Platform Issue',
      issueType,
      description,
      reportedAt: new Date().toISOString(),
      contactEmail,
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <div className="p-2.5 bg-red-100 text-red-700 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Report Incorrect Information
            </h3>
            <p className="text-xs text-stone-500">
              Help us maintain 100% verified, accurate civic data
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-stone-900">Report Submitted!</h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Thank you for keeping SchemeSathi reliable. Our civic verification team will review and update the portal within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-sm">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Scheme or Scholarship
              </label>
              <select
                value={selectedSchemeId}
                onChange={(e) => setSelectedSchemeId(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="general">-- General Platform / Other --</option>
                {schemes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.state})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                What type of issue did you notice?
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              >
                <option value="Expired Deadline">Application Deadline is passed / incorrect</option>
                <option value="Broken Official Link">Official .gov.in application link is broken</option>
                <option value="Inaccurate Eligibility">Eligibility criteria or income limit is changed</option>
                <option value="Benefit Amount Changed">Financial benefit or scholarship amount changed</option>
                <option value="Suspicious Scam Found">Found fake portal or fraudulent caller claiming this scheme</option>
                <option value="Other Correction">Other error</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Details & Official Notification Reference
              </label>
              <textarea
                required
                rows={3}
                placeholder="Explain the correction or paste the official government gazette / portal notification URL..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2.5 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Email (Optional, if you wish to receive verification update)
              </label>
              <input
                type="email"
                placeholder="citizen@example.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-stone-700 hover:bg-stone-100 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
