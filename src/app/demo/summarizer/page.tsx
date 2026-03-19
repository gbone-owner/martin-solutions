'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiPost, SummarizeResponse } from '@/lib/api';

const SAMPLE_TEXT = `Artificial intelligence is rapidly transforming the business landscape, with companies across every industry seeking to leverage AI for competitive advantage. Recent studies indicate that organizations implementing AI solutions see an average productivity increase of 40% in targeted processes. However, the key challenge remains not in the technology itself, but in the strategic implementation and change management required to integrate AI effectively into existing workflows.

Many businesses rush to adopt AI without a clear strategy, leading to failed implementations and wasted resources. The most successful AI deployments share common characteristics: they start with well-defined problems, involve end users from the beginning, iterate rapidly based on feedback, and maintain realistic expectations about what AI can and cannot do.

The future of business AI lies not in replacing human workers wholesale, but in creating hybrid systems where AI handles routine, data-intensive tasks while humans focus on strategic thinking, relationship building, and creative problem-solving. Companies that understand this distinction will be best positioned to thrive in the AI-powered economy.`;

type Style = 'concise' | 'detailed' | 'bullet-points';

export default function SummarizerDemo() {
  const [text, setText] = useState('');
  const [style, setStyle] = useState<Style>('concise');
  const [result, setResult] = useState<SummarizeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSummarize() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await apiPost<SummarizeResponse>('/ai/summarize', { text, style });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to summarize');
    } finally {
      setLoading(false);
    }
  }

  const compressionRatio = result
    ? Math.round((1 - result.output_length / result.input_length) * 100)
    : 0;

  return (
    <div className="showcase-dark min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-4">
        <Link href="/demo" className="text-sm text-gray-500 hover:text-teal transition-colors">
          &larr; All Demos
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 pb-16">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            Live AI Demo
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            AI Text Summarizer
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Paste any text and get an instant AI-powered summary. Choose your
            style — concise, detailed, or bullet points. See how AI distills
            information in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input side */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-300">Input Text</h2>
              <button
                onClick={() => setText(SAMPLE_TEXT)}
                className="text-xs text-teal hover:text-white transition-colors"
              >
                Load sample text
              </button>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here (minimum 50 characters)..."
              rows={14}
              className="w-full bg-slate-900/80 border border-slate-800 text-gray-200 text-sm rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal/50 placeholder-gray-600"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {text.length.toLocaleString()} characters
              </span>
              <span className="text-xs text-gray-500">
                Max 10,000
              </span>
            </div>

            {/* Style selector */}
            <div>
              <p className="text-xs text-gray-400 mb-2">Summary style:</p>
              <div className="flex gap-2">
                {([
                  { key: 'concise', label: 'Concise', desc: '2-3 sentences' },
                  { key: 'detailed', label: 'Detailed', desc: '1-2 paragraphs' },
                  { key: 'bullet-points', label: 'Bullet Points', desc: '3-5 bullets' },
                ] as { key: Style; label: string; desc: string }[]).map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStyle(s.key)}
                    className={`flex-1 text-center px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      style === s.key
                        ? 'bg-teal/20 text-teal border border-teal/30'
                        : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="block">{s.label}</span>
                    <span className="block text-[10px] opacity-60 mt-0.5">{s.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSummarize}
              disabled={text.length < 50 || loading}
              className="w-full btn-teal disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Summarizing...
                </span>
              ) : (
                'Summarize'
              )}
            </button>
          </div>

          {/* Output side */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-300">AI Summary</h2>

            <div
              className={`bg-slate-900/80 border rounded-xl px-5 py-4 min-h-[200px] ${
                result ? 'border-teal/30 glow-teal' : 'border-slate-800'
              }`}
            >
              {error && <p className="text-red-400 text-sm">{error}</p>}

              {!result && !error && !loading && (
                <p className="text-gray-600 text-sm italic">
                  Your AI-generated summary will appear here...
                </p>
              )}

              {loading && (
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span className="text-sm">AI is reading and analyzing your text...</span>
                </div>
              )}

              {result && (
                <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {result.summary}
                </p>
              )}
            </div>

            {/* Stats */}
            {result && (
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-teal">{compressionRatio}%</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Compressed</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-accent">{result.duration_ms}ms</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Processing</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-white">{result.output_length}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Output Chars</p>
                </div>
              </div>
            )}

            {/* How it works */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-300 mb-3">How it works</h3>
              <div className="space-y-2">
                {[
                  'Your text is sent to a Llama 3.1 model running on Cloudflare\'s edge network',
                  'The AI analyzes the full content and identifies key points',
                  'A summary is generated in your chosen style',
                  'Everything runs serverless — no data is stored after processing',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-teal text-xs font-bold mt-0.5">{i + 1}.</span>
                    <p className="text-xs text-gray-500">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
