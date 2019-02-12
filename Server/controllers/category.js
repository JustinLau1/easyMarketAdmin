const category = require('../models/category')
class CategoryControllers {
    async getCategory(ctx){
        let result = {
            success:true,
            message:'',
            data:null,
            code:'success'
        }
        try {
            const {name,code,status} = ctx.query
            const data = await category.getCategory(ctx.query)
            ctx.body = {
                success:true,
                message:'',
                data:data,
                code:'success'
            }
        }catch (e) {
            console.log(e)
            ctx.body = e
        }
    }
    async addCategory (ctx) {
        let result = {
            success:true,
            message:'',
            data:null,
            code:'success'
        }
        try {
            const {name, code} = ctx.request.body
            await category.addCateGory(name, code)
            ctx.body = result
        }catch (e) {
            ctx.body = e
        }
    }
    async changeCategory (ctx) {
        let result = {
            success:true,
            message:'',
            data:null,
            code:'success'
        }
        try {
            const {name, code, status} = ctx.request.body
            const id = ctx.params.id
            await category.changeCategory(name, code, id, status)
            ctx.body = result
        }catch (e) {
            ctx.body = e
        }
    }
}
module.exports = new CategoryControllers()