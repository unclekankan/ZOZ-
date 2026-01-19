export interface loginFormData {
  username: string
  password: string
}
interface loginData {
  token?: string
  message?: string
}
export interface loginResponseData {
  code: number
  data: loginData
  message: string
  ok: boolean
}
interface userInfo {
  roles: string[]
  name: string
  avatar: string
  routes: string[]
  buttons: string[]
}
export interface userInfoReponseData {
  code: number
  data: userInfo
  message: string
  ok: boolean
}
export interface logoutResponseData {
  code: number
  data: string
  message: string
  ok: boolean
}
