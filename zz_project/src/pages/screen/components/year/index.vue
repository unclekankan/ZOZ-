<template>
  <div class="box">
    <p class="title">年度游客量对比</p>
    <p class="bg"></p>
    <div class="year" ref="year"></div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
let year = ref()
onMounted(()=>{
  let mycharts = echarts.init(year.value)
  mycharts.setOption({
    title:{
      text:'散点图',
      left:'50%',
      textStyle:{
        color:'#E8C9C0'
      }
    },
    xAxis:{
      type:'category',

    },
    yAxis:{
      show:false
    },
    grid:{
      left:10,
      top:20,
      bottom:20,
      right:0
    },
    series:[
      {
        type:'scatter',
        data:[12,24,36,45,65,78,88,90,65,102,129],
        label:{
          show:true,
          position:'top',
          color:'#D4C9E1'
        },
        //散点样式
        itemStyle:{
          color:'skyblue'
        }
      }
    ]
  })
})
</script>
<style scoped lang="scss">
.box{
  background: url('../../images/dataScreen-main-rc.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
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
    .year{
      height: calc(100% - 30px);
    }
  }
</style>
