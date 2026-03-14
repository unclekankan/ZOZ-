export interface responseData {
  code: number
  data: any
  message: string
}
export interface Role {
  ID?: number
  id?: number
  remark?: string
  roleName: string
  createdTime?: string
  updatedTime?: string
}
export interface RolePageData extends responseData {
  current: number
  size: number
  pages: number
  searchCount?: boolean
  total: number
  records: Role[]
}
export interface permissionData {
  createTime?: string
  updateTime?: string
  id?: number
  name: string
  pid?: number
  code?: string
  toCode?: string
  type?: number
  status?: string
  level?: number
  children?: null | permissionData[]
  select?: boolean
}
export interface permissionList extends responseData {
  data: permissionData[]
}
