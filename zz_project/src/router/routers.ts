export const constantRoute = [
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
]
export const asyncRoute = [
  {
    path: '/Acl',
    name: 'Acl',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/Acl/User',
    children: [
      {
        path: '/Acl/User',
        name: 'User',
        component: () => import('@/pages/Manage/User/User.vue'),
        meta: {
          title: '用户管理',
          hidden: true,
          icon: 'User',
        },
      },
      {
        path: '/Acl/Role',
        name: 'Role',
        component: () => import('@/pages/Manage/Role/Role.vue'),
        meta: {
          title: '角色管理',
          hidden: true,
          icon: 'UserFilled',
        },
      },
      {
        path: '/Acl/Permission',
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
    path: '/Product',
    name: 'Product',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/Product/Bond',
    children: [
      {
        path: '/Product/Trademark',
        name: 'Trademark',
        component: () => import('@/pages/Goods/Bond/Bond.vue'),
        meta: {
          title: '品牌管理',
          hidden: true,
          icon: 'ShoppingCart',
        },
      },
      {
        path: '/Product/Attr',
        name: 'Attr',
        component: () => import('@/pages/Goods/Properties/Properties.vue'),
        meta: {
          title: '属性管理',
          hidden: true,
          icon: 'UserFilled',
        },
      },
      {
        path: '/Product/SPU',
        name: 'Spu',
        component: () => import('@/pages/Goods/SPU/SPU.vue'),
        meta: {
          title: 'SPU管理',
          hidden: true,
          icon: 'Menu',
        },
      },
      {
        path: '/Product/SKU',
        name: 'Sku',
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
]
export const anyRoute = [
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
