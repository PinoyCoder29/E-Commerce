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
import Verify_NewPassword from '../pages/authPages/Verify_NewPassword'
import CustomerLayout from '../layout/Customerlayout/CustomerLayout'
import HomePage from '../pages/CustomerPages/Home/HomePage'
import ProductDetail from '../pages/CustomerPages/ProductDetails/ProductDetail'
import Cart from '../pages/Cart/Cart'
import OrderPending from '../pages/OrderPending/OrderPending'
import Order from '../pages/Order/Order'
import OrderToReceive from '../pages/OrderPending/OrderToReceive'
import OrderReceived from '../pages/OrderPending/OrderReceived'
import OrderReview from '../pages/OrderPending/OrderReview'


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

      <Route path='/CustomerLayout' element={<CustomerLayout/>} >
       <Route index element={<HomePage/>} /> 
       <Route path='HomePage' element={<HomePage/>} />
       <Route path='ProductDetail/:productId' element={<ProductDetail/>}/>
       <Route path='cart' element={<Cart/>} />

        <Route path='Order' element={<Order/>}>
        <Route index element={<OrderPending/>}/>
        <Route path='OrderPending' element={<OrderPending/>} />
        <Route path='Order_ToReceive' element={<OrderToReceive/>} />
        <Route path='Order_Received' element={<OrderReceived/>} />
        <Route path='Order_Review' element={<OrderReview/>} />
        </Route>    
        
      </Route>

     
      
    </Routes>
  )
}

export default App
