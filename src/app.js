import Vue from 'vue';
import installNotificationSw from './util/sw-notification-installer';
import {loadServiceWorker} from './util/load-service-worker';
import http from './util/http';
import {experimentWarning} from './components/experiment-warning/experiment-warning';
import {toggleNotifications} from './components/toggle-notifications/toggle-notifications';

// Register Vue components before initializing Vue App
Vue.component('experiment-warning', experimentWarning);
Vue.component('toggle-notifications', toggleNotifications);

// Initialize Vue App
const vm = new Vue({
    el: '#app',
    data: {
        message: 'This is an experimental PWA. Be warned that the Notification API only works under latest Chrome.',
        showNotifications: false
    }
});

// Set the initial state of showNotifications by getting the state from the server
http.get('/sendUptime')
    .then(function(data) {
        const sendUptime = JSON.parse(data).sendUptime;
        //console.log('vue app.js init', sendUptime);
        vm.showNotifications = sendUptime;
    })
    .catch(function(data) {
        console.error('error', data);
    });

//loadServiceWorker('sw-cache.bundle.js', () => console.log('successfully loaded sw-cache'));
loadServiceWorker('sw-notification.bundle.js', installNotificationSw);
