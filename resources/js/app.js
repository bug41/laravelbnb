require('./bootstrap');

import router from "./routes";
import VueRouter from "vue-router";
import Vuex from 'vuex';
import Index from "./Index";
import moment from "moment";
import StarRating from "./shared/components/StarRating.vue";
import FatalError from "./shared/components/FatalError.vue";
import Success from "./shared/components/Success.vue";
import ValidationErrors from "./shared/components/ValidationErrors.vue";
import Vue from "vue";

window.Vue = require('vue');

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
// Vue.component('example-2', require('./components/Example2.vue').default);

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("success", Success);
Vue.component("v-errors", ValidationErrors);


const store = new Vuex.Store({
    state : {
        count: 0
    },
    mutations: {
        increment(state){
            state.count++
        }
    }
});

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        "index": Index
    }
});
