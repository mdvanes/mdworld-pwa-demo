#!/usr/bin/env node
/* jshint esnext:true */
'use strict';
const express = require('express');
const app = express();
//const spdy = require('spdy');
const http = require('http');
const gcm = require('node-gcm');
const port = process.env.PORT || 3000;
const startTime = (new Date()).getTime(); // Server start time
const subscriptions = [];

// If true, periodically send notifications of the uptime of this server with FirebaseCM to all registered service workers
let sendUptimeUpdates = false;
let sendUptimeInterval = null;

app.use(express.static('public'));

// TODO use websockets to update the toggle on all clients?
app.get('/sendUptime', (req, res) => {
    console.log(`SendUptime: the server was started at ${startTime} and `, req.query.send);
    sendUptimeUpdates = req.query.send;
    startSendUptimeInterval(false); // TODO should be stateless!
    res.send({sendUptime: true}); // TODO should be variable
});

app.get('/debugnotify', (req, res) => {
    notify('testing notify');
    res.send({msg: 'notify was called'});
});

app.get('/getuptime', (req, res) => {
    const uptime = (new Date()).getTime() - startTime;
    res.send({uptime: uptime});
});

function startSendUptimeInterval() {
    if(sendUptimeUpdates) {
        sendUptimeInterval = setInterval(() => notify(`uptime is now ${(new Date()).getTime() - startTime} ms`), 60000)
    } else {
        clearInterval(sendUptimeInterval);
    }
}

function notify(msg) {
    //curl --header "Authorization: key=AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"e1zoTBv_GDQ:APA91bEpN-mpbdZ6eQGA7NgiAR1742RQecuJ1F3ozfbarTcElfdsK8I4iYBwjg-W7NY3w2zNUQkTT7DPUnIcvhDjegmmsLaB3cNKKdsEbGOGbK6VBmzwZFe7w2YNv_75H9U-5ng-Oau9\"]}"
    console.log(msg, subscriptions);
    // TODO iterate over all keys (test)

    /*
    Change the contents of the message: not so easy. It should be possible to set a notification property with a title and body in the gcm.Message.
    But the tutorial so far is for chrome < 50. In this article (https://developers.google.com/web/updates/2016/03/web-push-encryption) it says:
        Prior to Chrome 50, push messages could not contain any payload data. When the 'push' event fired in your service worker,
        all you knew was that the server was trying to tell you something, but not what it might be.
        You then had to make a follow up request to the server and obtain the details of the notification to show, which might fail in poor network conditions.
    */
    const message = new gcm.Message({
        //data: { key1: 'msg1' },
        //notification: {
        //    title: 'Hello, World',
        //    body: 'las;kdfjlasdkjflaskdjf'
        //}
    });
    const sender = new gcm.Sender('AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0');
    sender.send(message, { registrationTokens: subscriptions }, (err, response) => {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });
}

app.get('/subscribe', (req, res) => {
    const subscriptionKey = req.query.key;
    console.log(`subscribe: ${subscriptionKey}`);
    if(subscriptions.indexOf(subscriptionKey) === -1) {
        subscriptions.push(subscriptionKey);
        // TODO must be stored in a Set, not a list!
    }
    res.send({result: 'ok'});
});

// HTTP (only works on localhost) disable for production
http.createServer(app).listen(port, () => {
        console.log(`mdworld-pwa-demo listening at http://localhost:${port} since ${startTime}`);
        startSendUptimeInterval();
    }
);
// HTTPS (same problem as HTTP/2, can't retrieve the serviceworker.js)
// Might work: Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://your.insecure.site
// See https://bugs.chromium.org/p/chromium/issues/detail?id=561820
// https.createServer(options, app).listen(port,
//     () => console.log('mdworld-pwa-demo listening at https://localhost:' + port)
// );
// HTTP/2
/*
TODO might just need this:
    if(path.extname(filename) == '.js'){
      res.setHeader('content-type', 'application/javascript');
    }
But when I call https://localhost:3000/serviceworker.js I see this is already the content-type 
*/
// spdy
//     .createServer(options, app)
//     .listen(port, error => {
//         if (error) {
//           console.error(error);
//           return process.exit(1);
//         } else {
//           console.log('mdworld-pwa-demo listening at https://localhost:' + port);
//         }
//     });
