const query = require('../utils/query')
class CategoryModel {
    async getCategory (parmas){
        const {name,code,status,limit,page} = parmas
        if(limit==''||page=='' || page==undefined || limit == undefined){
            let sql = `SELECT * FROM category 
            WHERE name LIKE "%${name}%" 
            AND code LIKE "%${code}%" 
            AND IF (${status}=0,status!=0,status = "${status}")
            Order By updateTime 
            `
            let sql2 = `SELECT count(*) AS num FROM category 
            WHERE name LIKE "%${name}%" 
            AND code LIKE "%${code}%" 
            AND IF (${status}=0,status!=0,status = "${status}")
            Order By updateTime
            `
            const data = await query(sql)
            const totalCount = (await query(sql2))[0].num
            return {data,totalCount}
        }else{
            let sql = `SELECT * FROM category 
            WHERE name LIKE "%${name}%" 
            AND code LIKE "%${code}%" 
            AND IF (${status}=0,status!=0,status = "${status}")
            Order By updateTime 
            Desc LIMIT ${(page-1)*limit},${limit}
            `
            let sql2 = `SELECT count(*) AS num FROM category 
            WHERE name LIKE "%${name}%" 
            AND code LIKE "%${code}%" 
            AND IF (${status}=0,status!=0,status = "${status}")
            Order By updateTime
            `
            const data = await query(sql)
            const totalCount = (await query(sql2))[0].num
            return {data,totalCount}
        }
    }
    async addCateGory (name, code) {
        return await query(`INSERT INTO category(name,code,status) VALUES("${name}","${code}",1)`)
    }
    async changeCategory (name, code, id, status) {
        return await query(`UPDATE category SET name="${name}", code="${code}", status="${status}" WHERE id="${id}"`)
    }
}
module.exports = new CategoryModel()