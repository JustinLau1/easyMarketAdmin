const login = require('../models/login')
class LoginController {
    async userLoginIn (ctx){
        const {user, pwd} = ctx.request.body
        const data = await login.getIsHasAcount({user, pwd})
        if(data.length){
            const sessionId = Math.random().toString(36).substr(2)
            await login.updateSessionId({user, pwd, sessionId})
            ctx.session = {
                user_id: sessionId,
                user: user,
                pwd: pwd
            }
            ctx.body = {
                success:true,
                message:'已登录',
                data:{
                    token: sessionId,
                    name: data[0].chineseName,
                    uuid: data[0].id
                },
                code:'success'
            }
        }else{
            ctx.body = {
                success:true,
                message:'账户或者密码错误，请重新输入！',
                data:null,
                code:'noLogin'
            }
        }
        // ctx.body = ctx.session.user_id
    }
    async userIsLogin (ctx){
        ctx.body = ctx.session
    }
}
module.exports = new LoginController()