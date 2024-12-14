import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';  // You can style this component

function BookDetail() {
  const { Book_ID } = useParams(); // Get the Book_ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control the purchase confirmation popup visibility
  const [orderStatusPopup, setOrderStatusPopup] = useState(false); // State to control the order status popup
  const [orderSuccess, setOrderSuccess] = useState(''); // State to store the success or failure message

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/getBookDetail/${Book_ID}`);
        setBook(response.data);  // Set the fetched book data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book details:', err);
        setError('Error fetching book details.');
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [Book_ID]);
  // Function to handle "Purchase" button click
  const handlePurchaseClick = () => {
    // Show the confirmation popup
    setShowPopup(true);
  };

  // Function to handle purchase confirmation (Yes or No)
  const handleConfirmPurchase = (confirm) => {
    if (confirm) {
      // If 'Yes' is clicked, show the success popup
      setOrderSuccess('Order successfully placed!');
    } else {
      // If 'No' is clicked, show the unsuccessful order popup
      setOrderSuccess('Order was unsuccessful.');
    }
    setShowPopup(false); // Hide the confirmation popup
    setOrderStatusPopup(true); // Show the order status popup
  };

  // Function to close the order status popup
  const closeOrderStatusPopup = () => {
    setOrderStatusPopup(false); // Close the order status popup
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="book-detail">
      <h1>{book.Title}</h1>
      {book.image_url && <img src={book.image_url} alt={book.Title}  />}
      <p><strong>Author:</strong> {book.Author}</p>
      <p><strong>Category:</strong> {book.Category}</p>
      <p><strong>Quantity:</strong> {book.Quantity}</p>
      <p><strong>Price:</strong> ${book.Price}</p>
      <p><strong>Description:</strong> {book.BigDesp}</p>
      <button className="purchase-button" onClick={handlePurchaseClick}>Order</button>

      {/* Popup for confirmation */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to order this book?</p>
            <button className="popup-button" onClick={() => handleConfirmPurchase(true)}>Yes</button>
            <button className="popup-button" onClick={() => handleConfirmPurchase(false)}>No</button>
          </div>
        </div>
      )}

       {/* Order Status Popup */}
       {orderStatusPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{orderSuccess}</p>
            <button className="popup-button" onClick={closeOrderStatusPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

      

export default BookDetail;
