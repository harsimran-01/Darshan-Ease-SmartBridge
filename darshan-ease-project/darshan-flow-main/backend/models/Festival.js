const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  expectedCrowd: { type: Number, required: true },
  specialSlots: { type: Number, default: 0 },
  status: { type: String, enum: ['upcoming', 'active', 'completed'], default: 'upcoming' },
  festivalMode: { type: Boolean, default: false },
  extendedHours: { startTime: String, endTime: String },
  additionalCapacity: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Festival', festivalSchema);
