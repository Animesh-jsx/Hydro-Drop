import { Router } from 'express';
import Inquiry from '../models/Inquiry.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

// POST /api/inquiries - Public: Submit inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, city, state, requirements, type, source } = req.body;

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      city: city || 'Kolkata',
      state: state || 'West Bengal',
      requirements,
      type: type || 'other',
      source: source || 'inquiry_form',
    });

    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/inquiries - Admin: Get all inquiries
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/inquiries/:id - Admin: Update inquiry status
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
