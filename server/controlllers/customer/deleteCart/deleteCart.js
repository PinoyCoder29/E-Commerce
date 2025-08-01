const removeCartModel = require('../../../models/CustomerModel/deleteCartModel/DeleteCartModel')

const deleteCartController = async (req, res) => {
  const { cartId } = req.params;
  const customerId = req.user.id; // assuming token is decoded and stored here via middleware
 
  try {
    const result = await removeCartModel(cartId, customerId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to remove item from cart' });
  }
};

module.exports = deleteCartController;
