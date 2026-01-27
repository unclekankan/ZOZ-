<template>
    <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择一级分类" v-model="categoryStore.C1id" style="width: 300px; height: 40px;" @change="categoryStore.getC2List(categoryStore.C1id)">
          <el-option v-for="ele in categoryStore.res1" :label="ele.name" :value="ele.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择二级分类" style="width: 300px; height: 40px;" v-model="categoryStore.C2id" @change="categoryStore.getC3List(categoryStore.C2id)">
          <el-option v-for="ele in categoryStore.res2" :label="ele.name" :value="ele.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择三级分类" style="width: 300px; height: 40px;" v-model="categoryStore.C3id" >
          <el-option v-for="ele in categoryStore.res3" :label="ele.name" :value="ele.id"></el-option>
        </el-select>
      </el-form-item>
      </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { useCategoryStore } from '@/stores/modules/setting/category'
const categoryStore = useCategoryStore()
onMounted(async () => {
  categoryStore.getc1List()
})
</script>
<style scoped>

</style>
