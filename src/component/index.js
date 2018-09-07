import Vue from 'vue'
import goback from "element-ui"
import Header from './header.vue'
import Picker from './picker.vue'
import Cation from './cation.vue'
import NextBtn from './nextButton.vue'

Vue.use(goback);

Vue.component('topTitle', Header)
Vue.component('pickerTime', Picker)
Vue.component('cationCode', Cation)
Vue.component('nextButton', NextBtn)