import React, { useEffect, useState } from 'react';
import { fetchOrdersByStatus } from '../Order/OrderApi';

const OrderReview = () => {
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchOrders = async () => {
      try {
        const orders = await fetchOrdersByStatus('Completed', token);
        setPendingOrders(orders);
      } catch (error) {
        console.error('Error fetching pending orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="h4 fw-bold text-warning mb-4">🛒 Pending Orders</h1>

      {pendingOrders.length === 0 ? (
        <p className="text-muted">No pending orders found.</p>
      ) : (
        pendingOrders.map((order) => (
          <div key={order.id} className="card mb-4 border border-warning">
            <div className="card-body">

              {/* Order Info */}
              <div className="mb-3">
                <div className="fw-semibold text-dark">Order ID: #{order.id}</div>
                <div className="text-muted small">Placed on: {new Date(order.created_at).toLocaleString()}</div>
              </div>

              {/* Order items table */}
              <div className="table-responsive">
                <table className="table table-bordered table-sm">
                  <thead className="table-light">
                    <tr className="text-center">
                      <th>Product Image</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="text-center align-middle">
                        <td>
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="img-thumbnail"
                            style={{ width: '50px', height: '70px', objectFit: 'contain' }}
                          />
                        </td>
                        <td>{item.quantity}</td>
                        <td>₱{item.price.toLocaleString()}</td>
                        <td>₱{(item.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Summary */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="small">
                  <strong>Status:</strong>{' '}
                  <span className="badge bg-warning text-dark">{order.status}</span>
                </span>
                <span className="fw-bold text-dark fs-6">
                  <strong>Total:</strong> ₱{order.total_price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderReview;
