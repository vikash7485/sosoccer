import { useEffect, useRef, useState } from 'react'
import { Quote, ArrowRight } from 'lucide-react'
import { externalLink, whatsappLink } from '../config/site'
import { Reveal, SectionHeading } from './ui'
import { useLang } from '../i18n'

const QUOTE_MS = 6000

// Widely published quotes, shown with attribution only — no player photos or logos,
// so nothing suggests the players endorse or are linked to the academy.
const legends = [
  {
    name: 'Cristiano Ronaldo',
    note: '5× Ballon d’Or winner',
    noteHi: '5 बार बैलन डी’ओर विजेता',
    quoteHi: 'मेहनत के बिना टैलेंट कुछ भी नहीं है।',
    quote: 'Talent without working hard is nothing.',
  },
  {
    name: 'Lionel Messi',
    note: '8× Ballon d’Or winner',
    noteHi: '8 बार बैलन डी’ओर विजेता',
    quoteHi: 'अपने सपने तक पहुँचने के लिए लड़ना पड़ता है। इसके लिए त्याग और कड़ी मेहनत करनी पड़ती है।',
    quote: 'You have to fight to reach your dream. You have to sacrifice and work hard for it.',
  },
  {
    name: 'Pelé',
    note: '3× FIFA World Cup winner',
    noteHi: '3 बार फीफा वर्ल्ड कप विजेता',
    quoteHi: 'सफलता संयोग नहीं है। यह कड़ी मेहनत, लगन, सीखना, पढ़ना, त्याग और सबसे बढ़कर अपने काम से प्यार है।',
    quote: 'Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing.',
  },
]

export default function Legends() {
  const { t, f, lang } = useLang()
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
        <img src="/images/g-crowd-1280.webp" srcSet="/images/g-crowd-640.webp 640w, /images/g-crowd-1280.webp 1280w, /images/g-crowd-1920.webp 1920w" sizes="100vw" alt="" loading="lazy" decoding="async" className="legends-zoom h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-[#eef5ff]/85 to-white/95" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_70%)]" />
      </div>

      <div className="container-x relative">
        <SectionHeading center eyebrow={t('Legends’ words', 'दिग्गजों के शब्द')} title={<span id="legends-title">{t('Dream Big. Work Harder.', 'बड़े सपने देखो। और मेहनत करो।')}</span>} />

        <Reveal variant="zoom" className="mx-auto mt-12 max-w-4xl" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <figure className="relative rounded-[2rem] border border-line bg-white/85 px-6 py-10 text-center shadow-2xl shadow-accent/15 backdrop-blur-md sm:px-14 sm:py-14">
            <Quote className="mx-auto h-10 w-10 text-accent sm:h-12 sm:w-12" aria-hidden="true" />
            <div key={active} className="why-fade" aria-live={playing ? 'off' : 'polite'}>
              <blockquote className="mt-6 font-display text-3xl font-extrabold uppercase leading-[1.05] text-ink sm:text-5xl">
                “{l.quote}”
              </blockquote>
              {lang === 'hi' && <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-ink/90 sm:text-xl">{l.quoteHi} <span className="text-xs text-muted">(हिंदी अनुवाद)</span></p>}
              <figcaption className="mt-6">
                <span className="block font-display text-xl font-bold uppercase tracking-wide text-accent sm:text-2xl">— {l.name}</span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">{f(l, 'note')}</span>
              </figcaption>
            </div>

            {/* timer bar */}
            <div className="absolute inset-x-8 bottom-0 h-0.5 overflow-hidden rounded-full bg-pitch-600" aria-hidden="true">
              <div key={`${active}-${playing}`} className={`h-full bg-accent ${playing ? 'why-progress' : 'w-0'}`} style={{ animationDuration: `${QUOTE_MS}ms` }} />
            </div>
          </figure>

          {/* Name tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2" role="tablist" aria-label={t('Choose a legend’s quote', 'किसी दिग्गज का विचार चुनें')}>
            {legends.map((x, i) => (
              <button
                key={x.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  i === active ? 'border-accent bg-accent text-pitch-950' : 'border-line bg-white text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {x.name}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="text-lg font-medium text-ink sm:text-xl">
            {lang === 'hi' ? (
              <>हर दिग्गज ने <span className="font-bold text-accent">पटेल मैदान</span> जैसे किसी मैदान से शुरुआत की थी। आपका सफ़र आज से शुरू हो सकता है।</>
            ) : (
              <>Every legend started on a ground like <span className="font-bold text-accent">Patel Field</span>. Your journey can start today.</>
            )}
          </p>
          <a href={whatsappLink()} {...externalLink} className="btn-primary shine-loop !px-8 text-base">
            {t('Join Now', 'अभी जुड़ें')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="text-[11px] text-muted/80">
            {t('Quotes are publicly attributed to the players named. School of Soccer is not affiliated with or endorsed by them.', 'ये विचार सार्वजनिक रूप से इन खिलाड़ियों के नाम से जाने जाते हैं। स्कूल ऑफ सॉकर का इनसे कोई संबंध या समर्थन नहीं है।')}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
