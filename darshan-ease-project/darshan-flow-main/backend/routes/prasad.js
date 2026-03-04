const express = require('express');
const PrasadOrder = require('../models/PrasadOrder');
const { protect } = require('../middleware/auth');
const router = express.Router();

// POST /api/prasad
router.post('/', protect, async (req, res) => {
  try {
    const { templeId, items, deliveryMode, deliveryAddress } = req.body;
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = await PrasadOrder.create({
      userId: req.user._id, templeId, items, totalAmount, deliveryMode, deliveryAddress,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/prasad/my
router.get('/my', protect, async (req, res) => {
  try {
    const orders = await PrasadOrder.find({ userId: req.user._id })
      .populate('templeId', 'name')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/prasad/:id/status (admin)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const order = await PrasadOrder.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
