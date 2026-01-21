import request from '@/utils/request'
import type { TrademarkResponseData, ResponseData } from './type'
// 统一管理咱们项目商品品牌相关的接口
enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark',
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove',
}
// 获取 分页列表的接口
export const reqHasTradeMark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(`${API.TRADEMARK_URL}/${page}/${limit}`)
// 添加品牌的接口
export const reqAddTradeMark = (data: { tmName: string; logoUrl: string }) =>
  request.post<any, ResponseData>(API.ADD_TRADEMARK_URL, data)
// 修改品牌的接口
export const reqUpdateTradeMark = (data: { id: number; tmName: string; logoUrl: string }) =>
  request.put<any, ResponseData>(API.UPDATE_TRADEMARK_URL, data)
// 删除品牌的接口
export const reqDeleteTradeMark = (id: number) =>
  request.delete<any, ResponseData>(`${API.DELETE_TRADEMARK_URL}/${id}`)
