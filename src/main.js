import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Loading, Notification } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'font-awesome/css/font-awesome.css'

Vue.use(Button)
Vue.prototype.$loading = Loading
Vue.prototype.$notification = Notification

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
