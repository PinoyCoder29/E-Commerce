const productDetailModel = require('../../../models/CustomerModel/productDetailModel/productDetailModel')
const productDetails = async (req,res) =>{
    const productId = req.params.productId

    try {
        const product = await productDetailModel(productId)
        if (!product) {
      return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product)
    } catch (error) {
         console.error('Error getting product by ID:', error);
    res.status(500).json({ message: 'Server error' });
    }
}

module.exports = productDetails