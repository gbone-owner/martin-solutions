import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AiDent — AI-Powered Clinic Operations',
  description:
    'See what happens when you replace manual clinic operations with AI. AiDent automates patient communication, appointments, and back-office work for Norwegian dental clinics.',
};

const systemLog = [
  { icon: '📲', text: 'Påminnelse sendt', detail: 'til Maria Andersen', time: '08:01 — automatisk', tag: 'SMS', tagClass: 'bg-blue-500/15 text-blue-400' },
  { icon: '🚫', text: 'No-show registrert:', detail: 'Kari Olsen — oppfølging-SMS sendt', time: '09:14 — AI oppfølging', tag: 'No-show', tagClass: 'bg-red-500/15 text-red-400' },
  { icon: '⭐', text: 'Anmeldelses-forespørsel', detail: 'sendt til Ole Johansen', time: '10:32 — etter behandling', tag: 'Anmeldelse', tagClass: 'bg-yellow-500/15 text-yellow-400' },
  { icon: '🤖', text: 'AI-oppfølging sendt:', detail: 'Erik Berg — anbefalt rotfylling', time: '11:05 — personlig AI-melding', tag: 'AI SMS', tagClass: 'bg-teal/15 text-teal' },
  { icon: '📋', text: 'Ventelistetilbud', detail: 'sendt til Ingrid, Per og Tone — ledig 14:30', time: '11:22 — avbestilling mottatt', tag: 'Venteliste', tagClass: 'bg-purple-500/15 text-purple-400' },
  { icon: '📲', text: 'Ingrid svarte JA', detail: '— time bekreftet, Per og Tone varslet', time: '11:23 — 48 sekunder', tag: 'Bekreftet', tagClass: 'bg-blue-500/15 text-blue-400' },
];

const beforeAfterCards = [
  {
    icon: '📲',
    title: 'Appointment Reminders',
    impact: 'Saves 1–2 hours daily',
    before: {
      text: 'Receptionist opens the schedule, copies each patient\'s number, and sends a template SMS one by one. Takes 30–60 minutes every morning. Often gets skipped when the clinic is busy.',
      visual: ['📋 Åpne kalender', '📱 Kopier nummer → lim inn i SMS', '✍️ "Hei, du har time kl 10:00 imorgen"', '🔁 Gjenta ×30 pasienter...', '⏰ 45 min brukt'],
    },
    after: {
      text: 'Every morning at 08:00, AiDent reads tomorrow\'s schedule and sends a personalised reminder to every patient. Each message is unique — not a template. Zero human effort.',
      visual: ['✅ 08:00 — 28 påminnelser sendt', '✅ Maria: "Hei Maria, husk timen din kl 10..."', '✅ Ole: "Hei Ole, vi ser frem til..."', '✅ Alle personalisert av AI', '⏱️ 0 min brukt av resepsjonen'],
    },
  },
  {
    icon: '💬',
    title: 'Patient Replies',
    impact: 'Two-way AI conversations',
    before: {
      text: 'Patient texts back "kan jeg flytte til torsdag?" — receptionist reads the message, opens the calendar, finds a slot, replies, and updates the system. This happens 20+ times a day.',
      visual: null,
    },
    after: {
      text: 'AI reads the message, understands the intent, checks Thursday availability, rebooks the appointment, and confirms — all within seconds. The receptionist only sees a log entry.',
      visual: null,
      sms: [
        { dir: 'in', text: 'Hei, kan jeg flytte timen til torsdag?' },
        { dir: 'out', text: 'Hei Maria! Selvfølgelig. Jeg har ledig kl 14:00 på torsdag. Passer det? 😊' },
        { dir: 'in', text: 'Ja perfekt!' },
        { dir: 'out', text: 'Flott, timen din er flyttet til torsdag kl 14:00. Vi ses da! ✅' },
      ],
    },
  },
  {
    icon: '⚡',
    title: 'Cancellations & Waitlist',
    impact: 'Fills empty slots in <60 seconds',
    before: {
      text: 'Patient cancels. Receptionist looks at a paper waitlist, calls 3–5 people one by one. Most don\'t answer their phone. The slot often goes unfilled. Revenue lost.',
      visual: null,
    },
    after: {
      text: 'Cancellation detected → top 3 waitlist patients get an SMS instantly → first to reply JA gets the slot → others get a polite update. Under 60 seconds.',
      visual: ['🔔 Avbestilling mottatt: kl 14:30', '📤 SMS sendt til Ingrid, Per, Tone', '✅ Ingrid svarte JA (48 sek)', '📩 Per og Tone fått oppdatering', '💰 Tapt time → fylt time'],
    },
  },
  {
    icon: '🎯',
    title: 'No-Show Prediction',
    impact: 'Prevents before it happens',
    before: {
      text: 'Patient doesn\'t show up. The chair sits empty for an hour. The clinic loses 1 000–3 000 kr. Nobody saw it coming because nobody was looking.',
      visual: null,
    },
    after: {
      text: 'Every hour, AI scores upcoming appointments for no-show risk based on patient history, time of day, past behaviour. High-risk patients automatically get an extra personalised reminder.',
      visual: ['📊 Risiko-scoring kjørt kl 07:00', '⚠️ Kari Olsen: 73% no-show risiko', '📲 Ekstra påminnelse sendt automatisk', '✅ Kari bekreftet timen kl 07:12', '🎯 No-show forhindret'],
    },
  },
];

