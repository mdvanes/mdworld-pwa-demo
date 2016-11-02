import http from './http';

// TODO review/refactor (promises)
const loadServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        console.log('Service Worker is supported');
        // serviceworker.js in sub dir doesn't work: navigator.serviceWorker.register('/public/homescreen/sw/sw.js').then(function() {
        navigator.serviceWorker.register('sw.bundle.js')
            .then(function() {
                return navigator.serviceWorker.ready;
            }).then(function(reg) {
                console.log('Service Worker is ready :^)', reg);
                reg.pushManager.subscribe({userVisibleOnly: true})
                    .then(function(sub) {
                        console.log('endpoint:', sub, sub.endpoint);
                        let key = sub.endpoint.substring(sub.endpoint.lastIndexOf('/') + 1);
                        document.getElementById('currentSubscriptionKey').innerHTML = key;
                        let curlCommand = `curl --header "Authorization: key=AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\\"registration_ids\\":[\\"${key}\\"]}"`;
                        document.getElementById('curlCommand').innerHTML = curlCommand; // TODO remove or use Vue?

                        // Register the notification subscription key to the server
                        //document.getElementById('subscribeLink').setAttribute('href', `http://localhost:3000/subscribe?key=${key}`);
                        http.get(`/subscribe?key=${key}`)
                            .then(function(data) {
                                console.log('success', data);
                            })
                            .catch(function(data) {
                                console.error('error', data);
                            });
                        // TODO ajax call with currentSubscriptionKey to /subscribe?key=currentSubscriptionKey
                        // npm install browser-request
                        //var request = require('browser-request')
                        //request('/', function(er, res) {
                        //    if(!er)
                        //        return console.log('browser-request got your root path:\n' + res.body)
                        //
                        //    console.log('There was an error, but at least browser-request loaded and ran!')
                        //    throw er
                        //})
                    });
                // TODO log this endpoint on the HTML with curl command for easier testing
                // TODO Subscribe endpoint ids to a server and send notifications from there
            }).catch(function(error) {
                console.log('Service Worker error :^(', error);
            });
    }
};

export {loadServiceWorker};