export type LanguageCode =
  | 'en'
  | 'hi'
  | 'or'
  | 'kn'
  | 'bn'
  | 'te'
  | 'ta'
  | 'ml'
  | 'mr'
  | 'gu'
  | 'pa'
  | 'as'
  | 'ur'
  | 'sa'
  | 'mai'
  | 'ne'
  | 'kok'
  | 'sat'
  | 'sd'
  | 'doi'
  | 'mni'
  | 'brx'
  | 'ks';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag?: string;
}

export type SchemeType = 'scheme' | 'scholarship';

export type SchemeStatus = 'Open' | 'Closing Soon' | 'Closed' | 'Coming Soon';

export type SchemeCategory =
  | 'Education'
  | 'Scholarships'
  | 'Healthcare'
  | 'Agriculture'
  | 'Farmers'
  | 'Women'
  | 'Children'
  | 'Senior Citizens'
  | 'Employment'
  | 'Skill Development'
  | 'Housing'
  | 'Financial Assistance'
  | 'Business'
  | 'Startups'
  | 'MSMEs'
  | 'Rural Development'
  | 'Social Welfare'
  | 'Disability Support'
  | 'Digital Services';

export interface SchemeDocument {
  name: string;
  description?: string;
  mandatory: boolean;
}

export interface SchemeEligibility {
  minAge?: number;
  maxAge?: number;
  gender?: 'All' | 'Female' | 'Male' | 'Transgender';
  incomeLimit?: number; // annual family income in INR (e.g., 250000)
  incomeDescription?: string;
  educationRequired?: string;
  occupation?: string[];
  casteCategory?: string[]; // e.g. ['General', 'SC', 'ST', 'OBC', 'EWS', 'Minority']
  residenceState?: string; // 'All India' or specific state
  otherCriteria?: string[];
}

export interface Scheme {
  id: string;
  name: string;
  titleTranslations?: Partial<Record<LanguageCode, string>>;
  shortDescription: string;
  description?: string;
  descriptionTranslations?: Partial<Record<LanguageCode, string>>;
  category: SchemeCategory;
  type: SchemeType;
  level: 'Central' | 'State';
  state: string; // 'All India' or Indian State Name
  department: string;
  benefits: string[];
  benefitsHighlight: string;
  whoCanApply: string;
  eligibility: SchemeEligibility;
  documents: SchemeDocument[];
  deadline: string;
  deadlineDate?: string; // YYYY-MM-DD for sorting/filtering
  status: SchemeStatus;
  officialWebsite: string;
  officialPortal: string;
  hasVerifiedApplicationLink: boolean;
  verifiedDate: string;
  verifiedSource: string;
  howToApplySteps: string[];
  tags?: string[];
  // Indicators for newly added / recently updated schemes
  isNewlyAdded?: boolean;
  isUpdated?: boolean;
  updatedAt?: string; // ISO string or human date
  updateSummary?: string; // brief note about what changed (e.g. deadline extended, new budget allocated)
}

export interface FilterState {
  searchQuery: string;
  category: string;
  state: string;
  schemeType: 'all' | 'scheme' | 'scholarship';
  status: string;
  age: string;
  education: string;
  income: string;
  occupation: string;
  gender: string;
}

export interface QuestionnaireAnswers {
  state: string;
  age: number | '';
  occupation: string;
  education: string;
  annualIncome: string;
  supportType: string;
  gender?: string;
  category?: string;
}

export interface IncorrectInfoReport {
  id: string;
  schemeId: string;
  schemeName: string;
  reason: string;
  details: string;
  reportedUrl?: string;
  reportedAt: string;
  status: 'Pending' | 'Reviewed' | 'Fixed';
}

export interface ApplicationProgressStep {
  id: string;
  title: string;
  description: string;
  isCustom?: boolean;
}

export interface SchemeApplicationProgress {
  schemeId: string;
  completedSteps: string[];
  customSteps?: ApplicationProgressStep[];
  referenceNumber?: string;
  submissionDate?: string;
  notes?: string;
  updatedAt: string;
}

export type CitizenDocStatus = 'ready' | 'pending' | 'not_applicable';

export interface CitizenDocumentItem {
  id: string;
  name: string;
  category: 'identity' | 'banking' | 'income_caste' | 'residence' | 'education' | 'property' | 'special';
  description: string;
  issuingAuthority: string;
  validityNote: string;
  status: CitizenDocStatus;
  verifiedAt?: string;
  officialPortalUrl?: string;
  portalName?: string;
}

export interface CivicQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  schemeRelated?: string;
  category: string;
  translations?: Partial<
    Record<
      LanguageCode,
      {
        question: string;
        options: string[];
        explanation: string;
        schemeRelated?: string;
        category?: string;
      }
    >
  >;
}

export interface HelplineContact {
  id: string;
  name: string;
  number: string;
  tollFree: boolean;
  description: string;
  department: string;
  operatingHours: string;
  category: 'emergency_fraud' | 'health' | 'agriculture' | 'education' | 'social_welfare' | 'housing' | 'consumer';
  officialWebsite?: string;
}

