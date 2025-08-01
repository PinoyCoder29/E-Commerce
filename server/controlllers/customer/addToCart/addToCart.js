const insertToCart = require('../../../models/CustomerModel/addToCartModel/addToCartModel');

const addToCartController = async (req, res) => {
  const { productId, color, size, quantity, image, price, product_name } = req.body;
  const customerId = req.user.id;

  if (!productId || !color || !size || !quantity || !image || !price || !product_name) {
    return res.status(400).json({ message: 'All fields are required including product_name and image' });
  }

  try {
    await insertToCart(customerId, productId, color, size, quantity, image, price, product_name);
    res.status(200).json({ message: 'Added to cart successfully' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = addToCartController;
