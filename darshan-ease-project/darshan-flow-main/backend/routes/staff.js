const express = require('express');
const StaffAllocation = require('../models/StaffAllocation');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/staff?templeId=
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const filter = {};
    if (req.query.templeId) filter.templeId = req.query.templeId;
    const staff = await StaffAllocation.find(filter).populate('templeId', 'name');
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/staff (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const staff = await StaffAllocation.create(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/staff/:id (admin - update status/zone)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const staff = await StaffAllocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    const io = req.app.get('io');
    io.emit('staffUpdate', staff);
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/staff/:id (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await StaffAllocation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Staff removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
