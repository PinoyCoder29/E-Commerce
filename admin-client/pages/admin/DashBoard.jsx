import axios from 'axios';
import React, {useState,useEffect } from 'react'
import { toast } from 'react-toastify';

const DashBoard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchtotalCustomer = async () =>{
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });
      setTotalCustomers(response.data.totalCustomers);
    } catch (error) {
      console.error('Error fetching total customers:', error);
      toast.error('Failed to fetch total customers');
      
    }
    }
    fetchtotalCustomer()
  },[])
  return (
    <div>
      {/* Top Navbar */}
      <nav className='navbar navbar-expand-md'>
        <div className='container d-flex justify-content-between'>
          <h1 className='navbar-brand m-0'>Dashboard</h1>

          <div className='d-flex align-items-center gap-3'>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                className='form-control'
                placeholder='Search...'
              />
            </div>

            <div>
              <i className="bi bi-bell-fill fs-4"></i>
            </div>
          </div>
        </div>
      </nav>

      <section className='p-3'>
        <div className='row'>

          {/* Total Customers */}
          <div className='col-md-3 col-sm-6 mb-3'>
            <div className='bg-white shadow p-3 rounded'>
              <div className='d-flex align-items-center gap-3'>
                <div
                  style={{
                    backgroundColor: '#40b9e9',
                    padding: '8px',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-people-fill fs-5"></i>
                </div>
                <div>
                  <h4 className='mb-0'>{totalCustomers}</h4>
                  <small className='text-muted'>Total Customers</small>
                </div>
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className='col-md-3 col-sm-6 mb-3 '>
            <div className='bg-white shadow p-3 rounded'>
              <div className='d-flex align-items-center gap-3'>
                <div
                  style={{
                    backgroundColor: '#6f42c1',
                    padding: '8px',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-box-fill fs-5"></i>
                </div>
                <div>
                  <h4 className='mb-0'>350+</h4>
                  <small className='text-muted'>Total Products</small>
                </div>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className='col-md-3 col-sm-6 mb-3'>
            <div className='bg-white shadow p-3 rounded'>
              <div className='d-flex align-items-center gap-3 '>
                <div
                  style={{
                    backgroundColor: '#fd7e14',
                    padding: '8px',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-bag-fill fs-5"></i>
                </div>
                <div>
                  <h4 className='mb-0'>95</h4>
                  <small className='text-muted'>Total Orders</small>
                </div>
              </div>
            </div>
          </div>

          {/* Total Stocks */}
          <div className='col-md-3 col-sm-6 mb-3'>
            <div className='bg-white shadow p-3 rounded'>
              <div className='d-flex gap-3 align-items-center'>
                <div
                  style={{
                    backgroundColor: '#198754',
                    padding: '8px',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-box-seam fs-5"></i>
                </div>
                <div>
                  <h4 className='mb-0'>800</h4>
                  <small className='text-muted'>Total Stocks</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default DashBoard
