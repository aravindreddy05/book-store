import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [extraField1, setExtraField1] = useState('');
  const [extraField2, setExtraField2] = useState('');
  const navigate = useNavigate(); // Updated hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post('http://localhost:3010/api/login', {
        email: username,
        password: password,
      });

      if (response.status === 200) {
        const user = response.data;
        if (user) {
          setMessage('Login successful!');
          navigate('/home'); // Redirect to home after successful login
        }
      } else {
        setMessage('Login failed!');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data || 'Login failed!');
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Navigate to the Register page
  };

  const handleAdminRedirect = () => {
    navigate('/admin'); // Navigate to the Admin page for testing
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>User Login</h1> {/* Updated heading */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        {message && <p>{message}</p>}
        <div className="register-option">
          <p>
            Don't have an account?{' '}
            <button className="register-link" onClick={handleRegisterRedirect}>
              Register
            </button>
          </p>
        </div>

        {/* Added Admin Login heading */}
        <div className="admin-login">
          <h2>Admin Login</h2> {/* New Admin Login heading */}
        </div>

        <div className="extra-fields">
          <div className="form-group horizontal-layout">
            <label htmlFor="extraField1">Username:</label>
            <input
              type="text"
              id="extraField1"
              placeholder="Enter Username"
              value={extraField1}
              onChange={(e) => setExtraField1(e.target.value)}
              className="extra-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="extraField2">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="extraField2"
              placeholder="Enter Password"
              value={extraField2}
              onChange={(e) => setExtraField2(e.target.value)}
              className="extra-input"
            />
          </div>
        </div>

        <div className="admin-test">
          <button className="test-admin-button" onClick={handleAdminRedirect}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
