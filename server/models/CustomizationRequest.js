import mongoose from 'mongoose';

const customizationRequestSchema = new mongoose.Schema({
  requestId: { type: String, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  companyName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: String,
  product: { type: String, required: true }, // e.g., '64oz Pro Jug', '32oz Tumbler'
  application: { type: String, enum: ['laser_engrave', 'color_print', 'emboss', 'screen_print'], required: true },
  baseColor: { type: String, default: 'Matte Black' },
  quantity: { type: Number, required: true, min: 1 },
  waterEssence: { type: String, enum: ['still', 'sparkling', 'alkaline', 'mineral'] },
  volume: String,
  capFinish: { type: String, enum: ['bamboo', 'stainless', 'sports'] },
  inscription: String,
  logoUrl: String, // Uploaded logo file path
  designAssets: [String], // Array of uploaded file paths
  status: {
    type: String,
    enum: ['in_review', 'awaiting_design', 'approved', 'revision_requested', 'rejected'],
    default: 'in_review',
  },
  adminNotes: String,
  pricePerUnit: { type: Number }, // INR
  totalPrice: { type: Number }, // INR
}, { timestamps: true });

// Auto-generate requestId
customizationRequestSchema.pre('save', async function (next) {
  if (!this.requestId) {
    const count = await mongoose.model('CustomizationRequest').countDocuments();
    this.requestId = `REQ-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

const CustomizationRequest = mongoose.model('CustomizationRequest', customizationRequestSchema);
export default CustomizationRequest;
