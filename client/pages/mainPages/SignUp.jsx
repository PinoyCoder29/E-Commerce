import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/api/customer/verifyEmail', formData)

      if (response.status === 200 && response.data.success) {
        
        toast.success(response.data.message)
        setTimeout(() => {
          navigate(`/verifyOtp?email=${encodeURIComponent(formData.email)}`)
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Something went wrong.",error)
      }
    }
  }

  return (
    <main className="p-4 bg-dark">
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <article className="card">
              <header className="text-center p-3">
                <h1 className="card-title ">Sign Up</h1>
              </header>
              <div className="card-body">
                <form onSubmit={handleSignUpSubmit}>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="form-control shadow"
                        placeholder="First Name"
                        required
                      />
                    </div>

                    <div className="col-6 mb-3">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control shadow"
                        placeholder="Last Name"
                        required
                      />
                    </div>

                    <div className='mb-2'>
                      <label>Birthdate</label>
                      <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className='form-control shadow'
                        required
                      />
                    </div>

                    <div className='mb-3'>
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className='form-control shadow'
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className='mb-3'>
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='form-control shadow'
                        placeholder='example@gmail.com'
                        required
                      />
                    </div>

                    <div className='mb-3'>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className='form-control shadow'
                        placeholder='Password'
                        required
                      />
                    </div>

                    <div className='text-center'>
                      <button type="submit" className='btn btn-warning px-5 shadow'>Submit</button>
                    </div>

                    <div className='text-center mt-2'>
                      <Link className='nav-link'to='/SignIn'>You have an account?<span className='text-primary'> Sign In</span></Link>
                    </div>
                  </div>
                </form>
              </div>
            </article>
          </div>
        </div>
      </section>
     <ToastContainer theme='dark'/>

    </main>
  )
}

export default SignUp
