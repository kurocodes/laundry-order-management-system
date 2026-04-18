/**
 * Generates a unique order ID format (e.g., ORD-1678901234)
 * @returns {string} Unique order ID
 */
const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}-${randomStr}`;
};

module.exports = generateOrderId;
