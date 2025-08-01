const conn = require('../../../config/database')

const productDeleteModel = (productId) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM products WHERE productId = ?`;
    conn.query(sql, [productId], (err, results) => {
      if (err) {
        console.error("MYSQL ERROR:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
}

module.exports = productDeleteModel;