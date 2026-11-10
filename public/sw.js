// School of Soccer — service worker
// Makes the site installable as an app and keeps it fast / usable on weak connections.
//  • Pages: network first, fall back to the saved copy when offline.
//  • Built JS/CSS, images, icons: cache first (they have unique names or rarely change).
//  • Videos, maps, WhatsApp and other sites: always straight from the network.

const CACHE = 'sos-v3'
const PRECACHE = ['/', '/manifest.webmanifest', '/favicon.svg', '/icons/icon-192.png', '/icons/icon-512.png', '/videos/hero-poster.webp']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return // fonts, maps, WhatsApp… go straight to network
  if (url.pathname.endsWith('.mp4')) return // video uses range requests; let the browser handle it

  // Pages: try the network, fall back to the cached home page when offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('/', copy))
          return res
        })
        .catch(() => caches.match('/')),
    )
    return
  }

  // Static files: serve from cache, fill the cache on first use
  if (/^\/(assets|images|icons|videos)\//.test(url.pathname) || url.pathname === '/favicon.svg') {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone()
              caches.open(CACHE).then((c) => c.put(req, copy))
            }
            return res
          }),
      ),
    )
  }
})
