const productListModel = require('../../../models/CustomerModel/productListModel/productListModel')
const productList = async (req,res) => {
   try {
    const product = await productListModel()
    res.json(product)

   } catch (error) {
     console.error('Error fetching product list:', error);
    res.status(500).json({ message: 'Server error' });
   }
}
module.exports = productList