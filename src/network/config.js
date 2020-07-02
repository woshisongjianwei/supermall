import Vue from 'vue'

export const STATUS_OK = 200

export const TIMEOUT = 300000

export const STATUS = 'status' // 后台返回的状态码，如 code status 这些

export const baseURL = {
  // dev: 'http://123.207.32.32:8000', // 旧的
  dev: 'http://152.136.185.210:8000/api/n3', // 新的
  prod: 'dds/web'
}

Vue.prototype.$baseURL = baseURL
