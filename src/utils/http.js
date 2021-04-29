import axios from 'axios'
import qs from 'qs'

// 配置请求地址
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://www.itxlb.cn'
} else {
  axios.defaults.baseURL = '/api'
}

// 配置超时时间和跨域携带凭证
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true

// 设置请求数据的格式
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.transformRequest = data => qs.stringify(data)

// 请求拦截器
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('adminToken')
  token && (config.headers.Authorization = token)
  return config
}, error => Promise.reject(error))

// 响应拦截器
axios.defaults.validateStatus = status => /^(2|3)\d{2}$/.test(status)

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  let { response } = error
  if (response) {
    // 返回错误结果
    switch (response.status) {
      case 401: // 未登录||权限
        //message......
        break
      case 403: // token过期||拒绝访问
        //message......
        break
      case 404: // 找不到页面
        //message......
        break
      default:
        break
    }
  } else {
    // 没有返回||断网
    if (!window.navigator.onLine) {
      // 断网处理: 跳转到断网页面
      return
    }
    return Promise.reject(error)
  }
})

export default axios