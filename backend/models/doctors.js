// doctor.js

const mongoose = require('mongoose');

// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availability: [Boolean],
  role: String,
  patients: [{ name: String, bookedSlot: Number }],
});

// Create and export the Doctor model
module.exports = mongoose.model('Doctor', doctorSchema);
