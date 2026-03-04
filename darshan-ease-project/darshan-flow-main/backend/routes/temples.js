const express = require('express');
const Temple = require('../models/Temple');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// GET /api/temples
router.get('/', async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/temples/:id
router.get('/:id', async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/temples (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const temple = await Temple.create(req.body);
    res.status(201).json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/temples/:id (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/temples/:id (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Temple.findByIdAndDelete(req.params.id);
    res.json({ message: 'Temple deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
