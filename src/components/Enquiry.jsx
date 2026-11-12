import { useState } from 'react'
import { Send, Clock, MapPin } from 'lucide-react'
import { WHATSAPP_MESSAGE, externalLink, site, whatsappLink } from '../config/site'
import { programs } from './Programs'
import { Reveal, SectionHeading, WhatsAppIcon } from './ui'

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
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  function validate() {
    const e = {}
    if (!form.student.trim()) e.student = 'Please enter the student’s name.'
    const age = Number(form.age)
    if (!form.age || age < 3 || age > 40) e.age = 'Please enter a valid age.'
    if (!form.parent.trim()) e.parent = 'Please enter the parent’s name.'
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) e.phone = 'Please enter a valid 10-digit mobile number.'
    if (!form.program) e.program = 'Please choose a program.'
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
            eyebrow="Admissions open"
            title={<span id="join-title">Join School of Soccer</span>}
            intro="Fill in a few details and we’ll get back to you about batches, timings and fees. Prefer to talk? Call or WhatsApp us anytime."
          />
          <Reveal variant="left" delay={120} className="mt-8 grid gap-4">
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-pitch-800 p-5">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div><p className="font-semibold">Morning, Evening & Weekend batches</p><p className="text-sm text-muted">Open {site.timings}</p></div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-pitch-800 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div><p className="font-semibold">Training ground</p><p className="text-sm text-muted">{site.address}</p></div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="right" delay={100} className="rounded-[2rem] border border-line bg-gradient-to-br from-pitch-700/80 to-pitch-900 p-6 shadow-2xl shadow-accent/10 sm:p-9">
          {submitted ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-whatsapp/15 text-whatsapp">
                <WhatsAppIcon className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-4xl font-extrabold uppercase">One last step</h3>
              <p className="mt-2 max-w-sm text-muted">
                We’ve opened WhatsApp with the enquiry for <strong className="text-ink">{submitted.student}</strong> filled in.
                Press <strong className="text-ink">Send</strong> in WhatsApp to deliver it to us. It isn’t sent until you do.
              </p>
              <a href={whatsappLink(buildMessage(submitted))} {...externalLink} className="btn-whatsapp mt-7 !px-8">
                <WhatsAppIcon className="h-5 w-5" /> Open WhatsApp again
              </a>
              <button type="button" onClick={() => setSubmitted(null)} className="mt-4 text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <h3 className="text-3xl font-extrabold uppercase">Admission Enquiry</h3>
                <p className="mt-1 text-sm text-muted">Fields marked * are required.</p>
              </div>
              {Field({
                id: 'student', label: 'Student Name *', error: errors.student,
                children: <input id="student" className="field" value={form.student} onChange={set('student')} autoComplete="off" aria-invalid={!!errors.student} aria-describedby={errors.student ? 'student-err' : undefined} />,
              })}
              {Field({
                id: 'age', label: 'Student Age *', error: errors.age,
                children: <input id="age" type="number" inputMode="numeric" min="3" max="40" className="field" value={form.age} onChange={set('age')} aria-invalid={!!errors.age} aria-describedby={errors.age ? 'age-err' : undefined} />,
              })}
              {Field({
                id: 'parent', label: 'Parent Name *', error: errors.parent,
                children: <input id="parent" className="field" value={form.parent} onChange={set('parent')} autoComplete="name" aria-invalid={!!errors.parent} aria-describedby={errors.parent ? 'parent-err' : undefined} />,
              })}
              {Field({
                id: 'phone', label: 'Phone Number *', error: errors.phone,
                children: <input id="phone" type="tel" inputMode="tel" className="field" placeholder="10-digit mobile" value={form.phone} onChange={set('phone')} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-err' : undefined} />,
              })}
              <div className="sm:col-span-2">
                {Field({
                  id: 'program', label: 'Interested Program *', error: errors.program,
                  children: (
                    <select id="program" className="field" value={form.program} onChange={set('program')} aria-invalid={!!errors.program} aria-describedby={errors.program ? 'program-err' : undefined}>
                      <option value="" disabled>Choose a program</option>
                      {programs.map((p) => (
                        <option key={p.name} value={`${p.name} (${p.ages})`}>{p.name} ({p.ages})</option>
                      ))}
                    </select>
                  ),
                })}
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 block text-sm font-medium text-muted">Preferred Batch</legend>
                <div className="grid grid-cols-3 gap-2">
                  {['Morning', 'Evening', 'Weekend'].map((b) => (
                    <label key={b} className={`cursor-pointer rounded-2xl border px-3 py-3 text-center text-sm font-semibold transition ${form.batch === b ? 'border-accent bg-accent text-pitch-950' : 'border-line bg-pitch-950/50 text-muted hover:border-accent/40'}`}>
                      <input type="radio" name="batch" value={b} checked={form.batch === b} onChange={set('batch')} className="sr-only" />
                      {b}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="sm:col-span-2">
                {Field({
                  id: 'message', label: 'Message',
                  children: <textarea id="message" rows="3" className="field resize-none" placeholder="Any questions about fees, timings, or experience level?" value={form.message} onChange={set('message')} />,
                })}
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="btn-primary w-full !min-h-14 text-base">
                  Submit Enquiry <Send className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                  <WhatsAppIcon className="h-3.5 w-3.5 text-whatsapp" /> Opens WhatsApp with your details filled in. You press Send.
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
