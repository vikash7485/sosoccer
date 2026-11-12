import { ClipboardList, Activity } from 'lucide-react'
import { aboutImage } from '../config/images'
import { Reveal, SectionHeading, SmartImage } from './ui'
import { useLang } from '../i18n'

const highlights = [
  { icon: ClipboardList, title: 'Structured Coaching', titleHi: 'व्यवस्थित कोचिंग', text: 'Planned sessions that progress week by week, from fundamentals to match play.', textHi: 'योजनाबद्ध सेशन जो हर हफ्ते आगे बढ़ते हैं — बुनियादी स्किल से लेकर मैच तक।' },
  { icon: Activity, title: 'Fitness & Skill Development', titleHi: 'फिटनेस और स्किल विकास', text: 'Stamina, speed and agility built alongside ball control, passing and shooting.', textHi: 'बॉल कंट्रोल, पासिंग और शूटिंग के साथ-साथ स्टैमिना, स्पीड और फुर्ती।' },
]

const skills = ['Ball control', 'Passing', 'Shooting', 'Stamina', 'Confidence', 'Game awareness']
const skillsHi = ['बॉल कंट्रोल', 'पासिंग', 'शूटिंग', 'स्टैमिना', 'आत्मविश्वास', 'खेल की समझ']

export default function About() {
  const { t, f, lang } = useLang()
  return (
    <section id="about" className="section relative" aria-labelledby="about-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal variant="left" className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-2xl shadow-accent/10">
            <SmartImage {...aboutImage} sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-line bg-pitch-800/95 p-5 shadow-xl backdrop-blur sm:left-auto sm:right-8 sm:w-64">
            <p className="font-display text-4xl font-extrabold text-accent">{t('7 days', '7 दिन')}</p>
            <p className="text-sm text-muted">{t('a week · 6 AM – 9 PM training', 'हफ्ते में · सुबह 6 – रात 9 बजे ट्रेनिंग')}</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow={t('About the academy', 'अकादमी के बारे में')} title={<span id="about-title">{t('Building Tomorrow’s Footballers', 'कल के फुटबॉलर तैयार करते हुए')}</span>} />
          <Reveal delay={100}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              {t(
                'School of Soccer is a football coaching academy in Samastipur dedicated to developing young talent through structured training, fitness, teamwork, and discipline. Our sessions help players improve ball control, passing, shooting, stamina, confidence, and game awareness.',
                'स्कूल ऑफ सॉकर समस्तीपुर की एक फुटबॉल कोचिंग अकादमी है, जो व्यवस्थित ट्रेनिंग, फिटनेस, टीमवर्क और अनुशासन के ज़रिए युवा प्रतिभाओं को निखारती है। हमारे सेशन खिलाड़ियों का बॉल कंट्रोल, पासिंग, शूटिंग, स्टैमिना, आत्मविश्वास और खेल की समझ बेहतर बनाते हैं।',
              )}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t('Skills we develop', 'हम ये स्किल सिखाते हैं')}>
              {(lang === 'hi' ? skillsHi : skills).map((s) => (
                <li key={s} className="rounded-full border border-line bg-pitch-600 px-3.5 py-1.5 text-xs font-medium text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => {
              const { icon: Icon, title } = h
              return (
              <Reveal key={title} variant="zoom" delay={150 + i * 100} className="card group p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-accent/20">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent group-hover:animate-[wiggle_0.6s_ease-in-out]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-2xl font-bold uppercase">{f(h, 'title')}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f(h, 'text')}</p>
              </Reveal>
            )})}
          </div>
        </div>
      </div>
    </section>
  )
}
