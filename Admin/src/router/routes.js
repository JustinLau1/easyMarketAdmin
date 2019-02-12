// layout
import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      {
        path: 'index',
        name: 'index',
        meta: { meta, title: '平台概况' },
        component: () => import('@/pages/index')
      },
      {
        path: '/goodsSearch',
        name: 'goodsSearch',
        component: () => import('@/pages/goods/goodsSearch'),
        meta: { meta, title: '商品查询' }
      },
      {
          path: '/goodsCategory',
          name: 'goodsCategory',
          component: () => import('@/pages/goods/goodsCategory'),
          meta: { meta, title: '商品分类' }
      },
        {
            path: '/marketHome',
            name: 'marketHome',
            component: () => import('@/pages/market/marketHome'),
            meta: { meta, title: '商城首页' }
        }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登陆
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/error-page-404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
