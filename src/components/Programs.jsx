import { Baby, Footprints, Trophy, Dumbbell, CalendarDays, ArrowUpRight } from 'lucide-react'
import { WHATSAPP_MESSAGE, whatsappLink } from '../config/site'
import { Reveal, SectionHeading } from './ui'

export const programs = [
  { icon: Baby, name: 'Kids Football', ages: 'Ages 5–10', text: 'Basic skills, coordination, fun drills, and confidence building.' },
  { icon: Footprints, name: 'Junior Training', ages: 'Ages 11–15', text: 'Technical skills, fitness, positioning, and match practice.' },
  { icon: Trophy, name: 'Advanced Training', ages: 'Ages 16+', text: 'Advanced drills, tactical awareness, strength, and competitive preparation.', featured: true },
  { icon: Dumbbell, name: 'Fitness & Conditioning', ages: 'All levels', text: 'Speed, stamina, agility, strength, and injury-prevention exercises.' },
  { icon: CalendarDays, name: 'Weekend Batches', ages: 'School students', text: 'Flexible weekend coaching for school students.' },
]

export default function Programs() {
  return (
    <section id="programs" className="section relative bg-pitch-900" aria-labelledby="programs-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="What we offer"
          title={<span id="programs-title">Training Programs</span>}
          intro="Age-appropriate batches designed to build skill, fitness and match confidence at every stage."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {programs.map(({ icon: Icon, name, ages, text, featured }, i) => (
            <Reveal
              key={name}
              as="article"
              delay={i * 80}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border p-7 transition duration-300 hover:-translate-y-1 ${
                i >= 3 ? 'lg:col-span-3' : 'lg:col-span-2'
              } ${i === 4 ? 'sm:col-span-2 lg:col-span-3' : ''} ${
                featured
                  ? 'border-accent/40 bg-gradient-to-br from-pitch-600 to-pitch-800 shadow-2xl shadow-accent/10'
                  : 'border-line bg-pitch-800/60 hover:border-accent/40'
              }`}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" aria-hidden="true" />
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-600 text-pitch-950 shadow-lg shadow-accent/20">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-pitch-600 px-3 py-1 text-xs font-semibold text-muted">{ages}</span>
              </div>
              <h3 className="mt-6 text-3xl font-extrabold uppercase">{name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
              <a
                href={whatsappLink(`${WHATSAPP_MESSAGE}\nInterested program: ${name} (${ages})`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full border border-accent/50 px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-pitch-950"
              >
                Enquire Now <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
