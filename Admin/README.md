### 1.路由配置

##### 路由配置路径：src/router/routes

##### 配置路由命名（模块+功能）eg:商品模块goods+Search

```javascript
{
    path: '/goodsSearch',
    name: 'goodsSearch',
    component: () => import('@/pages/goods/goodsSearch'),
    meta: { meta, title: '商品查询' }
},
 {
    path: '/goodsDetail/:id',
    name: 'goodsDetail',
    component: () => import('@/pages/goods/goodsDetail'),
    meta: { meta, title: '商品详情' }
}
```

vue-router官方文档: https://router.vuejs.org/

### 2.新增页面

##### 页面配置路径：src/page

>1.根据自身开发的模块新建一个文件夹 eg：新建一个goods文件夹代表一个goods的模块
>
>2.在该文件夹新增一个goodsSearch.vue代表该页面的功能，命名规范：模块名+Search

### 3.新增开发菜单栏

##### 左边菜单栏配置路径：src/menu/aside.js

```javascript
// 菜单 侧边栏
export default [
  { path: '/index', title: '平台概况', icon: 'home' },
  {
    title: 'PMS商品管理',
    icon: 'shopping-bag',
    children: [
      { path: '/goodsSearch', title: '商品查询' ,icon: 'search' }
    ]
  }
]
```

>注：icon使用的是fontawesome

fontawesome 图标库: http://www.fontawesome.com.cn/faicons/

### 4.数据请求

##### api配置路径：src/plugin/http/http.js

##### api管理路径：src/plugin/http/index.js

###### eg：

###### 1.配置一个post请求的登录接口

```javascript
import Vue from 'vue'
import HttpUtils from './http'
import axios from "axios/index";
class Https {
  // 在这配置你的接口
  postLogin = (params) => {
      return HttpUtils.post('/login', params)
  }
  //....
}
Vue.prototype.$http = new Https()
```

###### 2.在goodsSearch页面调用该接口

```javascript
// async await ES7语法
async getData () {
    const parmas = {
        method: 'WLYDRS',
        iscenicid: '1',
        stdt: '2017-10-11',
        ldti: '2017-10-18'
    }
    let data = await this.$http.getOpenId(parmas)
    console.log(data)
}
```

##### 代理服务器配置（解决跨域问题）

###### 1.代理服务器配置路径: vue.config.js

```javascript
devServer: {
    publicPath: baseUrl, // 和 baseUrl 保持一致
    proxy: {
        '/api': {
            target: 'http://c.aesly.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api'
            }
        }
    }
  }
```

###### 2.在api配置路径

```javascript
const instance = axios.create({
  baseURL: '/api',
  withCredentials: true // 跨域类型时是否在请求中协带cookie
})
```

axios官方文档: https://github.com/axios/axios

### 5.UI组件库Element 2.4+

Element: http://element.eleme.io/2.4/#/zh-CN/component/installation

### 6.友情链接

Vue官方文档: https://cn.vuejs.org/

Vuex: https://vuex.vuejs.org/

D2admin: https://d2-projects.github.io/d2-admin-doc/zh/

> 1.以上只是简要的开发流程，具体后台的设计方案看源码，参考D2admin的文档。
>
> 2.git开发每人一个分支，master和version由合并者操作。
>

### 7.国际化多语言

##### 国际化配置路径 src/lang

> 以英文配置为例：goodsDetail跟页面命名规范一样。模块+功能 goods+ Detail

```javascript
module.exports={
    goodsDetail: {
        hello: 'hello',
        about: 'about',
        welcome: "Welcome"
    }
}
```

> 使用只需要{{$t("goodsDetail.hello")}}

```javascript
<template>
    <d2-container>
        <template slot="header">Page 1 header</template>
        商品详情页{{ $t("goodsDetail.hello") }}
        <div style="height: 1000px"></div>
        <template slot="footer">footer</template>
    </d2-container>
</template>
```

