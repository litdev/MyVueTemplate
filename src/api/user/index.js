import request from '@/utils/request'

//获取当前登录用户用户信息
export const GetUserInfo = params => {
  return request({
    url: '/api/open/v1/currentuser/get/info',
    method: 'get',
    showLoading: true,
    params
  })
}
