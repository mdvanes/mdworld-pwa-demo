/**
 * Created by m.van.es on 18-10-2016.
 */
import Vue from 'vue';

Vue.component('experiment-warning', {
    props: ['msg'],
    data: function() {
        return {isChrome: navigator.appVersion && navigator.appVersion.indexOf('Chrome/') > -1};
    },
    template: '<div v-if="!isChrome" class="my-comp bg-danger"><p>{{msg}}</p></div>' // TODO import from template with webpack
});