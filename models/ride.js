const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  from: String,
  to: String,
  date: Date,
  seatsAvailable: Number,
  price: Number,
  bookings: [{
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seatsBooked: Number,
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
  }]
});
module.exports = mongoose.model('Ride', RideSchema);