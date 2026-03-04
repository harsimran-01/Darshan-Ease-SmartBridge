const express = require('express');
const QRCode = require('qrcode');
const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /api/bookings
router.post('/', protect, async (req, res) => {
  try {
    const { templeId, slotId, bookingType = 'regular', isGroupBooking = false, groupSize = 1 } = req.body;
    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    if (slot.isBlocked) return res.status(400).json({ message: 'Slot is blocked' });

    const seatsNeeded = isGroupBooking ? groupSize : 1;
    if (slot.bookedCount + seatsNeeded > slot.maxCapacity) return res.status(400).json({ message: 'Not enough capacity' });

    const booking = await Booking.create({ userId: req.user._id, templeId, slotId, bookingType, isGroupBooking, groupSize });

    // Generate QR code
    const qrData = `DARSHAN-${booking._id}-${bookingType.toUpperCase()}`;
    booking.qrCode = await QRCode.toDataURL(qrData);
    await booking.save();

    // Update slot count
    slot.bookedCount += seatsNeeded;
    await slot.save();

    // Push booking to user
    await User.findByIdAndUpdate(req.user._id, { $push: { bookings: booking._id } });

    // Create notification
    const Notification = require('../models/Notification');
    await Notification.create({
      userId: req.user._id,
      type: 'booking',
      title: 'Booking Confirmed',
      message: `Your ${bookingType} darshan${isGroupBooking ? ` (group of ${groupSize})` : ''} has been booked.`,
    });

    // Emit realtime update
    const io = req.app.get('io');
    io.emit('slotUpdate', slot);
    io.emit('newBooking', { templeId, slotId, bookingType });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/bookings/my
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('templeId', 'name location')
      .populate('slotId', 'date startTime endTime')
      .sort('-createdAt');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/bookings/:id/cancel
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.bookingStatus === 'cancelled') return res.status(400).json({ message: 'Already cancelled' });

    booking.bookingStatus = 'cancelled';
    await booking.save();

    // Decrease slot count
    const slot = await Slot.findById(booking.slotId);
    if (slot) { slot.bookedCount = Math.max(0, slot.bookedCount - 1); await slot.save(); }

    const io = req.app.get('io');
    io.emit('slotUpdate', slot);
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/bookings/:id/reschedule
router.put('/:id/reschedule', protect, async (req, res) => {
  try {
    const { newSlotId } = req.body;
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const newSlot = await Slot.findById(newSlotId);
    if (!newSlot || newSlot.isBlocked || newSlot.bookedCount >= newSlot.maxCapacity) {
      return res.status(400).json({ message: 'New slot unavailable' });
    }

    // Free old slot
    const oldSlot = await Slot.findById(booking.slotId);
    if (oldSlot) { oldSlot.bookedCount = Math.max(0, oldSlot.bookedCount - 1); await oldSlot.save(); }

    // Book new slot
    booking.slotId = newSlotId;
    newSlot.bookedCount += 1;
    await newSlot.save();
    await booking.save();

    const io = req.app.get('io');
    io.emit('slotUpdate', oldSlot);
    io.emit('slotUpdate', newSlot);
    res.json({ message: 'Rescheduled', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
