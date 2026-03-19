'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiPost } from '@/lib/api';

interface TranslateResponse {
  translation: string;
  from: string;
  to: string;
  input_length: number;
  output_length: number;
  duration_ms: number;
}

const LANGUAGES = [
  { code: 'auto', label: 'Auto-Detect' },
  { code: 'en', label: 'English' },
  { code: 'no', label: 'Norwegian' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'nl', label: 'Dutch' },
  { code: 'sv', label: 'Swedish' },
  { code: 'da', label: 'Danish' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'zh', label: 'Chinese' },
  { code: 'ar', label: 'Arabic' },
  { code: 'ru', label: 'Russian' },
];

export default function TranslatorDemo() {
  const [text, setText] = useState('');
  const [fromLang, setFromLang] = useState('auto');
  const [toLang, setToLang] = useState('no');
  const [result, setResult] = useState<TranslateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleTranslate() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await apiPost<TranslateResponse>('/ai/translate', {
        text,
        from: fromLang,
        to: toLang,
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
    } finally {
      setLoading(false);
    }
  }

  function handleSwap() {
    if (fromLang === 'auto' || !result) return;
    const oldFrom = fromLang;
    setFromLang(toLang);
    setToLang(oldFrom);
    setText(result.translation);
    setResult(null);
  }

  return (
    <div className="showcase-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-4">
        <Link href="/demo" className="text-sm text-gray-500 hover:text-teal transition-colors">
          &larr; All Demos
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 pb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            Live AI Demo
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">AI Translator</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Translate text between 15+ languages instantly. AI preserves tone,
            context, and formatting — not just word-for-word substitution.
          </p>
        </div>

        {/* Language selectors */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">From</label>
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 text-gray-200 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/50"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Swap button */}
          <button
            onClick={handleSwap}
            disabled={fromLang === 'auto'}
            className="mt-5 p-2.5 rounded-lg bg-slate-800 text-gray-400 hover:text-teal hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Swap languages"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>

          <div className="flex-1">
            <label className="text-xs text-gray-500 block mb-1">To</label>
            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 text-gray-200 text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal/50"
            >
              {LANGUAGES.filter((l) => l.code !== 'auto').map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Text areas side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300">Original Text</label>
              <span className="text-xs text-gray-500">{text.length} / 5,000</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste text to translate..."
              rows={10}
              className="w-full bg-slate-900/80 border border-slate-800 text-gray-200 text-sm rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal/50 placeholder-gray-600"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300">Translation</label>
              {result && (
                <button
                  onClick={() => navigator.clipboard.writeText(result.translation)}
                  className="text-xs text-teal hover:text-white transition-colors"
                >
                  Copy
                </button>
              )}
            </div>
            <div className={`bg-slate-900/80 border rounded-xl px-5 py-4 min-h-[262px] ${result ? 'border-teal/30 glow-teal' : 'border-slate-800'}`}>
              {error && <p className="text-red-400 text-sm">{error}</p>}

              {!result && !error && !loading && (
                <p className="text-gray-600 text-sm italic">Translation will appear here...</p>
              )}

              {loading && (
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm">Translating...</span>
                </div>
              )}

              {result && (
                <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {result.translation}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Translate button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleTranslate}
            disabled={!text.trim() || loading}
            className="btn-teal px-12 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Translating...
              </span>
            ) : (
              'Translate'
            )}
          </button>
        </div>

        {/* Stats */}
        {result && (
          <div className="flex justify-center gap-4">
            {result.from && result.from !== 'auto-detected' && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-center">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Detected</p>
                <p className="text-sm text-gray-300 font-medium">{result.from}</p>
              </div>
            )}
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Speed</p>
              <p className="text-sm text-teal font-medium">{result.duration_ms}ms</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Characters</p>
              <p className="text-sm text-gray-300 font-medium">{result.input_length} → {result.output_length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
