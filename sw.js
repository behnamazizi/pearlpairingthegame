self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('v1.3').then((cache) => cache.addAll([
            '/pearlpairingthegame/',
            '/pearlpairingthegame/index.html',
            '/pearlpairingthegame/assets/reset.css',
            '/pearlpairingthegame/assets/style.css',
            '/pearlpairingthegame/assets/script.js',
            '/pearlpairingthegame/assets/fonts/Bungee-Regular.woff2',
            '/pearlpairingthegame/assets/images/ball-0-b.svg',
            '/pearlpairingthegame/assets/images/ball-0-sh.svg',
            '/pearlpairingthegame/assets/images/ball-1-b.svg',
            '/pearlpairingthegame/assets/images/ball-1-sh.svg',
            '/pearlpairingthegame/assets/images/ball-2-b.svg',
            '/pearlpairingthegame/assets/images/ball-2-sh.svg',
            '/pearlpairingthegame/assets/images/base-0.svg',
            '/pearlpairingthegame/assets/images/base-1.svg',
            '/pearlpairingthegame/assets/images/icon.svg',
        ]))
    )
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});
