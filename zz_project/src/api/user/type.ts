export interface loginFormData {
  username: string
  password: number
}
interface loginData {
  token?: string
  message?: string
}
export interface loginResponseData {
  code: number
  data: loginData
}
interface userInfo {
  roles: string[]
  name: string
  avatar: string
  introduction: string
}
export interface userInfoReponseData {
  code: number
  data: userInfo
}
