const conn = require('../../../config/database');

const insertToCart = (customerId, productId, color, size, quantity, image,price,product_name) => {
  return new Promise((resolve, reject) => {
    const checkQuery = `
      SELECT quantity FROM cart 
      WHERE customer_id = ? AND product_id = ? AND color = ? AND size = ?
    `;

    conn.query(checkQuery, [customerId, productId, color, size], (err, results) => {
      if (err) return reject(err);

      if (results.length > 0) {
        // Update quantity (image usually stays the same)
        const newQuantity = results[0].quantity + parseInt(quantity);
        const updateQuery = `
          UPDATE cart 
          SET quantity = ? 
          WHERE customer_id = ? AND product_id = ? AND color = ? AND size = ? AND price = ?
        `;
        conn.query(updateQuery, [newQuantity, customerId, productId, color, size,price], (err, updateResult) => {
          if (err) return reject(err);
          resolve(updateResult);
        });
      } else {
        // Insert new with image
        const insertQuery = `
          INSERT INTO cart (customer_id, product_id, color, size, quantity, image,price,product_name)
          VALUES (?, ?, ?, ?, ?, ?,?,?)
        `;
        conn.query(insertQuery, [customerId, productId, color, size, quantity, image,price,product_name], (err, insertResult) => {
          if (err) return reject(err);
          resolve(insertResult);
        });
      }
    });
  });
};

module.exports = insertToCart;
