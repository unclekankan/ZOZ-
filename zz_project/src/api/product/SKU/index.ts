import request from '@/utils/request'
import type {
  SKUPageResult,
  ChangeSaleResult,
  SKUInfoResult,
  DeleteSKUResult,
} from '@/api/product/SKU/type'
enum SKUApi {
  //获取sku列表
  SKUURL = '/admin/product/list',
  //删除sku
  DELETESKU = '/admin/product/deleteSku/',
  //下架sku
  OFFSALE = '/admin/product/cancelSale/',
  //上架sku
  ONSALE = '/admin/product/onSale/',
  //获取sku详情
  SKUINFO = '/admin/product/getSkuInfo',
}
//获取sku列表
export const reqGetSKUList = (page: number, limit: number) => {
  return request.get<any, SKUPageResult>(`${SKUApi.SKUURL}/${page}/${limit}`)
}
//下架sku
export const reqOffSale = (skuId: number) => {
  return request.get<any, ChangeSaleResult>(`${SKUApi.OFFSALE}${skuId}`)
}
//上架sku
export const reqOnSale = (skuId: number) => {
  return request.get<any, ChangeSaleResult>(`${SKUApi.ONSALE}${skuId}`)
}
//获取sku详情
export const reqGetSKUInfo = (skuId: number) => {
  return request.get<any, SKUInfoResult>(`${SKUApi.SKUINFO}/${skuId}`)
}
//删除sku
export const reqDeleteSKU = (skuId: number) => {
  return request.delete<any, DeleteSKUResult>(`${SKUApi.DELETESKU}${skuId}`)
}
