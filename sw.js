const CACHE = 'mesas-jl-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => (k===CACHE)?null:caches.delete(k)))));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(resp => {
        try {
          const url = new URL(req.url);
          if (url.origin === location.origin) {
            const clone = resp.clone();
            caches.open(CACHE).then(c => c.put(req, clone));
          }
        } catch(e){}
        return resp;
      }).catch(() => caches.match('./index.html'));
    })
  );
});