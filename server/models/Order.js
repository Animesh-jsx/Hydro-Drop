import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: String,
  bottleType: String,
  variety: String,
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true }, // Human-readable ID like #ORD-9021
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, default: 'Kolkata' },
    state: { type: String, default: 'West Bengal' },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' },
    phone: { type: String, required: true },
  },
  paymentMethod: { type: String, enum: ['upi', 'card', 'cod'], required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  status: {
    type: String,
    enum: ['processing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'processing',
  },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  tax: { type: Number, default: 0 }, // GST
  total: { type: Number, required: true },
  notes: String,
  deliveredAt: Date,
}, { timestamps: true });

// Auto-generate orderId before saving
orderSchema.pre('save', async function (next) {
  if (!this.orderId) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderId = `#ORD-${(9000 + count + 1).toString()}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
