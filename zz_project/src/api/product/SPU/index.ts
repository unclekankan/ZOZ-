import request from '@/utils/request'
import type {
  SPUPageResult,
  TradeResponseData,
  SPUImageResponseData,
  spuSaleAttrListResponseData,
  spuBaseSaleAttrList,
  SPU,
  skuInfo,
} from '@/api/product/SPU/type'
enum SUPApi {
  SUPPage = '/admin/product/',
  //获取品牌
  TRADEMARKLIST = '/admin/product/baseTrademark/getTrademarkList',
  //获取图片
  SPUIMAGEURL = '/admin/product/spuImageList/',
  //获取销售属性
  SPUSALEATTRURL = '/admin/product/spuSaleAttrList/',
  //获取所以销售属性
  ALLSPUSALEATTRURL = '/admin/product/baseSaleAttrList',
  //更新spu
  UPDATESPU = '/admin/product/updateSpuInfo',
  //新增spu
  ADDSPU = '/admin/product/saveSpuInfo',
  //新增sku
  ADDSKU = '/admin/product/saveSkuInfo',
  //获取sku列表
  SKUURL = '/admin/product/findBySpuId',
  //删除SPU
  DELETESPU = '/admin/product/deleteSpu/',
}
// 获取sup分页列表
export const reqGetSUPPage = (page: number, limit: number, C3ID: number | string) => {
  return request.get<any, SPUPageResult>(`${SUPApi.SUPPage}${page}/${limit}?category3Id=${C3ID}`)
}
//获取品牌列表
export const reqGetTrademarkList = () => {
  return request.get<any, TradeResponseData>(SUPApi.TRADEMARKLIST)
}
//获取图片列表
export const reqGetSPUImageList = (spuId: number) => {
  return request.get<any, SPUImageResponseData>(`${SUPApi.SPUIMAGEURL}${spuId}`)
}
//获取销售属性
export const reqGetSPUSaleAttrList = (spuId: number) => {
  return request.get<any, spuSaleAttrListResponseData>(`${SUPApi.SPUSALEATTRURL}${spuId}`)
}
//获取所有销售属性
export const reqGetAllSPUSaleAttrList = () => {
  return request.get<any, spuBaseSaleAttrList>(SUPApi.ALLSPUSALEATTRURL)
}
//更新spu
export const reqUpdateOrAddSpu = (data: SPU) => {
  if (data.id) {
    return request.post<any, any>(SUPApi.UPDATESPU, data)
  } else {
    return request.post<any, any>(SUPApi.ADDSPU, data)
  }
}
//新增sku
export const reqAddSku = (data: skuInfo) => {
  return request.post<any, any>(SUPApi.ADDSKU, data)
}
//获取sku列表
export const reqGetSkuList = (spuId: number) => {
  return request.get<any, any>(`${SUPApi.SKUURL}/${spuId}`)
}
//删除SPU
export const reqDeleteSPU = (spuId: number) => {
  return request.delete<any, any>(`${SUPApi.DELETESPU}${spuId}`)
}
