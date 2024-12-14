import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

import OrderDetails from './components/OrderDetails';
import BookDetail from './components/BookDetail';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/BookDetail/:Book_ID" element={<BookDetail />} /> {/* Add BookDetail route */}
        <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
     
          
          <Route path="/Orderdetails" element={<OrderDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
