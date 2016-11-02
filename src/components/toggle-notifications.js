import http from '../util/http';

const toggleNotifications = {
    props: ['checked'],
    //data: function() {
    //    //console.log();
    //    return null;
    //},
    methods: {
        sendToggle: function(event) {
            const state = this.checked || false;
            console.log('testtogglenotifications', state);
            http.get(`/sendUptime?send=${state}`)
                .then(function(data) {
                    console.log('success?', data);
                    //if(JSON.parse(data).result !== 'ok') {
                    //    throw new Error('load-service-worker.js: subscription failed');
                    //}
                })
                .catch(function(data) {
                    console.error('error', data);
                });
        }
    },
    template: // TODO style like animated toggle
        `<label>
            <input type="checkbox"  v-model="checked" v-on:change="sendToggle"> toggle notifications {{checked}}
        </label>`
};

export {toggleNotifications};