import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_SCHEMES } from './src/data/schemes';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Netlify Drop package direct download
app.get('/api/download-netlify-drop', (req, res) => {
  const rootZip = path.join(process.cwd(), 'netlify-drop.zip');
  const pubZip = path.join(process.cwd(), 'public', 'netlify-drop.zip');
  res.download(rootZip, 'schemesathi-netlify-drop.zip', (err) => {
    if (err && !res.headersSent) {
      res.download(pubZip, 'schemesathi-netlify-drop.zip');
    }
  });
});

// Get all verified schemes
app.get('/api/schemes', (req, res) => {
  res.json({ schemes: INITIAL_SCHEMES });
});

// Scam pattern detector
function detectScamQuery(message: string): boolean {
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
    lower.includes('telegram scheme link')
  );
}

const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  or: 'Odia (ଓଡ଼ିଆ)',
  bn: 'Bengali (বাংলা)',
  te: 'Telugu (తెలుగు)',
  ta: 'Tamil (தமிழ்)',
  mr: 'Marathi (मराठी)',
  gu: 'Gujarati (ગુજરાતી)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  pa: 'Punjabi (ਪੰਜਾਬੀ)',
  as: 'Assamese (অসমীয়া)',
  ur: 'Urdu (اردو)',
  sa: 'Sanskrit (संस्कृतम्)',
  mai: 'Maithili (मैथिली)',
  bho: 'Bhojpuri (भोजपुरी)',
  ks: 'Kashmiri (کٲشُر)',
  sd: 'Sindhi (سنڌي)',
  ne: 'Nepali (नेपाली)',
  kok: 'Konkani (कोंकणी)',
  mni: 'Manipuri (মৈতৈলোন্)',
  doi: 'Dogri (डोगरी)',
  sat: 'Santali (संताली / ᱥᱟᱱᱛᱟᱲᱤ)',
  brx: 'Bodo (बड़ो)',
};

// Database context builder for AI grounding
function buildSchemeKnowledgeBase(): string {
  return INITIAL_SCHEMES.map((s) => {
    return `
---
Scheme Name: ${s.name}
ID: ${s.id}
Type: ${s.type} (${s.level} Government - ${s.state})
Department: ${s.department}
Category: ${s.category}
Benefits: ${s.benefits.join('; ')}
Who Can Apply: ${s.whoCanApply}
Eligibility Criteria:
  - Age Range: ${s.eligibility.minAge ?? 'None'} to ${s.eligibility.maxAge ?? 'No limit'}
  - Gender: ${s.eligibility.gender ?? 'All'}
  - Income Limit: ${s.eligibility.incomeLimit ? '₹' + s.eligibility.incomeLimit.toLocaleString('en-IN') : 'None specified'} (${s.eligibility.incomeDescription ?? ''})
  - Education: ${s.eligibility.educationRequired ?? 'Open'}
  - Occupations: ${s.eligibility.occupation?.join(', ') ?? 'Any'}
  - Specific State: ${s.eligibility.residenceState ?? 'All India'}
  - Other: ${s.eligibility.otherCriteria?.join('; ') ?? 'None'}
Required Documents: ${s.documents.map((d) => d.name + (d.mandatory ? ' (Mandatory)' : ' (Conditional)')).join(', ')}
Application Deadline: ${s.deadline} (Status: ${s.status})
Official Website: ${s.officialWebsite}
Official Application Portal: ${s.hasVerifiedApplicationLink ? s.officialPortal : 'Official application link unavailable. Visit official department website.'}
Verified Date: ${s.verifiedDate}
Official Source: ${s.verifiedSource}
Application Steps:
${s.howToApplySteps.map((step, idx) => `  Step ${idx + 1}: ${step}`).join('\n')}
`;
  }).join('\n');
}

