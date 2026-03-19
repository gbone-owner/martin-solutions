import Link from 'next/link';
import { projects, showcaseEntries, statusColors, categoryColors } from '@/lib/data';

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-white">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-dots opacity-40" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-4">
              AI Tools for Business
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight mb-6">
              Embrace the future.
              <br />
              <span className="text-gradient">Do it right.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
              Martin Solutions builds high-quality AI tools that help businesses work
              smarter — not by replacing people, but by freeing them for the work that
              actually matters.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/showcase" className="btn-primary">
                Explore AI Showcase
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/projects" className="btn-outline">
                View Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY STRIP ===== */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8 text-center">
          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
            AI is going to reshape how we work. The question isn&apos;t
            whether to embrace it&nbsp;&mdash; it&apos;s whether to{' '}
            <span className="font-semibold text-teal">do it right</span>.
            Martin Solutions exists to make sure we do.
          </p>
        </div>
      </section>

      {/* ===== VALUES GRID ===== */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              What drives us
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Every tool we build, every decision we make, is guided by these principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Quality Over Speed',
                desc: 'We ship when it\'s ready, not when it\'s rushed. Every tool must genuinely solve a problem better than the alternative.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Human-AI Coexistence',
                desc: 'AI handles the repetitive. Humans handle the creative and strategic. Together, they achieve what neither could alone.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Future-Forward',
                desc: 'We don\'t just build for today\'s problems — we anticipate where AI is heading and position our clients ahead of the curve.',
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                Our Projects
              </h2>
              <p className="text-gray-500">AI tools built with care, solving real problems.</p>
            </div>
            <Link href="/projects" className="hidden md:inline-flex text-sm font-semibold text-accent hover:text-primary transition-colors">
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => {
              const status = statusColors[project.status];
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-bg-light text-primary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED SHOWCASE (dark section) ===== */}
      <section className="showcase-dark section-padding bg-grid">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-2">
                AI Showcase
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                AI is reshaping the world
              </h2>
              <p className="text-gray-400 max-w-lg">
                Explore how artificial intelligence is revolutionizing industries —
                and how Martin Solutions is pushing that into reality.
              </p>
            </div>
            <Link href="/showcase" className="hidden md:inline-flex text-sm font-semibold text-teal hover:text-white transition-colors">
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/showcase/${entry.slug}`}
                className="group showcase-card hover:glow-teal"
              >
                <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${categoryColors[entry.category] || 'bg-teal/20 text-teal'}`}>
                  {entry.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-teal transition-colors">
                  {entry.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {entry.tagline}
                </p>
                <span className="text-xs text-gray-500">{entry.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to embrace AI the right way?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Whether you&apos;re exploring what AI can do for your business or ready to
            deploy, we&apos;d love to talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/about" className="btn-outline">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
