import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
const VerifyOtp = () => {
  const location = useLocation()
  const email = new URLSearchParams(location.search).get('email')
  const [otp,setOtp] = useState('')
  const navigate = useNavigate()
  const handleVerifySubmit = async (e) =>{
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/api/admin/verify_otp',{
        email,
        otp
      })
      if(response.status === 200){
        toast.success(response.data.message)
        setOtp('')
        localStorage.setItem('token', response.data.token) // Assuming the token is returned in the response
       navigate('/AdminLayout/DashBoard')
      }
    } catch (error) {
      if(error.response.status === 400 ){
        toast.error(error.response.data.message)
      }
    }
  }
  return (
    <div>
      
     <main className="p-5">
        <section className="container">
            <div className='row d-flex justify-content-center'>
              <div className='col-md-6'>
                <article className='card'>
                  <div className='card-header'>
                   <h4 className='card-title'>Enter security code</h4>
                  </div>
                   <form action="" onSubmit={handleVerifySubmit}>
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
                         <p>We sent your code to: <strong className=''>{email}</strong></p>
                      </div>
                    </div>
                  </div>

                    <div className="card-footer d-flex justify-content-end gap-3" >
                    <button className="btn btn-secondary" type='button' onClick={() => navigate(-1)}>Cancel</button>
                      <button type='submit' className="btn btn-primary">Submit</button>
                    </div>
                  </form>
                </article>
              </div>
            </div>
        </section>
        <ToastContainer theme='dark'/>
     </main>

    </div>
  )
}

export default VerifyOtp

     
