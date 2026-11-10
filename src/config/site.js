// ─────────────────────────────────────────────────────────────
// SITE CONFIG — every contact detail / link lives here.
// Edit this one file to update the whole website.
// ─────────────────────────────────────────────────────────────

// Number confirmed from the academy's own Facebook page (083406 68200) and the
// owner's reply on Google Reviews (8340668200). The number originally supplied
// (83406682200) had 11 digits. Digits only, no spaces, no +91.
const PHONE_DIGITS = '8340668200' // [PHONE_NUMBER]
const WHATSAPP_DIGITS = '8340668200' // [WHATSAPP_NUMBER]

export const site = {
  name: 'School of Soccer',
  tagline: 'Football Academy in Samastipur',
  address: 'Near Patel Field, Stadium Road, Uttarayan, Samastipur, Bihar 848101',
  addressShort: 'Stadium Road, Uttarayan, Samastipur',
  timings: '6:00 AM to 9:00 PM, all days',

  phoneDisplay: `+91 ${PHONE_DIGITS}`,
  phoneHref: `tel:+91${PHONE_DIGITS}`,
  whatsappDigits: `91${WHATSAPP_DIGITS}`,

  instagram: 'https://www.instagram.com/gandhi_ranjan/', // [INSTAGRAM_LINK]
  instagramHandle: '@gandhi_ranjan',
  facebook: 'https://www.facebook.com/sosranjan/', // [FACEBOOK_LINK]
  // [GOOGLE_MAPS_LINK] — a clean Maps search link. For an exact pin, open the
  // listing in Google Maps → Share → Copy link, and paste it here.
  googleMaps:
    'https://www.google.com/maps/search/?api=1&query=School+of+Soccer+Patel+Field+Stadium+Road+Samastipur',
  justdial:
    'https://www.justdial.com/Samastipur/School-Of-Soccer-Near-Patel-Field-Uttarayan/9999P6274-6274-221221202024-R9M8_BZDET',
}

export const WHATSAPP_MESSAGE =
  'Hello School of Soccer! I am interested in joining your football academy. Please share details about admission, training programs, fees, and schedules.'

// → https://wa.me/918340668200?text=…  (opens WhatsApp with the message typed in; the visitor still presses Send)
export function whatsappLink(message = WHATSAPP_MESSAGE) {
  return `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`
}

// Shared attributes for every link that opens WhatsApp in a new tab/app.
export const externalLink = { target: '_blank', rel: 'noopener noreferrer' }

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Founder', href: '#founder' },
  { label: 'Programs', href: '#programs' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]
