const conn = require('../../../config/database');

const InsertProductModel = (product) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO products SET ?`;
    conn.query(sql, product, (err, results) => {
      if (err) {
        console.error("MYSQL ERROR:", err);
        return reject(err);
      }
      resolve({ ...product, productId: results.insertId });
    });
  });
};

const FindProductBySKU = (sku) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM products WHERE sku = ?`;
    conn.query(sql, [sku], (err, results) => {
      if (err) {
        console.error("MYSQL ERROR:", err);
        return reject(err);
      }
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

module.exports = {
  InsertProductModel,
  FindProductBySKU, // ✅ ito ang kulang
};
