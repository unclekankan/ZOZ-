<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="back">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:  {{ time }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router'
import { ref , onMounted,onBeforeUnmount} from 'vue'
import moment from 'moment'
const router = useRouter()
//返回首页
const back = ()=>{
  router.push('/Home')
}
let timer = ref<number>(0)
//动态获取时间
let time = ref(moment().format('YYYY年MM月D日 hh:mm:ss'))
onMounted(()=>{
  timer.value = setInterval(()=>{
  time.value = moment().format('YYYY年MM月D日 hh:mm:ss')
},1000)
})
onBeforeUnmount(()=>{
clearInterval(timer.value)
})
</script>
<style lang="scss" scoped>
.top{
  width: 100%;
  height: 40px;
  display: flex;
  .left{
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn{
      width: 150px;
      height: 40px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
    }
  }
  .center{
    flex: 2;
    .title{
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 35px;
    }
  }
  .right{
    flex: 1;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    .rbtn{
      width: 150px;
      height: 40px;
      flex: 1;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
    }
    .time{
        height: 40px;
        flex: 2;
        text-align: center;
        line-height: 40px;
        color: #29fcff;

      }
  }
}
</style>
