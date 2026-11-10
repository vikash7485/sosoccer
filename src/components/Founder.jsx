import { Quote, Flag, Users, Sprout } from 'lucide-react'
import { founder, googleRating } from '../config/research'
import { Reveal, SectionHeading } from './ui'

const facts = [
  { icon: Flag, label: 'Founded', value: `${founder.established}, Samastipur` },
  { icon: Users, label: 'Teams', value: 'Boys’ & girls’ teams (girls since 2016)' },
  { icon: Sprout, label: 'Mission', value: 'Grassroots football development in Bihar' },
]

export default function Founder() {
  return (
    <section id="founder" className="section relative overflow-hidden bg-pitch-900" aria-labelledby="founder-title">
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="container-x relative grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        {/* Typographic panel (no photos) — pitch markings drawn in CSS/SVG lines */}
        <Reveal className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-pitch-600 via-pitch-700 to-pitch-900 p-8 shadow-2xl shadow-accent/10 sm:p-10">
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent/[0.10]">
                <rect x="20" y="20" width="360" height="440" rx="4" />
                <line x1="20" y1="240" x2="380" y2="240" />
                <circle cx="200" cy="240" r="62" />
                <rect x="110" y="20" width="180" height="80" />
                <rect x="110" y="380" width="180" height="80" />
              </g>
            </svg>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">The academy</p>
              <p className="mt-3 font-display text-7xl font-extrabold leading-[0.85] text-accent sm:text-8xl">
                EST.
                <br />
                {founder.established}
              </p>
              <p className="mt-4 text-base font-semibold text-ink">S.O.S Warriors · Samastipur</p>
              <div className="my-8 h-px bg-gradient-to-r from-accent/60 via-line to-transparent" aria-hidden="true" />
              <div className="flex items-end gap-4">
                <p className="font-display text-6xl font-extrabold leading-none">
                  {googleRating.rating}
                  <span className="text-accent">★</span>
                </p>
                <p className="pb-1.5 text-sm text-muted">{googleRating.count} Google reviews</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="Meet the founder" title={<span id="founder-title">{founder.name}</span>} />
          <Reveal delay={80}>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-accent">{founder.title}</p>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Ranjan Gandhi founded School of Soccer in Samastipur in {founder.established}. He built the S.O.S Warriors around grassroots
              football, then started a girls’ team on 1 October 2016. Today the academy coaches both girls and boys at Patel Field.
              Players and parents describe him as a hard-working coach who is dedicated to his students’ futures in district, state and
              national level football.
            </p>
          </Reveal>

          <Reveal delay={140} as="figure" className="mt-8 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-7">
            <Quote className="h-8 w-8 text-accent" aria-hidden="true" />
            <blockquote className="mt-3 font-display text-2xl font-bold uppercase leading-tight sm:text-3xl">“{founder.quote}”</blockquote>
            <figcaption className="mt-3 text-xs text-muted/80">— {founder.name}, {founder.quoteSource}</figcaption>
          </Reveal>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {facts.map(({ icon: Icon, label, value }, i) => (
              <Reveal key={label} delay={180 + i * 60} className="rounded-2xl border border-line bg-pitch-800 p-4">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted/80">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-ink">{value}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={260} className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted/80">What his players say</p>
            <ul className="mt-3 grid gap-2">
              {founder.praise.map((p) => (
                <li key={p.by} className="border-l-2 border-accent/60 pl-4 text-sm italic text-muted">
                  “{p.text}” <span className="not-italic text-muted/80">— {p.by}, Google review</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-muted/80">
              Motto from his Instagram: <span className="italic text-muted">“{founder.motto}”</span> ({founder.mottoSource.replace('Instagram bio, ', '')})
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
