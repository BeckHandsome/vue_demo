import main from '../modules/Main';
// 路由分模块写 不要到处乱写 记住每个路由都要写注释
export default [
    {
        path: '/',
        redirect: "home",
        component: main,
        children: [
            // 首页
            {
                name: "home",
                path: "home",
                component: () => import("@/modules/home/components/home"),
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true
                }
            },
            // 登录>>登录1
            {
                name: "login1",
                path: "login/login1",
                component: () => import("@/modules/login/components/login1"),
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                }
            },
            // 登录>>登录2
            {
                name: "login2",
                path: "login/login2",
                component: () => import("@/modules/login/components/login2"),
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true
                }
            },
            // 1>>2>>3
            {
                name: "3",
                path: "1/2/3",
                component: () => import("@/modules/3/components/3"),
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true
                }
            }
        ]
    },
];