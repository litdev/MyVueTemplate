import Layout from "@/layout/index.vue";

const test = [
    {
        path: '/test',
        component: Layout,
        name: "测试模块",
        children: [
            {
                path: 'vuex',
                component: () => import(/* webpackChunkName: "test" */ '../../views/test/Vuex.vue'),
                meta: { title: 'Vuex', anonymous: true }
            },
            {
                path: 'storage',
                component: () => import(/* webpackChunkName: "test" */ '../../views/test/Storage.vue'),
                meta: { title: '本地存储', anonymous: true }
            },
            {
                path: 'tools',
                component: () => import(/* webpackChunkName: "test" */ '../../views/test/Tools.vue'),
                meta: { title: '工具测试', anonymous: true }
            }
        ]
    }]

export default test;