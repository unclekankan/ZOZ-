import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/pages/Login/Login.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/layout/Layout.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/NotFound/NotFound.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'any ',
    },
  ],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
