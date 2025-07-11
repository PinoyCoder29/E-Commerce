import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Verify_NewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = new URLSearchParams(location.search).get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/customer/verify_NewPassword', {
        email,
        password,
        confirmPassword
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/SignIn'); // Redirect to login page
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <main className="p-5">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <article className="card">
              <div className="card-header">
                <h4>Set New Password</h4>
              </div>
              <form onSubmit={handleResetPasswordSubmit}>
                <div className="card-body">
                  <p>You're setting a new password for: <b>{email}</b></p>

                  <div className="mb-3">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control shadow"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control shadow"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-end gap-3">
                  <button className="btn btn-secondary" type="button" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                  <button className="btn btn-warning" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
      <ToastContainer theme='dark'/>
    </main>
  );
};

export default Verify_NewPassword;
