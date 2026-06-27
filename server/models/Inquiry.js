import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  city: { type: String, default: 'Kolkata' },
  state: { type: String, default: 'West Bengal' },
  requirements: { type: String },
  type: { type: String, enum: ['bulk', 'home_delivery', 'event', 'contact', 'other'], default: 'other' },
  status: { type: String, enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' },
  source: { type: String, enum: ['inquiry_form', 'contact_page', 'customization'], default: 'inquiry_form' },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
