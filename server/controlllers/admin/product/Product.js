const ProductModel = require('../../../models/adminModel/product/productModel');

const AddProducts = async (req, res) => {
  try {
    const {
      productName,
      brand,
      category,
      gender,
      sku,
      sizes,
      colors,
      stocks,
      price,
      discount,
      description
    } = req.body;

    const imageUrl = req.file ? req.file.path : null; // Assuming you're using multer for file uploads
    if (!imageUrl) {
      return res.status(400).json({ 
        message: 'Image is required',
        success: false
      });   
    }

    // Validate required fields

    if (
      !productName || !brand || !category || !gender || !sku || !sizes ||
      !colors || !stocks || !price || !discount || !imageUrl || !description
    ) {
      return res.status(400).json({
        message: 'All fields are required!',
        success: false,
      });
    }

    const existingProduct = await ProductModel.FindProductBySKU(sku);
    if (existingProduct) {
      return res.status(400).json({
        message: 'SKU already exists!',
        success: false
      });
    }
    const newProduct = {
      productName,
      brand,
      category,
      gender,
      sku,
      sizes: JSON.stringify(sizes),
      colors: JSON.stringify(colors),
      stocks,
      price,
      discount,
      images: imageUrl,
      description
    };

    const product = await ProductModel.InsertProductModel(newProduct);
    console.log("Returned product object:", JSON.stringify(product, null, 2));

    return res.status(200).json({
      message: 'Product added successfully',
      success: true,
      product: product
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'Server error',
      success: false,
    });
  }
};

module.exports = AddProducts;
