import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home/login'
  },
  {
    path: '/home',
    component: Home,
    children: [
      // 当 /home/login 匹配成功，Login会被渲染在Home的<router-view>中
      { path: 'login', component: Login },
      // 当 /home/register 匹配成功，Register会被渲染在Home的<router-view>中
      { path: 'register', component: Register }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
