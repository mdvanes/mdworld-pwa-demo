const appVersion = 'pwa-demo-v1.6.0';

export function setInstall(event, caches) {
    const resources = [
        '/favicon.ico',
        '/index.html',
        '/launcher-icon-4x.png',
        '/manifest.json',
        '/pwa.bundle.js',
        '/serviceworker.bundle.js',
        'https://fonts.gstatic.com/s/quicksand/v5/sKd0EMYPAh5PYCRKSryvW6CWcynf_cDxXwCLxiixG1c.ttf',
        'https://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf'
    ];

    // https://jakearchibald.com/2014/offline-cookbook/
    // https://mobiforge.com/design-development/taking-web-offline-service-workers
    event.waitUntil(
        caches
            .open(appVersion)
            .then(cache => cache.addAll(resources))
    );
}

function createOfflineServiceResponse(responseObj) {
    const responseBlob = new Blob([JSON.stringify(responseObj)], {type: 'application/json'});
    const responseInit = {'status': 200, 'statusText': 'ok'};
    return new Response(responseBlob, responseInit);
}

export function setFetch(event) {
    // Parse the URL
    const requestURL = new URL(event.request.url);
    console.log('%csw/cache:', 'color: green; font-weight: bold', 'Fetch event', requestURL.pathname, requestURL.href);

    if (requestURL.pathname === '/sendUptime') {
        console.log('%csw/cache:', 'color: green; font-weight: bold', 'Intercepted sendUptime');
        // Network, falling back to custom response
        event.respondWith(fetch(event.request)
            .catch(function () {
                console.warn('%csw/cache:', 'color: green; font-weight: bold', 'Can\'t reach /sendUptime');
                // To return cached response: caches.match(event.request);
                const response = {'sendUptime': false, 'offline': true};
                return createOfflineServiceResponse(response);
            }));
        return;
    } else if (requestURL.pathname === '/subscribe') {
        console.log('%csw/cache:', 'color: green; font-weight: bold', 'Intercepted subscribe');
        // Network, falling back to custom response
        event.respondWith(fetch(event.request)
            .catch(function() {
                console.warn('%csw/cache:', 'color: green; font-weight: bold', 'Can\'t reach /subscribe');
                const response = {'result': 'offline'};
                return createOfflineServiceResponse(response);
            }));
        return;
    } else {
        // Network, falling back to cache
        event.respondWith(caches
            .match(event.request)
            .catch(() => fetch(event.request))
            .then(response => {
                caches
                    .open(appVersion)
                    .then(cache => {
                        cache.put(event.request, response);
                    });
                return response.clone();
            })
            .catch(() => caches.match('/index.html')));
    }
};
