const conn = require('../../../config/database')

const createOrder = (order) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO orders SET ?';
    conn.query(sql, order, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createOrderItems = (items) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, price) VALUES ?';
    const values = items.map(item => [
      item.order_id, item.product_id, item.product_name, item.product_image, item.quantity, item.price
    ]);

    conn.query(sql, [values], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const updateOrderStatuses = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE orders
      SET status = CASE
        WHEN status = 'Pending' AND TIMESTAMPDIFF(DAY, created_at, NOW()) >= 1 THEN 'To Receive'
        WHEN status = 'To Receive' AND TIMESTAMPDIFF(DAY, created_at, NOW()) >= 3 THEN 'To Review'
        ELSE status
      END
      WHERE status IN ('Pending', 'To Receive');
    `;
    conn.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { createOrder, createOrderItems, updateOrderStatuses };
