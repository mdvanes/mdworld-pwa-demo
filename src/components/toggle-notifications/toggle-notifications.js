import http from '../../util/http';
import style from '!style!css!sass!./toggle-notifications.scss'; // eslint-disable-line no-unused-vars

export default {
    props: ['checked'],
    methods: {
        sendToggle: function(event) {
            const state = this.checked || false;
            http.get(`/sendUptime?send=${state}`)
                .then(data => {
                    //const sendUptime = JSON.parse(data).sendUptime;
                    //console.log('toggle-notifications: success?', data, 'senduptime', sendUptime);
                    if(JSON.parse(data).offline) {
                        this.checked = false;
                        alert('It appears there is no internet connection at the moment. Please, try again after reconnecting.');
                    }
                })
                .catch(err => {
                    console.error('Can\'t send uptime', err);
                });
        }
    },
    template:
        `<span>
            <label>
                <input class="tgl tgl-light" type="checkbox" v-model="checked" v-on:change="sendToggle">
                <span class="tgl-btn"></span>
            </label>
            <!--toggle notifications {{checked}}-->
        </span>`
};
