import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Search, 
  Building, 
  Clock,
  Layers,
  Save,
  X,
  UploadCloud,
} from 'lucide-react';
import { Scheme, SchemeCategory } from '../types';

interface AdminDashboardProps {
  schemes: Scheme[];
  onAddScheme: (scheme: Scheme) => void;
  onUpdateScheme: (scheme: Scheme) => void;
  onDeleteScheme: (id: string) => void;
  reports: Array<{
    id: string;
    schemeId: string;
    schemeName: string;
    issueType: string;
    description: string;
    reportedAt: string;
    contactEmail?: string;
  }>;
  onResolveReport: (reportId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  schemes,
  onAddScheme,
  onUpdateScheme,
  onDeleteScheme,
  reports,
  onResolveReport,
}) => {
  const [activeTab, setActiveTab] = useState<'schemes' | 'reports' | 'add'>('schemes');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [showNetlifyModal, setShowNetlifyModal] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // New Scheme Form State
  const [formData, setFormData] = useState<Partial<Scheme>>({
    name: '',
    department: '',
    state: 'All India',
    level: 'Central',
    category: 'Education',
    type: 'scheme',
    benefitsHighlight: '',
    benefits: [''],
    whoCanApply: '',
    deadline: 'Ongoing 2026',
    status: 'Open',
    officialWebsite: '',
    officialPortal: '',
    hasVerifiedApplicationLink: true,
    verifiedDate: new Date().toLocaleDateString('en-GB'),
    verifiedSource: 'National Portal of India (.gov.in)',
    eligibility: {
      minAge: 18,
      maxAge: 40,
      gender: 'All',
      residenceState: 'All India',
      otherCriteria: [],
    },
    documents: [{ name: 'Aadhaar Card', mandatory: true }],
    howToApplySteps: [
      'Visit the official website',
      'Register using Mobile number and Aadhaar',
      'Submit the application form and note the reference number',
    ],
  });

  const filteredSchemes = (Array.isArray(schemes) ? schemes : []).filter(
    (s) => {
      if (!s || !s.id) return false;
      const q = (searchQuery || '').toLowerCase();
      if (!q) return true;
      return (
        (s.name || '').toLowerCase().includes(q) ||
        (s.department || '').toLowerCase().includes(q) ||
        (s.state || '').toLowerCase().includes(q) ||
        (s.shortDescription || s.description || '').toLowerCase().includes(q)
      );
    }
  );

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(schemes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `schemesathi_verified_database_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadNetlifyZip = () => {
    // Direct link to download the compiled static drop package
    const link = document.createElement('a');
    link.href = '/api/download-netlify-drop';
    link.setAttribute('download', 'schemesathi-netlify-drop.zip');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const normalizeUrl = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  const handleSaveNewScheme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.officialWebsite) return;

    const newScheme: Scheme = {
      id: 'sch_' + Date.now(),
      name: formData.name || 'Unnamed Scheme',
      department: formData.department || 'Ministry / Department of India',
      state: formData.state || 'All India',
      level: formData.level || 'Central',
      category: (formData.category as SchemeCategory) || 'Education',
      type: formData.type || 'scheme',
      shortDescription: formData.benefitsHighlight || formData.name || '',
      description: formData.description || formData.benefitsHighlight || '',
      benefitsHighlight: formData.benefitsHighlight || '',
      benefits: formData.benefits?.filter(Boolean) || [formData.benefitsHighlight || ''],
      whoCanApply: formData.whoCanApply || 'Indian Citizens',
      eligibility: formData.eligibility || { gender: 'All' },
      documents: formData.documents || [{ name: 'Aadhaar Card', mandatory: true }],
      deadline: formData.deadline || 'Ongoing',
      status: formData.status || 'Open',
      officialWebsite: normalizeUrl(formData.officialWebsite || ''),
      officialPortal: normalizeUrl(formData.officialPortal || formData.officialWebsite || ''),
      hasVerifiedApplicationLink: formData.hasVerifiedApplicationLink ?? true,
      verifiedDate: new Date().toLocaleDateString('en-GB'),
      verifiedSource: formData.verifiedSource || 'Official Government Gazette (.gov.in)',
      howToApplySteps: formData.howToApplySteps || ['Apply on official website'],
      isNewlyAdded: formData.isNewlyAdded ?? true,
      updatedAt: new Date().toISOString(),
      updateSummary: formData.updateSummary?.trim() || 'Newly gazetted scheme published and verified on portal.',
    };

    onAddScheme(newScheme);
    setActiveTab('schemes');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScheme) return;
    const updated: Scheme = {
      ...editingScheme,
      isUpdated: editingScheme.isUpdated !== false,
      updatedAt: new Date().toISOString(),
      verifiedDate: new Date().toLocaleDateString('en-GB'),
      updateSummary: editingScheme.updateSummary?.trim() || `Details & status updated to ${editingScheme.status} on ${new Date().toLocaleDateString('en-GB')}`,
    };
    onUpdateScheme(updated);
    setEditingScheme(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-amber-300 text-xs font-semibold mb-2 border border-stone-700">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Civic-Tech Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif">
            SchemeSathi Verification &amp; Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Manage official schemes, verify deadlines, audit government links, and resolve citizen reports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowNetlifyModal(true)}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            title="Download Netlify Drop package or deploy"
          >
            <UploadCloud className="w-4 h-4 text-emerald-200" />
            <span>Netlify Drop (.zip)</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Database JSON</span>
          </button>
          <button
            onClick={() => {
              setEditingScheme(null);
              setActiveTab('add');
            }}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Scheme</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('schemes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'schemes' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          All Schemes &amp; Scholarships ({schemes.length})
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'reports' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          <span>Citizen Reports ({reports.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === 'add' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          + Add New
        </button>
      </div>

      {/* TAB 1: SCHEMES LIST */}
      {activeTab === 'schemes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search scheme name, ministry, state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Scheme &amp; Ministry</th>
                    <th className="p-3.5">Scope / State</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Status &amp; Deadline</th>
                    <th className="p-3.5">Verified Date</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-800">
                  {filteredSchemes.map((s) => (
                    <tr key={s.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-stone-900 text-sm">{s.name}</span>
                          {s.isNewlyAdded && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-600 text-white">
                              NEW
                            </span>
                          )}
                          {s.isUpdated && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-sky-600 text-white">
                              UPDATED
                            </span>
                          )}
                        </div>
                        {s.updateSummary && (
                          <div className="text-[10px] text-sky-800 font-medium truncate max-w-sm mt-0.5">
                            Update: {s.updateSummary}
                          </div>
                        )}
                        <div className="text-[11px] text-stone-500 truncate max-w-xs">{s.department}</div>
                        <a
                          href={s.officialPortal}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-emerald-700 hover:underline flex items-center gap-1 font-mono mt-0.5"
                        >
                          <span>{s.officialWebsite}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </td>
                      <td className="p-3.5">
                        <span className="font-medium">{s.level} Govt</span>
                        <div className="text-[11px] text-stone-500">{s.state}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="bg-stone-100 text-stone-800 px-2 py-0.5 rounded font-medium">
                          {s.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-stone-900">{s.status}</span>
                        <div className="text-[11px] text-stone-500">{s.deadline}</div>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-stone-600">
                        {s.verifiedDate}
                      </td>
                      <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setEditingScheme(s)}
                          className="p-1.5 text-stone-600 hover:text-amber-800 hover:bg-stone-100 rounded-lg cursor-pointer"
                          title="Edit Scheme"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteScheme(s.id)}
                          className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-stone-100 rounded-lg cursor-pointer"
                          title="Delete Scheme"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CITIZEN REPORTS */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-stone-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-base font-bold text-stone-900">All Clear! No Pending Citizen Reports</h3>
              <p className="text-xs text-stone-500 mt-1">
                Any errors or suspicious websites reported by users will show up here for moderation.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {reports.map((r) => (
                <div key={r.id} className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        {r.issueType}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900">{r.schemeName}</h4>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {new Date(r.reportedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 mt-2 bg-stone-50 p-2 rounded-lg border border-stone-100">
                      {r.description}
                    </p>
                    {r.contactEmail && (
                      <span className="text-[11px] text-stone-500 mt-1 block">
                        Reported by: {r.contactEmail}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onResolveReport(r.id)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Mark Resolved
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ADD NEW SCHEME FORM */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-3xl mx-auto shadow-xs">
          <h2 className="text-lg font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">
            Add Verified Scheme / Scholarship
          </h2>

          <form onSubmit={handleSaveNewScheme} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Scheme / Scholarship Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. PM-Kisan Samman Nidhi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Ministry / Department *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ministry of Agriculture and Farmers Welfare"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as SchemeCategory })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                >
                  <option value="Education">Education &amp; Scholarships</option>
                  <option value="Agriculture">Agriculture &amp; Farmers</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Business">Business &amp; Loans</option>
                  <option value="Housing">Housing</option>
                  <option value="Women">Women &amp; Girls</option>
                  <option value="Employment">Employment</option>
                  <option value="Financial Assistance">Financial Assistance</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'scheme' | 'scholarship' })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                >
                  <option value="scheme">Government Scheme</option>
                  <option value="scholarship">Student Scholarship</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">State / Scope</label>
                <input
                  type="text"
                  placeholder="All India or Specific State (e.g. Odisha, Karnataka)"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Application Deadline</label>
                <input
                  type="text"
                  placeholder="e.g. Ongoing 2026, 31 October 2026"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Official Website Domain *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. pmkisan.gov.in"
                  value={formData.officialWebsite}
                  onChange={(e) => setFormData({ ...formData, officialWebsite: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Official Application URL</label>
                <input
                  type="url"
                  placeholder="https://pmkisan.gov.in"
                  value={formData.officialPortal}
                  onChange={(e) => setFormData({ ...formData, officialPortal: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Benefits Highlight *</label>
              <input
                required
                type="text"
                placeholder="e.g. ₹6,000 per year directly to bank account in 3 installments"
                value={formData.benefitsHighlight}
                onChange={(e) => setFormData({ ...formData, benefitsHighlight: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Who Can Apply Summary *</label>
              <input
                required
                type="text"
                placeholder="e.g. Small and marginal landholding farmer families across India"
                value={formData.whoCanApply}
                onChange={(e) => setFormData({ ...formData, whoCanApply: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Announcement Note (Shows on Home Page Live Updates Ticker)
              </label>
              <input
                type="text"
                placeholder="e.g. Fresh portal launched for financial year 2026-27"
                value={formData.updateSummary || ''}
                onChange={(e) => setFormData({ ...formData, updateSummary: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                id="add-is-new-checkbox"
                checked={formData.isNewlyAdded ?? true}
                onChange={(e) => setFormData({ ...formData, isNewlyAdded: e.target.checked })}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <label htmlFor="add-is-new-checkbox" className="font-medium text-emerald-950 cursor-pointer">
                Highlight this scheme with a flashing <strong>"NEW SCHEME"</strong> badge and include in the Home Page Showcase &amp; Live Ticker
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setActiveTab('schemes')}
                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
              >
                Save Scheme to Verified Database
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingScheme && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setEditingScheme(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">
              Edit Scheme: {editingScheme.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Scheme Name</label>
                <input
                  type="text"
                  value={editingScheme.name}
                  onChange={(e) => setEditingScheme({ ...editingScheme, name: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status</label>
                  <select
                    value={editingScheme.status}
                    onChange={(e) => setEditingScheme({ ...editingScheme, status: e.target.value as any })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    <option value="Open">Open</option>
                    <option value="Closing Soon">Closing Soon</option>
                    <option value="Closed">Closed</option>
                    <option value="Coming Soon">Coming Soon</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Application Deadline</label>
                  <input
                    type="text"
                    value={editingScheme.deadline}
                    onChange={(e) => setEditingScheme({ ...editingScheme, deadline: e.target.value })}
                    className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Official Portal URL</label>
                <input
                  type="url"
                  value={editingScheme.officialPortal}
                  onChange={(e) => setEditingScheme({ ...editingScheme, officialPortal: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Benefits Highlight</label>
                <input
                  type="text"
                  value={editingScheme.benefitsHighlight}
                  onChange={(e) => setEditingScheme({ ...editingScheme, benefitsHighlight: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  What was updated? (Will show as notification badge on Home Page)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Deadline extended to 31st October / DBT installment released"
                  value={editingScheme.updateSummary || ''}
                  onChange={(e) => setEditingScheme({ ...editingScheme, updateSummary: e.target.value })}
                  className="w-full p-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              {/* Badges Toggle */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-wrap gap-4 text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={!!editingScheme.isNewlyAdded}
                    onChange={(e) => setEditingScheme({ ...editingScheme, isNewlyAdded: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>Highlight as <strong>NEW SCHEME</strong> badge on Home Page</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                  <input
                    type="checkbox"
                    checked={editingScheme.isUpdated !== false}
                    onChange={(e) => setEditingScheme({ ...editingScheme, isUpdated: e.target.checked })}
                    className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                  />
                  <span>Highlight as <strong>RECENTLY UPDATED</strong> badge on Home Page</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingScheme(null)}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white rounded-xl font-bold cursor-pointer"
                >
                  Update Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* NETLIFY DROP DEPLOYMENT MODAL */}
      {showNetlifyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowNetlifyModal(false)}
              className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold mb-1 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Netlify Drop Ready</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  Deploy to Netlify Drop
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 mb-5 leading-relaxed">
              Deploy this full SchemeSathi application to Netlify in 30 seconds without needing Git or the command line.
            </p>

            {/* Quick Action Button */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleDownloadNetlifyZip}
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download netlify-drop.zip Archive</span>
              </button>

              <a
                href="https://app.netlify.com/drop"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Open app.netlify.com/drop</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 3 Step Guide */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs space-y-3">
              <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                <span>3 Easy Steps to Deploy:</span>
              </div>
              <div className="space-y-2 text-stone-600">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>Click <strong>Download netlify-drop.zip</strong> above.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>Open <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-medium">app.netlify.com/drop</a> in your browser.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>Drag and drop the downloaded <strong>schemesathi-netlify-drop.zip</strong> file into the box on Netlify. Done!</span>
                </div>
              </div>
            </div>

            {/* Config summary */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Includes <code>_redirects</code> for clean SPA routing</span>
              <span className="text-emerald-700 font-medium">100% Static &amp; Secure</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
