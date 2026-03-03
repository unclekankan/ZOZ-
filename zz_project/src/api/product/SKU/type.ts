import type { skuInfo } from '@/api/product/SPU/type'
interface SKUPageData {
  records: skuInfo[]
  total: number
  size: number
  current: number
  pages: number
}
export interface SKUPageResult {
  code: number
  message: string
  data: SKUPageData
}
export interface ResponseResult {
  code: number
  message: string
  ok: boolean
}
export interface ChangeSaleResult extends ResponseResult {
  data: null
}
export interface SKUInfoResult extends ResponseResult {
  data: skuInfo
}
export interface DeleteSKUResult extends ResponseResult {
  data: null
}
