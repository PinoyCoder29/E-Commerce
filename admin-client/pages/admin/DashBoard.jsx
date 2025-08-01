import axios from 'axios';
import React, {useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line,Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const DashBoard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts,setTotalProducts] = useState(0)
  const [totalOrders,setTotalOrders] =  useState(0)
  const [totalStocks,setTotalStocks] = useState(0)
   const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [pieData,setPieData] = useState({
    labels: [],
    datasets: []
  })
 
useEffect(() =>{
  const fetchMostSale = async () =>{
    try {
      const response = await axios.get('http://localhost:5000/api/admin/MostSale',{
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token') 
        }
      })
       const product_id = response.data.map(item => item.product_id);
       const product_name = response.data.map(item => item.product_name)
       const quantity = response.data.map(item => item.total_sale)

       setPieData({
        labels: product_name,
        datasets: [
          {
            data: quantity,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
            ],

            product_ids: product_id
          }
        ]

       })
    } catch (error) {
      console.error('Error fetching most sale data:', error);
    }
  }
  fetchMostSale()
},[])
const doughnutOptions = {

  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Top Selling Products'
    }
  }
};


 /*chart */
 useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/totalRevenue',{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }); // adjust if needed
        const months = res.data.map(item => item.month);
        const totals = res.data.map(item => item.total);

        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Total Revenue',
              data: totals,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.3
            }
          ]
        });
      } catch (error) {
        console.error('Failed to fetch revenue data:', error);
      }
    };

    fetchRevenue();
  }, []);

  


  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Revenue'
      },
      legend: {
        position: 'top'
      }
    }
  };


    const fetchtotalCustomer = async () =>{
    try {
      const response = await axios.get('http://localhost:5000/api/admin/dashboard',{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });
      setTotalCustomers(response.data.totalCustomers);
    } catch (error) {
      console.error('Error fetching total customers:', error);
      toast.error('Failed to fetch total customers');
      
    }
    }

    const fetchTotalProducts = async () =>{
      try {
        const response = await axios.get('http://localhost:5000/api/admin/totalproducts',{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        setTotalProducts(response.data.totalProduct)
      } catch (error) {
        console.error('Error fetching total customers:', error);
      toast.error('Failed to fetch total products');
      
      }
    }

    const fetchtotalOrders = async () =>{
     try {
      const response = await axios.get('http://localhost:5000/api/admin/totalOrders',{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      setTotalOrders(response.data.totalOrders)
     } catch (error) {
      console.error('error fetching total Orders',error)
     }
    }

    const fetchTotalStocks = async  () =>{
      try {
        const response = await axios.get('http://localhost:5000/api/admin/totalStocks',{
          headers:{
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        setTotalStocks(response.data.totalStocks)
      } catch (error) {
        
      }
    }

  useEffect(() =>{
    fetchtotalCustomer()
    fetchTotalProducts()
    fetchtotalOrders()
    fetchTotalStocks()
  },[])
  return (
    <div>
      {/* Top Navbar */}
      <nav className='navbar navbar-expand-md'>
        <div className='container d-flex justify-content-between'>
          <h1 className='navbar-brand m-0'>Dashboard</h1>

          <div className='d-flex align-items-center gap-3'>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                className='form-control'
                placeholder='Search...'
              />
            </div>

            <div>
              <i className="bi bi-bell-fill fs-4"></i>
            </div>
          </div>
        </div>
      </nav>

      <section className='p-3'>
        <div className='row'>

          {/* Total Customers */}
          <div className='col-md-3 col-sm-6 mb-3'>
            <div className='bg-white shadow p-3 rounded'>
              <div className='d-flex align-items-center gap-3'>
                <div
                  style={{
                    backgroundColor: '#40b9e9',
                    padding: '8px',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-people-fill fs-5"></i>
                </div>
                <div>
                  <h4 className='mb-0'>{totalCustomers}</h4>
                  <small className='text-muted'>Total Customers</small>
                </div>
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className='col-md-3 col-sm-6 mb-3 '>
            <div className='bg-white shadow p-3 rounded'>
              <div className='d-flex align-items-center gap-3'>
                <div
                  style={{
                    backgroundColor: '#6f42c1',
                    padding: '8px',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-box-fill fs-5"></i>
                </div>
                <div>
                  <h4 className='mb-0'>{totalProducts}</h4>
                  <small className='text-muted'>Total Products</small>
                </div>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className='col-md-3 col-sm-6 mb-3'>
            <div className='bg-white shadow p-3 rounded'>
              <div className='d-flex align-items-center gap-3 '>
                <div
                  style={{
                    backgroundColor: '#fd7e14',
                    padding: '8px',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-bag-fill fs-5"></i>
                </div>
                <div>
                  <h4 className='mb-0'>{totalOrders}</h4>
                  <small className='text-muted'>Total Orders</small>
                </div>
              </div>
            </div>
          </div>

          {/* Total Stocks */}
          <div className='col-md-3 col-sm-6 mb-3'>
            <div className='bg-white shadow p-3 rounded'>
              <div className='d-flex gap-3 align-items-center'>
                <div
                  style={{
                    backgroundColor: '#198754',
                    padding: '8px',
                    borderRadius: '6px',
                    color: 'white'
                  }}
                >
                  <i className="bi bi-box-seam fs-5"></i>
                </div>
                <div>
                  <h4 className='mb-0'>{totalStocks}</h4>
                  <small className='text-muted'>Total Stocks</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/*total revenue*/}
     <section>
  <div className='row p-3'>
    <div className='col-md-8'>
      {/* Main Content will go here */}
      <div className='p-3 border bg-light' style={{height:'420px'}}>
        <h1>Sales Report</h1>
        <Line options={options}data={chartData} />
      </div>
    </div>
    <div className='col-md-4'>
      {/* Sidebar or Extra Content */}
      <div className='p-2  bg-light ' style={{height:'420px'}}>
        <h3 className='text-dark'>Most Sale</h3>
        {pieData.labels.length > 0 ? (
        <Doughnut data={pieData}  options={doughnutOptions}/>
      ) : (
        <p>Loading chart...</p>
      )}

      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default DashBoard