// Fallback rule-based search when Gemini API key is unavailable
function fallbackAnswer(message: string, language: string): string {
  const lower = (message || '').toLowerCase();

  // Scam alert
  if (detectScamQuery(message)) {
    return `🚨 **CRITICAL SCAM WARNING / सावधान / ସତର୍କତା**:
Do NOT share your OTP, UPI PIN, password, or banking credentials with anyone!
No legitimate Government of India scheme or scholarship charges an upfront fee or asks for OTPs over phone calls, WhatsApp, or Telegram.

Always apply directly through verified government portals ending in **.gov.in** or **.nic.in**. If someone approached you asking for money or OTP, immediately report them to the National Cyber Crime Portal at **cybercrime.gov.in** or call **1930**.`;
  }

  // Find matching scheme
  const matched = INITIAL_SCHEMES.filter(
    (s) =>
      (s.name && lower.includes(s.name.toLowerCase())) ||
      (s.category && lower.includes(s.category.toLowerCase())) ||
      (s.state && lower.includes(s.state.toLowerCase())) ||
      (lower.includes('scholarship') && s.type === 'scholarship') ||
      (lower.includes('farmer') && s.category === 'Agriculture') ||
      (lower.includes('health') && s.category === 'Healthcare') ||
      (lower.includes('women') && s.category === 'Women') ||
      (lower.includes('loan') && (s.category === 'Business' || s.category === 'Financial Assistance')) ||
      (lower.includes('house') && s.category === 'Housing')
  );

  if (matched.length > 0) {
    const top = matched.slice(0, 3);
    let output = `Here are verified government schemes from the SchemeSathi database matching your query:\n\n`;
    top.forEach((s) => {
      output += `### 🏛️ ${s.name} (${s.level} Govt - ${s.state})\n`;
      output += `* **Benefits:** ${s.benefitsHighlight}\n`;
      output += `* **Who Can Apply:** ${s.whoCanApply}\n`;
      output += `* **Application Deadline:** ${s.deadline} (Status: **${s.status}**)\n`;
      output += `* **Required Documents:** ${s.documents.map((d) => d.name).join(', ')}\n`;
      output += `* **Official Verified Portal:** [${s.officialWebsite}](${s.officialPortal})\n`;
      output += `* **Source:** ${s.verifiedSource} (Last Verified: ${s.verifiedDate})\n\n`;
    });
    output += `\n*Note: AI-generated guidance grounded in SchemeSathi verified database. Always verify final eligibility, deadlines and application requirements on the official government website.*`;
    return output;
  }

  return `I searched the SchemeSathi verified database, but could not find a specific scheme matching "${message}".

Try asking about:
- **Scholarships**: e.g., "Scholarships for college students" or "AICTE Pragati for girls"
- **Agriculture**: e.g., "PM Kisan" or "KALIA Odisha"
- **Healthcare**: e.g., "Ayushman Bharat PMJAY"
- **Business Loans**: e.g., "Mudra Loan" or "PM SVANidhi for street vendors"
- **State Schemes**: e.g., "Schemes in Karnataka", "Tamil Nadu", or "West Bengal"

Remember: SchemeSathi only provides verified information from official government sources (.gov.in and .nic.in).`;
}

// AI Assistant endpoint
app.post('/api/ai-assistant', async (req, res) => {
  const { message, language = 'en', history = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // First check for scam trigger
  if (detectScamQuery(message)) {
    const scamResponse = `🚨 **CRITICAL SECURITY WARNING / ସତର୍କ ସୂଚନା / सुरक्षा चेतावनी**:
Do NOT share your OTP, UPI PIN, password, Aadhaar OTP, or banking credentials with anyone!

Government of India departments and scholarship authorities:
1. NEVER call or WhatsApp asking for your OTP or bank password.
2. NEVER charge an "agent fee" or "processing commission" to sanction benefits.
3. NEVER disburse scholarships or subsidies through private Telegram groups or unofficial links.

Always verify and apply directly on official portals like **scholarships.gov.in**, **pmkisan.gov.in**, or your official state portal. Report fraudulent activity at the National Cyber Crime Helpline **1930** or **cybercrime.gov.in**.`;
    return res.json({ reply: scamResponse, isScamAlert: true, webSources: [] });
  }

  const ai = getGenAI();
  if (!ai) {
    // Fallback to grounded knowledge base matching
    const reply = fallbackAnswer(message, language);
    return res.json({ reply, source: 'grounded_database', webSources: [] });
  }

  try {
    const targetLanguageName = LANGUAGE_DISPLAY_NAMES[language] || language || 'English';
    const knowledge = buildSchemeKnowledgeBase();
    const systemPrompt = `You are "SchemeSathi AI" (स्कीमसाथी AI), an official, highly trustworthy personal government-scheme and scholarship assistant for Indian citizens.

Core Mission:
1. Help Indian citizens quickly discover relevant Government Schemes, Scholarships, Financial Assistance, Education Benefits, Healthcare, Agriculture, Housing, and MSME/Business loans.
2. Ground all facts in the verified SchemeSathi database provided below and live official Indian government web portals (.gov.in, .nic.in).
3. Use Google Search grounding to verify up-to-date application deadlines, eligibility criteria, and authentic official portal links.
4. NEVER fabricate schemes, eligibility rules, deadlines, or URLs. If information is not verified from an official source, explicitly state: "I couldn't verify this information from an official source. Please visit the respective department website."
5. If the user mentions OTPs, UPI PINs, registration fee, or third-party agents, immediately issue a strong anti-scam warning.
6. Provide clear, simple, accessible step-by-step explanations. Translate bureaucratic jargon into conversational language.
7. When referencing schemes, clearly provide:
   - Scheme Name & Department
   - Benefits
   - Key Eligibility Criteria
   - Required Documents checklist
   - Application Deadline & Status (Open / Closing Soon / Closed)
   - Official Application Link (MUST be verified .gov.in or .nic.in domain)
8. Respond strictly and fluently in the user's requested language: ${targetLanguageName}. Render your entire response in the authentic native script with culturally natural, polite, respectful, and accessible civic phrasing.
9. Always append the official disclaimer:
   "AI-generated guidance grounded in official government data. Always verify final eligibility on the official portal."

--- VERIFIED SCHEMES DATABASE ---
${knowledge}
--- END DATABASE ---`;

    // Multi-turn chat conversation history formatted for @google/genai
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const item of history.slice(-10)) {
        if (item && item.text) {
          contents.push({
            role: item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: String(item.text) }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [
        {
          text: `${message}\n\n(Please reply strictly in language: ${targetLanguageName} using its authentic native script. Ground your response in the verified database and official government sources (.gov.in / .nic.in).)`,
        },
      ],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        tools: [{ googleSearch: {} }],
        temperature: 0.25,
      },
    });

    const replyText = response.text || fallbackAnswer(message, language);

    // Extract search grounding metadata if available
    const grounding = response.candidates?.[0]?.groundingMetadata;
    const webSources: Array<{ title: string; url: string }> = [];
    if (grounding?.groundingChunks) {
      for (const chunk of grounding.groundingChunks) {
        if (chunk.web?.uri) {
          webSources.push({
            title: chunk.web.title || new URL(chunk.web.uri).hostname,
            url: chunk.web.uri,
          });
        }
      }
    }

    return res.json({
      reply: replyText,
      source: 'gemini_grounded_search',
      webSources: webSources.slice(0, 4),
    });
  } catch (error: any) {
    console.error('Gemini API Error with Search Grounding:', error?.message || error);
    // Fallback if model or search call has an issue
    const reply = fallbackAnswer(message, language);
    return res.json({ reply, source: 'grounded_database_fallback', webSources: [] });
  }
});

