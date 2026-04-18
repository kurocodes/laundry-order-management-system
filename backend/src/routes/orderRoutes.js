const express = require('express');
const { createOrder, updateOrderStatus, getOrders } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
  .post(createOrder)
  .get(getOrders);

router.route('/:id/status')
  .patch(updateOrderStatus);

module.exports = router;
