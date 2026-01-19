import router from './router'
import nprogress from 'nprogress'
import { useUserStore } from '@/stores/modules/user'
import '../node_modules/nprogress/nprogress.css'
import setting from './setting'
// 全局路由守卫
//前置
router.beforeEach(async (to, from, next) => {
  document.title = `${setting.title}-${to.meta.title as string}`
  nprogress.start()
  nprogress.configure({ showSpinner: false })
  let userStore = useUserStore()
  const token = userStore.token
  if (token) {
    if (to.path === '/Login') {
      next({ path: '/' })
    } else {
      if (userStore.username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to, replace: true })
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/Login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path === '/Login') {
      next()
    } else {
      next({ path: '/Login', query: { redirect: to.path } })
    }
  }
})
// 后置
router.afterEach((to, from) => {
  nprogress.done()
})
