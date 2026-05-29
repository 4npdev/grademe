const CACHE_NAME = 'grademe-v1';
const ASSETS = [
  'index.html',
  'index.css',
  'css/home.css',
  'css/grades.css',
  'js/storage.js',
  'app.js',
  'manifest.json'
];


self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});


self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});