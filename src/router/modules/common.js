import Layout from "@/layout/index.vue";

const common = [
    {
        path: '/',
        component: Layout,
        name: "首页",
        children: [
            {
                path: '/',
                component: () => import(/* webpackChunkName: "common" */ '../../views/Home.vue'),
                meta: { title: '首页', anonymous: true }
            },
            {
                path: '/about',
                name: 'About',
                component: Layout,
                component: () => import(/* webpackChunkName: "common" */ '../../views/About.vue'),
                meta: { title: '关于我们', anonymous: false }
            },
        ]
    },
    {
        path: '/404',
        name: 'PageNotFound',
        component: () => import(/* webpackChunkName: "common" */ '../../views/404.vue'),
        meta: { title: '页面未找到', anonymous: true }
    },
]

export default common;