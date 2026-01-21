import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
import { constantRouter } from '@/router/routers'
export const useUserStore = defineStore('user', () => {
  let token = ref(localStorage.getItem('token')) || ref('')
  let menuRouter = ref(constantRouter)
  let avater = ref('')
  let username = ref('')
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
    let result = await reqUserInfo()
    avater.value = result.data.avatar
    username.value = result.data.name
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
  return { token, userLogin, menuRouter, userInfo, avater, username, userLogout }
})
