const Router = require('koa-router')
const config = require('../config')
const {getList, cateGoryIsNum} = require('../verify/category')
const category = require('../controllers/category')

const api = 'category'

const router = new Router()

router.prefix(`/${config.baseApi}/${api}`)

router.get('/' , getList, category.getCategory)
router.post('/' , cateGoryIsNum,category.addCategory)
router.post('/:id' , cateGoryIsNum, category.changeCategory)

module.exports = router