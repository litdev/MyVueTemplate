import Vue from 'vue'
import VueRouter from 'vue-router'
import common from './modules/common'
import test from './modules/test'

import Layout from "@/layout/index.vue";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...common,
    ...test,
    //匹配不到,就跳转到首页
    {
      path: '*',
      component: Layout,
      name: "首页",
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: "common" */ '../views/Home.vue'),
          meta: { title: '首页', anonymous: true }
        },
      ]
    },
  ]
})

export default router
