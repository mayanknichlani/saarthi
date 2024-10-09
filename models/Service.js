const mongoose = require('mongoose');

// Define the service schema
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: '', // Optional field
  },
  zip: {
    type: String,
    required: true,
  },
  serviceCategory: {
    type: String,
    required: true,
  },
  documents: {
    type: [String], // Array of strings for file paths
    default: [],
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the Service model
const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
