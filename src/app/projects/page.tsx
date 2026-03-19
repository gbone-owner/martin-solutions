import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, statusColors } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'AI tools built with care by Martin Solutions. Quality over speed, real results over promises.',
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-28">
          <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-4">
            Our Projects
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Tools that actually work
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Every project we ship is built with one question in mind: does this
            genuinely solve the problem better than the alternative?
          </p>
        </div>
      </section>

      {/* Project Cards */}
      <section className="bg-gray-50 section-padding">
        <div className="container-wide">
          <div className="space-y-8">
            {projects.map((project) => {
              const status = statusColors[project.status];
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group block bg-white rounded-2xl p-8 md:p-10 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                          {project.title}
                        </h2>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-bg-light text-primary px-2.5 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-accent group-hover:translate-x-1 transition-transform">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
