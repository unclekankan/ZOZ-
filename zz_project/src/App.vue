<script setup lang="ts">
import {useCounterStore} from '@/stores/index'
const counterStore=useCounterStore()
console.log(counterStore.zz)
  </script>
<template>
<router-view></router-view>
</template>

<style scoped lang="scss">

</style>
