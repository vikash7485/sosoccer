import { useEffect, useRef, useState } from 'react'
import { Phone, ArrowRight, Clock, MapPin, Star, Trophy } from 'lucide-react'
import { googleRating } from '../config/research'
import { externalLink, site, whatsappLink } from '../config/site'
import { SmartImage, WhatsAppIcon } from './ui'
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
        isOpen ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-red-300 bg-red-50 text-red-700'
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {isOpen && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}`} />
      </span>
      {text}
    </span>
  )
}

/**
 * Opening video — a real 6-second clip of an S.O.S match at Patel Field, from the
 * academy's Google Maps listing (uploaded Dec 2021). Original kept in raw-video/sos-match.mp4.
 * Shown clean, with no text or dark overlay on top. 480p on phones, 720p on
 * larger screens; muted and looping. Pauses when scrolled away and stays on the
 * poster frame for visitors who prefer reduced motion.
 */
function HeroVideo() {
  const ref = useRef(null)
  const [src] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches ? '/videos/sos-match-480.mp4' : '/videos/sos-match-720.mp4',
  )

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      return
    }
    video.play().catch(() => {})
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
      poster="/videos/sos-match-poster.webp"
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

/** Light football-pitch lines drawn in faint blue behind the hero */
function FieldGraphics() {
  return (
    <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="#1d4ed8" strokeOpacity="0.08" strokeWidth="3">
        <rect className="field-line" x="80" y="90" width="1440" height="720" rx="6" />
        <line className="field-line" x1="800" y1="90" x2="800" y2="810" />
        <circle className="field-line" cx="800" cy="450" r="120" />
        <rect className="field-line" x="80" y="260" width="200" height="380" />
        <rect className="field-line" x="1320" y="260" width="200" height="380" />
      </g>
    </svg>
  )
}

/** Collage of real academy photos (Facebook + Google Maps) with floating stat badges */
function PhotoCollage() {
  const { t } = useLang()
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-sun/50 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-accent-600/25 blur-2xl" aria-hidden="true" />
      <div className="relative grid grid-cols-5 grid-rows-2 gap-3 sm:gap-4">
        <div className="hero-in col-span-3 row-span-2 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-accent/20" style={{ animationDelay: '0.3s' }}>
          <SmartImage file="fb-training-day" eager label={false} alt="Girls and boys training with cones at Patel Field, Samastipur" sizes="(min-width:1024px) 30vw, 60vw" className="h-full min-h-[260px] w-full object-cover sm:min-h-[380px]" />
        </div>
        <div className="hero-in col-span-2 overflow-hidden rounded-[1.5rem] border-4 border-white shadow-xl shadow-accent/20" style={{ animationDelay: '0.5s' }}>
          <SmartImage file="fb-girls-trophy" eager label={false} alt="S.O.S girls team holding a trophy" sizes="(min-width:1024px) 20vw, 40vw" className="h-full w-full object-cover" />
        </div>
        <div className="hero-in col-span-2 overflow-hidden rounded-[1.5rem] border-4 border-white shadow-xl shadow-accent/20" style={{ animationDelay: '0.7s' }}>
          <SmartImage file="g-lineup" eager label={false} alt="School of Soccer players lined up before a match" sizes="(min-width:1024px) 20vw, 40vw" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* floating badges */}
      <div className="hero-in absolute -left-2 top-6 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl shadow-accent/15 sm:-left-6" style={{ animationDelay: '0.9s' }}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-sun text-ink"><Star className="h-5 w-5 fill-current" aria-hidden="true" /></span>
        <span className="leading-tight">
          <span className="block font-display text-xl font-extrabold text-ink">{googleRating.rating.toFixed(1)} / 5</span>
          <span className="block text-[11px] text-muted">{googleRating.count} {t('Google reviews', 'गूगल रिव्यू')}</span>
        </span>
      </div>
      <div className="hero-in absolute -bottom-5 right-4 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-xl shadow-accent/15 sm:right-10" style={{ animationDelay: '1.05s' }}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-white"><Trophy className="h-5 w-5" aria-hidden="true" /></span>
        <span className="leading-tight">
          <span className="block font-display text-xl font-extrabold text-ink">{t('Since 2009', '2009 से')}</span>
          <span className="block text-[11px] text-muted">{t('Boys & girls teams', 'लड़के व लड़कियों की टीमें')}</span>
        </span>
      </div>
    </div>
  )
}

export default function Hero() {
  const { t, f, lang } = useLang()
  const trustList = lang === 'hi' ? trustHi : trust
  return (
    <section id="home" className="relative isolate overflow-hidden bg-gradient-to-br from-[#eef5ff] via-white to-[#fff6d6]" aria-labelledby="hero-title">
      {/* Opening video: full width, clean — no text on top */}
      <div className="pt-[68px]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#dbe8ff] sm:aspect-[16/9] lg:aspect-auto lg:h-[calc(100svh-68px)]">
          <HeroVideo />
        </div>
      </div>

      <FieldGraphics />
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-80 w-80 rounded-full bg-accent-600/15 blur-3xl" aria-hidden="true" />

      <div className="container-x grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pb-20">
        <div>
          <span className="hero-in inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent shadow-md shadow-accent/10" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {t('Football Academy in Samastipur', 'समस्तीपुर की फुटबॉल अकादमी')}
          </span>

          <h1 id="hero-title" className="mt-5 text-5xl font-extrabold uppercase leading-[0.92] text-ink sm:text-6xl lg:text-7xl">
            <span className="hero-in inline-block" style={{ animationDelay: '0.25s' }}>{t('Learn.', 'सीखो।')}</span>{' '}
            <span className="hero-in inline-block" style={{ animationDelay: '0.4s' }}>{t('Play.', 'खेलो।')}</span>
            <br />
            <span className="hero-in relative inline-block" style={{ animationDelay: '0.55s' }}>
              <span className="text-shimmer bg-gradient-to-r from-accent via-accent-600 to-accent bg-clip-text text-transparent">{t('Grow', 'आगे बढ़ो')}</span>
              <svg className="absolute -bottom-2 left-0 h-3 w-full text-sun" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M2 7 Q 50 1 98 6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" /></svg>
            </span>{' '}
            <span className="hero-in inline-block" style={{ animationDelay: '0.7s' }}>{t('with Football.', 'फुटबॉल के साथ।')}</span>
          </h1>

          <p className="hero-in mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg" style={{ animationDelay: '0.9s' }}>
            {t('Professional football coaching for young players in Samastipur. Build skills, fitness, confidence, and teamwork.', 'समस्तीपुर में युवा खिलाड़ियों के लिए प्रोफेशनल फुटबॉल कोचिंग। स्किल, फिटनेस, आत्मविश्वास और टीमवर्क बनाइए।')}
          </p>

          <div className="hero-in mt-7 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3" style={{ animationDelay: '1s' }}>
            <a href={whatsappLink()} {...externalLink} className="btn-primary shine-loop !px-3 sm:!px-7 sm:text-base">
              {t('Join Now', 'अभी जुड़ें')} <ArrowRight className="hidden h-4 w-4 sm:block" />
            </a>
            <a href={site.phoneHref} className="btn-outline bg-white !px-3 sm:!px-6 sm:text-base">
              <Phone className="h-4 w-4 shrink-0 max-[380px]:hidden" /> {t('Call Us', 'कॉल करें')}
            </a>
            <a href={whatsappLink()} {...externalLink} className="btn-whatsapp !px-3 sm:!px-6 sm:text-base">
              <WhatsAppIcon className="h-4 w-4 shrink-0 max-[380px]:hidden" /> WhatsApp
            </a>
          </div>

          {/* Admissions card */}
          <div className="hero-in mt-6 max-w-lg rounded-2xl border border-line bg-white/90 p-4 shadow-lg shadow-accent/10 backdrop-blur" style={{ animationDelay: '1.1s' }}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="font-display text-lg font-extrabold uppercase tracking-wide text-sun-600">{t('Admissions Open', 'एडमिशन जारी है')}</p>
              <OpenNowBadge />
            </div>
            <div className="mt-2 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-5">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span><strong className="font-semibold text-ink">{t('6:00 AM – 9:00 PM', 'सुबह 6 – रात 9 बजे')}</strong> · {t('all days', 'हर दिन')}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {f(site, 'addressShort')}
              </span>
            </div>
          </div>
        </div>

        <PhotoCollage />
      </div>

      {/* Trust strip — sunny yellow ticker (list repeated twice for a seamless loop) */}
      <div className="ticker relative overflow-hidden bg-gradient-to-r from-sun to-[#ffd84d]" aria-label={trustList.join(', ')}>
        <div className="ticker-track flex w-max" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-ink sm:text-sm">
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
