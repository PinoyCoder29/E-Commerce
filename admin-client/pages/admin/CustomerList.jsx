import axios from 'axios'
import React from 'react'
import { use } from 'react'
import { useState,useEffect} from 'react'

const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    const fetchCustomerList = async () =>{
        try {
            const response = await axios.get('http://localhost:5000/api/admin/customer_list', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })  
            setCustomers(response.data) 
        } catch (error) {
            console.error('Error fetching customer list:', error)
            toast.error('Failed to fetch customer list')
        }
    }
 useEffect(() => {
    fetchCustomerList()
}, [])
  return (
    <div>
       
       <div className='p-3'>
            <h2 className='text-center'>Customer Management</h2>

            <div className='table-responsive mt-2'>
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FistName</th>
                            <th>LastName</th>      
                            <th>Birthdate</th>
                            <th>Gender</th>
                            <th>Email</th>
                           
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                          <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{new Date(customer.birthdate).toLocaleDateString()}</td>
                            <td>{customer.gender}</td>
                            <td>{customer.email}</td>
                        </tr> 
                        ))}
                        
                        
                    </tbody>
               </table>

            </div>
       </div>


    </div>
  )
}

export default CustomerList
 


