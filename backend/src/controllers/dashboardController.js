const Order = require('../models/Order');

// @desc    Get dashboard metrics
// @route   GET /api/dashboard
exports.getDashboardData = async (req, res, next) => {
  try {
    // We could use MongoDB Aggregation pipeline, but for simplicity we'll do basic queries
    
    // 1. Total Orders
    const totalOrders = await Order.countDocuments();
    
    // 2. Total Revenue (sum of all orders)
    const revenueResult = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
    
    // 3. Status Breakdown
    const statusCounts = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // Initialize default breakdown
    const statusBreakdown = {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0
    };
    
    // Fill in actual counts
    statusCounts.forEach(statusBucket => {
      if (statusBreakdown.hasOwnProperty(statusBucket._id)) {
        statusBreakdown[statusBucket._id] = statusBucket.count;
      }
    });
    
    res.json({
      totalOrders,
      totalRevenue,
      statusBreakdown
    });
  } catch (error) {
    next(error);
  }
};
