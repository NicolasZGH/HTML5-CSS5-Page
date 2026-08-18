const CACHE_NAME = 'livecoffee-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/style.css',
  '/images/banner-crop.jpg',
  '/images/imagen1.jpg',
  '/images/imagen2.jpg',
  '/images/imagen3.jpg',
  '/images/elian.jpg',
  '/images/diego.jpg',
  '/images/ernest.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
