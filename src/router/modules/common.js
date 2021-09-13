import Home from '../../views/Home.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: '首页', anonymous: true }
    },
    {
        path: '*',
        name: 'Home',
        component: Home,
        meta: { title: '首页', anonymous: true }
    },
    {
        path: '/404',
        name: 'PageNotFound',
        component: () => import(/* webpackChunkName: "common" */ '../../views/404.vue'),
        meta: { title: '页面未找到', anonymous: true }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "common" */ '../../views/About.vue'),
        meta: { title: '关于我们', anonymous: true }
    },
]