const express = require('express');
const Parking = require('../models/Parking');
const router = express.Router();

// GET /api/parking?templeId=
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.templeId) filter.templeId = req.query.templeId;
    const lots = await Parking.find(filter).populate('templeId', 'name');
    res.json(lots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/parking/:id (update occupancy — used by IoT/admin)
router.put('/:id', async (req, res) => {
  try {
    const lot = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const io = req.app.get('io');
    io.emit('parkingUpdate', lot);
    res.json(lot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
