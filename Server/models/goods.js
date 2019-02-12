const query = require('../utils/query')
class GoodsModel {
    async getGoods (request) {
        const {name,categoryId,status,page,limit} = request
        let sql =  `
                SELECT goods.id,goods.name,goods.imgUrl,goods.saleStock,
                goods.marketPrice,goods.salePrice,goods.totalStock,
                goods.status,goods.categoryId,
                goods.createTime,goods.updateTime,
                category.name AS categoryName  FROM goods 
                INNER JOIN category 
                ON goods.categoryId = category.id
                WHERE goods.name LIKE "%${name}%" 
                And category.status =1
                AND IF(${categoryId}=0,goods.categoryId!=0,goods.categoryId = "${categoryId}")
                AND IF(${status}=0,goods.status!=0,goods.status = "${status}")
                Order By goods.updateTime Desc LIMIT ${(page-1)*limit},${limit}`
        const list = await query(sql)
        return list
    }
    async getGoodsLen (request) {
        const {name,categoryId,status,page,limit} = request
        let sql = `
            SELECT count(*) AS num FROM goods 
                INNER JOIN category 
                ON goods.categoryId = category.id
                WHERE goods.name LIKE "%${name}%" 
                And category.status =1
                AND IF(${categoryId}=0,goods.categoryId!=0,goods.categoryId = "${categoryId}")
                AND IF(${status}=0,goods.status!=0,goods.status = "${status}")`
        const count = await query(sql)
        return count
    }
    async addGoods (request) {
        const {name,categoryId,imgUrl,marketPrice,salePrice,totalStock} = request
        const sql =`INSERT INTO 
        goods(name,categoryId,imgUrl,marketPrice,salePrice,totalStock,saleStock,status) 
        VALUES("${name}","${categoryId}","${imgUrl}","${marketPrice}","${salePrice}","${totalStock}",0,1)`
        return await query(sql)
    }
    async updateGoodsStatus (id, status) {
        return await query(`UPDATE goods SET status="${status}" WHERE id="${id}"`)
    }
    async changeGoods (id,parmas) {
        const {name, categoryId, imgUrl, marketPrice, salePrice, totalStock, status} = parmas
        return await query(`
        UPDATE goods SET name = "${name}",categoryId = "${categoryId}",
        imgUrl = "${imgUrl}",totalStock = "${totalStock}",
        marketPrice = "${marketPrice}",salePrice = "${salePrice}",
        status="${status}"  WHERE id="${id}"`)
    }
}
module.exports = new GoodsModel()