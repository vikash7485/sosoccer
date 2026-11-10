import { Quote, Flag, Users, Sprout } from 'lucide-react'
import { founder, googleRating } from '../config/research'
import { Reveal, SectionHeading, SmartImage } from './ui'

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
        {/* Founder card: portrait on top, academy facts below */}
        <Reveal className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-pitch-600 via-pitch-700 to-pitch-900 shadow-2xl shadow-black/30">
            {/* Portrait */}
            <div className="relative">
              <SmartImage
                file="founder-ranjan"
                alt="Ranjan Gandhi, founder and coach of School of Soccer, Samastipur"
                sizes="(min-width:1024px) 40vw, 448px"
                className="aspect-square w-full object-[50%_18%]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pitch-800 via-pitch-800/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-pitch-950">Founder &amp; Coach</span>
                <p className="mt-2 font-display text-3xl font-extrabold uppercase leading-none text-ink drop-shadow">{founder.name}</p>
              </div>
            </div>

            {/* Academy facts */}
            <div className="relative grid grid-cols-2 divide-x divide-line border-t border-line">
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">The academy</p>
                <p className="mt-1 font-display text-4xl font-extrabold leading-none text-accent sm:text-5xl">EST. {founder.established}</p>
                <p className="mt-1.5 text-xs text-muted">S.O.S Warriors · Samastipur</p>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Google rating</p>
                <p className="mt-1 font-display text-4xl font-extrabold leading-none sm:text-5xl">
                  {googleRating.rating}
                  <span className="text-accent">★</span>
                </p>
                <p className="mt-1.5 text-xs text-muted">{googleRating.count} Google reviews</p>
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
