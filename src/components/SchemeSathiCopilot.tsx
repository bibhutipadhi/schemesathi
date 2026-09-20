import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Bot, FileText, Globe, Languages, Mic, MicOff, Send, ShieldCheck, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { TRANSLATIONS } from '../data/translations';
import { generateClientSideAssistantReply } from '../data/assistantFallback';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isScamAlert?: boolean;
  webSources?: Array<{ title: string; url: string }>;
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

interface SchemeSathiCopilotProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  initialPrompt?: string;
}

const MODES = [
  ['Find schemes', 'Find verified schemes for my situation.'],
  ['Eligibility', 'Check my eligibility and explain any conditions simply.'],
  ['Documents', 'List every document I need and how to obtain missing ones.'],
  ['Apply', 'Guide me through the official application step by step.'],
  ['Safety', 'Check this message or situation for a government-scheme scam.'],
] as const;

const LANGUAGE_CODES: Partial<Record<LanguageCode, string>> = {
  en: 'en-IN', hi: 'hi-IN', or: 'or-IN', bn: 'bn-IN', te: 'te-IN', ta: 'ta-IN',
  mr: 'mr-IN', gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', as: 'as-IN',
  ur: 'ur-IN', ne: 'ne-NP', sa: 'sa-IN',
};

const timeLabel = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const SchemeSathiCopilot: React.FC<SchemeSathiCopilotProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  initialPrompt,
}) => {
  const [language, setLanguage] = useState(currentLanguage);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [autoRead, setAutoRead] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => setLanguage(currentLanguage), [currentLanguage]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'copilot-welcome',
        sender: 'assistant',
        text: 'Namaste. I am your SchemeSathi Copilot. I can find verified schemes, check eligibility, prepare documents, guide applications, detect scams, and speak answers aloud.',
        timestamp: timeLabel(),
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (initialPrompt && isOpen) setInput(initialPrompt);
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => () => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();
  }, []);

  const speechLanguage = LANGUAGE_CODES[language] || 'en-IN';

  const speak = (message: Message) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === message.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message.text.replace(/[*#_]/g, ''));
    utterance.lang = speechLanguage;
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(message.id);
    window.speechSynthesis.speak(utterance);
  };

  const send = async (value = input) => {
    const text = value.trim();
    if (!text || loading) return;
    const userMessage: Message = { id: `user-${Date.now()}`, sender: 'user', text, timestamp: timeLabel() };
    setMessages((previous) => [...previous, userMessage]);
    setInput('');
    setLoading(true);

    let data: any;
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          history: messages.slice(-10).map((message) => ({ role: message.sender, text: message.text })),
        }),
      });
      if (response.ok) data = await response.json();
    } catch {
      data = null;
    }
    data = data?.reply ? data : generateClientSideAssistantReply(text, language);

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      sender: 'assistant',
      text: data.reply,
      isScamAlert: Boolean(data.isScamAlert),
      webSources: data.webSources || [],
      timestamp: timeLabel(),
    };
    setMessages((previous) => [...previous, assistantMessage]);
    setLoading(false);
    if (autoRead) speak(assistantMessage);
  };

  const toggleListening = () => {
    const speechWindow = window as SpeechRecognitionWindow;
    const Recognition = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceError('Voice input is not available in this browser.');
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    setVoiceError('');
    const recognition = new Recognition();
    recognition.lang = speechLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim();
      if (transcript) send(transcript);
    };
    recognition.onend = () => { recognitionRef.current = null; setListening(false); };
    recognition.onerror = () => {
      recognitionRef.current = null;
      setListening(false);
      setVoiceError('Microphone access failed. Allow microphone access or type your question.');
    };
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/70 backdrop-blur-sm">
      <section className="flex h-full w-full max-w-xl flex-col border-l border-stone-200 bg-stone-50 shadow-2xl" aria-label="SchemeSathi Copilot">
        <header className="flex items-center justify-between bg-stone-950 px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-stone-950"><Bot className="h-5 w-5" /></div>
            <div>
              <div className="flex items-center gap-2"><h2 className="font-serif text-lg font-bold">SchemeSathi Copilot</h2><span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">VERIFIED</span></div>
              <p className="text-[11px] text-stone-400">Grounded government-scheme guidance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-amber-400" />
            <select aria-label="Copilot language" value={language} onChange={(event) => setLanguage(event.target.value as LanguageCode)} className="max-w-28 bg-transparent text-xs text-stone-200 outline-hidden">
              {SUPPORTED_LANGUAGES.map((item) => <option className="bg-stone-900" key={item.code} value={item.code}>{item.nativeName}</option>)}
            </select>
            <button type="button" onClick={onClose} aria-label="Close SchemeSathi Copilot" className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white"><X className="h-5 w-5" /></button>
          </div>
        </header>

        <div className="border-b border-stone-200 bg-white px-4 py-3">
          <div className="mb-2 flex items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Choose an assistant mode</span><label className="flex items-center gap-1.5 text-[10px] text-stone-600"><input type="checkbox" checked={autoRead} onChange={(event) => setAutoRead(event.target.checked)} /> Auto-read replies</label></div>
          <div className="flex gap-1.5 overflow-x-auto pb-0.5">
            {MODES.map(([label, prompt]) => <button key={label} type="button" onClick={() => setInput(`${prompt} `)} className="shrink-0 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-[10px] font-semibold text-stone-700 hover:border-amber-300 hover:bg-amber-50">{label}</button>)}
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-[11px] text-amber-950"><ShieldCheck className="h-4 w-4 shrink-0 text-amber-700" /><span>Never share OTPs, UPI PINs, passwords, or pay unofficial fees.</span></div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message) => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <article className={`max-w-[90%] rounded-2xl border p-3.5 text-xs leading-relaxed shadow-sm ${message.sender === 'user' ? 'border-amber-700 bg-amber-600 text-white' : message.isScamAlert ? 'border-red-300 bg-red-50 text-red-950' : 'border-stone-200 bg-white text-stone-900'}`}>
              {message.isScamAlert && <div className="mb-2 flex items-center gap-1.5 border-b border-red-200 pb-1.5 font-bold text-red-700"><AlertTriangle className="h-4 w-4" /> ANTI-FRAUD ALERT</div>}
              <div className="whitespace-pre-line">{message.text}</div>
              {message.sender === 'assistant' && 'speechSynthesis' in window && <button type="button" onClick={() => speak(message)} aria-label={speakingId === message.id ? 'Stop reading reply' : 'Read reply aloud'} className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-[10px] font-bold text-stone-700 hover:bg-amber-50">{speakingId === message.id ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}{speakingId === message.id ? 'Stop' : 'Listen'}</button>}
              {message.webSources && message.webSources.length > 0 && <div className="mt-3 border-t border-stone-200 pt-2"><div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase text-amber-700"><Globe className="h-3 w-3" /> Verified sources</div>{message.webSources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="block truncate text-[10px] text-emerald-700 hover:underline">{source.title}</a>)}</div>}
              <div className="mt-2 text-right text-[10px] opacity-60">{message.timestamp}</div>
            </article>
          </div>)}
          {loading && <div className="flex items-center gap-2 text-xs text-stone-500"><Sparkles className="h-4 w-4 animate-spin text-amber-600" /> Checking verified sources...</div>}
          <div ref={endRef} />
        </div>

        <div className="border-t border-stone-200 bg-white p-3">
          <div className="mb-2 flex gap-1.5 overflow-x-auto whitespace-nowrap">
            {['PM-KISAN eligibility', 'Scholarship documents', 'Ayushman Bharat', 'Is this a scam?'].map((prompt) => <button key={prompt} type="button" onClick={() => setInput(`${prompt} `)} className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-[10px] text-stone-700 hover:bg-amber-50">{prompt}</button>)}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); send(); }} className="flex items-center gap-2">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={t.assistant.placeholder} className="min-w-0 flex-1 rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 outline-hidden focus:ring-2 focus:ring-amber-500" />
            <button type="button" onClick={toggleListening} disabled={loading} aria-label={listening ? 'Stop voice input' : 'Start voice input'} className={`rounded-xl border p-2.5 ${listening ? 'animate-pulse border-red-300 bg-red-100 text-red-700' : 'border-stone-300 bg-stone-50 text-stone-700 hover:bg-amber-50'}`}>{listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}</button>
            <button type="submit" disabled={loading || !input.trim()} className="rounded-xl bg-amber-600 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-amber-700 disabled:opacity-50"><Send className="h-4 w-4" /></button>
          </form>
          {listening && <p className="mt-1.5 text-[10px] font-semibold text-red-700">Listening... speak now.</p>}
          {voiceError && <p className="mt-1.5 text-[10px] text-amber-800">{voiceError}</p>}
        </div>
      </section>
    </div>
  );
};
