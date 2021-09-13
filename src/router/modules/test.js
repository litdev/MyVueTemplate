export default [
    {
        path: '/test/vuex',
        name: 'Vuex',
        component: () => import(/* webpackChunkName: "test" */ '../../views/test/Vuex.vue'),
        meta: { title: 'Vuex', anonymous: true }
    },
    {
        path: '/test/storage',
        name: 'Storage',
        component: () => import(/* webpackChunkName: "test" */ '../../views/test/Storage.vue'),
        meta: { title: '本地存储', anonymous: true }
    },
    {
        path: '/test/tools',
        name: 'Tools',
        component: () => import(/* webpackChunkName: "test" */ '../../views/test/Tools.vue'),
        meta: { title: '工具测试', anonymous: true }
    }
]