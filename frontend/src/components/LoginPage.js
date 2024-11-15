import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './LoginPage.css';
import axios from 'axios'; // Import axios for API requests

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Updated hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    try {
      const response = await axios.post('http://localhost:3010/api/login', {
        email: username, // Assuming your backend expects an `email` field
        password: password,
      });

      if (response.status === 200) {
        setMessage('Login successful!');
        navigate('/home'); // Redirect to HomePage on success
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

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
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
          <p>Don't have an account? 
            <button className="register-link" onClick={handleRegisterRedirect}>Register</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
