import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css'; // Add custom CSS if needed

const CreateBookForm = () => {
  const [formData, setFormData] = useState({
    Title: '',
    Author: '',
    Category: '',
    Quantity: '',
    Price: '',
    Description: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:3010/api/createBook', formData); // Adjust the API URL as needed
      if (response.status === 201) {
        setMessage(response.data.message);
        setFormData({
          Title: '',
          Author: '',
          Category: '',
          Quantity: '',
          Price: '',
          Description: '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating book. Please try again.');
    }
  };

  return (
    <div className="create-book-form">
      <h1>Create a New Book</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="submit-button">Create Book</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreateBookForm;
