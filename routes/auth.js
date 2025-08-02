const express = require('express');
const router = express.Router();
const User = require('../models/user');
// Simple signup
router.post('/signup', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: 'User registered' });
});
// Simple login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email, password: req.body.password });
  if (!user) return res.status(401).send('Invalid credentials');
  res.send({ message: 'Login successful', user });
});
module.exports = router;