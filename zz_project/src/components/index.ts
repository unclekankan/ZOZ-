import svg_icon from './svg-icon/svg_icon.vue'
import one from './1.vue'
const globalComponents = {
  svg_icon,
  one,
}
// 注册全局组件的插件
export default {
  install(app: any) {
    Object.keys(globalComponents).forEach((key) => {
      app.component(key, globalComponents[key as keyof typeof globalComponents])
    })
  },
}
