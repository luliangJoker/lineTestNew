import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import './component';
import './services/onload.js'

import VueAwesomeSwiper from 'vue-awesome-swiper';

import './assets/styles/reset.css'
import './assets/styles/border.css'

import store from './store/index.js'
import 'swiper/dist/css/swiper.css'

// Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
Vue.config.silent = true;
Vue.config.devtools = true;
Vue.config.productionTip = false;

let vmRouter;

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: {
        App
    }
})