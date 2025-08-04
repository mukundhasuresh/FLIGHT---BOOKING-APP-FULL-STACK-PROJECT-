const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: String,
  passport: String,
  email: String,
  flight: Object,   
  from: String,
  to: String,
  date: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
