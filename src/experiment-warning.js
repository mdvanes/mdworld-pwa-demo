/**
 * Created by m.van.es on 18-10-2016.
 */
import Vue from 'vue';

Vue.component('experiment-warning', {
    props: ['msg'],
    data: function() {
        return {showMsg: true};
    },
    template: '<span class="my-comp"><p v-if="showMsg">{{msg}}</p></span>' // TODO import from template with webpack
});