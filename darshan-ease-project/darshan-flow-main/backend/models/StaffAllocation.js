const mongoose = require('mongoose');

const staffAllocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  zone: { type: String, required: true },
  shift: { type: String, required: true },
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  status: { type: String, enum: ['on-duty', 'off-duty', 'break'], default: 'off-duty' },
  phone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('StaffAllocation', staffAllocationSchema);
