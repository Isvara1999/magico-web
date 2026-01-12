const CACHE_NAME = 'reset-vital-v4';

// Archivos críticos para cachear inmediatamente
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/reset-vital-5-d',
  '/favicon.svg',
  '/uploads/logo blanco.svg',
  '/uploads/logo negro.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  // Imágenes de la landing (Agregadas para que funcionen offline)
  '/uploads/img_6948.webp',
  '/uploads/hero(3).webp',
  '/uploads/f2d5nat1pa6uihnwj480.webp',
  '/uploads/494815924_1424799465353456_392615711940557767_n.webp',
  '/uploads/refu.webp',
  '/uploads/exterior.webp',
  '/uploads/mapa_magico.webp'
];

// Instalación: Cachear archivos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activación: Limpiar cachés viejas
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch: Estrategia "Network First + Dynamic Caching"
self.addEventListener('fetch', (event) => {
  // Solo interceptamos peticiones GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, la guardamos en caché (CSS, JS, etc.)
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla internet, buscamos en caché
        return caches.match(event.request);
      })
  );
});