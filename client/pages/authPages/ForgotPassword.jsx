import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
  
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/api/customer/verifyEmailPassword', {
        email,
      })

      if (response.status === 200) { 
          toast.success(response.data.message)

        setTimeout(() => {
        navigate(`VerifyOtp_ForgotPassword?email=${encodeURIComponent(email)}`)
        },2000);
        
      } 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  return (
    <main className="p-5">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <article className="card shadow-sm">
              <form onSubmit={handleForgotPasswordSubmit}>
                <div className="card-header">
                  <h3>Find your account</h3>
                </div>

                <div className="card-body">
                  <p>Please enter your email or mobile number to search for your account.</p>

                  <div className="mt-3">
                    <input
                      type="email"
                      className="form-control shadow"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-end gap-3">
                  <button type="button" className="btn btn-secondary"  onClick={() =>navigate(-1)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Submit
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
      <ToastContainer theme='dark'/>
    </main>
  )
}

export default ForgotPassword
