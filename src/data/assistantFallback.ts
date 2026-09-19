import { INITIAL_SCHEMES } from './schemes';
import { LanguageCode } from '../types';

export function detectScamInQuery(message: string): boolean {
  const lower = (message || '').toLowerCase();
  return (
    lower.includes('otp') ||
    lower.includes('upi pin') ||
    lower.includes('banking password') ||
    lower.includes('asked for password') ||
    lower.includes('pay fee to get scholarship') ||
    lower.includes('registration fee') ||
    lower.includes('send money to apply') ||
    lower.includes('agent asking money') ||
    lower.includes('telegram scheme link') ||
    lower.includes('ओटीपी') ||
    lower.includes('पैसे मांग') ||
    lower.includes('ওটিপি') ||
    lower.includes('ଟଙ୍କା ମାଗୁଛନ୍ତି')
  );
}

const LOCALIZED_SCAM_WARNINGS: Partial<Record<LanguageCode, string>> = {
  hi: `🚨 **धोखाधड़ी से सावधान (Anti-Fraud Warning)**:
**कभी भी अपना OTP, UPI पिन, पासवर्ड या बैंक विवरण किसी के साथ साझा न करें!**

महत्वपूर्ण नियम:
1. **कोई पंजीकरण शुल्क नहीं**: केंद्र एवं राज्य सरकार की सभी छात्रवृत्तियां और योजनाएं (PM-किसान, NSP, आयुष्मान भारत, PMAY) **100% निःशुल्क** हैं।
2. **OTP की आवश्यकता नहीं**: सरकारी अधिकारी कभी भी लाभ देने के लिए कॉल या WhatsApp पर OTP नहीं मांगते।
3. **केवल आधिकारिक पोर्टल**: केवल **.gov.in** या **.nic.in** पर समाप्त होने वाले आधिकारिक पोर्टलों पर ही आवेदन करें।

यदि किसी ने पैसे या OTP की मांग की है, तो तुरंत राष्ट्रीय साइबर अपराध पोर्टल **cybercrime.gov.in** या हेल्पलाइन **1930** पर रिपोर्ट करें।`,

  or: `🚨 **ସତର୍କତା ସୂଚନା (Anti-Fraud Warning)**:
**କଦାପି ଆପଣଙ୍କ OTP, UPI PIN, ବ୍ୟାଙ୍କ ପାସୱାର୍ଡ କାହାକୁ ଦିଅନ୍ତୁ ନାହିଁ!**

ମୁଖ୍ୟ ନିୟମ:
1. **କୌଣସି ଫିସ୍ ନାହିଁ**: ସମସ୍ତ ସରକାରୀ ଯୋଜନା ଓ ବୃତ୍ତି (PM-କିଷାନ, NSP, ଆୟୁଷ୍ମାନ ଭାରତ) ସମ୍ପୂର୍ଣ୍ଣ ମାଗଣା।
2. **OTP ମାଗନ୍ତି ନାହିଁ**: ସରକାରୀ ଅଧିକାରୀ କେବେହେଲେ ଫୋନ୍ ବା WhatsApp ରେ OTP ମାଗନ୍ତି ନାହିଁ।
3. **କେବଳ ସରକାରୀ ପୋର୍ଟାଲ**: କେବଳ **.gov.in** କିମ୍ବା **.nic.in** ଥିବା ୱେବସାଇଟ୍ ବ୍ୟବହାର କରନ୍ତୁ।

କେହି ଟଙ୍କା କିମ୍ବା OTP ମାଗିଲେ ତୁରନ୍ତ ସାଇବର ହେଲ୍ପଲାଇନ୍ **୧୯୩୦** କିମ୍ବା **cybercrime.gov.in** ରେ ଜଣାନ୍ତୁ।`,

  bn: `🚨 **প্রতারণা থেকে সাবধান (Anti-Fraud Warning)**:
**কখনই আপনার OTP, UPI PIN বা ব্যাংক পাসওয়ার্ড কারো সাথে শেয়ার করবেন না!**

জরুরি তথ্য:
1. **সম্পূর্ণ বিনামূল্যে**: সমস্ত সরকারি প্রকল্প ও স্কলারশিপের আবেদন বিনামূল্যে করা যায়। কোনো ফি লাগে না।
2. **OTP চাইবে না**: কোনো সরকারি কর্মকর্তা টাকা পাঠানোর জন্য ফোন বা চ্যাটে OTP চাইবেন না।
3. **শুধুমাত্র সরকারি পোর্টাল**: সর্বদা **.gov.in** বা **.nic.in** ডোমেইনের অফিশিয়াল ওয়েবসাইটে আবেদন করুন।

কেউ টাকা বা OTP চাইলে অবিলম্বে জাতীয় সাইবার হেল্পলাইন **১৯৩০** বা **cybercrime.gov.in** এ অভিযোগ জানান।`,

  te: `🚨 **సైబర్ మోసాల హెచ్చరిక (Anti-Fraud Warning)**:
**మీ OTP, UPI PIN లేదా బ్యాంక్ పాస్‌వర్డ్‌ను ఎవరితోనూ పంచుకోవద్దు!**

ముఖ్య నియమాలు:
1. **ఉచితం**: అన్ని ప్రభుత్వ పథకాలు మరియు స్కాలర్‌షిప్‌లు పూర్తిగా ఉచితం.
2. **OTP అడగరు**: ప్రభుత్వ అధికారులు ఫోన్ లేదా వాట్సాప్‌లో ఎప్పుడూ OTP అడగరు.
3. **అధికారిక పోర్టల్స్ మాత్రమే**: కేవలం **.gov.in** లేదా **.nic.in** తో ముగిసే సైట్‌లలో మాత్రమే దరఖాస్తు చేసుకోండి.

ఎవరైనా డబ్బు లేదా OTP అడిగితే వెంటనే సైబర్ హెల్ప్‌లైన్ **1930** లేదా **cybercrime.gov.in** కు ఫిర్యాదు చేయండి.`,

  ta: `🚨 **மோசடி எச்சரிக்கை (Anti-Fraud Warning)**:
**உங்கள் OTP, UPI PIN அல்லது வங்கி கடவுச்சொல்லை யாருடனும் பகிர வேண்டாம்!**

முக்கிய விதிகள்:
1. **முற்றிலும் இலவசம்**: அனைத்து அரசு திட்டங்கள் மற்றும் கல்வி உதவித்தொகைகள் விண்ணப்பிக்க 100% இலவசம்.
2. **OTP கேட்க மாட்டார்கள்**: அரசு அதிகாரிகள் ஒருபோதும் OTP கேட்க மாட்டார்கள்.
3. **அரசு இணையதளங்கள் மட்டுமே**: **.gov.in** அல்லது **.nic.in** இல் முடியும் தளங்களை மட்டுமே பயன்படுத்தவும்.

மோசடி நடந்தால் உடனடியாக தேசிய உதவி எண் **1930** அல்லது **cybercrime.gov.in** இல் புகார் அளிக்கவும்.`,

  mr: `🚨 **सायबर फसवणूक सावधानता इशारा (Anti-Fraud Warning)**:
**आपला OTP, UPI PIN किंवा बँक पासवर्ड कोणालाही सांगू नका!**

महत्त्वाचे नियम:
1. **विनामूल्य अर्ज**: सर्व शासकीय योजना व शिष्यवृत्ती अर्ज पूर्णपणे मोफत आहेत.
2. **OTP ची गरज नाही**: शासकीय अधिकारी कधीही OTP किंवा बँक माहिती मागत नाहीत.
3. **केवळ अधिकृत पोर्टल**: फक्त **.gov.in** किंवा **.nic.in** असलेल्या वेबसाइट्स वापरा.

कोणी पैसे किंवा OTP मागितल्यास तात्काळ हेल्पलाइन **1930** किंवा **cybercrime.gov.in** वर तक्रार करा.`,
};

