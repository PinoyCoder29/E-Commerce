import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Sign_Up from '../pages/mainPages/Sign_Up'           // make sure "I" is lowercase
import VerifyOtp from '../pages/mainPages/VerifyOtp'
import SignIn from '../pages/mainPages/SignIn'
import Home from '../pages/mainPages/Home'
import About from '../pages/mainPages/About'
import AuthLayout from '../layout/authLayout/AuthLayout'
import ForgotPassword from '../pages/authPages/ForgotPassword'
import VerifyOtp_ForgotPassword from '../pages/authPages/VerifyOtp_ForgotPassword'
import Verify_NewPassword from '../pages/authPages/verify_NewPassword'

const App = () => {
  return (
    <Routes>
      {/* Main layout with nav */}
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='signup' element={<Sign_Up />} />
        <Route path='verifyOtp' element={<VerifyOtp />} />
        <Route path='signin' element={<SignIn />} />
      </Route>

      {/* Auth layout without main nav */}
      <Route path='/ForgotPassword' element={<AuthLayout />}>
        <Route index element={<ForgotPassword />} />
        <Route path='VerifyOtp_ForgotPassword' element={<VerifyOtp_ForgotPassword/>} />
        <Route path='Verify_NewPassword' element={<Verify_NewPassword/>}/>
      </Route>
    </Routes>
  )
}

export default App
