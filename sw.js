const CACHE_NAME = 'grademe-v1';
const ASSETS = [
  './',
  './index.html',
  './index.css',
  './css/home.css',
  './css/grades.css',
  './js/storage.js',
  './app.js',
  './manifest.json',
  './assets/GradeMe.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});