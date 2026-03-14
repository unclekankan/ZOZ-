<template>
  <div class="box">
     <p class="title">热门景区排行</p>
    <p class="bg"></p>
    <div class="rank" ref="rank"></div>
  </div>
</template>
<script setup lang="ts">
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
let rank = ref()
onMounted(()=>{
  let myCharts = echarts.init(rank.value)
  myCharts.setOption({
    title:{
      text:'排行',
      left:'50%',
      textStyle:{
        color:'rgb(247, 76, 9)'
      }
    },
    xAxis:{
      splitLine:false,
      type:'category'
    },
    yAxis:{
      splitLine:false

    },
    grid:{
      left:20,
      bottom:20,
      right:20
    },
    series:[
      {
      type:'bar',
      data:[20,34,42,54,62,66,78,87,93,108],
      label:{
        show:true,
        position:'insideTop',
        color:'rgb(247, 76, 9)'
      },
      //柱子的样式
      itemStyle:{
        borderRadius:[10,10,0,0],
        color:function(data:any){
          let arr = ['#F9F7F1','#9BA899','#B4C7DC','#E8C9C0','#A79A86','#C17C5C','#FFFFF0','#D4C9E1','#E6E0D0','#8B9082','#BB8A7A']
          return arr[data.dataIndex]
        }
      }
    },
    {
      type:'line',
      data:[20,34,42,54,62,66,78,87,93,108],
      smooth:true
    }
    ]
  })
})
</script>
<style scoped lang="scss">
.box{
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-rb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
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
    .rank{
      height: calc(100% - 35px);
  }
}
</style>
