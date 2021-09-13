import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from "@/utils/common";
const path = window.location.href.split('#')[1]

const defaultSettings = require('../settings.js')

const tokenHeaderName = defaultSettings.tokenName || 'AccessToken'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    var cookieToken = getToken();
    if (cookieToken) {
      // config.headers['X-Token'] = getToken()
      config.headers = {
        'Content-Type': 'application/json',
        tokenHeaderName: cookieToken, //携带token参数
      }
    }
    if (config.showLoading) {
      showFullScreenLoading();
    }
    return config
  },
  error => {
    // do something with request error
    console.error(error) // for debug
    hideFullScreenLoading();
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    hideFullScreenLoading();
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401 || res.code === 403 || res.code === 412) {
        //重置token
        store.dispatch('user/resetToken');
        // to re-login
        // window.location.href = process.env.VUE_APP_LOGIN_URL + process.env.VUE_APP_Domain_URL+ '/#' + to.path;
        //跳转到登录页面
        // window.location.href =  process.env.VUE_APP_LOGINOUT_URL + process.env.VUE_APP_Domain_URL + path;
        // MessageBox.confirm('您已注销，您可以取消停留在该页上，或重新登录', 'Confirm logout', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   window.location.href = 'http://account.yzc.com/identity/login' + "/#/redirect?path=" + 'http://om.yzc.com';
        //   // store.dispatch('user/resetToken').then(() => {
        //   //   location.reload()
        //   // })
        // })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {

      return res
    }
  },
  error => {
    hideFullScreenLoading();
    console.log('ttt');
    console.error('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

let loading;
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(255,255,255,0)',
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export default service
