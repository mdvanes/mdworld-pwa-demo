#!/usr/bin/env node
/* eslint-env node */

const register = (app, subscriptions) => {
    app.get('/subscribe', (req, res) => {
        const subscriptionKey = req.query.key;
        console.log(`subscribe: ${subscriptionKey}`);
        if(subscriptions.indexOf(subscriptionKey) === -1) {
            subscriptions.push(subscriptionKey);
            // TODO must be stored in a Set, not a list!
        }
        res.send({result: 'ok'});
    });
};

module.exports = { register };