import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { projects, getProject, statusColors } from '@/lib/data';

// Generate static paths for all projects
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Not Found' };
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // AiDent has its own dedicated product page
  if (slug === 'aident') redirect('/products/aident');

  const project = getProject(slug);
  if (!project) notFound();

  const status = statusColors[project.status];

  return (
    <>
      {/* Back link */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-4">
          <Link href="/projects" className="text-sm text-muted hover:text-primary transition-colors">
            &larr; All Projects
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
              {status.label}
            </span>
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs bg-bg-light text-primary px-2.5 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-500">{project.tagline}</p>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-primary mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Interested in {project.title}?
          </h2>
          <p className="text-gray-500 mb-6">
            Let&apos;s discuss how this tool can fit into your workflow.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
