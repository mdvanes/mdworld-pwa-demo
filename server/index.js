#!/usr/bin/env node
/* eslint-env node */

const express = require('express');
const http = require('http');
const subscribe = require('./controllers/subscribe');
const getuptime = require('./controllers/getuptime');
const setuptime = require('./controllers/setuptime');
const uptime = require('./helpers/uptime');

const app = express();
const port = process.env.PORT || 3000;
const startTime = (new Date()).getTime(); // Server start time
const subscriptions = [];

// If true, periodically send notifications of the uptime of this server with FirebaseCM to all registered service workers
let sendUptimeUpdates = false;

app.use(express.static('public'));

setuptime.register(app, startTime, subscriptions, sendUptimeUpdates);
getuptime.register(app, startTime);
subscribe.register(app, subscriptions);

// HTTP (only works on localhost, on production a reverse proxy facing HTTPS is used)
http.createServer(app).listen(port, () => {
        console.log(`mdworld-pwa-demo listening at http://localhost:${port} since ${getuptime.startTime}`);
        uptime.startSendUptimeInterval(subscriptions, startTime, sendUptimeUpdates);
    }
);
