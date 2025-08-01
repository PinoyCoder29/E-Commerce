const conn = require('../../config/database')
const mainModel = () =>{
    return new Promise((resolve,reject) =>{
        const sql = `SELECT 
        product_name,product_image,product_id,price,
        SUM(quantity) AS popularProduct
        FROM order_items
        GROUP BY product_name,product_image,product_id,price
        ORDER BY popularProduct
        LIMIT 3
        `
        conn.query(sql,(err,results) =>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}
module.exports = mainModel