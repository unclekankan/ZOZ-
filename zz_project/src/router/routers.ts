import { Promotion } from '@element-plus/icons-vue'
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

export const constantRouter = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/pages/Login/Login.vue'),
    meta: {
      title: '登录',
      hidden: false,
    },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import('@/pages/Home/Home.vue'),
        meta: {
          title: '首页',
          hidden: true,
          icon: 'House',
        },
      },
    ],
    meta: {
      title: '',
      hidden: true,
      icon: '',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/NotFound/NotFound.vue'),
    meta: {
      title: '404',
      hidden: false,
    },
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/pages/screen/screen.vue'),
    meta: {
      title: '数据大屏',
      hidden: true,
      icon: 'Monitor',
    },
  },
  {
    path: '/Manage',
    name: 'Manage',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/Manage/User',
    children: [
      {
        path: '/Manage/User',
        name: 'User',
        component: () => import('@/pages/Manage/User/User.vue'),
        meta: {
          title: '用户管理',
          hidden: true,
          icon: 'User',
        },
      },
      {
        path: '/Manage/Role',
        name: 'Role',
        component: () => import('@/pages/Manage/Role/Role.vue'),
        meta: {
          title: '角色管理',
          hidden: true,
          icon: 'UserFilled',
        },
      },
      {
        path: '/Manage/Permission',
        name: 'Permission',
        component: () => import('@/pages/Manage/Permission/Permission.vue'),
        meta: {
          title: '菜单管理',
          hidden: true,
          icon: 'Menu',
        },
      },
    ],
    meta: {
      title: '权限管理',
      hidden: true,
      icon: 'Unlock',
    },
  },
  {
    path: '/Goods',
    name: 'Goods',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/Goods/Bond',

    children: [
      {
        path: '/Goods/Bond',
        name: 'Bond',
        component: () => import('@/pages/Goods/Bond/Bond.vue'),
        meta: {
          title: '品牌管理',
          hidden: true,
          icon: 'ShoppingCart',
        },
      },
      {
        path: '/Goods/Properties',
        name: 'Properties',
        component: () => import('@/pages/Goods/Properties/Properties.vue'),
        meta: {
          title: '属性管理',
          hidden: true,
          icon: 'UserFilled',
        },
      },
      {
        path: '/Goods/SUP',
        name: 'SUP',
        component: () => import('@/pages/Goods/SUP/SUP.vue'),
        meta: {
          title: 'SUP管理',
          hidden: true,
          icon: 'Menu',
        },
      },
      {
        path: '/Goods/SKU',
        name: 'SKU',
        component: () => import('@/pages/Goods/SKU/SKU.vue'),
        meta: {
          title: 'SKU管理',
          hidden: true,
          icon: 'Menu',
        },
      },
    ],
    meta: {
      title: '商品管理',
      hidden: true,
      icon: 'Shop',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any ',
    meta: {
      title: '任意路由',
      hidden: false,
    },
  },
]
