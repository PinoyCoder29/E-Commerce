const conn = require('../../../config/database');
const getProductDetailModel = (productId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM products WHERE productId = ?';
    conn.query(sql, [productId], (err, result) => {
      if (err) {
        return reject(err);
      }
      if (result.length === 0) {
        return resolve(null); // Product not found
      }
      resolve(result[0]);
    });
  });
};

module.exports = getProductDetailModel;
