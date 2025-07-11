import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const closeMenu = () => {
    const navbar = document.getElementById('main-navbar');
    if (navbar && navbar.classList.contains('show')) {
      new window.bootstrap.Collapse(navbar).hide();
    }

  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand text-warning" to="/" onClick={closeMenu}>E-Commerce</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About" onClick={closeMenu}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeMenu}>Contact</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="btn btn-warning me-2" to="/signup" onClick={closeMenu}>Get started</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/SignIn" onClick={closeMenu}>Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
