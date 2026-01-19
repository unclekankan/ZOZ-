<template>
  <div>
    <el-card style="max-width: 100%">
    <el-button type="primary" icon="Plus">添加商品</el-button>
    <el-table :data="tableData" border style="width: 100% ;margin: 10px 0px;">
      <el-table-column prop="num" label="序列" width="80" align="center" />
      <el-table-column prop="name" label="品牌名称" />
      <el-table-column prop="logo" label="品牌logo" />
      <el-table-column prop="edit" label="品牌操作" />
    </el-table>
     <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[3, 5,7, 9]"
      :background="true"
      layout=" prev, pager, next, jumper ,-> , sizes,total"
      :total="400"
    />
  </div>
  </el-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  const currentPage4 = ref(1);
  const pageSize4 = ref(3);
const tableData = [
  {
    num: '1',
    name: '王小明',
    logo: 'logo地址',
    edit: '编辑/删除'
  }
]
</script>
<style>

</style>
