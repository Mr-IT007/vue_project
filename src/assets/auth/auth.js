import router from '../../router'

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    // const tokenStr = window.sessionStorage.getItem('token')
    console.log('--------------------------')
    const tokenStr = this.$store.state.token
    if (!tokenStr) {
      return next('/login')
    } else {
      return next()
    }
  }
})
