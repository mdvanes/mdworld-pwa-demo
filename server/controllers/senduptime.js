#!/usr/bin/env node
/* eslint-env node */

const uptime = require('../helpers/uptime');

const register = (app, startTime, subscriptions, sendUptimeUpdates) => {
    // TODO use websockets to update the toggle on all clients?
    app.get('/sendUptime', (req, res) => {
        console.log(`SendUptime: the server was started at ${startTime} and toggle=`, req.query.send);
        if(req.query.send && req.query.send === 'true') {
            sendUptimeUpdates = true;
            uptime.startSendUptimeInterval(subscriptions, startTime, sendUptimeUpdates);
        } else if(req.query.send && req.query.send === 'false') {
            sendUptimeUpdates = false;
            uptime.startSendUptimeInterval(subscriptions, startTime, sendUptimeUpdates);
        }
        res.send({sendUptime: sendUptimeUpdates}); // TODO should be variable
    });
};

module.exports = { register };