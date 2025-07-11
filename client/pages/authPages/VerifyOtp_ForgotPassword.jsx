import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
const VerifyOtp_ForgotPassword = () => {
  const location = useLocation()
  const email = new URLSearchParams(location.search).get('email')
  const navigate = useNavigate()
  const [otp,setOtp] = useState('');

  const handleVerifyOtpForgotPasswordSubmit = async (e) =>{
    e.preventDefault()
    
    try {
      const response = await axios.post('http://localhost:5000/api/customer/verifyOtp_forgotPassword',{
        email,
        otp
      })
      if(response.status === 200){
        toast.success(response.data.message)
        setTimeout(() => {
        navigate(`/ForgotPassword/Verify_NewPassword?email=${encodeURIComponent(email)}`)
                  
        }, 2000);

      }
    } catch (error) {
      if(error.response.status === 400){
        toast.error(error.response.data.message)
      }
    }
  }
  return (
    <div>
      
      <main className="p-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <article className="card">
                <div className="card-header">
                 <h4>Enter security code</h4>
                </div>
                <form action="" onSubmit={handleVerifyOtpForgotPasswordSubmit}>
                <div className='card-body'>
                  <p>Please check your email for a message with your code. Your code is 6 numbers long.</p>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <input 
                      type="text"
                      placeholder='Enter code'
                      className='form-control shadow p-3'
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                       />
                    </div>
                    <div className="col-md-6">
                      <p>We sent your code to: <b>{email}</b></p>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className='d-flex justify-content-end gap-3'>
                    <button className='btn btn-secondary' type='button' onClick={() => navigate(-1)}>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                  </div>
                </div>
                </form>
              </article>
            </div>
          </div>
        </div>
        <ToastContainer theme='dark'/>
      </main>
      

    </div>
  )
}

export default VerifyOtp_ForgotPassword
