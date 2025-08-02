const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const razorpay = require('./razorpay');
const Ride = require('../models/ride');

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating Razorpay order');
  }
});

router.post('/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, rideId, riderId, seatsBooked } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).send({ error: 'Invalid payment signature' });
  }

  const ride = await Ride.findById(rideId);
  if (!ride || ride.seatsAvailable < seatsBooked) {
    return res.status(400).send({ error: 'Ride not available or insufficient seats' });
  }

  ride.bookings.push({ rider: riderId, seatsBooked });
  ride.seatsAvailable -= seatsBooked;
  await ride.save();

  res.send({ message: 'Payment verified & booking confirmed' });
});

module.exports = router;