import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProductList = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/product_list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product list:', error);
      toast.error('Failed to fetch product list');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/delete_product/${selectedProduct}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setSelectedProduct(null);
        fetchProductList();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      if (error.response?.status === 404) {
        toast.error('Product not found');
      } else {
        toast.error('Failed to delete product');
      }
    } finally {
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0 text-primary">Product List</h2>
        <div>
          <button onClick={fetchProductList} className="btn btn-success me-2">Refresh</button>
          <button className="btn btn-primary me-2" disabled={!selectedProduct}>Edit</button>
          <button
            className="btn btn-danger"
            onClick={() => setShowModal(true)}
            disabled={!selectedProduct}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-hover align-middle shadow-sm" style={{ backgroundColor: '#ffffff' }}>
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Gender</th>
              <th>SKU</th>
              <th>Size</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Image</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {product.map((products) => (
              <tr
                key={products.productId}
                onClick={() => setSelectedProduct(products.productId)}
                style={{
                  backgroundColor: selectedProduct === products.productId ? '#e6f7ff' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <td>{products.productId}</td>
                <td>{products.productName}</td>
                <td>{products.brand}</td>
                <td>{products.category}</td>
                <td>{products.gender}</td>
                <td>{products.sku}</td>
                <td>{products.sizes}</td>
                <td>{products.colors}</td>
                <td>{products.stocks}</td>
                <td>{products.price}</td>
                <td>{products.discount}</td>
                <td>
                  <img
                    src={products.images}
                    alt="Product"
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </td>
                <td>{products.description}</td>
                <td>
                  <span className="badge bg-success">Available</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this product?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
