import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import SignUp from '../pages/mainPages/SignUp'
import VerifyOtp from '../pages/mainPages/VerifyOtp'
import SignIn from '../pages/mainPages/SignIn'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/'element={<MainLayout/>} >
        <Route path='/SignUp' element={<SignUp/>} />
        <Route path='/VerifyOtp' element={<VerifyOtp/>} />
       <Route path='/SignIn' element={<SignIn/>} />
      </Route>
    </Routes>

    </>
  )
}

export default App
