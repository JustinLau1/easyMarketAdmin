function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "")
}
class CategoryVerify {
    async getList (ctx,next) {
        const {name,code,status,limit,page} = ctx.query
        let result = {
            success:false,
            message:'',
            data:null,
            code:'success'
        }
        if(typeof name === 'undefined'){
            ctx.body = {...result,message:'name字段必填！'}
        }else if(typeof code === 'undefined'){
            ctx.body = {...result,message:'code字段必填！'}
        }else if(typeof status === 'undefined'){
            ctx.body = {...result,message:'status字段必填！'}
        }else{
            await next()
        }
    }
    async cateGoryIsNum(ctx,next) {
        let result = {
            success: false,
            message: '',
            data: null,
            code: 'success'
        }
        const {name, code} = ctx.request.body
        if (typeof name === 'undefined') {
            ctx.body = {...result, message: 'name字段必填！'}
        } else if (typeof code === 'undefined') {
            ctx.body = {...result, message: 'code字段必填！'}
        } else if (trim(name) === '') {
            ctx.body = {...result, message: 'name字段不能为空！'}
        } else if (trim(code) === '') {
            ctx.body = {...result, message: 'code字段不能为空！'}
        } else {
            await next()
        }
    }
}
module.exports = new CategoryVerify()