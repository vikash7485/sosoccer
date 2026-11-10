import { useEffect, useRef, useState } from 'react'
import { Phone, ArrowRight, Clock, MapPin } from 'lucide-react'
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
      {/* Background video — lighter overlay so the football action stays visible */}
      <div className="absolute inset-0 -z-10 bg-black">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-transparent" />
        <FieldGraphics />
      </div>

      {/* Compact headline */}
      <div className="container-x flex flex-1 flex-col justify-center pb-8 pt-28 text-white sm:pt-32">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Football Academy in Samastipur
          </span>

          <h1 id="hero-title" className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] drop-shadow-lg sm:text-5xl lg:text-6xl">
            Learn. Play.
            <br />
            <span className="bg-gradient-to-r from-accent to-accent-600 bg-clip-text text-transparent">Grow</span> with Football.
          </h1>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 drop-shadow sm:text-base">
            Professional football coaching for young players in Samastipur. Build skills, fitness, confidence, and teamwork.
          </p>
        </div>
      </div>

      {/* Action bar: admissions heading + timings, with the three buttons */}
      <div className="container-x relative pb-5 sm:pb-7">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/55 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-md sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="font-display text-lg font-extrabold uppercase tracking-wide text-accent sm:text-xl">Admissions Open</p>
            <div className="mt-1 flex flex-col gap-1 text-sm text-white/85 sm:flex-row sm:flex-wrap sm:gap-x-5">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span><strong className="font-semibold text-white">6:00 AM – 9:00 PM</strong> · all days</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {site.addressShort}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
            <a href={whatsappLink()} {...externalLink} className="btn-primary !min-h-11 !gap-1.5 !px-2 whitespace-nowrap text-[13px] sm:!px-6 sm:text-sm">
              Join Now <ArrowRight className="hidden h-4 w-4 sm:block" />
            </a>
            <a href={site.phoneHref} className="btn-outline !min-h-11 !gap-1.5 !border-white/70 !px-2 whitespace-nowrap text-[13px] !text-white hover:!bg-white hover:!text-[#0b0b0f] sm:!px-6 sm:text-sm">
              <Phone className="h-4 w-4 shrink-0 max-[380px]:hidden" /> Call Us
            </a>
            <a href={whatsappLink()} {...externalLink} className="btn-whatsapp !min-h-11 !gap-1.5 !px-2 whitespace-nowrap text-[13px] sm:!px-6 sm:text-sm">
              <WhatsAppIcon className="h-4 w-4 shrink-0 max-[380px]:hidden" /> <span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">WhatsApp Us</span>
            </a>
          </div>
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

    </section>
  )
}
