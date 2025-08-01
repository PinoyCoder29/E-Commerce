import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      setOrders(res.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  // Grouping items by product_id and summing quantities
  const groupItems = (items) => {
    const grouped = {};

    items.forEach((item) => {
      if (grouped[item.product_id]) {
        grouped[item.product_id].quantity += item.quantity;
      } else {
        grouped[item.product_id] = { ...item };
      }
    });

    return Object.values(grouped);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Orders</h2>

      {orders.map((order) => {
        const groupedItems = groupItems(order.items);
        return (
          <div key={order.id} className="border p-3 mb-4 rounded shadow-sm">
            <h5>Order ID: {order.id}</h5>

            <table className="table table-bordered table-sm mt-3">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {groupedItems.map((item, index) => (
                  <tr key={item.product_id}>
                    <td>
                      <img src={item.product_image} alt="Product" width="50" />
                    </td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>₱{item.price}</td>

                    {/* Merge status, total, date in first row only */}
                    {index === 0 && (
                      <>
                        <td rowSpan={groupedItems.length} className="align-middle text-center">
                          {order.status}
                        </td>
                        <td rowSpan={groupedItems.length} className="align-middle text-center">
                          ₱{order.total_price}
                        </td>
                        <td rowSpan={groupedItems.length} className="align-middle text-center">
                          {new Date(order.created_at).toLocaleString()}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
