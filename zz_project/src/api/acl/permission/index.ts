import request from '@/utils/request'
import type { PermissionResponse, ResponsData } from './type'
import type { permissionData } from '../role/type'
enum PERAPI {
  //获取菜单列表
  GETPERLIST = '/admin/acl/permission',
  //新增菜单
  ADDPER = '/admin/acl/permission/save',
  //编辑菜单
  EDITPER = '/admin/acl/permission/update',
  //删除菜单
  DELETE = '/admin/acl/permission/remove',
}
//获取菜单列表
export const reqGetPerList = () => {
  return request.get<any, PermissionResponse>(PERAPI.GETPERLIST)
}
//新增或编辑菜单
export const reqAddAndUpdatePer = (data: permissionData) => {
  if (data.id) {
    return request.put<any, ResponsData>(PERAPI.EDITPER, data)
  } else {
    return request.post<any, ResponsData>(PERAPI.ADDPER, data)
  }
}
//删除菜单
export const reqDeletePer = (id: number) => {
  return request.delete<any, PermissionResponse>(`${PERAPI.DELETE}/${id}`)
}
