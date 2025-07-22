import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/auth/SignIn.jsx'
import VerifyOtp from '../pages/auth/VerifyOtp.jsx'
import MainLayout from '../layout/MainLayout.jsx'
import AdminLayout from '../layout/AdminLayout.jsx'
import DashBoard from '../pages/admin/DashBoard.jsx'
import Product from '../pages/admin/Product.jsx'
import Order from '../pages/admin/Order.jsx'

const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/' element={<MainLayout/>} >
     <Route index element={<Home/>}/>
     <Route path='SignIn' element={<SignIn/>}/>
     <Route path='Verify_Otp' element={<VerifyOtp/>} />
    </Route>

    <Route path='/AdminLayout' element={<AdminLayout/>}>
    <Route index element={<DashBoard/>} />
    <Route path='DashBoard' element={<DashBoard/>} />
    <Route path='Product' element={<Product/>} />
    <Route path='Order' element={<Order/>}/>
    </Route>
    
     </Routes>

    </div>
  )
}

export default App
