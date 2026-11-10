import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { externalLink, navLinks, site, whatsappLink } from '../config/site'
import { Logo, WhatsAppIcon } from './ui'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-pitch-950/85 py-2 shadow-lg shadow-black/40 backdrop-blur-xl' : 'py-4'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3 py-2 text-sm font-medium text-muted transition hover:bg-pitch-600 hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={whatsappLink()} {...externalLink} className="btn-primary hidden !min-h-11 sm:inline-flex">Join Now</a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-pitch-600 xl:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile slide-in nav */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-nav"
        className={`fixed inset-y-0 right-0 z-50 flex h-dvh w-[86%] max-w-sm flex-col bg-pitch-900 shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
        inert={open ? undefined : ''}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo />
          <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-pitch-600" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul>
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-bold uppercase tracking-wide text-ink transition hover:bg-pitch-600 hover:text-accent"
                >
                  {l.label}
                  <span className="text-xs font-sans font-medium text-accent/60">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-3 border-t border-line p-5">
          <a href={whatsappLink()} {...externalLink} onClick={() => setOpen(false)} className="btn-primary w-full">Join Now</a>
          <div className="grid grid-cols-2 gap-3">
            <a href={site.phoneHref} className="btn-outline"><Phone className="h-4 w-4" /> Call</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon className="h-4 w-4" /> WhatsApp</a>
          </div>
        </div>
      </aside>
    </header>
  )
}
