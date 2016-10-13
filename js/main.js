if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
  // this doesn't work: navigator.serviceWorker.register('/public/homescreen/sw/sw.js').then(function() {
  navigator.serviceWorker.register('serviceworker.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(reg) {
    console.log('Service Worker is ready :^)', reg);
        reg.pushManager.subscribe({userVisibleOnly: true})
            .then(function(sub) { 
                console.log('endpoint:', sub, sub.endpoint);
                let key = sub.endpoint.substring(sub.endpoint.lastIndexOf('/') + 1);
                document.getElementById('currentSubscriptionKey').innerHTML = key;
            }); 
        // TODO log this endpoint on the HTML with curl command for easier testing
        // TODO Subscribe endpoint ids to a server and send notifications from there
  }).catch(function(error) {
    console.log('Service Worker error :^(', error);
  });
}
