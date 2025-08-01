import React from 'react'
import { Link } from 'react-router-dom'

const MainHeader = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-md bg-dark'>
        <div className='container d-flex justify-content-between'>
            <h1 className='navbar-brand text-warning '>E-Commerce</h1>
            
               <ul className=' navbar-nav mx-auto'>
                 <li className="nav-item">
                        <Link className="nav-link text-light" to='Home'>Home</Link> 
                    </li>
               </ul>

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item ms-auto">
                        <Link className="nav-link text-light" to='SignIn'>Sign In</Link>
                        
                    </li>
                </ul>
            
        </div>
      </nav>
    </div>
  )
}

export default MainHeader
