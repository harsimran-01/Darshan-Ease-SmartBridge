const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  maxCapacity: { type: Number, required: true },
  bookedCount: { type: Number, default: 0 },
  crowdLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

// Auto-calculate crowd level
slotSchema.pre('save', function (next) {
  const ratio = this.bookedCount / this.maxCapacity;
  if (ratio < 0.5) this.crowdLevel = 'low';
  else if (ratio < 0.8) this.crowdLevel = 'medium';
  else this.crowdLevel = 'high';
  next();
});

module.exports = mongoose.model('Slot', slotSchema);
