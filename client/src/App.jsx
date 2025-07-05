import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/'element={<MainLayout/>} >
        <Route/>
      </Route>
    </Routes>

    </>
  )
}

export default App
