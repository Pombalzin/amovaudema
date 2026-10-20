/* Service worker — offline support for the Daniel Melo portfolio. */

const VERSION = 'v1';
const CACHE_NAME = `daniel-melo-${VERSION}`;

// App shell: the minimum set needed to render the site offline.
const PRECACHE_URLS = [
  './',
  './index.html',
  './sobre-mim.html',
  './contato.html',
  './Daniel.html',
  './daniel.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './discord.jpg',
  './danel.jpg',
];

// Install: precache the app shell. A single failed asset must not abort the install.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_URLS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => undefined)
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

// Activate: drop old caches and take control of open pages.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

// Let the page trigger an immediate update.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

/** Tag responses the service worker hands back, so interception is easy to verify. */
function markAsServedBySW(response) {
  const headers = new Headers(response.headers);
  headers.set('X-Served-By', 'service-worker');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Network-first for navigations: always try the network so updates land fast,
 * then fall back to the cached copy, then to the cached index for offline.
 */
async function handleNavigation(request) {
  try {
    const fresh = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, fresh.clone());
    return markAsServedBySW(fresh);
  } catch {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) return markAsServedBySW(cached);
    const shell = await caches.match('./index.html');
    if (shell) return markAsServedBySW(shell);
    return new Response('<h1>Offline</h1>', {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

/**
 * Stale-while-revalidate for static assets: serve instantly from cache,
 * refresh in the background for the next visit.
 */
async function handleAsset(request) {
  const cached = await caches.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && response.ok && response.type === 'basic') {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => null);

  if (cached) return markAsServedBySW(cached);

  const response = await network;
  if (response) return markAsServedBySW(response);

  return new Response('', { status: 504, statusText: 'Offline' });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // leave cross-origin requests alone

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  event.respondWith(handleAsset(request));
});
