import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/customer/productDetails/${productId}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );

        const data = response.data;
        if (typeof data.colors === 'string') {
          data.colors = JSON.parse(data.colors);
        }
        if (typeof data.sizes === 'string') {
          data.sizes = JSON.parse(data.sizes);
        }

        setProductDetail(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/customer/addToCart',
        {
          productId: productDetail.productId,
          color: selectedColor,
          size: selectedSize,
          quantity,
          image: productDetail.images,
          price: productDetail.price,
          product_name: productDetail.productName
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
     toast.success('Product Added to your Cart!')
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart.');
    }
  };

  const increaseQuantity = () => {
    if (quantity < productDetail.stocks) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!productDetail) {
    return <div className="p-5 text-center">Loading product details...</div>;
  }

  return (
    <div>
      <main className="m-3">
        <div className="row shadow" style={{background: '#bbe9e9ff'}}>
          {/* Left - Image */}
          <div className="col-md-6 mb-4 mt-4">
            <div className="card shadow-sm">
              <div
                className="card-body d-flex justify-content-center align-items-center"
                style={{ background: '#c4e28bff', height: '450px' }}
              >
                <img
                  src={productDetail.images}
                  alt={productDetail.productName}
                  className="img-fluid rounded shadow"
                  style={{
                    maxHeight: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right - Details */}
          <div className="col-md-6">
            <div className="mb-4">
              <h2><b>{productDetail.productName}</b></h2>
            </div>
            <div className="mb-4">
              <h6>Product Description</h6>
              <p>{productDetail.description}</p>
            </div>

            <div className="mb-3">
              <h1><b>₱{productDetail.price}</b></h1>
            </div>

            {/* Stock Info */}
            <div className="mb-3">
              <span className="badge bg-info text-dark p-2">
                Available Stock: {productDetail.stocks}
              </span>
            </div>

            {/* Colors */}
            <div className="mb-3">
              <h6>Available Colors</h6>
              <div className="d-flex flex-wrap gap-2">
                {productDetail.colors?.map((color, index) => (
                  <span
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`badge rounded-pill ${
                      selectedColor === color ? 'border border-dark' : ''
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      color: ['white', 'yellow', 'lightgray'].includes(color.toLowerCase())
                        ? 'black'
                        : 'white',
                      padding: '10px 15px',
                      fontSize: '14px',
                      border: selectedColor === color ? '2px solid black' : '1px solid #ccc',
                      cursor: 'pointer',
                    }}
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-3">
              <h6>Available Sizes</h6>
              <div className="d-flex flex-wrap gap-2">
                {productDetail.sizes?.map((size, index) => (
                  <span
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`badge rounded-pill ${
                      selectedSize === size ? 'bg-dark text-white' : 'bg-secondary'
                    }`}
                    style={{
                      padding: '10px 15px',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="mb-4">
              <h6>Quantity</h6>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                {/* Quantity Controls */}
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-outline-secondary text-dark px-4" onClick={decreaseQuantity}>-</button>
                  <span>{quantity}</span>
                  <button className="btn btn-outline-secondary bg-dark px-4 text-white" onClick={increaseQuantity}>+</button>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={handleAddToCart}
                    disabled={
                      !selectedColor || !selectedSize || quantity > productDetail.stocks || productDetail.stocks === 0
                    }
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => alert('Proceed to buy (not implemented)')}
                    disabled={
                      !selectedColor || !selectedSize || quantity > productDetail.stocks || productDetail.stocks === 0
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer theme='dark'/>
      </main>
    </div>
  );
};

export default ProductDetail;
