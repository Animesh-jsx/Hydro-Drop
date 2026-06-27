import { Router } from 'express';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

// GET /api/customers - Admin: Get all customers
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, search } = req.query;
    const filter = { role: 'customer' };

    if (status === 'active') filter.isActive = true;
    if (status === 'inactive') filter.isActive = false;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const customers = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      customers,
      total: customers.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/customers/:id - Admin: Get single customer
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select('-password');
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/customers/:id - Admin: Update customer
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, phone, isActive, address } = req.body;
    const customer = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, isActive, address },
      { new: true, runValidators: true }
    ).select('-password');

    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/customers - Admin: Create customer
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const customer = await User.create({
      name,
      email,
      password: password || 'hydradrop123',
      phone,
      role: 'customer',
      address: address || { city: 'Kolkata', state: 'West Bengal', country: 'India' },
    });

    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      isActive: customer.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
