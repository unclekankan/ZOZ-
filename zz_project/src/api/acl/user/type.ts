interface responseData {
  code: number
  message: string
  ok: boolean
}
export interface User {
  createTime?: string
  updateTime?: string
  id?: number
  username: string
  roleName?: string
  password: string
  name: string
  phone?: string
}
export interface UserPageData extends responseData {
  data: {
    records: User[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
export interface addOrUpdateUserResponseData extends responseData {
  data: any
}
export interface assignRoleResponseData extends responseData {
  data: {
    assignRoles: roles[]
    allRolesList: roles[]
  }
}
export interface roles {
  id?: number
  roleName?: string
  remark?: string
  permissonId?: []
}
export interface assignedRoleResponseData extends responseData {
  data: any
}
export interface DeletResponseData extends responseData {
  data: any
}
