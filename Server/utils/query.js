const mysql = require('mysql')
const fs = require('fs')
const path = require('path')
const {database} = require('../config')
let pool
const sqlSource = fs.readFileSync(path.resolve(__dirname, '..', './sql/fastShop.sql'), 'utf-8')
const init = mysql.createConnection(database)
init.connect()
init.query('CREATE DATABASE bolo', err => {
    Object.assign(database, database.DATABASE)
    pool = mysql.createPool({
        host     :  database.HOST,
        user     : database.USERNAME,
        password : database.PASSWORD,
        database : database.DATABASE
    })
    if (err) {
        console.log('✅  FastShop Database created already.')
    }
    else {
        console.log('✅  Create FastShop Database')
        query(sqlSource).then(res => console.log('✅  Import sql file'))
    }
})
init.end()

module.exports = function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            }
            else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}
