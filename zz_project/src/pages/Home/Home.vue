<template>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
  <div>我是{{ userStore.username }}</div>
</template>
<script lang="ts" setup>
  import { useUserStore } from '@/stores/modules/user.ts'
  const userStore = useUserStore()
</script>
<style>
.div {
  color: red;
  width: 100px;
}
</style>
