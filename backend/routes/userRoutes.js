const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

const bookController = require('../controller/bookController'); 

// Login route
router.post('/login', userController.loginUser);
router.get('/getBooks', bookController.getAllBooks);
router.post('/register', userController.registerUser);
router.get('/getBookDetail/:id', bookController.getBookDetail);

module.exports = router;
