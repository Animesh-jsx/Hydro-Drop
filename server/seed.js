import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import CustomizationRequest from './models/CustomizationRequest.js';
import Inquiry from './models/Inquiry.js';

const seedDatabase = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});
  await CustomizationRequest.deleteMany({});
  await Inquiry.deleteMany({});

  console.log('🗑️  Cleared existing data');

  // Create Admin User
  const admin = await User.create({
    name: 'Hydra Drop Admin',
    email: 'admin@hydradrop.in',
    password: 'admin123',
    phone: '+91 98765 43210',
    role: 'admin',
    address: {
      street: '42 Park Street',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700016',
      country: 'India',
    },
  });
  console.log('👤 Admin created: admin@hydradrop.in / admin123');

  // Create Customers
  const customers = await User.insertMany([
    {
      name: 'Ananya Chatterjee',
      email: 'ananya.c@gmail.com',
      password: await bcrypt.hash('customer123', 12),
      phone: '+91 90123 45678',
      role: 'customer',
      isActive: true,
      totalOrders: 12,
      ltv: 15400,
      lastOrder: new Date('2024-10-24'),
      address: { street: '15 Salt Lake Sector V', city: 'Kolkata', state: 'West Bengal', pincode: '700091', country: 'India' },
    },
    {
      name: 'Rajesh Banerjee',
      email: 'rajesh.b@corp.in',
      password: await bcrypt.hash('customer123', 12),
      phone: '+91 87654 32109',
      role: 'customer',
      isActive: true,
      totalOrders: 4,
      ltv: 5600,
      lastOrder: new Date('2024-09-12'),
      address: { street: '88 New Town', city: 'Kolkata', state: 'West Bengal', pincode: '700156', country: 'India' },
    },
    {
      name: 'Priya Mukherjee',
      email: 'priya.m@studio.co',
      password: await bcrypt.hash('customer123', 12),
      phone: '+91 76543 21098',
      role: 'customer',
      isActive: false,
      totalOrders: 0,
      ltv: 0,
      address: { street: '22 Gariahat Road', city: 'Kolkata', state: 'West Bengal', pincode: '700029', country: 'India' },
    },
    {
      name: 'Sourav Das',
      email: 'sourav.d@tech.in',
      password: await bcrypt.hash('customer123', 12),
      phone: '+91 65432 10987',
      role: 'customer',
      isActive: true,
      totalOrders: 8,
      ltv: 9800,
      lastOrder: new Date('2024-10-20'),
      address: { street: '5 Ballygunge Place', city: 'Kolkata', state: 'West Bengal', pincode: '700019', country: 'India' },
    },
    {
      name: 'Meera Sen',
      email: 'meera.s@events.in',
      password: await bcrypt.hash('customer123', 12),
      phone: '+91 54321 09876',
      role: 'customer',
      isActive: true,
      totalOrders: 6,
      ltv: 12200,
      lastOrder: new Date('2024-10-22'),
      address: { street: '10 Camac Street', city: 'Kolkata', state: 'West Bengal', pincode: '700017', country: 'India' },
    },
  ]);
  console.log(`👥 ${customers.length} customers created`);

  // Create Products (INR pricing, Kolkata market)
  const products = await Product.insertMany([
    {
      name: 'Hydra Still Mini',
      description: 'Perfect for corporate events and quick refreshment. Compact and portable, ideal for meetings at Salt Lake IT Park.',
      category: 'still',
      price: 20,
      oldPrice: 25,
      volume: '300ml',
      image: 'https://images.unsplash.com/photo-1560023907-5f339617ea55?w=400&auto=format&fit=crop&q=80',
      tags: ['Events', 'Quick Sip'],
      stock: 2500,
      lowStockThreshold: 100,
      bottleType: 'rPET',
      variety: 'Purified RO',
    },
    {
      name: 'Hydra Standard',
      description: 'The ideal daily companion. Balanced pH levels for optimal hydration. Sourced from pristine Himalayan aquifers.',
      category: 'still',
      price: 35,
      oldPrice: 40,
      volume: '500ml',
      image: 'https://images.unsplash.com/photo-1606168094336-48f205276929?w=400&auto=format&fit=crop&q=80',
      tags: ['Best Seller', 'Balanced pH'],
      stock: 1450,
      lowStockThreshold: 100,
      bottleType: 'rPET',
      variety: 'Artesian Still',
    },
    {
      name: 'Hydra Max',
      description: 'Stay hydrated all day long. Perfect for sports, gym sessions at Gold\'s Gym Kolkata, and outdoor activities.',
      category: 'still',
      price: 55,
      oldPrice: 65,
      volume: '1L',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&auto=format&fit=crop&q=80',
      tags: ['All-Day', 'Sports'],
      stock: 820,
      lowStockThreshold: 50,
      bottleType: 'rPET',
      variety: 'Electrolyte Infused',
    },
    {
      name: 'Hydra Home Jar',
      description: 'The sustainable choice for your home or office. Returnable jar with free delivery across Kolkata.',
      category: 'still',
      price: 80,
      oldPrice: 0,
      volume: '20L',
      image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&auto=format&fit=crop&q=80',
      tags: ['Family', 'Eco-Friendly', 'Returnable'],
      stock: 350,
      lowStockThreshold: 30,
      bottleType: 'recycled-glass',
      variety: 'Purified RO',
    },
    {
      name: 'Sparkling Glacier',
      description: 'Premium sparkling water with fine bubbles. Perfect for dinner parties and celebrations in Park Street.',
      category: 'sparkling',
      price: 75,
      oldPrice: 90,
      volume: '750ml',
      image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=400&auto=format&fit=crop&q=80',
      tags: ['Premium', 'Celebrations'],
      stock: 12,
      lowStockThreshold: 50,
      bottleType: 'premium-glass',
      variety: 'Sparkling Spring',
    },
    {
      name: 'Citrus Infusion',
      description: 'Natural citrus-infused sparkling water. Zero calories, zero sugar. Refreshing taste of Darjeeling lemon.',
      category: 'functional',
      price: 65,
      oldPrice: 75,
      volume: '500ml',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&auto=format&fit=crop&q=80',
      tags: ['Zero Sugar', 'Citrus'],
      stock: 45,
      lowStockThreshold: 50,
      bottleType: 'glass',
      variety: 'Citrus Infused',
    },
    {
      name: 'Bamboo Spring',
      description: 'Alkaline water sourced from bamboo-filtered springs in the Eastern Himalayas. pH 9.5+ for superior hydration.',
      category: 'alkaline',
      price: 95,
      oldPrice: 110,
      volume: '750ml',
      image: 'https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=400&auto=format&fit=crop&q=80',
      tags: ['Alkaline', 'Premium'],
      stock: 50,
      lowStockThreshold: 50,
      bottleType: 'glass',
      variety: 'Alkaline Spring',
    },
    {
      name: 'Natural Mineral',
      description: 'Sourced from Alpine springs with naturally occurring minerals. Premium glass bottle for the discerning palate.',
      category: 'still',
      price: 120,
      oldPrice: 150,
      volume: '750ml',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&auto=format&fit=crop&q=80',
      tags: ['Reserve', 'Glass'],
      stock: 200,
      lowStockThreshold: 30,
      bottleType: 'premium-glass',
      variety: 'Natural Mineral',
    },
  ]);
  console.log(`📦 ${products.length} products created`);

  // Create Orders
  const orders = await Order.insertMany([
    {
      orderId: '#ORD-9021',
      customer: customers[0]._id,
      items: [
        { product: products[1]._id, name: 'Hydra Standard', price: 35, quantity: 24, image: products[1].image, bottleType: 'rPET', variety: 'Artesian Still' },
        { product: products[4]._id, name: 'Sparkling Glacier', price: 75, quantity: 6, image: products[4].image, bottleType: 'premium-glass', variety: 'Sparkling Spring' },
      ],
      shippingAddress: { name: 'Ananya Chatterjee', street: '15 Salt Lake Sector V', city: 'Kolkata', state: 'West Bengal', pincode: '700091', country: 'India', phone: '+91 90123 45678' },
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      status: 'processing',
      subtotal: 1290,
      shipping: 0,
      tax: 232,
      total: 1522,
    },
    {
      orderId: '#ORD-9020',
      customer: customers[1]._id,
      items: [
        { product: products[2]._id, name: 'Hydra Max', price: 55, quantity: 12, image: products[2].image, bottleType: 'rPET', variety: 'Electrolyte Infused' },
      ],
      shippingAddress: { name: 'Rajesh Banerjee', street: '88 New Town', city: 'Kolkata', state: 'West Bengal', pincode: '700156', country: 'India', phone: '+91 87654 32109' },
      paymentMethod: 'card',
      paymentStatus: 'paid',
      status: 'out_for_delivery',
      subtotal: 660,
      shipping: 0,
      tax: 119,
      total: 779,
    },
    {
      orderId: '#ORD-9019',
      customer: customers[3]._id,
      items: [
        { product: products[7]._id, name: 'Natural Mineral', price: 120, quantity: 24, image: products[7].image, bottleType: 'premium-glass', variety: 'Natural Mineral' },
      ],
      shippingAddress: { name: 'Sourav Das', street: '5 Ballygunge Place', city: 'Kolkata', state: 'West Bengal', pincode: '700019', country: 'India', phone: '+91 65432 10987' },
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      status: 'delivered',
      subtotal: 2880,
      shipping: 0,
      tax: 518,
      total: 3398,
      deliveredAt: new Date('2024-10-23'),
    },
    {
      orderId: '#ORD-9018',
      customer: customers[4]._id,
      items: [
        { product: products[3]._id, name: 'Hydra Home Jar', price: 80, quantity: 5, image: products[3].image, bottleType: 'recycled-glass', variety: 'Purified RO' },
      ],
      shippingAddress: { name: 'Meera Sen', street: '10 Camac Street', city: 'Kolkata', state: 'West Bengal', pincode: '700017', country: 'India', phone: '+91 54321 09876' },
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      status: 'cancelled',
      subtotal: 400,
      shipping: 0,
      tax: 72,
      total: 472,
    },
  ]);
  console.log(`🛒 ${orders.length} orders created`);

  // Create Customization Requests
  const customRequests = await CustomizationRequest.insertMany([
    {
      requestId: 'REQ-00001',
      customer: customers[3]._id,
      companyName: 'TechFlow Solutions Pvt. Ltd.',
      contactEmail: 'sourav.d@tech.in',
      contactPhone: '+91 65432 10987',
      product: '64oz Pro Jug',
      application: 'laser_engrave',
      baseColor: 'Matte Black',
      quantity: 150,
      waterEssence: 'still',
      volume: '1L',
      capFinish: 'stainless',
      status: 'in_review',
      pricePerUnit: 250,
      totalPrice: 37500,
    },
    {
      requestId: 'REQ-00002',
      customer: customers[4]._id,
      companyName: 'Apex Fitness Studio',
      contactEmail: 'meera.s@events.in',
      contactPhone: '+91 54321 09876',
      product: '32oz Tumbler',
      application: 'color_print',
      baseColor: 'Ocean Blue',
      quantity: 200,
      waterEssence: 'alkaline',
      volume: '750ml',
      capFinish: 'sports',
      status: 'awaiting_design',
      pricePerUnit: 180,
      totalPrice: 36000,
    },
    {
      requestId: 'REQ-00003',
      customer: customers[0]._id,
      companyName: 'Iron Core Gym Kolkata',
      contactEmail: 'ananya.c@gmail.com',
      contactPhone: '+91 90123 45678',
      product: '24oz Sport Bottle',
      application: 'color_print',
      baseColor: 'Forest Green',
      quantity: 100,
      waterEssence: 'mineral',
      volume: '500ml',
      capFinish: 'sports',
      status: 'approved',
      pricePerUnit: 150,
      totalPrice: 15000,
    },
  ]);
  console.log(`🎨 ${customRequests.length} customization requests created`);

  // Create Inquiries
  const inquiries = await Inquiry.insertMany([
    {
      name: 'Amit Roy',
      email: 'amit.roy@office.in',
      phone: '+91 98765 11111',
      city: 'Kolkata',
      state: 'West Bengal',
      requirements: 'Need 500 bottles monthly for our office in Salt Lake. Looking for 500ml still water.',
      type: 'bulk',
      source: 'inquiry_form',
      status: 'new',
    },
    {
      name: 'Sunita Ghosh',
      email: 'sunita.g@home.in',
      phone: '+91 98765 22222',
      city: 'Kolkata',
      state: 'West Bengal',
      requirements: 'Home delivery of 20L jars, twice a week for a family of 5 in Behala.',
      type: 'home_delivery',
      source: 'inquiry_form',
      status: 'contacted',
    },
    {
      name: 'Kolkata Events Co.',
      email: 'events@kolkata.in',
      phone: '+91 98765 33333',
      city: 'Kolkata',
      state: 'West Bengal',
      requirements: 'Need 2000 branded bottles for Durga Puja corporate event at Science City.',
      type: 'event',
      source: 'contact_page',
      status: 'new',
    },
  ]);
  console.log(`📋 ${inquiries.length} inquiries created`);

  console.log('\n✅ Database seeded successfully!');
  console.log('📍 Location: Kolkata, West Bengal, India');
  console.log('💰 Currency: INR (₹)');
  console.log('\n🔑 Login credentials:');
  console.log('   Admin: admin@hydradrop.in / admin123');
  console.log('   Customer: ananya.c@gmail.com / customer123');

  process.exit(0);
};

seedDatabase().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
