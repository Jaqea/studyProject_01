import VueRouter from 'vue-router'

import home from './views/home.vue'
import homeHeader from './components/homeHeader.vue'
import information from './components/information.vue'
import login from './views/login.vue'
import logContent from './components/log-Content.vue'
import passwordReset from './components/password-Reset-Content.vue'
import register from './views/register.vue'
import regContent from './components/Reg-Content.vue'
import terms from './components/terms.vue'
import privacy from './components/privacy.vue'
import store from './views/store.vue'
import storeContent from './components/storeContent.vue'
import EnergeticeJunior from './components/EnergeticeJunior.vue'
import LearningAssistant from './components/LearningAssistant.vue'
import product from './components/product.vue'
import settings from './components/settings.vue'
import licenses from './components/licenses.vue'
import basicInformation from './components/basicInformation.vue'
import accountSet from './components/accountSet.vue'


var router = new VueRouter({
    routes: [
        { path: '/', component: home },
        {
            path: '/login',
            component: login,
            children: [
                { path: '', component: logContent },
                { path: 'reset', component: passwordReset }
            ]
        },
        {
            path: '/register',
            component: register,
            children: [
                { path: '', component: regContent },
                { path: 'terms', component: terms },
                { path: 'privacy', component: privacy }
            ]
        },
        { path: '/information', component: information },
        {
            path: '/store',
            meta: {
                required: true
            },
            component: store,
            children: [{
                    path: 'settings',
                    component: settings,
                    children: [
                        { path: 'basic', component: basicInformation },
                        { path: '', component: basicInformation },
                        { path: 'accountset', component: accountSet }
                    ]
                },
                { path: 'licenses', component: licenses }, {
                    path: '',
                    component: storeContent,
                    children: [
                        { path: 'EnergeticeJunior', component: EnergeticeJunior }, { path: 'LearningAssistant', component: LearningAssistant },
                        { path: '', component: EnergeticeJunior }, { path: 'product', component: product }
                    ]
                }
            ],
        }
    ],
    linkActiveClass: 'myactive'
})
router.beforeEach((to, from, next) => { //路由拦截
    if (to.matched.some(res => res.meta.required)) {
        if (window.sessionStorage.getItem('status')) {
            next()
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        next()
    }
})

export default router