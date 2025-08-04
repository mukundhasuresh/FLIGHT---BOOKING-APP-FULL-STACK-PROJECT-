const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');


router.post('/', async (req, res) => {
  const {
    userId,         
    flightNumber,
    airline,
    departureTime,
    arrivalTime,
    from,
    to,
    flightDate
  } = req.body;

  try {
    const booking = new Booking({
      userId: userId || 'guest',
      flightNumber,
      airline,
      departureTime,
      arrivalTime,
      from,
      to,
      flightDate,
      createdAt: new Date()
    });

    await booking.save();
    res.status(201).json({ msg: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Booking failed', error: err.message });
  }
});


router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching bookings', error: err.message });
  }
});

module.exports = router;  
