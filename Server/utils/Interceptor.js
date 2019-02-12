const login = require('../models/login')
// 拦截器
const noInterUrl = [
    '/api/v1/login',
    '/api/v1/home'
]
const Interceptor = async function(ctx,next)  {
    const url = ctx.request.url.split('?')[0]
    if(('user_id' in ctx.session)){
        const {user_id:sessionId,user,pwd} = ctx.session
        const list = await login.getExitSessionId({sessionId,user,pwd})
        if(list.length==0 && !noInterUrl.includes(url)){
            ctx.body = {
                "success": false,
                "message": "您再其他电脑登录，请重新登录",
                "data": null,
                "code": "no-login"
            }
        }else{
            await next()
        }
    }else{
        if (noInterUrl.includes(url)) {
            await next()
        }else{
            ctx.body = {
                "success": false,
                "message": "登录已过期！重新登录！",
                "data": null,
                "code": "no-login"
            }
        }
    }
}
module.exports = Interceptor