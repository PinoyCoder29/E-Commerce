import React from 'react'
import { Link } from 'react-router-dom'

const MainHeader = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-md-6 bg-dark'>
        <div className='container'>
            <h1 className='navbar-brand text-warning '>E-Commerce</h1>
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link text-light" to='SignIn'>Sign In</Link>
                        
                    </li>
                </ul>
            </div>
        </div>
      </nav>
    </div>
  )
}

export default MainHeader
