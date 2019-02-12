const Router = require('koa-router')
const config = require('../config')

const goods = require('../controllers/goods')

const api = 'goods'

const router = new Router()

router.prefix(`/${config.baseApi}/${api}`)

router.get('/', goods.getGoods)
router.post('/', goods.addGoods)
router.post('/updateStatus/:id', goods.updateStatus)
router.post('/:id', goods.changeGoods)

module.exports = router