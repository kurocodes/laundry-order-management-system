const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Item type is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Item quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: [true, 'Item price is required'],
    min: [0, 'Price cannot be negative']
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  items: {
    type: [orderItemSchema],
    required: true,
    validate: [v => v.length > 0, 'Order must contain at least one item']
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String,
    enum: ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
    default: 'RECEIVED'
  },
  estimatedDeliveryDate: {
    type: Date
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
