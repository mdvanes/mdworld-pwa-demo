#!/usr/bin/env node
/* jshint esnext:true */
'use strict';
const express = require('express');
const app = express();
//const spdy = require('spdy');
const http = require('http');
//const https = require('https');
//const https = require('follow-redirects').https;
const gcm = require('node-gcm');
//const fs = require('fs');
const port = process.env.PORT || 3000;
const startTime = (new Date()).getTime(); // Server start time
const subscriptions = [];

//const options = {
//    key: fs.readFileSync(__dirname + '/key.pem'),
//    cert:  fs.readFileSync(__dirname + '/cert.pem')
//};

// If true, periodically send notifications of the uptime of this server with Firebase to all registered service workers
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

//app.get('/debugnotify', (req, res) => {
//    notify('testing notify');
//});

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
    // TODO iterate over all keys!

    const message = new gcm.Message({
        data: { key1: 'msg1' }
    });
    const sender = new gcm.Sender('AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0');
    //var regTokens = ['YOUR_REG_TOKEN_HERE'];

    sender.send(message, { registrationTokens: subscriptions }, (err, response) => {
        if (err) {
            console.error(err);
        } else {
            console.log(response);
        }
    });

    //const options = {
    //    host: 'android.googleapis.com',
    //    path: '/gcm/send',
    //    headers: {
    //        'Authorization': 'key=AIzaSyDLNHW-P0lk4yaVSTlVnYakexdW-fsAeC0',
    //        'Content-Type': 'application/json'
    //    }
    //};
    //const req = https.request(options, response => {
    //    console.log('notify response: ', response);
    //    response.on('data', (chunk) => {
    //        console.log(`BODY: ${chunk}`);
    //    });
    //});
    //// TODO use querystring.stringify to build this data that is passed to req.write - var querystring = require('querystring');
    //req.write("{\"registration_ids\":[\"e1zoTBv_GDQ:APA91bEpN-mpbdZ6eQGA7NgiAR1742RQecuJ1F3ozfbarTcElfdsK8I4iYBwjg-W7NY3w2zNUQkTT7DPUnIcvhDjegmmsLaB3cNKKdsEbGOGbK6VBmzwZFe7w2YNv_75H9U-5ng-Oau9\"]}");
    //req.end();
}

app.get('/subscribe', (req, res) => {
    const subscriptionKey = req.query.key;
    console.log(`subscribe: ${subscriptionKey}`);
    subscriptions.push(subscriptionKey);
    // TODO must be stored in a Set, not a list!
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
