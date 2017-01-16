import * as notification from './notification.js';

console.log('SW: Started', self);

self.addEventListener('install', function (event) {
    self.skipWaiting();
    console.log('SW: Installed', event);
});

self.addEventListener('activate', function (event) {
    console.log('SW: Activated', event);
});

self.addEventListener('push', function (event) {
    console.log('SW: Push message received', event);
    notification.push(event);
});
