import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const CustomerHeader = ({ setSearchQuery }) => {
  const [input, setInput] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [hasOrders, setHasOrders] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(input);
  };

  useEffect(() => {
    const fetchCartAndOrders = async () => {
      try {
        // ✅ Fetch cart (customer identified by token)
        const cartRes = await axios.get('http://localhost:5000/api/customer/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cartItems = cartRes.data || [];
        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQuantity);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }

      try {
        // ✅ Fetch orders (customer identified by token)
        const ordersRes = await axios.get('http://localhost:5000/api/customer/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (ordersRes.data && ordersRes.data.length > 0) {
          setHasOrders(true);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    if (token) {
      fetchCartAndOrders();
    }
  }, [token]);

  return (
    <nav className='navbar navbar-expand-md bg-dark m-1 navbar-dark' style={{ borderRadius: '100px' }}>
      <div className='container d-flex flex-wrap justify-content-between align-items-center'>

        {/* Logo */}
        <h1 className='navbar-brand text-warning logo-title m-0'>E-Commerce</h1>

        {/* Nav links */}
        <div className='mx-auto'>
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <NavLink to='/CustomerLayout/HomePage' className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/CustomerLayout/Order' className="nav-link">
                Orders
                {hasOrders && (
                  <span className="badge bg-success ms-1">●</span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Search bar */}
        <form className="d-flex mx-4" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-warning" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Cart / Profile / Logout */}
        <div className='d-flex align-items-center gap-3 position-relative'>
          <NavLink to="/CustomerLayout/cart" className="nav-link p-0 position-relative">
            <i className="bi bi-cart text-white fs-4"></i>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </NavLink>

          <ul className='navbar-nav d-flex flex-row gap-2'>
            <li className="nav-item">
              <NavLink to='/profile' className="nav-link">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/logout' className="nav-link text-danger">Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomerHeader;
