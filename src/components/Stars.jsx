import { useRef } from 'react'
import { Star as StarIcon } from 'lucide-react'
import { starPlayers } from '../config/research'
import { Reveal, SectionHeading, SmartImage } from './ui'
import { useLang } from '../i18n'

/** Trading-card style player card that tilts toward the mouse (desktop only, off for reduced motion). */
function PlayerCard({ p, i }) {
  const { t, f } = useLang()
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale(1.02)`
    el.style.setProperty('--gx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--gy', `${(y + 0.5) * 100}%`)
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <Reveal variant="zoom" delay={i * 120} className="w-[82%] shrink-0 snap-center sm:w-auto">
      <article
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="star-card group relative h-full rounded-[1.75rem] bg-gradient-to-br from-[#ffd54a] via-[#f5b700] to-[#b98500] p-[2px] shadow-2xl shadow-[#ff8a00]/20 transition-transform duration-300 ease-out will-change-transform"
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.65rem] bg-white text-ink">
          {/* photo */}
          <div className="relative overflow-hidden">
            <SmartImage file={p.image.file} alt={p.image.alt} sizes="(min-width:640px) 33vw, 82vw" className="aspect-[4/3] w-full transition duration-700 group-hover:scale-105" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#f5b700] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2a1a00] shadow">
              <StarIcon className="h-3 w-3 fill-current" aria-hidden="true" /> {f(p, 'badge')}
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink shadow backdrop-blur">{f(p, 'date')}</span>
          </div>

          {/* body */}
          <div className="relative flex flex-1 flex-col p-6 pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e8590c]">{f(p, 'role')}</p>
            <h3 className="mt-1 font-display text-3xl font-extrabold uppercase leading-none">{f(p, 'name')}</h3>
            <p className="mt-3 inline-flex self-start rounded-lg border border-[#ffc61a] bg-[#fff6d6] px-3 py-1.5 font-display text-lg font-bold uppercase text-[#b45309]">
              {f(p, 'stat')}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{f(p, 'highlight')}</p>
            <p className="mt-5 border-t border-line pt-3 text-[11px] text-muted/80">
              {t('Source:', 'स्रोत:')} {p.source}
            </p>
          </div>

          {/* moving glare */}
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,198,26,0.18), transparent 45%)' }}
            aria-hidden="true"
          />
        </div>
      </article>
    </Reveal>
  )
}

export default function Stars() {
  const { t } = useLang()
  return (
    <section id="stars" className="section relative overflow-hidden" aria-labelledby="stars-title">
      <div className="container-x relative">
        <SectionHeading
          center
          eyebrow={t('Our stars', 'हमारे सितारे')}
          title={<span id="stars-title">{t('Made at Patel Field', 'पटेल मैदान से निकले सितारे')}</span>}
          intro={t('Real players, real moments — straight from the academy’s own posts and reviews.', 'असली खिलाड़ी, असली पल — सीधे अकादमी की अपनी पोस्ट और रिव्यू से।')}
        />
        {/* Phones: swipe row · Tablet/desktop: 3 columns */}
        <div className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 pt-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {starPlayers.map((p, i) => (
            <PlayerCard key={p.name} p={p} i={i} />
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted sm:hidden">{t('Swipe →', 'स्वाइप करें →')}</p>
      </div>
    </section>
  )
}
