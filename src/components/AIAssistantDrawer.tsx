import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  AlertTriangle, 
  Globe, 
  ExternalLink,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  RotateCcw,
  ShieldAlert,
  FileText,
  Languages
} from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, TOP_LANGUAGE_OBJECTS } from '../data/languages';
import { TRANSLATIONS } from '../data/translations';
import { generateClientSideAssistantReply } from '../data/assistantFallback';

interface WebSource {
  title: string;
  url: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isScamAlert?: boolean;
  source?: string;
  webSources?: WebSource[];
  timestamp: string;
}

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionWindow extends Window {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
}

type AssistantMode = 'discover' | 'eligibility' | 'documents' | 'application' | 'safety';

const ASSISTANT_MODES: Array<{ id: AssistantMode; label: string; prompt: string; icon: React.ReactNode }> = [
  { id: 'discover', label: 'Find schemes', prompt: 'Find the best verified government schemes for me.', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'eligibility', label: 'Check eligibility', prompt: 'Explain eligibility in simple language and tell me what may disqualify me.', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
  { id: 'documents', label: 'Prepare documents', prompt: 'Give me a complete document checklist and explain how to obtain missing documents.', icon: <FileText className="w-3.5 h-3.5" /> },
  { id: 'application', label: 'Apply step by step', prompt: 'Guide me through the official application process step by step.', icon: <Send className="w-3.5 h-3.5" /> },
  { id: 'safety', label: 'Check for scams', prompt: 'Check this situation for fraud and tell me how to stay safe.', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
];

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  initialPrompt?: string;
}

function getWelcomeMessage(lang: LanguageCode): string {
  switch (lang) {
    case 'hi':
      return `नमस्ते! मैं **स्कीमसाथी AI** हूँ, भारत सरकार की आधिकारिक योजनाओं और छात्रवृत्तियों के लिए आपका डिजिटल साथी।

आप मुझसे कुछ भी पूछ सकते हैं:
- **पात्रता**: "पीएम-किसान या आयुष्मान भारत के लिए कौन पात्र है?"
- **दस्तावेज**: "कॉलेज छात्रवृत्ति के लिए क्या प्रमाणपत्र चाहिए?"
- **आवेदन नियम**: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) पर पंजीकरण कैसे करें?"
- **सुरक्षा जांच**: "लोन के नाम पर किसी ने फोन करके OTP मांगा—क्या यह सच है?"

मैं आज आपकी क्या सहायता कर सकता हूँ?`;
    case 'or':
      return `ନମସ୍କାର! ମୁଁ **ସ୍କିମ୍‌ସାଥୀ AI**, ଭାରତ ସରକାର ଓ ରାଜ୍ୟ ସରକାରଙ୍କ ସମସ୍ତ ଯୋଜନା ଏବଂ ଛାତ୍ରବୃତ୍ତି ପାଇଁ ଆପଣଙ୍କ ସାଥୀ।

ଆପଣ ମୋତେ ପଚାରିପାରିବେ:
- **ଯୋଗ୍ୟତା**: "PM-କିଷାନ ବା ଆୟୁଷ୍ମାନ ଭାରତ ପାଇଁ କିଏ ଯୋଗ୍ୟ?"
- **ପ୍ରମାଣପତ୍ର**: "କଲେଜ ସ୍କଲାରସିପ୍ ପାଇଁ କେଉଁ କାଗଜପତ୍ର ଦରକାର?"
- **ଆବେଦନ ନିୟମ**: "ଜାତୀୟ ଛାତ୍ରବୃତ୍ତି ପୋର୍ଟାଲରେ କିପରି ପଞ୍ଜୀକରଣ କରିବେ?"
- **ସୁରକ୍ଷା**: "କୌଣସି ବ୍ୟକ୍ତି OTP ମାଗୁଛନ୍ତି—ଏହା ସତ କି?"

ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?`;
    case 'bn':
      return `নমস্কার! আমি **স্কিমসাথী AI**, ভারত সরকারের সমস্ত প্রকল্প ও স্কলারশিপের বিশ্বস্ত সহকারী।

আপনি আমাকে যে কোনো প্রশ্ন করতে পারেন:
- **যোগ্যতা**: "পিএম-কিসান বা আয়ুষ্মান ভারতের জন্য কে যোগ্য?"
- **নথিপত্র**: "কলেজ স্কলারশিপের জন্য কী কী সার্টিফিকেট লাগবে?"
- **নিরাপত্তা সতর্কতা**: "লোনের জন্য কেউ ফোন করে ওটিপি চাইলে কী করবেন?"

আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?`;
    case 'te':
      return `నమస్కారం! నేను **స్కీమ్‌సాథీ AI**, ప్రభుత్వ సంక్షేమ పథకాలు మరియు స్కాలర్‌షిప్‌ల కోసం మీ వ్యక్తిగత సహాయకుడిని.

మీరు నన్ను అడగవచ్చు:
- **అర్హతలు**: "పీఎం కిసాన్ లేదా ఆయుష్మాన్ భారత్‌కు ఎవరు అర్హులు?"
- **ధ్రువపత్రాలు**: "కాలేజీ స్కాలర్‌షిప్‌లకు ఏ పత్రాలు అవసరం?"
- **భద్రతా సూచనలు**: "ఫోన్ చేసి ఓటీపీ అడిగితే ఇవ్వవచ్చా?"

నేడు మీకు ఎలా సహాయపడగలను?`;
    case 'ta':
      return `வணக்கம்! நான் **ஸ்கீம்சாதி AI**, மத்திய மற்றும் மாநில அரசு நலத்திட்டங்களுக்கான உங்கள் வழிகாட்டி.

நீங்கள் என்னிடம் கேட்கலாம்:
- **தகுதிகள்**: "பிஎம் கிசான் அல்லது ஆயுஷ்மான் பாரத் யாருக்கு பொருந்தும்?"
- **சான்றிதழ்கள்**: "கல்வி உதவித்தொகைக்கு தேவையான ஆவணங்கள் என்ன?"
- **பாதுகாப்பு**: "கடன் தருவதாக கூறி OTP கேட்டால் என்ன செய்வது?"

இன்று உங்களுக்கு நான் எவ்வாறு உதவ முடியும்?`;
    case 'mr':
      return `नमस्कार! मी **स्कीमसाथी AI**, शासकीय योजना आणि शिष्यवृत्तीसाठी तुमचा अधिकृत सहाय्यक आहे.

तुम्ही मला विचारू शकता:
- **पात्रता**: "PM-किसान किंवा आयुष्मान भारतसाठी कोण पात्र आहे?"
- **कागदपत्रे**: "शिष्यवृत्तीसाठी कोणती कागदपत्रे लागतात?"
- **सुरक्षा**: "कर्जासाठी कोणाचा OTP मागणारा फोन आला तर काय करावे?"

मी आज आपली काय मदत करू शकतो?`;
    default:
      return `Namaste! I am **SchemeSathi AI**, your personal guide to verified Indian Government Schemes and Scholarships.

You can ask me anything about:
- **Eligibility**: "Who qualifies for PM-Kisan or Ayushman Bharat?"
- **Documents**: "What certificates do I need for college scholarships?"
- **Application Guide**: "How to register on National Scholarship Portal?"
- **Safety Checks**: "Someone called asking for OTP to sanction my loan—is this real?"

How may I assist you today?`;
  }
}

function getQuickPrompts(lang: LanguageCode): string[] {
  switch (lang) {
    case 'hi':
      return [
        'प्रगति छात्रवृत्ति के लिए क्या दस्तावेज चाहिए?',
        'पीएम-किसान ₹6,000 के लिए कौन पात्र है?',
        'आयुष्मान भारत में ₹5 लाख मुफ्त इलाज कैसे मिलेगा?',
        'मुझसे छात्रवृत्ति के लिए OTP मांगा गया, क्या यह सुरक्षित है?',
        'पीएम सूर्य घर योजना में कितनी सोलर सब्सिडी मिलती है?',
      ];
    case 'or':
      return [
        'PM-କିଷାନ ₹୬,୦୦୦ ପାଇଁ କିଏ ଯୋଗ୍ୟ?',
        'ଆୟୁଷ୍ମାନ ଭାରତରେ ମାଗଣା ଚିକିତ୍ସା କିପରି ମିଳିବ?',
        'ପିଏମ୍ ସୂର୍ଯ୍ୟ ଘର ସୌର ସବସିଡି କେତେ?',
        'ଛାତ୍ରବୃତ୍ତି ପାଇଁ OTP ମାଗିବା ସତ କି?',
        'ପିଏମ୍ ସ୍ୱନିଧି ଋଣ ପାଇଁ କିପରି ଆବେଦନ କରିବେ?',
      ];
    case 'bn':
      return [
        'পিএম-কিসান বার্ষিক সুবিধার জন্য কারা যোগ্য?',
        'আয়ুষ্মান ভারতে ৫ লাখ টাকা পর্যন্ত বিনামূল্যে চিকিৎসা কীভাবে পাবেন?',
        'স্কলারশিপের জন্য ওটিপি চাওয়া হলে কী করবেন?',
        'পিএম সূর্য ঘর সোলার ভর্তুকি কতটা মেলে?',
        'ছোট ব্যবসায়ীদের জন্য পিএম স্বনিধি ঋণ কীভাবে পাবেন?',
      ];
    case 'te':
      return [
        'పీఎం కిసాన్ ₹6,000 ప్రయోజనానికి ఎవరు అర్హులు?',
        'ఆయుష్మాన్ భారత్ ఉచిత వైద్య సదుపాయం ఎలా పొందాలి?',
        'స్కాలర్‌షిప్ కోసం ఓటీపీ అడిగితే ఏమి చేయాలి?',
        'పీఎం సూర్య ఘర్ రూఫ్‌టాప్ సోలార్ సబ్సిడీ ఎంత?',
        'స్ట్రీట్ వెండర్ల కోసం పీఎం స్వనిధి పథకం వివరాలు?',
      ];
    case 'ta':
      return [
        'பிஎம் கிசான் ₹6,000 உதவித்தொகை தகுதிகள் என்ன?',
        'ஆயுஷ்மான் பாரத் இலவச மருத்துவ காப்பீடு பெறுவது எப்படி?',
        'உதவித்தொகைக்கு OTP கேட்பது பாதுகாப்பானதா?',
        'பிஎம் சூர்ய கர் சோலார் மானியம் எவ்வளவு?',
        'சிறு வணிகர்களுக்கான பிஎம் ஸ்வநிதி திட்டம் என்ன?',
      ];
    case 'mr':
      return [
        'PM-किसान योजनेसाठी कोण पात्र आहे?',
        'आयुष्मान भारत मोफत उपचारांची सुविधा कशी मिळते?',
        'पीएम सूर्य घर मोफत वीज योजनेचे अनुदान किती आहे?',
        'शिष्यवृत्तीसाठी OTP मागणे सुरक्षित आहे का?',
        'फेरीवाल्यांसाठी पीएम स्वनिधी कर्ज योजना काय आहे?',
      ];
    default:
      return [
        'What documents do I need for Pragati Scholarship?',
        'Who is eligible for PM-Kisan ₹6,000 yearly benefit?',
        'How can I get free treatment under Ayushman Bharat?',
        'I was asked for an OTP to receive scholarship funds. Is this safe?',
        'How much solar subsidy is available under PM Surya Ghar?',
      ];
  }
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  initialPrompt,
}) => {
  const [aiLanguage, setAiLanguage] = useState<LanguageCode>(currentLanguage);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome_init',
      sender: 'assistant',
      text: getWelcomeMessage(currentLanguage),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [assistantMode, setAssistantMode] = useState<AssistantMode>('discover');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

  const getSpeechLanguage = (language: LanguageCode) => {
    const languageMap: Partial<Record<LanguageCode, string>> = {
      en: 'en-IN', hi: 'hi-IN', or: 'or-IN', bn: 'bn-IN', te: 'te-IN',
      ta: 'ta-IN', mr: 'mr-IN', gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN',
      pa: 'pa-IN', as: 'as-IN', ur: 'ur-IN', ne: 'ne-NP', sa: 'sa-IN',
    };
    return languageMap[language] || 'en-IN';
  };

  const handleSpeakMessage = (message: Message) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingMessageId === message.id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message.text.replace(/[*#_]/g, ''));
    utterance.lang = getSpeechLanguage(aiLanguage);
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    setSpeakingMessageId(message.id);
    window.speechSynthesis.speak(utterance);
  };

  const t = TRANSLATIONS[aiLanguage] || TRANSLATIONS.en;

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle passed initial prompt
  useEffect(() => {
    if (initialPrompt && isOpen) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  // Sync language with main app if changed
  useEffect(() => {
    setAiLanguage(currentLanguage);
  }, [currentLanguage]);

  // When AI language changes, update welcome if only initial message is present
  const handleLanguageChange = (newLang: LanguageCode) => {
    setAiLanguage(newLang);
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: 'welcome_' + newLang,
            sender: 'assistant',
            text: getWelcomeMessage(newLang),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  };

  const quickPrompts = getQuickPrompts(aiLanguage);

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let data: any = null;
      try {
        const conversationHistory = messages
          .filter((m) => !m.id.startsWith('welcome_'))
          .map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            text: m.text,
          }));

        const res = await fetch('/api/ai-assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            language: aiLanguage,
            history: conversationHistory,
          }),
        });
        if (res.ok) {
          data = await res.json();
        }
      } catch (networkErr) {
        // Network or static deployment without /api/ai-assistant
      }

      if (!data || !data.reply) {
        // Client-side grounded fallback (works offline and on Netlify Drop)
        data = generateClientSideAssistantReply(text, aiLanguage);
      }

      const assistantMsg: Message = {
        id: 'assistant_' + Date.now(),
        sender: 'assistant',
        text: data.reply || "I couldn't verify this information from an official source.",
        isScamAlert: data.isScamAlert || false,
        source: data.source,
        webSources: data.webSources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (autoSpeak) handleSpeakMessage(assistantMsg);
    } catch (err) {
      const fallback = generateClientSideAssistantReply(text, aiLanguage);
      setMessages((prev) => [
        ...prev,
        {
          id: 'assistant_err_' + Date.now(),
          sender: 'assistant',
          text: fallback.reply,
          isScamAlert: fallback.isScamAlert,
          source: fallback.source,
          webSources: [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const speechWindow = window as SpeechRecognitionWindow;
    const SpeechRecognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError('Voice input is not supported in this browser. You can type your question instead.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    setVoiceError(null);
    const recognition = new SpeechRecognition();
    recognition.lang = getSpeechLanguage(aiLanguage);
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) {
        setInputMessage(transcript);
        sendMessage(transcript);
      }
    };
    recognition.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
    };
    recognition.onerror = () => {
      recognitionRef.current = null;
      setIsListening(false);
      setVoiceError('Microphone access was unavailable. Please allow microphone access or type your question.');
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  const handleResetChat = () => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();
    setIsListening(false);
    setSpeakingMessageId(null);
    setMessages([
      {
        id: 'welcome_' + aiLanguage + '_' + Date.now(),
        sender: 'assistant',
        text: getWelcomeMessage(aiLanguage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleModeSelect = (mode: AssistantMode) => {
    setAssistantMode(mode);
    const selectedMode = ASSISTANT_MODES.find((item) => item.id === mode);
    if (selectedMode) setInputMessage(`${selectedMode.prompt} `);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl border-l border-stone-200 animate-in slide-in-from-right duration-300">
        {/* Assistant Header */}
        <div className="p-4 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-amber-500 to-amber-600 p-0.5 flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold font-serif leading-none">SchemeSathi AI</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-stone-300 mt-0.5">
                    Advanced verified guidance, voice input, and scam protection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* AI Language Selector */}
            <div className="flex items-center bg-stone-800 rounded-lg px-2 py-1 border border-stone-700">
              <Languages className="w-3.5 h-3.5 text-amber-400 mr-1 shrink-0" />
              <select
                value={aiLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as LanguageCode)}
                className="bg-transparent text-stone-200 text-xs focus:outline-hidden cursor-pointer"
                title="AI Response Language (22 Eighth Schedule Languages)"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-stone-900 text-white">
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleResetChat}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Restart Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Language Switcher Bar */}
        <div className="bg-stone-850 px-3 py-1.5 border-b border-stone-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
          <span className="text-stone-400 shrink-0 font-medium">Quick Language:</span>
          {TOP_LANGUAGE_OBJECTS.slice(0, 7).map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => handleLanguageChange(l.code)}
              className={`px-2 py-0.5 rounded-full transition-all shrink-0 cursor-pointer ${
                aiLanguage === l.code
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:text-white'
              }`}
            >
              {l.nativeName}
            </button>
          ))}
        </div>

        {/* Security Warning Notice */}
        <div className="bg-amber-50 border-b border-amber-200 px-3.5 py-2 flex items-center gap-2 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span className="text-[11px] leading-tight">
            Never share your OTP, UPI PIN, or bank password. Government schemes are 100% free.
          </span>
        </div>

        {/* Advanced assistant modes */}
        <div className="px-3 py-2 border-b border-stone-200 bg-white">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">What do you need?</span>
            <label className="inline-flex items-center gap-1.5 text-[10px] text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSpeak}
                onChange={(e) => setAutoSpeak(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              Auto-read answers
            </label>
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {ASSISTANT_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleModeSelect(mode.id)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  assistantMode === mode.id
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {mode.icon}
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white rounded-br-xs'
                    : msg.isScamAlert
                    ? 'bg-red-50 text-red-950 border border-red-300 rounded-bl-xs'
                    : 'bg-white text-stone-900 border border-stone-200 rounded-bl-xs'
                }`}
              >
                {/* Scam Banner inside message if triggered */}
                {msg.isScamAlert && (
                  <div className="flex items-center gap-1.5 text-red-700 font-bold text-xs mb-2 pb-1.5 border-b border-red-200">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>ANTI-FRAUD ALERT</span>
                  </div>
                )}

                <div className="whitespace-pre-line prose-sm">{msg.text}</div>

                {msg.sender === 'assistant' && 'speechSynthesis' in window && (
                  <button
                    type="button"
                    onClick={() => handleSpeakMessage(msg)}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-[10px] font-semibold text-stone-700 hover:bg-amber-50 hover:text-amber-800 cursor-pointer"
                    title={speakingMessageId === msg.id ? 'Stop reading aloud' : 'Read this answer aloud'}
                    aria-label={speakingMessageId === msg.id ? 'Stop reading aloud' : 'Read this answer aloud'}
                  >
                    {speakingMessageId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{speakingMessageId === msg.id ? 'Stop' : 'Listen'}</span>
                  </button>
                )}

                {/* Verified Web Sources from Google Search Grounding */}
                {msg.webSources && msg.webSources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-stone-200 dark:border-stone-700">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1.5">
                      <Globe className="w-3 h-3 text-amber-600" />
                      <span>Verified Live Sources (Google Search):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.webSources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] bg-stone-100 hover:bg-amber-50 text-stone-700 hover:text-amber-800 px-2 py-0.5 rounded-md border border-stone-200 transition-colors"
                        >
                          <span className="truncate max-w-47.5">{src.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-2 text-[10px] text-right opacity-60">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-stone-500 bg-white p-3 rounded-2xl border border-stone-200 max-w-[80%]">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>Verifying with live official portals & Google Search...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pill Container */}
        <div className="px-4 py-2 border-t border-stone-200 bg-white">
          <p className="text-[10px] text-stone-600 font-semibold uppercase tracking-wider mb-1.5">
            Suggested questions:
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                className="text-[11px] bg-stone-100 hover:bg-stone-200 text-stone-800 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0 border border-stone-200"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-stone-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if ((e.nativeEvent as any)?.isComposing) return;
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder={t.assistant.placeholder}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if ((e.nativeEvent as any).isComposing) {
                    return;
                  }
                }
              }}
              className="flex-1 px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-600 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              disabled={isLoading}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer disabled:opacity-50 ${
                isListening
                  ? 'bg-red-100 border-red-300 text-red-700 animate-pulse'
                  : 'bg-stone-50 border-stone-300 text-stone-700 hover:bg-amber-50 hover:text-amber-800'
              }`}
              title={isListening ? 'Stop listening' : 'Ask SchemeSathi using your voice'}
              aria-label={isListening ? 'Stop listening' : 'Ask SchemeSathi using your voice'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t.assistant.send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          {isListening && (
            <p className="mt-1.5 text-[10px] font-medium text-red-700">Listening... speak your question now.</p>
          )}
          {voiceError && (
            <p className="mt-1.5 text-[10px] text-amber-800">{voiceError}</p>
          )}
        </div>
      </div>
    </div>
  );
};
