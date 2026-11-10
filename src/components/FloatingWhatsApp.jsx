import { whatsappLink } from '../config/site'
import { WhatsAppIcon } from './ui'

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with School of Soccer on WhatsApp"
      className="pulse-ring group fixed bottom-5 right-5 z-40 isolate grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-2xl shadow-black/40 transition hover:scale-105 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0b0b0f] opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </a>
  )
}
