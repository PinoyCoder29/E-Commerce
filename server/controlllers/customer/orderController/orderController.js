const { createOrder, createOrderItems } = require('../../../models/CustomerModel/orderModel/orderModel');
const { v4: uuidv4 } = require('uuid');
const conn = require('../../../config/database');

const placeOrder = async (req, res) => {
  const customerId = req.user.id;
  const { items, total_price } = req.body;
  const orderId = uuidv4();

  try {
    // 1. Insert order
    await createOrder({ id: orderId, customer_id: customerId, total_price });

    // 2. Insert order items
    const orderItems = items.map(item => ({
      order_id: orderId,
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.product_image,
      quantity: item.quantity,
      price: item.price,
    }));
    await createOrderItems(orderItems);

    // 3. Update product stock
    for (const item of items) {
      await new Promise((resolve, reject) => {
        conn.query(
          'UPDATE products SET stocks = stocks - ? WHERE productId = ? AND stocks >= ?',
          [item.quantity, item.product_id, item.quantity],
          (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows === 0) {
              return reject(new Error(`Insufficient stock for "${item.product_name}"`));
            }
            resolve();
          }
        );
      });
    }

    // 4. Clear cart after successful order
    await new Promise((resolve, reject) => {
      conn.query(
        'DELETE FROM cart WHERE customer_id = ?',
        [customerId],
        (err, result) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    // 5. Respond success
    res.json({ message: 'Order placed successfully', orderId });

  } catch (error) {
    console.error('Order Error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to place order' });
  }
};

module.exports = { placeOrder };
