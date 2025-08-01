import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    category: '',
    gender: '',
    sku: '',
    stocks: '',
    price: '',
    discount: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedSizes([...selectedSizes, value]);
    } else {
      setSelectedSizes(selectedSizes.filter((size) => size !== value));
    }
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedColors([...selectedColors, value]);
    } else {
      setSelectedColors(selectedColors.filter((color) => color !== value));
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage || !formData.productName || !formData.brand || !formData.category) {
      return toast.error('Please fill in all required fields and upload an image.');
    }

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('brand', formData.brand);
    data.append('category', formData.category);
    data.append('gender', formData.gender);
    data.append('sku', formData.sku);
    data.append('stocks', formData.stocks);
    data.append('price', formData.price);
    data.append('discount', formData.discount);
    data.append('description', formData.description);
    data.append('image', selectedImage);
    data.append('sizes', JSON.stringify(selectedSizes));
    data.append('colors', JSON.stringify(selectedColors));

    try {
      const response = await axios.post('http://localhost:5000/api/admin/new_product', data,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });
      if(response.status === 200){
        toast.success(response.data.message);
      }
      // Optional: reset form
    } catch (err) {
      console.error(err);
     if(err.response && err.response.status === 400) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <main className='p-4'>
        <div className='container'>
          <h3 className='mb-4'>Add New Product</h3>
          <form encType='multipart/form-data' onSubmit={(e) => e.preventDefault()}>
            <div className='row'>
              <div className='col-md-6'>
                <h5>Basic Information</h5>
                <label>Product Name</label>
                <input type='text' className='form-control shadow' name='productName' value={formData.productName} onChange={handleChange} />

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Brand</label>
                    <input type='text' className='form-control shadow' name='brand' value={formData.brand} onChange={handleChange} />
                  </div>
                  <div className='col-md-6'>
                    <label>Category</label>
                    <select className='form-select shadow' name='category' value={formData.category} onChange={handleChange}>
                      <option hidden>Select Category</option>
                      <option>Men's Shoes</option>
                      <option>Women's Shoes</option>
                      <option>Kid's Shoes</option>
                    </select>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Gender</label>
                    <select className='form-select shadow' name='gender' value={formData.gender} onChange={handleChange}>
                      <option hidden>Select Gender</option>
                      <option>Men's</option>
                      <option>Women's</option>
                      <option>Unisex</option>
                    </select>
                  </div>
                  <div className='col-md-6'>
                    <label>SKU</label>
                    <input type='text' className='form-control shadow' name='sku' value={formData.sku} onChange={handleChange} />
                  </div>
                </div>

                <div className='mt-4'>
                  <h5>Available Sizes</h5>
                  <div className='d-flex flex-wrap gap-3'>
                    {['5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '10', '11', '12'].map((size) => (
                      <div key={size} className='form-check'>
                        <input className='form-check-input' type='checkbox' value={size} id={`size-${size}`} checked={selectedSizes.includes(size)} onChange={handleSizeChange} />
                        <label className='form-check-label' htmlFor={`size-${size}`}>{size}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mt-4'>
                  <h5>Available Colors</h5>
                  <div className='d-flex flex-wrap gap-3'>
                    {['Red', 'Blue', 'Black', 'White', 'Gray', 'Green', 'Yellow', 'Pink'].map((color) => (
                      <div key={color} className='form-check d-flex align-items-center'>
                        <input className='form-check-input me-1' type='checkbox' value={color} id={`color-${color}`} checked={selectedColors.includes(color)} onChange={handleColorChange} />
                        <label className='form-check-label d-flex align-items-center' htmlFor={`color-${color}`}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: color.toLowerCase(), border: '1px solid #ccc', borderRadius: '50%', marginRight: '8px' }}></div>
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='mt-3'>
                  <h5>Inventory & Pricing</h5>
                  <label>Stocks</label>
                  <input type='number' className='form-control shadow' name='stocks' value={formData.stocks} onChange={handleChange} />
                </div>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <label>Price</label>
                    <input type='number' className='form-control shadow' name='price' value={formData.price} onChange={handleChange} />
                  </div>
                  <div className='col-md-6'>
                    <label>Discount (%)</label>
                    <input type='number' className='form-control shadow' name='discount' value={formData.discount} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className='col-md-6'>
                <h5>Product Image</h5>
                <input type='file' className='form-control shadow' name='image' accept='image/*' onChange={handleImageChange} />

                <div className='mt-3'>
                  {selectedImage && (
                    <img src={URL.createObjectURL(selectedImage)} alt='preview' style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #ccc' }} />
                  )}
                </div>

                <div className='mt-3'>
                  <label>Product Description</label>
                  <textarea className='form-control shadow' name='description' rows='5' value={formData.description} onChange={handleChange}></textarea>
                </div>

                <div className='mt-4 d-flex justify-content-end'>
                  <button type='button' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer theme='dark' />
      </main>
    </div>
  );
};

export default Product;
