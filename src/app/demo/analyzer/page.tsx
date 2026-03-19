'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiPost, AnalyzeResponse } from '@/lib/api';

type DocType = 'general' | 'email' | 'report' | 'feedback';

const SAMPLE_TEXTS: Record<DocType, string> = {
  email: `Hi Team,

I wanted to follow up on our Q1 performance review. Overall, revenue exceeded targets by 12%, driven primarily by the new enterprise tier we launched in February. However, customer support response times have increased to an average of 4.2 hours, which is concerning and needs immediate attention.

Action items:
- Sarah to present support workflow optimization plan by Friday
- Dev team to prioritize the automated ticket routing feature
- Schedule a cross-team meeting for next Tuesday to align on Q2 priorities

The board is pleased with growth but wants to see retention metrics improve. Let's make this a priority.

Best,
Martin`,
  feedback: `I've been using DocuFlow AI for about 3 months now at our accounting firm. The document classification is impressively accurate - probably saves us 15-20 hours per week. However, the export feature is clunky and the PDF parsing sometimes misses tables with merged cells. The onboarding was smooth and support has been responsive. Overall very satisfied but there's room for improvement on the technical edge cases. Would recommend to other firms our size.`,
  report: `The global AI market is projected to reach $1.8 trillion by 2030, growing at a CAGR of 37.3% from 2023. Key drivers include increasing enterprise adoption, advances in large language models, and growing demand for automation across industries. North America leads with 42% market share, followed by Asia-Pacific at 28%. The most significant growth sectors are healthcare (52% CAGR), financial services (41% CAGR), and manufacturing (38% CAGR). Challenges include regulatory uncertainty, talent shortages, and concerns about AI bias and safety.`,
  general: `The transition from traditional software to AI-powered tools represents a fundamental shift in how businesses operate. Unlike conventional software that follows rigid, pre-programmed rules, AI systems learn and adapt from data, enabling them to handle nuanced, variable tasks that previously required human judgment. This doesn't mean AI replaces humans — rather, it creates a new paradigm of human-AI collaboration where each contributes their strengths. Businesses that understand this distinction and invest in thoughtful AI integration will find themselves with a significant competitive advantage.`,
};

export default function AnalyzerDemo() {
  const [text, setText] = useState('');
  const [docType, setDocType] = useState<DocType>('general');
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleAnalyze() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await apiPost<AnalyzeResponse>('/ai/analyze', { text, type: docType });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze');
    } finally {
      setLoading(false);
    }
  }

  const sentimentColor: Record<string, string> = {
    positive: 'text-emerald-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400',
    mixed: 'text-amber-400',
  };

  const sentimentBg: Record<string, string> = {
    positive: 'bg-emerald-400',
    negative: 'bg-red-400',
    neutral: 'bg-gray-400',
    mixed: 'bg-amber-400',
  };

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
            AI Document Analyzer
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Paste any text and AI will instantly extract sentiment, key topics,
            entities, tone, and actionable insights. See how AI understands your
            documents.
          </p>
        </div>

        {/* Doc type selector */}
        <div className="flex justify-center gap-2 mb-8">
          {([
            { key: 'general', label: 'General Text' },
            { key: 'email', label: 'Business Email' },
            { key: 'report', label: 'Report' },
            { key: 'feedback', label: 'Customer Feedback' },
          ] as { key: DocType; label: string }[]).map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setDocType(t.key);
                setText(SAMPLE_TEXTS[t.key]);
                setResult(null);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                docType === t.key
                  ? 'bg-teal/20 text-teal border border-teal/30'
                  : 'bg-slate-800 text-gray-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here, or click a document type above to load a sample..."
            rows={8}
            className="w-full bg-slate-900/80 border border-slate-800 text-gray-200 text-sm rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal/50 placeholder-gray-600"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">{text.length.toLocaleString()} characters</span>
            <button
              onClick={handleAnalyze}
              disabled={text.length < 30 || loading}
              className="btn-teal disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Analyze Document'
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && !result.raw_response && (
          <div className="space-y-6">
            {/* Top stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Sentiment */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center">
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${sentimentBg[result.sentiment] || 'bg-gray-400'}20`}>
                  <div className={`w-6 h-6 rounded-full ${sentimentBg[result.sentiment] || 'bg-gray-400'}`} />
                </div>
                <p className={`text-lg font-bold capitalize ${sentimentColor[result.sentiment] || 'text-gray-400'}`}>
                  {result.sentiment}
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Sentiment</p>
              </div>

              {/* Sentiment score */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-white mb-1">
                  {Math.round((result.sentiment_score || 0) * 100)}%
                </p>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${sentimentBg[result.sentiment] || 'bg-gray-400'}`}
                    style={{ width: `${(result.sentiment_score || 0) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Positivity Score</p>
              </div>

              {/* Tone */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center">
                <p className="text-lg font-bold text-accent capitalize mb-1">{result.tone || 'N/A'}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Tone</p>
              </div>

              {/* Processing */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 text-center">
                <p className="text-lg font-bold text-teal">{result.duration_ms}ms</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Processed In</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-900/80 border border-teal/20 rounded-xl p-6 glow-teal">
              <h3 className="text-sm font-semibold text-teal mb-2">AI Summary</h3>
              <p className="text-gray-200 text-sm leading-relaxed">{result.summary}</p>
            </div>

            {/* Topics + Entities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Key Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {(result.key_topics || []).map((topic, i) => (
                    <span key={i} className="bg-accent/10 text-accent text-xs px-3 py-1.5 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Entities Detected</h3>
                <div className="flex flex-wrap gap-2">
                  {(result.entities || []).map((entity, i) => (
                    <span key={i} className="bg-purple-500/10 text-purple-400 text-xs px-3 py-1.5 rounded-full">
                      {entity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Items */}
            {result.action_items && result.action_items.length > 0 && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-300 mb-3">Action Items</h3>
                <div className="space-y-2">
                  {result.action_items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded border border-teal/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-teal text-[10px]">{i + 1}</span>
                      </div>
                      <p className="text-sm text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Raw response fallback */}
        {result && result.raw_response && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Analysis Result</h3>
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{result.raw_response}</p>
          </div>
        )}

        {/* Empty state */}
        {!result && !loading && !error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-500">Click a document type above to load a sample, or paste your own text</p>
          </div>
        )}
      </div>
    </div>
  );
}
