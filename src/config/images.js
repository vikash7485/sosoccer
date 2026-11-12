// ─────────────────────────────────────────────────────────────
// IMAGE MANIFEST
//
// All photos must come from the academy's official pages:
//   Facebook  → https://www.facebook.com/sosranjan/
//   Instagram → https://www.instagram.com/gandhi_ranjan/
//
// Facebook/Instagram image links are signed and expire after a few
// days, so they cannot be hot-linked. Instead:
//   1. Save each chosen photo from the page into  /raw-images
//      using the file name shown in `file` below (jpg/png/webp all OK).
//   2. Run:  npm run images
//      → creates compressed WebP files (640/1280/1920 px) in /public/images
//   3. Reload the site. Until a photo exists, a labelled placeholder
//      is shown in its place, telling you which file to add.
// ─────────────────────────────────────────────────────────────

export const heroImage = {
  file: 'hero',
  alt: 'Young players training on the football ground at School of Soccer, Samastipur',
  hint: 'Wide action shot of a training session (landscape)',
}

// From facebook.com/sosranjan — tall photo fits the About frame (4:5)
export const aboutImage = {
  file: 'fb-why-coaching',
  alt: 'Coach talking with a School of Soccer player on the training ground',
  hint: 'Coach guiding players during a drill',
}

export const galleryImages = [
  // Real photos from the academy's Facebook page (downloaded 10 Nov 2026)
  { file: 'fb-sports-day-1', caption: 'Team Spirit', captionHi: 'टीम भावना', alt: 'School of Soccer players and coaches with footballs at the National Sports Day 2024 celebration', shape: 'square' },
  { file: 'fb-girls-team', caption: 'Girls’ Team', captionHi: 'लड़कियों की टीम', alt: 'The School of Soccer girls’ team seated in kit on the ground', shape: 'wide' },
  { file: 'fb-muzaffarpur', caption: 'Match Day', captionHi: 'मैच का दिन', alt: 'School of Soccer number 14 watching the match against Muzaffarpur at Banhara', shape: 'wide' },
  { file: 'fb-childrens-day', caption: 'Children’s Day Final', captionHi: 'बाल दिवस फाइनल', alt: 'Three School of Soccer players at the Children’s Day final, 2024', shape: 'wide' },
  { file: 'fb-gal-bibs', caption: 'Young Warriors', captionHi: 'नन्हे वॉरियर्स', alt: 'Four young School of Soccer players in orange training bibs beside practice cones', shape: 'tall' },
  { file: 'fb-gal-floodlit', caption: 'Floodlit Training', captionHi: 'फ्लडलाइट में ट्रेनिंग', alt: 'Evening training session under floodlights at the academy ground', shape: 'square' },
  { file: 'fb-gal-match', caption: 'Junior Match', captionHi: 'जूनियर मैच', alt: 'Young School of Soccer players during a match', shape: 'tall' },
  { file: 'fb-gal-drill', caption: 'Warm-up Drill', captionHi: 'वार्म-अप ड्रिल', alt: 'Players in bibs doing a warm-up stretch together', shape: 'square' },
]

