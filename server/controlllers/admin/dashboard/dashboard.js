const dashBoardModel = require('../../../models/adminModel/dashBoard/dashboardModel')
const getTotalCustomers = async (req, res) => {
  try {
    const totalCustomers = await dashBoardModel.getTotalCustomer()
    res.status(200).json({
      message: 'Total customers fetched successfully',
      totalCustomers: totalCustomers.totalCustomers,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching total customers',
      error: error.message,
      success: false
    });
  }
}

const totalProducts = async (req,res) =>{
  
  try {
    const result = await dashBoardModel.getAllProduct()
    res.json({totalProduct: result[0].total})
  } catch (error) {
    console.error('error counting products',error)
    res.status(400).json({message: 'error counting products'})
  }
}

const totalOrders = async (req,res) =>{
  try {
    const result = await dashBoardModel.getTotalOrders()
    res.json({totalOrders: result[0].total})
  } catch (error) {
     console.error('error fetching total orders')
     res.status(400).json({message:'error fetching total orders'})
  }
}

const totalStocks = async (req,res) =>{
  try {
    const results = await dashBoardModel.getTotalStocks()
    res.json({totalStocks: results[0].total})
  } catch (error) {
    console.error('error fetching all total stocks')
    res.status(400).json({
      message: 'error fetching total stocks'
    })
  }
}

const totalRevenue = async (req,res) =>{
  try {
    const revenue = await dashBoardModel.getTotalRevenue()
    res.json(revenue)
  } catch (error) {
     console.error('Error fetching revenue:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const MostSale = async  (req,res) =>{
  try {
    const sale = await dashBoardModel.getMostSales()
    res.json(sale)
  } catch (error) {
    console.error('error fetching all most sales')
    res.status(400).json({error: 'server error'})
  }
}
module.exports = {getTotalCustomers,totalProducts,totalOrders,totalStocks,totalRevenue,MostSale}