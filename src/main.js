import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/routeGuards' // 路由导航守卫
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // 全局css

Vue.config.productionTip = false

Vue.use(ElementUI)

// 图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/images/image-error.png'),
  loading: require('./assets/images/image-loading.gif'),
  attempt: 2,
})

// Base64支持
import { Base64 } from "js-base64";
Vue.prototype.$base64 = Base64

// 批量注册组件
import customComponents from "./components/index";
Vue.use(customComponents);

// 全局缓存，this.$storage.local.get('a');
import storage from "@/utils/storage"; //本地缓存
Vue.prototype.$storage = storage;

// 全局挂载接口，this.$api接口名
import allApi from './api/index'
Vue.use(allApi)

// 全局注册自定义指令
import allDirective from './directive/index'
Vue.use(allDirective)

// 全局挂载公共常量，this.$const.MyConst
import publicConst from "./utils/const";
Vue.use(publicConst);

// 全局挂载公共函数，this.$func.checkIsLogin();
import * as publicFunc from "./utils/common";
Vue.prototype.$func = publicFunc;

// 全局挂载数字运算方法，this.$math.isInteger(23);
import mathFunc from "./utils/math";
Vue.use(mathFunc);

// 快捷键
import hotkeys from 'hotkeys-js'
Vue.prototype.$hotkeys = hotkeys

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
