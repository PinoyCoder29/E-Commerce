 const conn = require('../../../config/database');

const getOrdersWithItemsByStatus = (customerId, status) => {
  return new Promise((resolve, reject) => {
    const orderSql = `
      SELECT * FROM orders 
      WHERE customer_id = ? AND status = ?
      ORDER BY created_at DESC
    `;

    conn.query(orderSql, [customerId, status], (err, orders) => {
      if (err) return reject(err);

      // If no orders, return empty array
      if (orders.length === 0) return resolve([]);

      // Get all order IDs
      const orderIds = orders.map(o => o.id);

      // Fetch all items with matching order_ids
      const itemSql = `
        SELECT * FROM order_items WHERE order_id IN (?)
      `;

      conn.query(itemSql, [orderIds], (err, items) => {
        if (err) return reject(err);

        // Attach items to their corresponding orders
        const ordersWithItems = orders.map(order => {
          const orderItems = items.filter(item => item.order_id === order.id);
          return { ...order, items: orderItems };
        });

        resolve(ordersWithItems);
      });
    });
  });
};

module.exports = { getOrdersWithItemsByStatus };
