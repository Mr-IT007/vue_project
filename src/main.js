import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import VueParticles from 'vue-particles'
import axios from 'axios'

// axios.defaults.baseURL = 'http://172.16.30.173:5000/api/v1'
// axios.defaults.baseURL = 'http://127.0.0.1:5000/api/v1'
// 请求拦截器在请求头中添加验证token的字段
axios.interceptors.request.use(config => {
  const tokenStr = 'Bearer ' + window.sessionStorage.getItem('token')
  // const tokenStr = 'Bearer ' + store.state.token
  if (tokenStr) {
    config.headers.Authorization = tokenStr
  }
  return config
})
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
