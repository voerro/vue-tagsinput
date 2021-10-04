/* This file is the main entrypoint for development */

import Vue from 'vue';
import App from './App.vue';

import 'bulma/bulma.sass';

new Vue({
    render: (h) => h(App),
}).$mount('#app');
