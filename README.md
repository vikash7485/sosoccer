# School of Soccer — Website

React + Vite + Tailwind CSS v4. Mobile-first, single page.

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production build → /dist (upload this folder to any static host)
```

## 1. Edit contact details
Everything (phone, WhatsApp, Instagram, Facebook, Google Maps) is in **`src/config/site.js`**.

> ⚠️ The phone number provided (`83406682200`) has **11 digits** — Indian mobiles have 10.
> Fix `PHONE_DIGITS` and `WHATSAPP_DIGITS` in `site.js`, otherwise Call/WhatsApp buttons won't connect.

## 2. Add the academy's photos (from Facebook / Instagram only)
Facebook/Instagram image URLs are signed and expire, so they can't be linked directly.
Download the photos from https://www.facebook.com/sosranjan/ and https://www.instagram.com/gandhi_ranjan/
and save them in **`/raw-images`** with these names:

| File name | Used for | Suggested photo |
|---|---|---|
| _(not needed)_ | Homepage background | Stadium video in `public/videos/` (Pexels #11918917, free Pexels License) |
| `about.jpg` | About section | Coach guiding players |
| `gallery-01.jpg` … `gallery-10.jpg` | Gallery | Drills, matches, team photo, celebrations, ground |

Then run:

```bash
npm run images
```

This compresses each photo into WebP at 640/1280/1920 px in `/public/images`. Until a photo is added,
the site shows a labelled "PHOTO PLACEHOLDER" telling you which file is missing.
Edit captions/alt text in **`src/config/images.js`**.

## 3. Replace remaining placeholders
- Coach names/bios: `src/components/Coaches.jsx` (`[COACH_NAME_1]` …)
- Testimonials: `src/components/Testimonials.jsx` (marked "Sample testimonial" — remove the badge once real)
- Enquiry form has no backend: it shows a success message + "Send on WhatsApp" button with the details pre-filled.
  To also receive enquiries by email, connect Formspree/Google Forms in `src/components/Enquiry.jsx` (`onSubmit`).

## 4. Installable app (PWA)
Visitors can add School of Soccer to their phone's home screen and open it like an app.
- Android / Chrome / Edge: an **Install App** banner appears 3 s after the page loads (one tap).
- iPhone / iPad: the banner shows the two steps (Share → Add to Home Screen).
- Anyone can reopen it from **Download App** in the footer. "Not now" hides it for 7 days.

Files: `public/manifest.webmanifest`, `public/sw.js`, `public/icons/`, `src/components/InstallApp.jsx`.
**Installing only works on HTTPS** (any normal host — Netlify, Vercel, Hostinger with SSL…) or localhost.
After changing site files, bump `CACHE = 'sos-v1'` in `public/sw.js` (e.g. `sos-v2`) so installed apps pick up the update.
