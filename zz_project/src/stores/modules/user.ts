import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqLogin } from '@/api/user'
import type { loginFormData, loginResponseData } from '@/api/user/type'
export const useUserStore = defineStore('user', () => {
  let token = ref(localStorage.getItem('token')) || ref('')
  async function userLogin(data: loginFormData) {
    let res: loginResponseData = await reqLogin(data)
    if (res.code === 200) {
      token.value = res.data.token as string
      localStorage.setItem('token', res.data.token as string)
      return 'ok'
    }
    return Promise.reject(new Error(res.data.message))
  }
  return { token, userLogin }
})
