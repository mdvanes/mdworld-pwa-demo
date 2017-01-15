//import http from './http';

const loadServiceWorker = (swFileName, installFunc) => {
    if('serviceWorker' in navigator) {
        console.group('Notification Service Worker');
        console.log('Service Worker is supported');
        // serviceworker.js in sub dir doesn't work: navigator.serviceWorker.register('/public/homescreen/sw/sw.js').then(function() {
        navigator.serviceWorker.register(swFileName)
            .then(() => navigator.serviceWorker.ready)
            .then(reg => {
                console.log('Service Worker is ready :^)', reg);
                installFunc(reg);
                //reg.pushManager.subscribe({userVisibleOnly: true})
                //    .then(sub => {
                //        const key = sub.endpoint.substring(sub.endpoint.lastIndexOf('/') + 1);
                //        const curlCommand = `curl --header "Authorization: key=AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\\"registration_ids\\":[\\"${key}\\"]}"`;
                //        console.log('Subscription on PushManager:', sub);
                //        console.log('Key of this registered servicworker:', key);
                //        console.log(`For debugging use this CURL command: ${curlCommand}`);
                //
                //        // Register the notification subscription key to the server
                //        http.get(`/subscribe?key=${key}`)
                //            .then(data => {
                //                if(JSON.parse(data).result !== 'ok') {
                //                    throw new Error('load-service-worker.js: subscription failed');
                //                }
                //                console.groupEnd();
                //            })
                //            .catch(error => {
                //                console.error('Subscription with key to server failed:', error);
                //                console.groupEnd();
                //            });
                //    });
            })
            .catch(error => {
                console.error('Service Worker error :^(', error);
                console.groupEnd();
            });
    }
};

export {loadServiceWorker};