<template>
  <div class="box">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
      <img src="../../images/man.png" alt="">
      </div>
      <div class="women">
      <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script lang="ts" setup>
import {ref , onMounted} from 'vue'
import * as echarts from 'echarts'
let charts = ref()
onMounted(()=>{
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    title:{
      text:''
    },
    xAxis:{
      show:false,
    },
    yAxis:{
      show:false,
      type:'category'
    },
    series:[
      {
      type:'bar',
      data:[58],
      barWidth:20,
      z:100,
      itemStyle:{
      borderRadius:20,
      color:'skyblue'
      }
    },
    {
      type:'bar',
      data:[100],
      barWidth:20,
      //调整女神柱状图
      barGap:'-100%',
      itemStyle:{
      borderRadius:20,
      color:'pink'
      }
    },
    ]
  })
})
</script>
<style scoped lang="scss">
.box{
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
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
  }
  .sex{
    // margin-top: 10px;
    display: flex;
    justify-content: center;
    .man{
      width: 111px;
      height: 115px;
      margin: 30px 20px;
      background: url(../../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .women{
      width: 111px;
      height: 115px;
      margin: 30px 20px;
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate{
    display: flex;
    padding: 0px 40px ;
    justify-content: space-between;
    color: white;
  }
  .charts{
    // margin-top: -15px;
    height: 100px;
  }
}
</style>
