import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import Main from '../components/Main.vue'
import MailList from '../components/MailList.vue'
import AddCon from '../components/AddCon.vue'
import UserInfo from '../components/UserInfo.vue'

Vue.use(VueRouter)

const routes = [
  // 根目录重定向到 /home/login
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
  },
  {
    path: '/main',
    component: Main,
    redirect: '/maillist',
    children: [
      { path: '/maillist', component: MailList },
      { path: '/addcon', component: AddCon },
      { path: '/userinfo', component: UserInfo }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  // 如果目标路由为登录或注册页面，直接放行
  if (to.path === '/home/login' || to.path === '/home/register') {
    return next()
  }
  // 获取token值
  const token = sessionStorage.getItem('token')
  // 如果token值不存在，则跳转到登录页面
  if (!token) {
    return next('/home/login')
  }
  next()
})

export default router
