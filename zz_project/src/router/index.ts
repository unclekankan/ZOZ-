import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { constantRouter } from './routers'
const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter as unknown as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
