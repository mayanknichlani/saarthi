const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    diagnosis: { type: String }
  });
  
  const AddressSchema = new mongoose.Schema({
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  });
  
  const BookingSchema = new mongoose.Schema({
    address: { type: AddressSchema, required: true },
    patients: [PatientSchema]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Booking', BookingSchema);
  
