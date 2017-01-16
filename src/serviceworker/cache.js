export function setInstall(caches) {
    const resources = [
        '/pwa.bundle.js'
        //'/css/imgs/sprites-v6.png',
        //'/css/fonts/whatever-v8.woff',
        //'/js/all-min-v4.js'
        // etc
    ];

    // https://jakearchibald.com/2014/offline-cookbook/
    // https://mobiforge.com/design-development/taking-web-offline-service-workers
    //event.waitUntil(
    //    caches.open('pwa-demo-v1')
    //        .then(cache => cache.addAll(resources));
    //);
    caches
        .open('pwa-demo-v1')
        .then(cache => cache.addAll(resources));
}

export function setFetch(event) {
    // Parse the URL:
    const requestURL = new URL(event.request.url);
    console.log('%csw/cache:', 'color: green; font-weight: bold', 'Fetch event', requestURL, requestURL.pathname);

    // Handle requests to a particular host specifically
    if (requestURL.pathname === '/sendUptime') {
        console.log('%csw/cache:', 'color: green; font-weight: bold', 'Intercepted sendUptime');
        event.respondWith(fetch(event.request)
            .catch(err => {
                console.log('Cant reach /sendUptime', err);
                console.log('%csw/cache:', 'color: green; font-weight: bold', 'Can\'t reach /sendUptime', err);
                // TODO if this is even needed return caches.match(event.request);
                return {'sendUptime': false, 'offline': true};
            }));
        return;
    }
};
