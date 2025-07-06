import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import SignUp from '../pages/mainPages/SIgnUp'


const App = () => {
  return (
    <>
    <Routes>
      <Route path='/'element={<MainLayout/>} >
        <Route path='/SignUp' element={<SignUp/>} />
      </Route>
    </Routes>

    </>
  )
}

export default App
