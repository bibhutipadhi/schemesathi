import React, { useRef } from 'react';
import { 
  Printer, 
  X, 
  Download, 
  CheckSquare, 
  Square, 
  ShieldAlert, 
  ExternalLink, 
  Landmark, 
  CheckCircle2, 
  PhoneCall,
  Calendar
} from 'lucide-react';
import { Scheme, LanguageCode } from '../types';

interface PrintDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSchemes: Scheme[];
  currentLanguage: LanguageCode;
}

export const PrintDossierModal: React.FC<PrintDossierModalProps> = ({
  isOpen,
  onClose,
  savedSchemes,
  currentLanguage,
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // Collect unique documents across all saved schemes
  const consolidatedDocs = Array.from(
    new Set(
      savedSchemes.flatMap((s) => s.documents.map((d) => d.name.trim()))
    )
  );

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white dark:bg-stone-900 w-full max-w-4xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/50 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Print Citizen Application Dossier &amp; CSC Checklist
              </h2>
              <p className="text-xs text-stone-500">
                Ready-to-print slip for your visit to Common Service Center (Jan Seva Kendra) or Cyber Cafe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-stone-900 hover:bg-black dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Content Area */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 text-stone-900 bg-white" id="printable-dossier" ref={printAreaRef}>
          {/* Printable Official Header */}
          <div className="border-b-2 border-stone-900 pb-5 mb-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xl font-black tracking-tight font-serif uppercase text-amber-700">
                  SchemeSathi
                </span>
                <span className="text-xs font-bold text-stone-500 border-l border-stone-300 pl-2">
                  Citizen Welfare Portal
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight mt-1 text-stone-900">
                Citizen Welfare Application Dossier &amp; Kiosk Slip
              </h1>
              <p className="text-[11px] text-stone-500">
                Generated from verified central &amp; state scheme databases on {currentDate}
              </p>
            </div>

            <div className="text-center sm:text-right border border-stone-300 p-2.5 rounded-xl bg-stone-50 text-xs">
              <span className="block text-[10px] uppercase font-bold text-stone-500">Target Schemes</span>
              <span className="text-base font-bold text-stone-900 font-mono">{savedSchemes.length} Scheme(s)</span>
            </div>
          </div>

          {/* Citizen Details Box (Blank for physical handwriting or reference) */}
          <div className="border border-stone-300 rounded-xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-stone-50/50">
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-semibold">Applicant Name</span>
              <div className="h-6 border-b border-dashed border-stone-400 mt-1" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-semibold">Aadhaar (Last 4)</span>
              <div className="h-6 border-b border-dashed border-stone-400 mt-1" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-semibold">Bank Account / IFSC</span>
              <div className="h-6 border-b border-dashed border-stone-400 mt-1" />
            </div>
            <div>
              <span className="text-[10px] text-stone-500 uppercase block font-semibold">Contact Mobile</span>
              <div className="h-6 border-b border-dashed border-stone-400 mt-1" />
            </div>
          </div>

          {/* Targeted Schemes List */}
          <div className="mb-6 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 flex items-center justify-between">
              <span>Target Government Schemes &amp; Scholarships</span>
              <span className="text-[10px] font-normal text-stone-500">Take to Jan Seva Kendra / CSC</span>
            </h2>

            {savedSchemes.map((scheme, idx) => (
              <div
                key={scheme.id}
                className="p-3.5 border border-stone-300 rounded-xl space-y-1.5 break-inside-avoid text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-stone-900">
                    {idx + 1}. {scheme.name}
                  </span>
                  <span className="text-[10px] font-semibold bg-stone-100 px-2 py-0.5 rounded border border-stone-300">
                    {scheme.level} Govt • {scheme.state}
                  </span>
                </div>

                <p className="text-stone-600 text-[11px]">
                  <strong>Key Benefits:</strong> {scheme.benefits.slice(0, 2).join('; ')}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-stone-500 pt-1 border-t border-stone-200">
                  <span><strong>Deadline:</strong> {scheme.deadline}</span>
                  <span><strong>Official Portal:</strong> {scheme.officialWebsite}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Consolidated Document Checklist */}
          <div className="mb-6 break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 mb-3">
              Consolidated Documents Checklist (Carry Original + 2 Photocopies)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {consolidatedDocs.map((docName, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 border border-stone-200 rounded-lg bg-stone-50/50"
                >
                  <div className="w-4 h-4 border-2 border-stone-500 rounded-xs shrink-0" />
                  <span className="text-stone-800 text-[11px] font-medium">{docName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Verification & Anti-Scam Guide */}
          <div className="border border-stone-900 rounded-xl p-4 bg-stone-50 text-xs break-inside-avoid space-y-2">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-xs uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Official Citizen Protection &amp; Helpline Reference</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              • <strong>Zero Scam Fee:</strong> Never pay any middleman to apply. All central scholarship and welfare applications are processed free of charge on official government portals (.gov.in / .nic.in).<br />
              • <strong>Cyber Crime Helpline:</strong> If an agent demands money or asks for your banking OTP, immediately dial <strong>1930</strong>.<br />
              • <strong>Ayushman Bharat PM-JAY:</strong> Toll-Free <strong>14555</strong> | <strong>Kisan Call Centre:</strong> <strong>1800-180-1551</strong>
            </p>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex items-center justify-between text-xs print:hidden">
          <span className="text-stone-500">
            Ensure your printer settings are set to Portrait and standard A4 page size.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer font-medium"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Dossier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
