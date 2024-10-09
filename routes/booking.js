const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Ensure correct path

// Route to handle booking submissions
router.post('/', async (req, res) => {
  const { address, patients } = req.body;

  // Validate the required fields
  if (!address || !patients || patients.length === 0) {
    return res.status(400).json({ message: 'Address and patient details are required' });
  }

  try {
    const newBooking = new Booking({ address, patients });
    await newBooking.save();
    res.status(201).json({ message: 'Booking saved successfully', newBooking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
