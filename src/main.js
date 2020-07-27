import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'

import { Button } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { Toast, Indicator } from 'mint-ui'
import 'mint-ui/lib/style.css'

import 'font-awesome/css/font-awesome.css'

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('assets/img/common/placeholder.png'),
  attempt: 3
})

Vue.use(Button)

Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
