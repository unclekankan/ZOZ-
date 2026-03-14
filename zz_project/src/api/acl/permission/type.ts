import type { permissionData } from '../role/type'
export interface ResponsData {
  code: number
  message: string
  data: any
  ok: boolean
}
export interface PermissionResponse extends ResponsData {
  data: permissionData[]
}
