import request from '@/utils/request'
import type { RolePageData, responseData, permissionList } from '@/api/acl/role/type'
import type { roles } from '../user/type'
enum RoleApi {
  //分页列表
  ROLEPAGE = '/admin/acl/role/',
  //新增角色
  ADDROLE = '/admin/acl/role/save',
  //更新角色
  UPDATEROLE = '/admin/acl/role/update',
  //删除角色
  DELETROLE = '/admin/acl/role/remove',
  //获取已有角色的权限菜单
  GETPERMISSION = '/admin/acl/permission/toAssign',
  //分配权限
  ASSIGNPERMISSION = '/admin/acl/permission/doAssign',
}
//收集页码以及查询
export const reqGetRolePage = (page: number, limit: number, roleName?: string) => {
  return request.get<any, RolePageData>(
    `${RoleApi.ROLEPAGE}${page}/${limit}?roleName=${roleName ? roleName : ''}`,
  )
}
//新增或更新角色
export const reqAddOrUpdateRole = (data: roles) => {
  if (data.id) {
    return request.put<any, responseData>(RoleApi.UPDATEROLE, data)
  } else {
    return request.post<any, responseData>(RoleApi.ADDROLE, data)
  }
}
//删除角色
export const reqDeletRole = (id: number) => {
  return request.delete<any, responseData>(`${RoleApi.DELETROLE}/${id}`)
}
//获取权限菜单
export const reqGetPermission = (id: number) => {
  return request.get<any, permissionList>(`${RoleApi.GETPERMISSION}/${id}`)
}
//分配权限
export const reqAssignPermission = (roleid: number, permisssionid: number[]) => {
  return request.post<any, responseData>(
    `${RoleApi.ASSIGNPERMISSION}?roleId=${roleid}&permissionId=${permisssionid}`,
  )
}
