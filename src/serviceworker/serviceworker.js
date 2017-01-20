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
    notification.push(event);
});

self.addEventListener('fetch', function(event) {
    cache.setFetch(event);
});