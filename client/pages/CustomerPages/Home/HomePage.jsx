import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { searchQuery } = useOutletContext(); // 🔍 Get search input from CustomerLayout

  const fetchProductList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customer/product_list', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setProduct(response.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === 'Session expired. Please log in again.'
      ) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/'), 1500);
      } else {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products.');
      }
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const goToDetails = (productId) => {
    navigate(`/CustomerLayout/ProductDetail/${productId}`);
  };

  // 🔍 Filter products based on search input
  const filteredProducts = product.filter((p) =>
    p.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      <h3 className='mb-3'>All Products</h3>
      <div className="row g-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((products) => (
            <div
              className="col-6 col-sm-4 col-md-3 col-lg-2"
              key={products.productId}
              onClick={() => goToDetails(products.productId)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="card h-100 shadow-sm"
                style={{
                  border: '1px solid #eee',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div className="card-img-top" style={{ height: '120px', overflow: 'hidden' }}>
                  <img
                    src={products.images}
                    alt={products.productName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div className="card-body p-2" style={{ fontSize: '0.85rem' }}>
                  <div
                    style={{
                      height: '38px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: '1.2',
                      fontWeight: '500',
                    }}
                  >
                    {products.description}
                  </div>

                  <div className="text-muted mt-1" style={{ fontSize: '0.75rem' }}>
                    Stock:{" "}
                    <span className={products.stocks === 0 ? 'text-danger' : ''}>
                      {products.stocks === 0 ? 'Out of stock' : products.stocks}
                    </span>
                  </div>

                  <div className="text-danger fw-bold mt-1" style={{ fontSize: '0.95rem' }}>
                    ₱{products.price}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
