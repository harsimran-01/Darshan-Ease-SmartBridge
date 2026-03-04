const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  qrCode: { type: String },
  bookingStatus: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
  bookingType: { type: String, enum: ['regular', 'vip', 'senior'], default: 'regular' },
  isGroupBooking: { type: Boolean, default: false },
  groupSize: { type: Number, default: 1, min: 1, max: 50 },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
