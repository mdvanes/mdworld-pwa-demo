import Vue from 'vue';
import {loadServiceWorker} from './util/load-service-worker';
import {experimentWarning} from './components/experiment-warning'; // eslint-disable-line no-unused-vars

const vueApp = new Vue({ // eslint-disable-line no-unused-vars
    el: '#app',
    data: {
        message: 'This is an experimental PWA. Be warned that the Notification API only works under latest Chrome.'
    }
});

// Not only eslint but also Uglify complains about unused vars
console.log(experimentWarning, vueApp);

loadServiceWorker();