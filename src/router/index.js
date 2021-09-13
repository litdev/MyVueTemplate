import Vue from 'vue'
import VueRouter from 'vue-router'
import common from './modules/common'
import test from './modules/test'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    ...common,
    ...test,
  ]
})

export default router
