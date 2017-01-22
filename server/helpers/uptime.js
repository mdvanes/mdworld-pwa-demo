#!/usr/bin/env node
/* eslint-env node */

const gcm = require('node-gcm');

let sendUptimeInterval = null;

function notify(msg, subscriptions) {
    //curl --header "Authorization: key=AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"e1zoTBv_GDQ:APA91bEpN-mpbdZ6eQGA7NgiAR1742RQecuJ1F3ozfbarTcElfdsK8I4iYBwjg-W7NY3w2zNUQkTT7DPUnIcvhDjegmmsLaB3cNKKdsEbGOGbK6VBmzwZFe7w2YNv_75H9U-5ng-Oau9\"]}"
    console.log(msg, 'Nr of subscriptions:', subscriptions && subscriptions.length);
    // TODO iterate over all keys (test)

    /*
     Change the contents of the message: not so easy. It should be possible to set a notification property with a title and body in the gcm.Message.
     But the tutorial so far is for chrome < 50. In this article (https://developers.google.com/web/updates/2016/03/web-push-encryption) it says:
     Prior to Chrome 50, push messages could not contain any payload data. When the 'push' event fired in your service worker,
     all you knew was that the server was trying to tell you something, but not what it might be.
     You then had to make a follow up request to the server and obtain the details of the notification to show, which might fail in poor network conditions.
     */
    const message = new gcm.Message({});
    const sender = new gcm.Sender('AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0');
    sender.send(message, { registrationTokens: subscriptions }, (err, response) => {
        if (err) {
            console.error('GCM error:', err);
        } else {
            console.log('GCM success', response.success);
        }
    });
}

function startSendUptimeInterval(subscriptions, startTime, sendUptimeUpdates) {
    if(sendUptimeUpdates) {
        console.log('sendUptimeUpdates=true new interval');
        clearInterval(sendUptimeInterval);
        const toggleMsg =`Changed toggle. Uptime is now ${(new Date()).getTime() - startTime} ms`;
        notify(toggleMsg, subscriptions);
        sendUptimeInterval = setInterval(() => {
            const intervalMsg = `Uptime is now ${(new Date()).getTime() - startTime} ms`;
            notify(intervalMsg, subscriptions)
        }, 60000);
    } else {
        console.log('sendUptimeUpdates=false clear interval', sendUptimeInterval);
        clearInterval(sendUptimeInterval);
    }
}

module.exports = { startSendUptimeInterval };