// Explain Eligibility Endpoint
app.post('/api/explain-eligibility', async (req, res) => {
  const { schemeId, language = 'en' } = req.body;
  const scheme = INITIAL_SCHEMES.find((s) => s.id === schemeId);

  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found' });
  }

  const ai = getGenAI();
  if (!ai) {
    // Return structured breakdown
    return res.json({
      simplifiedText: `Here is the simplified eligibility for **${scheme.name}**:
- **Target Audience:** ${scheme.whoCanApply}
- **Age Requirement:** ${scheme.eligibility.minAge ? `Minimum ${scheme.eligibility.minAge} years` : ''} ${scheme.eligibility.maxAge ? `up to ${scheme.eligibility.maxAge} years` : 'No upper age limit'}.
- **Income Limit:** ${scheme.eligibility.incomeLimit ? `Family yearly income must be below ₹${scheme.eligibility.incomeLimit.toLocaleString('en-IN')}` : 'No specific income cap'}.
- **Residence:** ${scheme.eligibility.residenceState === 'All India' ? 'All Indian citizens' : `Permanent residents of ${scheme.eligibility.residenceState}`}.
- **Other Conditions:** ${scheme.eligibility.otherCriteria?.join(', ') || 'Standard government norms apply'}.

Always confirm your eligibility by reading the latest official notification on [${scheme.officialWebsite}](${scheme.officialPortal}).`,
    });
  }

  try {
    const prompt = `Translate and explain the official eligibility requirements for the scheme "${scheme.name}" in simple, plain, friendly language for an ordinary citizen:
Official Criteria:
- Who can apply: ${scheme.whoCanApply}
- Age: ${scheme.eligibility.minAge ?? 'None'} to ${scheme.eligibility.maxAge ?? 'No upper limit'}
- Income: ${scheme.eligibility.incomeLimit ? '₹' + scheme.eligibility.incomeLimit : 'None'} (${scheme.eligibility.incomeDescription ?? ''})
- Education: ${scheme.eligibility.educationRequired ?? 'None'}
- Occupation: ${scheme.eligibility.occupation?.join(', ') ?? 'Any'}
- Category: ${scheme.eligibility.casteCategory?.join(', ') ?? 'All'}
- Other criteria: ${scheme.eligibility.otherCriteria?.join('; ') ?? 'None'}

Please respond in language code: ${language}. Keep it to 3-4 clear bullet points and end with a reminder to check the official government portal.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
      },
    });

    res.json({ simplifiedText: response.text });
  } catch (err: any) {
    res.json({
      simplifiedText: `Eligibility Summary for **${scheme.name}**:
- Target Group: ${scheme.whoCanApply}
- Income Condition: ${scheme.eligibility.incomeDescription || 'Check official guidelines'}
- Mandatory Documents: ${scheme.documents.filter((d) => d.mandatory).map((d) => d.name).join(', ')}.`,
    });
  }
});

// Vite Middleware for Dev and Static for Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SchemeSathi Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
