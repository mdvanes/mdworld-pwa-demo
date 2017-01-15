console.log('Started', self);

self.addEventListener('install', function (event) {
    self.skipWaiting();
    console.log('Installed', event);
});

self.addEventListener('activate', function (event) {
    console.log('Activated', event);
});

self.addEventListener('push', function (event) {
    console.log('Push message received', event);
    /*
     Changing this message by reading event.data.json() is apparently not very straightforward, see https://developers.google.com/web/updates/2016/03/web-push-encryption
     The older style would be to do a server call to retrieve the required information.
     //https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Using_the_Push_API
     */

    // XMLHttpRequest not available in Service Worker, use Fetch API
    fetch('getuptime', {
        method: 'GET'/*,
         body: 'form'*/
    })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                console.log('Network response was not ok.', response);
            }
        })
        .then(function(json) {
            const title = 'Push message';
            const uptimeSec = Math.round(json.uptime / 1000);
            //console.log('found uptime:', uptimeSec);

            event.waitUntil(
                self.registration.showNotification(title, {
                    body: `The uptime is ${uptimeSec}s (see serviceworker.js)`,
                    icon: 'launcher-icon-4x.png',
                    tag: 'my-tag'
                }));
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
});