export function generateClientSideAssistantReply(
  message: string,
  language: LanguageCode = 'en'
): { reply: string; isScamAlert: boolean; source: string } {
  const lower = (message || '').toLowerCase();

  // 1. Critical Scam Warning
  if (detectScamInQuery(message)) {
    const localizedWarning = LOCALIZED_SCAM_WARNINGS[language];
    return {
      isScamAlert: true,
      source: 'National Cyber Crime Reporting Portal (cybercrime.gov.in) & Ministry of Home Affairs',
      reply: localizedWarning || `🚨 **CRITICAL SCAM & FRAUD WARNING**:
**NEVER share your OTP, UPI PIN, bank account password, or card details with anyone!**

Key facts to protect yourself:
1. **Zero Registration Fee**: All official Government of India schemes and scholarships (PM-Kisan, NSP, Ayushman Bharat, PMAY) are **100% FREE to apply**.
2. **No OTP Required for Sanctions**: Government officers will NEVER call or WhatsApp asking for your OTP or UPI PIN to transfer scholarship funds or subsidies.
3. **Official Portals Only**: Never enter your details on third-party links from WhatsApp, SMS, or Telegram. Only use portals ending in **.gov.in** or **.nic.in**.

If someone approached you asking for money, immediately report to the National Cybercrime Portal at **cybercrime.gov.in** or dial the national helpline **1930**.`,
    };
  }

  // 2. Search matching schemes
  const matched = (INITIAL_SCHEMES || []).filter((s) => {
    if (!s) return false;
    const nameLower = (s.name || '').toLowerCase();
    const idLower = (s.id || '').toLowerCase();
    const catLower = (s.category || '').toLowerCase();
    const stateLower = (s.state || '').toLowerCase();

    return (
      (nameLower && lower.includes(nameLower)) ||
      (idLower && lower.includes(idLower)) ||
      (catLower && lower.includes(catLower)) ||
      (stateLower && lower.includes(stateLower)) ||
      (lower.includes('scholarship') && s.type === 'scholarship') ||
      (lower.includes('farmer') && s.category === 'Agriculture') ||
      (lower.includes('kisan') && idLower.includes('kisan')) ||
      (lower.includes('student') && s.category === 'Scholarships') ||
      (lower.includes('health') && s.category === 'Healthcare') ||
      (lower.includes('hospital') && s.category === 'Healthcare') ||
      (lower.includes('pragati') && idLower.includes('pragati')) ||
      (lower.includes('loan') && s.category === 'Business') ||
      (lower.includes('house') && s.category === 'Housing') ||
      (lower.includes('सौर') && idLower.includes('surya')) ||
      (lower.includes('किसान') && idLower.includes('kisan')) ||
      (lower.includes('କୃଷି') && idLower.includes('kalia'))
    );
  });

  if (matched.length > 0) {
    const s = matched[0];
    const docsList = Array.isArray(s.documents) ? s.documents : [];
    const docs = docsList.length > 0 
      ? docsList.map((d) => `• **${d.name || 'Document'}**${d.mandatory ? ' (Mandatory)' : ' (Conditional)'}`).join('\n')
      : '• Standard KYC and identity documents as requested on the portal';

    const stepsList = Array.isArray(s.howToApplySteps) ? s.howToApplySteps : [];
    const steps = stepsList.length > 0
      ? stepsList.map((step, idx) => `${idx + 1}. ${step}`).join('\n')
      : '1. Visit official website\n2. Submit online application\n3. Track status using reference number';

    const minAge = s.eligibility?.minAge;
    const maxAge = s.eligibility?.maxAge;
    const incomeLimit = s.eligibility?.incomeLimit;
    const incomeDesc = s.eligibility?.incomeDescription;
    const eduReq = s.eligibility?.educationRequired;

    return {
      isScamAlert: false,
      source: `${s.department || 'Government Department'} (${s.officialWebsite || 'Official Portal'})`,
      reply: `### ${s.name || 'Government Scheme'}
**Department**: ${s.department || 'Central / State Government'}
**Coverage / State**: ${s.level || 'Central'} Government (${s.state || 'All India'})
**Category**: ${s.category || 'Welfare'}

#### 🎯 Key Benefits:
${s.benefitsHighlight || 'Welfare and financial assistance as per government guidelines.'}

#### 📋 Who Can Apply:
${s.whoCanApply || 'Eligible citizens matching government criteria.'}
- **Age Criteria**: ${minAge ? `${minAge} years` : 'No minimum'} to ${maxAge ? `${maxAge} years` : 'No upper limit'}
- **Income Limit**: ${incomeLimit ? `Up to ₹${incomeLimit.toLocaleString('en-IN')}/year` : 'No specific ceiling'} ${incomeDesc ? `(${incomeDesc})` : ''}
${eduReq ? `- **Education**: ${eduReq}` : ''}

#### 📑 Mandatory Documents:
${docs}

#### 🚀 How to Apply:
${steps}

🔗 **Official Verified Portal**: [${s.officialWebsite || 'Official Portal'}](${s.officialPortal || '#'})
*Application Status: **${s.status || 'Active'}** (Deadline: **${s.deadline || 'Check official notification'}**)*`,
    };
  }

  // 3. General Guidance
  return {
    isScamAlert: false,
    source: 'National Portal of India (india.gov.in) & myScheme Portal',
    reply: `I searched the verified government schemes and scholarships repository for: "*${message}*".

Here are key verified gateways:
1. **For Students**: Visit the National Scholarship Portal at **scholarships.gov.in** with One-Time Registration (OTR) and NPCI Aadhaar bank seeding.
2. **For Farmers & Rural Citizens**: Check **pmkisan.gov.in** for ₹6,000 yearly benefit.
3. **For Free Healthcare**: Ayushman Bharat (PM-JAY) provides ₹5,00,000 free family hospitalization cover at **nha.gov.in**.
4. **For Rooftop Solar**: PM Surya Ghar Muft Bijli Yojana provides up to ₹78,000 central subsidy at **pmsuryaghar.gov.in**.
5. **For Small Businesses / Vendors**: PM SVANidhi (**pmsvanidhi.mohua.gov.in**) offers collateral-free loans up to ₹50,000.

You can also switch language in the drawer header to converse in any of the 22 Eighth Schedule languages!`,
  };
}
