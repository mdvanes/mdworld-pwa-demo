import http from './http';

export default function installNotificationSw(reg) {
    reg.pushManager.subscribe({userVisibleOnly: true})
        .then(sub => {
            const key = sub.endpoint.substring(sub.endpoint.lastIndexOf('/') + 1);
            const curlCommand = `curl --header "Authorization: key=AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\\"registration_ids\\":[\\"${key}\\"]}"`;
            console.log('Subscription on PushManager:', sub);
            console.log('Key of this registered servicworker:', key);
            console.log(`For debugging use this CURL command: ${curlCommand}`);

            // Register the notification subscription key to the server
            http.get(`/subscribe?key=${key}`)
                .then(data => {
                    if(JSON.parse(data).result !== 'ok') {
                        throw new Error('load-service-worker.js: subscription failed');
                    }
                    console.groupEnd();
                })
                .catch(error => {
                    console.error('Subscription with key to server failed:', error);
                    console.groupEnd();
                });
        });
};