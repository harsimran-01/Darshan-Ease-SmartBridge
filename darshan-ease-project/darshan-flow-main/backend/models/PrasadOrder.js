const mongoose = require('mongoose');

const prasadOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  deliveryMode: { type: String, enum: ['pickup', 'deliver'], default: 'pickup' },
  deliveryAddress: { type: String },
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('PrasadOrder', prasadOrderSchema);
