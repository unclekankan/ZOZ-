import { createApp } from 'vue'
// import pinia from './stores/index.ts'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import './style/index.scss'
import App from './App.vue'
import router from './router'
import globalComponents from './components/index.ts'
import '@/permission.ts'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
globalComponents.install(app)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
