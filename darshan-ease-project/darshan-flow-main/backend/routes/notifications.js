const express = require('express');
const Notification = require('../models/Notification');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/notifications (user's notifications)
router.get('/', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [{ userId: req.user._id }, { global: true }]
    }).sort('-createdAt').limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/notifications/:id/read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/notifications/read-all
router.put('/read-all', protect, async (req, res) => {
  try {
    await Notification.updateMany(
      { $or: [{ userId: req.user._id }, { global: true }] },
      { read: true }
    );
    res.json({ message: 'All marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/notifications/broadcast (admin - emergency/global alerts)
router.post('/broadcast', protect, adminOnly, async (req, res) => {
  try {
    const { type, title, message } = req.body;
    const notification = await Notification.create({ type, title, message, global: true });
    const io = req.app.get('io');
    io.emit('notification', notification);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
