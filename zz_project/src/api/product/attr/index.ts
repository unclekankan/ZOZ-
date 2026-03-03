import request from '@/utils/request'
import type { Category1, Category2, Category3, AttrResponseData, Attr } from './type'
enum Api {
  AttrList1 = '/admin/product/getCategory1',
  AttrList2 = '/admin/product/getCategory2',
  AttrList3 = '/admin/product/getCategory3',
  attrInfo = '/admin/product/attrInfoList',
  //添加或修改属性
  addOrUpdateAttr = '/admin/product/saveAttrInfo',
  //删除属性
  deleteAttr = '/admin/product/deleteAttr',
}
// 获取一级分类接口
export const reqAttrList1 = () => request.get<any, Category1>(Api.AttrList1)
// 获取二级分类接口
export const reqAttrList2 = (category1Id: number) =>
  request.get<any, Category2>(`${Api.AttrList2}/${category1Id}`)
// 获取三级分类接口
export const reqAttrList3 = (category2Id: number) =>
  request.get<any, Category3>(`${Api.AttrList3}/${category2Id}`)
// 获取平台属性接口
export const reqAttrInfoList = (category1Id: number, category2Id: number, category3Id: number) =>
  request.get<any, AttrResponseData>(Api.attrInfo + `/${category1Id}/${category2Id}/${category3Id}`)
// 添加或修改属性接口
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(Api.addOrUpdateAttr, data)
// 删除属性接口
export const reqDeleteAttr = (attrId: number) =>
  request.delete<any, any>(`${Api.deleteAttr}/${attrId}`)
