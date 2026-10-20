/* Service worker do app de estudos — cache e funcionamento offline. */

const VERSAO = 'v2';
const CACHE_NAME = `quiz-historia-${VERSAO}`;

// Tudo que é preciso para o quiz funcionar sem internet.
const PRECACHE = [
  './',
  './index.html',
  './css/estilos.css',
  './js/perguntas.js',
  './js/app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png',
];

// Install: pré-cacheia o app. Um arquivo que falhar não cancela a instalação.
self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => undefined)
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

// Activate: descarta caches de versões antigas.
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((nomes) =>
        Promise.all(nomes.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (evento) => {
  if (evento.data === 'SKIP_WAITING') self.skipWaiting();
});

/** Marca as respostas servidas pelo service worker, para facilitar depuração. */
function marcar(response) {
  const headers = new Headers(response.headers);
  headers.set('X-Served-By', 'service-worker');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/** Navegação: rede primeiro, cache depois, e por último o index em cache. */
async function navegar(request) {
  try {
    const resposta = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, resposta.clone());
    return marcar(resposta);
  } catch {
    const emCache = await caches.match(request, { ignoreSearch: true });
    if (emCache) return marcar(emCache);
    const index = await caches.match('./index.html');
    if (index) return marcar(index);
    return new Response('<h1>Offline</h1>', {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

/** Demais arquivos: cache primeiro e atualização em segundo plano. */
async function buscarAtivo(request) {
  const emCache = await caches.match(request);
  const rede = fetch(request)
    .then((resposta) => {
      if (resposta && resposta.ok && resposta.type === 'basic') {
        const copia = resposta.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
      }
      return resposta;
    })
    .catch(() => null);

  if (emCache) return marcar(emCache);
  const resposta = await rede;
  if (resposta) return marcar(resposta);
  return new Response('', { status: 504, statusText: 'Offline' });
}

self.addEventListener('fetch', (evento) => {
  const request = evento.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    evento.respondWith(navegar(request));
    return;
  }

  evento.respondWith(buscarAtivo(request));
});
