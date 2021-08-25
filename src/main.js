import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入elementui
import './plugins/element'
// 导入全局样式表
import './assets/css/global.css'
// 导入iconfont字体库
import './assets/font/iconfont.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
