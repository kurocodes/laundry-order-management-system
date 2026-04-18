const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');

const router = express.Router();

router.route('/')
  .get(getDashboardData);

module.exports = router;
