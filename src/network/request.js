import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import { STATUS_OK, TIMEOUT, baseURL } from './config.js'

axios.defaults.withCredentials = true
const xhr = axios.create({
  baseURL: baseURL.dev,
  timeout: TIMEOUT,
  headers: {
    // 'Content-Type': 'Content-Type: application/json'
  }
})

// 设置post请求头
xhr.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let loadingInstance

xhr.interceptors.request.use(
  config => {
    console.log(config)
    console.log('进来了 1111111111111111111')

    // loading
    loadingInstance = Vue.prototype.$loading.service({})

    // 添加token
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if (userInfo) {
      // eslint-disable-next-line dot-notation
      config.headers.common['userInfo'] = userInfo
    }

    if (config.method === 'post') {
      return config
    }
    if (config.method === 'get') {
      const random = Math.random()
      if (config.params) {
        config.params.r = random
      } else {
        config.params = {
          r: random
        }
      }
    }
    // 这句代码非常重要，必须把 config 原样返回去，
    // 否则你的 axios 请求绝对不会发出去的(浏览器都看不见痕迹)，直接跳到 response 的 error 分支去了
    return config
  },
  error => { // 尼玛我认为这里几乎跑进来的机会为 0
    console.log(error)
    console.log('进来了 2222222222222222222')

    // loading
    loadingInstance.close()

    return Promise.reject(error)
  }
)

xhr.interceptors.response.use(
  response => {
    console.log(response)
    console.log('出去了 1111111111111111111')

    // loading
    loadingInstance.close()

    // 决定因素有两重，一重是最外层的 response.status，这一重是 axios 的源码封装的
    // 另一重是 response.data.code，这一重是咱们本项目自己的逻辑
    const { status, data } = response
    // const statusCode = response.status
    if (status === STATUS_OK) { // response.status 为 200
      // 第一重是200但是第二重不是200，表示持续时间过期了以及别的特殊情况，
      // 这些情况是需提前与后台都约定好的，这里要把这些特殊情况及后续业务逻辑都罗列出来
      if (data.code === '300004') { // 持续时间过期了
        sessionStorage.removeItem('userInfo')
        setTimeout(() => {
          router.push({ path: '/login' })
        }, 3000)
      }
      // 别的特殊情况，打印告知用户，此处可采用 element-ui 的 message 弹框实现
      if (data.code === '300005') {
        // 后端返回的 date 里面最好有个 message，把准确的错误原因给我返回来
        // console.log(data.message)
        Vue.prototype.$notification.error({
          title: '错误',
          message: data.message,
          duration: 3000
        })
      }
      return Promise.resolve(data)
    } else { // response.status 不为 200，必然认定为失败了    尼玛我认为这里几乎跑进来的机会为 0
      // 接口异常返回
      return Promise.reject(data)
    }
  },
  error => {
    console.log(error)
    console.log(error.response)
    console.log('出去了 222222222222222222222')

    // loading
    loadingInstance.close()

    let info = {}
    if (!error.response) {
      info = {
        code: 5000,
        msg: '网络异常，请稍后再试' // 唯一的可能就是，断网了
      }
    } else {
      const { status, statusText, data } = error.response

      // 这里得和后台反复沟通好，然后自己进行一个一个罗列，把每种情况都考虑完全
      if (status === 401) { // 401 未登录状态
        sessionStorage.removeItem('userInfo')
        router.push({ path: '/login' })
      } else if (status === 403) { // 403 token过期
        sessionStorage.removeItem('userInfo')
        router.push({ path: '/login' })
      } else if (status === 404) { // 404请求不存在
        // console.log('请求不存在') // 此处可采用 element-ui 的 message 弹框实现
        Vue.prototype.$notification.error({
          title: '错误',
          message: '请求不存在',
          duration: 3000
        })
      } else {
        // 后端返回的 date 里面最好有个 message，把准确的错误原因给我返回来
        // console.log(data.message) // 此处可采用 element-ui 的 message 弹框实现
        Vue.prototype.$notification.error({
          title: '错误',
          message: data.message,
          duration: 3000
        })
      }
      // 此处整理错误信息格式
      info = {
        code: status, // 401 403 504...
        data: data,
        msg: statusText
      }
    }
    return Promise.reject(info)
  }
)

export default xhr
