<template>
<el-card style ="margin: 10px 0px;">
  <el-form label-width="100px" style="margin-top: 10px;" :model="skuInfoData">
    <el-form-item label="SKU名称">
      <el-input placeholder="请输入SKU名称" v-model="skuInfoData.skuName"></el-input>
    </el-form-item>
     <el-form-item label="价格(元)">
      <el-input placeholder="请输入SKU价格" v-model.number="skuInfoData.price" ></el-input>
    </el-form-item>
     <el-form-item label="重量(克)">
      <el-input placeholder="请输入SKU重量" v-model.number="skuInfoData.weight"></el-input>
    </el-form-item>
      <el-form-item label="SKU描述">
        <el-input placeholder="请输入SKU描述" type="textarea" v-model="skuInfoData.skuDesc"></el-input>
      </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="80px">
        <el-form-item v-for="(value, index) in  attrInfoList" :label="value.attrName" :key="value.id">
          <el-select placeholder="请选择" style="width: 200px;"v-model="value.attrIdAndValueId">
             <el-option v-for="item in value.attrValueList" :key="item.id" :label="item.valueName" :value="`${item.id}:${value.id}`"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true" label-width="80px">
        <el-form-item :label="value.saleAttrName" v-for="(value,index) in  saleAttrList" :key="value.id">
          <el-select placeholder="请选择" style="width: 200px;" v-model="value.saleIdAndValueId">
              <el-option v-for="item in value.spuSaleAttrValueList" :key="item.id" :label="item.saleAttrValueName" :value="`${item.id}:${value.id}`"></el-option>
        </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border style="width: 100%; margin: 10px 0px;" :data="imageList" ref="table">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #="{row,$index}" :key="row.id">
            <img :src="row.imgUrl" alt="无图片" style="width: 100px; height: 100px;" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{row,$index}">
            <el-button type="warning" size="small" @click="handle(row)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="default" size="default" @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { AttrList} from '@/api/product/attr/type'
import { reqAttrInfoList} from '@/api/product/attr/index'
import {reqGetSPUSaleAttrList,reqGetSPUImageList,reqAddSku} from '@/api/product/SPU/index'
import type{  spuSaleAttrLists,SPU,SPUImageList, skuInfo ,skuAttrValueList} from '@/api/product/SPU/type'
import { ElMessage } from 'element-plus'
let $emit = defineEmits(['changeScence'])
//返回上一页
const back=()=>{
  $emit('changeScence',{flag:0})
}
//平台属性列表
let attrInfoList=ref<AttrList>([])
//销售属性列表
let saleAttrList=ref<spuSaleAttrLists>([] as unknown as spuSaleAttrLists)
//图片列表
let imageList=ref< SPUImageList>([])
//初始化sku表单
const InitSkuForm= async(row:SPU,c1id:number,c2id:number)=>{
  skuInfoData.value={
    category3Id: '',
    price: '',
    skuAttrValueList: [],
    skuImageList: [],
    skuDefaultImg: '',
    skuDesc: '',
    skuName: '',
    skuSaleAttrValueList: [],
    spuID: '',
    tmId: '',
    weight: ''
  }
  let result=await reqAttrInfoList(c1id,c2id,row.category3Id as number)
  if(result.code==200){
    attrInfoList.value=result.data
  }
  let saleResult=await reqGetSPUSaleAttrList(row.id as number)
  if(saleResult.code==200){
    saleAttrList.value=saleResult.data
  }
  let imageResult=await reqGetSPUImageList(row.id as number)
  if(imageResult.code==200){
    imageList.value=imageResult.data
  }
  skuInfoData.value.category3Id=row.category3Id as string
  skuInfoData.value.spuID=row.id as number
  skuInfoData.value.tmId=row.tmId as string

}
//收集数据
let skuInfoData=ref<skuInfo>({
    category3Id: '',
    price: '',
    skuAttrValueList: [],
    skuImageList: [],
    skuDefaultImg: '',
    skuDesc: '',
    skuName: '',
    skuSaleAttrValueList: [],
    spuID: '',
    tmId: '',
    weight: ''
})
//默认图片
let table = ref()
const handle=(row:any)=>{
  skuInfoData.value.skuDefaultImg=row.imgUrl
  table.value.clearSelection()
  table.value.toggleRowSelection(row,true)
}
//保存
const save= async()=>{
  skuInfoData.value.skuAttrValueList=attrInfoList.value.reduce((prev:any,item:any)=>{
    if(item.attrIdAndValueId){
      prev.push({
        attrId: item.attrIdAndValueId?.split(':')[1] as string,
        valueId: item.attrIdAndValueId?.split(':')[0] as string
      })
    }
    return prev
  },[])
  skuInfoData.value.skuSaleAttrValueList=saleAttrList.value.reduce((prev:any,item:any)=>{
    if(item.saleIdAndValueId)
    prev.push({
      saleAttrId: item.saleIdAndValueId?.split(':')[1] as string,
      saleAttrValueId: item.saleIdAndValueId?.split(':')[0] as string
    })
    return prev
  },[])
    skuInfoData.value.skuImageList=imageList.value.map((item:any)=>{
      return {
        imgName: item.imgName,
        imgUrl: item.imgUrl
      }
    })
  let result=await reqAddSku(skuInfoData.value)
  if(result.code==200){
      ElMessage.success('保存成功')
      $emit('changeScence',{flag:0})
  }else{
    ElMessage.error('保存失败')
  }
}

//暴露方法给父组件
defineExpose({InitSkuForm})
</script>
<style scoped>

</style>
