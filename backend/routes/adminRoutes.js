// Import necessary modules
const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Routes for /admin/books

// Create a new book (Insert)
router.post('/books', adminController.createBook);

// Read all books
router.get('/books', adminController.getAllBooks);

// Update a book
router.put('/books/:id', adminController.updateBook);

// Delete a book
router.delete('/books/:id', adminController.deleteBook);

module.exports = router;
