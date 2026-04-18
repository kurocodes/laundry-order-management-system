const Order = require("../models/Order");
const generateOrderId = require("../utils/generateOrderId");

// @desc    Create a new order
// @route   POST /api/orders
exports.createOrder = async (req, res, next) => {
  try {
    const { customerName, phone, items } = req.body;

    // Basic validation
    if (
      !customerName ||
      !phone ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res
        .status(400)
        .json({
          error: "Please provide customerName, phone, and at least one item",
        });
    }

    // Validate items and calculate total
    let total = 0;
    for (const item of items) {
      if (!item.type || !item.quantity || item.price === undefined) {
        return res
          .status(400)
          .json({ error: "Each item must have type, quantity, and price" });
      }
      total += item.quantity * item.price;
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Add estimated delivery date (e.g., 3 days from now)
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 3);

    const order = new Order({
      orderId,
      customerName,
      phone,
      items,
      total,
      estimatedDeliveryDate,
      status: "RECEIVED", // Default status
    });

    const savedOrder = await order.save();

    // Return created order with total and ID
    res.status(201).json({
      message: "Order created successfully",
      data: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status enum
    const validStatuses = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid status. Must be one of: RECEIVED, PROCESSING, READY, DELIVERED",
        });
    }

    // Find and update the order
    // Note: User can pass internal MongoDB _id or custom orderId. Let's support both or primary _id.
    // Assuming :id refers to the database _id or custom orderId
    const order =
      (await Order.findById(id).catch(() => null)) ||
      (await Order.findOne({ orderId: id }));

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = {};

    // Apply filters if provided
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const orders = await Order.find(query)
      .sort({ createdAt: -1 }) // Sort by latest first
      .skip(skip)
      .limit(pageSize);

    const totalOrders = await Order.countDocuments(query);

    res.json({
      data: orders,
      pagination: {
        total: totalOrders,
        page: pageNumber,
        pages: Math.ceil(totalOrders / pageSize),
      },
    });
  } catch (error) {
    next(error);
  }
};
