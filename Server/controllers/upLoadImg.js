const { uploadFile } = require('../utils/upload')
const path = require('path')
class UpLoadImg {
    async upload(ctx){
        let serverFilePath = path.join( __dirname, '../webApp' )
        // 上传文件事件
        const result = await uploadFile( ctx, {
            fileType: 'upload',
            path: serverFilePath
        })
        ctx.body = result
    }
}
module.exports = new UpLoadImg()