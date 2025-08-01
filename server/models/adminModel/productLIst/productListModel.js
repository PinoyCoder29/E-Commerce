const conn = require('../../../config/database');
const productListModel = () =>{
    return new Promise((resolve,reject) =>{
    const sql = `SELECT * FROM products`
    conn.query(sql,(err, results) => {
        if(err){
            reject(err);
        } else {
            resolve(results);
        }       
    });
  });
}
module.exports = productListModel;
   