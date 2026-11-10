import { MapPin, Clock, Phone, Navigation, Send } from 'lucide-react'
import { externalLink, site, whatsappLink } from '../config/site'
import { FacebookIcon, InstagramIcon, Reveal, SectionHeading, WhatsAppIcon } from './ui'

export default function Contact() {
  const actions = [
    { label: 'Call Now', href: site.phoneHref, icon: Phone, cls: 'btn-primary' },
    { label: 'WhatsApp Enquiry', href: whatsappLink(), icon: WhatsAppIcon, cls: 'btn-whatsapp', ext: true },
    { label: 'Instagram', href: site.instagram, icon: InstagramIcon, cls: 'btn-outline', ext: true },
    { label: 'Facebook', href: site.facebook, icon: FacebookIcon, cls: 'btn-outline', ext: true },
  ]

  return (
    <section id="contact" className="section bg-pitch-900" aria-labelledby="contact-title">
      <div className="container-x">
        <SectionHeading center eyebrow="Location" title={<span id="contact-title">Visit Our Academy</span>} />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal as="address" className="card flex flex-col p-7 not-italic sm:p-9 lg:col-span-2">
            <div className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent"><MapPin className="h-6 w-6" aria-hidden="true" /></span>
              <div>
                <h3 className="text-xl font-bold uppercase text-ink">Address</h3>
                <p className="mt-1 text-muted">{site.address}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent"><Clock className="h-6 w-6" aria-hidden="true" /></span>
              <div>
                <h3 className="text-xl font-bold uppercase text-ink">Timings</h3>
                <p className="mt-1 text-muted">{site.timings}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent"><Phone className="h-6 w-6" aria-hidden="true" /></span>
              <div>
                <h3 className="text-xl font-bold uppercase text-ink">Phone / WhatsApp</h3>
                <a href={site.phoneHref} className="mt-1 block text-muted hover:text-accent">{site.phoneDisplay}</a>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {actions.map(({ label, href, icon: Icon, cls, ext }) => (
                <a key={label} href={href} className={`${cls} !px-3`} {...(ext ? externalLink : {})}>
                  <Icon className="h-4 w-4 shrink-0" /> {label}
                </a>
              ))}
            </div>
            <a href="#join" className="mt-4 inline-flex items-center gap-1.5 self-center text-sm font-semibold text-accent underline-offset-4 hover:underline">
              <Send className="h-4 w-4" aria-hidden="true" /> Prefer a form? Fill the enquiry form
            </a>
          </Reveal>

          <Reveal delay={120} className="relative min-h-[360px] overflow-hidden rounded-3xl border border-line lg:col-span-3">
            <iframe
              title="Map showing School of Soccer, Patel Field, Stadium Road, Samastipur"
              src="https://www.google.com/maps?q=Patel+Field,+Stadium+Road,+Samastipur,+Bihar+848101&output=embed"
              className="absolute inset-0 h-full w-full grayscale-[10%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={site.googleMaps} target="_blank" rel="noopener noreferrer" className="btn-primary absolute bottom-5 left-5 right-5 sm:left-auto">
              <Navigation className="h-4 w-4" /> Open in Google Maps
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
