// Service Worker — fallback de manutenção
const CACHE_NAME = 'torre2-maintenance-v1';
const FALLBACKS = [
  '/maintenance.html',
  '/404.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FALLBACKS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Helper to respond with maintenance fallback
async function maintenanceResponse() {
  const cache = await caches.open(CACHE_NAME);
  const resp = await cache.match('/maintenance.html');
  if (resp) return resp.clone();
  // As fallback final, return a simple Response
  return new Response('<h1>Em manutenção</h1>', { status: 503, headers: { 'Content-Type': 'text/html' } });
}

self.addEventListener('fetch', event => {
  const req = event.request;

  // Only handle navigation requests or GETs for documents/assets
  if (req.method !== 'GET') return;

  event.respondWith((async () => {
    try {
      const networkResp = await fetch(req);

      // If resource is a navigation and server returns 404 or 5xx, show maintenance
      const isNavigation = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
      if (networkResp && (networkResp.status === 404 || networkResp.status >= 500)) {
        return maintenanceResponse();
      }

      return networkResp;
    } catch (err) {
      // Network error (offline, DNS, etc.) -> show maintenance page
      return maintenanceResponse();
    }
  })());
});

// Listen to messages (optional): allow client to trigger bypass
self.addEventListener('message', event => {
  if (!event.data) return;
  if (event.data.type === 'skipWaiting') {
    self.skipWaiting();
  }
});
