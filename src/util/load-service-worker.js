const loadServiceWorker = (swFileName, installFunc) => {
    if('serviceWorker' in navigator) {
        console.group('Loading Service Worker', swFileName);
        console.log('Service Worker is supported');
        // serviceworker.js in sub dir doesn't work: navigator.serviceWorker.register('/public/homescreen/sw/sw.js').then(function() {
        navigator.serviceWorker.register(swFileName)
            .then(() => navigator.serviceWorker.ready)
            .then(reg => {
                console.log('Service Worker is ready :^)', reg);
                installFunc(reg);
            })
            .catch(error => {
                console.error('Service Worker error :^(', error);
                console.groupEnd();
            });
    }
};

export {loadServiceWorker};