import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Martin Solutions exists because the AI transformation must be guided by quality, responsibility, and a commitment to human-AI coexistence.',
};

const values = [
  {
    title: 'Quality Over Speed',
    description:
      'We ship when it\'s ready, not when it\'s rushed. Every tool we release must genuinely solve a problem better than the alternative.',
  },
  {
    title: 'Embrace, Don\'t Fear',
    description:
      'AI is coming whether we like it or not. Our job is to help businesses lean into it with confidence, not anxiety.',
  },
  {
    title: 'Human-AI Coexistence',
    description:
      'The goal is not to replace humans but to free them for higher-value work. AI handles the repetitive; humans handle the creative and strategic.',
  },
  {
    title: 'Transparency',
    description:
      'We show our work. Certified reviews, honest capabilities, no black-box magic. Clients know exactly what they\'re getting.',
  },
  {
    title: 'Future-Forward',
    description:
      'We don\'t just build for today\'s problems — we anticipate where AI is heading and position our clients ahead of the curve.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="relative max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-32">
          <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-4">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
            We build the bridge between
            <br />
            where you are and where AI is taking you.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Martin Solutions was founded on a simple belief: AI will fundamentally
            reshape how humans work. This is not a possibility — it is a certainty
            that is already unfolding. The companies that thrive will be the ones
            that embrace it deliberately and do it right.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Position</h2>
              <p className="text-blue-100 leading-relaxed">
                We don&apos;t sell fear or hype. We build the bridge between where
                businesses are today and where AI is taking them tomorrow. We
                believe in coexistence: AI amplifying human capability, not
                replacing human purpose.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-teal mb-1">Mission</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  To develop high-quality AI tools that help businesses embrace the
                  future confidently — delivering real results, not promises.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-teal mb-1">Vision</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  A world where every business, regardless of size, has access to AI
                  that genuinely works — where technology and human expertise coexist
                  to produce outcomes neither could achieve alone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`rounded-2xl p-8 ${
                  i === values.length - 1 ? 'md:col-span-2 md:max-w-lg md:mx-auto' : ''
                } bg-gray-50 hover:shadow-md transition-shadow duration-300`}
              >
                <h3 className="text-lg font-bold text-primary mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-teal mx-auto flex items-center justify-center mb-6">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Martin</h2>
          <p className="text-accent font-medium mb-4">Founder</p>
          <p className="text-gray-600 leading-relaxed">
            Martin founded Martin Solutions to prove that AI doesn&apos;t have
            to be scary, expensive, or impractical. With a focus on craftsmanship
            and real-world impact, he builds tools that businesses actually use —
            not just talk about.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Let&apos;s build the future together
          </h2>
          <p className="text-gray-500 mb-8">
            Have a project in mind, or just want to explore what AI can do for
            your business? We&apos;re always happy to talk.
          </p>
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
