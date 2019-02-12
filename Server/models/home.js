const query = require('../utils/query')
class HomeModel {
    async changeHomeMsg (bannerImgList, goodsWareList) {
        return await query(`
        UPDATE home SET bannerImgList = "${bannerImgList}",goodsWareList = "${goodsWareList}"  WHERE id="${1}"`)
    }
    async getHomeMsg () {
        return await query(`SELECT bannerImgList,goodsWareList FROM home  WHERE id="${1}"`)
    }
}
module.exports = new HomeModel()