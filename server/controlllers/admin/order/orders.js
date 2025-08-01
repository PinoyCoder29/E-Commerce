const order = require('../../../models/adminModel/orders/orders');

const getAllOrdersWithItems = async (req, res) => {
  try {
    const orders = await order.getAllOrders();

    const ordersWithItems = await Promise.all(
      orders.map(async (ord) => {
        const items = await order.getItemsByOrderId(ord.id); // ✅ FIXED HERE
        return {
          ...ord,
          items
        };
      })
    );

    res.json(ordersWithItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

module.exports = {
  getAllOrdersWithItems
};
