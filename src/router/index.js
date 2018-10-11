import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../App.vue'
import InputInfo from '../views/busMeasure/InputInfo.vue'
import TestAmountResult from '../views/busMeasure/TestAmountResult.vue'

import RaiseAmountResult from '../views/RaiseAmountResult.vue'
import RaiseAmount from '../views/RaiseAmount.vue'
import SendPhoneCode from '../views/SendPhoneCode.vue'  //SendPhonecodefail
import SendPhonecodefail from '../views/SendPhonecodefail.vue'

import selectCom from '../views/selectCom/selectCom.vue'

import CitySearch from '../views/citySearch/CitySearch.vue'

import swiperHome from '../views/Swiper.vue'

Vue.use(VueRouter)

const routers = [{
    path: '',
    redirect: '/InputInfo'
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
},{
    path: '/sendPhonecode',
    component: SendPhoneCode
},{
    path: '/sendPhonecodefail',
    component: SendPhonecodefail
},{
    path: '/citySearch',
    component: CitySearch
},{
    path: '/selectCom',
    component: selectCom
},{
    path: '/swiperHome',
    component: swiperHome
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