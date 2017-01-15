console.log('Cache SW: Started', self);

self.addEventListener('install', event => {
    const resources = [
        '/pwa.bundle.js'
        //'/css/imgs/sprites-v6.png',
        //'/css/fonts/whatever-v8.woff',
        //'/js/all-min-v4.js'
        // etc
    ];

    // https://jakearchibald.com/2014/offline-cookbook/
    https://mobiforge.com/design-development/taking-web-offline-service-workers
    //event.waitUntil(
    //    caches.open('pwa-demo-v1')
    //        .then(cache => cache.addAll(resources));
    //);
    caches
        .open('pwa-demo-v1')
        .then(cache => cache.addAll(resources));
    console.log('Cache SW: Installed', event);
});

// TODO respond to calling toggle-notifications /sendUptime?send

//self.addEventListener('activate', function (event) {
//    console.log('Activated', event);
//});

self.addEventListener('fetch', function(event) {
    // Parse the URL:
    const requestURL = new URL(event.request.url);
    console.log('Cache SW: fetch event', requestURL, requestURL.pathname);

    // Handle requests to a particular host specifically
    if (requestURL.pathname === '/sendUptime') {
        console.log('%cCache SW:', 'color: green; font-weight: bold', 'intercepted sendUptime');
        event
            .respondWith(fetch(event.request)
            .catch(function() {
                console.warn('Cache SW: cant reach /sendUptime');
                // TODO if this is even needed return caches.match(event.request);
            }));
        return;
    }
});