export default function AiDentPage() {
  return (
    <div className="bg-[#06090f] min-h-screen text-white">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-24">
        {/* Subtle glow */}
        <div className="absolute w-[800px] h-[500px] -top-24 -right-48 bg-teal/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1140px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 text-teal text-[11px] font-semibold tracking-wider uppercase mb-5">
                <span className="w-1.5 h-1.5 bg-teal rounded-full shadow-[0_0_8px_theme(colors.teal)]" style={{ animation: 'pulse 2s ease infinite' }} />
                Built by Martin Solutions
              </div>
              <h1 className="text-[48px] md:text-[56px] font-extrabold leading-[1.05] tracking-tight mb-2">
                Ai<span className="text-teal">Dent</span>
              </h1>
              <p className="text-[20px] text-white/40 font-light mb-5">
                The AI that runs your clinic.
              </p>
              <p className="text-[15px] text-white/45 leading-relaxed max-w-[440px] mb-8">
                Norwegian dental clinics lose 150 000 kr/year to no-shows, miss 300+ calls
                a month, and run on software built before the smartphone existed. AiDent
                replaces the entire communication layer with AI.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://tannklinikk-demo.gbone.no/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-black font-semibold text-sm rounded-[10px] hover:bg-[#16dbb5] hover:shadow-[0_0_30px_rgba(26,188,156,0.25)] transition-all duration-200"
                >
                  Try the Live System →
                </a>
                <a
                  href="#before-after"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white/50 border border-white/[0.06] font-medium text-sm rounded-[10px] hover:text-white hover:border-white/15 transition-all duration-200"
                >
                  See the contrast ↓
                </a>
              </div>
            </div>

            {/* Right: System Log Mockup */}
            <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c1220] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              {/* Window bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111827] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span className="text-[11px] text-white/40 font-medium">AiDent System Log</span>
                <div className="flex items-center gap-1.5 text-[10px] text-teal font-semibold">
                  <span className="w-1.5 h-1.5 bg-teal rounded-full" style={{ animation: 'pulse 2s ease infinite' }} />
                  LIVE
                </div>
              </div>
              {/* Log entries */}
              <div className="p-4 space-y-1.5">
                {systemLog.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] bg-white/[0.02] border border-transparent hover:border-white/[0.06] hover:bg-white/[0.04] transition-all">
                    <span className="text-[13px]">{entry.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-white/50 leading-snug">
                        <span className="text-white/80 font-semibold">{entry.text}</span>{' '}{entry.detail}
                      </p>
                      <p className="text-[10px] text-white/20 mt-0.5">{entry.time}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wide whitespace-nowrap ${entry.tagClass}`}>
                      {entry.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="border-t border-b border-white/[0.06] py-10">
        <div className="max-w-[1140px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: '~15%', label: 'No-show rate i Norge', color: 'text-red-400' },
              { value: '150 000 kr', label: 'Tapt omsetning per klinikk/år', color: 'text-red-400' },
              { value: '300+', label: 'Tapte samtaler per måned', color: 'text-red-400' },
              { value: '−30%', label: 'Færre no-shows med AiDent', color: 'text-teal' },
            ].map((stat, i) => (
              <div key={i} className="text-center relative py-2">
                {i < 3 && <div className="hidden md:block absolute right-0 top-[20%] h-[60%] w-px bg-white/[0.06]" />}
                <p className={`text-[32px] font-extrabold tracking-tight ${stat.color}`}>{stat.value}</p>
                <p className="text-[12px] text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEFORE / AFTER ===== */}
      <section id="before-after" className="py-24">
        <div className="max-w-[1140px] mx-auto px-8">
          <div className="mb-16">
            <p className="text-[11px] font-semibold text-teal tracking-widest uppercase mb-3">Before &amp; After</p>
            <h2 className="text-[40px] font-extrabold tracking-tight leading-[1.1] mb-3">
              What changes when AI takes over.
            </h2>
            <p className="text-[15px] text-white/50 max-w-[500px] leading-relaxed">
              Every card below is a real daily workflow. On the left: how clinics handle it today.
              On the right: what AiDent does instead.
            </p>
          </div>

          <div className="space-y-6">
            {beforeAfterCards.map((card) => (
              <div key={card.title} className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c1220]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-3.5 bg-[#111827] border-b border-white/[0.06]">
                  <span className="text-sm font-bold">{card.icon} {card.title}</span>
                  <span className="text-[11px] font-semibold text-teal bg-teal/[0.08] px-2.5 py-1 rounded-md">{card.impact}</span>
                </div>

                {/* Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Before */}
                  <div className="p-6 md:border-r border-white/[0.06]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-400/80 mb-3">Today</p>
                    <p className="text-[13px] text-white/45 leading-relaxed">{card.before.text}</p>
                    {card.before.visual && (
                      <div className="mt-4 rounded-[10px] overflow-hidden border border-white/[0.06]">
                        <div className="px-3 py-2 bg-[#111827] border-b border-white/[0.06] flex gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
                        </div>
                        <div className="p-3.5 font-mono text-[11px] text-white/20 leading-relaxed">
                          {card.before.visual.map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* After */}
                  <div className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-teal mb-3">With AiDent</p>
                    <p className="text-[13px] text-white/65 leading-relaxed">{card.after.text}</p>

                    {card.after.visual && (
                      <div className="mt-4 rounded-[10px] overflow-hidden border border-white/[0.06]">
                        <div className="px-3 py-2 bg-[#111827] border-b border-teal/15 flex gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal shadow-[0_0_6px_theme(colors.teal)]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-teal/30" />
                        </div>
                        <div className="p-3.5 font-mono text-[11px] text-teal/70 leading-relaxed">
                          {card.after.visual.map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                      </div>
                    )}

                    {/* SMS mockup for patient replies card */}
                    {(card.after as { sms?: { dir: string; text: string }[] }).sms && (
                      <div className="mt-4 max-w-[280px]">
                        <p className="text-[9px] text-white/20 mb-2">AI ↔ Patient</p>
                        {(card.after as { sms: { dir: string; text: string }[] }).sms.map((msg, i) => (
                          <div
                            key={i}
                            className={`px-3.5 py-2.5 rounded-2xl text-[12px] leading-snug mb-1.5 max-w-[85%] ${
                              msg.dir === 'in'
                                ? 'bg-white/[0.05] text-white/45 rounded-bl-sm'
                                : 'bg-blue-500/15 text-blue-400/90 rounded-br-sm ml-auto'
                            }`}
                          >
                            {msg.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIVE DEMO CTA ===== */}
      <section className="text-center py-24 bg-gradient-to-b from-[#06090f] via-teal/[0.03] to-[#06090f] border-t border-b border-white/[0.06]">
        <div className="max-w-[500px] mx-auto px-8">
          <div className="inline-flex items-center gap-2 text-teal text-[11px] font-semibold tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 bg-teal rounded-full shadow-[0_0_8px_theme(colors.teal)]" style={{ animation: 'pulse 2s ease infinite' }} />
            Live System — Not a Mockup
          </div>
          <h2 className="text-[36px] font-extrabold tracking-tight mb-3">
            See it running. Right now.
          </h2>
          <p className="text-white/45 text-[15px] leading-relaxed mb-8">
            The demo site runs the actual AiDent platform. Fill out the intake form and
            a real SMS gets sent to your phone. Everything you see here is working, live.
          </p>
          <a
            href="https://tannklinikk-demo.gbone.no/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal text-black font-semibold text-base rounded-[10px] hover:bg-[#16dbb5] hover:shadow-[0_0_30px_rgba(26,188,156,0.25)] transition-all duration-200"
          >
            Open the Live Demo →
          </a>
        </div>
      </section>

      {/* ===== BIGGER PICTURE ===== */}
      <section className="py-24">
        <div className="max-w-[1140px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-semibold text-teal tracking-widest uppercase mb-3">The Bigger Picture</p>
              <h2 className="text-[36px] font-extrabold tracking-tight leading-[1.1] mb-4">
                This is what AI does to <em>any</em> industry.
              </h2>
              <p className="text-[14px] text-white/45 leading-relaxed mb-3">
                AiDent is one product for one vertical. But the pattern applies everywhere:
                every industry has manual processes running on outdated software, where an AI
                system could handle the work faster, cheaper, and more reliably.
              </p>
              <p className="text-[14px] text-white/45 leading-relaxed mb-3">
                Dental clinics were first. The same architecture adapts to physiotherapy,
                legal, accounting, auto shops — any appointment-based business still running
                on pre-smartphone software.
              </p>
              <p className="text-[14px] text-white/80 font-semibold mt-4">
                If your industry runs on manual processes, Martin Solutions can build this for you.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Your staff spends hours on tasks AI can do in seconds', desc: 'Phone calls, follow-ups, scheduling, data entry — all automatable.' },
                { title: 'Your software was built for a different era', desc: 'It stores data and manages records. It doesn\'t think, predict, or communicate.' },
                { title: 'You\'re losing money you can\'t see', desc: 'Missed appointments, forgotten follow-ups, unanswered calls. Revenue leaks only visible when AI plugs them.' },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-xl bg-[#0c1220] border border-white/[0.06]">
                  <h4 className="text-[14px] font-bold mb-1">{item.title}</h4>
                  <p className="text-[13px] text-white/35 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="text-center py-24 border-t border-white/[0.06]">
        <div className="max-w-[500px] mx-auto px-8">
          <h2 className="text-[32px] font-bold tracking-tight mb-2">
            See what AI can do for your business.
          </h2>
          <p className="text-white/40 mb-8">
            AiDent proves the concept. Now imagine it applied to your industry.
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="https://tannklinikk-demo.gbone.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-black font-semibold text-sm rounded-[10px] hover:bg-[#16dbb5] transition-all"
            >
              Try AiDent Demo
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white/50 border border-white/[0.06] font-medium text-sm rounded-[10px] hover:text-white hover:border-white/15 transition-all"
            >
              Contact Martin Solutions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
