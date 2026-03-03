<template>
  <Category :scene="scene"/>
  <div v-show="scene==0">
    <el-card style ="margin: 10px 0px;">
    <el-button type="primary" size="default" icon="Plus" @click="change" :disabled="categoryStore.C3id ? false : true">添加sup</el-button>
    <el-table border  style="width: 100%; margin-top: 10px;" :data="supattr">
      <el-table-column prop="id" label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column prop="spuName" label="SUP名称" ></el-table-column>
      <el-table-column prop="description" label="SUP描述" ></el-table-column>
      <el-table-column prop="supDo" label="SUP操作" >
        <template #="row, $index">
          <el-button type="primary" size="small" icon="plus" @click="addSku(row.row)"></el-button>
          <el-button type="warning" size="small" icon="edit" @click="edit(row.row)"></el-button>
          <el-button type="info" size="small" icon="InfoFilled" @click="getInfo(row.row)"></el-button>
          <el-popconfirm :title="`确定删除${row.row.spuName}吗?`" width="200px" icon="delete" @confirm="deleteSpu(row.row)" >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[3, 5, 7, 9]"
      background="true"
      layout="prev, pager, next, jumper ,-> , sizes,total"
      :total="total"
      @current-change="getSpuPage(currentPage4)"
      @size-change="getSpuPage()"
    />
  </div>
  </el-card>
  </div>
  <SUPForm v-show="scene==1" :scene="scene" ref="SpuVc" @changeScence="changeScence"/>
  <SKUForm v-show="scene==2" @changeScence="changeScence"  ref="SkuVc"/>
  <el-dialog v-model="dialogVisible" title="SKU列表">
    <el-table border style="width: 100%; margin: 10px 0px;" :data="skuList" ref="table">
      <el-table-column prop="id" label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column prop="skuName" label="SKU名称"></el-table-column>
      <el-table-column prop="price" label="价格(元)"></el-table-column>
      <el-table-column prop="weight" label="重量(克)"></el-table-column>
      <el-table-column prop="skuDefaultImg" label="SKU图片">
        <template #="{row,$index}" :key="row.id">
          <img :src="row.skuDefaultImg" alt="无图片" style="width: 100px; height: 100px;" />
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref ,watch,onMounted,onBeforeUnmount} from 'vue'
import { reqGetSUPPage ,reqGetSkuList,reqDeleteSPU} from '@/api/product/SPU'
import { useCategoryStore } from '@/stores/modules/setting/category'
import type { SPU, SPUPageResult,skuInfo } from '@/api/product/SPU/type'
import SUPForm from './SPUForm.vue'
import SKUForm from './SKUForm.vue'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
let pageSize4=ref<number>(3)
let currentPage4=ref<number>(1)
let total=ref<number>(0)
const getSpuPage = async(page = 1)=>{
  currentPage4.value=page
  let result:SPUPageResult = await reqGetSUPPage(currentPage4.value,pageSize4.value,categoryStore.C3id)
  if(result.code==200){
    total.value=result.data.total
    supattr.value=result.data.records
  }
}
onMounted(()=>{
  getSpuPage()
})
//监听三级分类id变化
watch(()=>categoryStore.C3id,()=>getSpuPage())
let scene=ref(0)
let supattr=ref<SPU[]>([])
//切换添加页面
const change=()=>{
  scene.value=1
  SpuVc.value.initAddSpu(categoryStore.C3id)
}
//编辑、//定义ref
let SpuVc=ref()
const edit=(row:SPU)=>{
  scene.value=1
  SpuVc.value.initSpuForm(row)
}
//切换场景
const changeScence=(obj:any)=>{
  scene.value=obj.flag
  if(obj.params == 'Update'){
    getSpuPage(currentPage4.value)
  }else{
    getSpuPage()
  }
}
//定义ref
let SkuVc=ref()
//添加sku
const addSku= (row:SPU)=>{
  SkuVc.value.InitSkuForm(row,categoryStore.C1id,categoryStore.C2id)
  scene.value=2
}
//获取sku列表
let skuList=ref<skuInfo[]>([])
const getInfo=async(row:SPU)=>{
  let result=await reqGetSkuList(row.id as number)
  if(result.code==200){
    skuList.value=result.data
  }
  dialogVisible.value=true
}
//定义dialog显示
let dialogVisible=ref(false)
//删除SPU
const deleteSpu=async(row:SPU)=>{
  let result=await reqDeleteSPU(row.id as number)
  if(result.code==200){
    ElMessage.success('删除成功')
    getSpuPage(currentPage4.value)
  }else{
    ElMessage.error('删除失败')
  }
}
//初始化
onBeforeUnmount(()=>{
  categoryStore.reset()
})
</script>
<style>
.demo-pagination-block{
  margin-top: 10px;
}

</style>
