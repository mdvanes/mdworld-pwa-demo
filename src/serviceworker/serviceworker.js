import * as cache from './cache.js';
import * as notification from './notification.js';

console.log('SW: Started', self);

self.addEventListener('install', function (event) {
    cache.setInstall(event, caches);
    self.skipWaiting();
    console.log('SW: Installed', event);
});

self.addEventListener('activate', function (event) {
    console.log('SW: Activated', event);
});

self.addEventListener('push', function (event) {
    //console.log('SW: Push message received', event);
    notification.push(event);
});

self.addEventListener('fetch', function(event) {
    cache.setFetch(event);

    //// Parse the URL:
    //const requestURL = new URL(event.request.url);
    //console.log('Cache SW: fetch event', requestURL, requestURL.pathname);
    //
    //// Handle requests to a particular host specifically
    //if (requestURL.pathname === '/sendUptime') {
    //    console.log('%cCache SW:', 'color: green; font-weight: bold', 'intercepted sendUptime');
    //    event.respondWith(fetch(event.request)
    //        //.then(res => console.log('result', res))
    //        .catch(function() {
    //            console.warn('Cache SW: cant reach /sendUptime');
    //            // TODO if this is even needed return caches.match(event.request);
    //            //return {'sendUptime': false, 'offline': true};
    //            //return new Response();
    //            var response = {'sendUptime': false, 'offline': true};
    //            var responseBlob = new Blob([JSON.stringify(response)], {type : 'application/json'});
    //            //var myBlob = new Blob();
    //            var init = { 'status': 200 , 'statusText': 'ok' };
    //            return new Response(responseBlob, init);
    //        }));
    //    return;
    //}
});