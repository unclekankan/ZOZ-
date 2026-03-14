<template>
<div class="box">
  <div class="top">
    <p class="title">实时游客统计</p>
    <p class="bg"></p>
    <p class="right">可预约人数<span>99999</span>人</p>
  </div>
  <div class="number">
    <span v-for="(item,index) in people" :key="index">{{ item }}</span>
  </div>
  <div class="charts" ref="charts"></div>
</div>
</template>
<script lang="ts" setup>
import {ref , onMounted} from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('259181')
let charts = ref()
onMounted(()=>{
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title:{
      text:'水球图'
    },
    series:{
      type:'liquidFill',
      data:[0.6],
      radius:'85%'
    },
    xAxis:{},
    yAxis:{},
    grid:{
      top:0,
      left:0,
      right:0,
      bottom:0
    }
  })
})
</script>
<style scoped lang="scss">
.box{
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top{
    .title{
      color: aliceblue;
      font-size: 20px;
      margin-left: 10px;
    }
    .bg{
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-left: 10px
    }
    .right{
      float: right;
      color: white;
      font-size: 20px;
      span{
        color: rgb(255, 187, 0);
      }
    }
  }
  .number{
    margin-top: 30px;
    display: flex;
    padding: 10px;
    span{
      flex: 1;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 40px;
      color: #29fcff;
    }
  }
  .charts{
  width: 100%;
  height: 250px;
  }
}
</style>
