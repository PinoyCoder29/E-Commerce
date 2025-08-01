import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Order = () => {
  return (
    <div className='p-5'>
      <div className='container'>

        {/* Grid-based nav buttons */}
        <div className='row g-3 justify-content-center mb-4'>
          <div className='col-6 col-md-3'>
            <NavLink
              to='OrderPending'
              className={({ isActive }) =>
                `d-block text-center fs-5 fw-semibold px-4 py-2 rounded-pill ${
                  isActive ? 'bg-dark text-white' : 'bg-light text-dark'
                } shadow-sm`
              }
            >
              Pending
            </NavLink>
          </div>
          <div className='col-6 col-md-3'>
            <NavLink
              to='Order_ToReceive'
              className={({ isActive }) =>
                `d-block text-center fs-5 fw-semibold px-4 py-2 rounded-pill ${
                  isActive ? 'bg-dark text-white' : 'bg-light text-dark'
                } shadow-sm`
              }
            >
              To Receive
            </NavLink>
          </div>
          <div className='col-6 col-md-3'>
            <NavLink
              to='Order_Received'
              className={({ isActive }) =>
                `d-block text-center fs-5 fw-semibold px-4 py-2 rounded-pill ${
                  isActive ? 'bg-dark text-white' : 'bg-light text-dark'
                } shadow-sm`
              }
            >
              Received
            </NavLink>
          </div>
          <div className='col-6 col-md-3'>
            <NavLink
              to='Order_Review'
              className={({ isActive }) =>
                `d-block text-center fs-5 fw-semibold px-4 py-2 rounded-pill ${
                  isActive ? 'bg-dark text-white' : 'bg-light text-dark'
                } shadow-sm`
              }
            >
              To Review
            </NavLink>
          </div>
        </div>

        {/* Display child route component here */}
        <div className='mt-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Order;
