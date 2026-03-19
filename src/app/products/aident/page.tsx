import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AiDent — AI-Powered Clinic Operations',
  description:
    'See how AI replaced an entire layer of manual clinic operations. AiDent is a Martin Solutions product that automates patient communication, appointments, and back-office work for Norwegian dental clinics.',
};

// Before/after comparison data
const beforeAfter = [
  {
    category: 'Appointment Reminders',
    before: 'Receptionist manually calls or sends template SMS one by one. Takes 30–60 min every morning. Often skipped when busy.',
    after: 'AI sends personalised reminders automatically at 08:00 every day. Every patient, every time. Zero manual effort.',
    impact: 'Saves 1–2 hours daily',
  },
  {
    category: 'Patient Replies',
    before: 'Patient texts back "can I move to Thursday?" — receptionist has to read it, check the calendar, reply, update the system. Multiply by 20+ replies/day.',
    after: 'AI reads the message, understands the intent, checks availability, rebooks the patient, and confirms — all within seconds. Receptionist only sees a log entry.',
    impact: 'Two-way AI conversations',
  },
  {
    category: 'Cancellations & Waitlist',
    before: 'Patient cancels. Receptionist calls 3–5 waitlist patients one by one. Most don\'t answer. Slot often goes unfilled. Revenue lost.',
    after: 'System detects cancellation → instantly texts top 3 waitlist patients → first to reply JA gets the slot → others get a polite update. All in under 60 seconds.',
    impact: 'Fills slots in seconds',
  },
  {
    category: 'Treatment Follow-Up',
    before: 'Patient declines recommended root canal. Gets forgotten. Clinic loses the revenue, patient\'s condition worsens.',
    after: 'AI reads the treatment notes, waits an appropriate period, then sends a personalised message: "Ole, du hadde en anbefalt rotfylling — vil du booke?" Each message is unique.',
    impact: 'Recovers lost treatments',
  },
  {
    category: 'Review Collection',
    before: 'Clinic asks for Google reviews verbally. Maybe 1 in 50 patients actually writes one. No control over negative reviews going public.',
    after: 'Automatic SMS after appointment with a satisfaction gate. Happy patients → Google review link. Unhappy patients → message goes to clinic owner privately first.',
    impact: 'Protects online reputation',
  },
  {
    category: 'Phone Calls',
    before: 'Average dental practice misses 300+ calls per month. Each missed new-patient call = ~8 000 kr in lifetime value lost. Receptionist can\'t answer while treating patients.',
    after: 'AI voice receptionist answers 24/7. Handles FAQs, books appointments, sends SMS with address or price list mid-call. Never misses a call.',
    impact: '24/7 availability',
  },
  {
    category: 'No-Show Management',
    before: 'Patient doesn\'t show up. Chair sits empty. Clinic loses 1 000–3 000 kr per missed slot. Nobody saw it coming.',
    after: 'AI scores every upcoming appointment for no-show risk (based on history, time of day, past behaviour). High-risk patients get an extra personalised reminder automatically.',
    impact: 'Predicts before it happens',
  },
  {
    category: 'Insurance Billing (HELFO)',
    before: 'Dentist finishes treatment. Receptionist manually looks up Norwegian insurance codes, calculates estimated refund, fills out claim. Error-prone, time-consuming.',
    after: 'AI reads the treatment notes, suggests the correct HELFO billing codes and estimated refund amount, then alerts the receptionist. Hours of admin reduced to seconds.',
    impact: 'Automated billing codes',
  },
];

const stats = [
  { value: '~15%', label: 'Average no-show rate in dental clinics', source: 'Industry average' },
  { value: '150 000 kr', label: 'Lost per clinic per year to empty chairs', source: 'Calculated from avg. Norwegian clinic volume' },
  { value: '300+', label: 'Calls missed per month by the average practice', source: 'Resonate App research' },
  { value: '32%', label: 'Of all dental calls go completely unanswered', source: 'Reach.co study' },
  { value: '3 500+', label: 'Norwegian clinics running Opus Dental', source: 'Opus Systemer AS' },
  { value: '€150B', label: 'Annual cost of no-shows to healthcare globally', source: 'Healthcare industry data' },
];

