import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import './component';
import './services/onload.js'

// Vue.use(ElementUI);
Vue.config.silent = true;
Vue.config.devtools = true;
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    template: '<App/>',
    router,
    components: {
        App
    }
})