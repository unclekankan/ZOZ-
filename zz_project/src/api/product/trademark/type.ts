export interface Trademark {
  id?: number
  tmName: string
  logoUrl: string
}
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export type Records = Trademark[]
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
    searchCount: boolean
  }
}
export interface esponseData {
  code: number
  message: string
  ok: boolean
}
