const conn = require('../../../config/database')
const cartModel = () =>{
    return new Promise((resolve,reject) =>{
        const sql = `SELECT * FROM cart`;
        conn.query(sql,(err,results) =>{
          if(err){
            reject(err)
          }else{
            resolve(results)
          }
        })
    })
}

const getCartByCustomerId = (customerId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM cart WHERE customer_id = ?';
    conn.query(sql, [customerId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

const updateCartQuantityModel = (cartId, customerId, quantity) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE cart SET quantity = ? WHERE id = ? AND customer_id = ?';
    conn.query(sql, [quantity, cartId, customerId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
module.exports = {
  cartModel,getCartByCustomerId,updateCartQuantityModel
} 