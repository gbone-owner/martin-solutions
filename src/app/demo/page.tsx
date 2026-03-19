import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Demos — Try It Yourself',
  description: 'Interactive AI demos you can try right now. Chat with AI, summarize text, analyze documents — powered by Martin Solutions.',
};

const demos = [
  {
    href: '/demo/chat',
    title: 'AI Assistant',
    description: 'Chat with our AI about anything related to artificial intelligence, business automation, or Martin Solutions.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    tag: 'Conversational AI',
    color: 'from-teal to-emerald-500',
  },
  {
    href: '/demo/summarizer',
    title: 'Text Summarizer',
    description: 'Paste any text and get an instant AI-powered summary. Choose concise, detailed, or bullet-point style.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    ),
    tag: 'Text Processing',
    color: 'from-accent to-blue-500',
  },
  {
    href: '/demo/analyzer',
    title: 'Document Analyzer',
    description: 'AI extracts sentiment, key topics, entities, tone, and action items from any text in seconds.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    tag: 'Document Intelligence',
    color: 'from-purple-500 to-pink-500',
  },
  {
    href: '/demo/writer',
    title: 'Content Writer',
    description: 'Describe what you need — blog post, email, product page, social media — and AI generates polished content instantly.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    tag: 'Content Generation',
    color: 'from-amber-500 to-orange-500',
  },
  {
    href: '/demo/translator',
    title: 'Translator',
    description: 'Translate text between 15+ languages with context-aware AI. Preserves tone, meaning, and formatting.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    tag: 'Multilingual AI',
    color: 'from-rose-500 to-red-500',
  },
];

export default function DemoPage() {
  return (
    <div className="showcase-dark min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            Live &amp; Interactive
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Try AI.{' '}
            <span className="text-gradient">Right now.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t take our word for it — experience it yourself. These demos
            run on real AI models, on Cloudflare&apos;s global edge network, built
            by Martin Solutions. No signup required.
          </p>
        </div>
      </section>

      {/* Demo cards */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl p-8 hover:border-teal/40 transition-all duration-300 hover:glow-teal flex flex-col"
            >
              {/* Gradient icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${demo.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {demo.icon}
              </div>

              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
                {demo.tag}
              </span>

              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-teal transition-colors">
                {demo.title}
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                {demo.description}
              </p>

              <span className="inline-flex items-center gap-1 text-sm font-medium text-teal group-hover:translate-x-1 transition-transform">
                Try it
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-slate-900/50 border border-slate-800 rounded-xl px-8 py-6 max-w-lg">
            <h3 className="text-white font-semibold mb-2">What powers these demos?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Llama 3.1 running on Cloudflare Workers AI, with a D1 database for
              rate limiting and usage analytics. Zero external API dependencies,
              globally distributed, built entirely by Martin Solutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
