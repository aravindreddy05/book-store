import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css'; // Add custom CSS if needed

const AdminBookManagement = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    Title: '',
    Author: '',
    Category: '',
    Quantity: '',
    Price: '',
    Description: '',
    image_url: '', 
    Big_Desp: '', 
});

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editingBookId, setEditingBookId] = useState(null); // To track if a book is being edited

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/getBooks'); // Adjust URL as needed
      setBooks(response.data);
    } catch (err) {
      setError('Error fetching books.');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for creating/updating books
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      if (editingBookId) {
        // Update book
        const response = await axios.put(`http://localhost:3010/admin/updateBook/${editingBookId}`, formData);
        setMessage(response.data.message);
        setEditingBookId(null);
      } else {
        // Create book
        const response = await axios.post('http://localhost:3010/admin/createBook', formData);
        setMessage(response.data.message);
      }

      // Clear form and refresh book list
      setFormData({
        Title: '',
        Author: '',
        Category: '',
        Quantity: '',
        Price: '',
        Description: '',
        image_url: '', 
        Big_Desp: '', 
      });
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting form.');
    }
  };

  // Handle delete book
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3010/api/deleteBook/${id}`);
      setMessage(response.data.message);
      fetchBooks(); // Refresh book list
    } catch (err) {
      setError('Error deleting book.');
    }
  };

  // Handle edit book
  const handleEdit = (book) => {
    setEditingBookId(book.Book_ID);
    setFormData({
      Title: book.Title,
      Author: book.Author,
      Category: book.Category,
      Quantity: book.Quantity,
      Price: book.Price,
      Description: book.Description,
      Image_Url: book.Image_Url, // Populate Image_Url for editing
    });
  };

  return (
    <div className="admin-page">
      <h1>Book Management</h1>
      <form onSubmit={handleSubmit} className="create-book-form">
        <h2>{editingBookId ? 'Edit Book' : 'Create a New Book'}</h2>
        <div className="form-group">
          <label htmlFor="Title">Title:</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Author">Author:</label>
          <input
            type="text"
            id="Author"
            name="Author"
            value={formData.Author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Category">Category:</label>
          <input
            type="text"
            id="Category"
            name="Category"
            value={formData.Category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Quantity">Quantity:</label>
          <input
            type="number"
            id="Quantity"
            name="Quantity"
            value={formData.Quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price:</label>
          <input
            type="number"
            id="Price"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description:</label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
    <label htmlFor="image_url">Image URL:</label>
    <input
        type="text"
        id="image_url"
        name="image_url"
        value={formData.image_url}
        onChange={handleChange}
        required
    />
      </div>
      <div className="form-group">
    <label htmlFor="Big_Desp">Big Description:</label>
    <textarea
        id="Big_Desp"
        name="Big_Desp"
        value={formData.Big_Desp}
        onChange={handleChange}
    />
</div>
        <button type="submit" className="submit-button">
          {editingBookId ? 'Update Book' : 'Create Book'}
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <h2>All Books</h2>
      <div className="book-list">
        
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.Book_ID} className="book-item">
              <h3>{book.Title}</h3>
              {book.image_url && <img src={book.image_url} alt={book.Title} />}
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
};

export default AdminBookManagement;
