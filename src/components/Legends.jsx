import { useEffect, useRef, useState } from 'react'
import { Quote, ArrowRight } from 'lucide-react'
import { externalLink, whatsappLink } from '../config/site'
import { Reveal, SectionHeading } from './ui'

const QUOTE_MS = 6000

// Widely published quotes, shown with attribution only — no player photos or logos,
// so nothing suggests the players endorse or are linked to the academy.
const legends = [
  {
    name: 'Cristiano Ronaldo',
    note: '5× Ballon d’Or winner',
    quote: 'Talent without working hard is nothing.',
  },
  {
    name: 'Lionel Messi',
    note: '8× Ballon d’Or winner',
    quote: 'You have to fight to reach your dream. You have to sacrifice and work hard for it.',
  },
  {
    name: 'Pelé',
    note: '3× FIFA World Cup winner',
    quote: 'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.',
  },
]

export default function Legends() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [hover, setHover] = useState(false)
  const ref = useRef(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const playing = inView && !hover && !reduce
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setActive((a) => (a + 1) % legends.length), QUOTE_MS)
    return () => clearTimeout(t)
  }, [playing, active])

  const l = legends[active]

  return (
    <section ref={ref} id="legends" className="section relative isolate overflow-hidden" aria-labelledby="legends-title">
      {/* Stadium backdrop with slow zoom + deep blue tint */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <img src="/videos/hero-poster.webp" alt="" loading="lazy" decoding="async" className="legends-zoom h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-pitch-950/95 via-pitch-950/80 to-pitch-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_70%)]" />
      </div>

      <div className="container-x relative">
        <SectionHeading center eyebrow="Legends’ words" title={<span id="legends-title">Dream Big. Work Harder.</span>} />

        <Reveal variant="zoom" className="mx-auto mt-12 max-w-4xl" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <figure className="relative rounded-[2rem] border border-white/15 bg-white/[0.06] px-6 py-10 text-center shadow-2xl shadow-black/40 backdrop-blur-md sm:px-14 sm:py-14">
            <Quote className="mx-auto h-10 w-10 text-accent sm:h-12 sm:w-12" aria-hidden="true" />
            <div key={active} className="why-fade" aria-live={playing ? 'off' : 'polite'}>
              <blockquote className="mt-6 font-display text-3xl font-extrabold uppercase leading-[1.05] text-ink sm:text-5xl">
                “{l.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <span className="block font-display text-xl font-bold uppercase tracking-wide text-accent sm:text-2xl">— {l.name}</span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">{l.note}</span>
              </figcaption>
            </div>

            {/* timer bar */}
            <div className="absolute inset-x-8 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div key={`${active}-${playing}`} className={`h-full bg-accent ${playing ? 'why-progress' : 'w-0'}`} style={{ animationDuration: `${QUOTE_MS}ms` }} />
            </div>
          </figure>

          {/* Name tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Choose a legend’s quote">
            {legends.map((x, i) => (
              <button
                key={x.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  i === active ? 'border-accent bg-accent text-pitch-950' : 'border-white/25 text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {x.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="text-lg font-medium text-ink sm:text-xl">
            Every legend started on a ground like <span className="font-bold text-accent">Patel Field</span>. Your journey can start today.
          </p>
          <a href={whatsappLink()} {...externalLink} className="btn-primary shine-loop !px-8 text-base">
            Join Now <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="text-[11px] text-muted/80">
            Quotes are publicly attributed to the players named. School of Soccer is not affiliated with or endorsed by them.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
