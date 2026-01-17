import { defineStore } from 'pinia'
export const useLayoutStore = defineStore('layout', () => {
  const refresh = false
  return { refresh }
})
