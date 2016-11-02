//console.log('Started', self);
//
//self.addEventListener('install', function (event) {
//    self.skipWaiting();
//    console.log('Installed', event);
//});
//
//self.addEventListener('activate', function (event) {
//    console.log('Activated', event);
//});
//
//self.addEventListener('push', function (event) {
//    console.log('Push message received', event);
//
//    var title = 'Push message';
//
//    //https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Using_the_Push_API
//
//    /*
//    Changing this message by reading event.data.json() is apparently not very straightforward, see https://developers.google.com/web/updates/2016/03/web-push-encryption
//    The older style would be to do a server call to retrieve the required information.
//     */
//
//    // TODO call server to get uptime (promise library needed)
//
//    //function getJson() {
//    //    return new Promise( (resolve, reject) => {
//    //        const url = 'http://localhost:3000/uptime';
//    //        const xhr = new XMLHttpRequest();
//    //        xhr.onload = function() {
//    //            //callback(this.responseText)
//    //            if (this.status == 200) {
//    //                // Performs the function "resolve" when this.status is equal to 200
//    //                resolve(this.response);
//    //            } else {
//    //                // Performs the function "reject" when this.status is different than 200
//    //                reject(this.statusText);
//    //            }
//    //        };
//    //        xhr.open('GET', url, true);
//    //        xhr.send();
//    //    });
//    //}
//    //
//    //getJson()
//    //    .then(function(data) {
//    //        console.log('success', data);
//    //    })
//    //    .catch(function(data) {
//    //        console.error('error', data);
//    //    });
//
//    // XMLHttpRequest not available in Service Worker, use Fetch API
//    fetch('getuptime', {
//        method: 'GET'/*,
//        body: 'form'*/
//    }).then(function(response) {
//        if(response.ok) {
//            console.log('ok1:', response);
//            //console.log('ok2:', response.json());
//            return response.json();
//        } else {
//            console.log('Network response was not ok.', response);
//        }
//    })
//    .then(function(json) {
//        const uptimeSec = Math.round(json.uptime / 1000);
//        console.log('found uptime:', uptimeSec);
//
//        event.waitUntil(
//            self.registration.showNotification(title, {
//                body: `The uptime is ${uptimeSec}s (see serviceworker.js)`,
//                icon: 'launcher-icon-4x.png',
//                tag: 'my-tag'
//            }));
//    })
//    .catch(function(error) {
//        console.log('There has been a problem with your fetch operation: ' + error.message);
//    });
//
//    //event.waitUntil(
//    //    self.registration.showNotification(title, {
//    //        body: 'The uptime is ... (see serviceworker.js)',
//    //        icon: 'launcher-icon-4x.png',
//    //        tag: 'my-tag'
//    //    }));
//});
