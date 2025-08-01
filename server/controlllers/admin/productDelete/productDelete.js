const productDeleteModel = require('../../../models/adminModel/productDelete/productDeleteModel');

const productDelete = async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await productDeleteModel(productId); // This deletes the product

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Product deleted successfully',
      success: true,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({
      message: 'Server error',
      success: false,
    });
  }
};

module.exports = productDelete;
