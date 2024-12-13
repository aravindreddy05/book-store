const express = require('express');
const router = express.Router();
const bookDetail = require('../controller/bookDetail');  


router.get('/bookDetails', bookDetail.getBookDetails);

module.exports = router;
