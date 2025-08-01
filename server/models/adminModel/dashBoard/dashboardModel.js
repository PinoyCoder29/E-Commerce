const conn = require('../../../config/database')

const getTotalCustomer = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 
                    (SELECT COUNT(*) FROM adminlogin) AS totalAdmins,
                    (SELECT COUNT(*) FROM customerlogin) AS totalCustomers`;
        conn.query(sql, (err, results) => {
        if (err) {
            reject(err);
        } else {
            resolve(results[0]);
        }
        });
    });
}
const getAllProduct = () =>{
 return new Promise((resolve,reject) =>{
    const sql = `SELECT COUNT(*) AS total FROM products`
    conn.query(sql,(err,results) =>{
        if(err){
            reject(err)
        }else{
            resolve(results)
        }
    })
 })
}

const getTotalOrders = () =>{
    return new Promise((resolve,reject) =>{
        const sql = `SELECT sum(quantity) AS total FROM order_items`
        conn.query(sql,(err,results) =>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}
const getTotalStocks =  () =>{
    return new Promise((resolve,reject) =>{
        const sql = `SELECT SUM(stocks) AS total FROM products`
        conn.query(sql,(err,results) =>{
            if(err){
                reject(err)
            }else{
                resolve(results)
            }
        })
    })
}

const getTotalRevenue = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
            DATE_FORMAT(created_at, '%Y-%m') AS month,
            SUM(total_price) AS total
            FROM 
            orders
            GROUP BY 
            DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY 
            month;

        `;

        conn.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getMostSales = () =>{
    return new Promise((resolve,reject) =>{
        const sql = `
        SELECT product_id,product_name,
        SUM(quantity) AS total_sale 
        FROM order_items
        GROUP BY product_id,product_name
        ORDER BY total_sale DESC
        limit 5
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

module.exports = {getTotalCustomer,getAllProduct,getTotalOrders,getTotalStocks,getTotalRevenue,getMostSales};