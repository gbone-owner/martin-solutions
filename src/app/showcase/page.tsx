import type { Metadata } from 'next';
import Link from 'next/link';
import { showcaseEntries, categoryColors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'AI Showcase',
  description:
    'Explore how AI is revolutionizing industries — and how Martin Solutions is pushing that into reality.',
};

export default function ShowcasePage() {
  return (
    <div className="showcase-dark min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" />

        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32">
          <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-4">
            AI Showcase
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Glimpse the{' '}
            <span className="text-gradient">future</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            AI is not coming — it&apos;s here. Explore curated demonstrations,
            industry deep-dives, and behind-the-scenes looks at how artificial
            intelligence is reshaping the world. Then see how Martin Solutions is
            making it real.
          </p>
        </div>
      </section>

      {/* Category filters (visual labels for now) */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pb-4">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All', color: 'bg-white/10 text-white' },
            { key: 'live-demo', label: 'Live Demos', color: categoryColors['live-demo'] },
            { key: 'industry-spotlight', label: 'Industry Spotlights', color: categoryColors['industry-spotlight'] },
            { key: 'before-after', label: 'Before & After', color: categoryColors['before-after'] },
            { key: 'future-forecast', label: 'Future Forecasts', color: categoryColors['future-forecast'] },
            { key: 'build-log', label: 'Build Logs', color: categoryColors['build-log'] },
          ].map((cat) => (
            <span
              key={cat.key}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${cat.color} cursor-default`}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/showcase/${entry.slug}`}
              className="group showcase-card flex flex-col hover:glow-teal"
            >
              {/* Placeholder visual */}
              <div className="h-40 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 mb-5 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-teal/20 mx-auto flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">{entry.categoryLabel}</span>
                </div>
              </div>

              <span className={`inline-block w-fit text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${categoryColors[entry.category] || 'bg-teal/20 text-teal'}`}>
                {entry.categoryLabel}
              </span>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal transition-colors">
                {entry.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">
                {entry.tagline}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{entry.date}</span>
                <span className="text-teal text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* More coming */}
        <div className="mt-16 text-center">
          <div className="inline-block showcase-card px-10 py-8">
            <p className="text-gray-400 mb-2">More showcases are being crafted.</p>
            <p className="text-sm text-gray-500">
              Have a story worth showcasing?{' '}
              <Link href="/contact" className="text-teal hover:underline">
                Let us know
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
