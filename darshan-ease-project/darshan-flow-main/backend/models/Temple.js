const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  entryGates: { type: Number, default: 1 },
  parkingInfo: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema);
