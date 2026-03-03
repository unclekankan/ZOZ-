import type { Trademark } from '../trademark/type'
export interface SPU {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuImageList: SPUImage[]
  spuSaleAttrList: spuSaleAttrList[]
}
interface SPUPageData {
  records: SPU[]
  total: number
  size: number
  current: number
  pages: number
}
export interface SPUPageResult {
  code: number
  message: string
  data: SPUPageData
}
export interface TradeResponseData {
  code: number
  message: string
  data: Trademark[]
  ok: boolean
}
export interface SPUImage {
  imgName?: string
  imgUrl?: string
  name?: string
  url?: string
}
export type SPUImageList = SPUImage[]
export interface SPUImageResponseData {
  code: number
  message: string
  data: SPUImageList
  ok: boolean
}
export interface spuSaleAttrValue {
  baseSaleAttrId: number | string
  id?: number
  saleAttrValueName: string
  saleAttrName?: string
  spuId?: number
}
export interface spuSaleAttrList {
  saleIdAndValueId?: string
  baseSaleAttrId: number
  id?: number
  saleValueName?: string
  saleAttrName: string
  spuId?: number
  flag?: boolean
  spuSaleAttrValueList: spuSaleAttrValue[]
}
export type spuSaleAttrLists = spuSaleAttrList[]
export interface spuSaleAttrListResponseData {
  code: number
  message: string
  data: spuSaleAttrLists
  ok: boolean
}
export interface spuBaseSaleAttr {
  ID: number
  id: number
  name: string
}
export interface spuBaseSaleAttrList {
  code: number
  message: string
  data: spuBaseSaleAttr[]
  ok: boolean
}
export interface skuAttrValueList {
  attrId: string
  valueId: string
}
export interface skuImageList {
  id?: number
  imgName: string
  imgUrl: string
  isDefault?: string
  skuId?: number
  spuImgId?: number
}
export interface skuSaleAttrValueList {
  saleAttrId: string
  saleAttrValueId: string
}
export interface skuInfo {
  category3Id: string
  id?: number
  isSale?: number
  price: string
  skuAttrValueList: skuAttrValueList[]
  skuDefaultImg: string
  skuDesc: string
  skuImageList?: skuImageList[]
  skuName: string
  skuSaleAttrValueList: skuSaleAttrValueList[]
  spuID: string | number
  tmId: string | number
  weight: string | number
}
