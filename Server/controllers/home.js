const home = require('../models/home')
class homeController {
     async getHomeMsg(ctx){
        try {
            let result = {
                success:true,
                message:'',
                data:null,
                code:'success'
            }
            const data = await home.getHomeMsg()
            ctx.body = {...result, data: data[0]}
        }catch (e) {
            ctx.body = e
        }
    }
    async addHomeMsg (ctx) {
        const {bannerImgList, goodsWareList} = ctx.request.body
        try {
            const data = await home.changeHomeMsg(bannerImgList, goodsWareList)
            ctx.body = {...result, data}
        }catch (e) {
            ctx.body = e
        }
    }
}
module.exports = new homeController()