const goods = require('../models/goods')
const category = require('../models/category')
class Goods {
     async getGoods(ctx){
         try {
             const parmas = ctx.query
             const data = await goods.getGoods(parmas)
             const totalCount = await goods.getGoodsLen(parmas)
             ctx.body = {
                 success: true,
                 message:'',
                 data:{
                     data,
                     totalCount:totalCount[0].num
                 },
                 code:'success'
             }
         }catch (e) {
             ctx.body = e
         }
     }
     async addGoods (ctx) {
         let result = {
             success:true,
             message:'',
             data:null,
             code:'success'
         }
         try {
             const request = ctx.request.body
             await goods.addGoods(request)
             ctx.body = result
         }catch (e) {
             ctx.body = e
         }
     }
     async updateStatus (ctx) {
         let result = {
             success:true,
             message:'',
             data:null,
             code:'success'
         }
         try {
             const {status} = ctx.request.body
             const id = ctx.params.id
             await goods.updateGoodsStatus(id, status)
             ctx.body = result
         }catch (e) {
             ctx.body = e
         }
     }
     async changeGoods (ctx) {
         let result = {
             success:true,
             message:'',
             data:null,
             code:'success'
         }
         try {
             const parmas = ctx.request.body
             const id = ctx.params.id
             await goods.changeGoods(id, parmas)
             ctx.body = result
         }catch (e) {
             ctx.body = e
         }
     }
}
module.exports = new Goods()