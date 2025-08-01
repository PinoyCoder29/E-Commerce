const productListModel = require('../../../models/adminModel/productLIst/productListModel');

const ProductList = async (req, res) => {
  try {
    const products = await productListModel();

    res.json(products); // return all products
  } catch (err) {
    console.error('Error fetching product list:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = ProductList;
