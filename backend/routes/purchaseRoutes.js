const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');  


router.get('/orders/:userId', orderController.getOrderDetails);

module.exports = router;
