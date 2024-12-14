import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch books data from the API
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/getBooks'); // Adjust URL as needed
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err)
        setError('Error fetching books data.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="home-page">Loading...</div>;
  }

  if (error) {
    return <div className="home-page">{error}</div>;
  }

  const handleBookClick = (Book_ID) => {
    // Redirect to BookDetail page with the Book_ID
    navigate(`/BookDetail/${Book_ID}`);
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Book Store</h1>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.Book_ID} className="book-item" onClick={() => handleBookClick(book.Book_ID)}>
              <h2>{book.Title}</h2>
              {book.image_url && <img src={book.image_url} alt={book.Title}  />}
              <p><strong>Author:</strong> {book.Author}</p>
              <p><strong>Category:</strong> {book.Category}</p>
              <p><strong>Quantity:</strong> {book.Quantity}</p>
              <p><strong>Price:</strong> ${book.Price}</p>
              <p><strong>Description:</strong> {book.Description}</p>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
