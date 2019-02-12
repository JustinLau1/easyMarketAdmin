const Router = require('koa-router')
const config = require('../config')
const home = require('../controllers/home')

const api = 'home'

const router = new Router()

router.prefix(`/${config.baseApi}/${api}`)

router.get('/' , home.getHomeMsg)
router.post('/' , home.addHomeMsg)

module.exports = router