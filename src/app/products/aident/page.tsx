import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AiDent — AI-Powered Clinic Operations',
  description:
    'AiDent automates patient communication, appointment management, and back-office intelligence for dental clinics. Built for Norway. Powered by AI.',
};

const features = [
  {
    title: 'Smart SMS Reminders',
    desc: 'Automatic 24h appointment reminders every morning. AI-written, personalised for each patient. No templates — every message is unique.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: 'Two-Way Patient Conversations',
    desc: 'Patients reply naturally — cancel, rebook, confirm, or ask questions. AI understands intent and handles the conversation like a real receptionist.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    title: 'AI Treatment Follow-Ups',
    desc: 'Patients who skipped recommended treatment get a personalised follow-up message. AI reads their actual treatment notes and writes a unique outreach.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Instant Waitlist Fill',
    desc: 'When a cancellation comes in, the top 3 waitlist patients get an SMS within seconds. First to reply gets the slot. Others get a polite update.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Smart Review Collection',
    desc: 'After appointments, patients get a satisfaction check first. Happy patients go to Google Reviews. Unhappy ones go directly to the clinic owner — privately.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    title: 'No-Show Prediction',
    desc: 'Every hour, AI scores upcoming appointments on no-show risk. High-risk patients automatically get an extra reminder before it\'s too late.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Voice AI Receptionist',
    desc: 'AI answers phone calls, handles FAQs, books appointments, and can SMS the patient their address or price list mid-call. Available 24/7.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'HELFO Insurance Assistant',
    desc: 'After treatment, AI reads the notes and suggests the correct Norwegian insurance billing codes and estimated refund. Saves hours every week.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Live Dashboard',
    desc: 'A real-time web UI showing today\'s appointments, intake requests flagged by urgency, the waitlist, and pending follow-ups. Your receptionist\'s command centre.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

const comparisons = [
  { gap: 'Template SMS only', aident: 'AI writes unique messages per patient based on their actual treatment notes' },
  { gap: 'No real replies', aident: 'Two-way conversational SMS — patients reply naturally, AI handles it' },
  { gap: 'No Norwegian-native logic', aident: 'Built for Norwegian language, GDPR, Norsk Helsenorm, HELFO codes' },
  { gap: 'No phone AI', aident: 'Voice receptionist answers calls, books appointments, sends SMS mid-call' },
  { gap: 'No predictive intelligence', aident: 'No-show scoring flags risky appointments before they happen' },
  { gap: 'No insurance automation', aident: 'HELFO billing code suggestions save hours per week' },
  { gap: 'Complex setup, weeks of training', aident: 'Done-for-you: you pay, we deploy, it just works' },
  { gap: 'Generic global product', aident: 'Opus Dental integration, Norwegian billing, Norwegian communication norms' },
];

export default function AiDentPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-primary">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-32">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            Flagship Product
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Ai<span className="text-teal">Dent</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light mb-4">
            AI-powered clinic operations for Norwegian dental practices.
          </p>
          <p className="text-gray-300 max-w-2xl leading-relaxed mb-10">
            AiDent replaces the repetitive admin work your receptionist does every day —
            appointment reminders, patient replies, waitlist management, treatment follow-ups,
            review collection, and insurance coding — all handled automatically by AI that
            speaks fluent Norwegian and integrates directly with Opus Dental.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-teal">
              Book a Demo
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a href="#features" className="btn-outline border-white/30 text-white hover:bg-white/10">
              See Features
            </a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-3">The Problem</p>
              <h2 className="text-3xl font-bold text-primary mb-4">
                150 000 kr/year lost to no-shows. Per clinic.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Norwegian dental clinics have a ~15% no-show rate. Nobody calls to confirm
                anymore — patients expect an SMS. But sending personalised reminders, handling
                replies, managing waitlists, and chasing follow-up treatments is too much
                manual work for a receptionist running a busy clinic.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Existing tools send templated reminders. AiDent does everything else.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-primary">~15%</p>
                  <p className="text-gray-500 text-sm mt-1">average no-show rate</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-red-500">150 000 kr</p>
                  <p className="text-gray-500 text-sm mt-1">lost per clinic per year</p>
                </div>
                <div className="text-center">
                  <p className="text-5xl font-bold text-teal">3 500+</p>
                  <p className="text-gray-500 text-sm mt-1">Norwegian clinics on Opus Dental</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Everything a clinic needs. Automated.
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Nine interlocked AI systems that work together to run your clinic&apos;s
              patient communication and back-office operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-3">Why AiDent</p>
            <h2 className="text-3xl font-bold text-primary mb-4">
              What generic tools can&apos;t do
            </h2>
          </div>

          <div className="bg-gray-50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 bg-primary text-white text-sm font-semibold">
              <div className="px-6 py-3">Generic scheduling tools</div>
              <div className="px-6 py-3">AiDent</div>
            </div>
            {comparisons.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 text-sm ${i % 2 === 0 ? '' : 'bg-white'}`}>
                <div className="px-6 py-4 text-gray-400 border-r border-gray-100">{row.gap}</div>
                <div className="px-6 py-4 text-gray-700">{row.aident}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-3">Getting Started</p>
          <h2 className="text-3xl font-bold text-primary mb-12">
            Done for you. Not DIY.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'We Talk', desc: 'A quick call to understand your clinic, your Opus Dental setup, and your biggest pain points.' },
              { step: '2', title: 'We Deploy', desc: 'We configure AiDent for your specific clinic — your templates, your schedule, your patients. You don\'t touch a thing.' },
              { step: '3', title: 'It Runs', desc: 'AiDent handles communication, waitlists, follow-ups, and insurance coding. You focus on patients.' },
            ].map((s) => (
              <div key={s.step}>
                <div className="w-12 h-12 rounded-full bg-teal/10 text-teal font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-slate-900 text-white section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recover 150 000 kr/year in lost appointments.
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            AiDent pays for itself from day one. Let&apos;s talk about your clinic.
          </p>
          <Link href="/contact" className="btn-teal text-lg px-8 py-4">
            Book a Demo
          </Link>
        </div>
      </section>
    </>
  );
}
