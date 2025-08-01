import axios from 'axios';

export const fetchOrdersByStatus = async (status, token) => {
  const res = await axios.get(`http://localhost:5000/api/customer/status/${status}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

