import { ClipboardList, Activity } from 'lucide-react'
import { aboutImage } from '../config/images'
import { Reveal, SectionHeading, SmartImage } from './ui'

const highlights = [
  { icon: ClipboardList, title: 'Structured Coaching', text: 'Planned sessions that progress week by week, from fundamentals to match play.' },
  { icon: Activity, title: 'Fitness & Skill Development', text: 'Stamina, speed and agility built alongside ball control, passing and shooting.' },
]

const skills = ['Ball control', 'Passing', 'Shooting', 'Stamina', 'Confidence', 'Game awareness']

export default function About() {
  return (
    <section id="about" className="section relative" aria-labelledby="about-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-2xl shadow-accent/10">
            <SmartImage {...aboutImage} sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="absolute inset-0 bg-gradient-to-t from-pitch-950/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl border border-line bg-pitch-800/95 p-5 shadow-xl backdrop-blur sm:left-auto sm:right-8 sm:w-64">
            <p className="font-display text-4xl font-extrabold text-accent">7 days</p>
            <p className="text-sm text-muted">a week · 6 AM – 9 PM training</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="About the academy" title={<span id="about-title">Building Tomorrow’s Footballers</span>} />
          <Reveal delay={100}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              School of Soccer is a football coaching academy in Samastipur dedicated to developing young talent through structured training,
              fitness, teamwork, and discipline. Our sessions help players improve ball control, passing, shooting, stamina, confidence, and
              game awareness.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills we develop">
              {skills.map((s) => (
                <li key={s} className="rounded-full border border-line bg-pitch-600 px-3.5 py-1.5 text-xs font-medium text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={150 + i * 100} className="card p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-2xl font-bold uppercase">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
