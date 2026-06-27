import { Router } from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import CustomizationRequest from '../models/CustomizationRequest.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

// GET /api/dashboard/metrics - Admin: Get dashboard overview metrics
router.get('/metrics', protect, adminOnly, async (req, res) => {
  try {
    // Total Revenue
    const revenueResult = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    // Orders today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ordersToday = await Order.countDocuments({ createdAt: { $gte: today } });

    // New customers this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newCustomers = await User.countDocuments({
      role: 'customer',
      createdAt: { $gte: weekAgo },
    });

    // Average order value
    const avgResult = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, avg: { $avg: '$total' } } },
    ]);
    const avgOrderValue = Math.round(avgResult[0]?.avg || 0);

    // Total orders and customers
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    res.json({
      totalRevenue,
      ordersToday,
      newCustomers,
      avgOrderValue,
      totalOrders,
      totalCustomers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/dashboard/recent-orders - Admin: Get recent orders
router.get('/recent-orders', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/dashboard/inventory-alerts - Admin: Low stock products
router.get('/inventory-alerts', protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.find({
      $expr: { $lte: ['$stock', '$lowStockThreshold'] },
    }).limit(5);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/dashboard/sales-chart - Admin: Monthly sales data
router.get('/sales-chart', protect, adminOnly, async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const salesData = await Order.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo }, status: { $ne: 'cancelled' } } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = salesData.map((item) => ({
      month: months[item._id - 1],
      revenue: item.revenue,
      orders: item.orders,
    }));

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