export default function AiDentPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-primary">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-teal/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-32">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full">
              Flagship Product
            </span>
            <span className="bg-white/10 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full">
              Built by Martin Solutions
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
            Ai<span className="text-teal">Dent</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light mb-4">
            What happens when you replace an entire layer of manual clinic operations with AI.
          </p>
          <p className="text-gray-400 max-w-2xl leading-relaxed mb-10">
            Norwegian dental clinics still run on software from the 90s. Receptionists manually
            call patients, waitlists live on sticky notes, and insurance coding is a guessing game.
            AiDent replaces all of that with AI that actually understands patients, speaks Norwegian,
            and works 24/7. This is what a modern clinic looks like.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://tannklinikk-demo.gbone.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal"
            >
              See the Live Demo
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a href="#before-after" className="btn-outline border-white/30 text-white hover:bg-white/10">
              See the Contrast
            </a>
          </div>
        </div>
      </section>

      {/* ===== THE STATE OF DENTAL TODAY ===== */}
      <section className="bg-white section-padding">
        <div className="max-w-5xl mx-auto">
          <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-3">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Dental clinics are running 2025 operations on 1995 software.
          </h2>
          <div className="text-gray-600 leading-relaxed space-y-4 max-w-3xl mb-12">
            <p>
              The dominant clinic management systems in Norway were designed in the 90s and have barely
              evolved since. They handle records and scheduling — and that&apos;s about it. Patient
              communication? Manual. Follow-ups on declined treatment? Forgotten. Waitlist
              management? A receptionist with a phone and a prayer.
            </p>
            <p>
              The result: clinics lose an average of 150 000 kr per year to no-shows alone. They miss
              300+ calls per month. Patients who need treatment slip through the cracks because nobody
              follows up. And receptionists spend hours on admin work that AI can do in seconds.
            </p>
            <p>
              This isn&apos;t a technology problem — it&apos;s a gap between what exists and what&apos;s
              possible. AiDent fills that gap.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-2xl p-6 text-center">
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEFORE / AFTER ===== */}
      <section id="before-after" className="bg-gray-50 section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-3">Before &amp; After</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Stone age vs. AI age. Side by side.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every row below represents a real daily task in a dental clinic. On the left, how
              clinics do it today. On the right, how AiDent handles it. The difference isn&apos;t
              incremental — it&apos;s a generation leap.
            </p>
          </div>

          <div className="space-y-6">
            {beforeAfter.map((item) => (
              <div key={item.category} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                {/* Category header */}
                <div className="flex items-center justify-between bg-primary px-6 py-3">
                  <h3 className="text-white font-semibold text-sm">{item.category}</h3>
                  <span className="text-teal text-xs font-semibold bg-teal/10 px-2.5 py-1 rounded-full">
                    {item.impact}
                  </span>
                </div>
                {/* Before / After columns */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="px-6 py-5 md:border-r border-gray-100">
                    <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Today (without AiDent)</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.before}</p>
                  </div>
                  <div className="px-6 py-5 bg-teal/[0.02]">
                    <p className="text-xs font-semibold text-teal uppercase tracking-wider mb-2">With AiDent</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIVE DEMO CALLOUT ===== */}
      <section className="showcase-dark section-padding bg-grid">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            Live System
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            This isn&apos;t a mockup. It&apos;s the real system.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The demo site runs the actual AiDent platform. Fill out the intake form and
            a real SMS gets sent to your phone. Book an appointment and it shows up in the
            live dashboard. Talk to the AI receptionist. It&apos;s all working, right now.
          </p>
          <a
            href="https://tannklinikk-demo.gbone.no/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-teal text-lg px-8 py-4"
          >
            Try the Live Demo
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>

      {/* ===== WHY THIS MATTERS (for any business) ===== */}
      <section className="bg-white section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-3">The Bigger Picture</p>
              <h2 className="text-3xl font-bold text-primary mb-4">
                This is what AI does to any industry.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AiDent is one product for one vertical. But the pattern applies everywhere: every
                industry has manual processes that run on outdated software, where an AI system
                could handle the work faster, cheaper, and more reliably than the current approach.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Dental clinics were the first. The same architecture — AI-powered communication,
                intelligent scheduling, predictive analytics, automated back-office tasks — can
                be adapted for physiotherapy, legal firms, accounting practices, auto shops, or
                any appointment-based business.
              </p>
              <p className="text-gray-700 font-medium">
                If your industry still runs on software that was designed before the smartphone
                existed, Martin Solutions can build something like this for you.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Your business still runs on manual processes', desc: 'Staff spending hours on tasks AI can handle in seconds. Phone calls, follow-ups, scheduling, data entry.' },
                { title: 'Your software was built for a different era', desc: 'The tools you use store data and manage records. They don\'t think, predict, or communicate on your behalf.' },
                { title: 'You\'re losing money you can\'t see', desc: 'Missed appointments, forgotten follow-ups, unanswered calls. Revenue leaks that only become visible when AI plugs them.' },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-base font-bold text-primary mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BUILT BY MARTIN SOLUTIONS ===== */}
      <section className="bg-gray-50 section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-teal font-semibold text-sm tracking-wide uppercase mb-3">How It Was Built</p>
          <h2 className="text-3xl font-bold text-primary mb-6">
            From zero to a live product — built with AI.
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            AiDent was designed, developed, and deployed by Martin Solutions. The platform runs on
            n8n for workflow automation, Claude AI for natural language understanding, Vapi for
            voice, and integrates directly with Opus Dental — the system used by 3,500+
            Norwegian clinics.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            It&apos;s self-hosted, GDPR compliant, and speaks fluent Norwegian. No generic
            global SaaS tool can match this level of depth for the Norwegian market — and that&apos;s
            the point. Generic tools do generic work. Custom AI does transformative work.
          </p>
          <Link href="/contact" className="btn-primary">
            Let&apos;s Talk About Your Industry
          </Link>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-primary to-slate-900 text-white section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See what AI can do for your business.
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            AiDent proves the concept. Now imagine it applied to your industry.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://tannklinikk-demo.gbone.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal text-lg px-8 py-4"
            >
              Try AiDent Demo
            </a>
            <Link href="/contact" className="btn-outline border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
