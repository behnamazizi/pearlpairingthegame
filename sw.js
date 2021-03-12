self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('v1.1').then((cache) => cache.addAll([
            '/',
            '/index.html',
            '/assets/reset.css',
            '/assets/style.css',
            '/assets/script.js',
            '/assets/fonts/Bungee-Regular.woff2',
            '/assets/images/ball-0-b.svg',
            '/assets/images/ball-0-sh.svg',
            '/assets/images/ball-1-b.svg',
            '/assets/images/ball-1-sh.svg',
            '/assets/images/ball-2-b.svg',
            '/assets/images/ball-2-sh.svg',
            '/assets/images/base-0.svg',
            '/assets/images/base-1.svg',
            '/assets/images/icon.svg',
        ]))
    )
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});