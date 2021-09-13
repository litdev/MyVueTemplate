import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from "./utils/common";
import defaultSettings from '@/settings'

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    //设置浏览器标签页文本
    document.title = to.meta.title ? defaultSettings.title + ' - ' + to.meta.title : defaultSettings.title;
    let anonymous = to.meta.anonymous || false; //是否可以匿名访问，默认false

    if (!anonymous) { //不允许匿名访问
        const hasToken = getToken()
        if (hasToken) {
            //有token，正常访问
            next();
            NProgress.done();



        } else {
            //跳转到登录页面
            NProgress.done();
            console.log('需要跳转到登录页面');
        }
    } else {
        //可匿名访问
        next();
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done();
})