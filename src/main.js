import Vue from 'vue'
import App from './App.vue'

import router from './router.js'
import store from './store/index'

import api from './utils/api'
Vue.prototype.$api = api

import img from './utils/img'
Vue.prototype.$img = img

// 图片懒加载
import { Lazyload } from 'vant';
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
