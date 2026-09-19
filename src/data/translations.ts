import { LanguageCode } from '../types';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  subTagline: string;
  nav: {
    home: string;
    schemes: string;
    scholarships: string;
    categories: string;
    stateSchemes: string;
    findSchemes: string;
    saved: string;
    assistant: string;
    admin: string;
  };
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    searchBtn: string;
    findForMeBtn: string;
    browseCategories: string;
    verifiedBadge: string;
    totalSchemes: string;
    totalStates: string;
    officialSources: string;
  };
  filters: {
    title: string;
    allCategories: string;
    allStates: string;
    allTypes: string;
    allStatuses: string;
    stateLabel: string;
    categoryLabel: string;
    typeLabel: string;
    statusLabel: string;
    ageLabel: string;
    educationLabel: string;
    incomeLabel: string;
    occupationLabel: string;
    reset: string;
    showingResults: string;
    noResults: string;
    noResultsDesc: string;
  };
  card: {
    verifiedSource: string;
    lastVerified: string;
    benefits: string;
    whoCanApply: string;
    eligibility: string;
    documents: string;
    deadline: string;
    applyOfficially: string;
    officialLinkUnavailable: string;
    save: string;
    saved: string;
    viewDetails: string;
    explainEligibility: string;
    compare: string;
    centralGov: string;
    stateGov: string;
  };
  scamWarning: {
    title: string;
    body: string;
    learnMore: string;
    reportIssue: string;
  };
  wizard: {
    badge: string;
    title: string;
    subtitle: string;
    step: string;
    of: string;
    back: string;
    next: string;
    seeMatches: string;
    startAgain: string;
    matchedTitle: string;
    disclaimer: string;
    q1: string; // state
    q2: string; // age
    q3: string; // occupation
    q4: string; // education
    q5: string; // income
    q6: string; // support type
  };
  assistant: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    quickPrompts: string;
    disclaimer: string;
    scamAlertTitle: string;
    scamAlertBody: string;
  };
  savedSection: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    compareBtn: string;
    deadlinesTitle: string;
    clearAll: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    brandName: 'SchemeSathi',
    tagline: 'Your Guide to Government Schemes & Scholarships',
    subTagline: 'Government Benefits, Made Simple. Find. Verify. Apply.',
    nav: {
      home: 'Home',
      schemes: 'Government Schemes',
      scholarships: 'Scholarships',
      categories: 'Categories',
      stateSchemes: 'State Schemes',
      findSchemes: 'Find Schemes for Me',
      saved: 'Saved',
      assistant: 'SchemeSathi AI',
      admin: 'Admin',
    },
    hero: {
      title: 'Find the Right Government Scheme for You',
      subtitle: 'Discover government schemes, scholarships and benefits from verified official sources.',
      searchPlaceholder: 'Search for schemes, scholarships, jobs, education benefits, state...',
      searchBtn: 'Search Schemes',
      findForMeBtn: 'Find Schemes for Me',
      browseCategories: 'Browse Popular Categories',
      verifiedBadge: '100% Official .gov.in & .nic.in Sources',
      totalSchemes: 'Verified Schemes & Scholarships',
      totalStates: 'States & Union Territories',
      officialSources: 'Official Government Portals',
    },
    filters: {
      title: 'Filter & Search',
      allCategories: 'All Categories',
      allStates: 'All India & States',
      allTypes: 'All Types (Schemes & Scholarships)',
      allStatuses: 'All Statuses',
      stateLabel: 'State / UT',
      categoryLabel: 'Category',
      typeLabel: 'Scheme Type',
      statusLabel: 'Application Status',
      ageLabel: 'Your Age',
      educationLabel: 'Education Level',
      incomeLabel: 'Annual Family Income',
      occupationLabel: 'Occupation',
      reset: 'Reset Filters',
      showingResults: 'Showing verified schemes',
      noResults: 'No schemes match your exact filters',
      noResultsDesc: 'Try broadening your search term or clearing one of the filters.',
    },
    card: {
      verifiedSource: 'Official Government Source',
      lastVerified: 'Last Verified',
      benefits: 'Benefits',
      whoCanApply: 'Who Can Apply',
      eligibility: 'Eligibility',
      documents: 'Required Documents',
      deadline: 'Application Deadline',
      applyOfficially: 'Apply Officially →',
      officialLinkUnavailable: 'Official application link unavailable. Visit the official department website.',
      save: 'Save Scheme',
      saved: 'Saved',
      viewDetails: 'View Full Details',
      explainEligibility: 'Explain Eligibility',
      compare: 'Compare',
      centralGov: 'Central Government',
      stateGov: 'State Government',
    },
    scamWarning: {
      title: 'Stay Safe from Frauds & Scams',
      body: 'SchemeSathi does not ask for OTPs, UPI PINs, passwords, banking passwords or unnecessary sensitive information. Always verify the website before submitting personal information or making any payment.',
      learnMore: 'Read Safety Guide',
      reportIssue: 'Report Incorrect Information',
    },
    wizard: {
      badge: 'Interactive Matching Guide',
      title: 'Find Schemes for Me',
      subtitle: 'Answer 6 simple questions to find government schemes and scholarships you may qualify for.',
      step: 'Question',
      of: 'of',
      back: 'Back',
      next: 'Next Question',
      seeMatches: 'Show My Matching Schemes',
      startAgain: 'Restart Questionnaire',
      matchedTitle: 'Potentially Relevant Schemes For You',
      disclaimer: 'These are potential matches based on the information you provided. Please check the official government website for final eligibility.',
      q1: 'Which state or union territory are you from?',
      q2: 'What is your current age?',
      q3: 'What is your current occupation / activity?',
      q4: 'What is your highest or current education level?',
      q5: 'What is your approximate annual family income?',
      q6: 'What type of support or benefit are you looking for?',
    },
    assistant: {
      title: 'SchemeSathi AI',
      subtitle: 'Your personal government-scheme and scholarship assistant.',
      placeholder: 'Ask about eligibility, documents, application process, or schemes...',
      send: 'Ask Assistant',
      quickPrompts: 'Suggested questions:',
      disclaimer: 'AI-generated guidance grounded in SchemeSathi verified database. Always verify eligibility, deadlines, and application requirements on the official government website.',
      scamAlertTitle: 'CRITICAL SECURITY WARNING',
      scamAlertBody: 'Never share your OTP, UPI PIN, password or banking details with anyone. Government schemes never ask for money or OTPs via SMS or social media.',
    },
    savedSection: {
      title: 'My Saved Schemes & Scholarships',
      subtitle: 'Track your bookmarked schemes, monitor approaching deadlines, and compare requirements.',
      emptyTitle: 'No Saved Schemes Yet',
      emptyDesc: 'Click the "Save Scheme" bookmark icon on any card to save schemes for quick access and comparison.',
      compareBtn: 'Compare Selected Schemes',
      deadlinesTitle: 'Approaching Application Deadlines',
      clearAll: 'Clear All Saved',
    },
  },
  hi: {
    brandName: 'स्कीमसाथी',
    tagline: 'सरकारी योजनाओं और छात्रवृत्तियों के लिए आपका मार्गदर्शक',
    subTagline: 'सरकारी लाभ, अब आसान। खोजें। सत्यापित करें। आवेदन करें।',
    nav: {
      home: 'होम',
      schemes: 'सरकारी योजनाएं',
      scholarships: 'छात्रवृत्तियां',
      categories: 'श्रेणियां',
      stateSchemes: 'राज्य योजनाएं',
      findSchemes: 'मेरे लिए योजनाएं खोजें',
      saved: 'सहेजे गए',
      assistant: 'स्कीमसाथी एआई',
      admin: 'एडमिन',
    },
    hero: {
      title: 'अपने लिए सही सरकारी योजना खोजें',
      subtitle: 'सत्यापित आधिकारिक स्रोतों से सरकारी योजनाएं, छात्रवृत्तियां और लाभ खोजें।',
      searchPlaceholder: 'योजना, छात्रवृत्ति, नौकरी, शिक्षा लाभ, राज्य खोजें...',
      searchBtn: 'योजनाएं खोजें',
      findForMeBtn: 'मेरे लिए योजनाएं खोजें',
      browseCategories: 'लोकप्रिय श्रेणियां देखें',
      verifiedBadge: '100% आधिकारिक .gov.in और .nic.in स्रोत',
      totalSchemes: 'सत्यापित योजनाएं व छात्रवृत्तियां',
      totalStates: 'राज्य व केंद्र शासित प्रदेश',
      officialSources: 'आधिकारिक सरकारी पोर्टल',
    },
    filters: {
      title: 'फ़िल्टर और खोज',
      allCategories: 'सभी श्रेणियां',
      allStates: 'संपूर्ण भारत और राज्य',
      allTypes: 'सभी प्रकार (योजनाएं और छात्रवृत्तियां)',
      allStatuses: 'सभी स्थितियां',
      stateLabel: 'राज्य / केंद्र शासित प्रदेश',
      categoryLabel: 'श्रेणी',
      typeLabel: 'प्रकार',
      statusLabel: 'आवेदन स्थिति',
      ageLabel: 'आपकी आयु',
      educationLabel: 'शिक्षा स्तर',
      incomeLabel: 'वार्षिक पारिवारिक आय',
      occupationLabel: 'व्यवसाय',
      reset: 'फ़िल्टर रीसेट करें',
      showingResults: 'सत्यापित योजनाएं प्रदर्शित',
      noResults: 'फ़िल्टर से मेल खाती कोई योजना नहीं मिली',
      noResultsDesc: 'कृपया खोज शब्द बदलें या कुछ फ़िल्टर हटाएं।',
    },
    card: {
      verifiedSource: 'आधिकारिक सरकारी स्रोत',
      lastVerified: 'अंतिम सत्यापन',
      benefits: 'लाभ',
      whoCanApply: 'कौन आवेदन कर सकता है',
      eligibility: 'पात्रता',
      documents: 'आवश्यक दस्तावेज',
      deadline: 'आवेदन की अंतिम तिथि',
      applyOfficially: 'आधिकारिक आवेदन करें →',
      officialLinkUnavailable: 'आधिकारिक आवेदन लिंक अनुपलब्ध। आधिकारिक विभाग की वेबसाइट पर जाएं।',
      save: 'योजना सहेजें',
      saved: 'सहेजा गया',
      viewDetails: 'पूरा विवरण देखें',
      explainEligibility: 'पात्रता समझें',
      compare: 'तुलना करें',
      centralGov: 'केंद्र सरकार',
      stateGov: 'राज्य सरकार',
    },
    scamWarning: {
      title: 'धोखाधड़ी और घोटालों से सावधान रहें',
      body: 'स्कीमसाथी कभी भी ओटीपी, यूपीआई पिन, पासवर्ड, बैंकिंग क्रेडेंशियल या अनावश्यक संवेदनशील जानकारी नहीं मांगता है। कोई भी व्यक्तिगत जानकारी देने या भुगतान करने से पहले हमेशा वेबसाइट की जांच करें।',
      learnMore: 'सुरक्षा निर्देश पढ़ें',
      reportIssue: 'गलत जानकारी की रिपोर्ट करें',
    },
    wizard: {
      badge: 'इंटरएक्टिव मिलान गाइड',
      title: 'मेरे लिए योजनाएं खोजें',
      subtitle: 'यह जानने के लिए 6 सरल प्रश्नों के उत्तर दें कि आप किन योजनाओं के पात्र हैं।',
      step: 'प्रश्न',
      of: 'में से',
      back: 'पीछे',
      next: 'अगला प्रश्न',
      seeMatches: 'मेरी योजनाएं दिखाएं',
      startAgain: 'प्रश्नावली पुनः आरंभ करें',
      matchedTitle: 'आपके लिए संभावित प्रासंगिक योजनाएं',
      disclaimer: 'ये आपके द्वारा दी गई जानकारी के आधार पर संभावित परिणाम हैं। अंतिम पात्रता के लिए कृपया आधिकारिक सरकारी वेबसाइट अवश्य देखें।',
      q1: 'आप किस राज्य या केंद्र शासित प्रदेश से हैं?',
      q2: 'आपकी वर्तमान आयु क्या है?',
      q3: 'आपका वर्तमान व्यवसाय क्या है?',
      q4: 'आपकी शिक्षा का स्तर क्या है?',
      q5: 'आपकी अनुमानित वार्षिक पारिवारिक आय क्या है?',
      q6: 'आप किस प्रकार की सहायता या लाभ खोज रहे हैं?',
    },
    assistant: {
      title: 'स्कीमसाथी एआई',
      subtitle: 'आपका व्यक्तिगत सरकारी योजना एवं छात्रवृत्ति सहायक।',
      placeholder: 'पात्रता, आवश्यक दस्तावेज, आवेदन प्रक्रिया आदि के बारे में पूछें...',
      send: 'पूछें',
      quickPrompts: 'सुझाए गए प्रश्न:',
      disclaimer: 'स्कीमसाथी सत्यापित डेटाबेस पर आधारित एआई मार्गदर्शन। आधिकारिक पोर्टल पर अंतिम पात्रता और तिथियां अवश्य सत्यापित करें।',
      scamAlertTitle: 'महत्वपूर्ण सुरक्षा चेतावनी',
      scamAlertBody: 'अपना ओटीपी, यूपीआई पिन या बैंक पासवर्ड कभी किसी के साथ साझा न करें। सरकारी योजनाओं के लिए कभी भी पैसे या ओटीपी नहीं मांगे जाते हैं।',
    },
    savedSection: {
      title: 'मेरी सहेजी गई योजनाएं और छात्रवृत्तियां',
      subtitle: 'अपनी पसंदीदा योजनाओं पर नज़र रखें, समय-सीमा देखें और पात्रता की तुलना करें।',
      emptyTitle: 'कोई सहेजी गई योजना नहीं',
      emptyDesc: 'त्वरित पहुंच और तुलना के लिए किसी भी योजना कार्ड पर "योजना सहेजें" पर क्लिक करें।',
      compareBtn: 'चयनित योजनाओं की तुलना करें',
      deadlinesTitle: 'आगामी अंतिम तिथियां',
      clearAll: 'सभी हटाएं',
    },
  },
  or: {
    brandName: 'ସ୍କିମସାଥୀ',
    tagline: 'ସରକାରୀ ଯୋଜନା ଓ ଛାତ୍ରବୃତ୍ତି ପାଇଁ ଆପଣଙ୍କ ବିଶ୍ୱସ୍ତ ସାଥୀ',
    subTagline: 'ସରକାରୀ ସୁବିଧା, ଏବେ ସରଳ। ଖୋଜନ୍ତୁ। ଯାଞ୍ଚ କରନ୍ତୁ। ଆବେଦନ କରନ୍ତୁ।',
    nav: {
      home: 'ମୂଳପୃଷ୍ଠା',
      schemes: 'ସରକାରୀ ଯୋଜନା',
      scholarships: 'ଛାତ୍ରବୃତ୍ତି',
      categories: 'ବର୍ଗସମୂହ',
      stateSchemes: 'ରାଜ୍ୟ ଯୋଜନା',
      findSchemes: 'ମୋ ପାଇଁ ଯୋଜନା',
      saved: 'ସଂରକ୍ଷିତ',
      assistant: 'ସ୍କିମସାଥୀ AI',
      admin: 'ପ୍ରଶାସକ',
    },
    hero: {
      title: 'ଆପଣଙ୍କ ପାଇଁ ସଠିକ୍ ସରକାରୀ ଯୋଜନା ଖୋଜନ୍ତୁ',
      subtitle: 'ସରକାରୀ ଯୋଜନା, ଛାତ୍ରବୃତ୍ତି ଏବଂ ସହାୟତା ବିଶ୍ୱସନୀୟ ସରକାରୀ ଉତ୍ସରୁ ଜାଣନ୍ତୁ।',
      searchPlaceholder: 'ଯୋଜନା, ଛାତ୍ରବୃତ୍ତି, ଶିକ୍ଷା, କୃଷି, ରୋଜଗାର ଖୋଜନ୍ତୁ...',
      searchBtn: 'ଯୋଜନା ଖୋଜନ୍ତୁ',
      findForMeBtn: 'ମୋ ପାଇଁ ଯୋଜନା ଖୋଜନ୍ତୁ',
      browseCategories: 'ଲୋକପ୍ରିୟ ବର୍ଗସମୂହ',
      verifiedBadge: '୧୦୦% ସରକାରୀ .gov.in ଓ .nic.in ଉତ୍ସ',
      totalSchemes: 'ଯାଞ୍ଚ ହୋଇଥିବା ଯୋଜନା ଓ ଛାତ୍ରବୃତ୍ତି',
      totalStates: 'ଭାରତର ସମସ୍ତ ରାଜ୍ୟ',
      officialSources: 'ସରକାରୀ ପୋର୍ଟାଲ',
    },
    filters: {
      title: 'ଫିଲ୍ଟର୍ ଏବଂ ସନ୍ଧାନ',
      allCategories: 'ସମସ୍ତ ବର୍ଗ',
      allStates: 'ସମଗ୍ର ଭାରତ ଓ ରାଜ୍ୟ',
      allTypes: 'ସମସ୍ତ ପ୍ରକାର',
      allStatuses: 'ସମସ୍ତ ସ୍ଥିତି',
      stateLabel: 'ରାଜ୍ୟ / କେନ୍ଦ୍ରଶାସିତ ଅଞ୍ଚଳ',
      categoryLabel: 'ବିଭାଗ',
      typeLabel: 'ପ୍ରକାର',
      statusLabel: 'ଆବେଦନ ସ୍ଥିତି',
      ageLabel: 'ବୟସ',
      educationLabel: 'ଶିକ୍ଷାଗତ ଯୋଗ୍ୟତା',
      incomeLabel: 'ପାରିବାରିକ ଆୟ',
      occupationLabel: 'ବୃତ୍ତି',
      reset: 'ରିସେଟ୍ କରନ୍ତୁ',
      showingResults: 'ଯାଞ୍ଚିତ ଯୋଜନା ଦେଖାଯାଉଛି',
      noResults: 'କୌଣସି ଯୋଜନା ମିଳିଲା ନାହିଁ',
      noResultsDesc: 'ଅନ୍ୟ କୌଣସି ଶବ୍ଦ ବ୍ୟବହାର କରି ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ।',
    },
    card: {
      verifiedSource: 'ସରକାରୀ ପ୍ରମାଣିତ ଉତ୍ସ',
      lastVerified: 'ଶେଷ ଯାଞ୍ଚ',
      benefits: 'ସୁବିଧା ଓ ଲାଭ',
      whoCanApply: 'କିଏ ଆବେଦନ କରିପାରିବେ',
      eligibility: 'ଯୋଗ୍ୟତା',
      documents: 'ଆବଶ୍ୟକ କାଗଜପତ୍ର',
      deadline: 'ଆବେଦନର ଶେଷ ତାରିଖ',
      applyOfficially: 'ସରକାରୀ ଆବେଦନ କରନ୍ତୁ →',
      officialLinkUnavailable: 'ଆବେଦନ ଲିଙ୍କ ଉପଲବ୍ଧ ନାହିଁ। ବିଭାଗୀୟ ୱେବସାଇଟ୍ ଦେଖନ୍ତୁ।',
      save: 'ସେଭ୍ କରନ୍ତୁ',
      saved: 'ସେଭ୍ ହୋଇଛି',
      viewDetails: 'ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ',
      explainEligibility: 'ଯୋଗ୍ୟତା ବୁଝନ୍ତୁ',
      compare: 'ତୁଳନା କରନ୍ତୁ',
      centralGov: 'କେନ୍ଦ୍ର ସରକାର',
      stateGov: 'ରାଜ୍ୟ ସରକାର',
    },
    scamWarning: {
      title: 'ଠକାମି ଓ ପ୍ରତାରଣାରୁ ସାବଧାନ ରୁହନ୍ତୁ',
      body: 'ସ୍କିମସାଥୀ କେବେହେଲେ OTP, UPI PIN କିମ୍ବା ବ୍ୟାଙ୍କ ପାସୱାର୍ଡ ମାଗେ ନାହିଁ। କୌଣସି ଟଙ୍କା ଦେବା ପୂର୍ବରୁ ସର୍ବଦା ସରକାରୀ ୱେବସାଇଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ।',
      learnMore: 'ସୁରକ୍ଷା ନିୟମାବଳୀ',
      reportIssue: 'ଭୁଲ୍ ସୂଚନା ରିପୋର୍ଟ କରନ୍ତୁ',
    },
    wizard: {
      badge: 'ଯୋଜନା ଚୟନ ମାର୍ଗଦର୍ଶିକା',
      title: 'ମୋ ପାଇଁ ଯୋଜନା ଖୋଜନ୍ତୁ',
      subtitle: '୬ଟି ସରଳ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେଇ ଆପଣଙ୍କ ପାଇଁ ଉପଯୁକ୍ତ ସରକାରୀ ଯୋଜନା ଖୋଜନ୍ତୁ।',
      step: 'ପ୍ରଶ୍ନ',
      of: 'ମଧ୍ୟରୁ',
      back: 'ପଛକୁ',
      next: 'ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ',
      seeMatches: 'ଉପଯୁକ୍ତ ଯୋଜନା ଦେଖନ୍ତୁ',
      startAgain: 'ପୁନର୍ବାର ଆରମ୍ଭ କରନ୍ତୁ',
      matchedTitle: 'ଆପଣଙ୍କ ପାଇଁ ସମ୍ଭାବ୍ୟ ଯୋଜନାସମୂହ',
      disclaimer: 'ଏହି ଯୋଜନାଗୁଡ଼ିକ ଆପଣ ଦେଇଥିବା ସୂଚନା ଉପରେ ଆଧାରିତ। ଚୂଡ଼ାନ୍ତ ଯୋଗ୍ୟତା ପାଇଁ ସରକାରୀ ୱେବସାଇଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ।',
      q1: 'ଆପଣ କେଉଁ ରାଜ୍ୟର ଅଧିବାସୀ?',
      q2: 'ଆପଣଙ୍କ ବୟସ କେତେ?',
      q3: 'ଆପଣଙ୍କ ବର୍ତ୍ତମାନର ବୃତ୍ତି କ\'ଣ?',
      q4: 'ଆପଣଙ୍କ ଶିକ୍ଷାଗତ ଯୋଗ୍ୟତା କ\'ଣ?',
      q5: 'ପରିବାରର ବାର୍ଷିକ ଆୟ କେତେ?',
      q6: 'ଆପଣ କେଉଁ ପ୍ରକାର ସହାୟତା ଚାହାଁନ୍ତି?',
    },
    assistant: {
      title: 'ସ୍କିମସାଥୀ AI',
      subtitle: 'ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ସରକାରୀ ଯୋଜନା ଓ ଛାତ୍ରବୃତ୍ତି ସହାୟକ।',
      placeholder: 'ଯୋଗ୍ୟତା, ଆବଶ୍ୟକ କାଗଜପତ୍ର କିମ୍ବା ଆବେଦନ ବିଷୟରେ ପଚାରନ୍ତୁ...',
      send: 'ପଚାରନ୍ତୁ',
      quickPrompts: 'ପ୍ରସ୍ତାବିତ ପ୍ରଶ୍ନ:',
      disclaimer: 'ସ୍କିମସାଥୀ ଯାଞ୍ଚିତ ଡାଟାବେସ୍ ଉପରେ ଆଧାରିତ AI ସୂଚନା। ଚୂଡ଼ାନ୍ତ ନିଷ୍ପତ୍ତି ପାଇଁ ସରକାରୀ ପୋର୍ଟାଲ ଯାଞ୍ଚ କରନ୍ତୁ।',
      scamAlertTitle: 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସୁରକ୍ଷା ସୂଚନା',
      scamAlertBody: 'କାହାକୁ ବି ଆପଣଙ୍କ OTP ବା UPI PIN ଦିଅନ୍ତୁ ନାହିଁ। ସରକାରୀ ଯୋଜନା କେବେ ବି ଫୋନରେ ଟଙ୍କା ମାଗେ ନାହିଁ।',
    },
    savedSection: {
      title: 'ମୋର ସଂରକ୍ଷିତ ଯୋଜନାସମୂହ',
      subtitle: 'ସଂରକ୍ଷିତ ଯୋଜନା, ଆଗାମୀ ଶେଷ ତାରିଖ ଏବଂ ଯୋଗ୍ୟତା ତୁଳନା କରନ୍ତୁ।',
      emptyTitle: 'କୌଣସି ଯୋଜନା ସେଭ୍ ହୋଇନାହିଁ',
      emptyDesc: 'ଶୀଘ୍ର ଖୋଜିବା ପାଇଁ ଯୋଜନା କାର୍ଡରେ "ସେଭ୍ କରନ୍ତୁ" ବଟନ୍ ଦବାନ୍ତୁ।',
      compareBtn: 'ଯୋଜନା ତୁଳନା କରନ୍ତୁ',
      deadlinesTitle: 'ଆସନ୍ନ ଶେଷ ତାରିଖ',
      clearAll: 'ସବୁ ହଟାନ୍ତୁ',
    },
  },
  kn: {
    brandName: 'ಸ್ಕೀಮ್‌ಸಾಥಿ',
    tagline: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿಗೆ ನಿಮ್ಮ ಮಾರ್ಗದರ್ಶಿ',
    subTagline: 'ಸರ್ಕಾರಿ ಸೌಲಭ್ಯಗಳು, ಸುಲಭವಾಗಿ. ಹುಡುಕಿ. ಪರಿಶೀಲಿಸಿ. ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.',
    nav: {
      home: 'ಮುಖಪುಟ',
      schemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
      scholarships: 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು',
      categories: 'ವರ್ಗಗಳು',
      stateSchemes: 'ರಾಜ್ಯ ಯೋಜನೆಗಳು',
      findSchemes: 'ನನಗಾಗಿ ಯೋಜನೆ ಹುಡುಕಿ',
      saved: 'ಉಳಿಸಿದ ಯೋಜನೆಗಳು',
      assistant: 'ಸ್ಕೀಮ್‌ಸಾಥಿ AI',
      admin: 'ನಿರ್ವಾಹಕ',
    },
    hero: {
      title: 'ನಿಮಗಾಗಿ ಸರಿಯಾದ ಸರ್ಕಾರಿ ಯೋಜನೆಯನ್ನು ಹುಡುಕಿ',
      subtitle: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಮೂಲಗಳಿಂದ ಪರಿಶೀಲಿಸಿದ ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ತಿಳಿಯಿರಿ.',
      searchPlaceholder: 'ಯೋಜನೆಗಳು, ವಿದ್ಯಾರ್ಥಿವೇತನ, ಉದ್ಯೋಗ, ಶಿಕ್ಷಣ ನೆರವು ಹುಡುಕಿ...',
      searchBtn: 'ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ',
      findForMeBtn: 'ನನಗಾಗಿ ಯೋಜನೆ ಹುಡುಕಿ',
      browseCategories: 'ಜನಪ್ರಿಯ ವರ್ಗಗಳು',
      verifiedBadge: '100% ಅಧಿಕೃತ .gov.in ಮತ್ತು .nic.in ಮೂಲಗಳು',
      totalSchemes: 'ಪರಿಶೀಲಿಸಿದ ಯೋಜನೆಗಳು',
      totalStates: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು',
      officialSources: 'ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳು',
    },
    filters: {
      title: 'ಶೋಧನೆ ಮತ್ತು ಫಿಲ್ಟರ್',
      allCategories: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      allStates: 'ಭಾರತ & ರಾಜ್ಯಗಳು',
      allTypes: 'ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು',
      allStatuses: 'ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು',
      stateLabel: 'ರಾಜ್ಯ / ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ',
      categoryLabel: 'ವರ್ಗ',
      typeLabel: 'ಪ್ರಕಾರ',
      statusLabel: 'ಅರ್ಜಿ ಸ್ಥಿತಿ',
      ageLabel: 'ವಯಸ್ಸು',
      educationLabel: 'ವಿದ್ಯಾರ್ಹತೆ',
      incomeLabel: 'ವಾರ್ಷಿಕ ಆದಾಯ',
      occupationLabel: 'ಉದ್ಯೋಗ',
      reset: 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ',
      showingResults: 'ಯೋಜನೆಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ',
      noResults: 'ಯಾವುದೇ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
      noResultsDesc: 'ದಯವಿಟ್ಟು ಬೇರೆ ಕೀವರ್ಡ್ ಬಳಸಿ ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.',
    },
    card: {
      verifiedSource: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಮೂಲ',
      lastVerified: 'ಕೊನೆಯ ಪರಿಶೀಲನೆ',
      benefits: 'ಪ್ರಯೋಜನಗಳು',
      whoCanApply: 'ಯಾರು ಅರ್ಜಿ ಸಲ್ಲಿಸಬಹುದು',
      eligibility: 'ಅರ್ಹತೆ',
      documents: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು',
      deadline: 'ಕೊನೆಯ ದಿನಾಂಕ',
      applyOfficially: 'ಅಧಿಕೃತವಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ →',
      officialLinkUnavailable: 'ಅಧಿಕೃತ ಲಿಂಕ್ ಲಭ್ಯವಿಲ್ಲ. ಇಲಾಖೆಯ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿ.',
      save: 'ಉಳಿಸಿ',
      saved: 'ಉಳಿಸಲಾಗಿದೆ',
      viewDetails: 'ಪೂರ್ಣ ವಿವರ ನೋಡಿ',
      explainEligibility: 'ಅರ್ಹತೆ ತಿಳಿಯಿರಿ',
      compare: 'ಹೋಲಿಕೆ ಮಾಡಿ',
      centralGov: 'ಕೇಂದ್ರ ಸರ್ಕಾರ',
      stateGov: 'ರಾಜ್ಯ ಸರ್ಕಾರ',
    },
    scamWarning: {
      title: 'ವಂಚನೆ ಮತ್ತು ಆನ್‌ಲೈನ್ ವಂಚಕರಿಂದ ಎಚ್ಚರ',
      body: 'ಸ್ಕೀಮ್‌ಸಾಥಿ ಎಂದಿಗೂ OTP, UPI PIN ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಕೇಳುವುದಿಲ್ಲ. ಯಾವುದೇ ಹಣ ಪಾವತಿಸುವ ಮುನ್ನ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಪರಿಶೀಲಿಸಿ.',
      learnMore: 'ಸುರಕ್ಷತಾ ಮಾರ್ಗದರ್ಶಿ',
      reportIssue: 'ತಪ್ಪು ಮಾಹಿತಿ ವರದಿ ಮಾಡಿ',
    },
    wizard: {
      badge: 'ಯೋಜನಾ ಮಾರ್ಗದರ್ಶಿ',
      title: 'ನನಗಾಗಿ ಯೋಜನೆ ಹುಡುಕಿ',
      subtitle: 'ನಿಮಗೆ ಸೂಕ್ತವಾದ ಯೋಜನೆಗಳನ್ನು ತಿಳಿಯಲು 6 ಸರಳ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.',
      step: 'ಪ್ರಶ್ನೆ',
      of: 'ರ',
      back: 'ಹಿಂದೆ',
      next: 'ಮುಂದಿನ ಪ್ರಶ್ನೆ',
      seeMatches: 'ಸೂಕ್ತ ಯೋಜನೆಗಳನ್ನು ತೋರಿಸಿ',
      startAgain: 'ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ',
      matchedTitle: 'ನಿಮಗಾಗಿ ಸಂಭಾವ್ಯ ಯೋಜನೆಗಳು',
      disclaimer: 'ಇವು ನಿಮ್ಮ ಮಾಹಿತಿಯ ಮೇಲಿನ ಸಂಭಾವ್ಯ ಫಲಿತಾಂಶಗಳು. ಅಂತಿಮ ಅರ್ಹತೆಗಾಗಿ ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್ ಪರಿಶೀಲಿಸಿ.',
      q1: 'ನಿಮ್ಮ ರಾಜ್ಯ ಯಾವುದು?',
      q2: 'ನಿಮ್ಮ ವಯಸ್ಸು ಎಷ್ಟು?',
      q3: 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಉದ್ಯೋಗ ಯಾವುದು?',
      q4: 'ನಿಮ್ಮ ಶಿಕ್ಷಣ ಮಟ್ಟವೇನು?',
      q5: 'ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯವೆಷ್ಟು?',
      q6: 'ಯಾವ ರೀತಿಯ ಸಹಾಯವನ್ನು ಬಯಸುತ್ತೀರಿ?',
    },
    assistant: {
      title: 'ಸ್ಕೀಮ್‌ಸಾಥಿ AI',
      subtitle: 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಸರ್ಕಾರಿ ಯೋಜನೆ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನ ಸಹಾಯಕ.',
      placeholder: 'ಅರ್ಹತೆ, ದಾಖಲೆಗಳು ಅಥವಾ ಅರ್ಜಿ ಸಲ್ಲಿಕೆ ಬಗ್ಗೆ ಕೇಳಿ...',
      send: 'ಕೇಳಿ',
      quickPrompts: 'ಸಲಹೆ ಪ್ರಶ್ನೆಗಳು:',
      disclaimer: 'ಸ್ಕೀಮ್‌ಸಾಥಿ ಪರಿಶೀಲಿಸಿದ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲಿನ AI ಮಾರ್ಗದರ್ಶನ. ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
      scamAlertTitle: 'ಮುಖ್ಯ ಭದ್ರತಾ ಎಚ್ಚರಿಕೆ',
      scamAlertBody: 'ನಿಮ್ಮ OTP ಅಥವಾ UPI PIN ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಿಗೆ ಹಣ ನೀಡಬೇಕಿಲ್ಲ.',
    },
    savedSection: {
      title: 'ನನ್ನ ಉಳಿಸಿದ ಯೋಜನೆಗಳು',
      subtitle: 'ಉಳಿಸಿದ ಯೋಜನೆಗಳು, ಸಮೀಪಿಸುವ ದಿನಾಂಕಗಳು ಮತ್ತು ಅರ್ಹತೆಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ.',
      emptyTitle: 'ಯಾವುದೇ ಯೋಜನೆ ಉಳಿಸಿಲ್ಲ',
      emptyDesc: 'ತ್ವರಿತ ಪ್ರವೇಶಕ್ಕಾಗಿ ಯೋಜನೆ ಕಾರ್ಡ್‌ನಲ್ಲಿ "ಉಳಿಸಿ" ಬಟನ್ ಒತ್ತಿ.',
      compareBtn: 'ಆಯ್ಕೆಮಾಡಿದ ಯೋಜನೆಗಳನ್ನು ಹೋಲಿಸಿ',
      deadlinesTitle: 'ಸಮೀಪಿಸುತ್ತಿರುವ ಕೊನೆಯ ದಿನಾಂಕಗಳು',
      clearAll: 'ಎಲ್ಲವನ್ನೂ ತೆರವುಗೊಳಿಸಿ',
    },
  },
  // Default fallbacks with localized key terms for the remaining 8 languages
  bn: {
    brandName: 'স্কিমসাথী',
    tagline: 'সরকারি প্রকল্প ও বৃত্তির আপনার বিশ্বস্ত নির্দেশিকা',
    subTagline: 'সরকারি সুযোগ-সুবিধা এবার সহজ। খুঁজুন। যাচাই করুন। আবেদন করুন।',
    nav: { home: 'হোম', schemes: 'সরকারি প্রকল্প', scholarships: 'বৃত্তি', categories: 'বিভাগ', stateSchemes: 'রাজ্য প্রকল্প', findSchemes: 'আমার জন্য প্রকল্প', saved: 'সংরক্ষিত', assistant: 'স্কিমসাথী AI', admin: 'অ্যাডমিন' },
    hero: { title: 'আপনার জন্য সঠিক সরকারি প্রকল্প খুঁজুন', subtitle: 'যাচাইকৃত সরকারি উৎস থেকে স্কিম ও স্কলারশিপের তথ্য পান।', searchPlaceholder: 'প্রকল্প, বৃত্তি, চাকরি, শিক্ষা বা রাজ্য খুঁজুন...', searchBtn: 'অনুসন্ধান করুন', findForMeBtn: 'আমার জন্য প্রকল্প খুঁজুন', browseCategories: 'জনপ্রিয় বিভাগসমূহ', verifiedBadge: '১০০% সরকারি .gov.in ও .nic.in উৎস', totalSchemes: 'যাচাইকৃত প্রকল্প ও বৃত্তি', totalStates: 'সকল রাজ্য ও কেন্দ্রশাসিত অঞ্চল', officialSources: 'সরকারি পোর্টাল' },
    filters: { title: 'ফিল্টার ও অনুসন্ধান', allCategories: 'সকল বিভাগ', allStates: 'সমগ্র ভারত ও রাজ্য', allTypes: 'সকল প্রকার', allStatuses: 'সকল স্ট্যাটাস', stateLabel: 'রাজ্য', categoryLabel: 'বিভাগ', typeLabel: 'প্রকার', statusLabel: 'আবেদনের স্থিতি', ageLabel: 'বয়স', educationLabel: 'শিক্ষাগত যোগ্যতা', incomeLabel: 'বার্ষিক আয়', occupationLabel: 'পেশা', reset: 'রিসেট', showingResults: 'যাচাইকৃত ফলাফল', noResults: 'কোনো ফলাফল পাওয়া যায়নি', noResultsDesc: 'অন্য শব্দ দিয়ে চেষ্টা করুন।' },
    card: { verifiedSource: 'সরকারি নির্ভরযোগ্য উৎস', lastVerified: 'সর্বশেষ যাচাই', benefits: 'সুবিধাসমূহ', whoCanApply: 'আবেদনের যোগ্য কারা', eligibility: 'যোগ্যতা', documents: 'প্রয়োজনীয় কাগজপত্র', deadline: 'আবেদনের শেষ তারিখ', applyOfficially: 'সরকারি আবেদন করুন →', officialLinkUnavailable: 'আবেদন লিঙ্ক অনুপলব্ধ। বিভাগীয় ওয়েবসাইট দেখুন।', save: 'সংরক্ষণ করুন', saved: 'সংরক্ষিত', viewDetails: 'সম্পূর্ণ বিবরণ', explainEligibility: 'যোগ্যতা বুঝুন', compare: 'তুলনা করুন', centralGov: 'কেন্দ্রীয় সরকার', stateGov: 'রাজ্য সরকার' },
    scamWarning: { title: 'প্রতারণা থেকে সতর্ক থাকুন', body: 'স্কিমসাথী কখনও ওটিপি, ইউপিআই পিন বা পাসওয়ার্ড চায় না। কোনো তথ্য দেওয়ার আগে ওয়েবসাইট যাচাই করুন।', learnMore: 'নিরাপত্তা নির্দেশিকা', reportIssue: 'ভুল তথ্য রিপোর্ট করুন' },
    wizard: { badge: 'ইন্টারেক্টিভ গাইড', title: 'আমার জন্য প্রকল্প খুঁজুন', subtitle: '৬টি সহজ প্রশ্নের উত্তর দিয়ে উপযুক্ত প্রকল্প খুঁজুন।', step: 'প্রশ্ন', of: 'এর মধ্যে', back: 'পূর্ববর্তী', next: 'পরবর্তী', seeMatches: 'উপযুক্ত প্রকল্প দেখুন', startAgain: 'পুনরায় শুরু করুন', matchedTitle: 'আপনার জন্য সম্ভাব্য প্রকল্পসমূহ', disclaimer: 'চূড়ান্ত যোগ্যতার জন্য অফিশিয়াল ওয়েবসাইট দেখুন।', q1: 'আপনার রাজ্য কোনটি?', q2: 'আপনার বয়স কত?', q3: 'আপনার পেশা কি?', q4: 'আপনার শিক্ষাগত যোগ্যতা কি?', q5: 'পারিবারিক বার্ষিক আয় কত?', q6: 'কি ধরণের সহায়তা চান?' },
    assistant: { title: 'স্কিমসাথী AI', subtitle: 'আপনার ব্যক্তিগত সরকারি প্রকল্প ও বৃত্তি সহায়ক।', placeholder: 'যোগ্যতা, প্রয়োজনীয় নথি ইত্যাদি সম্পর্কে জিজ্ঞাসা করুন...', send: 'জিজ্ঞাসা করুন', quickPrompts: 'প্রস্তাবিত প্রশ্ন:', disclaimer: 'স্কিমসাথী ডাটাবেস ভিত্তিক এআই উত্তর। অফিশিয়াল পোর্টালে যাচাই করুন।', scamAlertTitle: 'নিরাপত্তা সতর্কতা', scamAlertBody: 'কখনও ওটিপি বা পিন কারও সাথে শেয়ার করবেন না।' },
    savedSection: { title: 'সংরক্ষিত প্রকল্পসমূহ', subtitle: 'সংরক্ষিত স্কিম এবং আবেদনের সময়সীমা ট্র্যাক করুন।', emptyTitle: 'কোনো সংরক্ষিত প্রকল্প নেই', emptyDesc: 'কার্ডে "সংরক্ষণ করুন" ক্লিক করুন।', compareBtn: 'তুলনা করুন', deadlinesTitle: 'আসন্ন শেষ তারিখ', clearAll: 'সব মুছুন' }
  },
  te: {
    brandName: 'స్కీమ్‌సాథి',
    tagline: 'ప్రభుత్వ పథకాలు & స్కాలర్‌షిప్‌ల మార్గదర్శి',
    subTagline: 'ప్రభుత్వ ప్రయోజనాలు సులభతరం. కనుగొనండి. ధృవీకరించండి. దరఖాస్తు చేయండి.',
    nav: { home: 'హోమ్', schemes: 'ప్రభుత్వ పథకాలు', scholarships: 'స్కాలర్‌షిప్‌లు', categories: 'వర్గాలు', stateSchemes: 'రాష్ట్ర పథకాలు', findSchemes: 'నా కోసం పథకాలు', saved: 'సేవ్ చేసినవి', assistant: 'స్కీమ్‌సాథి AI', admin: 'అడ్మిన్' },
    hero: { title: 'మీకు తగిన ప్రభుత్వ పథకాన్ని కనుగొనండి', subtitle: 'అధికారిక ప్రభుత్వ మూలాల నుండి ధృవీకరించబడిన పథకాలు మరియు ప్రయోజనాలు.', searchPlaceholder: 'పథకాలు, స్కాలర్‌షిప్, ఉద్యోగం, విద్యార్థి సహాయం...', searchBtn: 'వెతకండి', findForMeBtn: 'నా కోసం పథకాలు', browseCategories: 'ప్రముఖ వర్గాలు', verifiedBadge: '100% అధికారిక .gov.in మూలాలు', totalSchemes: 'ధృవీకరించబడిన పథకాలు', totalStates: 'అన్ని రాష్ట్రాలు', officialSources: 'అధికారిక పోర్టల్స్' },
    filters: { title: 'ఫిల్టర్లు', allCategories: 'అన్ని వర్గాలు', allStates: 'భారతదేశం & రాష్ట్రాలు', allTypes: 'అన్ని రకాలు', allStatuses: 'అన్ని స్థితులు', stateLabel: 'రాష్ట్రం', categoryLabel: 'వర్గం', typeLabel: 'రకం', statusLabel: 'దరఖాస్తు స్థితి', ageLabel: 'వయస్సు', educationLabel: 'విద్యార్హత', incomeLabel: 'వార్షిక ఆదాయం', occupationLabel: 'వృత్తి', reset: 'రీసెట్', showingResults: 'ఫలితాలు చూపబడుతున్నాయి', noResults: 'ఫలితాలు లేవు', noResultsDesc: 'మరొక పదంతో ప్రయత్నించండి.' },
    card: { verifiedSource: 'అధికారిక ప్రభుత్వ మూలం', lastVerified: 'చివరి ధృవీకరణ', benefits: 'ప్రయోజనాలు', whoCanApply: 'ఎవరు అర్హులు', eligibility: 'అర్హత', documents: 'కావాల్సిన పత్రాలు', deadline: 'చివరి తేదీ', applyOfficially: 'అధికారికంగా దరఖాస్తు చేయండి →', officialLinkUnavailable: 'దరఖాస్తు లింక్ అందుబాటులో లేదు. అధికారిక సైట్ చూడండి.', save: 'సేవ్ చేయండి', saved: 'సేవ్ చేయబడింది', viewDetails: 'పూర్తి వివరాలు', explainEligibility: 'అర్హత వివరణ', compare: 'పోల్చండి', centralGov: 'కేంద్ర ప్రభుత్వం', stateGov: 'రాష్ట్ర ప్రభుత్వం' },
    scamWarning: { title: 'మోసాల నుండి జాగ్రత్తగా ఉండండి', body: 'స్కీమ్‌సాథి ఎప్పుడూ OTP, UPI PIN లేదా బ్యాంక్ పాస్‌వర్డ్ అడగదు. అధికారిక వెబ్‌సైట్ మాత్రమే వాడండి.', learnMore: 'భద్రతా సూచనలు', reportIssue: 'సమస్యను నివేదించండి' },
    wizard: { badge: 'పథకాల గైడ్', title: 'నా కోసం పథకాలు', subtitle: 'మీకు సరిపోయే పథకాల కోసం 6 ప్రశ్నలకు సమాధానమివ్వండి.', step: 'ప్రశ్న', of: 'లో', back: 'వెనుకకు', next: 'తరువాత', seeMatches: 'పథకాలను చూడండి', startAgain: 'మళ్లీ ప్రారంభించండి', matchedTitle: 'మీ కోసం సరిపోయే పథకాలు', disclaimer: 'తుది అర్హత కోసం అధికారిక వెబ్‌సైట్ చూడండి.', q1: 'మీ రాష్ట్రం ఏది?', q2: 'మీ వయస్సు ఎంత?', q3: 'మీ వృత్తి ఏమిటి?', q4: 'మీ విద్యార్హత ఏమిటి?', q5: 'వార్షిక కుటుంబ ఆదాయం ఎంత?', q6: 'ఎలాంటి సహాయం కావాలి?' },
    assistant: { title: 'స్కీమ్‌సాథి AI', subtitle: 'మీ వ్యక్తిగత ప్రభుత్వ పథకాల అసిస్టెంట్.', placeholder: 'అర్హత, పత్రాలు లేదా దరఖాస్తు గురించి అడగండి...', send: 'అడగండి', quickPrompts: 'సూచించిన ప్రశ్నలు:', disclaimer: 'స్కీమ్‌సాథి డేటాబేస్ ఆధారిత సమాచారం. అధికారిక వెబ్‌సైట్‌లో ధృవీకరించండి.', scamAlertTitle: 'భద్రతా హెచ్చరిక', scamAlertBody: 'OTP లేదా PIN ఎవరితోనూ పంచుకోవద్దు.' },
    savedSection: { title: 'సేవ్ చేసిన పథకాలు', subtitle: 'మీరు సేవ్ చేసిన పథకాలను ట్రాక్ చేయండి.', emptyTitle: 'పథకాలు లేవు', emptyDesc: 'సేవ్ చేయడానికి కార్డ్ పై క్లిక్ చేయండి.', compareBtn: 'పోల్చండి', deadlinesTitle: 'సమీపిస్తున్న గడువులు', clearAll: 'అన్నీ తొలగించండి' }
  },
  ta: {
    brandName: 'ஸ்கீம்சாதி',
    tagline: 'அரசுத் திட்டங்கள் மற்றும் கல்வி உதவித்தொகை வழிகாட்டி',
    subTagline: 'அரசு நலத்திட்டங்கள் எளிதாக. தேடுங்கள். சரிபாருங்கள். விண்ணப்பியுங்கள்.',
    nav: { home: 'முகப்பு', schemes: 'அரசு திட்டங்கள்', scholarships: 'உதவித்தொகை', categories: 'பிரிவுகள்', stateSchemes: 'மாநில திட்டங்கள்', findSchemes: 'எனக்கான திட்டங்கள்', saved: 'சேமித்தவை', assistant: 'ஸ்கீம்சாதி AI', admin: 'நிர்வாகம்' },
    hero: { title: 'உங்களுக்கான சரியான அரசுத் திட்டத்தைக் கண்டறியுங்கள்', subtitle: 'அங்கீகரிக்கப்பட்ட அரசு வலைத்தளங்களிலிருந்து அதிகாரப்பூர்வ தகவல்கள்.', searchPlaceholder: 'திட்டம், கல்வி உதவித்தொகை, வேலைவாய்ப்பு...', searchBtn: 'தேடுக', findForMeBtn: 'எனக்கான திட்டங்கள்', browseCategories: 'முக்கிய பிரிவுகள்', verifiedBadge: '100% அதிகாரப்பூர்வ .gov.in தளங்கள்', totalSchemes: 'சரிபார்க்கப்பட்ட திட்டங்கள்', totalStates: 'அனைத்து மாநிலங்கள்', officialSources: 'அரசு தளங்கள்' },
    filters: { title: 'வடிகட்டிகள்', allCategories: 'அனைத்து பிரிவுகள்', allStates: 'அனைத்து மாநிலங்கள்', allTypes: 'அனைத்து வகைகள்', allStatuses: 'அனைத்து நிலைகள்', stateLabel: 'மாநிலம்', categoryLabel: 'பிரிவு', typeLabel: 'வகை', statusLabel: 'விண்ணப்ப நிலை', ageLabel: 'வயது', educationLabel: 'கல்வித்தகுதி', incomeLabel: 'வருமானம்', occupationLabel: 'தொழில்', reset: 'மீட்டமைக்க', showingResults: 'முடிவுகள்', noResults: 'திட்டங்கள் எதுவும் இல்லை', noResultsDesc: 'வேறு வார்த்தைகளைப் பயன்படுத்தி தேடவும்.' },
    card: { verifiedSource: 'அதிகாரப்பூர்வ அரசு மூலம்', lastVerified: 'கடைசி சரிபார்ப்பு', benefits: 'நன்மைகள்', whoCanApply: 'யார் விண்ணப்பிக்கலாம்', eligibility: 'தகுதி', documents: 'தேவையான ஆவணங்கள்', deadline: 'கடைசி தேதி', applyOfficially: 'அதிகாரப்பூர்வமாக விண்ணப்பிக்கவும் →', officialLinkUnavailable: 'விண்ணப்ப இணைப்பு இல்லை. அரசு இணையதளத்தை அணுகவும்.', save: 'சேமிக்க', saved: 'சேமிக்கப்பட்டது', viewDetails: 'முழு விவரம்', explainEligibility: 'தகுதியை விளக்குக', compare: 'ஒப்பிடுக', centralGov: 'மத்திய அரசு', stateGov: 'மாநில அரசு' },
    scamWarning: { title: 'மோசடிகளில் இருந்து விழிப்புடன் இருங்கள்', body: 'ஸ்கீம்சாதி ஒருபோதும் OTP அல்லது வங்கி ரகசிய எண்களைக் கேட்காது. பண பரிவர்த்தனைக்கு முன் அரசு தளத்தை சரிபார்க்கவும்.', learnMore: 'பாதுகாப்பு வழிகாட்டி', reportIssue: 'தவறான தகவலை தெரிவிக்கவும்' },
    wizard: { badge: 'திட்ட வழிகாட்டி', title: 'எனக்கான திட்டங்கள்', subtitle: 'உங்களுக்கு ஏற்ற திட்டங்களைக் கண்டறிய 6 எளிய கேள்விகளுக்கு பதிலளிக்கவும்.', step: 'கேள்வி', of: 'இல்', back: 'முந்தைய', next: 'அடுத்தது', seeMatches: 'பொருத்தமான திட்டங்கள்', startAgain: 'மீண்டும் தொடங்க', matchedTitle: 'உங்களுக்கான பரிந்துரைக்கப்பட்ட திட்டங்கள்', disclaimer: 'இறுதி தகுதிக்கு அதிகாரப்பூர்வ அரசு தளத்தை சரிபார்க்கவும்.', q1: 'உங்கள் மாநிலம் எது?', q2: 'உங்கள் வயது என்ன?', q3: 'உங்கள் தொழில் என்ன?', q4: 'கல்வித்தகுதி என்ன?', q5: 'ஆண்டு வருமானம் எவ்வளவு?', q6: 'எந்த உதவி தேவை?' },
    assistant: { title: 'ஸ்கீம்சாதி AI', subtitle: 'உங்கள் தனிப்பட்ட அரசு திட்ட வழிகாட்டி.', placeholder: 'தகுதி, ஆவணங்கள் அல்லது விண்ணப்பம் பற்றி கேட்கவும்...', send: 'கேட்க', quickPrompts: 'பரிந்துரைக்கப்பட்ட கேள்விகள்:', disclaimer: 'அதிகாரப்பூர்வ தரவுகளின் அடிப்படையிலான வழிகாட்டல்.', scamAlertTitle: 'பாதுகாப்பு எச்சரிக்கை', scamAlertBody: 'OTP அல்லது PIN எண்களை யாருடனும் பகிர வேண்டாம்.' },
    savedSection: { title: 'சேமிக்கப்பட்ட திட்டங்கள்', subtitle: 'உங்கள் திட்டங்களை எளிதாக கண்காணிக்கவும்.', emptyTitle: 'திட்டங்கள் சேமிக்கப்படவில்லை', emptyDesc: 'சேமிக்க கார்டில் கிளிக் செய்யவும்.', compareBtn: 'ஒப்பிடுக', deadlinesTitle: 'நெருங்கும் கடைசி தேதிகள்', clearAll: 'அனைத்தையும் நீக்கு' }
  },
  ml: {
    brandName: 'സ്കീംസാഥി',
    tagline: 'സർക്കാർ പദ്ധതികൾക്കും സ്കോളർഷിപ്പുകൾക്കുമുള്ള നിങ്ങളുടെ വഴികാട്ടി',
    subTagline: 'സർക്കാർ ആനുകൂല്യങ്ങൾ ലളിതമായി. കണ്ടെത്തൂ. സ്ഥിരീകരിക്കൂ. അപേക്ഷിക്കൂ.',
    nav: { home: 'ഹോം', schemes: 'സർക്കാർ പദ്ധതികൾ', scholarships: 'സ്കോളർഷിപ്പുകൾ', categories: 'വിഭാഗങ്ങൾ', stateSchemes: 'സംസ്ഥാന പദ്ധതികൾ', findSchemes: 'എനിക്കുള്ള പദ്ധതികൾ', saved: 'സൂക്ഷിച്ചവ', assistant: 'സ്കീംസാഥി AI', admin: 'അഡ്മിൻ' },
    hero: { title: 'നിങ്ങൾക്ക് അനുയോജ്യമായ സർക്കാർ പദ്ധതി കണ്ടെത്തുക', subtitle: 'ഔദ്യോഗിക സർക്കാർ സ്രോതസ്സുകളിൽ നിന്നുള്ള വിശ്വസനീയ വിവരങ്ങൾ.', searchPlaceholder: 'പദ്ധതികൾ, സ്കോളർഷിപ്പുകൾ, തൊഴിൽ, വിദ്യാഭ്യാസം...', searchBtn: 'തിരയുക', findForMeBtn: 'എനിക്കുള്ള പദ്ധതികൾ', browseCategories: 'പ്രധാന വിഭാഗങ്ങൾ', verifiedBadge: '100% ഔദ്യോഗിക .gov.in ഉറവിടങ്ങൾ', totalSchemes: 'പരിശോധിച്ച പദ്ധതികൾ', totalStates: 'എല്ലാ സംസ്ഥാനങ്ങളും', officialSources: 'സർക്കാർ പോർട്ടലുകൾ' },
    filters: { title: 'ഫിൽട്ടറുകൾ', allCategories: 'എല്ലാ വിഭാഗങ്ങളും', allStates: 'എല്ലാ സംസ്ഥാനങ്ങളും', allTypes: 'എല്ലാ തരങ്ങളും', allStatuses: 'എല്ലാ സ്റ്റാറ്റസും', stateLabel: 'സംസ്ഥാനം', categoryLabel: 'വിഭാഗം', typeLabel: 'തരം', statusLabel: 'അപേക്ഷാ നില', ageLabel: 'പ്രായം', educationLabel: 'വിദ്യാഭ്യാസം', incomeLabel: 'വരുമാനം', occupationLabel: 'തൊഴിൽ', reset: 'റീസെറ്റ്', showingResults: 'ഫലങ്ങൾ', noResults: 'പദ്ധതികൾ കണ്ടെത്തിയില്ല', noResultsDesc: 'മറ്റൊരു വാക്ക് ഉപയോഗിച്ച് തിരയുക.' },
    card: { verifiedSource: 'ഔദ്യോഗിക സർക്കാർ സ്രോതസ്സ്', lastVerified: 'അവസാനം പരിശോധിച്ചത്', benefits: 'ആനുകൂല്യങ്ങൾ', whoCanApply: 'ആർക്കൊക്കെ അപേക്ഷിക്കാം', eligibility: 'യോഗ്യത', documents: 'ആവശ്യമായ രേഖകൾ', deadline: 'അവസാന തീയതി', applyOfficially: 'ഔദ്യോഗികമായി അപേക്ഷിക്കുക →', officialLinkUnavailable: 'ലിങ്ക് ലഭ്യമല്ല. വകുപ്പ് വെബ്സൈറ്റ് സന്ദർശിക്കുക.', save: 'സൂക്ഷിക്കുക', saved: 'സൂക്ഷിച്ചു', viewDetails: 'വിശദാംശങ്ങൾ', explainEligibility: 'യോഗ്യത മനസ്സിലാക്കുക', compare: 'താരതമ്യം ചെയ്യുക', centralGov: 'കേന്ദ്ര സർക്കാർ', stateGov: 'സംസ്ഥാന സർക്കാർ' },
    scamWarning: { title: 'തട്ടിപ്പുകൾക്കെതിരെ ജാഗ്രത പാലിക്കുക', body: 'സ്കീംസാഥി ഒടിപി, ബാങ്ക് പാസ്‌വേഡ് എന്നിവ ചോദിക്കാറില്ല. ഔദ്യോഗിക വെബ്സൈറ്റ് മാത്രം സന്ദർശിക്കുക.', learnMore: 'സുരക്ഷാ നിർദ്ദേശങ്ങൾ', reportIssue: 'തെറ്റായ വിവരം റിപ്പോർട്ട് ചെയ്യുക' },
    wizard: { badge: 'പദ്ധതി ഗൈഡ്', title: 'എനിക്കുള്ള പദ്ധതികൾ', subtitle: 'അനുയോജ്യമായ പദ്ധതി കണ്ടെത്താൻ 6 ലളിതമായ ചോദ്യങ്ങൾക്ക് മറുപടി നൽകുക.', step: 'ചോദ്യം', of: 'ൽ', back: 'പിന്നോട്ട്', next: 'അടുത്തത്', seeMatches: 'പദ്ധതികൾ കാണുക', startAgain: 'വീണ്ടും തുടങ്ങുക', matchedTitle: 'നിങ്ങൾക്ക് അനുയോജ്യമായ പദ്ധതികൾ', disclaimer: 'അന്തിമ യോഗ്യതയ്ക്കായി ഔദ്യോഗിക വെബ്സൈറ്റ് കാണുക.', q1: 'നിങ്ങളുടെ സംസ്ഥാനം ഏത്?', q2: 'പ്രായം എത്ര?', q3: 'നിലവിലെ തൊഴിൽ എന്താണ്?', q4: 'വിദ്യാഭ്യാസ യോഗ്യത?', q5: 'കുടുംബ വാർഷിക വരുമാനം?', q6: 'ഏത് സഹായമാണ് ആവശ്യം?' },
    assistant: { title: 'സ്കീംസാഥി AI', subtitle: 'നിങ്ങളുടെ പേഴ്സണൽ അസിസ്റ്റന്റ്.', placeholder: 'യോഗ്യത, രേഖകൾ അല്ലെങ്കിൽ അപേക്ഷയെക്കുറിച്ച് ചോദിക്കൂ...', send: 'ചോദിക്കുക', quickPrompts: 'നിർദ്ദേശങ്ങൾ:', disclaimer: 'ഔദ്യോഗിക ഡാറ്റ അടിസ്ഥാനമാക്കിയുള്ള നിർദ്ദേശങ്ങൾ.', scamAlertTitle: 'സുരക്ഷാ മുന്നറിയിപ്പ്', scamAlertBody: 'ഒടിപിയോ പിൻ നമ്പറോ ആരുമായും പങ്കിടരുത്.' },
    savedSection: { title: 'സൂക്ഷിച്ച പദ്ധതികൾ', subtitle: 'നിങ്ങൾ തിരഞ്ഞെടുത്ത പദ്ധതികൾ എളുപ്പത്തിൽ പരിശോധിക്കുക.', emptyTitle: 'പദ്ധതികൾ ഒന്നും സൂക്ഷിച്ചിട്ടില്ല', emptyDesc: 'സൂക്ഷിക്കാൻ കാർഡിൽ ക്ലിക്ക് ചെയ്യുക.', compareBtn: 'താരതമ്യം ചെയ്യുക', deadlinesTitle: 'അടുത്തുവരുന്ന അവസാന തീയതികൾ', clearAll: 'എല്ലാം നീക്കം ചെയ്യുക' }
  },
  mr: {
    brandName: 'स्कीमसाथी',
    tagline: 'सरकारी योजना व शिष्यवृत्तींसाठी तुमचा मार्गदर्शक',
    subTagline: 'सरकारी फायदे, आता सोपे. शोधा. पडताळा. अर्ज करा.',
    nav: { home: 'मुख्यपृष्ठ', schemes: 'सरकारी योजना', scholarships: 'शिष्यवृत्ती', categories: 'वर्गवारी', stateSchemes: 'राज्य योजना', findSchemes: 'माझ्यासाठी योजना', saved: 'जतन केलेल्या', assistant: 'स्कीमसाथी AI', admin: 'प्रशासक' },
    hero: { title: 'तुमच्यासाठी योग्य सरकारी योजना शोधा', subtitle: 'सत्यापित अधिकृत सरकारी स्रोतांकडून योजना आणि शिष्यवृत्तींची माहिती मिळवा.', searchPlaceholder: 'योजना, शिष्यवृत्ती, शिक्षण, शेती, नोकरी शोधा...', searchBtn: 'योजना शोधा', findForMeBtn: 'माझ्यासाठी योजना शोधा', browseCategories: 'लोकप्रिय वर्गवारी', verifiedBadge: '१००% अधिकृत .gov.in स्रोत', totalSchemes: 'सत्यापित योजना व शिष्यवृत्ती', totalStates: 'सर्व राज्ये', officialSources: 'सरकारी पोर्टल' },
    filters: { title: 'फिल्टर आणि शोध', allCategories: 'सर्व वर्गवारी', allStates: 'संपूर्ण भारत व राज्ये', allTypes: 'सर्व प्रकार', allStatuses: 'सर्व स्थिती', stateLabel: 'राज्य', categoryLabel: 'वर्गवारी', typeLabel: 'प्रकार', statusLabel: 'अर्जाची स्थिती', ageLabel: 'वय', educationLabel: 'शिक्षण', incomeLabel: 'कौटुंबिक उत्पन्न', occupationLabel: 'व्यवसाय', reset: 'रीसेट करा', showingResults: 'दाखवत आहे', noResults: 'कोणतीही योजना आढळली नाही', noResultsDesc: 'दुसऱ्या शब्दाने शोधून पहा.' },
    card: { verifiedSource: 'अधिकृत सरकारी स्रोत', lastVerified: 'शेवटची पडताळणी', benefits: 'फायदे', whoCanApply: 'कोण अर्ज करू शकतो', eligibility: 'पात्रता', documents: 'आवश्यक कागदपत्रे', deadline: 'अंतिम मुदत', applyOfficially: 'अधिकृत अर्ज करा →', officialLinkUnavailable: 'अधिकृत लिंक उपलब्ध नाही. विभागीय संकेतस्थळाला भेट द्या.', save: 'जतन करा', saved: 'जतन केले', viewDetails: 'पूर्ण तपशील', explainEligibility: 'पात्रता समजून घ्या', compare: 'तुलना करा', centralGov: 'केंद्र सरकार', stateGov: 'राज्य सरकार' },
    scamWarning: { title: 'फसवणुकीपासून सावध रहा', body: 'स्कीमसाथी कधीही ओटीपी किंवा बँक पासवर्ड मागत नाही. कोणत्याही देयकापूर्वी अधिकृत संकेतस्थळ तपासा.', learnMore: 'सुरक्षा मार्गदर्शक', reportIssue: 'चुकीच्या माहितीची तक्रार करा' },
    wizard: { badge: 'योजना मार्गदर्शक', title: 'माझ्यासाठी योजना शोधा', subtitle: '६ सोप्या प्रश्नांची उत्तरे देऊन तुमच्यासाठी योग्य योजना जाणून घ्या.', step: 'प्रश्न', of: 'पैकी', back: 'मागे', next: 'पुढील प्रश्न', seeMatches: 'माझ्या योजना दाखवा', startAgain: 'पुन्हा सुरू करा', matchedTitle: 'तुमच्यासाठी संभाव्य योजना', disclaimer: 'अंतिम पात्रतेसाठी अधिकृत सरकारी संकेतस्थळ तपासा.', q1: 'तुमचे राज्य कोणते?', q2: 'तुमचे वय किती?', q3: 'तुमचा व्यवसाय काय आहे?', q4: 'शिक्षणाची पातळी कोणती?', q5: 'वार्षिक उत्पन्न किती?', q6: 'कोणत्या प्रकारची मदत हवी?' },
    assistant: { title: 'स्कीमसाथी AI', subtitle: 'तुमचा वैयक्तिक सरकारी योजना सहाय्यक.', placeholder: 'पात्रता, कागदपत्रे किंवा अर्ज प्रक्रियेबद्दल विचारा...', send: 'विचारा', quickPrompts: 'सुचवलेले प्रश्न:', disclaimer: 'स्कीमसाथी सत्यापित डेटाबेसमधून एआय मार्गदर्शन.', scamAlertTitle: 'सुरक्षा इशारा', scamAlertBody: 'ओटीपी किंवा पासवर्ड कोणाशीही शेअर करू नका.' },
    savedSection: { title: 'जतन केलेल्या योजना', subtitle: 'जतन केलेल्या योजना आणि मुदती तपासा.', emptyTitle: 'काहीही जतन केलेले नाही', emptyDesc: 'योजना कार्डवर जतन करा बटण दाबा.', compareBtn: 'योजनांची तुलना करा', deadlinesTitle: 'जवळ येणाऱ्या अंतिम मुदती', clearAll: 'सर्व काढून टाका' }
  },
  gu: {
    brandName: 'સ્કીમસાથી',
    tagline: 'સરકારી યોજનાઓ અને શિષ્યવૃત્તિ માટે તમારો માર્ગદર્શક',
    subTagline: 'સરકારી લાભો, હવે સરળ. શોધો. ચકાસો. અરજી કરો.',
    nav: { home: 'હોમ', schemes: 'સરકારી યોજનાઓ', scholarships: 'શિષ્યવૃત્તિ', categories: 'કેટેગરી', stateSchemes: 'રાજ્ય યોજનાઓ', findSchemes: 'મારા માટે યોજના', saved: 'સાચવેલ', assistant: 'સ્કીમસાથી AI', admin: 'એડમિન' },
    hero: { title: 'તમારા માટે યોગ્ય સરકારી યોજના શોધો', subtitle: 'ચકાસાયેલ સત્તાવાર સરકારી સ્ત્રોતોમાંથી યોજનાઓની વિગતો મેળવો.', searchPlaceholder: 'યોજના, શિષ્યવૃત્તિ, નોકરી, શિક્ષણ શોધો...', searchBtn: 'યોજનાઓ શોધો', findForMeBtn: 'મારા માટે યોજના શોધો', browseCategories: 'લોકપ્રિય કેટેગરી', verifiedBadge: '100% સત્તાવાર .gov.in સ્ત્રોતો', totalSchemes: 'ચકાસાયેલ યોજનાઓ', totalStates: 'તમામ રાજ્યો', officialSources: 'સરકારી પોર્ટલ' },
    filters: { title: 'ફિલ્ટર અને શોધ', allCategories: 'તમામ કેટેગરી', allStates: 'સમગ્ર ભારત અને રાજ્યો', allTypes: 'તમામ પ્રકાર', allStatuses: 'તમામ સ્થિતિ', stateLabel: 'રાજ્ય', categoryLabel: 'કેટેગરી', typeLabel: 'પ્રકાર', statusLabel: 'અરજી સ્થિતિ', ageLabel: 'ઉંમર', educationLabel: 'શિક્ષણ', incomeLabel: 'વાર્ષિક આવક', occupationLabel: 'વ્યવસાય', reset: 'રીસેટ', showingResults: 'પરિણામો દર્શાવે છે', noResults: 'કોઈ યોજના મળી નથી', noResultsDesc: 'અન્ય શબ્દ સાથે ફરી પ્રયાસ કરો.' },
    card: { verifiedSource: 'સત્તાવાર સરકારી સ્ત્રોત', lastVerified: 'છેલ્લી ચકાસણી', benefits: 'લાભો', whoCanApply: 'કોણ અરજી કરી શકે', eligibility: 'પાત્રતા', documents: 'જરૂરી દસ્તાવેજો', deadline: 'અંતિમ તારીખ', applyOfficially: 'સત્તાવાર અરજી કરો →', officialLinkUnavailable: 'અરજી લિંક ઉપલબ્ધ નથી. વિભાગીય વેબસાઇટ જુઓ.', save: 'સાચવો', saved: 'સાચવેલ છે', viewDetails: 'સંપૂર્ણ વિગત', explainEligibility: 'પાત્રતા સમજો', compare: 'સરખામણી કરો', centralGov: 'કેન્દ્ર સરકાર', stateGov: 'રાજ્ય સરકાર' },
    scamWarning: { title: 'છેતરપિંડીથી સાવધાન રહો', body: 'સ્કીમસાથી ક્યારેય OTP કે બેંક વિગતો માંગતી નથી. ચુકવણી પહેલાં સત્તાવાર વેબસાઇટ તપાસો.', learnMore: 'સુરક્ષા માર્ગદર્શિકા', reportIssue: 'ખોટી માહિતીની જાણ કરો' },
    wizard: { badge: 'યોજના માર્ગદર્શક', title: 'મારા માટે યોજના શોધો', subtitle: 'યોગ્ય યોજના શોધવા માટે 6 સરળ પ્રશ્નોના જવાબ આપો.', step: 'પ્રશ્ન', of: 'માંથી', back: 'પાછળ', next: 'આગળ', seeMatches: 'યોજનાઓ બતાવો', startAgain: 'ફરી શરૂ કરો', matchedTitle: 'તમારા માટે સંભવિત યોજનાઓ', disclaimer: 'આખરી પાત્રતા માટે સત્તાવાર સરકારી વેબસાઇટ તપાસો.', q1: 'તમારું રાજ્ય કયું?', q2: 'તમારી ઉંમર કેટલી?', q3: 'તમારો વ્યવસાય શું છે?', q4: 'શિક્ષણ સ્તર શું છે?', q5: 'વાર્ષિક આવક કેટલી?', q6: 'કેવી સહાય જોઈએ છે?' },
    assistant: { title: 'સ્કીમસાથી AI', subtitle: 'તમારો અંગત સરકારી યોજના સહાયક.', placeholder: 'પાત્રતા, દસ્તાવેજ અથવા પ્રક્રિયા વિશે પૂછો...', send: 'પૂછો', quickPrompts: 'સૂચવેલા પ્રશ્નો:', disclaimer: 'સત્તાવાર ડેટા પર આધારિત AI માર્ગદર્શન.', scamAlertTitle: 'સુરક્ષા ચેતવણી', scamAlertBody: 'કોઈપણ સાથે OTP કે PIN શેર કરશો નહીં.' },
    savedSection: { title: 'સાચવેલ યોજનાઓ', subtitle: 'તમારી મનપસંદ યોજનાઓ પર નજર રાખો.', emptyTitle: 'કોઈ યોજના સાચવી નથી', emptyDesc: 'સાચવવા માટે કાર્ડ પર ક્લિક કરો.', compareBtn: 'સરખામણી કરો', deadlinesTitle: 'નજીક આવતી અંતિમ તારીખો', clearAll: 'બધું કાઢી નાખો' }
  },
  pa: {
    brandName: 'ਸਕੀਮਸਾਥੀ',
    tagline: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਅਤੇ ਸਕਾਲਰਸ਼ਿਪਾਂ ਲਈ ਤੁਹਾਡਾ ਮਾਰਗਦਰਸ਼ਕ',
    subTagline: 'ਸਰਕਾਰੀ ਲਾਭ, ਹੁਣ ਆਸਾਨ। ਖੋਜੋ। ਪੜਤਾਲੋ। ਅਪਲਾਈ ਕਰੋ।',
    nav: { home: 'ਮੁੱਖ ਸਫ਼ਾ', schemes: 'ਸਰਕਾਰੀ ਸਕੀਮਾਂ', scholarships: 'ਸਕਾਲਰਸ਼ਿਪਾਂ', categories: 'ਸ਼੍ਰੇਣੀਆਂ', stateSchemes: 'ਰਾਜ ਸਕੀਮਾਂ', findSchemes: 'ਮੇਰੇ ਲਈ ਸਕੀਮਾਂ', saved: 'ਸੰਭਾਲੀਆਂ', assistant: 'ਸਕੀਮਸਾਥੀ AI', admin: 'ਐਡਮਿਨ' },
    hero: { title: 'ਆਪਣੇ ਲਈ ਸਹੀ ਸਰਕਾਰੀ ਸਕੀਮ ਲੱਭੋ', subtitle: 'ਭਰੋਸੇਯੋਗ ਸਰਕਾਰੀ ਸਰੋਤਾਂ ਤੋਂ ਸਕੀਮਾਂ ਅਤੇ ਲਾਭ ਪ੍ਰਾਪਤ ਕਰੋ।', searchPlaceholder: 'ਸਕੀਮ, ਸਕਾਲਰਸ਼ਿਪ, ਸਿੱਖਿਆ, ਖੇਤੀਬਾੜੀ ਖੋਜੋ...', searchBtn: 'ਸਕੀਮਾਂ ਖੋਜੋ', findForMeBtn: 'ਮੇਰੇ ਲਈ ਸਕੀਮਾਂ ਖੋਜੋ', browseCategories: 'ਮੁੱਖ ਸ਼੍ਰੇਣੀਆਂ', verifiedBadge: '100% ਅਧਿਕਾਰਤ .gov.in ਸਰੋਤ', totalSchemes: 'ਪ੍ਰਮਾਣਿਤ ਸਕੀਮਾਂ', totalStates: 'ਸਾਰੇ ਰਾਜ', officialSources: 'ਸਰਕਾਰੀ ਪੋਰਟਲ' },
    filters: { title: 'ਫਿਲਟਰ', allCategories: 'ਸਾਰੀਆਂ ਸ਼੍ਰੇਣੀਆਂ', allStates: 'ਸਮੁੱਚਾ ਭਾਰਤ ਤੇ ਰਾਜ', allTypes: 'ਸਾਰੇ ਪ੍ਰਕਾਰ', allStatuses: 'ਸਾਰੀਆਂ ਸਥਿਤੀਆਂ', stateLabel: 'ਰਾਜ', categoryLabel: 'ਸ਼੍ਰੇਣੀ', typeLabel: 'ਕਿਸਮ', statusLabel: 'ਅਰਜ਼ੀ ਸਥਿਤੀ', ageLabel: 'ਉਮਰ', educationLabel: 'ਸਿੱਖਿਆ', incomeLabel: 'ਆਮਦਨ', occupationLabel: 'ਕੰਮ', reset: 'ਰੀਸੈਟ', showingResults: 'ਨਤੀਜੇ', noResults: 'ਕੋਈ ਸਕੀਮ ਨਹੀਂ ਮਿਲੀ', noResultsDesc: 'ਦੁਬਾਰਾ ਖੋਜ ਕਰੋ।' },
    card: { verifiedSource: 'ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਸਰੋਤ', lastVerified: 'ਆਖਰੀ ਪੜਤਾਲ', benefits: 'ਲਾਭ', whoCanApply: 'ਕੌਣ ਅਪਲਾਈ ਕਰ ਸਕਦਾ ਹੈ', eligibility: 'ਯੋਗਤਾ', documents: 'ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼', deadline: 'ਆਖਰੀ ਮਿਤੀ', applyOfficially: 'ਅਧਿਕਾਰਤ ਤੌਰ ਤੇ ਅਪਲਾਈ ਕਰੋ →', officialLinkUnavailable: 'ਲਿੰਕ ਉਪਲਬਧ ਨਹੀਂ। ਵਿਭਾਗੀ ਸਾਈਟ ਦੇਖੋ।', save: 'ਸੰਭਾਲੋ', saved: 'ਸੰਭਾਲਿਆ ਗਿਆ', viewDetails: 'ਪੂਰਾ ਵੇਰਵਾ', explainEligibility: 'ਯੋਗਤਾ ਸਮਝੋ', compare: 'ਤੁਲਨਾ ਕਰੋ', centralGov: 'ਕੇਂਦਰ ਸਰਕਾਰ', stateGov: 'ਰਾਜ ਸਰਕਾਰ' },
    scamWarning: { title: 'ਧੋਖਾਧੜੀ ਤੋਂ ਸਾਵਧਾਨ ਰਹੋ', body: 'ਸਕੀਮਸਾਥੀ ਕਦੇ ਵੀ OTP ਜਾਂ ਪਾਸਵਰਡ ਨਹੀਂ ਮੰਗਦਾ। ਕੋਈ ਵੀ ਜਾਣਕਾਰੀ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ ਸਰਕਾਰੀ ਸਾਈਟ ਵੇਖੋ।', learnMore: 'ਸੁਰੱਖਿਆ ਨਿਯਮ', reportIssue: 'ਗਲਤ ਜਾਣਕਾਰੀ ਦੀ ਰਿਪੋਰਟ ਕਰੋ' },
    wizard: { badge: 'ਸਕੀਮ ਗਾਈਡ', title: 'ਮੇਰੇ ਲਈ ਸਕੀਮਾਂ ਖੋਜੋ', subtitle: 'ਆਪਣੀ ਯੋਗਤਾ ਜਾਣਨ ਲਈ 6 ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ।', step: 'ਸਵਾਲ', of: 'ਵਿੱਚੋਂ', back: 'ਪਿੱਛੇ', next: 'ਅਗਲਾ', seeMatches: 'ਸਕੀਮਾਂ ਦਿਖਾਓ', startAgain: 'ਦੁਬਾਰਾ ਸ਼ੁਰੂ ਕਰੋ', matchedTitle: 'ਤੁਹਾਡੇ ਲਈ ਢੁਕਵੀਆਂ ਸਕੀਮਾਂ', disclaimer: 'ਅੰਤਿਮ ਯੋਗਤਾ ਲਈ ਸਰਕਾਰੀ ਪੋਰਟਲ ਵੇਖੋ।', q1: 'ਤੁਹਾਡਾ ਰਾਜ ਕਿਹੜਾ ਹੈ?', q2: 'ਤੁਹਾਡੀ ਉਮਰ ਕਿੰਨੀ ਹੈ?', q3: 'ਤੁਹਾਡਾ ਕੰਮ ਕੀ ਹੈ?', q4: 'ਸਿੱਖਿਆ ਪੱਧਰ ਕੀ ਹੈ?', q5: 'ਸਾਲਾਨਾ ਆਮਦਨ ਕਿੰਨੀ ਹੈ?', q6: 'ਕਿਹੜੀ ਸਹਾਇਤਾ ਚਾਹੀਦੀ ਹੈ?' },
    assistant: { title: 'ਸਕੀਮਸਾਥੀ AI', subtitle: 'ਤੁਹਾਡਾ ਨਿੱਜੀ ਸਕੀਮ ਸਹਾਇਕ।', placeholder: 'ਯੋਗਤਾ ਜਾਂ ਦਸਤਾਵੇਜ਼ਾਂ ਬਾਰੇ ਪੁੱਛੋ...', send: 'ਪੁੱਛੋ', quickPrompts: 'ਸੁਝਾਏ ਗਏ ਸਵਾਲ:', disclaimer: 'ਸਰਕਾਰੀ ਅੰਕੜਿਆਂ ਤੇ ਆਧਾਰਿਤ ਜਾਣਕਾਰੀ।', scamAlertTitle: 'ਸੁਰੱਖਿਆ ਚੇਤਾਵਨੀ', scamAlertBody: 'ਆਪਣਾ OTP ਕਿਸੇ ਨਾਲ ਸਾਂਝਾ ਨਾ ਕਰੋ।' },
    savedSection: { title: 'ਸੰਭਾਲੀਆਂ ਸਕੀਮਾਂ', subtitle: 'ਸੰਭਾਲੀਆਂ ਸਕੀਮਾਂ ਅਤੇ ਸਮਾਂ-ਸੀਮਾ ਦੇਖੋ।', emptyTitle: 'ਕੋਈ ਸਕੀਮ ਨਹੀਂ ਸੰਭਾਲੀ', emptyDesc: 'ਸੰਭਾਲਣ ਲਈ ਕਾਰਡ ਤੇ ਕਲਿੱਕ ਕਰੋ।', compareBtn: 'ਤੁਲਨਾ ਕਰੋ', deadlinesTitle: 'ਨੇੜੇ ਆ ਰਹੀਆਂ ਆਖਰੀ ਤਾਰੀਖਾਂ', clearAll: 'ਸਭ ਹਟਾਓ' }
  },
  as: {
    brandName: 'স্কিমসাথী',
    tagline: 'চৰকাৰী আঁচনি আৰু বৃত্তিৰ আপোনাৰ বিশ্বাসী সহায়ক',
    subTagline: 'চৰকাৰী সুবিধা, এতিয়া সহজ। বিচাৰক। পৰীক্ষা কৰক। আবেদন কৰক।',
    nav: { home: 'গৃহপৃষ্ঠা', schemes: 'চৰকাৰী আঁচনি', scholarships: 'বৃত্তি', categories: 'শ্ৰেণীসমূহ', stateSchemes: 'ৰাজ্যিক আঁচনি', findSchemes: 'মোৰ বাবে আঁচনি', saved: 'সংৰক্ষিত', assistant: 'স্কিমসাথী AI', admin: 'প্ৰশাসক' },
    hero: { title: 'আপোনাৰ বাবে সঠিক চৰকাৰী আঁচনি বিচাৰক', subtitle: 'প্ৰমাণিত চৰকাৰী উৎসৰ পৰা আঁচনি আৰু সুবিধাৰ তথ্য লাভ কৰক।', searchPlaceholder: 'আঁচনি, বৃত্তি, চাকৰি, শিক্ষা বিচাৰক...', searchBtn: 'আঁচনি বিচাৰক', findForMeBtn: 'মোৰ বাবে আঁচনি বিচাৰক', browseCategories: 'জনপ্ৰিয় শ্ৰেণীসমূহ', verifiedBadge: '১০০% চৰকাৰী .gov.in উৎস', totalSchemes: 'প্ৰমাণিত আঁচনি আৰু বৃত্তি', totalStates: 'সকলো ৰাজ্য', officialSources: 'চৰকাৰী প’ৰ্টেল' },
    filters: { title: 'ফিল্টাৰ আৰু সন্ধান', allCategories: 'সকলো শ্ৰেণী', allStates: 'সমগ্ৰ ভাৰত আৰু ৰাজ্য', allTypes: 'সকলো প্ৰকাৰ', allStatuses: 'সকলো স্থিতি', stateLabel: 'ৰাজ্য', categoryLabel: 'শ্ৰেণী', typeLabel: 'প্ৰকাৰ', statusLabel: 'আবেদনৰ স্থিতি', ageLabel: 'বয়স', educationLabel: 'শিক্ষাগত অৰ্হতা', incomeLabel: 'বাৰ্ষিক আয়', occupationLabel: 'বৃত্তি', reset: 'ৰিছেট', showingResults: 'ফলাফল দেখুওৱা হৈছে', noResults: 'কোনো আঁচনি পোৱা নগ’ল', noResultsDesc: 'অন্য শব্দৰে চেষ্টা কৰক।' },
    card: { verifiedSource: 'চৰকাৰী প্ৰমাণিত উৎস', lastVerified: 'অন্তিম পৰীক্ষা', benefits: 'সুবিধাসমূহ', whoCanApply: 'কোনে আবেদন কৰিব পাৰিব', eligibility: 'যোগ্যতা', documents: 'প্ৰয়োজনীয় নথিপত্ৰ', deadline: 'আবেদনৰ অন্তিম তাৰিখ', applyOfficially: 'চৰকাৰী আবেদন কৰক →', officialLinkUnavailable: 'আবেদন লিংক উপলব্ধ নহয়। বিভাগীয় ৱেবছাইট চাওক।', save: 'সংৰক্ষণ কৰক', saved: 'সংৰক্ষিত', viewDetails: 'সম্পূৰ্ণ বিৱৰণ', explainEligibility: 'যোগ্যতা বুজক', compare: 'তুলনা কৰক', centralGov: 'কেন্দ্ৰীয় চৰকাৰ', stateGov: 'ৰাজ্য চৰকাৰ' },
    scamWarning: { title: 'প্ৰতাৰণাৰ পৰা সাৱধান হওক', body: 'স্কিমসাথীয়ে কেতিয়াও OTP বা বেংক পাছৱৰ্ড নিবিচাৰে। যিকোনো লেনদেনৰ পূৰ্বে চৰকাৰী ৱেবছাইট পৰীক্ষা কৰক।', learnMore: 'সুৰক্ষা নিয়ম', reportIssue: 'ভুল তথ্য ৰিপ’ৰ্ট কৰক' },
    wizard: { badge: 'আঁচনি গাইড', title: 'মোৰ বাবে আঁচনি বিচাৰক', subtitle: '৬টা সহজ প্ৰশ্নৰ উত্তৰ দি উপযুক্ত আঁচনি বিচাৰক।', step: 'প্ৰশ্ন', of: 'ৰ ভিতৰত', back: 'পিছলৈ', next: 'পৰৱৰ্তী', seeMatches: 'আঁচনিসমূহ দেখুৱাওক', startAgain: 'পুনৰ আৰম্ভ কৰক', matchedTitle: 'আপোনাৰ বাবে উপযুক্ত আঁচনিসমূহ', disclaimer: 'চূড়ান্ত যোগ্যতাৰ বাবে চৰকাৰী প’ৰ্টেল চাওক।', q1: 'আপোনাৰ ৰাজ্য কোনখন?', q2: 'আপোনাৰ বয়স কিমান?', q3: 'আপোনাৰ বৰ্তমান বৃত্তি কি?', q4: 'শিক্ষাগত অৰ্হতা কি?', q5: 'বাৰ্ষিক পাৰিবাৰিক আয় কিমান?', q6: 'কেনেকুৱা সাহায্য বিচাৰে?' },
    assistant: { title: 'স্কিমসাথী AI', subtitle: 'আপোনাৰ ব্যক্তিগত চৰকাৰী আঁচনি সহায়ক।', placeholder: 'যোগ্যতা, নথিপত্ৰ বা আবেদন সম্পৰ্কে সোধক...', send: 'সোধক', quickPrompts: 'প্ৰস্তাৱিত প্ৰশ্ন:', disclaimer: 'চৰকাৰী তথ্যৰ ভিত্তিত এআই নিৰ্দেশনা।', scamAlertTitle: 'সুৰক্ষা সতৰ্কবাৰ্তা', scamAlertBody: 'কাৰো সৈতে OTP বা PIN শ্বেয়াৰ নকৰিব।' },
    savedSection: { title: 'সংৰক্ষিত আঁচনিসমূহ', subtitle: 'আপোনাৰ সংৰক্ষিত আঁচনি আৰু শেষ তাৰিখ অনুসৰণ কৰক।', emptyTitle: 'কোনো আঁচনি সংৰক্ষিত হোৱা নাই', emptyDesc: 'সংৰক্ষণ কৰিবলৈ কাৰ্ডত ক্লিক কৰক।', compareBtn: 'তুলনা কৰক', deadlinesTitle: 'নিকটৱৰ্তী শেষ তাৰিখসমূহ', clearAll: 'সকলো মচক' }
  },
  ur: {
    brandName: 'اسکیم ساتھی',
    tagline: 'سرکاری اسکیموں اور وظائف کے لیے آپ کا مستند رہنما',
    subTagline: 'سرکاری فوائد، اب آسان۔ تلاش کریں، تصدیق کریں، درخواست دیں۔',
    nav: { home: 'ہوم', schemes: 'سرکاری اسکیمیں', scholarships: 'وظائف', categories: 'زمرہ جات', stateSchemes: 'ریاستی اسکیمیں', findSchemes: 'میرے لیے اسکیمیں', saved: 'محفوظ شدہ', assistant: 'اسکیم ساتھی AI', admin: 'ایڈمن' },
    hero: { title: 'اپنے لیے بہترین سرکاری اسکیم تلاش کریں', subtitle: 'تصدیق شدہ سرکاری ذرائع سے اسکیموں اور وظائف کے بارے میں جانیے۔', searchPlaceholder: 'اسکیمیں، وظائف، نوکریاں، تعلیمی مراعات تلاش کریں...', searchBtn: 'تلاش کریں', findForMeBtn: 'میرے لیے اسکیمیں تلاش کریں', browseCategories: 'مقبول زمرے', verifiedBadge: '100% سرکاری .gov.in ذرائع', totalSchemes: 'تصدیق شدہ اسکیمیں', totalStates: 'تمام ریاستیں', officialSources: 'سرکاری پورٹل' },
    filters: { title: 'فلٹرز اور تلاش', allCategories: 'تمام زمرے', allStates: 'تمام بھارت اور ریاستیں', allTypes: 'تمام اقسام', allStatuses: 'تمام صورتحال', stateLabel: 'ریاست', categoryLabel: 'زمرہ', typeLabel: 'اسکیم کی قسم', statusLabel: 'درخواست کی حیثیت', ageLabel: 'عمر', educationLabel: 'تعلیم', incomeLabel: 'سالانہ آمدنی', occupationLabel: 'پیشہ', reset: 'ری سیٹ', showingResults: 'نتائج دکھائے جا رہے ہیں', noResults: 'کوئی اسکیم نہیں ملی', noResultsDesc: 'براہ کرم کوئی دوسرا لفظ تلاش کریں۔' },
    card: { verifiedSource: 'سرکاری تصدیق شدہ ذریعہ', lastVerified: 'آخری تصدیق', benefits: 'فوائد', whoCanApply: 'کون درخواست دے سکتا ہے', eligibility: 'اہلیت', documents: 'ضروری دستاویزات', deadline: 'آخری تاریخ', applyOfficially: 'سرکاری پورٹل پر درخواست دیں ←', officialLinkUnavailable: 'لنک دستیاب نہیں ہے۔ متعلقہ پورٹل دیکھیں۔', save: 'محفوظ کریں', saved: 'محفوظ شدہ', viewDetails: 'مکمل تفصیلات', explainEligibility: 'اہلیت سمجھیں', compare: 'موازنہ کریں', centralGov: 'مرکزی حکومت', stateGov: 'ریاستی حکومت' },
    scamWarning: { title: 'فراڈ سے ہوشیار رہیں', body: 'اسکیم ساتھی کبھی بھی OTP یا بینک پن نہیں مانگتا۔ سرکاری پورٹل پر ہی تصدیق کریں۔', learnMore: 'حفاظتی اصول', reportIssue: 'غلط معلومات کی اطلاع دیں' },
    wizard: { badge: 'رہنما وزرڈ', title: 'میرے لیے اسکیمیں تلاش کریں', subtitle: '6 آسان سوالات کے جوابات دے کر اپنی اسکیم منتخب کریں۔', step: 'سوال', of: 'میں سے', back: 'پیچھے', next: 'اگلا', seeMatches: 'اسکیمیں دیکھیں', startAgain: 'دوبارہ شروع کریں', matchedTitle: 'آپ کے لیے منتخب اسکیمیں', disclaimer: 'اہلیت کی حتمی تصدیق سرکاری پورٹل پر کریں۔', q1: 'آپ کی ریاست کون سی ہے؟', q2: 'آپ کی عمر کیا ہے؟', q3: 'آپ کا پیشہ کیا ہے؟', q4: 'آپ کی تعلیمی سطح کیا ہے؟', q5: 'سالانہ خاندانی آمدنی؟', q6: 'کس قسم کی مدد درکار ہے؟' },
    assistant: { title: 'اسکیم ساتھی AI', subtitle: 'سرکاری اسکیموں میں آپ کا AI مددگار۔', placeholder: 'اہلیت، اسکیموں یا وظائف کے بارے میں پوچھیں...', send: 'پوچھیں', quickPrompts: 'تجویز کردہ سوالات:', disclaimer: 'سرکاری ڈیٹا پر مبنی AI رہنمائی۔', scamAlertTitle: 'سیکیورٹی الرٹ', scamAlertBody: 'کسی کے ساتھ بھی OTP یا پن شیئر نہ کریں۔' },
    savedSection: { title: 'محفوظ شدہ اسکیمیں', subtitle: 'اپنی محفوظ شدہ اسکیمیں اور ڈیڈ لائن ٹریک کریں۔', emptyTitle: 'کوئی اسکیم محفوظ نہیں ہے', emptyDesc: 'محفوظ کرنے کے لیے کارڈ پر کلک کریں۔', compareBtn: 'موازنہ کریں', deadlinesTitle: 'قریبی آخری تاریخیں', clearAll: 'سب صاف کریں' }
  },
  sa: {
    brandName: 'स्कीमसाथी',
    tagline: 'सर्वकारीय योजनानां छात्रवृत्तीनां च प्रामाणिकः मार्गदर्शकः',
    subTagline: 'सर्वकारीय लाभाः अधुना सुलभाः। अन्विष्यतु। सत्यापयतु। आवेदतु।',
    nav: { home: 'मुख्यपृष्ठम्', schemes: 'सर्वकारयोजनाः', scholarships: 'छात्रवृत्तयः', categories: 'वर्गाः', stateSchemes: 'राज्ययोजनाः', findSchemes: 'मदर्थं योजनाः', saved: 'सुरक्षितानि', assistant: 'स्कीमसाथी AI', admin: 'प्रशासकः' },
    hero: { title: 'भवदर्थं योग्यां सर्वकारयोजनाम् अन्विष्यतु', subtitle: 'प्रामाणिकसर्वकारस्रोतेभ्यः योजनानां लाभानां च विवरणं प्राप्नुवन्तु।', searchPlaceholder: 'योजनाः, छात्रवृत्तयः अन्विष्यतु...', searchBtn: 'अन्वेषणम्', findForMeBtn: 'मदर्थं योजनाः', browseCategories: 'मुख्याः वर्गाः', verifiedBadge: '१००% सर्वकारीयस्रोतांसि', totalSchemes: 'सत्यापिताः योजनाः', totalStates: 'सर्वाणि राज्यानि', officialSources: 'सर्वकारमञ्चाः' },
    filters: { title: 'शोधनं शोधश्च', allCategories: 'सर्वे वर्गाः', allStates: 'समग्रभारतं राज्यानि च', allTypes: 'सर्वे प्रकाराः', allStatuses: 'सर्वाः स्थितयः', stateLabel: 'राज्यम्', categoryLabel: 'वर्गः', typeLabel: 'योजनाप्रकारः', statusLabel: 'आवेदनस्थितिः', ageLabel: 'आयुः', educationLabel: 'शिक्षा', incomeLabel: 'वार्षिकी आयः', occupationLabel: 'वृत्तिः', reset: 'पुनः स्थापयतु', showingResults: 'परिणामाः दर्श्यन्ते', noResults: 'योजना न प्राप्ता', noResultsDesc: 'अन्यपदैः अन्वेषणं कुर्वन्तु।' },
    card: { verifiedSource: 'सत्यापितसर्वकारस्रोतः', lastVerified: 'अन्तिमसत्यापनम्', benefits: 'लाभाः', whoCanApply: 'कः आवेदितुं शक्नोति', eligibility: 'योग्यता', documents: 'आवश्यकपत्राणि', deadline: 'अन्तिमा तिथिः', applyOfficially: 'सर्वकारमञ्चे आवेदतु →', officialLinkUnavailable: 'सम्पर्कः अप्राप्यः।', save: 'सुरक्षितं कुरु', saved: 'सुरक्षितम्', viewDetails: 'विस्तृतविवरणम्', explainEligibility: 'योग्यतां बोधतु', compare: 'तुलनां कुरु', centralGov: 'केन्द्रसर्वकारः', stateGov: 'राज्यसर्वकारः' },
    scamWarning: { title: 'वञ्चनायाः सावधानता', body: 'स्कीमसाथी कदापि OTP अथवा गुप्तसङ्केतं न याचते।', learnMore: 'सुरक्षानियमाः', reportIssue: 'दोषं सूचयतु' },
    wizard: { badge: 'योजनासहायकः', title: 'मदर्थं योजनाः अन्विष्यतु', subtitle: 'षट् प्रश्नानाम् उत्तरैः योग्यान् लाभान् प्राप्नुवन्तु।', step: 'प्रश्नः', of: 'मध्ये', back: 'पृष्ठतः', next: 'अग्रिमम्', seeMatches: 'योजनाः पश्यतु', startAgain: 'पुनः आरम्भः', matchedTitle: 'भवदर्थं चयिताः योजनाः', disclaimer: 'सर्वकारमञ्चे सत्यापयतु।', q1: 'भवतः राज्यं किम्?', q2: 'भवतः आयुः कियत्?', q3: 'भवतः वृत्तिः का?', q4: 'शिक्षा स्तरः कः?', q5: 'वार्षिकी कौटुम्बिकी आयः?', q6: 'कीदृशी साहाय्यता अपेक्षिता?' },
    assistant: { title: 'स्कीमसाथी AI', subtitle: 'सर्वकारीययोजनासु भवतां AI सहायकः।', placeholder: 'योग्यतां, पत्राणि, योजनाः च पृच्छतु...', send: 'पृच्छतु', quickPrompts: 'प्रस्ताविताः प्रश्नाः:', disclaimer: 'सर्वकारतथ्याधारितः AI मार्गदर्शकः।', scamAlertTitle: 'सुरक्षाचेतावनी', scamAlertBody: 'कस्मैचित् अपि OTP मा समर्पयतु।' },
    savedSection: { title: 'सुरक्षिताः योजनाः', subtitle: 'सुरक्षिताः योजनाः अन्तिमतिथीः च अनुसरतु।', emptyTitle: 'योजना न सुरक्षिता', emptyDesc: 'कार्डं नुदतु।', compareBtn: 'तुलना', deadlinesTitle: 'आसन्नतिथयः', clearAll: 'सर्वं दूरीकुरु' }
  },
  mai: {
    brandName: 'स्कीमसाथी',
    tagline: 'सरकारी योजना आ छात्रवृत्तिक लेल अहाँक विश्वसनीय साथी',
    subTagline: 'सरकारी लाभ, आब भेल सहज। खोजू। जाँचू। आवेदन करू।',
    nav: { home: 'मुख्य पृष्ठ', schemes: 'सरकारी योजना', scholarships: 'छात्रवृत्ति', categories: 'श्रेणी सभ', stateSchemes: 'राज्यक योजना', findSchemes: 'हमर लेल योजना', saved: 'सहेजल', assistant: 'स्कीमसाथी AI', admin: 'व्यवस्थापक' },
    hero: { title: 'अहाँक लेल सही सरकारी योजना खोजू', subtitle: 'सत्यापित सरकारी स्रोत सं योजना आ छात्रवृत्तिक जानकारी प्राप्त करू।', searchPlaceholder: 'योजना, छात्रवृत्ति, नौकरी, शिक्षा खोजू...', searchBtn: 'योजना खोजू', findForMeBtn: 'हमर लेल योजना खोजू', browseCategories: 'लोकप्रिय श्रेणी', verifiedBadge: '१००% आधिकारिक .gov.in स्रोत', totalSchemes: 'सत्यापित योजना सभ', totalStates: 'सभ राज्य', officialSources: 'सरकारी पोर्टल' },
    filters: { title: 'फिल्टर आ खोज', allCategories: 'सभ श्रेणी', allStates: 'सम्पूर्ण भारत आ राज्य', allTypes: 'सभ प्रकार', allStatuses: 'सभ स्थिति', stateLabel: 'राज्य', categoryLabel: 'श्रेणी', typeLabel: 'प्रकार', statusLabel: 'आवेदन स्थिति', ageLabel: 'उम्र', educationLabel: 'शिक्षा', incomeLabel: 'वार्षिक आमदनी', occupationLabel: 'पेशा', reset: 'रीसेट', showingResults: 'परिणाम देखाओल जा रहल अछि', noResults: 'कोनो योजना नहि भेटल', noResultsDesc: 'कृप्या दोसर शब्द सं खोजू।' },
    card: { verifiedSource: 'सत्यापित सरकारी स्रोत', lastVerified: 'अंतिम सत्यापन', benefits: 'लाभ', whoCanApply: 'के आवेदन कऽ सकैत अछि', eligibility: 'योग्यता', documents: 'आवश्यक कागजात', deadline: 'अंतिम तिथि', applyOfficially: 'सरकारी पोर्टल पर आवेदन करू →', officialLinkUnavailable: 'आवेदन लिंक उपलब्ध नहि अछि।', save: 'सहेजू', saved: 'सहेजल गेल', viewDetails: 'विस्तृत विवरण', explainEligibility: 'योग्यता बुझू', compare: 'तुलना करू', centralGov: 'केंद्र सरकार', stateGov: 'राज्य सरकार' },
    scamWarning: { title: 'धोखाधड़ी सं सावधान रहू', body: 'स्कीमसाथी कहियो OTP या बैंक पासवर्ड नहि माँगैत अछि।', learnMore: 'सुरक्षा नियम', reportIssue: 'गलती रिपोर्ट करू' },
    wizard: { badge: 'योजना गाइड', title: 'हमर लेल योजना खोजू', subtitle: '६ आसान सवालक जवाब दऽ कऽ उपयुक्त योजना खोजू।', step: 'सवाल', of: 'में सं', back: 'पाछाँ', next: 'आगाँ', seeMatches: 'योजना सभ देखू', startAgain: 'पुनः शुरू करू', matchedTitle: 'अहाँक लेल चुनल योजना सभ', disclaimer: 'आधिकारिक पोर्टल पर अंतिम सत्यापन करू।', q1: 'अहाँक राज्य कोन अछि?', q2: 'अहाँक उम्र कतेक अछि?', q3: 'अहाँक पेशा की अछि?', q4: 'शिक्षाक स्तर की अछि?', q5: 'वार्षिक पारिवारिक आमदनी?', q6: 'कोन प्रकारक मदद चाही?' },
    assistant: { title: 'स्कीमसाथी AI', subtitle: 'सरकारी योजना सभ में अहाँक AI सहायक।', placeholder: 'योग्यता, कागजात या छात्रवृत्ति विषय में पूछू...', send: 'पूछू', quickPrompts: 'सुझाओल सवाल:', disclaimer: 'सरकारी डेटा पर आधारित AI मार्गदर्शन।', scamAlertTitle: 'सुरक्षा चेतावनी', scamAlertBody: 'केकरो संग OTP या पासवर्ड साझा नहि करू।' },
    savedSection: { title: 'सहेजल योजना सभ', subtitle: 'अपन सुरक्षित योजना आ अंतिम तिथि देखू।', emptyTitle: 'कोनो योजना नहि सहेजल गेल', emptyDesc: 'सहेजए लेल कार्ड पर क्लिक करू।', compareBtn: 'तुलना करू', deadlinesTitle: 'नजदीक आबैत अंतिम तिथि', clearAll: 'सभ हटाउ' }
  },
  ne: {
    brandName: 'स्कीमसाथी',
    tagline: 'सरकारी योजना तथा छात्रवृत्तिका लागि तपाईंको भरपर्दो मार्गदर्शक',
    subTagline: 'सरकारी सुविधाहरू अब सहज। खोज्नुहोस्। जाँच्नुहोस्। आवेदन दिनुहोस्।',
    nav: { home: 'गृहपृष्ठ', schemes: 'सरकारी योजनाहरू', scholarships: 'छात्रवृत्ति', categories: 'वर्गहरू', stateSchemes: 'राज्य योजनाहरू', findSchemes: 'मेरो लागि योजनाहरू', saved: 'सुरक्षित', assistant: 'स्कीमसाथी AI', admin: 'प्रशासक' },
    hero: { title: 'तपाईंको लागि उपयुक्त सरकारी योजना खोज्नुहोस्', subtitle: 'प्रमाणित सरकारी स्रोतहरूबाट योजना र छात्रवृत्तिहरूको जानकारी पाउनुहोस्।', searchPlaceholder: 'योजनाहरू, छात्रवृत्ति, जागिर, शिक्षा खोज्नुहोस्...', searchBtn: 'योजना खोज्नुहोस्', findForMeBtn: 'मेरो लागि योजना खोज्नुहोस्', browseCategories: 'लोकप्रिय वर्गहरू', verifiedBadge: '१००% आधिकारिक सरकारी स्रोत', totalSchemes: 'प्रमाणित योजनाहरू', totalStates: 'सबै राज्यहरू', officialSources: 'सरकारी पोर्टलहरू' },
    filters: { title: 'फिल्टर र खोज', allCategories: 'सबै वर्गहरू', allStates: 'सम्पूर्ण भारत र राज्यहरू', allTypes: 'सबै प्रकार', allStatuses: 'सबै स्थिति', stateLabel: 'राज्य', categoryLabel: 'वर्ग', typeLabel: 'प्रकार', statusLabel: 'आवेदन स्थिति', ageLabel: 'उमेर', educationLabel: 'शिक्षा', incomeLabel: 'वार्षिक आय', occupationLabel: 'पेशा', reset: 'रिसेट', showingResults: 'नतिजाहरू देखाइँदै छ', noResults: 'कुनै योजना फेला परेन', noResultsDesc: 'कृपया अन्य शब्दबाट खोज्नुहोस्।' },
    card: { verifiedSource: 'प्रमाणित सरकारी स्रोत', lastVerified: 'पछिल्लो प्रमाणीकरण', benefits: 'सुविधाहरू', whoCanApply: 'कसले आवेदन दिन सक्छ', eligibility: 'योग्यता', documents: 'आवश्यक कागजातहरू', deadline: 'अन्तिम मिति', applyOfficially: 'सरकारी पोर्टलमा आवेदन दिनुहोस् →', officialLinkUnavailable: 'आवेदन लिङ्क उपलब्ध छैन।', save: 'सुरक्षित गर्नुहोस्', saved: 'सुरक्षित गरियो', viewDetails: 'विस्तृत विवरण', explainEligibility: 'योग्यता बुझ्नुहोस्', compare: 'तुलना गर्नुहोस्', centralGov: 'केन्द्र सरकार', stateGov: 'राज्य सरकार' },
    scamWarning: { title: 'ठगीबाट सावधान रहनुहोस्', body: 'स्कीमसाथीले कहिल्यै OTP वा बैंक पासवर्ड माग्दैन।', learnMore: 'सुरक्षा नियमहरू', reportIssue: 'त्रुटि रिपोर्ट गर्नुहोस्' },
    wizard: { badge: 'योजना गाइड', title: 'मेरो लागि योजना खोज्नुहोस्', subtitle: '६ सजिला प्रश्नहरूको उत्तर दिएर उपयुक्त योजनाहरू पत्ता लगाउनुहोस्।', step: 'प्रश्न', of: 'मध्ये', back: 'पछाडि', next: 'अगाडि', seeMatches: 'योजनाहरू हेर्नुहोस्', startAgain: 'फेरि सुरु गर्नुहोस्', matchedTitle: 'तपाईंको लागि छनोट गरिएका योजनाहरू', disclaimer: 'सरकारी पोर्टलमा योग्यता प्रमाणीकरण गर्नुहोस्।', q1: 'तपाईंको राज्य कुन हो?', q2: 'तपाईंको उमेर कति हो?', q3: 'तपाईंको पेशा के हो?', q4: 'शैक्षिक स्तर के हो?', q5: 'वार्षिक पारिवारिक आम्दानी?', q6: 'कस्तो सहयोग चाहिन्छ?' },
    assistant: { title: 'स्कीमसाथी AI', subtitle: 'सरकारी योजनाहरूमा तपाईंको AI सहयोगी।', placeholder: 'योग्यता, कागजात वा योजनाहरूको बारेमा सोध्नुहोस्...', send: 'सोध्नुहोस्', quickPrompts: 'सुझाइएका प्रश्नहरू:', disclaimer: 'सरकारी तथ्याङ्कमा आधारित AI मार्गदर्शन।', scamAlertTitle: 'सुरक्षा चेतावनी', scamAlertBody: 'कसैसँग पनि OTP वा पासवर्ड साझा नगर्नुहोस्।' },
    savedSection: { title: 'सुरक्षित योजनाहरू', subtitle: 'तपाईंको सुरक्षित योजनाहरू र अन्तिम म्याद ट्र्याक गर्नुहोस्।', emptyTitle: 'कुनै योजना सुरक्षित गरिएको छैन', emptyDesc: 'सुरक्षित गर्न कार्डमा थिच्नुहोस्।', compareBtn: 'तुलना गर्नुहोस्', deadlinesTitle: 'नजिकिँदै गरेका अन्तिम मितिहरू', clearAll: 'सबै मेटाउनुहोस्' }
  },
  kok: {
    brandName: 'स्कीमसाथी',
    tagline: 'सरकारी योजनां आनी शिष्यवृत्तीं खातीर तुमचो वांगडी',
    subTagline: 'सरकारी फायदे, आतां सोंपे। सोदात। तपासणी करात। अर्ज करात।',
    nav: { home: 'मुखपृष्ठ', schemes: 'सरकारी योजना', scholarships: 'शिष्यवृत्ती', categories: 'वर्ग', stateSchemes: 'राज्य योजना', findSchemes: 'म्हजे खातीर योजना', saved: 'सांबाळिल्ल्यो', assistant: 'स्कीमसाथी AI', admin: 'प्रशासक' },
    hero: { title: 'तुमकां योग्य सरकारी योजना सोदात', subtitle: 'सत्यापित सरकारी स्त्रोतांतल्यान योजना आनी शिष्यवृत्तींची म्हायती मेळयात।', searchPlaceholder: 'योजना, शिष्यवृत्ती सोदात...', searchBtn: 'सोदात', findForMeBtn: 'म्हजे खातीर योजना सोदात', browseCategories: 'लोकप्रिय वर्ग', verifiedBadge: '१००% अधिकृत सरकारी स्त्रोत', totalSchemes: 'सत्यापित योजना', totalStates: 'सगळीं राज्यां', officialSources: 'सरकारी पोर्टल' },
    filters: { title: 'फिल्टर आनी सोद', allCategories: 'सगळे वर्ग', allStates: 'सगळो भारत आनी राज्यां', allTypes: 'सगळे प्रकार', allStatuses: 'सगळी स्थिती', stateLabel: 'राज्य', categoryLabel: 'वर्ग', typeLabel: 'प्रकार', statusLabel: 'अर्ज स्थिती', ageLabel: 'पिराय', educationLabel: 'शिक्षण', incomeLabel: 'वार्षिक उत्पन्न', occupationLabel: 'वेवसाय', reset: 'परत करात', showingResults: 'निकाल दाखयतात', noResults: 'खंयचीय योजना मेळ्ळी ना', noResultsDesc: 'दुसऱ्या उतरांनी सोदात।' },
    card: { verifiedSource: 'अधिकृत सरकारी स्त्रोत', lastVerified: 'निमाणे सत्यापन', benefits: 'फायदे', whoCanApply: 'कोण अर्ज करूं शकता', eligibility: 'पात्रता', documents: 'कागदपत्रां', deadline: 'निमाणी तारीख', applyOfficially: 'पोर्टलाचेर अर्ज करात →', officialLinkUnavailable: 'दुवो मेळना।', save: 'सांबाळात', saved: 'सांबाळ्ळी', viewDetails: 'सविस्तर म्हायती', explainEligibility: 'पात्रता समजून घेयात', compare: 'तुलना करात', centralGov: 'केंद्र सरकार', stateGov: 'राज्य सरकार' },
    scamWarning: { title: 'फसवणुके पसून सादूर राहात', body: 'स्कीमसाथी केन्नाच OTP मागीना।', learnMore: 'सुरक्षा नेम', reportIssue: 'चूक कळयात' },
    wizard: { badge: 'योजना मार्गदर्शक', title: 'म्हजे खातीर योजना सोदात', subtitle: '६ सोप्या प्रस्नांची जापो दिवन योग्य योजना सोदात।', step: 'प्रस्न', of: 'पैकी', back: 'फाटीं', next: 'फुडें', seeMatches: 'योजना पळयात', startAgain: 'परत सुरू करात', matchedTitle: 'तुमचे खातीर योजना', disclaimer: 'अधिकृत पोर्टलाचेर तपासणी करात।', q1: 'तुमचें राज्य खंयचें?', q2: 'तुमची पिराय कितली?', q3: 'तुमचो वेवसाय कितें?', q4: 'शिक्षण कितलें?', q5: 'वार्षिक उत्पन्न कितलें?', q6: 'कसली मदत जाय?' },
    assistant: { title: 'स्कीमसाथी AI', subtitle: 'सरकारी योजनांत तुमचो AI वांगडी।', placeholder: 'पात्रता, कागदपत्रां वा योजनां विशीं विचारात...', send: 'विचारात', quickPrompts: 'सुचयल्ले प्रस्न:', disclaimer: 'सरकारी डेटाचेर आदारित AI मार्गदर्शन।', scamAlertTitle: 'सुरक्षा शिटकावणी', scamAlertBody: 'कोणाकूच OTP दिव नाकात।' },
    savedSection: { title: 'सांबाळिल्ल्यो योजना', subtitle: 'तुमच्यो सांबाळिल्ल्यो योजना पळयात।', emptyTitle: 'योजना सांबाळ्ळी ना', emptyDesc: 'कार्डार क्लिक करात।', compareBtn: 'तुलना करात', deadlinesTitle: 'लागीं आयिल्ल्यो तारखो', clearAll: 'सगळें काडात' }
  },
  sat: {
    brandName: 'SchemeSathi',
    tagline: 'ᱥᱚᱨᱠᱟᱨᱤ ᱡᱚᱡᱚᱱᱟ ᱟᱨ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱞᱟᱹᱜᱤᱫ ᱜᱟᱛᱮ',
    subTagline: 'ᱥᱚᱨᱠᱟᱨᱤ ᱞᱟᱵᱷ, ᱱᱤᱛᱚᱜ ᱟᱞᱜᱟ ᱛᱮ᱾ ᱯᱟᱸᱡᱟᱭ ᱢᱮ᱾ ᱧᱮᱞ ᱢᱮ᱾ ᱮᱯᱞᱟᱭ ᱢᱮ᱾',
    nav: { home: 'ᱚᱲᱟᱜ', schemes: 'ᱥᱚᱨᱠᱟᱨᱤ ᱡᱚᱡᱚᱱᱟ', scholarships: 'ᱥᱠᱚᱞᱟᱨᱥᱤᱯ', categories: 'ᱛᱷᱚᱠ', stateSchemes: 'ᱯᱚᱱᱚᱛ ᱡᱚᱡᱚᱱᱟ', findSchemes: 'ᱤᱧ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱡᱚᱱᱟ', saved: 'ᱥᱟᱧᱪᱟᱣ', assistant: 'SchemeSathi AI', admin: 'ᱮᱰᱢᱤᱱ' },
    hero: { title: 'ᱟᱢ ᱞᱟᱹᱜᱤᱫ ᱴᱷᱤᱠ ᱥᱚᱨᱠᱟᱨᱤ ᱡᱚᱡᱚᱱᱟ ᱯᱟᱸᱡᱟᱭ ᱢᱮ', subtitle: 'ᱥᱚᱨᱠᱟᱨᱤ ᱯᱷᱮᱰᱟᱛ ᱠᱷᱚᱱ ᱡᱚᱡᱚᱱᱟ ᱟᱨ ᱥᱠᱚᱞᱟᱨᱥᱤᱯ ᱵᱟᱰᱟᱭ ᱢᱮ᱾', searchPlaceholder: 'ᱡᱚᱡᱚᱱᱟ, ᱥᱠᱚᱞᱟᱨᱥᱤᱯ, ᱪᱟᱹᱠᱨᱤ ᱯᱟᱸᱡᱟᱭ ᱢᱮ...', searchBtn: 'ᱯᱟᱸᱡᱟᱭ ᱢᱮ', findForMeBtn: 'ᱤᱧ ᱞᱟᱹᱜᱤᱫ ᱯᱟᱸᱡᱟᱭ ᱢᱮ', browseCategories: 'ᱧᱩᱛᱩᱢᱟᱱ ᱛᱷᱚᱠ', verifiedBadge: '᱑᱐᱐% ᱥᱚᱨᱠᱟᱨᱤ .gov.in ᱯᱷᱮᱰᱟᱛ', totalSchemes: 'ᱥᱟᱹᱨᱤ ᱡᱚᱡᱚᱱᱟ', totalStates: 'ᱡᱚᱛᱚ ᱯᱚᱱᱚᱛ', officialSources: 'ᱥᱚᱨᱠᱟᱨᱤ ᱯᱚᱨᱴᱟᱞ' },
    filters: { title: 'ᱪᱷᱟᱹᱱᱤ ᱟᱨ ᱯᱟᱸᱡᱟ', allCategories: 'ᱡᱚᱛᱚ ᱛᱷᱚᱠ', allStates: 'ᱵᱷᱟᱨᱚᱛ ᱟᱨ ᱯᱚᱱᱚᱛ', allTypes: 'ᱡᱚᱛᱚ ᱞᱮᱠᱟᱱ', allStatuses: 'ᱡᱚᱛᱚ ᱦᱟᱞᱚᱛ', stateLabel: 'ᱯᱚᱱᱚᱛ', categoryLabel: 'ᱛᱷᱚᱠ', typeLabel: 'ᱡᱚᱡᱚᱱᱟ ᱞᱮᱠᱟᱱ', statusLabel: 'ᱮᱯᱞᱤᱠᱮᱥᱚᱱ ᱦᱟᱞᱚᱛ', ageLabel: 'ᱩᱢᱮᱨ', educationLabel: 'ᱚᱞᱚᱜ ᱯᱟᱲᱦᱟᱣ', incomeLabel: 'ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱟᱨᱡᱟᱣ', occupationLabel: 'ᱠᱟᱹᱢᱤ', reset: 'ᱨᱤᱥᱮᱴ', showingResults: 'ᱨᱤᱡᱟᱞᱴ ᱩᱫᱩᱜᱚᱜ ᱠᱟᱱᱟ', noResults: 'ᱡᱚᱡᱚᱱᱟ ᱵᱟᱝ ᱧᱟᱢ ᱞᱮᱱᱟ', noResultsDesc: 'ᱮᱴᱟᱜ ᱟᱹᱲᱟᱹ ᱛᱮ ᱯᱟᱸᱡᱟᱭ ᱢᱮ᱾' },
    card: { verifiedSource: 'ᱥᱚᱨᱠᱟᱨᱤ ᱯᱷᱮᱰᱟᱛ', lastVerified: 'ᱢᱩᱪᱟᱹᱫ ᱧᱮᱞ', benefits: 'ᱞᱟᱵᱷ', whoCanApply: 'ᱚᱠᱚᱭ ᱮᱯᱞᱟᱭ ᱫᱟᱲᱮᱭᱟᱜ-ᱟ', eligibility: 'ᱡᱚᱜᱽᱭᱚᱛᱟ', documents: 'ᱞᱟᱹᱠᱛᱤᱭᱟᱱ ᱠᱟᱜᱚᱡᱽ', deadline: 'ᱢᱩᱪᱟᱹᱫ ᱢᱟᱹᱦᱤᱛ', applyOfficially: 'ᱥᱚᱨᱠᱟᱨᱤ ᱯᱚᱨᱴᱟᱞ ᱨᱮ ᱮᱯᱞᱟᱭ ᱢᱮ →', officialLinkUnavailable: 'ᱞᱤᱸᱠ ᱵᱟᱹᱱᱩᱜ-ᱟ᱾', save: 'ᱥᱟᱧᱪᱟᱣ ᱢᱮ', saved: 'ᱥᱟᱧᱪᱟᱣ ᱮᱱᱟ', viewDetails: 'ᱯᱩᱨᱟᱹ ᱵᱤᱵᱚᱨᱚᱬ', explainEligibility: 'ᱡᱚᱜᱽᱭᱚᱛᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱢᱮ', compare: 'ᱛᱩᱞᱟᱹᱡᱚᱠᱷᱟ', centralGov: 'ᱛᱟᱞᱢᱟ ᱥᱚᱨᱠᱟᱨ', stateGov: 'ᱯᱚᱱᱚᱛ ᱥᱚᱨᱠᱟᱨ' },
    scamWarning: { title: 'ᱮᱲᱮ ᱠᱷᱚᱱ ᱥᱟᱵᱽᱫᱷᱟᱱ', body: 'SchemeSathi ᱛᱤᱥ ᱦᱚᱸ OTP ᱵᱟᱭ ᱠᱷᱚᱡᱟ᱾', learnMore: 'ᱨᱩᱠᱷᱤᱭᱟᱹ ᱱᱤᱭᱚᱢ', reportIssue: 'ᱵᱷᱩᱞ ᱠᱷᱚᱵᱚᱨ ᱮᱢ ᱢᱮ' },
    wizard: { badge: 'ᱡᱚᱡᱚᱱᱟ ᱜᱟᱭᱤᱰ', title: 'ᱤᱧ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱡᱚᱱᱟ ᱯᱟᱸᱡᱟᱭ ᱢᱮ', subtitle: '᱖ ᱜᱚᱴᱟᱝ ᱠᱩᱠᱞᱤ ᱨᱮᱱᱟᱜ ᱛᱮᱞᱟ ᱮᱢ ᱠᱟᱛᱮ ᱡᱚᱡᱚᱱᱟ ᱯᱟᱸᱡᱟᱭ ᱢᱮ᱾', step: 'ᱠᱩᱠᱞᱤ', of: 'ᱠᱷᱚᱱ', back: 'ᱛᱟᱭᱚᱢ', next: 'ᱞᱟᱦᱟ', seeMatches: 'ᱡᱚᱡᱚᱱᱟ ᱧᱮᱞ ᱢᱮ', startAgain: 'ᱫᱚᱦᱲᱟ ᱮᱦᱚᱵ ᱢᱮ', matchedTitle: 'ᱟᱢ ᱞᱟᱹᱜᱤᱫ ᱡᱚᱡᱚᱱᱟ', disclaimer: 'ᱥᱚᱨᱠᱟᱨᱤ ᱯᱚᱨᱴᱟᱞ ᱨᱮ ᱧᱮᱞ ᱢᱮ᱾', q1: 'ᱟᱢᱟᱜ ᱯᱚᱱᱚᱛ ᱚᱠᱟ?', q2: 'ᱟᱢᱟᱜ ᱩᱢᱮᱨ ᱛᱤᱱᱟᱹᱜ?', q3: 'ᱟᱢᱟᱜ ᱠᱟᱹᱢᱤ ᱪᱮᱫ?', q4: 'ᱚᱞᱚᱜ ᱯᱟᱲᱦᱟᱣ ᱛᱤᱱᱟᱹᱜ?', q5: 'ᱥᱮᱨᱢᱟᱠᱤᱭᱟᱹ ᱟᱨᱡᱟᱣ?', q6: 'ᱪᱮᱫ ᱞᱮᱠᱟᱱ ᱜᱚᱲᱚ ᱞᱟᱹᱠᱛᱤ?' },
    assistant: { title: 'SchemeSathi AI', subtitle: 'ᱥᱚᱨᱠᱟᱨᱤ ᱡᱚᱡᱚᱱᱟ ᱨᱮ ᱟᱢᱟᱜ AI ᱜᱟᱛᱮ᱾', placeholder: 'ᱡᱚᱡᱚᱱᱟ, ᱠᱟᱜᱚᱡᱽ ᱵᱟᱵᱚᱛ ᱠᱩᱞᱤ ᱢᱮ...', send: 'ᱠᱩᱞᱤ ᱢᱮ', quickPrompts: 'ᱠᱩᱠᱞᱤ ᱠᱚ:', disclaimer: 'ᱥᱚᱨᱠᱟᱨᱤ ᱰᱮᱴᱟ ᱪᱮᱛᱟᱱ ᱨᱮ AI ᱜᱟᱭᱤᱰ᱾', scamAlertTitle: 'ᱥᱟᱵᱽᱫᱷᱟᱱ', scamAlertBody: 'ᱡᱟᱦᱟᱸᱭ ᱥᱟᱶ ᱦᱚᱸ OTP ᱟᱞᱚᱢ ᱦᱟᱹᱴᱤᱧᱟ᱾' },
    savedSection: { title: 'ᱥᱟᱧᱪᱟᱣ ᱡᱚᱡᱚᱱᱟ', subtitle: 'ᱟᱢᱟᱜ ᱥᱟᱧᱪᱟᱣ ᱡᱚᱡᱚᱱᱟ ᱧᱮᱞ ᱢᱮ᱾', emptyTitle: 'ᱡᱚᱡᱚᱱᱟ ᱵᱟᱝ ᱥᱟᱧᱪᱟᱣ ᱟᱠᱟᱱᱟ', emptyDesc: 'ᱥᱟᱧᱪᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱠᱟᱨᱰ ᱨᱮ ᱚᱛᱟᱭ ᱢᱮ᱾', compareBtn: 'ᱛᱩᱞᱟᱹᱡᱚᱠᱷᱟ', deadlinesTitle: 'ᱥᱩᱨ ᱢᱩᱪᱟᱹᱫ ᱢᱟᱹᱦᱤᱛ', clearAll: 'ᱡᱚᱛᱚ ᱜᱤᱰᱤ ᱢᱮ' }
  },
  sd: {
    brandName: 'اسڪيم ساٿي',
    tagline: 'سرڪاري اسڪيمن ۽ وظيفن لاءِ مستند گائيڊ',
    subTagline: 'سرڪاري فائدا، هاڻي آسان۔ ڳوليو، تصديق ڪريو، درخواست ڏيو۔',
    nav: { home: 'هوم', schemes: 'سرڪاري اسڪيمون', scholarships: 'وظيفا', categories: 'زمرا', stateSchemes: 'رياستي اسڪيمون', findSchemes: 'منهنجي لاءِ اسڪيمون', saved: 'محفوظ', assistant: 'اسڪيم ساٿي AI', admin: 'ايڊمن' },
    hero: { title: 'پنهنجي لاءِ صحيح سرڪاري اسڪيم ڳوليو', subtitle: 'تصديق ٿيل سرڪاري ذريعن مان اسڪيمن بابت ڄاڻ حاصل ڪريو۔', searchPlaceholder: 'اسڪيمون، وظيفا، نوڪريون ڳوليو...', searchBtn: 'ڳوليو', findForMeBtn: 'منهنجي لاءِ اسڪيمون ڳوليو', browseCategories: 'مشهور زمرا', verifiedBadge: '100% سرڪاري ذريعا', totalSchemes: 'تصديق ٿيل اسڪيمون', totalStates: 'سموريون رياستون', officialSources: 'سرڪاري پورٽل' },
    filters: { title: 'فلٽر ۽ ڳولا', allCategories: 'سمورا زمرا', allStates: 'سمورو ڀارت ۽ رياستون', allTypes: 'سموريون قسمون', allStatuses: 'سموري صورتحال', stateLabel: 'رياست', categoryLabel: 'زمرو', typeLabel: 'اسڪيم جي قسم', statusLabel: 'درخواست جي صورتحال', ageLabel: 'عمر', educationLabel: 'تعليم', incomeLabel: 'سالانه آمدني', occupationLabel: 'پيشو', reset: 'ري سيٽ', showingResults: 'نتيجو ڏيکاريو پيو وڃي', noResults: 'ڪا اسڪيم نه ملي', noResultsDesc: 'ٻئي لفظ سان ڳولا ڪريو۔' },
    card: { verifiedSource: 'تصديق ٿيل سرڪاري ذريعو', lastVerified: 'آخري تصديق', benefits: 'فائدا', whoCanApply: 'ڪير درخواست ڏئي سگهي ٿو', eligibility: 'اهليت', documents: 'ضروري دستاويز', deadline: 'آخري تاريخ', applyOfficially: 'سرڪاري پورٽل تي درخواست ڏيو →', officialLinkUnavailable: 'لنڪ دستياب ناهي۔', save: 'محفوظ ڪريو', saved: 'محفوظ ٿيل', viewDetails: 'مڪمل تفصيل', explainEligibility: 'اهليت سمجهو', compare: 'ڀيٽ ڪريو', centralGov: 'مرڪزي حڪومت', stateGov: 'رياستي حڪومت' },
    scamWarning: { title: 'فريب کان بچو', body: 'اسڪيم ساٿي ڪڏهن به OTP يا پاسورڊ نٿو گهري۔', learnMore: 'حفاظتي قاعدا', reportIssue: 'غلطي رپورٽ ڪريو' },
    wizard: { badge: 'اسڪيم وزرڊ', title: 'منهنجي لاءِ اسڪيمون ڳوليو', subtitle: '6 آسان سوالن جا جواب ڏئي صحيح اسڪيم ڳوليو۔', step: 'سوال', of: 'مان', back: 'پوئتي', next: 'اڳتي', seeMatches: 'اسڪيمون ڏسو', startAgain: 'ٻيهر شروع ڪريو', matchedTitle: 'توهان لاءِ چونڊيل اسڪيمون', disclaimer: 'سرڪاري پورٽل تي تصديق ڪريو۔', q1: 'توهان جي رياست ڪهڙي آهي؟', q2: 'توهان جي عمر ڇا آهي؟', q3: 'توهان جو پيشو ڇا آهي؟', q4: 'تعليم ڪيتري آهي؟', q5: 'سالانه گهريلو آمدني؟', q6: 'ڪهڙي مدد گهرجي؟' },
    assistant: { title: 'اسڪيم ساٿي AI', subtitle: 'سرڪاري اسڪيمن ۾ توهان جو AI مددگار۔', placeholder: 'اهليت يا اسڪيمن بابت پڇو...', send: 'پڇو', quickPrompts: 'تجويز ڪيل سوال:', disclaimer: 'سرڪاري ڊيٽا تي ٻڌل AI رهنمائي۔', scamAlertTitle: 'سيڪيورٽي الرٽ', scamAlertBody: 'ڪنهن سان به OTP شيئر نه ڪريو۔' },
    savedSection: { title: 'محفوظ اسڪيمون', subtitle: 'پنهنجون محفوظ اسڪيمون ڏسو۔', emptyTitle: 'ڪا اسڪيم محفوظ ناهي', emptyDesc: 'محفوظ ڪرڻ لاءِ ڪارڊ تي ڪلڪ ڪريو۔', compareBtn: 'ڀيٽ ڪريو', deadlinesTitle: 'ويجهيون تاريخون', clearAll: 'سڀ صاف ڪريو' }
  },
  doi: {
    brandName: 'स्कीमसाथी',
    tagline: 'सरकारी स्कीमां ते वज़ीफे आस्तै तुंदा प्रामाणिक मार्गदर्शक',
    subTagline: 'सरकारी फायदे, हुण सजले। लब्भो। परखो। अर्जी देओ।',
    nav: { home: 'मुख पृष्ठ', schemes: 'सरकारी स्कीमां', scholarships: 'वज़ीफे', categories: 'कैटिगरी', stateSchemes: 'रियासती स्कीमां', findSchemes: 'मेरे आस्तै स्कीमां', saved: 'बचाई दे', assistant: 'स्कीमसाथी AI', admin: 'एडमिन' },
    hero: { title: 'अपने आस्तै सही सरकारी स्कीम लब्भो', subtitle: 'प्रमाणित सरकारी स्त्रोतां शा स्कीमां ते वज़ीफे दी जानकारी हासल करो।', searchPlaceholder: 'स्कीमां, वज़ीफे, नौकरियें लब्भो...', searchBtn: 'लब्भो', findForMeBtn: 'मेरे आस्तै स्कीमां लब्भो', browseCategories: 'मशहूर कैटिगरी', verifiedBadge: '१००% सरकारी स्त्रोत', totalSchemes: 'सत्यापित स्कीमां', totalStates: 'सारियां रियासतां', officialSources: 'सरकारी पोर्टल' },
    filters: { title: 'फिल्टर ते खोज', allCategories: 'सारियां कैटिगरी', allStates: 'समूचा भारत ते रियासतां', allTypes: 'सारे प्रकार', allStatuses: 'सारियां स्थितियां', stateLabel: 'रियासत', categoryLabel: 'कैटिगरी', typeLabel: 'स्कीम दी किस्म', statusLabel: 'अर्जी दी स्थिति', ageLabel: 'उम्र', educationLabel: 'पढ़ाई', incomeLabel: 'सालाना आमदनी', occupationLabel: 'कम्म-काज', reset: 'रीसेट', showingResults: 'नतीजे दस्से जा करदे न', noResults: 'कोई स्कीम नेईं लब्भी', noResultsDesc: 'किरपा करियै कोई होर शब्द लिखो।' },
    card: { verifiedSource: 'सरकारी प्रमाणित स्त्रोत', lastVerified: 'पिछली जांच', benefits: 'फायदे', whoCanApply: 'कुन अर्जी देई सकदा', eligibility: 'योग्यता', documents: 'ज़रूरी काग़ज़ात', deadline: 'आखरी तारीख', applyOfficially: 'सरकारी पोर्टल पर अर्जी देओ →', officialLinkUnavailable: 'लिंक नेईं ऐ।', save: 'बचाई रक्खो', saved: 'बचाई लेया', viewDetails: 'पूरा ब्योरा', explainEligibility: 'योग्यता समझो', compare: 'मुकाबला करो', centralGov: 'केन्द्रीय सरकार', stateGov: 'रियासती सरकार' },
    scamWarning: { title: 'धोखे शा बचो', body: 'स्कीमसाथी कदे वी OTP जां बैंक पासवर्ड नेईं मंगदा।', learnMore: 'सुरक्षा नियम', reportIssue: 'ग़लती दस्सो' },
    wizard: { badge: 'स्कीम गाइड', title: 'मेरे आस्तै स्कीमां लब्भो', subtitle: '६ सोखे सुआलें दे जवाब देइयै सही स्कीम लब्भो।', step: 'सुआल', of: 'शा', back: 'पिच्छें', next: 'अग्गें', seeMatches: 'स्कीमां दिक्खो', startAgain: 'परतियै शुरू करो', matchedTitle: 'तुंदे आस्तै चुनिया गेदी स्कीमां', disclaimer: 'सरकारी पोर्टल पर परखो।', q1: 'तुंदी रियासत केह्ड़ी ऐ?', q2: 'तुंदी उम्र कितनी ऐ?', q3: 'तुंदा कम्म केह् ऐ?', q4: 'पढ़ाई दा स्तर केह् ऐ?', q5: 'सालाना आमदनी कितनी ऐ?', q6: 'केह्ड़ी मदद चाहिदी ऐ?' },
    assistant: { title: 'स्कीमसाथी AI', subtitle: 'सरकारी स्कीमें च तुंदा AI साथी।', placeholder: 'योग्यता, काग़ज़ात जां स्कीमें बारै पुच्छो...', send: 'पुच्छो', quickPrompts: 'सुझाए दे सुआल:', disclaimer: 'सरकारी डेटा पर आधारित AI मार्गदर्शन।', scamAlertTitle: 'सुरक्षा चेतावनी', scamAlertBody: 'कसै कन्नै वी OTP सांझा मत करो।' },
    savedSection: { title: 'बचाई दे स्कीमां', subtitle: 'अपनियां बचाई दे स्कीमां दिक्खो।', emptyTitle: 'कोई स्कीम नेईं बचाई गेदी', emptyDesc: 'बचाने आस्तै कार्ड पर क्लिक करो।', compareBtn: 'मुकाबला करो', deadlinesTitle: 'नेड़े औने आलियां आखरी तारिखां', clearAll: 'सब साफ करो' }
  },
  mni: {
    brandName: 'স্কিমসাথী',
    tagline: 'লৈঙাক্কী স্কিম অমসুং স্কোলার্সিপকী লমজিংবীবা',
    subTagline: 'লৈঙাক্কী কান্নবশিং লাইথোক্লে। থিবীয়ু। য়েংশিনবীয়ু। দরখাস্ত তৌবীয়ু।',
    nav: { home: 'য়ুম', schemes: 'লৈঙাক্কী স্কিমশিং', scholarships: 'স্কোলার্সিপ', categories: 'মখলশিং', stateSchemes: 'স্টেট স্কিমশিং', findSchemes: 'ঐগীদমক স্কিমশিং', saved: 'থম্বীরবা', assistant: 'স্কিমসাথী AI', admin: 'এডমিন' },
    hero: { title: 'নহাক্কীদমক চুনবা লৈঙাক্কী স্কিম থিবীয়ু', subtitle: 'অশেংবা লৈঙাক্কী পোর্তেলশিংদগী স্কিম অমসুং স্কোলার্সিপকী ৱারোল খঙবীয়ু।', searchPlaceholder: 'স্কিম, স্কোলার্সিপ থিবীয়ু...', searchBtn: 'থিবা', findForMeBtn: 'ঐগীদমক স্কিম থিবা', browseCategories: 'মীয়াম্না পাম্নবা মখলশিং', verifiedBadge: '১০০% লৈঙাক্কী .gov.in পোর্তেল', totalSchemes: 'য়েংশিনরবা স্কিমশিং', totalStates: 'স্টেট পুম্নমক', officialSources: 'লৈঙাক্কী পোর্তেলশিং' },
    filters: { title: 'ফিল্তর অমসুং থিবা', allCategories: 'মখল পুম্নমক', allStates: 'ভারত অমসুং স্টেটশিং', allTypes: 'মখল পুম্নমক', allStatuses: 'ফীভম পুম্নমক', stateLabel: 'স্টেট', categoryLabel: 'মখল', typeLabel: 'স্কিমগী মখল', statusLabel: 'দরখাস্তকী ফীভম', ageLabel: 'চহী', educationLabel: 'লাইরিক হেইবা', incomeLabel: 'চহীগী ইনকম', occupationLabel: 'থবক', reset: 'অমুক হন্না শেমজিনবা', showingResults: 'উৎসিমল্লে', noResults: 'স্কিম অমত্তা ফংদে', noResultsDesc: 'অতোপ্পা ৱাহৈনা থিবীয়ু।' },
    card: { verifiedSource: 'লৈঙাক্কী অশেংবা পোর্তেল', lastVerified: 'অরোইবা য়েংশিনখিবা', benefits: 'কান্নবশিং', whoCanApply: 'কনানা দরখাস্ত তৌবা য়াবগে', eligibility: 'য়াবা মীওই', documents: 'মথৌ তাবা চেশিং', deadline: 'অরোইবা তাং', applyOfficially: 'পোর্তেলদা দরখাস্ত তৌবা →', officialLinkUnavailable: 'লিঙ্ক ফংদে।', save: 'থম্বীয়ু', saved: 'থম্বীরে', viewDetails: 'অকুপ্পা ৱারোল', explainEligibility: 'য়াবা খঙবা', compare: 'য়েংনবা', centralGov: 'কেন্দ্র লৈঙাক', stateGov: 'স্টেট লৈঙাক' },
    scamWarning: { title: 'লান্না থৌদাংদগী চেকশিনবীয়ু', body: 'স্কিমসাথীনা কয়ারকসু OTP তনদে।', learnMore: 'চেকশিনবা নিয়মশিং', reportIssue: 'অশোইবা খঙহনবীয়ু' },
    wizard: { badge: 'স্কিম গায়িদ', title: 'ঐগীদমক স্কিম থিবীয়ু', subtitle: 'ৱাহং ৬গী পাউখুম পীরগা স্কিম ফংবীয়ু।', step: 'ৱাহং', of: 'দগী', back: 'তুংলোই', next: 'মাংলোই', seeMatches: 'স্কিমশিং য়েংবা', startAgain: 'অমুক হন্না হৌবা', matchedTitle: 'নহাক্কীদমক খল্লবা স্কিমশিং', disclaimer: 'লৈঙাক্কী পোর্তেলদা য়েংশিনবীয়ু।', q1: 'নহাক্কী স্টেট করম্বনো?', q2: 'নহাক্কী চহী কতুক শুরগে?', q3: 'নহাক্কী থবক করম্বনো?', q4: 'লাইরিক কতুক হৈবগে?', q5: 'চহীগী ইনকম কতুক ওইবগে?', q6: 'করম্বা মতেং পাম্বগে?' },
    assistant: { title: 'স্কিমসাথী AI', subtitle: 'লৈঙাক্কী স্কিমগী নহাক্কী AI মতেংপাংবা।', placeholder: 'স্কিম, চে-চাংগী মতাংদা হংবীয়ু...', send: 'হংবা', quickPrompts: 'হংবা য়াবা ৱাহংশিং:', disclaimer: 'লৈঙাক্কী পোর্তেলদা য়ুম্ফম ওইবা AI লমজিং।', scamAlertTitle: 'চেকশিনবা ৱাফম', scamAlertBody: 'কনাত্তসু OTP শিয়র তৌগনু।' },
    savedSection: { title: 'থম্বীরবা স্কিমশিং', subtitle: 'নহাক্কী থম্বীরবা স্কিমশিং য়েংবীয়ু।', emptyTitle: 'স্কিম অমত্তা থমদে', emptyDesc: 'থମ୍বীনবা কার্দতা নম্বীয়ু।', compareBtn: 'য়েংনবা', deadlinesTitle: 'নক্না লাক্লবা তাংশিং', clearAll: 'পুম্নমক মুত্থৎপা' }
  },
  brx: {
    brandName: 'SchemeSathi',
    tagline: 'सोरखारि बिथांखि आरो फरायसा बिथांखिनि सिनायथि',
    subTagline: 'सोरखारि मुलाम्फानि राहा, दा गोरलै। नागिर। नायबिजिर। आरजि।',
    nav: { home: 'नखर', schemes: 'सोरखारि बिथांखिफोर', scholarships: 'फरायसा बिथांखि', categories: 'थाखोफोर', stateSchemes: 'रायजो बिथांखिफोर', findSchemes: 'आंनि थाखाय बिथांखि', saved: 'थिनाय', assistant: 'SchemeSathi AI', admin: 'सामलायगिरि' },
    hero: { title: 'गावनि थाखाय थार सोरखारि बिथांखि नागिर', subtitle: 'सोरखारि फुंखाफोरनिफ्राय बिथांखिनि रादाब मोन।', searchPlaceholder: 'बिथांखि, फरायसा बिथांखि नागिर...', searchBtn: 'नागिर', findForMeBtn: 'आंनि थाखाय नागिर', browseCategories: 'मुंदांखा थाखोफोर', verifiedBadge: '१००% सोरखारि .gov.in फुंखा', totalSchemes: 'नायबिजिरजानाय बिथांखिफोर', totalStates: 'गासै रायजोफोर', officialSources: 'सोरखारि पोर्टल' },
    filters: { title: 'सायख’नाय आरो नागिरनाय', allCategories: 'गासै थाखोफोर', allStates: 'भारत आरो रायजोफोर', allTypes: 'गासै रोखोम', allStatuses: 'गासै थासारि', stateLabel: 'रायजो', categoryLabel: 'थाखो', typeLabel: 'बिथांखि रोखोम', statusLabel: 'आरजिनाय थासारि', ageLabel: 'बैसो', educationLabel: 'सोलो', incomeLabel: 'बोसोरारि आय', occupationLabel: 'हाबा-हुखु', reset: 'फिन गायसन', showingResults: 'फिथाय दिन्थिगासिनो दं', noResults: 'जेबो बिथांखि मोनाखै', noResultsDesc: 'गुबुन सोदोबजों नागिर।' },
    card: { verifiedSource: 'सोरखारि थार फुंखा', lastVerified: 'जोबथा नायबिजिरनाय', benefits: 'मुलाम्फाफोर', whoCanApply: 'सोर आरजिनो हायो', eligibility: 'थासारि / गोनांथि', documents: 'गोनांथार बिलाइफोर', deadline: 'जोबथा खालार', applyOfficially: 'सोरखारि पोर्टेलआव आरजि →', officialLinkUnavailable: 'लिंक गैया।', save: 'थिनो', saved: 'थिनाय जाबाय', viewDetails: 'गुवारै नाय', explainEligibility: 'थासारि बुजि', compare: 'रुजुनाय', centralGov: 'मिरु सोरखार', stateGov: 'रायजो सोरखार' },
    scamWarning: { title: 'फासिफनाव सांग्रां जा', body: 'SchemeSathi आ जेब्लाबो OTP बिआ।', learnMore: 'रैखाथि खान्थि', reportIssue: 'गोरोन्थि खिन्था' },
    wizard: { badge: 'बिथांखि दिन्थिगिरि', title: 'आंनि थाखाय बिथांखि नागिर', subtitle: '६ टा गोरलै सोंथिनि फिननाय होना बिथांखि नागिर।', step: 'सोंथि', of: 'नि', back: 'उनाव', next: 'सिगां', seeMatches: 'बिथांखि नाय', startAgain: 'फिन जागाय', matchedTitle: 'नोंनि थाखाय बिथांखिफोर', disclaimer: 'सोरखारि पोर्टेलआव नायबिजिर।', q1: 'नोंनि रायजोआ मा?', q2: 'नोंनि बैसोआ बेसेबां?', q3: 'नोंनि हाबाया मा?', q4: 'सोंनो थाखाय सोलोंथाइ?', q5: 'बोसोरारि आय?', q6: 'माबादि हेफाजाब नांगौ?' },
    assistant: { title: 'SchemeSathi AI', subtitle: 'सोरखारि बिथांखियाव नोंनि AI हेफाजाबगिरि।', placeholder: 'बिथांखि, बिलाइफोरनि सोंथि सों...', send: 'सों', quickPrompts: 'सोंथिफोर:', disclaimer: 'सोरखारि खारिनि सायाव AI दिन्थिनाय।', scamAlertTitle: 'सांग्रांथि', scamAlertBody: 'सोरनोबो OTP दा हो।' },
    savedSection: { title: 'थिनाय बिथांखिफोर', subtitle: 'गावनि थिनाय बिथांखिफोर नाय।', emptyTitle: 'जेबो बिथांखि थियाखै', emptyDesc: 'थिनो थाखाय खार्डआव थु।', compareBtn: 'रुजुनाय', deadlinesTitle: 'खाथि खालारफोर', clearAll: 'गासै हुखुमोर' }
  },
  ks: {
    brandName: 'اسکیم ساتھی',
    tagline: 'سرکٲری سکیٖمن تہٕ وظیفن خٲطرٕ رہنمٲئی',
    subTagline: 'سرکٲری فٲئدٕ، وۆنٛہہ آسٲنی سان۔ ژھانٛڈِو۔ جانچِو۔ دَرخواست دِیو۔',
    nav: { home: 'گھر', schemes: 'سرکٲری سکیٖمہٕ', scholarships: 'وظیفہٕ', categories: 'قسم', stateSchemes: 'ریاستی سکیٖمہٕ', findSchemes: 'میٛانہِ خٲطرٕ سکیٖمہٕ', saved: 'محفوظ', assistant: 'اسکیم ساتھی AI', admin: 'ایڈمن' },
    hero: { title: 'پَننہِ خٲطرٕ صٔحیح سرکٲری سکیٖم ژھانٛڈِو', subtitle: 'مُستند سرکٲری ذرائعو پؠٹھٕ سکیٖمن ہٕنٛز معلُومات حٲصل کٔرِو۔', searchPlaceholder: 'سکیٖمہٕ، وظیفہٕ، نۄکری ژھانٛڈِو...', searchBtn: 'ژھانٛڈِو', findForMeBtn: 'میٛانہِ خٲطرٕ ژھانٛڈِو', browseCategories: 'مشہوٗر زمرٕ', verifiedBadge: '100% سرکٲری .gov.in ذرائع', totalSchemes: 'تصدیٖق شُدٕ سکیٖمہٕ', totalStates: 'سٲری ریاستہٕ', officialSources: 'سرکٲری پورٹل' },
    filters: { title: 'فلٹر تہٕ تلاشن', allCategories: 'سٲری زمرٕ', allStates: 'سٲری ہندوستان تہٕ ریاستہٕ', allTypes: 'سٲری قسم', allStatuses: 'سٲری حٲلت', stateLabel: 'ریاست', categoryLabel: 'زمرٕ', typeLabel: 'سکیٖم ہُنٛد قسم', statusLabel: 'درخواستٕچ حٲلت', ageLabel: 'عُمر', educationLabel: 'تٲلیٖم', incomeLabel: 'سالانہ آمدنی', occupationLabel: 'پیشہٕ', reset: 'دوبارٕ قٲیم کٔرِو', showingResults: 'نتائج چھِ ہاونہٕ یِوان', noResults: 'کانٛہہ سکیٖم مٔلی نہٕ', noResultsDesc: 'مہرَبٲنی کٔرِتھ بیٛاکھ لفظ لِکھِو۔' },
    card: { verifiedSource: 'سرکٲری تصدیٖق شُدٕ ذرائع', lastVerified: 'پٔتِم تصدیٖق', benefits: 'فٲئدٕ', whoCanApply: 'کَم کٔرِتھ ہؠکن درخواست', eligibility: 'اہلیّت', documents: 'ضروری کاغزات', deadline: 'آخری تٲریٖخ', applyOfficially: 'سرکٲری پورٹلس پؠٹھ درخواست دِیو →', officialLinkUnavailable: 'لِنٛک چھُ نہٕ دٔستیاب۔', save: 'محفوظ کٔرِو', saved: 'محفوظ کٔرِمُت', viewDetails: 'پوٗرٕ تفصیل', explainEligibility: 'اہلیّت سمجِھو', compare: 'مُقابلہٕ کٔرِو', centralGov: 'مرکزی حوٚکوٗمت', stateGov: 'ریاستی حوٚکوٗمت' },
    scamWarning: { title: 'دھوکہٕ دہی پؠٹھٕ ہوشیار رۆزِو', body: 'اسکیم ساتھی چھُ نہٕ زانٛہہ تی OTP منٛگاں۔', learnMore: 'حفاظتی اصول', reportIssue: 'غلطی ہُنٛد اطلاع دِیو' },
    wizard: { badge: 'سکیٖم گائیڈ', title: 'میٛانہِ خٲطرٕ سکیٖمہٕ ژھانٛڈِو', subtitle: '6 آسان سوالن ہٕنٛدی جواب دِتھ پَنٔنؠ سکیٖم ژھانٛڈِو۔', step: 'سوال', of: 'منٛزٕ', back: 'پتھ کُن', next: 'برونٛہہ کُن', seeMatches: 'سکیٖمہٕ وُچھِو', startAgain: 'دوبارٕ شروٗع کٔرِو', matchedTitle: 'تُہنٛدِ خٲطرٕ چُندٕ سکیٖمہٕ', disclaimer: 'سرکٲری پورٹلس پؠٹھ جانچ کٔرِو۔', q1: 'تُہنٛز ریاست کۄس چھےٚ؟', q2: 'تُہنٛز عُمر کٕژھ چھےٚ؟', q3: 'تُہنٛد پیشُہ کیاہ چُھ؟', q4: 'تٲلیٖمی سطح کۄس چھےٚ؟', q5: 'سالانہ خاندٲنی آمدنی؟', q6: 'کٕتھ کٔنؠ مدد پَزِ؟' },
    assistant: { title: 'اسکیم ساتھی AI', subtitle: 'سرکٲری سکیٖمن منٛز تُہنٛد AI مددگار۔', placeholder: 'اہلیّت، کاغزات یا سکیٖمن مُتعلِق پُژھِو...', send: 'پُژھِو', quickPrompts: 'مشورٕ دِتمٕت سوال:', disclaimer: 'سرکٲری ڈیٖٹا پؠٹھ مبنی AI رہنمٲئی۔', scamAlertTitle: 'حفاظتی الرٹ', scamAlertBody: 'کٲنسی تہِ سٟتؠ OTP شیئر مَ کٔرِو۔' },
    savedSection: { title: 'محفوظ سکیٖمہٕ', subtitle: 'پَننہٕ محفوظ سکیٖمہٕ وُچھِو۔', emptyTitle: 'کانٛہہ سکیٖم چھےٚ نہٕ محفوظ', emptyDesc: 'محفوظ کَرنہٕ خٲطرٕ کارڈس پؠٹھ کلک کٔرِو۔', compareBtn: 'مُقابلہٕ کٔرِو', deadlinesTitle: 'نزدیکی آخری تٲریخہٕ', clearAll: 'سٲری صفا کٔرِو' }
  }
};
