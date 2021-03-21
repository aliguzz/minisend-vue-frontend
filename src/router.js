import Vue from "vue";
import Router from "vue-router";
//import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: process.env.CORDOVA_PLATFORM ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: "/login",
            name: "login",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Login.vue")
        },
        {
            path: "/",
            name: "splash",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Splash.vue")
        },        
        {
            path: "/sendmail",
            name: "SendMail",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/SendMail.vue")
        },
        {
            path: "/search",
            name: "Search",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Search.vue")
        },
        {
            path: "/viewmail/:mail_id",
            name: "ViewMail",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/ViewMail.vue")
        },        
    ]
});
