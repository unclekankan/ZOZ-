<template>
  <div>
    <Category/>
  </div>
  <el-card style="margin: 10px 0px;">
    <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.C3id?false:true">添加产品属性</el-button>
    <el-table border style="width: 100%; margin-top: 10px;" :data="attrArr">
      <el-table-column prop="id" label="序号" width="80px" align="center" type="index" ></el-table-column>
      <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
      <el-table-column prop="value" label="属性值名称"  >
        <template #="{row,$index}">
          <el-tag v-for="ele in row.attrValueList" :key="ele.id" style="margin: 5px 10px;">{{ele.valueName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template #default="{row}">
          <el-button type="primary" size="small" icon="Edit">编辑</el-button>
          <el-button type="danger" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script lang="ts" setup>
import {watch,ref} from 'vue';
import { useCategoryStore } from '@/stores/modules/setting/category';
import { reqAttrInfoList } from '@/api/product/attr';
import type { Attr } from '@/api/product/attr/type';
const categoryStore = useCategoryStore();
watch(() => categoryStore.C3id,
  () => {
    attrArr.value=[]
     if(categoryStore.C3id){
       getAttrInfoList(categoryStore.C1id,categoryStore.C2id,categoryStore.C3id)
     }
  }
)
let attrArr=ref<Attr[]>([])
  const getAttrInfoList = async (C1id: any, C2id: any, C3id: any) => {
    let result = await reqAttrInfoList(C1id, C2id, C3id)
    if (result.code == 200) {
      attrArr.value = result.data
    }
  }
</script>
<style>

</style>
