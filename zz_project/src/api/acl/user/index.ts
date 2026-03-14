import request from '@/utils/request'
import type {
  UserPageData,
  User,
  addOrUpdateUserResponseData,
  assignRoleResponseData,
  assignedRoleResponseData,
  DeletResponseData,
} from '@/api/permission/user/type'
enum UserApi {
  //分页列表
  USERPAGE = '/admin/acl/user/',
  //新增用户
  ADDUSER = '/admin/acl/user/save',
  //更新用户
  UPDATEUSER = '/admin/acl/user/update',
  //分配角色
  ASSIGNROLE = '/admin/acl/user/toAssign',
  //保存分配角色
  SAVEASSIGNROLE = '/admin/acl/user/doAssignRole',
  //删除用户
  DELETEUSER = '/admin/acl/user/remove/',
  //批量删除用户
  BATCHDELETEUSER = '/admin/acl/user/batchRemove',
}
//收集页码以及查询
export const reqGetUserPage = (page: number, limit: number, username?: string) => {
  return request.get<any, UserPageData>(
    `${UserApi.USERPAGE}${page}/${limit}?username=${username ? username : ''}`,
  )
}
//新增或更新用户
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, addOrUpdateUserResponseData>(UserApi.UPDATEUSER, data)
  } else {
    return request.post<any, addOrUpdateUserResponseData>(UserApi.ADDUSER, data)
  }
}
//分配角色
export const reqAssignRole = (userId: number) => {
  return request.get<any, assignRoleResponseData>(`${UserApi.ASSIGNROLE}/${userId}`)
}
//保存分配角色
export const reqSaveAssignRole = (userId: number, roleIdList: number[]) => {
  return request.post<any, assignedRoleResponseData>(UserApi.SAVEASSIGNROLE, {
    userId,
    roleIdList,
  })
}
//删除用户
export const reqDeleteUser = (userId: number) => {
  return request.delete<any, DeletResponseData>(`${UserApi.DELETEUSER}${userId}`)
}
//批量删除用户
export const reqBatchDeleteUser = (userIdList: number[]) => {
  return request.delete<any, DeletResponseData>(UserApi.BATCHDELETEUSER, { data: userIdList })
}
