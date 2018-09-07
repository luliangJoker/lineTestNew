import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App.vue'
import InputInfo from '../views/InputInfo.vue'
import RaiseAmountResult from '../views/RaiseAmountResult.vue'
import TestAmountResult from '../views/TestAmountResult.vue'
import RaiseAmount from '../views/RaiseAmount.vue'

Vue.use(VueRouter)

const routers = [{
    path: '',
    redirect: '/RaiseAmount'
},{
    path: '/InputInfo',
    component: InputInfo
}, {
    path: '/raiseAmountResult',
    component: RaiseAmountResult
}, {
    path: '/testAmountResult',
    component: TestAmountResult
}, {
    path: '/raiseAmount',
    component: RaiseAmount
}];

const router = new VueRouter({
    // mode: 'history',
    scrollBehavior: () => ({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
        y: 0
    }),
    routes: routers // (缩写) 相当于 routes: routes
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

export default router;