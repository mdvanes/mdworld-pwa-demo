import http from '../../util/http';
import style from '!style!css!sass!./sw-notification.scss'; // eslint-disable-line no-unused-vars

export default {
    data() {
        return {
            loading: false,
            showNotifications: false
        };
    },
    created() {
        this.getUptimeStatus();
    },
    watch: {
        '$route': 'getUptimeStatus'
    },
    methods: {
        getUptimeStatus() {
            this.loading = true;
            http.get('/sendUptime')
                .then(data => {
                    this.showNotifications = JSON.parse(data).sendUptime;
                    this.loading = false;
                });
        }
    },
    template:
        `<article>
            <h2 id="notification-api">Service Worker Notification API</h2>
            <p>
                Serviceworker Notifications do not work just like an <code>alert()</code> that happens to render
                outside the browser. Because the Notification is ran on an Service Worker
                (<a href="https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification">docs</a>)
                they are more capable: as long as the back-end server is running and sending
                notifications through Google Cloud Messaging it will show up on the device that has registered
                on it. Even if the browser is closed!<br/>
                To test this, toggle "show notificatons" below to "on". This
                will tell the server to send regular push notifications with the uptime of the server. The interval
                is 60 seconds. After seeing a notification, try closing the browser and waiting for 60 seconds.
                A notification should be still be shown.
            </p>
            <p>
                Show notifications:
                <div v-if="loading" class="loading" title="Loading..."></div>
                <toggle-notifications v-if="!loading" v-bind:checked="showNotifications"></toggle-notifications>
            </p>
        </article>`
};
