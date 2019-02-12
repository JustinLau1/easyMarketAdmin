// 菜单 侧边栏
export default [
  { path: '/index', title: '平台概况', icon: 'home' },
  {
    title: '商品管理',
    icon: 'shopping-bag',
    children: [
        { path: '/goodsSearch', title: '商品查询' ,icon: 'search' },
        { path: '/goodsCategory', title: '商品分类' ,icon: 'codiepie' }
    ]
  },
  {
    title: 'C端商城管理',
    icon: 'caret-square-o-up',
    children: [
        { path: '/marketHome', title: '商城首页' ,icon: 'h-square' },
    ]
  }
]
