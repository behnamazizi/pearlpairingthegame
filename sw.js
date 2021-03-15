const CacheName = '20_26_15_Mar_21';
const assets = [
    '/pearlpairingthegame/',
    '/pearlpairingthegame/index.html',
    '/pearlpairingthegame/assets/reset.css',
    '/pearlpairingthegame/assets/style.css',
    '/pearlpairingthegame/assets/script.js',
    '/pearlpairingthegame/assets/images/ball-0-b.svg',
    '/pearlpairingthegame/assets/images/ball-0-sh.svg',
    '/pearlpairingthegame/assets/images/ball-1-b.svg',
    '/pearlpairingthegame/assets/images/ball-1-sh.svg',
    '/pearlpairingthegame/assets/images/ball-2-b.svg',
    '/pearlpairingthegame/assets/images/ball-2-sh.svg',
    '/pearlpairingthegame/assets/images/base-0.svg',
    '/pearlpairingthegame/assets/images/base-1.svg',
    '/pearlpairingthegame/assets/images/icon.svg',
    '/pearlpairingthegame/assets/fonts/Bungee-Regular.woff2',
];

// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');
  evt.waitUntil(
    caches.open(CacheName).then((cache) => {
      console.log('caching...');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
