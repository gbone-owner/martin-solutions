'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { apiPost, ChatResponse } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm the Martin Solutions AI assistant. Ask me anything about AI, our tools, or how artificial intelligence can help your business. I'm here to demonstrate what's possible.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastDuration, setLastDuration] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setError('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const history = messages.slice(1).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const data = await apiPost<ChatResponse>('/ai/chat', {
        message: userMessage,
        history,
      });

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      setLastDuration(data.duration_ms);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get response');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const suggestions = [
    'What AI tools does Martin Solutions offer?',
    'How can AI help my small business?',
    'What makes your approach to AI different?',
    'Tell me about DocuFlow AI',
  ];

  return (
    <div className="showcase-dark min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-4">
        <Link href="/demo" className="text-sm text-gray-500 hover:text-teal transition-colors">
          &larr; All Demos
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-8 pb-8">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            Live AI Demo
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            AI Assistant
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Chat with our AI about anything related to artificial intelligence,
            business automation, or Martin Solutions. Powered by Llama 3.1 running
            on Cloudflare&apos;s edge network.
          </p>
        </div>

        {/* Chat container */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col" style={{ height: '60vh', minHeight: '400px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-md'
                      : 'bg-slate-800 text-gray-200 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded bg-gradient-to-br from-teal to-accent flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">M</span>
                      </div>
                      <span className="text-xs text-gray-500">Martin AI</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-teal to-accent flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">M</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-teal/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-teal/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-teal/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (only show at start) */}
          {messages.length <= 1 && (
            <div className="px-6 pb-3">
              <p className="text-xs text-gray-500 mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setInput(s);
                      inputRef.current?.focus();
                    }}
                    className="text-xs bg-slate-800 text-gray-400 px-3 py-1.5 rounded-full hover:bg-slate-700 hover:text-teal transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="px-6 pb-2">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-800 p-4">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 bg-slate-800 text-white text-sm rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-teal/50 placeholder-gray-500"
                style={{ maxHeight: '120px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="bg-teal text-white p-3 rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            <div className="flex justify-between mt-2 px-1">
              <p className="text-[10px] text-gray-600">Shift+Enter for new line</p>
              {lastDuration !== null && (
                <p className="text-[10px] text-gray-600">Response in {lastDuration}ms</p>
              )}
            </div>
          </div>
        </div>

        {/* Tech info */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {[
            { label: 'Model', value: 'Llama 3.1 8B' },
            { label: 'Infrastructure', value: 'Cloudflare Edge' },
            { label: 'Latency', value: 'Globally distributed' },
            { label: 'Cost to you', value: 'Free to try' },
          ].map((item) => (
            <div key={item.label} className="bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm text-gray-300 font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
