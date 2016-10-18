import Vue from 'vue';
import {loadServiceWorker} from './load-service-worker';
import {experimentWarning} from './experiment-warning';

const vueApp = new Vue({
    el: '#app',
    data: {
        message: 'hello world'
    }
});

loadServiceWorker();