import { useEffect, useRef, useState } from 'react'
import { Phone, ArrowRight, ChevronDown } from 'lucide-react'
import { externalLink, site, whatsappLink } from '../config/site'
import { WhatsAppIcon } from './ui'

/**
 * Background video — the academy's 6-second clip from its Google Business Profile.
 * 480p on phones, 720p on larger screens; muted, looping, no controls.
 * Pauses when scrolled out of view and stays on the poster frame for
 * visitors who prefer reduced motion.
 */
function HeroVideo() {
  const ref = useRef(null)
  const [src] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      ? '/videos/hero-480.mp4'
      : '/videos/hero-720.mp4',
  )

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      video.pause()
      return
    }
    video.play().catch(() => {}) // some browsers need an explicit play() call
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    })
    io.observe(video)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      src={src}
      poster="/videos/hero-poster.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}

const trust = ['Football Coaching', 'Fitness Training', 'Kids & Youth Batches', 'Samastipur']

function FieldGraphics() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="white" strokeOpacity="0.13" strokeWidth="2">
        <rect className="field-line" x="80" y="90" width="1440" height="720" rx="6" />
        <line className="field-line" x1="800" y1="90" x2="800" y2="810" />
        <circle className="field-line" cx="800" cy="450" r="120" />
        <rect className="field-line" x="80" y="260" width="200" height="380" />
        <rect className="field-line" x="1320" y="260" width="200" height="380" />
        <path className="field-line" d="M280 380 A 90 90 0 0 1 280 520" />
        <path className="field-line" d="M1320 380 A 90 90 0 0 0 1320 520" />
      </g>
      <circle cx="800" cy="450" r="5" fill="white" fillOpacity="0.25" />
      {/* Slowly rolling ball */}
      <g className="hero-ball" opacity="0.5">
        <g className="spin-slow">
          <circle r="14" fill="white" />
          <path d="M0 -6 L5.7 -1.9 L3.5 4.9 L-3.5 4.9 L-5.7 -1.9 Z" fill="#05180f" />
        </g>
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      {/* Background video */}
      <div className="absolute inset-0 -z-10 bg-black">
        <HeroVideo />
        {/* Dark gradient overlay: black/transparent → dark green */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-pitch-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <FieldGraphics />
      </div>

      <div className="container-x flex flex-1 flex-col justify-center text-white pb-16 pt-32 sm:pt-36">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Football Academy in Samastipur
          </span>

          <h1 id="hero-title" className="mt-6 text-[3.4rem] font-extrabold uppercase leading-[0.88] sm:text-7xl lg:text-[6.5rem]">
            Learn. Play.
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-600 bg-clip-text text-transparent">Grow</span> with Football.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Professional football coaching for young players in Samastipur. Build skills, fitness, confidence, and teamwork.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={whatsappLink()} {...externalLink} className="btn-primary !px-8 text-base">
              Join Now <ArrowRight className="h-4 w-4" />
            </a>
            <a href={site.phoneHref} className="btn-outline !border-white/80 !text-white !px-8 text-base hover:!bg-white hover:!text-[#0b0b0f]">
              <Phone className="h-4 w-4" /> Call Us
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !px-8 text-base">
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
            </a>
          </div>

          <p className="mt-6 text-sm text-white/75">
            Open {site.timings} · {site.addressShort}
          </p>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative border-y border-line bg-pitch-950/70 backdrop-blur-md">
        <ul className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted lg:justify-between sm:text-sm">
          {trust.map((t, i) => (
            <li key={t} className="flex items-center gap-6">
              {i > 0 && <span className="hidden h-1.5 w-1.5 rotate-45 bg-accent lg:block" aria-hidden="true" />}
              {t}
            </li>
          ))}
        </ul>
      </div>

      <a href="#about" className="absolute bottom-20 right-6 hidden h-11 w-11 place-items-center rounded-full border border-white/30 text-white/80 transition hover:text-accent md:grid" aria-label="Scroll to About section">
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}
