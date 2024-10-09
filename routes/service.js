const express = require('express');
const router = express.Router();
const Service = require('../models/Service');  // Import the Service model
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Save with a unique name
  }
});

const upload = multer({ storage });

// POST route for submitting service form with file uploads
router.post('/submit', upload.array('documents'), async (req, res) => {
  const { name, degree, address, address2, city, state, zip, serviceCategory } = req.body;

  // Validate required fields
  if (!name || !degree || !address || !city || !zip) {
    return res.status(400).json({
      message: "Please fill all required fields: name, degree, address, city, and zip."
    });
  }

  // Get uploaded document paths (if any)
  const documents = req.files ? req.files.map(file => file.path) : [];

  try {
    // Create a new service submission
    const newService = new Service({
      name,
      degree,
      address,
      address2,
      city,
      state,
      zip,
      serviceCategory,
      documents,  // Save document paths to MongoDB
    });

    // Save the submission to the database
    await newService.save();

    res.status(201).json({ msg: 'Service submitted successfully', newService });
  } catch (err) {
    console.error('Error saving submission:', err);  // Log detailed error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route for retrieving all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find(); // Retrieve all service submissions
    if (services.length === 0) {
      return res.status(404).json({ message: "No services available." });
    }
    res.json(services); // Send the retrieved services
  } catch (err) {
    console.error('Error fetching services:', err);  // Log detailed error
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
