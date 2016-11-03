import http from '../../util/http';
import style from '!style!css!sass!./toggle-notifications.scss';
console.log('css', style);

const toggleNotifications = {
    props: ['checked'],
    data: function() {
        // TODO remove "data"?
    },
    methods: {
        sendToggle: function(event) {
            const state = this.checked || false;
            //console.log('testtogglenotifications', state);
            http.get(`/sendUptime?send=${state}`)
                .then(function(data) {
                    const sendUptime = JSON.parse(data).sendUptime;
                    console.log('success?', data, 'senduptime', sendUptime);
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
        `<span>
            <label>
                <input class="tgl tgl-light" type="checkbox" v-model="checked" v-on:change="sendToggle">
                <span class="tgl-btn"></span>
            </label>
            toggle notifications {{checked}}
        </span>`
};

export {toggleNotifications};