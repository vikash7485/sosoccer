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
  addressHi: 'पटेल मैदान के पास, स्टेडियम रोड, उत्तरायण, समस्तीपुर, बिहार 848101',
  addressShort: 'Stadium Road, Uttarayan, Samastipur',
  addressShortHi: 'स्टेडियम रोड, उत्तरायण, समस्तीपुर',
  timings: '6:00 AM to 9:00 PM, all days',
  timingsHi: 'सुबह 6:00 से रात 9:00 बजे तक, हर दिन',
  // Opening hours used by the live "Open now" badge (India time, every day)
  openHour: 6,
  closeHour: 21,

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
  { label: 'Home', labelHi: 'होम', href: '#home' },
  { label: 'About', labelHi: 'परिचय', href: '#about' },
  { label: 'Founder', labelHi: 'संस्थापक', href: '#founder' },
  { label: 'Programs', labelHi: 'प्रोग्राम', href: '#programs' },
  { label: 'Stars', labelHi: 'सितारे', href: '#stars' },
  { label: 'Achievements', labelHi: 'उपलब्धियाँ', href: '#achievements' },
  { label: 'Gallery', labelHi: 'गैलरी', href: '#gallery' },
  { label: 'Reviews', labelHi: 'रिव्यू', href: '#testimonials' },
  { label: 'Contact', labelHi: 'संपर्क', href: '#contact' },
]
