/* eslint-disable callback-return */
import Vue from 'vue';
import Router from 'vue-router';
import allRouter from './all-router';

Vue.use(Router);

const router = new Router({
    // mode: 'hash',
    mode: "history",
    base: process.env.BASE_URL,
    //定义路由激活后的样式
    linkActiveClass: 'open active',
    //当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        ...allRouter
    ]

});

// 路由守卫
router.beforeEach((to, from, next) => {

    if (to.meta.requireAuth) { 
        next();
    }else {
        next();
    }
    
});
export default router;