const Router = require('koa-router')
const config = require('../config')
const login = require('../controllers/login')
const api = 'login'

const router = new Router()

router.prefix(`/${config.baseApi}/${api}`)

router.post('/' , login.userLoginIn)
module.exports = router