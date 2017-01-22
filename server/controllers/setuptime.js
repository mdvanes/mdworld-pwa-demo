#!/usr/bin/env node
/* eslint-env node */

const uptime = require('../helpers/uptime');
//const startTime = (new Date()).getTime(); // Server start time

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
        // else only return the state
        ///sendUptimeUpdates = req.query.send === 'true';
        ///console.log('senduptime1', sendUptimeUpdates, typeof sendUptimeUpdates, typeof req.query.send);
        //console.log('/senduptime response=', sendUptimeUpdates);
        res.send({sendUptime: sendUptimeUpdates}); // TODO should be variable
    });
};

module.exports = { register };