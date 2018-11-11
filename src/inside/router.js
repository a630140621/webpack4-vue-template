import Vue from "vue"
import Router from "vue-router"
import App from "inside/App.vue"

Vue.use(Router)


export default new Router({
    mode: 'history',
    base: 'inside',
    routes: [{
        path: '/',
        name: 'home',
        component: App
    }]
})