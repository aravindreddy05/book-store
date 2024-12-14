import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch books data from the API
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3010/api/getBooks'); // Adjust URL as needed
        setBooks(response.data);
        setFilteredBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err)
        setError('Error fetching books data.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Filter books based on title and category
    const filterBooks = () => {
      let filtered = books;

      if (searchTitle) {
        filtered = filtered.filter(book => book.Title.toLowerCase().includes(searchTitle.toLowerCase()));
      }

      if (searchCategory) {
        filtered = filtered.filter(book => book.Category.toLowerCase().includes(searchCategory.toLowerCase()));
      }

      setFilteredBooks(filtered);
    };

    filterBooks();
  }, [searchTitle, searchCategory, books]); // Re-run filtering whenever title or category search changes

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

      {/* Search Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Search by Category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.Book_ID} className="book-item" onClick={() => handleBookClick(book.Book_ID)}>
              <h2>{book.Title}</h2>
              {book.image_url && <img src={book.image_url} alt={book.Title} />}
              <p><strong>Author:</strong> {book.Author}</p>
              <p><strong>Category:</strong> {book.Category}</p>
              <p><strong>Quantity:</strong> {book.Quantity}</p>
              <p><strong>Price:</strong> ${book.Price}</p>
              <p><strong>Description:</strong> {book.Description}</p>
            </div>
          ))
        ) : (
          <p>No books available matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
