'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Wire up to Cloudflare Workers API + Turnstile
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-28">
          <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Let&apos;s talk
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Whether you have a specific project in mind or just want to explore
            how AI can help your business — reach out. No pressure, no sales
            pitch. Just a conversation.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Form */}
            <div className="md:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
                  <div className="w-16 h-16 rounded-full bg-success/10 mx-auto flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Message sent!</h2>
                  <p className="text-gray-500">
                    Thanks for reaching out. I&apos;ll get back to you as soon as
                    I can.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company <span className="text-muted">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                      placeholder="Your company"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors bg-white"
                    >
                      <option value="">Select a topic...</option>
                      <option value="project">I have a project idea</option>
                      <option value="demo">I&apos;d like a demo</option>
                      <option value="consulting">AI consulting inquiry</option>
                      <option value="partnership">Partnership opportunity</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
                      placeholder="Tell me about your project, your challenges, or what you're looking for..."
                    />
                  </div>

                  {/* Turnstile widget placeholder */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center">
                    <p className="text-xs text-gray-400">
                      Cloudflare Turnstile widget will be placed here
                    </p>
                  </div>

                  <button type="submit" className="btn-primary w-full md:w-auto">
                    Send Message
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-primary mb-3">Email</h3>
                <a
                  href="mailto:martin@gbone.no"
                  className="text-accent hover:text-primary transition-colors"
                >
                  martin@gbone.no
                </a>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-3">Website</h3>
                <a
                  href="https://martin.solutions"
                  className="text-accent hover:text-primary transition-colors"
                >
                  martin.solutions
                </a>
              </div>
              <div>
                <h3 className="font-bold text-primary mb-3">Response Time</h3>
                <p className="text-gray-500 text-sm">
                  Typically within 24 hours on business days.
                </p>
              </div>
              <div className="bg-bg-light rounded-2xl p-6">
                <h3 className="font-bold text-primary mb-2">Not sure what you need?</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  That&apos;s fine. Just describe your situation and I&apos;ll help
                  you figure out whether AI can help — and be honest if it can&apos;t.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
