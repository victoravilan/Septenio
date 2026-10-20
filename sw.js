/* Septenios · Service Worker
   Estrategia:
   - Navegaciones: red primero, cache como respaldo (así siempre ves la última versión).
   - Estáticos: cache primero con revalidación en segundo plano.
   Para publicar una actualización: subí el número de VERSION y el SW se renueva solo. */

const VERSION = 'septenios-v1';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    // cargamos de a uno: si falta un archivo, el resto igual queda en cache
    await Promise.all(CORE.map(u => c.add(u).catch(err => console.warn('[SW] no se pudo cachear', u, err))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n !== VERSION).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;          // no tocamos recursos de terceros
  if (url.pathname.indexOf('/sw.js') !== -1) return;        // el SW siempre desde la red

  // Navegaciones (HTML): red primero, cache después
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const net = await fetch(req);
        const c = await caches.open(VERSION);
        c.put('./index.html', net.clone()).catch(() => { });
        return net;
      } catch (err) {
        const hit = await caches.match(req);
        if (hit) return hit;
        const shell = await caches.match('./index.html');
        if (shell) return shell;
        return new Response('<h1>Sin conexión</h1><p>Abrí la app una vez con internet para que quede disponible sin conexión.</p>',
          { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
    })());
    return;
  }

  // Estáticos: cache primero + revalidación
  e.respondWith((async () => {
    const c = await caches.open(VERSION);
    const hit = await c.match(req);
    const upd = fetch(req).then(net => { c.put(req, net.clone()).catch(() => { }); return net; }).catch(() => null);
    return hit || (await upd) || caches.match('./index.html') || Response.error();
  })());
});
