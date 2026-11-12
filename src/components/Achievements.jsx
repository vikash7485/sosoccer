import { Trophy, Medal, PartyPopper, GraduationCap, Users, Flag, ShieldCheck, ExternalLink } from 'lucide-react'
import { achievements, recognition, recognitionHi, stats } from '../config/research'
import { site } from '../config/site'
import { CountUp, FacebookIcon, Reveal, SectionHeading, SmartImage } from './ui'
import { useLang } from '../i18n'

const icons = { trophy: Trophy, award: Medal, event: PartyPopper, player: GraduationCap, team: Users, start: Flag }

export default function Achievements() {
  const { t, f, lang } = useLang()
  return (
    <section id="achievements" className="section relative overflow-hidden" aria-labelledby="achievements-title">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-pitch-600/25 blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          center
          eyebrow={t('Achievements', 'उपलब्धियाँ')}
          title={<span id="achievements-title">{t('Milestones on the Pitch', 'मैदान पर हमारी उपलब्धियाँ')}</span>}
          intro={t('Real moments from the academy’s own posts and its Google reviews. Each one shows where it comes from.', 'अकादमी की अपनी पोस्ट और गूगल रिव्यू से लिए गए असली पल। हर एक के साथ उसका स्रोत दिया गया है।')}
        />

        {/* Stat band */}
        <Reveal variant="zoom" className="mx-auto mt-12 grid max-w-4xl grid-cols-2 overflow-hidden rounded-3xl border border-line bg-pitch-800 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-6 text-center ${i % 2 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line sm:border-t-0' : ''} ${i === 2 ? 'sm:border-l' : ''}`} title={`Source: ${s.source}`}>
              <p className="font-display text-4xl font-extrabold tabular-nums text-accent sm:text-5xl"><CountUp value={s.value} /></p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{f(s, 'label')}</p>
            </div>
          ))}
        </Reveal>

        {/* Timeline */}
        <ol className="relative mx-auto mt-16 max-w-5xl">
          {/* The line draws itself downward as the timeline comes into view */}
          <Reveal as="span" variant="draw" className="absolute bottom-0 left-5 top-0 w-0.5 bg-gradient-to-b from-accent via-accent-600/60 to-transparent md:left-1/2" aria-hidden="true" />
          {achievements.map((a, i) => {
            const Icon = icons[a.kind]
            const right = i % 2 === 1
            return (
              <li key={a.title} className="relative mb-10 pl-16 md:mb-14 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
                <Reveal as="span" variant="zoom" className="absolute left-0 top-1 z-10 grid h-10 w-10 place-items-center rounded-full border-4 border-pitch-950 bg-gradient-to-br from-accent to-accent-600 text-pitch-950 shadow-lg shadow-accent/30 md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
                  <Icon className="h-4 w-4" />
                </Reveal>
                <Reveal variant={right ? 'right' : 'left'} delay={120} className={`${right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'}`}>
                  <article className={`group overflow-hidden rounded-3xl border border-line bg-pitch-800/60 shadow-xl shadow-accent/10 transition hover:border-accent/40 ${right ? '' : 'md:ml-auto'}`}>
                    {a.image && (
                      <div className="overflow-hidden">
                        <SmartImage file={a.image.file} alt={a.image.alt} sizes="(min-width:768px) 40vw, 100vw" className="aspect-[16/9] w-full transition duration-700 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="p-6">
                      <time className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{a.date}</time>
                      <h3 className="mt-1.5 text-2xl font-extrabold uppercase leading-tight sm:text-3xl">{f(a, 'title')}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{f(a, 'text')}</p>
                      <p className="mt-4 text-[11px] text-muted/80">{t('Source:', 'स्रोत:')} {a.source}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ol>

        {/* Recognition mentioned in reviews */}
        <Reveal variant="zoom" className="mx-auto mt-6 max-w-5xl rounded-3xl border border-line bg-gradient-to-br from-pitch-700/60 to-pitch-900 p-7 sm:p-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h3 className="text-3xl font-extrabold uppercase">{t('Players at every level', 'हर स्तर पर खिलाड़ी')}</h3>
              <p className="mt-2 text-sm text-muted">{t('As described by players and parents in Google reviews.', 'जैसा खिलाड़ियों और अभिभावकों ने गूगल रिव्यू में बताया है।')}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 md:max-w-xl">
              {(lang === 'hi' ? recognitionHi : recognition).map((r) => (
                <li key={r} className="flex gap-2.5 text-sm text-muted">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <FacebookIcon className="h-4 w-4" /> {t('Follow our journey on Facebook', 'फेसबुक पर हमारा सफ़र देखें')} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
