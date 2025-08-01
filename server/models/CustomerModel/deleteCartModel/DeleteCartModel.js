const conn = require('../../../config/database');

const removeCartModel = (cartId, customerId) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM cart WHERE id = ? AND customer_id = ?`;

    conn.query(sql, [cartId, customerId], (err, result) => {
      if (err) return reject(err);

      if (result.affectedRows === 0) {
        return reject({ message: 'Item not found or not owned by customer' });
      }

      resolve({ message: 'Cart item removed successfully' });
    });
  });
};

module.exports = removeCartModel;
