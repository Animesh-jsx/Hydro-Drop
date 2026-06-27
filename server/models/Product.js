import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['still', 'sparkling', 'functional', 'alkaline'], required: true },
  price: { type: Number, required: true }, // Price in INR
  oldPrice: { type: Number, default: 0 },
  volume: { type: String, required: true }, // e.g., '500ml', '1L', '20L'
  image: { type: String, required: true },
  tags: [{ type: String }],
  stock: { type: Number, required: true, default: 0 },
  lowStockThreshold: { type: Number, default: 50 },
  isActive: { type: Boolean, default: true },
  bottleType: { type: String, enum: ['glass', 'rPET', 'premium-glass', 'recycled-glass'], default: 'rPET' },
  variety: { type: String }, // e.g., 'Artesian Still', 'Electrolyte Infused'
}, { timestamps: true });

productSchema.virtual('isLowStock').get(function () {
  return this.stock <= this.lowStockThreshold;
});

productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
