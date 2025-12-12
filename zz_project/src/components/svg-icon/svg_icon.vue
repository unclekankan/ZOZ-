<template>
  <svg>
    <use :xlink:href="font+name" :fill=color></use>
  </svg>
</template>
<script setup lang="ts">
defineProps(
{
  font: {
    type: String,
    default: "#icon-"
  },
  color: {
    type: String,
    default: "black"
  },
  name: {
    type: String,
    required: true
  }
}
)
</script>
<style>
</style>
