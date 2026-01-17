<template>

   <template v-for="(ele , index) in menuList" :key="ele.path">
      <el-menu-item v-if="!ele.children&&ele.meta.hidden" :index="ele.path" @click="goRoute">
          <el-icon><component :is="ele.meta.icon"/></el-icon>
        <template #title>
          <span>{{ ele.meta.title }}</span>
        </template>
      </el-menu-item>
       <template v-if="ele.meta.hidden">
        <el-menu-item v-if="ele.children&&ele.children.length==1" :index="ele.children[0].path" @click="goRoute">
          <el-icon><component :is="ele.children[0].meta.icon"/></el-icon>
         <template #title>
          <span>{{ ele.children[0].meta.title }}</span>
         </template>
        </el-menu-item>
       </template>
     <template v-if="ele.meta.hidden">
       <el-sub-menu v-if="ele.children&&ele.children.length > 1" :index="ele.path">
        <template #title>
          <el-icon><component :is="ele.meta.icon"/></el-icon>
          <span>{{ ele.meta.title }}</span>
        </template>
        <Menus :menuList="ele.children"></Menus>
      </el-sub-menu>
     </template>

  </template>
</template>
<script lang="ts" setup>
import {useRouter} from 'vue-router'
defineProps(['menuList'])
const router = useRouter()
const goRoute = (vc:any)=>{
  router.push(vc.index)
}
</script>
<script lang="ts">
export default{
  name:'Menus'
}
</script>
<style scoped>
h1 {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
</style>
