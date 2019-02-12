const query = require('../utils/query')
class loginModel {
    // 判断是否存在该账户信息
    async getIsHasAcount (request) {
        const {user, pwd} = request
        let sql =  `SELECT * FROM user WHERE userAcount = "${user}" And password = "${pwd}"`
        const list = await query(sql)
        return list
    }
    // 登录成功更新登录sessionId
    async updateSessionId (request) {
        const {user, pwd, sessionId} = request
        return await query(`
        UPDATE user SET sessionId="${sessionId}"  WHERE userAcount = "${user}" And password = "${pwd}"`)
    }
    // 获取当前登录用户的sessionId
    async getExitSessionId (request) {
        const {user, pwd, sessionId} = request
        let sql =  `SELECT * FROM user WHERE userAcount = "${user}" And password = "${pwd}" And sessionId = "${sessionId}"`
        const list = await query(sql)
        return list
    }
}
module.exports = new loginModel()