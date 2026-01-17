<template>
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" v-if="flag"/>
  </transition>
</router-view>
</template>
<script lang="ts" setup>
import {useLayoutStore} from '@/stores/modules/setting/setting'
import {watch,nextTick,ref} from 'vue'
const layoutStore = useLayoutStore()
let flag = ref(true)
watch(()=>layoutStore.refresh,()=>{
  flag.value = false
  //ref对象修改后的dom重新加载后执行
  nextTick(()=>{
  flag.value = true
  })
})
</script>
<style lang="scss">
.fade-enter-from{
  opacity: 0%;
}
.fade-enter-active{
  transition: all 1s;
}
.fade-enter-to{
  opacity: 100%;
}
</style>
