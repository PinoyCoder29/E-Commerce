import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';

const Cart = () => {
  const [product, setProduct] = useState([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customer/cart', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product', error);
      toast.error('Error fetching cart');
    }
  };

  const DeleteActionCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customer/deleteCart/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      toast.success('Item removed');
      fetchProduct();
    } catch (error) {
      console.error('Error deleting cart item', error);
      toast.error('Failed to delete cart item');
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await axios.put(
        `http://localhost:5000/api/customer/cartQuantity/${cartId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      fetchProduct();
    } catch (error) {
      console.error('Error updating quantity', error);
      toast.error('Failed to update quantity');
    }
  };

  const handleCheckout = async () => {
    if (product.length === 0) return toast.warn('Your cart is empty');

    const items = product.map((item) => ({
      product_id: item.product_id,
      product_name: item.product_name,
      product_image: item.image,
      quantity: item.quantity,
      price: item.price,
    }));

    const total_price = product.reduce((sum, item) => sum + item.price * item.quantity, 0);

    setIsPlacingOrder(true);

    try {
      await axios.post(
        'http://localhost:5000/api/customer/place_order',
        { items, total_price },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      toast.success('Order placed successfully!');
      fetchProduct(); // Reload cart after placing order
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="p-4">
      <div className="container">
        <h1>Shopping Cart</h1>

        <div className="row mt-4">
          {/* Left side: Cart items */}
          <div className="col-md-8">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Color / Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>{item.productName}</div>
                      </div>
                    </td>
                    <td>{item.color} / {item.size}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₱{item.price}</td>
                    <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => DeleteActionCart(item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right side: Summary */}
          <div className="col-md-4">
            <div className="card p-3">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Total Items:{' '}
                <strong>{product.reduce((sum, item) => sum + item.quantity, 0)}</strong>
              </p>
              <p>
                Total Price:{' '}
                <strong>₱{product.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</strong>
              </p>
              <button
                className="btn btn-primary w-100"
                disabled={isPlacingOrder}
                onClick={handleCheckout}
              >
                {isPlacingOrder ? 'Placing Order...' : 'Checkout'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme='dark'/>
    </div>
  );
};

export default Cart;
