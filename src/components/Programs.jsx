import { Baby, Footprints, Trophy, Dumbbell, CalendarDays, ArrowUpRight } from 'lucide-react'
import { WHATSAPP_MESSAGE, whatsappLink } from '../config/site'
import { Reveal, SectionHeading } from './ui'
import { useLang } from '../i18n'

export const programs = [
  { icon: Baby, name: 'Kids Football', nameHi: 'किड्स फुटबॉल', ages: 'Ages 5–10', agesHi: '5–10 साल', text: 'Basic skills, coordination, fun drills, and confidence building.', textHi: 'बुनियादी स्किल, तालमेल, मज़ेदार ड्रिल और आत्मविश्वास बढ़ाना।' },
  { icon: Footprints, name: 'Junior Training', nameHi: 'जूनियर ट्रेनिंग', ages: 'Ages 11–15', agesHi: '11–15 साल', text: 'Technical skills, fitness, positioning, and match practice.', textHi: 'तकनीकी स्किल, फिटनेस, पोज़िशनिंग और मैच प्रैक्टिस।' },
  { icon: Trophy, name: 'Advanced Training', nameHi: 'एडवांस्ड ट्रेनिंग', ages: 'Ages 16+', agesHi: '16+ साल', text: 'Advanced drills, tactical awareness, strength, and competitive preparation.', textHi: 'एडवांस्ड ड्रिल, रणनीतिक समझ, ताकत और प्रतियोगिता की तैयारी।', featured: true },
  { icon: Dumbbell, name: 'Fitness & Conditioning', nameHi: 'फिटनेस और कंडीशनिंग', ages: 'All levels', agesHi: 'सभी स्तर', text: 'Speed, stamina, agility, strength, and injury-prevention exercises.', textHi: 'स्पीड, स्टैमिना, फुर्ती, ताकत और चोट से बचाव की एक्सरसाइज़।' },
  { icon: CalendarDays, name: 'Weekend Batches', nameHi: 'वीकेंड बैच', ages: 'School students', agesHi: 'स्कूली छात्र', text: 'Flexible weekend coaching for school students.', textHi: 'स्कूली छात्रों के लिए सुविधाजनक वीकेंड कोचिंग।' },
]

export default function Programs() {
  const { t, f } = useLang()
  return (
    <section id="programs" className="section relative bg-pitch-900" aria-labelledby="programs-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading
          center
          eyebrow={t('What we offer', 'हम क्या सिखाते हैं')}
          title={<span id="programs-title">{t('Training Programs', 'ट्रेनिंग प्रोग्राम')}</span>}
          intro={t('Age-appropriate batches designed to build skill, fitness and match confidence at every stage.', 'उम्र के हिसाब से बैच — हर स्तर पर स्किल, फिटनेस और मैच का आत्मविश्वास बढ़ाने के लिए।')}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {programs.map((pr, i) => {
            const { icon: Icon, name, ages, featured } = pr
            return (
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
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-600 text-pitch-950 shadow-lg shadow-accent/20 transition-shadow group-hover:animate-[wiggle_0.6s_ease-in-out] group-hover:shadow-accent/50">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <span className="rounded-full bg-pitch-600 px-3 py-1 text-xs font-semibold text-muted">{f(pr, 'ages')}</span>
              </div>
              <h3 className="mt-6 text-3xl font-extrabold uppercase">{f(pr, 'name')}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{f(pr, 'text')}</p>
              <a
                href={whatsappLink(`${WHATSAPP_MESSAGE}\nInterested program: ${name} (${ages})`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-full border border-accent/50 px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-pitch-950"
              >
                {t('Enquire Now', 'जानकारी लें')} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          )})}
        </div>
      </div>
    </section>
  )
}
