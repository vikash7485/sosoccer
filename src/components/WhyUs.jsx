import { useCallback, useEffect, useRef, useState } from 'react'
import { Award, ListChecks, HeartPulse, Target, Smile, BarChart3, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { Reveal, SectionHeading, SmartImage } from './ui'

const SLIDE_MS = 5000

// Photos are real academy photos from facebook.com/sosranjan
const features = [
  { icon: Award, file: 'fb-gal-team', alt: 'School of Soccer coach standing with his team in red kit', title: 'Experienced coaching guidance', text: 'Players learn from coaches who know the game and how young athletes grow.' },
  { icon: ListChecks, file: 'fb-why-structure', alt: 'Players in training bibs doing a structured warm-up stretch in a line', title: 'Structured practice sessions', text: 'Every session has a clear plan: warm-up, skill work, game play and cool-down.' },
  { icon: HeartPulse, file: 'fb-why-fitness', alt: 'Players in orange bibs running a fitness drill on the ground', title: 'Fitness and stamina training', text: 'Conditioning that keeps players fast, strong and injury-aware.' },
  { icon: Target, file: 'fb-why-fundamentals', alt: 'Young players working on close ball control during practice', title: 'Focus on football fundamentals', text: 'First touch, passing, positioning and shooting — done right, repeatedly.' },
  { icon: Smile, file: 'fb-why-friendly', alt: 'Smiling young players taking a selfie with their coach', title: 'Friendly and motivating environment', text: 'A safe, encouraging space where kids love coming back to train.' },
  { icon: BarChart3, file: 'fb-why-matches', alt: 'School of Soccer players during a practice match', title: 'Regular practice matches & feedback', text: 'Match practice and performance feedback so every player keeps improving.' },
]

export default function WhyUs() {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [paused, setPaused] = useState(false) // user pressed Pause
  const [reduceMotion, setReduceMotion] = useState(false)
  const sectionRef = useRef(null)
  const touchX = useRef(null)

  const go = useCallback((i) => setActive((i + features.length) % features.length), [])

  // Start sliding only when the section is on screen
  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    if (sectionRef.current) io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  const playing = inView && !hovering && !paused && !reduceMotion

  // Auto-advance; restarting the timer whenever the slide changes (so arrows reset it)
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => go(active + 1), SLIDE_MS)
    return () => clearTimeout(t)
  }, [playing, active, go])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1) }
  }

  const current = features[active]
  const Icon = current.icon

  return (
    <section ref={sectionRef} id="why" className="section relative overflow-hidden" aria-labelledby="why-title">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-pitch-600/25 blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading center eyebrow="Why us" title={<span id="why-title">Why Parents Choose School of Soccer</span>} />

        <Reveal
          className="mt-14 grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Reasons parents choose School of Soccer"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          // Pause for keyboard users only — a mouse click on an arrow must not stop autoplay
          onFocus={(e) => e.target.matches(':focus-visible') && setHovering(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovering(false)}
          onKeyDown={onKeyDown}
        >
          {/* Photo stack — crossfades between slides */}
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line bg-pitch-800 shadow-2xl shadow-accent/10"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current == null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1))
              touchX.current = null
            }}
          >
            {features.map((f, i) => (
              <div
                key={f.file}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={i !== active}
              >
                <SmartImage
                  file={f.file}
                  alt={f.alt}
                  eager={i === 0}
                  sizes="(min-width:1024px) 55vw, 100vw"
                  className={`h-full w-full ${i === active && !reduceMotion ? 'why-kenburns' : ''}`}
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pitch-950/70 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-pitch-950/80 px-3 py-1 font-display text-sm font-bold tracking-wider text-accent backdrop-blur">
              0{active + 1} / 0{features.length}
            </span>
            {/* timer bar */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10" aria-hidden="true">
              <div key={`${active}-${playing}`} className={`h-full bg-accent ${playing ? 'why-progress' : 'w-0'}`} style={{ animationDuration: `${SLIDE_MS}ms` }} />
            </div>
          </div>

          {/* Side text */}
          <div>
            <div key={active} className="why-fade" aria-live={playing ? 'off' : 'polite'}>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-600 text-pitch-950 shadow-lg shadow-accent/20">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <p className="mt-6 font-display text-6xl font-extrabold leading-none text-pitch-600">0{active + 1}</p>
              <h3 className="mt-2 text-3xl font-extrabold uppercase leading-tight sm:text-4xl">{current.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{current.text}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => go(active - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent" aria-label="Previous reason">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(active + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent" aria-label="Next reason">
                <ChevronRight className="h-5 w-5" />
              </button>
              {!reduceMotion && (
                <button type="button" onClick={() => setPaused((p) => !p)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
              )}
              <div className="ml-1 flex items-center gap-1.5">
                {features.map((f, i) => (
                  <button
                    key={f.file}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show reason ${i + 1}: ${f.title}`}
                    aria-current={i === active}
                    className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-accent' : 'w-3 bg-line hover:bg-muted'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
