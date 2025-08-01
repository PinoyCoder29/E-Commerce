const { getOrdersWithItemsByStatus } = require('../../../models/CustomerModel/orderModel/getOrderModel')

const getOrdersByStatus = async (req, res) => {
  const customerId = req.user.id;
  const status = req.params.status;

  try {
    const orders = await getOrdersWithItemsByStatus(customerId, status);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get orders with items' });
  }
};

module.exports = { getOrdersByStatus };
