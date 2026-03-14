<template>
  <div class="box">
    <p class="title">数据统计</p>
    <p class="bg"></p>
    <div class="charts" ref="charts"></div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
let charts = ref()
let option =  {
  title: {
    text: '游客的消费统计',
    textStyle:{
      color:'white'
    }
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '消费', max: 6500 },
      { name: '出行', max: 16000 },
      { name: '景区', max: 30000 },
      { name: '住宿', max: 38000 },
      { name: '好感度', max: 52000 },
      { name: '爱好', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: '购物'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: '饮食'
        }
      ]
    }
  ]
};
onMounted(()=>{
  let mycharts = echarts.init(charts.value)
  mycharts.setOption(option)
})
</script>
<style scoped lang="scss">
  .box{
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
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
    .charts{
      height: calc(100% - 30px);
    }
  }
</style>
