import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqAttrList1, reqAttrList2, reqAttrList3, reqAttrInfoList } from '@/api/product/attr'
export const useCategoryStore = defineStore('category', () => {
  let C1id = ref<number | string>('')
  let res1 = ref<any>({})
  const getc1List = async () => {
    let result = await reqAttrList1()
    if (result.code == 200) {
      res1.value = result.data
    }
  }
  let C2id = ref<number | string>('')
  let res2 = ref<any>({})
  const getC2List = async (c1id: any) => {
    C3id.value = ''
    C2id.value = ''
    let result = await reqAttrList2(c1id)
    if (result.code == 200) {
      res2.value = result.data
    }
  }
  let C3id = ref<number | string>('')
  let res3 = ref<any>({})
  const getC3List = async (c2id: any) => {
    C3id.value = ''
    let result = await reqAttrList3(c2id)
    if (result.code == 200) {
      res3.value = result.data
    }
  }
  const reset = () => {
    C1id.value = ''
    C2id.value = ''
    C3id.value = ''
    res1.value = ''
    res2.value = ''
    res3.value = ''
  }
  return { res1, getc1List, res2, getC2List, res3, getC3List, C1id, C2id, C3id, reset }
})
