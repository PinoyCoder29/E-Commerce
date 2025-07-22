import React, { useState } from 'react'

const Product = () => {
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    const imagesArray = files.map((file) => URL.createObjectURL(file))
    setSelectedImages(imagesArray)
  }

  const handleColorChange = (e) => {
    const value = e.target.value
    if (e.target.checked) {
      setSelectedColors([...selectedColors, value])
    } else {
      setSelectedColors(selectedColors.filter((color) => color !== value))
    }
  }

  const handleSizeChange = (e) => {
    const value = e.target.value
    if (e.target.checked) {
      setSelectedSizes([...selectedSizes, value])
    } else {
      setSelectedSizes(selectedSizes.filter((size) => size !== value))
    }
  }

  return (
    <div>
      <main className='p-4'>
        <div className='container'>
          <h3 className='mb-4'>Add New Product</h3>

          <form>
            <div className='mb-3'>
              <div className='row'>

                {/* Basic Info and Variants */}
                <div className='col-md-6'>
                  <h5>Basic Information</h5>

                  <div>
                    <label htmlFor="productName">Product Name</label>
                    <input 
                      type="text" 
                      className='form-control shadow'
                      placeholder='Enter product name'
                      id='productName'
                    />
                  </div>

                  <div className='row'>
                    <div className='col-md-6'>
                      <label htmlFor="brand">Brand</label>
                      <input 
                        type="text" 
                        className='form-control shadow'
                        placeholder='Enter brand name'
                        id='brand'
                      />
                    </div>

                    <div className='col-md-6'>
                      <label htmlFor="category">Category</label>
                      <select className='form-select shadow' id='category'>
                        <option hidden>Select Category</option>
                        <option>Men's Shoes</option>
                        <option>Women's Shoes</option>
                        <option>Kid's Shoes</option>
                      </select>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-6'>
                      <label htmlFor="gender">Gender</label>
                      <select className='form-select shadow' id='gender'>
                        <option hidden>Select Gender</option>
                        <option>Men's</option>
                        <option>Women's</option>
                        <option>Unisex</option>
                      </select>
                    </div>
                    <div className='col-md-6'>
                      <label htmlFor="sku">SKU</label>
                      <input 
                        type="text"
                        className='form-control shadow'
                        placeholder='e.g. SHOE-00123'
                        id='sku'
                      />
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className='mt-4'>
                    <h5>Variants</h5>
                    <label className='form-label'>Available Sizes</label>
                    <div className='d-flex flex-wrap gap-3'>
                      {['5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '10', '11', '12'].map((size) => (
                        <div key={size} className='form-check'>
                          <input
                            className='form-check-input'
                            type='checkbox'
                            value={size}
                            id={`size-${size}`}
                            onChange={handleSizeChange}
                          />
                          <label className='form-check-label' htmlFor={`size-${size}`}>
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className='mt-4'>
                    <label className='form-label'>Available Colors</label>
                    <div className='d-flex flex-wrap gap-3'>
                      {['Red', 'Blue', 'Black', 'White', 'Gray', 'Green', 'Yellow', 'Pink'].map((color) => (
                        <div key={color} className='form-check d-flex align-items-center'>
                          <input
                            className='form-check-input me-1'
                            type='checkbox'
                            value={color}
                            id={`color-${color}`}
                            onChange={handleColorChange}
                          />
                          <label className='form-check-label d-flex align-items-center' htmlFor={`color-${color}`}>
                            <div
                              style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: color.toLowerCase(),
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                marginRight: '8px',
                              }}
                            ></div>
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Moved Stocks, Price, Discount here */}
                 
                  <div className='mt-2'>
                     <h5>Inventory & Pricing</h5>
                    <label htmlFor='stock'>Stocks</label>
                    <input 
                      type='number' 
                      className='form-control shadow' 
                      id='stock' 
                      placeholder='Enter available stock' 
                    />
                  </div>

                  <div className='row mt-3'>
                    <div className='col-md-6'>
                      <label htmlFor='price'>Price</label>
                      <input 
                        type='number' 
                        className='form-control shadow' 
                        id='price' 
                        placeholder='Enter product price' 
                      />
                    </div>
                    <div className='col-md-6'>
                      <label htmlFor='discount'>Discount</label>
                      <input 
                        type='number' 
                        className='form-control shadow' 
                        id='discount' 
                        placeholder='Enter discount percentage' 
                      />
                    </div>
                  </div>
                </div>

                {/* Product Images */}
                <div className='col-md-6'>
                  <h5>Product Images</h5>
                  <input 
                    type='file' 
                    className='form-control shadow' 
                    multiple 
                    accept='image/*' 
                    onChange={handleImageChange} 
                  />

                  {/* Preview Images */}
                  <div className='mt-3 d-flex flex-wrap gap-3 mb-3'>
                    {selectedImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`preview-${index}`}
                        style={{
                          width: '300px',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          border: '1px solid #ccc',
                        }}
                      />
                    ))}
                  </div>

                  <div>
                    <label htmlFor='description'>Product Description</label>
                    <textarea
                      className='form-control shadow'
                      id='description'
                      rows='5'
                      placeholder='Enter product description...'
                    ></textarea>
                  </div>

                  <div className='mt-4 d-flex justify-content-end'>
                    <button className='btn btn-primary'>Add Product</button>

                  </div>
                </div>
                
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Product
