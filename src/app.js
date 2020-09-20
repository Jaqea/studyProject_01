import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'
import router from './router'
import iView from 'iview'
import VueCookies from 'vue-cookies'
import Axios from 'axios'
let Base64 = require('js-base64').Base64

import './assets/css/theme.less'

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(VueCookies)
Vue.prototype.$ajax = Axios
Axios.defaults.withCredentials = true //携带cookie
Vue.config.productionTip = false
var vm = new Vue({
    el: '#app',
    data: {
        msg: 1123
    },
    render: createElement => createElement(app),
    router
})