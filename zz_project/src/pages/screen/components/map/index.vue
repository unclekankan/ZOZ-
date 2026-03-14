<template>
<div ref="map" class="box4">

</div>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue'
import  * as echarts from 'echarts'
import chinaGSON from './china.json'
echarts.registerMap('china',chinaGSON as any)
let map = ref()
onMounted(()=>{
  let myCharts = echarts.init(map.value)
  myCharts.setOption({
    geo:{
      map:'china',
      roam:false ,//鼠标缩放拖动功能
      //地图位置
      top:'66',
      left:'72',
      right:'72',
      label:{
        show:true,
      },
      //每个多边形的样式
      itemStyle:{
       color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                offset: 0, color: 'rgb(25, 127, 205)' // 0% 处的颜色
            }, {
                offset: 1, color: 'rgb(11, 32, 125)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
      }
    },
    series:[
      {
      type:'lines',
      data:[
        {
        coords:[
          [116.405285, 39.904989],
          [108.948024, 34.263161]
        ],
        lineStyle:{
          color:'indigo',
          width:'2'
        }
      },
      {
        coords:[
          [104.065735, 30.659462],
          [101.778916, 36.623178]
        ],
        lineStyle:{
          color:'indigo',
          width:'2'
        }
      },
      {
        coords:[
          [115.892151, 28.676493],
          [114.502461, 38.045474]
        ],
        lineStyle:{
          color:'indigo',
          width:'2'
        }
      },
      {
        coords:[
          [106.504962, 29.533155],
          [113.54909, 22.198951]
        ],
        lineStyle:{
          color:'indigo',
          width:'2'
        }
      },
      ],
      //特效样式
      effect:{
        show:true,
        symbol:'arrow',
        symbolSize:10,
        color:'black'
      }
    }
    ]
  })
})
</script>
<style lang="scss" scoped>
p{
color: rgb(25, 127, 205);
}
</style>
