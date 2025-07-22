const getTotalCustomersModel = require('../../../models/adminModel/dashBoard/dashboardModel')
const getTotalCustomers = async (req, res) => {
  try {
    const totalCustomers = await getTotalCustomersModel();
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

module.exports = getTotalCustomers;