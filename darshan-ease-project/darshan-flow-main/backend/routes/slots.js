const express = require('express');
const Slot = require('../models/Slot');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/slots?templeId=&date=
router.get('/', async (req, res) => {
  try {
    const { templeId, date } = req.query;
    const filter = { isBlocked: false };
    if (templeId) filter.templeId = templeId;
    if (date) filter.date = date;
    const slots = await Slot.find(filter).populate('templeId', 'name');
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/slots (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const slot = await Slot.create(req.body);
    res.status(201).json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/slots/:id (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const slot = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    await slot.save(); // trigger pre-save crowd level calc
    const io = req.app.get('io');
    io.emit('slotUpdate', slot);
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/slots/:id/block (admin - emergency block)
router.put('/:id/block', protect, adminOnly, async (req, res) => {
  try {
    const slot = await Slot.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true });
    const io = req.app.get('io');
    io.emit('slotBlocked', slot);
    res.json({ message: 'Slot blocked', slot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
