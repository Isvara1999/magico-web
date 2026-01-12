const CACHE_NAME = 'reset-vital-v3';

// Archivos críticos para cachear inmediatamente
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/reset-vital-5-d',
  '/favicon.svg',
  '/uploads/logo blanco.svg',
  '/uploads/logo negro.svg',
  '/pwa-192x192.png',
  '/pwa-512x512.png'
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

// Fetch: Estrategia "Network First, falling back to Cache"
// Intenta internet primero, si falla (offline), usa lo guardado.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});