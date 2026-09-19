import React from 'react';
import { X, CheckCircle2, ShieldCheck, ExternalLink, Scale, Clock, IndianRupee } from 'lucide-react';
import { Scheme, LanguageCode } from '../types';

interface SchemeComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  schemes: Scheme[];
  onRemoveFromCompare: (id: string) => void;
  onApplyOfficially: (url: string) => void;
}

export const SchemeComparisonModal: React.FC<SchemeComparisonModalProps> = ({
  isOpen,
  onClose,
  schemes,
  onRemoveFromCompare,
}) => {
  if (!isOpen || schemes.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden relative my-auto">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                Scheme Comparison Matrix
              </h2>
              <p className="text-xs text-stone-500">
                Factual side-by-side comparison to help you evaluate which program matches your requirements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Comparison Table */}
        <div className="overflow-x-auto p-4 sm:p-6 flex-1">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="p-3 bg-stone-100 font-bold text-stone-700 w-44 rounded-tl-xl border-b border-stone-200">
                  Feature / Criteria
                </th>
                {schemes.map((s) => (
                  <th
                    key={s.id}
                    className="p-3 bg-stone-50 font-bold text-stone-900 border-b border-stone-200 min-w-[240px] align-top"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                          {s.level} Govt - {s.state}
                        </span>
                        <h4 className="text-sm font-bold text-stone-900 font-serif mt-1">{s.name}</h4>
                      </div>
                      <button
                        onClick={() => onRemoveFromCompare(s.id)}
                        className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-stone-800">
              {/* Primary Benefit */}
              <tr>
                <td className="p-3 font-semibold text-stone-600 bg-stone-50/60">Benefits</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 font-semibold text-emerald-800">
                    {s.benefitsHighlight}
                  </td>
                ))}
              </tr>

              {/* Target Audience */}
              <tr>
                <td className="p-3 font-semibold text-stone-600 bg-stone-50/60">Who Can Apply</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3">
                    {s.whoCanApply}
                  </td>
                ))}
              </tr>

              {/* Age Limits */}
              <tr>
                <td className="p-3 font-semibold text-stone-600 bg-stone-50/60">Age Limit</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3">
                    {s.eligibility?.minAge ? `${s.eligibility.minAge} yrs` : 'No min'} -{' '}
                    {s.eligibility?.maxAge ? `${s.eligibility.maxAge} yrs` : 'No upper limit'}
                  </td>
                ))}
              </tr>

              {/* Income Criteria */}
              <tr>
                <td className="p-3 font-semibold text-stone-600 bg-stone-50/60">Income Ceiling</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3">
                    {s.eligibility?.incomeLimit
                      ? `Up to ₹${s.eligibility.incomeLimit.toLocaleString('en-IN')}/year`
                      : 'No specific income cap'}
                  </td>
                ))}
              </tr>

              {/* Required Documents */}
              <tr>
                <td className="p-3 font-semibold text-stone-600 bg-stone-50/60">Mandatory Documents</td>
                {schemes.map((s) => {
                  const docs = Array.isArray(s.documents) ? s.documents : [];
                  return (
                    <td key={s.id} className="p-3">
                      {docs.length > 0 ? (
                        <ul className="space-y-1">
                          {docs.map((d, i) => (
                            <li key={i} className="text-xs text-stone-700 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-stone-400 shrink-0" />
                              <span>{d?.name || 'Document'}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-xs text-stone-500">Standard KYC documents</span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Application Deadline */}
              <tr>
                <td className="p-3 font-semibold text-stone-600 bg-stone-50/60">Application Deadline</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3 font-bold text-stone-900">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      {s.deadline} ({s.status})
                    </span>
                  </td>
                ))}
              </tr>

              {/* Official Application Portal */}
              <tr>
                <td className="p-3 font-semibold text-stone-600 bg-stone-50/60">Official Portal</td>
                {schemes.map((s) => (
                  <td key={s.id} className="p-3">
                    {s.hasVerifiedApplicationLink ? (
                      <a
                        href={s.officialPortal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200"
                      >
                        <span>Apply on Official Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs text-stone-500">Official Link Unavailable</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>
            Comparing {schemes.length} schemes. SchemeSathi presents neutral facts without ranking.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white font-semibold rounded-xl cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
