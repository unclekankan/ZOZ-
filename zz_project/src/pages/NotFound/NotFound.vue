<template>
  <div class="box">
    <img src="./404.jpg" alt="">
    <el-button type="primary" size="large" @click="back" class="back">返回首页</el-button>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
const back = ()=>{
router.push('/Home')
}
</script>
<style scoped lang="scss">
.box{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  img{
    position: absolute;
    width: 100vw;
    height: 100vh;
    margin-left: auto;

  }
.back{
    position: relative;
    margin: 72vh;
    width: 500px;
    height: 50px;
    font-size: 20px;
  }
}
</style>
