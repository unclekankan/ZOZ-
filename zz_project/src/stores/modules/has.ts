import { useUserStore } from '@/stores/modules/user'
export const isHasbuttton = (app: any) => {
  app.directive('has', {
    mounted(el: any, option: any) {
      const userStore = useUserStore()
      if (!userStore.buttons.includes(option.value)) {
        el.parentNode.removeChild(el)
      }
    },
  })
}
