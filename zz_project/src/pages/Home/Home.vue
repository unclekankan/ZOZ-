<template>
  <el-card>
   <div class="box">
      <img :src="userStore.avater" class="avater">
      <div class="buttom">
        <h3 class="title">{{date}}{{ userStore.username }}!</h3>
        <p class="subtitle">ZOZ后台管理系统</p>
      </div>
   </div>
  </el-card>
  <div class="buttomz">
    <svg_icon name="数据库分析-01" width="500px" height="500px"/>
  </div>
</template>
<script lang="ts" setup>
  import { ref ,onMounted} from 'vue';
  import { useUserStore } from '@/stores/modules/user.ts'
import Svg_icon from '@/components/svg-icon/svg_icon.vue';
  const userStore = useUserStore()
  const getTime = () => {
  const hour = new Date().getHours();
  if (hour < 6) return '凌晨好';
  if (hour < 9) return '早上好';
  if (hour < 12) return '上午好';
  if (hour < 14) return '中午好';
  if (hour < 17) return '下午好';
  if (hour < 19) return '傍晚好';
  if (hour < 22) return '晚上好';
  return '夜深了，注意休息哦';
}
let date = ref()
onMounted(()=>date.value = getTime())
</script>
<style lang="scss">
.box {
  display: flex;
  .avater{
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
  .buttom{
    margin-left: 20px;
  .title{
    font-size: 30px;
    font-weight: 600;
    margin: 30px 0px 20px 0px;
  }
  .subtitle{
    font-style: italic;
    color: rgb(186, 197, 197);
  }
  }
}
.buttomz{
  margin: 90px;
  display: flex;
  justify-content: center
}
</style>
