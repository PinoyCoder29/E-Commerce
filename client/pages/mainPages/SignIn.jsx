import React from 'react'
import { useState } from 'react'
import axios from 'axios' 
import { toast, ToastContainer } from 'react-toastify'
import {useNavigate } from 'react-router-dom'
const SignIn = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSignInSubmit = async (e) =>{
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/api/customer/CustomerSignIn',{
                email,
                password,
            })
            if(response.status === 200){
                setTimeout(() => {
                toast.success(response.data.message)
                
                navigate('')
                }, 3000);
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
        <section className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-6">
                    <article className="card">
                        <h1 className='text-primary text-center'>Sign In</h1>
                        <div className="card-body">

                            <form action="" onSubmit={handleSignInSubmit}>
                                <div className='mb-2'>
                                    <label htmlFor="">Email</label>
                                    <input
                                     type="email"
                                      className='form-control shadow'
                                      placeholder='example@gmail.com'
                                      required
                                      onChange={(e) => setEmail(e.target.value)}
                                      value={email}
                                      />
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="">Password</label>
                                    <input 
                                    type='password'
                                    className='form-control shadow'
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder='Password'
                                     />
                                </div>
                                <div className='text-center mt-3'>
                                <button type='submit' className='btn btn-primary px-5'>Submit</button>

                                </div>
 
                            </form>

                        </div>
                    </article>
                </div>
            </div>
        </section>
        <ToastContainer/>
    </main>

    </div>
  )
}

export default SignIn
