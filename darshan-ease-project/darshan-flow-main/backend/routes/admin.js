const express = require('express');
const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/admin/analytics
router.get('/analytics', protect, adminOnly, async (req, res) => {
  try {
    const totalVisitors = await Booking.countDocuments({ bookingStatus: { $ne: 'cancelled' } });
    const today = new Date().toISOString().split('T')[0];
    const todayBookings = await Booking.countDocuments({ createdAt: { $gte: new Date(today) } });
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Slot utilization
    const slots = await Slot.find({ date: today }).populate('templeId', 'name');
    const slotStats = slots.map(s => ({
      temple: s.templeId?.name,
      time: `${s.startTime}-${s.endTime}`,
      utilization: Math.round((s.bookedCount / s.maxCapacity) * 100),
      crowdLevel: s.crowdLevel,
    }));

    res.json({ totalVisitors, todayBookings, totalUsers, slotStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
