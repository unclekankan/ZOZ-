<template>
    <div class="box">
      <div class="top">
        <p class="title">年龄比例</p>
        <p class="bg"></p>
      </div>
      <div class="charts" ref="charts"></div>
    </div>
</template>
<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import * as echarts from 'echarts'
let charts = ref()
onMounted(()=>{
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 32,
      right:10,
      textStyle:{
        color:'white',
        fontSize:14
      },
      orient:'vertical'//图例组件位置调整
    },
    series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside',
          color:'white'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '军事' },
        { value: 735, name: '新闻' },
        { value: 580, name: '财经' },
        { value: 484, name: '娱乐' },
        { value: 300, name: '学习、' }
      ]
    }
  ]
  })
})
</script>
<style scoped lang="scss">
.box{
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
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
  .charts{
    margin-top: 30px;
    height: 210px;
  }
}
</style>
