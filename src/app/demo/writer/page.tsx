'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiPost } from '@/lib/api';

type Format = 'blog-post' | 'email' | 'product-description' | 'social-media' | 'press-release';
type Tone = 'professional' | 'casual' | 'persuasive' | 'technical';
type Length = 'short' | 'medium' | 'long';

interface WriteResponse {
  content: string;
  format: string;
  tone: string;
  length: string;
  word_count: number;
  duration_ms: number;
}

export default function WriterDemo() {
  const [brief, setBrief] = useState('');
  const [format, setFormat] = useState<Format>('blog-post');
  const [tone, setTone] = useState<Tone>('professional');
  const [length, setLength] = useState<Length>('medium');
  const [result, setResult] = useState<WriteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate() {
    if (!brief.trim() || loading) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await apiPost<WriteResponse>('/ai/write', { brief, format, tone, length });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setLoading(false);
    }
  }

  const formats: { key: Format; label: string; icon: string }[] = [
    { key: 'blog-post', label: 'Blog Post', icon: '📝' },
    { key: 'email', label: 'Email', icon: '📧' },
    { key: 'product-description', label: 'Product Page', icon: '🛍️' },
    { key: 'social-media', label: 'Social Media', icon: '📱' },
    { key: 'press-release', label: 'Press Release', icon: '📰' },
  ];

  const tones: { key: Tone; label: string }[] = [
    { key: 'professional', label: 'Professional' },
    { key: 'casual', label: 'Casual' },
    { key: 'persuasive', label: 'Persuasive' },
    { key: 'technical', label: 'Technical' },
  ];

  const lengths: { key: Length; label: string; desc: string }[] = [
    { key: 'short', label: 'Short', desc: '~100 words' },
    { key: 'medium', label: 'Medium', desc: '~300 words' },
    { key: 'long', label: 'Long', desc: '~600 words' },
  ];

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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">AI Content Writer</h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Describe what you need and AI generates polished content instantly.
            Blog posts, emails, product pages, social media — choose your format, tone, and length.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-5">
            {/* Brief */}
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">Your Brief</label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe what you want written. E.g. 'A blog post about how small businesses can use AI to save time on invoicing and bookkeeping'"
                rows={4}
                className="w-full bg-slate-900/80 border border-slate-800 text-gray-200 text-sm rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal/50 placeholder-gray-600"
              />
            </div>

            {/* Format */}
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">Format</label>
              <div className="grid grid-cols-3 gap-2">
                {formats.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setFormat(f.key)}
                    className={`text-center px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      format === f.key
                        ? 'bg-teal/20 text-teal border border-teal/30'
                        : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="block text-base mb-0.5">{f.icon}</span>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">Tone</label>
              <div className="flex gap-2">
                {tones.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTone(t.key)}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      tone === t.key
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Length */}
            <div>
              <label className="text-sm font-semibold text-gray-300 block mb-2">Length</label>
              <div className="flex gap-2">
                {lengths.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => setLength(l.key)}
                    className={`flex-1 text-center px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      length === l.key
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="block">{l.label}</span>
                    <span className="block text-[10px] opacity-60">{l.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={brief.trim().length < 10 || loading}
              className="w-full btn-teal disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Writing...
                </span>
              ) : (
                'Generate Content'
              )}
            </button>
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300">Generated Content</label>
              {result && (
                <button
                  onClick={() => navigator.clipboard.writeText(result.content)}
                  className="text-xs text-teal hover:text-white transition-colors"
                >
                  Copy to clipboard
                </button>
              )}
            </div>

            <div className={`bg-slate-900/80 border rounded-xl px-5 py-4 min-h-[380px] max-h-[500px] overflow-y-auto ${result ? 'border-teal/30 glow-teal' : 'border-slate-800'}`}>
              {error && <p className="text-red-400 text-sm">{error}</p>}

              {!result && !error && !loading && (
                <p className="text-gray-600 text-sm italic">
                  Your AI-generated content will appear here...
                </p>
              )}

              {loading && (
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm">AI is crafting your content...</span>
                </div>
              )}

              {result && (
                <div className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {result.content}
                </div>
              )}
            </div>

            {result && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-teal">{result.word_count}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Words</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-accent">{(result.duration_ms / 1000).toFixed(1)}s</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Generated In</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-purple-400 capitalize">{result.format.replace('-', ' ')}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Format</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
