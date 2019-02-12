const config = require('./config')
const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
const routing =  require('./routers')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const static = require('koa-static')
const Interceptor = require('./utils/Interceptor')
const app = new Koa()
onerror(app)

// 静态资源目录对于相对入口文件app.js的路径
const staticPath = './webApp'

app.use(static(
    path.join( __dirname,  staticPath)
))
// 配置存储session信息的mysql
let store = new MysqlSession({
    user: 'root',
    password: 'Ectriptestdb2018',
    database: 'bolo',
    host: '220.231.216.128',
})

// 存放sessionId的cookie配置
let cookie = {
    maxAge: 1000*60*30, // cookie有效时长
    expires: '',  // cookie失效时间
    path: '/', // 写cookie所在的路径
    domain: '', // 写cookie所在的域名
    httpOnly: '', // 是否只用于http请求中获取
    overwrite: 'false',  // 是否允许重写
    secure: '',
    sameSite: '',
    signed: ''
}


// 使用session中间件
app.use(session({
    key: 'SESSION_ID',
    store: store,
    cookie: cookie
}))

// 拦截器
app.use(Interceptor)

// 使用ctx.body解析中间件
app.use(bodyParser())

// 初始化路由中间件
routing(app)

app.listen(config.port)
console.log(`listen${config.port}`)