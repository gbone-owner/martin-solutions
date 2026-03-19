import { notFound } from 'next/navigation';
import Link from 'next/link';
import { showcaseEntries, getShowcaseEntry, categoryColors } from '@/lib/data';

export function generateStaticParams() {
  return showcaseEntries.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = getShowcaseEntry(params.slug);
  if (!entry) return { title: 'Not Found' };
  return {
    title: `${entry.title} — AI Showcase`,
    description: entry.tagline,
  };
}

export default function ShowcaseDetailPage({ params }: { params: { slug: string } }) {
  const entry = getShowcaseEntry(params.slug);
  if (!entry) notFound();

  return (
    <div className="showcase-dark min-h-screen">
      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-4">
        <Link href="/showcase" className="text-sm text-gray-500 hover:text-teal transition-colors">
          &larr; All Showcases
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-teal/8 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-6 ${categoryColors[entry.category] || 'bg-teal/20 text-teal'}`}>
            {entry.categoryLabel}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {entry.title}
          </h1>
          <p className="text-xl text-gray-400 mb-2">{entry.tagline}</p>
          <p className="text-sm text-gray-500">{entry.date}</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-12">
        {/* Overview */}
        <div className="showcase-card p-8 md:p-10 mb-8">
          <p className="text-gray-300 leading-relaxed text-lg">
            {entry.description}
          </p>
        </div>

        {/* Problem / Solution / Impact grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* The Problem */}
          <div className="showcase-card p-8 border-t-2 border-t-red-500/50">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 className="text-lg font-bold text-white">The Problem</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {entry.problem}
            </p>
          </div>

          {/* The Solution */}
          <div className="showcase-card p-8 border-t-2 border-t-teal/50">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h2 className="text-lg font-bold text-white">The Solution</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {entry.solution}
            </p>
          </div>

          {/* The Impact */}
          <div className="showcase-card p-8 border-t-2 border-t-accent/50">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <h2 className="text-lg font-bold text-white">The Impact</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {entry.impact}
            </p>
          </div>
        </div>

        {/* Interactive placeholder */}
        <div className="showcase-card p-10 text-center glow-teal mb-12">
          <div className="w-16 h-16 rounded-full bg-teal/20 mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-white font-bold mb-2">Interactive Demo</h3>
          <p className="text-gray-500 text-sm">
            Interactive element coming soon. This space will feature a live demo,
            comparison slider, or data visualization related to this showcase.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link href="/showcase" className="btn-outline border-slate-700 text-gray-300 hover:bg-slate-800 hover:text-white">
            &larr; Back to Showcase
          </Link>
          <Link href="/contact" className="btn-teal">
            Discuss This With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
