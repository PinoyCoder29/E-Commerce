import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light shadow">
      <div className="container">

        <Link className="navbar-brand" to="/">E-Commerce</Link>

        {/* Mobile Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="btn btn-success me-2" to="/signup">Get started</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">Sign In</Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Header
