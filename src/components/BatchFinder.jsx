import { useState } from 'react'
import { Baby, Footprints, Trophy, Smile, HeartPulse, Medal, Sunrise, Sunset, CalendarDays, ArrowLeft, RotateCcw, Sparkles, Check } from 'lucide-react'
import { externalLink, whatsappLink } from '../config/site'
import { programs } from './Programs'
import { Reveal, SectionHeading, WhatsAppIcon } from './ui'
import { useLang } from '../i18n'

const byName = Object.fromEntries(programs.map((p) => [p.name, p]))

const steps = [
  {
    key: 'age',
    q: 'How old is the player?',
    qHi: 'खिलाड़ी की उम्र कितनी है?',
    options: [
      { value: '5–10', label: '5 – 10 years', labelHi: '5 – 10 साल', icon: Baby },
      { value: '11–15', label: '11 – 15 years', labelHi: '11 – 15 साल', icon: Footprints },
      { value: '16+', label: '16 years or older', labelHi: '16 साल या ज़्यादा', icon: Trophy },
    ],
  },
  {
    key: 'goal',
    q: 'What’s the main goal?',
    qHi: 'मुख्य लक्ष्य क्या है?',
    options: [
      { value: 'fun', label: 'Have fun & learn basics', labelHi: 'मज़े से बुनियादी स्किल सीखना', icon: Smile },
      { value: 'fitness', label: 'Get fitter & stronger', labelHi: 'फिट और मज़बूत बनना', icon: HeartPulse },
      { value: 'competitive', label: 'Play competitively', labelHi: 'प्रतियोगिता में खेलना', icon: Medal },
    ],
  },
  {
    key: 'time',
    q: 'Which time suits you best?',
    qHi: 'कौन-सा समय सबसे सही रहेगा?',
    options: [
      { value: 'Morning', label: 'Morning', labelHi: 'सुबह', icon: Sunrise },
      { value: 'Evening', label: 'Evening', labelHi: 'शाम', icon: Sunset },
      { value: 'Weekend', label: 'Weekend', labelHi: 'वीकेंड', icon: CalendarDays },
    ],
  },
]

/** Main program by age; an add-on suggestion by goal or time. */
function recommend({ age, goal, time }) {
  const main = byName[age === '5–10' ? 'Kids Football' : age === '11–15' ? 'Junior Training' : 'Advanced Training']
  let extra = null
  if (goal === 'fitness') extra = byName['Fitness & Conditioning']
  else if (time === 'Weekend') extra = byName['Weekend Batches']
  return { main, extra }
}

export default function BatchFinder() {
  const { t, f } = useLang()
  const [answers, setAnswers] = useState({})
  const [step, setStep] = useState(0) // 0..2 = questions, 3 = result
  const done = step >= steps.length

  const choose = (key, value) => {
    setAnswers((a) => ({ ...a, [key]: value }))
    setStep((s) => s + 1)
  }
  const reset = () => {
    setAnswers({})
    setStep(0)
  }

  const optionLabel = (key) => {
    const opt = steps.find((s) => s.key === key)?.options.find((o) => o.value === answers[key])
    return opt ? f(opt, 'label') : ''
  }

  const result = done ? recommend(answers) : null
  const message = result
    ? [
        'Hello School of Soccer! I used the batch finder on your website.',
        `Player age: ${answers.age}`,
        `Goal: ${steps[1].options.find((o) => o.value === answers.goal)?.label}`,
        `Preferred time: ${answers.time}`,
        `Suggested program: ${result.main.name} (${result.main.ages})${result.extra ? ` + ${result.extra.name}` : ''}`,
        'Please share admission details, fees and batch timings.',
      ].join('\n')
    : ''

  const current = steps[step]
  const progress = Math.round((Math.min(step, steps.length) / steps.length) * 100)

  return (
    <section id="finder" className="section relative overflow-hidden" aria-labelledby="finder-title">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          center
          eyebrow={t('60-second quiz', '60 सेकंड का क्विज़')}
          title={<span id="finder-title">{t('Find the Right Batch', 'सही बैच चुनें')}</span>}
          intro={t('Answer three quick questions and we’ll suggest the best program for your child.', 'तीन आसान सवालों के जवाब दें, हम आपके बच्चे के लिए सबसे सही प्रोग्राम सुझाएँगे।')}
        />

        <Reveal variant="zoom" className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-pitch-800 shadow-2xl shadow-black/30">
            {/* Progress */}
            <div className="flex items-center gap-3 border-b border-line px-6 py-4 sm:px-8">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                {done ? t('Your match', 'आपका सुझाव') : t(`Step ${step + 1} of ${steps.length}`, `चरण ${step + 1} / ${steps.length}`)}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-pitch-600" aria-hidden="true">
                <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-600 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              {step > 0 && !done && (
                <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1 text-xs font-semibold text-muted transition hover:text-accent">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {t('Back', 'पीछे')}
                </button>
              )}
            </div>

            <div key={step} className="why-fade p-6 sm:p-8" aria-live="polite">
              {!done ? (
                <fieldset>
                  <legend className="font-display text-3xl font-extrabold uppercase leading-tight sm:text-4xl">{f(current, 'q')}</legend>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {current.options.map((o) => {
                      const Icon = o.icon
                      const selected = answers[current.key] === o.value
                      return (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => choose(current.key, o.value)}
                          aria-pressed={selected}
                          className={`group flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition duration-200 hover:-translate-y-0.5 sm:flex-col sm:items-start sm:p-5 ${
                            selected ? 'border-accent bg-accent/10' : 'border-line bg-pitch-900 hover:border-accent/60'
                          }`}
                        >
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-600 text-pitch-950 shadow-lg shadow-accent/20 group-hover:animate-[wiggle_0.6s_ease-in-out]">
                            <Icon className="h-6 w-6" aria-hidden="true" />
                          </span>
                          <span className="text-base font-semibold text-ink">{f(o, 'label')}</span>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
              ) : (
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    <Sparkles className="h-4 w-4" aria-hidden="true" /> {t('We recommend', 'हमारा सुझाव')}
                  </p>
                  <div className="mt-3 flex items-start gap-4">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-600 text-pitch-950 shadow-lg shadow-accent/30">
                      <result.main.icon className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-extrabold uppercase leading-tight sm:text-4xl">{f(result.main, 'name')}</h3>
                      <p className="mt-1 text-sm font-semibold text-accent">{f(result.main, 'ages')}</p>
                      <p className="mt-2 text-muted">{f(result.main, 'text')}</p>
                    </div>
                  </div>

                  {result.extra && (
                    <p className="mt-5 rounded-2xl border border-line bg-pitch-900 p-4 text-sm text-muted">
                      <strong className="text-ink">{t('Also good for you:', 'आपके लिए यह भी अच्छा है:')}</strong> {f(result.extra, 'name')} — {f(result.extra, 'text')}
                    </p>
                  )}

                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('Your answers', 'आपके जवाब')}>
                    {steps.map((s) => (
                      <li key={s.key} className="inline-flex items-center gap-1.5 rounded-full bg-pitch-600 px-3 py-1.5 text-xs font-medium text-muted">
                        <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> {optionLabel(s.key)}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a href={whatsappLink(message)} {...externalLink} className="btn-whatsapp !px-8">
                      <WhatsAppIcon className="h-5 w-5" /> {t('Send on WhatsApp', 'व्हाट्सऐप पर भेजें')}
                    </a>
                    <button type="button" onClick={reset} className="btn-outline">
                      <RotateCcw className="h-4 w-4" aria-hidden="true" /> {t('Start again', 'फिर से शुरू करें')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
