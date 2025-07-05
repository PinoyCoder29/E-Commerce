import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      
     <nav className='navbar navbar-expand-md navbar-light bg-light shadow'>
      <div className='container d-flex justify-content-between'>

        <h1 className='navbar-brand'>E-Commerce</h1>
       
       <ul className="navbar navbar-nav mx-auto">
        <li className="nav-item">
            <Link className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link">About</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link">Contact</Link>
        </li>
       </ul>

      </div>

    </nav>

    </div>
  )
}

export default Header
