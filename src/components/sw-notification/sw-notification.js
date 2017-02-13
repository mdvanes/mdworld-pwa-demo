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
        },
        alertExample() {
            alert('Wow, so magical!');
        },
        notificationExample() {
            const spawnNotification = function() {
                if(Notification.permission === 'granted') {
                    new Notification('Watch this Notification!', {
                        // http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
                        // https://r12a.github.io/apps/conversion/
                        body: 'Even more magical! \uD83D\uDE01'
                    });
                }
            };
            if(!('Notification' in window)) {
                alert('This browser does not support system notifications');
            } else if(Notification.permission === 'denied') {
                return;
            } else if(Notification.permission !== 'denied' && Notification.permission !== 'granted') {
                Notification.requestPermission(() => {
                    spawnNotification();
                });
            }
            spawnNotification();
        }
    },
    template:
        `<article>
            <h2 id="notification-api">Service Worker Notification API</h2>
            <p>
                Notifications work just like an <code>alert()</code> that renders outside the browser. You do need to
                ask permission from the user.
                <button class="btn btn-clear" @click="alertExample">Try out an alert!</button>
                <button class="btn btn-clear" @click="notificationExample">Try out a basic Notification!</button>
            </p>
            <p>
                Notifications that are ran by a Service Worker
                (<a href="https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification">docs</a>)
                are even more capable: as long as the back-end server is running and sending
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
