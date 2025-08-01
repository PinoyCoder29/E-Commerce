import React from 'react'
import { NavLink } from 'react-router-dom'

const navLinkStyle = ({ isActive }) => ({
  backgroundColor: isActive ? '#0d6efd' : 'transparent', // Blue background if active
  borderRadius: '8px',
  padding: '10px 15px',
  display: 'block',
  fontWeight: isActive ? 'bold' : 'normal',
  color: isActive ? 'white' : '#adb5bd',
  textDecoration: 'none',
  transition: 'all 0.2s ease'
})

const AdminHeader = () => {
  return (
    <div>
      <main className='p-3 shadow bg-dark text-white' style={{ height: '96vh', position: 'fixed' }}>
        <div className='d-flex flex-column justify-content-between h-100'>

          <div>
            <h5 className='mb-4 text-warning'><b>E-Commerce</b></h5>

            <div className='mb-2'>
              <NavLink to='/AdminLayout/DashBoard' style={navLinkStyle}>
                <i className="bi bi-house mx-2"></i>Dashboard
              </NavLink>
            </div>

            <div className='mb-2'>
              <NavLink to='/AdminLayout/Product' style={navLinkStyle}>
                <i className="bi bi-box mx-2"></i>Product
              </NavLink>
            </div>

            <div className='mb-2'>
              <NavLink to='/AdminLayout/ProductList' style={navLinkStyle}>
                <i className="bi bi-box mx-2"></i>Product List
              </NavLink>
            </div>

            <div className='mb-2'>
              <NavLink to='Order' style={navLinkStyle}>
                <i className="bi bi-bag mx-2"></i>Order
              </NavLink>
            </div>

            <div className='mb-2'>
              <NavLink to='/AdminLayout/CustomerList' style={navLinkStyle}>
                <i className="bi bi-people mx-2"></i>Customer
              </NavLink>
            </div>

            <div className='mb-2'>
              <NavLink to='/Messages' style={navLinkStyle}>
                <i className="bi bi-chat-dots mx-2"></i>Messages
              </NavLink>
            </div>

            <div className='mb-2'>
              <NavLink to='/Discounts' style={navLinkStyle}>
                <i className="bi bi-percent mx-2"></i>Discounts
              </NavLink>
            </div>

            <div className='mb-2'>
              <NavLink to='/Categories' style={navLinkStyle}>
                <i className="bi bi-tags mx-2"></i>Categories & Brands
              </NavLink>
            </div>
          </div>

          <div>
            <div className='mb-2'>
              <NavLink to='/Settings' style={navLinkStyle}>
                <i className="bi bi-gear mx-2"></i>Settings
              </NavLink>
            </div>

            <div>
              <NavLink to='/Logout' style={navLinkStyle}>
                <i className="bi bi-box-arrow-right mx-2"></i>Logout
              </NavLink>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default AdminHeader
