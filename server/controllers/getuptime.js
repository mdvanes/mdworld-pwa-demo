#!/usr/bin/env node
/* eslint-env node */

const register = (app, startTime) => {
    app.get('/getuptime', (req, res) => {
        const uptime = (new Date()).getTime() - startTime;
        res.send({uptime: uptime});
    });
};

module.exports = { register };