import React from 'react'
import AdminHeader from '../components/AdminHeader'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <div className='row'>
        <div className='col-md-2'>
      <AdminHeader/>
        </div>
        <div className='col-md-10' style={{backgroundColor: 'lightgray'}}>
      <Outlet/>

        </div>
      </div>
    </div>
  )
}

export default AdminLayout
