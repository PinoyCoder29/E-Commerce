const conn = require('../../../config/database');

const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM orders ORDER BY created_at DESC", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

const getItemsByOrderId = (orderId) => {
  return new Promise((resolve, reject) => {
    conn.query("SELECT * FROM order_items WHERE order_id = ?", [orderId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  getAllOrders,
  getItemsByOrderId
};
