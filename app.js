const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/rides');
// Commenting out payment route to skip Razorpay integration for now
// const paymentRoutes = require('./routes/payment');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, () => console.log('MongoDB connected'));

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
// app.use('/api/payment', paymentRoutes);
app.listen(5000, () => console.log('Server running on port 5000'));