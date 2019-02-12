import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// flex.css
import 'flex.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import screenfull from 'screenfull'
import '@/assets/svg-icons'
import '@/components'
import '@/plugin/http'
// import '@/mock/register'
import util from '@/libs/util.js'
import store from '@/store/index'
import './assets/sass/index.scss'
import utils from './plugin/utils'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import en from './lang/en'
import ch from './lang/ch'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
import { frameInRoutes } from '@/router/routes'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$utils = new utils()
Vue.prototype.$env = process.env.NODE_ENV
Vue.prototype.$baseUrl = process.env.BASE_URL

const i18n = new VueI18n({
    locale: 'en',
    messages:{
        'en': en,
        'ch': ch,
    }
})

const vue =  new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.getAllPageFromRoutes()
    // 设置顶栏菜单
    this.$store.commit('d2adminMenuHeaderSet', menuHeader)
    // 异步加载设置侧边栏菜单
    setTimeout(() => {
        this.$store.commit('d2adminMenuAsideSet', menuAside)
    },30)
  },
  mounted () {
    // 获取并记录用户 UA
    this.$store.commit('d2adminUaGet')
    // 展示系统信息
    util.showInfo()
    // 用户登陆后从数据库加载一系列的设置
    this.$store.commit('d2adminLoginSuccessLoad')
    // 初始化全屏监听
    this.fullscreenListenerInit()
  },
  methods: {
    /**
     * 初始化全屏监听
     */
    fullscreenListenerInit () {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            this.$store.commit('d2adminFullScreenSet', false)
          }
        })
      }
    },
    /**
     * 处理路由 得到所有的页面
     */
    getAllPageFromRoutes () {
      const pool = []
      const push = function (routes) {
        routes.forEach(route => {
          if (route.children) {
            push(route.children)
          } else {
            const { meta, name, path } = route
            pool.push({ meta, name, path })
          }
        })
      }
      push(frameInRoutes)
      this.$store.commit('d2adminPagePoolSet', pool)
    }
  }
}).$mount('#app')
export default vue