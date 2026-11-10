import { useRef, useState } from 'react'
import { Star, ExternalLink } from 'lucide-react'
import { googleRating, reviews } from '../config/research'
import { site } from '../config/site'
import { Reveal, SectionHeading } from './ui'

function GoogleG(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  )
}

const Stars = () => (
  <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5 on Google">
    {Array.from({ length: 5 }).map((_, s) => (
      <Star key={s} className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
    ))}
  </div>
)

export default function Testimonials() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Which card is showing in the phone swipe row
  const onTrackScroll = () => {
    const el = trackRef.current
    const card = el?.firstElementChild
    if (!el || !card) return
    const step = card.getBoundingClientRect().width + 16 // card + gap-4
    setActive(Math.min(reviews.length - 1, Math.round(el.scrollLeft / step)))
  }
  const goTo = (i) => {
    const el = trackRef.current
    const card = el?.children[i]
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 16, behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="section relative bg-pitch-900" aria-labelledby="testimonials-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading eyebrow="Google reviews" title={<span id="testimonials-title">What Parents &amp; Players Say</span>} />
          <Reveal delay={80} className="flex flex-col gap-5 rounded-3xl border border-line bg-pitch-800 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <GoogleG className="h-10 w-10 shrink-0" />
              <div>
                <p className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-extrabold leading-none">{googleRating.rating}</span>
                  <span className="text-sm text-muted">/ 5</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  {googleRating.count} reviews on Google · {googleRating.asOf}
                </p>
              </div>
            </div>
            <a href={site.googleMaps} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0">
              Read all on Google <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        {/* Phones: swipeable row (one card per screen, next card peeking). Tablet/desktop: masonry grid. */}
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:mx-0 md:mt-12 md:block md:columns-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:columns-3 [&::-webkit-scrollbar]:hidden"
          aria-label="Google reviews — swipe to see more"
        >
          {reviews.map((r, i) => (
            <Reveal
              key={r.name}
              as="figure"
              delay={(i % 3) * 80}
              className={`w-[85%] shrink-0 snap-start rounded-3xl border p-6 shadow-xl shadow-accent/10 md:mb-5 md:w-auto md:break-inside-avoid ${
                r.featured ? 'border-accent/40 bg-gradient-to-br from-pitch-600/70 to-pitch-800' : 'border-line bg-pitch-800'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <Stars />
                <GoogleG className="h-5 w-5" />
              </div>
              <blockquote className={`mt-4 leading-relaxed text-muted ${r.featured ? 'text-base sm:text-lg' : 'text-sm'}`}>“{r.text}”</blockquote>
              {r.translated && <p className="mt-2 text-[11px] text-muted/80">Translated from Hindi by Google</p>}
              <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-600 font-display text-lg font-bold uppercase text-pitch-950" aria-hidden="true">
                  {r.name.trim()[0]}
                </span>
                <span>
                  <span className="block text-sm font-semibold capitalize">{r.name.toLowerCase()}</span>
                  <span className="block text-xs text-muted/80">{r.badge ? `${r.badge} · ` : ''}Google review</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        {/* Phone-only: position dots + swipe hint */}
        <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
          <div className="flex items-center gap-1.5">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show review ${i + 1} of ${reviews.length}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-accent' : 'w-2 bg-line'}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted">Swipe →</span>
        </div>

        <p className="mt-4 text-center text-xs text-muted/80">
          Reviews are quoted as written on Google. Some are shortened (marked …).
        </p>
      </div>
    </section>
  )
}
