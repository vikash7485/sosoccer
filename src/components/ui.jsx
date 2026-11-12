import { useEffect, useRef, useState } from 'react'
import { ImagePlus } from 'lucide-react'

/* Safety net for Reveal: one shared scroll check that shows any block whose top has
   reached the screen, even if IntersectionObserver missed it (fast flick-scrolls,
   menu jumps, in-app browsers like Instagram/WhatsApp). */
const pending = new Map() // element -> show()
let ticking = false
function checkPending() {
  ticking = false
  const limit = window.innerHeight * 0.95
  pending.forEach((show, el) => {
    if (el.getBoundingClientRect().top < limit) {
      show()
      pending.delete(el)
    }
  })
}
function onScrollCheck() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(checkPending)
  }
}
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', onScrollCheck, { passive: true })
  window.addEventListener('resize', onScrollCheck, { passive: true })
  window.addEventListener('load', onScrollCheck)
}

/** Fades children in when they scroll into view — content can never get stuck hidden. */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const show = () => setVisible(true)

    // Already on screen (or scrolled past) when the page loads → show straight away
    if (!('IntersectionObserver' in window) || el.getBoundingClientRect().top < window.innerHeight) {
      show()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        // any pixel visible, or the block is already above the screen
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          show()
          pending.delete(el)
          io.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    pending.set(el, show)
    return () => {
      io.disconnect()
      pending.delete(el)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${variant !== 'up' ? `reveal-${variant}` : ''} ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Number that counts up when it scrolls into view, e.g. "114", "4.9★", "1.3K", "2009". */
export function CountUp({ value, duration = 1600, className = '' }) {
  const m = String(value).match(/^([\d.]+)(.*)$/)
  const target = m ? parseFloat(m[1]) : NaN
  const suffix = m ? m[2] : ''
  const decimals = m && m[1].includes('.') ? m[1].split('.')[1].length : 0
  const from = target > 1900 && target < 2100 ? target - 30 : 0 // years count up from a few decades back
  const ref = useRef(null)
  const [n, setN] = useState(from)

  useEffect(() => {
    const el = ref.current
    if (!el || isNaN(target)) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return setN(target)
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        setN(from + (target - from) * eased)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [target, from, duration])

  if (isNaN(target)) return <span className={className}>{value}</span>
  return (
    <span ref={ref} className={className} aria-label={String(value)}>
      <span aria-hidden="true">{n.toFixed(decimals)}{suffix}</span>
    </span>
  )
}

/** Thin gold bar at the very top that fills as the page is scrolled. */
export function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return <div ref={ref} className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-accent to-accent-600" aria-hidden="true" />
}

export function SectionHeading({ eyebrow, title, intro, center = false }) {
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="eyebrow">
        <span className="eyebrow-line h-px bg-accent" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="section-title">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </Reveal>
  )
}

/**
 * Responsive, lazy-loaded photo from /public/images (generated by `npm run images`).
 * If the file hasn't been added yet, shows a clearly labelled placeholder.
 */
export function SmartImage({ file, alt, hint, className = '', sizes = '100vw', eager = false, label = true }) {
  const [failed, setFailed] = useState(false)
  const base = `/images/${file}`

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-pitch-700 via-pitch-800 to-pitch-950 ${className}`}
      >
        <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
          <defs>
            <pattern id={`stripes-${file}`} width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="40" height="80" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#stripes-${file})`} />
        </svg>
        {label === 'compact' && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-dashed border-accent/50 bg-pitch-950/80 px-2.5 py-1 text-[10px] text-muted">
            <ImagePlus className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <code className="text-accent">{file}.jpg</code>
          </div>
        )}
        {label === true && (
          <div className="relative mx-4 rounded-2xl border border-dashed border-accent/50 bg-pitch-950/70 px-4 py-3 text-center text-xs text-muted">
            <ImagePlus className="mx-auto mb-1.5 h-5 w-5 text-accent" aria-hidden="true" />
            <p className="font-semibold text-ink">PHOTO PLACEHOLDER</p>
            <p className="mt-0.5">
              Add <code className="text-accent">raw-images/{file}.jpg</code>
            </p>
            {hint && <p className="mt-0.5 text-muted/80">{hint}</p>}
          </div>
        )}
      </div>
    )
  }

  return (
    <img
      src={`${base}-1280.webp`}
      srcSet={`${base}-640.webp 640w, ${base}-1280.webp 1280w, ${base}-1920.webp 1920w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}

/* Brand icons (lucide no longer ships brand logos) */
export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V10.5H7.8v3h2.6V21h3.1z" />
    </svg>
  )
}

export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm0-21.6C5.5.2.2 5.5.2 12c0 2.1.5 4.1 1.6 5.9L.1 23.9l6.2-1.6A11.8 11.8 0 0 0 23.8 12C23.8 5.5 18.5.2 12 .2z" />
    </svg>
  )
}

export function Logo({ className = '' }) {
  return (
    <a href="#home" className={`group flex items-center gap-2.5 ${className}`} aria-label="School of Soccer — home">
      <img src="/favicon.svg" alt="" width="40" height="40" className="h-10 w-10 transition-transform duration-700 ease-out group-hover:rotate-[360deg] motion-reduce:transition-none" />
      <span className="whitespace-nowrap font-display text-xl font-extrabold uppercase leading-none tracking-wide">
        School <span className="text-accent">of</span> Soccer
      </span>
    </a>
  )
}
