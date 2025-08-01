const CartModel = require('../../../models/CustomerModel/cartModel/cartModel')
const cart = async (req,res) =>{

    try {
        const productCart = await CartModel.cartModel()

        res.json(productCart)
    } catch (error) {
         console.error('Error fetching product list:', error);
    res.status(500).json({ message: 'Server error' });
    }
}

const getCart = async (req,res) =>{
    const customerId = req.user.id;
     try {
    const cartItems = await CartModel.getCartByCustomerId(customerId);
    res.json(cartItems);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
const updateCartQuantityController = async (req, res) => {
  const { cartId } = req.params;
  const { quantity } = req.body;
  const customerId = req.user.id; // galing sa token

  try {
    const result = await CartModel.updateCartQuantityModel(cartId, customerId, quantity);
    res.json({ message: 'Quantity updated', result });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to update quantity' });
  }
};

module.exports = {
    cart, getCart,updateCartQuantityController
}