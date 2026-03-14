import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { loginFormData, loginResponseData, userInfoReponseData } from '@/api/user/type'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routers'
import router from '@/router'
import { cloneDeep } from 'lodash-es'
export const useUserStore = defineStore('user', () => {
  let token = ref(localStorage.getItem('token')) || ref('')
  let menuRouter = ref()
  let avater = ref('')
  let username = ref('')
  let buttons = ref()
  const filterRouter = (myroutes: any, routes: any) => {
    return myroutes.filter((item: any) => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length > 0) {
          item.children = filterRouter(item.children, routes)
        }
        return true
      }
    })
  }
  async function userLogin(data: loginFormData) {
    let res: loginResponseData = await reqLogin(data)
    if (res.code === 200) {
      token.value = res.data as string
      localStorage.setItem('token', res.data as string)
      return 'ok'
    }
    return Promise.reject(new Error(res.data.message))
  }
  const userInfo = async () => {
    let result: userInfoReponseData = await reqUserInfo()
    if (result.code == 200) {
      let myroutes = ref(cloneDeep(asyncRoute))
      avater.value = result.data.avatar
      username.value = result.data.name
      buttons.value = result.data.buttons
      let userRoutes = ref(filterRouter(myroutes.value, result.data.routes))
      menuRouter.value = [...constantRoute, ...userRoutes.value, ...anyRoute]
      //追加路由
      const rt = ref([...userRoutes.value, ...anyRoute])
      rt.value.forEach((route: any) => {
        router.addRoute(route)
      })
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
  const userLogout = async () => {
    let res = await reqLogout()
    if (res.code === 200) {
      console.log('退出登录成功')
      avater.value = ''
      username.value = ''
      token.value = ''
      localStorage.removeItem('token')
      return 'ok'
    } else {
      return Promise.reject(new Error(res.data))
    }
  }
  return { token, userLogin, menuRouter, userInfo, avater, username, userLogout, buttons }
})
