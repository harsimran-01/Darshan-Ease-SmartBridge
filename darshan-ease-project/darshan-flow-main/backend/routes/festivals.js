const express = require('express');
const Festival = require('../models/Festival');
const Slot = require('../models/Slot');
const Notification = require('../models/Notification');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/festivals
router.get('/', async (req, res) => {
  try {
    const festivals = await Festival.find().populate('templeId', 'name').sort('date');
    res.json(festivals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/festivals (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const festival = await Festival.create(req.body);
    res.status(201).json(festival);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/festivals/:id/activate (admin - toggle festival mode)
router.put('/:id/activate', protect, adminOnly, async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival) return res.status(404).json({ message: 'Festival not found' });

    festival.festivalMode = !festival.festivalMode;
    festival.status = festival.festivalMode ? 'active' : 'upcoming';
    await festival.save();

    // If activating, increase slot capacities for the temple
    if (festival.festivalMode && festival.additionalCapacity > 0) {
      await Slot.updateMany(
        { templeId: festival.templeId, date: festival.date },
        { $inc: { maxCapacity: festival.additionalCapacity } }
      );
    }

    // Broadcast notification
    const io = req.app.get('io');
    const notification = await Notification.create({
      type: 'info',
      title: festival.festivalMode ? '🎉 Festival Mode Activated' : 'Festival Mode Deactivated',
      message: `${festival.name} - ${festival.festivalMode ? 'Extended hours and increased capacity are now active!' : 'Normal operations resumed.'}`,
      global: true,
    });
    io.emit('notification', notification);
    io.emit('festivalUpdate', festival);

    res.json({ message: `Festival mode ${festival.festivalMode ? 'activated' : 'deactivated'}`, festival });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
