const cron = require('node-cron');
const conn = require('../config/database');
const {updateOrderStatuses} = require('../models/CustomerModel/orderModel/orderModel')
const updateOrderStatusesCron = () => {
  cron.schedule('* * * * *', () => {
    console.log('Running cron to update order statuses...');

    const sql = `
      UPDATE orders
      SET status = 
        CASE 
          WHEN DATEDIFF(NOW(), created_at) >= 3 THEN 'Completed'
          WHEN DATEDIFF(NOW(), created_at) = 2 THEN 'To Review'
          WHEN DATEDIFF(NOW(), created_at) = 1 THEN 'To Receive'
          ELSE status
        END
      WHERE status IN ('Pending', 'To Receive', 'To Review')
    `;

    conn.query(sql, (err, result) => {
      if (err) {
        console.error('Error updating order statuses:', err);
      } else {
        console.log('Order statuses updated:', result.affectedRows);
      }
    });
  });
};

module.exports = updateOrderStatusesCron;
