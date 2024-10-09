const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path for file handling
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth.js');
const serviceRoutes = require('./routes/service.js'); // Import the service route
const Booking = require('./models/Booking'); // Ensure you import your Booking model
const Service = require('./models/Service'); // Ensure you import your Service model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Support URL-encoded bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/service', serviceRoutes); // Use the service route

// Route for fetching service data by ID
app.get('/api/service/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service data:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for handling service form submissions with files
app.post("/api/service/submit", async (req, res) => {
  console.log('Request Body:', req.body); // Log the complete request body
  console.log('Uploaded Files:', req.files); // Log uploaded files

  const { name, degree, age, address1, address2, city, state, zip, serviceCategory } = req.body;
  console.log({ name, degree, age, address1, address2, city, state, zip, serviceCategory });

  // Validate required fields
  if (!name || !degree || !age || !address1 || !city || !zip) {
    return res.status(400).json({
      message: "Please fill all required fields: name, degree, age, address, city, and zip."
    });
  }

  try {
    const newService = new Service({
      name,
      degree,
      age,
      address1,
      address2,
      city,
      state,
      zip,
      serviceCategory,
    });

    await newService.save();

    res.status(201).json({ msg: 'Service submitted successfully', newService });
  } catch (err) {
    console.error('Error saving submission:', err.message); // Detailed error logging
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Route to handle booking submissions
app.post('/api/bookings', async (req, res) => {
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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
