<template>
<div class="box5">
  <p class="title">未来七天游客数量趋势图</p>
  <p class="bg"></p>
  <div class="line" ref="line"></div>
</div>
</template>
<script setup lang="ts">
import {ref ,onMounted} from 'vue'
import * as echarts from 'echarts'
let line = ref()
onMounted(()=>{
  let myCharts = echarts.init(line.value)
  myCharts.setOption({
    title:{
      text:''
    },
    series:{
      type:'line',
      data:[0,45,123,201,423,133,416],
      smooth:true,
      //区域填充样式
      areaStyle:{
        color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                offset: 0, color: 'rgb(232, 125, 3)' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgb(11, 32, 125)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
      }
    },
    xAxis:{
      boundaryGap:false,//x轴不留白
      type:'category',
      //分割线设置
      splitLine:{
        show:false
      },
       //刻度设置
      axisTick:{
        show:true
      },
      //x轴数据
      data:['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis:{
      splitLine:{
        show:false
      },
       //轴线设置
      axisLine:{
        show:true
      },
      //刻度设置
      axisTick:{
        show:true
      }
    },
    grid:{
      left:33,
      top:33,
      right:20,
      bottom:25
    }
  })
})
</script>
<style lang="scss" scoped>
.box5{
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin:0 10px;
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
    .line{
      height:calc(100% - 40px);
      color: rgb(232, 125, 3);
    }
  }
</style>
