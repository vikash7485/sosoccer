import { useEffect, useRef, useState } from 'react'
import { Phone, ArrowRight, Clock, MapPin } from 'lucide-react'
import { externalLink, site, whatsappLink } from '../config/site'
import { WhatsAppIcon } from './ui'
import { useLang } from '../i18n'

/** Current hour/minute in India, whatever time zone the visitor's phone is set to. */
function indiaNow() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date())
  const get = (type) => Number(parts.find((x) => x.type === type)?.value)
  return get('hour') * 60 + get('minute')
}

/** Live badge: "Open now · closes 9 PM (2h 15m left)" / "Opens tomorrow at 6 AM" */
function OpenNowBadge() {
  const { t } = useLang()
  const [mins, setMins] = useState(indiaNow)
  useEffect(() => {
    const id = setInterval(() => setMins(indiaNow()), 30000)
    return () => clearInterval(id)
  }, [])

  const open = site.openHour * 60
  const close = site.closeHour * 60
  const isOpen = mins >= open && mins < close
  let text
  if (isOpen) {
    const left = close - mins
    const h = Math.floor(left / 60)
    const m = left % 60
    const leftEn = h ? `${h}h ${m}m` : `${m}m`
    const leftHi = h ? `${h} घं ${m} मि` : `${m} मि`
    text = t(`Open now · closes 9 PM (${leftEn} left)`, `अभी खुला है · रात 9 बजे बंद (${leftHi} बाकी)`)
  } else if (mins < open) {
    text = t('Closed now · opens today at 6 AM', 'अभी बंद · आज सुबह 6 बजे खुलेगा')
  } else {
    text = t('Closed now · opens tomorrow at 6 AM', 'अभी बंद · कल सुबह 6 बजे खुलेगा')
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
        isOpen ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300' : 'border-red-400/40 bg-red-500/15 text-red-300'
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {isOpen && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-red-400'}`} />
      </span>
      {text}
    </span>
  )
}

/**
 * Background video — floodlit stadium match (13 s), free stock footage from Pexels
 * (pexels.com/video/11918917, Pexels License: free for commercial use, no attribution required).
 * 480p on phones, 720p on larger screens; muted, looping, no controls.
 * Pauses when scrolled out of view and stays on the poster frame for
 * visitors who prefer reduced motion.
 */
function HeroVideo() {
  const ref = useRef(null)
  const [src] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
      ? '/videos/stadium-480.mp4'
      : '/videos/stadium-720.mp4',
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
      poster="/videos/stadium-poster.webp"
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
const trustHi = ['फुटबॉल कोचिंग', 'फिटनेस ट्रेनिंग', 'बच्चों व युवाओं के बैच', 'समस्तीपुर']

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
  const { t, f, lang } = useLang()
  const trustList = lang === 'hi' ? trustHi : trust
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
          <span className="hero-in inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent backdrop-blur" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {t('Football Academy in Samastipur', 'समस्तीपुर की फुटबॉल अकादमी')}
          </span>

          {/* Headline lines rise in one after another */}
          <h1 id="hero-title" className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] drop-shadow-lg sm:text-5xl lg:text-6xl">
            <span className="hero-in inline-block" style={{ animationDelay: '0.25s' }}>{t('Learn.', 'सीखो।')}</span>{' '}
            <span className="hero-in inline-block" style={{ animationDelay: '0.4s' }}>{t('Play.', 'खेलो।')}</span>
            <br />
            <span className="hero-in inline-block" style={{ animationDelay: '0.55s' }}>
              <span className="text-shimmer bg-gradient-to-r from-accent via-[#fff3b0] to-accent bg-clip-text text-transparent">{t('Grow', 'आगे बढ़ो')}</span>
            </span>{' '}
            <span className="hero-in inline-block" style={{ animationDelay: '0.7s' }}>{t('with Football.', 'फुटबॉल के साथ।')}</span>
          </h1>

          <p className="hero-in mt-3 max-w-md text-sm leading-relaxed text-white/85 drop-shadow sm:text-base" style={{ animationDelay: '0.9s' }}>
            {t('Professional football coaching for young players in Samastipur. Build skills, fitness, confidence, and teamwork.', 'समस्तीपुर में युवा खिलाड़ियों के लिए प्रोफेशनल फुटबॉल कोचिंग। स्किल, फिटनेस, आत्मविश्वास और टीमवर्क बनाइए।')}
          </p>
        </div>
      </div>

      {/* Action bar: admissions heading + timings, with the three buttons */}
      <div className="container-x relative pb-5 sm:pb-7">
        <div className="hero-in flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/55 p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-md sm:p-5 lg:flex-row lg:items-center lg:justify-between" style={{ animationDelay: '1.1s' }}>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="font-display text-lg font-extrabold uppercase tracking-wide text-accent sm:text-xl">{t('Admissions Open', 'एडमिशन जारी है')}</p>
              <OpenNowBadge />
            </div>
            <div className="mt-1 flex flex-col gap-1 text-sm text-white/85 sm:flex-row sm:flex-wrap sm:gap-x-5">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span><strong className="font-semibold text-white">{t('6:00 AM – 9:00 PM', 'सुबह 6 – रात 9 बजे')}</strong> · {t('all days', 'हर दिन')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {f(site, 'addressShort')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
            <a href={whatsappLink()} {...externalLink} className="btn-primary shine-loop !min-h-11 !gap-1.5 !px-2 whitespace-nowrap text-[13px] sm:!px-6 sm:text-sm">
              {t('Join Now', 'अभी जुड़ें')} <ArrowRight className="hidden h-4 w-4 sm:block" />
            </a>
            <a href={site.phoneHref} className="btn-outline !min-h-11 !gap-1.5 !border-white/70 !px-2 whitespace-nowrap text-[13px] !text-white hover:!bg-white hover:!text-[#0b0b0f] sm:!px-6 sm:text-sm">
              <Phone className="h-4 w-4 shrink-0 max-[380px]:hidden" /> {t('Call Us', 'कॉल करें')}
            </a>
            <a href={whatsappLink()} {...externalLink} className="btn-whatsapp !min-h-11 !gap-1.5 !px-2 whitespace-nowrap text-[13px] sm:!px-6 sm:text-sm">
              <WhatsAppIcon className="h-4 w-4 shrink-0 max-[380px]:hidden" /> <span className="sm:hidden">WhatsApp</span><span className="hidden sm:inline">{t('WhatsApp Us', 'व्हाट्सऐप करें')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Trust strip — endless scrolling ticker (list repeated twice for a seamless loop) */}
      <div className="ticker relative overflow-hidden border-y border-line bg-pitch-950/70 backdrop-blur-md" aria-label={trustList.join(', ')}>
        <div className="ticker-track flex w-max" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center py-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted sm:text-sm">
              {[...trustList, ...trustList].map((item, i) => (
                <li key={`${copy}-${i}`} className="flex items-center whitespace-nowrap">
                  <span className="px-6 sm:px-10">{item}</span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

    </section>
  )
}
