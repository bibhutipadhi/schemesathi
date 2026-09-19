import { Scheme } from '../types';

function normalizeOfficialUrl(value: unknown, fallback: string): string {
  const candidate = typeof value === 'string' ? value.trim() : '';
  if (!candidate) return fallback;
  if (candidate === 'https://scholarships.gov.in/fresh/newstdRegfrmInstruction') {
    return 'https://scholarships.gov.in';
  }
  if (candidate === 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx') {
    return 'https://www.indiapost.gov.in';
  }
  return /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
}

/**
 * Safely sanitizes any raw scheme object (e.g. from localStorage or network)
 * to guarantee that all nested structures, arrays, and properties exist and avoid runtime TypeErrors.
 */
export function sanitizeScheme(raw: any): Scheme {
  if (!raw || typeof raw !== 'object') {
    return {
      id: `scheme-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: 'Untitled Scheme',
      shortDescription: '',
      description: '',
      department: 'Government Department',
      state: 'All India',
      category: 'Social Welfare',
      level: 'Central',
      type: 'scheme',
      benefitsHighlight: '',
      benefits: [],
      whoCanApply: '',
      eligibility: {
        minAge: undefined,
        maxAge: undefined,
        incomeLimit: undefined,
        educationRequired: '',
        gender: 'All',
        occupation: [],
        casteCategory: ['All'],
        residenceState: 'All India',
        otherCriteria: [],
      },
      documents: [],
      howToApplySteps: [],
      officialPortal: 'https://india.gov.in',
      officialWebsite: 'https://india.gov.in',
      hasVerifiedApplicationLink: false,
      status: 'Open',
      deadline: 'Ongoing',
      deadlineDate: undefined,
      verifiedSource: 'india.gov.in',
      verifiedDate: '2025-01-01',
      tags: [],
    };
  }

  const rawEligibility = raw.eligibility || {};

  return {
    id: String(raw.id || `scheme-${Date.now()}`),
    name: String(raw.name || 'Untitled Scheme'),
    shortDescription: String(raw.shortDescription || raw.description || ''),
    description: String(raw.description || raw.shortDescription || ''),
    department: String(raw.department || 'Government Department'),
    state: String(raw.state || 'All India'),
    category: raw.category || 'Social Welfare',
    level: raw.level || 'Central',
    type: raw.type === 'scholarship' ? 'scholarship' : 'scheme',
    benefitsHighlight: String(raw.benefitsHighlight || ''),
    benefits: Array.isArray(raw.benefits) ? raw.benefits.map((b: any) => String(b || '')) : [],
    whoCanApply: String(raw.whoCanApply || 'Eligible citizens'),
    eligibility: {
      minAge: typeof rawEligibility.minAge === 'number' && !isNaN(rawEligibility.minAge) ? rawEligibility.minAge : undefined,
      maxAge: typeof rawEligibility.maxAge === 'number' && !isNaN(rawEligibility.maxAge) ? rawEligibility.maxAge : undefined,
      incomeLimit: typeof rawEligibility.incomeLimit === 'number' && !isNaN(rawEligibility.incomeLimit) ? rawEligibility.incomeLimit : undefined,
      incomeDescription: rawEligibility.incomeDescription ? String(rawEligibility.incomeDescription) : undefined,
      educationRequired: rawEligibility.educationRequired ? String(rawEligibility.educationRequired) : undefined,
      gender: rawEligibility.gender || 'All',
      occupation: Array.isArray(rawEligibility.occupation) ? rawEligibility.occupation.map((o: any) => String(o || '')) : [],
      casteCategory: Array.isArray(rawEligibility.casteCategory) ? rawEligibility.casteCategory.map((c: any) => String(c || '')) : ['All'],
      residenceState: String(rawEligibility.residenceState || raw.state || 'All India'),
      otherCriteria: Array.isArray(rawEligibility.otherCriteria) ? rawEligibility.otherCriteria.map((c: any) => String(c || '')) : [],
    },
    documents: Array.isArray(raw.documents)
      ? raw.documents.map((d: any) => ({
          name: String(d?.name || 'Identity Document'),
          mandatory: Boolean(d?.mandatory ?? true),
          description: d?.description ? String(d.description) : undefined,
        }))
      : [],
    howToApplySteps: Array.isArray(raw.howToApplySteps) ? raw.howToApplySteps.map((s: any) => String(s || '')) : [],
    officialPortal: normalizeOfficialUrl(raw.officialPortal, 'https://india.gov.in'),
    officialWebsite: normalizeOfficialUrl(raw.officialWebsite, 'https://india.gov.in'),
    hasVerifiedApplicationLink: Boolean(raw.hasVerifiedApplicationLink),
    status: raw.status || 'Open',
    deadline: String(raw.deadline || 'Ongoing'),
    deadlineDate: raw.deadlineDate ? String(raw.deadlineDate) : undefined,
    verifiedSource: String(raw.verifiedSource || 'india.gov.in'),
    verifiedDate: String(raw.verifiedDate || '2025-01-01'),
    tags: Array.isArray(raw.tags) ? raw.tags.map((t: any) => String(t || '')) : [],
    isNewlyAdded: Boolean(raw.isNewlyAdded),
    isUpdated: Boolean(raw.isUpdated),
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : undefined,
    updateSummary: raw.updateSummary ? String(raw.updateSummary) : undefined,
  };
}
