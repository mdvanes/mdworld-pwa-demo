import Vue from 'vue';
import VueRouter from 'vue-router';
import installNotificationSw from './util/sw-notification-installer';
import {loadServiceWorker} from './util/load-service-worker';

import {experimentWarning} from './components/experiment-warning/experiment-warning';
import {toggleNotifications} from './components/toggle-notifications/toggle-notifications';
import {homescreen} from './components/homescreen/homescreen';
import swNotification from './components/sw-notification/sw-notification';
import {swCache} from './components/sw-cache/sw-cache';

import styleMain from '!style!css!sass!../node_modules/wingcss/dist/wing.min.css'; // eslint-disable-line no-unused-vars
import styleOverrides from '!style!css!sass!./app.scss'; // eslint-disable-line no-unused-vars

Vue.use(VueRouter);

// Register Vue components before initializing Vue App
Vue.component('experiment-warning', experimentWarning);
Vue.component('toggle-notifications', toggleNotifications);

// TODO 404 fallback http://router.vuejs.org/en/essentials/history-mode.html
// Or better: https://github.com/chrisvfritz/vue-2.0-simple-routing-example
const routes = [
    { path: '/homescreen', component: homescreen },
    { path: '/swnotification', component: swNotification },
    { path: '/swcache', component: swCache },
    { path: '*', redirect: '/homescreen' }
];

const router = new VueRouter({ mode: 'history', routes });

// Initialize Vue App
new Vue({
    router,
    el: '#app',
    data: {
        message: 'This is an experimental PWA. Be warned that the Notification API only works under latest Chrome.',
        showNotifications: false // TODO remove?
    }
});

// Only one SW per scope (http://stackoverflow.com/questions/36000127/can-i-have-multiple-service-workers-both-intercept-the-same-fetch-request)
// so differ scopes or merge into one SW https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register
loadServiceWorker('serviceworker.bundle.js', (reg) => {
    console.log('successfully loaded sw-cache');
    installNotificationSw(reg);
});
