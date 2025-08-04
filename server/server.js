// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();  // ✅ Load environment variables

const app = express();       // ✅ Initialize app FIRST

// Middlewares
app.use(cors());
app.use(express.json());

// Routers
const authRoutes = require('./routes/auth');
const flightsRouter = require('./routes/flights');
const bookingsRouter = require('./routes/bookings');

// Route Handlers (AFTER app is initialized)
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightsRouter);
app.use('/api/bookings', bookingsRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => console.error('MongoDB connection error:', err));
