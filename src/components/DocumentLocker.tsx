import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  ShieldCheck, 
  FolderLock, 
  RotateCcw, 
  Download, 
  Search, 
  Filter, 
  Sparkles, 
  Info,
  Check,
  Building2,
  Bookmark
} from 'lucide-react';
import { CitizenDocumentItem, CitizenDocStatus, Scheme, LanguageCode } from '../types';
import { DEFAULT_CITIZEN_DOCUMENTS } from '../data/citizenDocs';

interface DocumentLockerProps {
  currentLanguage: LanguageCode;
  savedSchemes: Scheme[];
  onViewSchemeDetails: (scheme: Scheme) => void;
}

const STORAGE_KEY = 'schemesathi_citizen_docs';

export const DocumentLocker: React.FC<DocumentLockerProps> = ({
  currentLanguage,
  savedSchemes,
  onViewSchemeDetails,
}) => {
  const [documents, setDocuments] = useState<CitizenDocumentItem[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_CITIZEN_DOCUMENTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load stored citizen docs', e);
    }
    return DEFAULT_CITIZEN_DOCUMENTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (e) {
      // ignore
    }
  }, [documents]);

  const handleUpdateStatus = (id: string, newStatus: CitizenDocStatus) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          return {
            ...doc,
            status: newStatus,
            verifiedAt: newStatus === 'ready' ? new Date().toISOString() : undefined,
          };
        }
        return doc;
      })
    );
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset document locker checklist to original default status?')) {
      setDocuments(DEFAULT_CITIZEN_DOCUMENTS);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // ignore
      }
    }
  };

  // Readiness Calculations
  const stats = useMemo(() => {
    const applicableDocs = documents.filter((d) => d.status !== 'not_applicable');
    const readyCount = applicableDocs.filter((d) => d.status === 'ready').length;
    const pendingCount = applicableDocs.filter((d) => d.status === 'pending').length;
    const score = applicableDocs.length > 0 ? Math.round((readyCount / applicableDocs.length) * 100) : 100;

    return {
      total: applicableDocs.length,
      readyCount,
      pendingCount,
      score,
    };
  }, [documents]);

  // Filtered Documents
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [documents, selectedCategory, searchQuery]);

  // Cross-check with saved schemes
  const savedSchemesReadiness = useMemo(() => {
    return savedSchemes.map((scheme) => {
      const schemeDocNames = scheme.documents.map((d) => d.name.toLowerCase());
      const readyDocNames = documents
        .filter((d) => d.status === 'ready')
        .map((d) => d.name.toLowerCase());

      let matchedCount = 0;
      scheme.documents.forEach((sDoc) => {
        const lower = sDoc.name.toLowerCase();
        const hasMatch = readyDocNames.some(
          (rd) =>
            (lower.includes('aadhaar') && rd.includes('aadhaar')) ||
            (lower.includes('bank') && rd.includes('bank')) ||
            (lower.includes('income') && rd.includes('income')) ||
            (lower.includes('caste') && rd.includes('caste')) ||
            (lower.includes('domicile') && rd.includes('domicile')) ||
            (lower.includes('resident') && rd.includes('resident')) ||
            (lower.includes('ration') && rd.includes('ration')) ||
            (lower.includes('mark') && rd.includes('marksheet')) ||
            (lower.includes('land') && rd.includes('land')) ||
            (lower.includes('disability') && rd.includes('disability'))
        );
        if (hasMatch) matchedCount++;
      });

      const totalRequired = scheme.documents.length;
      const pct = totalRequired > 0 ? Math.round((matchedCount / totalRequired) * 100) : 100;

      return {
        scheme,
        matchedCount,
        totalRequired,
        pct,
        isFullyReady: matchedCount >= totalRequired,
      };
    });
  }, [savedSchemes, documents]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-950 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 mb-8 border border-emerald-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold mb-3">
            <FolderLock className="w-3.5 h-3.5" />
            <span>Citizen Prerequisite &amp; Document Locker</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-tight text-white mb-2">
            Document Readiness Vault
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            The #1 reason government applications and scholarship payments get delayed or rejected is mismatched certificates, missing e-KYC, or unseeded bank accounts. Track your verified certificates here to ensure zero rejections.
          </p>
        </div>
      </div>

      {/* Readiness Meter & Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-8 bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Application Readiness Score
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black font-serif text-stone-900 dark:text-stone-100">
                  {stats.score}%
                </span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {stats.readyCount} of {stats.total} Documents Ready
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                stats.score >= 80 
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                  : stats.score >= 50 
                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300' 
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
              }`}>
                {stats.score >= 80 ? 'High Readiness' : stats.score >= 50 ? 'Moderate Readiness' : 'Needs Attention'}
              </span>
              <button
                onClick={handleResetToDefault}
                className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                title="Reset Document Status"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                stats.score >= 80 ? 'bg-emerald-500' : stats.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
              }`}
              style={{ width: `${stats.score}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-500 mt-2">
            <span>Aadhaar, NPCI &amp; Banking essentials</span>
            <span>{stats.pendingCount} document(s) pending renewal or verification</span>
          </div>
        </div>

        {/* Official Quick Portals Box */}
        <div className="md:col-span-4 bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-3xl border border-emerald-200/80 dark:border-emerald-900/40 shadow-xs flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Verification Gateways</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Direct official Government of India portals to check e-KYC and download certificates:
            </p>
          </div>

          <div className="space-y-2 pt-3">
            <a
              href="https://myaadhaar.uidai.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-stone-900 text-xs font-semibold text-stone-800 dark:text-stone-200 border border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-500 transition-colors"
            >
              <span>UIDAI MyAadhaar (e-KYC)</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
            <a
              href="https://digilocker.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-stone-900 text-xs font-semibold text-stone-800 dark:text-stone-200 border border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-500 transition-colors"
            >
              <span>DigiLocker India</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Saved Schemes Readiness Cross-Check (if user has saved schemes) */}
      {savedSchemes.length > 0 && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 mb-8 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
              Readiness for Your Saved Schemes ({savedSchemes.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedSchemesReadiness.map(({ scheme, matchedCount, totalRequired, pct, isFullyReady }) => (
              <div
                key={scheme.id}
                className="p-4 rounded-2xl border border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-semibold text-stone-500 uppercase">
                      {scheme.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isFullyReady
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}>
                      {matchedCount}/{totalRequired} Docs ({pct}%)
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                    {scheme.name}
                  </h3>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    {isFullyReady ? 'Ready to submit!' : 'Missing documents'}
                  </span>
                  <button
                    onClick={() => onViewSchemeDetails(scheme)}
                    className="text-xs font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 cursor-pointer"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Checklist Section */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xs">
        {/* Controls: Search & Category Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100 dark:border-stone-800">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents (e.g. Aadhaar, Income, Land)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { id: 'all', label: 'All Documents' },
              { id: 'identity', label: 'Identity' },
              { id: 'banking', label: 'Banking / DBT' },
              { id: 'income_caste', label: 'Income & Caste' },
              { id: 'residence', label: 'Residence' },
              { id: 'property', label: 'Property' },
              { id: 'education', label: 'Education' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-medium cursor-pointer transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                doc.status === 'ready'
                  ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/50'
                  : doc.status === 'pending'
                  ? 'bg-amber-50/30 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/50'
                  : 'bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 uppercase">
                      {doc.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Authority: <strong>{doc.issuingAuthority}</strong>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                    {doc.description}
                  </p>

                  <div className="text-[11px] text-stone-500 pt-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{doc.validityNote}</span>
                  </div>

                  {/* Official Portal Link */}
                  {doc.officialPortalUrl && (
                    <div className="pt-2">
                      <a
                        href={doc.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        <span>Verify / Apply at {doc.portalName || 'Official Portal'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-200 dark:border-stone-800">
                  <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(doc.id, 'ready')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        doc.status === 'ready'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>Ready</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(doc.id, 'pending')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        doc.status === 'pending'
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>Pending</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(doc.id, 'not_applicable')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        doc.status === 'not_applicable'
                          ? 'bg-stone-600 text-white shadow-xs'
                          : 'text-stone-400 hover:text-stone-600'
                      }`}
                      title="Not applicable for my profile"
                    >
                      N/A
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
