import { MapPin, Clock, Phone, Download } from 'lucide-react'
import { externalLink, navLinks, site, whatsappLink } from '../config/site'
import { FacebookIcon, InstagramIcon, Logo, WhatsAppIcon } from './ui'
import { OPEN_INSTALL_EVENT } from './InstallApp'

function MapsIcon(props) {
  return <MapPin {...props} />
}

export default function Footer() {
  const socials = [
    { label: 'Instagram', href: site.instagram, icon: InstagramIcon },
    { label: 'Facebook', href: site.facebook, icon: FacebookIcon },
    { label: 'WhatsApp', href: whatsappLink(), icon: WhatsAppIcon },
    { label: 'Google Maps', href: site.googleMaps, icon: MapsIcon },
  ]

  return (
    <footer className="border-t border-line bg-pitch-950 pb-28 pt-16 sm:pb-12">
      <div className="container-x grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            A football coaching academy in Samastipur developing young players through structured training, fitness, discipline and teamwork.
          </p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:bg-accent hover:text-pitch-950">
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-lg font-bold uppercase tracking-wide">Quick Links</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="text-muted transition hover:text-accent">{l.label}</a></li>
            ))}
            <li><a href={whatsappLink()} {...externalLink} className="text-muted transition hover:text-accent">Join Now</a></li>
            <li>
              <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_INSTALL_EVENT))} className="inline-flex items-center gap-1.5 font-semibold text-accent transition hover:underline">
                <Download className="h-3.5 w-3.5" aria-hidden="true" /> Download App
              </button>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide">Contact</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{site.address}</li>
            <li className="flex gap-2.5"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{site.timings}</li>
            <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><a href={site.phoneHref} className="hover:text-accent">{site.phoneDisplay}</a></li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted/80 sm:flex-row">
        <p>© 2026 School of Soccer. All rights reserved.</p>
        <p>Football Academy · Samastipur, Bihar</p>
      </div>
    </footer>
  )
}
