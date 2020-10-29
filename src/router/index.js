import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../components/Home'
import Overview from '../views/overview/Overview'
import Terminal from '../views/terminal/Terminal'
import ResCenter from '../views/rescenter/ResCenter'
import Thread from '../views/thread/Thread'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/overview',
    component: Home,
    children: [
      {
        path: '/overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: '/terminal',
        name: 'Terminal',
        component: Terminal
      },
      {
        path: '/rescenter',
        name: 'ResCenter',
        component: ResCenter
      },
      {
        path: '/thread',
        name: 'Thread',
        component: Thread
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    // const tokenStr = store.state.data.token
    const tokenStr = window.sessionStorage.getItem('token')
    // console.log('--------------------------')
    // console.log(tokenStr)
    // console.log('--------------------------')
    if (!tokenStr) {
      return next('/login')
    } else {
      return next()
    }
  }
})

export default router
