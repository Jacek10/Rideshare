
const express = require('express');
const router = express.Router();
const Ride = require('../models/ride');
// Post a new ride (driver)
router.post('/', async (req, res) => {
  const ride = new Ride(req.body);
  await ride.save();
  res.send({ message: 'Ride created', ride });
});
// Search for rides (rider)
router.get('/search', async (req, res) => {
  const { from, to } = req.query;
  const rides = await Ride.find({ from, to });
  res.send(rides);
});
module.exports = router;