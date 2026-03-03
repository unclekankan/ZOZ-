<template>
  <el-card>
    <el-table border :data="records">
      <el-table-column label="序号" type="index" width="100px" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName" show-overflow-tooltip width="200px"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" show-overflow-tooltip width="200px"></el-table-column>
      <el-table-column label="默认图片" prop="skuDefaultImg" width="200px">
        <template #="{row}">
          <el-image :src="row.skuDefaultImg" style="width: 100px; height: 100px;"></el-image>
        </template>
      </el-table-column >
      <el-table-column label="重量" prop="weight" width="200px"></el-table-column>
      <el-table-column label="价格" prop="price" width="200px"></el-table-column>
      <el-table-column label="操作" width="300px" fixed="right">
        <template #="{row}">
          <el-button :type="row.isSale ? 'info' : 'success'" size="small" :icon="row.isSale ? 'Bottom' : 'Top'" @click="changeStatus(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="edit"></el-button>
          <el-button type="info" size="small" icon="InfoFilled" @click="getInfo(row)"></el-button>
          <el-popconfirm :title="`确定删除${row.skuName}吗?`" width="200px" icon="delete" @confirm="deleteSKU(row)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[3, 7, 9]"
      background
      layout="prev, pager, next, jumper ,-> , sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  </el-card>
  <el-drawer v-model="drawer" title="查看商品详情" :with-header="true" :size="'30%'">
    <template #default>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{currentRow?.skuName}}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{currentRow?.skuDesc}}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{currentRow?.price}}</el-col>
      </el-row>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <el-tag  style="margin-right: 10px;" v-for="value in currentRow?.skuAttrValueList" :key="value.id">{{value.valueName}}</el-tag>
        </el-col>
      </el-row>
       <el-row style="margin-bottom: 10px;">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag  style="margin-right: 10px;" v-for="value in currentRow?.skuSaleAttrValueList" :key="value.id">{{value.saleAttrValueName}}</el-tag>
        </el-col>
      </el-row >
         <el-row>
        <el-col :span="6">商品照片</el-col>
        <el-col :span="18">
          <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in currentRow?.skuImageList" :key="item.id">
                  <el-image :src="item.imgUrl" style="width: 100%; height: 100%;"></el-image>
                </el-carousel-item>
           </el-carousel>
        </el-col>
      </el-row>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref,onBeforeMount } from 'vue';
import {reqGetSKUList,reqOffSale,reqOnSale ,reqGetSKUInfo,reqDeleteSKU} from '@/api/product/SKU/index'
import { ElMessage } from 'element-plus';
let currentPage4 = ref(1);
let pageSize4 = ref(3);
onBeforeMount(()=>{
  getSKUList()
})
let total = ref<number>(1)
let records = ref()
const getSKUList=async(page = 1)=>{
  currentPage4.value = page
  let res=await reqGetSKUList(currentPage4.value,pageSize4.value)
  if(res.code==200){
    total.value = res.data.total
    records.value = res.data.records
  }
}
const handleSizeChange=()=>{
  getSKUList()
}
const handleCurrentChange=()=>{
  getSKUList(currentPage4.value)
}
// 上架/下架
const changeStatus= async(row:any)=>{
  if(row.isSale == 0){
    await reqOnSale(row.id)
    ElMessage.success('上架成功')
    getSKUList(currentPage4.value)
  }else{
    await reqOffSale(row.id)
    ElMessage.success('下架成功')
    getSKUList(currentPage4.value)
}
}
// 编辑
const edit=()=>{
  ElMessage.info('业务扩展中......')
}
//抽屉
let drawer = ref<boolean>(false)
//查看详情
let currentRow = ref()
const getInfo= async(row:any)=>{
  drawer.value = true
  let res = await reqGetSKUInfo(row.id)
  if(res.code == 200){
    currentRow.value = res.data
  }
}
// 删除
const deleteSKU = async(row:any) => {
  let res = await reqDeleteSKU(row.id)
  if(res.code == 200){
    ElMessage.success('删除成功')
    getSKUList(currentPage4.value)
  }
}
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
