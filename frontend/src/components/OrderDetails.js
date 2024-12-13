import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderDetails.css'; // Add styles if needed

function OrderDetails({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch order details for the user
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/purchaseRoutes/orders/${userId}`); // Adjust URL as needed
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching order details.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId]);

  if (loading) {
    return <div className="order-details-page">Loading...</div>;
  }

  if (error) {
    return <div className="order-details-page">{error}</div>;
  }

  return (
    <div className="order-details-page">
      <h1>Order Details</h1>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.Order_Detail_ID} className="order-item">
              <h2>Order ID: {order.Order_ID}</h2>
              <p><strong>Order Date:</strong> {new Date(order.Order_Date).toLocaleDateString()}</p>
              <p><strong>Book ID:</strong> {order.Book_ID}</p>
              <p><strong>Quantity:</strong> {order.Quantity}</p>
              <p><strong>Price:</strong> ${order.Price.toFixed(2)}</p>
              <p><strong>Total Item Price:</strong> ${order.Total_Item_Price.toFixed(2)}</p>
              <p><strong>Total Amount:</strong> ${order.Total_Amount.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No orders found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
