const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
  templeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  name: { type: String, required: true },
  totalSpots: { type: Number, required: true },
  occupiedSpots: { type: Number, default: 0 },
  types: [{ type: String }], // Car, Bike, Bus, Accessible
}, { timestamps: true });

module.exports = mongoose.model('Parking', parkingSchema);
