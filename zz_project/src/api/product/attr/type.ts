export interface Category1 {
  code: number
  message: string
  data: Category1Data[]
  ok: boolean
}
interface Category1Data {
  id: number
  name: string
}
export interface Category2 {
  code: number
  message: string
  data: Category2Data[]
  ok: boolean
}
interface Category2Data {
  id: number
  name: string
  category1Id: number
}
export interface Category3 {
  code: number
  message: string
  data: Category3Data[]
  ok: boolean
}
interface Category3Data {
  id: number
  name: string
  category2Id: number
}
// 属性值对象
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  model?: boolean
}
//储存属性值的数据类型
export type AttrValueList = AttrValue[]

// 平台属性对象
export interface Attr {
  attrIdAndValueId?: string
  id?: number
  attrName: string
  categoryId: string | number
  categoryLevel: number
  attrValueList: AttrValueList
}
//储存平台属性的数据类型
export type AttrList = Attr[]
// 平台属性响应数据类型
export interface AttrResponseData {
  code: number
  message: string
  data: AttrList
  ok: boolean
}
