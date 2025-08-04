const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();


router.get('/', async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Missing from or to parameters' });
  }

  const options = {
    method: 'GET',
    url: `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${from}`,
    params: {
      direction: 'Departure',          
      withLeg: 'true',
      withCancelled: 'false',
      withCodeshared: 'false',
      withCargo: 'false',
      withPrivate: 'false',
      withLocation: 'false',
      offsetMinutes: '0',
      durationMinutes: '720'         
    },
    headers: {
      'x-rapidapi-host': 'aerodatabox.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDAPI_KEY
    }
  };

  console.log('🔎 Requesting from AeroDataBox API:');
  console.log('URL:', options.url);
  console.log('Params:', options.params);

  try {
    const response = await axios.request(options);
    const departures = response.data.departures || [];


    const filteredFlights = departures.filter(flight =>
      flight.arrival?.airport?.iata === to
    );

    console.log(`✅ Found ${filteredFlights.length} flights from ${from} to ${to}`);

    res.json({ data: filteredFlights });
  } catch (err) {
    console.error('❌ API fetch error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch flight data from AeroDataBox.' });
  }
});

module.exports = router;
