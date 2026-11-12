import { useState } from 'react'
import { Send, Clock, MapPin } from 'lucide-react'
import { WHATSAPP_MESSAGE, externalLink, site, whatsappLink } from '../config/site'
import { programs } from './Programs'
import { Reveal, SectionHeading, WhatsAppIcon } from './ui'
import { useLang } from '../i18n'

const batchHi = { Morning: 'सुबह', Evening: 'शाम', Weekend: 'वीकेंड' }

const empty = { student: '', age: '', parent: '', phone: '', program: '', batch: 'Morning', message: '' }

function buildMessage(f) {
  return [
    WHATSAPP_MESSAGE,
    '',
    'Admission enquiry:',
    `Student name: ${f.student}`,
    `Student age: ${f.age}`,
    `Parent name: ${f.parent}`,
    `Phone: ${f.phone}`,
    `Interested program: ${f.program}`,
    `Preferred batch: ${f.batch}`,
    f.message.trim() ? `Message: ${f.message.trim()}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n')
}

export default function Enquiry() {
  const [form, setForm] = useState(empty)
  const { t, f } = useLang()
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (!form.student.trim()) e.student = t('Please enter the student’s name.', 'कृपया छात्र का नाम लिखें।')
    const age = Number(form.age)
    if (!form.age || age < 3 || age > 40) e.age = t('Please enter a valid age.', 'कृपया सही उम्र लिखें।')
    if (!form.parent.trim()) e.parent = t('Please enter the parent’s name.', 'कृपया अभिभावक का नाम लिखें।')
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) e.phone = t('Please enter a valid 10-digit mobile number.', 'कृपया सही 10 अंकों का मोबाइल नंबर लिखें।')
    if (!form.program) e.program = t('Please choose a program.', 'कृपया एक प्रोग्राम चुनें।')
    return e
  }

  function onSubmit(ev) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    // Opens WhatsApp with the enquiry typed in. Nothing is sent until the
    // visitor presses Send inside WhatsApp — there is no backend.
    window.open(whatsappLink(buildMessage(form)), '_blank', 'noopener,noreferrer')
    setSubmitted(form)
    setForm(empty)
  }

  const Field = ({ id, label, error, children }) => (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-muted">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )

  return (
    <section id="join" className="section relative overflow-hidden" aria-labelledby="join-title">
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={t('Admissions open', 'एडमिशन जारी है')}
            title={<span id="join-title">{t('Join School of Soccer', 'स्कूल ऑफ सॉकर से जुड़ें')}</span>}
            intro={t('Fill in a few details and we’ll get back to you about batches, timings and fees. Prefer to talk? Call or WhatsApp us anytime.', 'कुछ जानकारी भरें, हम बैच, समय और फीस के बारे में आपसे संपर्क करेंगे। बात करना चाहते हैं? कभी भी कॉल या व्हाट्सऐप करें।')}
          />
          <Reveal variant="left" delay={120} className="mt-8 grid gap-4">
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-pitch-800 p-5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div><p className="font-semibold">{t('Morning, Evening & Weekend batches', 'सुबह, शाम और वीकेंड बैच')}</p><p className="text-sm text-muted">{t('Open', 'खुला')} {f(site, 'timings')}</p></div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-pitch-800 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div><p className="font-semibold">{t('Training ground', 'ट्रेनिंग ग्राउंड')}</p><p className="text-sm text-muted">{f(site, 'address')}</p></div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="right" delay={100} className="rounded-[2rem] border border-line bg-gradient-to-br from-pitch-700/80 to-pitch-900 p-6 shadow-2xl shadow-accent/10 sm:p-9">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
                <WhatsAppIcon className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-4xl font-extrabold uppercase">{t('One last step', 'बस एक कदम और')}</h3>
              <p className="mt-2 max-w-sm text-muted">
                {t('We’ve opened WhatsApp with the enquiry for', 'हमने व्हाट्सऐप खोल दिया है, जिसमें')} <strong className="text-ink">{submitted.student}</strong> {t('filled in.', 'की पूछताछ भरी हुई है।')}{' '}
                {t('Press', 'हमें भेजने के लिए व्हाट्सऐप में')} <strong className="text-ink">{t('Send', 'Send')}</strong> {t('in WhatsApp to deliver it to us. It isn’t sent until you do.', 'दबाएँ। जब तक आप नहीं दबाते, यह नहीं भेजी जाती।')}
              </p>
              <a href={whatsappLink(buildMessage(submitted))} {...externalLink} className="btn-whatsapp mt-7 !px-8">
                <WhatsAppIcon className="h-5 w-5" /> {t('Open WhatsApp again', 'व्हाट्सऐप फिर से खोलें')}
              </a>
              <button type="button" onClick={() => setSubmitted(null)} className="mt-4 text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
                {t('Submit another enquiry', 'एक और पूछताछ भेजें')}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h3 className="text-3xl font-extrabold uppercase">{t('Admission Enquiry', 'एडमिशन पूछताछ')}</h3>
                <p className="mt-1 text-sm text-muted">{t('Fields marked * are required.', '* वाले खाने ज़रूरी हैं।')}</p>
              </div>
              {Field({
                id: 'student', label: t('Student Name *', 'छात्र का नाम *'), error: errors.student,
                children: <input id="student" className="field" value={form.student} onChange={set('student')} autoComplete="off" aria-invalid={!!errors.student} aria-describedby={errors.student ? 'student-err' : undefined} />,
              })}
              {Field({
                id: 'age', label: t('Student Age *', 'छात्र की उम्र *'), error: errors.age,
                children: <input id="age" type="number" inputMode="numeric" min="3" max="40" className="field" value={form.age} onChange={set('age')} aria-invalid={!!errors.age} aria-describedby={errors.age ? 'age-err' : undefined} />,
              })}
              {Field({
                id: 'parent', label: t('Parent Name *', 'अभिभावक का नाम *'), error: errors.parent,
                children: <input id="parent" className="field" value={form.parent} onChange={set('parent')} autoComplete="name" aria-invalid={!!errors.parent} aria-describedby={errors.parent ? 'parent-err' : undefined} />,
              })}
              {Field({
                id: 'phone', label: t('Phone Number *', 'फ़ोन नंबर *'), error: errors.phone,
                children: <input id="phone" type="tel" inputMode="tel" className="field" placeholder={t('10-digit mobile', '10 अंकों का मोबाइल')} value={form.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : undefined} />,
              })}
              <div className="sm:col-span-2">
                {Field({
                  id: 'program', label: t('Interested Program *', 'कौन-सा प्रोग्राम *'), error: errors.program,
                  children: (
                    <select id="program" className="field" value={form.program} onChange={set('program')} aria-invalid={!!errors.program} aria-describedby={errors.program ? 'program-err' : undefined}>
                      <option value="" disabled>{t('Choose a program', 'प्रोग्राम चुनें')}</option>
                      {programs.map((p) => (
                        <option key={p.name} value={`${p.name} (${p.ages})`}>{f(p, 'name')} ({f(p, 'ages')})</option>
                      ))}
                    </select>
                  ),
                })}
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 block text-sm font-medium text-muted">{t('Preferred Batch', 'पसंदीदा बैच')}</legend>
                <div className="grid grid-cols-3 gap-2">
                  {['Morning', 'Evening', 'Weekend'].map((b) => (
                    <label key={b} className={`cursor-pointer rounded-2xl border px-3 py-3 text-center text-sm font-semibold transition ${form.batch === b ? 'border-accent bg-accent text-pitch-950' : 'border-line bg-pitch-950/50 text-muted hover:border-accent/40'}`}>
                      <input type="radio" name="batch" value={b} checked={form.batch === b} onChange={set('batch')} className="sr-only" />
                      {t(b, batchHi[b])}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                {Field({
                  id: 'message', label: t('Message', 'संदेश'),
                  children: <textarea id="message" rows="3" className="field resize-none" placeholder={t('Any questions about fees, timings, or experience level?', 'फीस, समय या अनुभव के बारे में कोई सवाल?')} value={form.message} onChange={set('message')} />,
                })}
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full !min-h-14 text-base">
                  {t('Submit Enquiry', 'पूछताछ भेजें')} <Send className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                  <WhatsAppIcon className="h-3.5 w-3.5 text-whatsapp" /> {t('Opens WhatsApp with your details filled in. You press Send.', 'आपकी जानकारी के साथ व्हाट्सऐप खुलेगा। भेजने के लिए Send दबाएँ।')}
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
