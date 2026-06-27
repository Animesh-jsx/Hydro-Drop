import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import CustomizationRequest from '../models/CustomizationRequest.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = Router();

// Multer config for logo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/logos'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max

// POST /api/customization - Customer: Submit customization request
router.post('/', upload.single('logo'), async (req, res) => {
  try {
    const {
      companyName, contactEmail, contactPhone, product,
      application, baseColor, quantity, waterEssence,
      volume, capFinish, inscription,
    } = req.body;

    const request = await CustomizationRequest.create({
      customer: req.body.customerId || null,
      companyName,
      contactEmail,
      contactPhone,
      product,
      application,
      baseColor,
      quantity: parseInt(quantity),
      waterEssence,
      volume,
      capFinish,
      inscription,
      logoUrl: req.file ? `/uploads/logos/${req.file.filename}` : null,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/customization/admin/all - Admin: Get all requests
router.get('/admin/all', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;

    const requests = await CustomizationRequest.find(filter)
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/customization/:id - Admin: Get single request
router.get('/:id', protect, adminOnly, async (req, res) => {
  try {
    const request = await CustomizationRequest.findById(req.params.id)
      .populate('customer', 'name email phone');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/customization/:id/status - Admin: Update request status
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const request = await CustomizationRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    if (adminNotes) request.adminNotes = adminNotes;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
