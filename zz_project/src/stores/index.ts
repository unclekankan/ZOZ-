import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('index', () => {
  const zz = ref(0)

  return { zz }
})
