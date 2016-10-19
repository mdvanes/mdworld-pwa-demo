import Vue from 'vue';
import {loadServiceWorker} from './util/load-service-worker';
import {experimentWarning} from './components/experiment-warning';

// Register Vue components before initializing Vue App
Vue.component('experiment-warning', experimentWarning);

// Initialize Vue App
new Vue({
    el: '#app',
    data: {
        message: 'This is an experimental PWA. Be warned that the Notification API only works under latest Chrome.'
    }
});

loadServiceWorker();