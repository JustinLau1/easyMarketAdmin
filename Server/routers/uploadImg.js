const Router = require('koa-router')
const config = require('../config')

const upLoadImg = require('../controllers/upLoadImg')

const api = 'uploadImg'

const router = new Router()

router.prefix(`/${config.baseApi}/${api}`)

router.post('/', upLoadImg.upload)

module.exports = router