const mongoose = require('mongoose');

const ServiceFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  serviceCategory: {
    type: String,
    // required: true,
  },
  documents: [{
    type: String, // You can store the file URLs or paths here
  }],
}, { timestamps: true });

module.exports = mongoose.model('ServiceForm', ServiceFormSchema);
