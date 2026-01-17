import svg_icon from './svg-icon/svg_icon.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const globalComponents = {
  svg_icon,
}
// 注册全局组件的插件
export default {
  install(app: any) {
    Object.keys(globalComponents).forEach((key) => {
      app.component(key, globalComponents[key as keyof typeof globalComponents])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
