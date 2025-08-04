import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Added
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const date = searchParams.get('date');

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/api/flights', {
          params: { from, to, date },
        });
        const allFlights = response.data.data || [];
        setFlights(allFlights);
      } catch (err) {
        console.error('Backend fetch error:', err.message);
        setError('Failed to fetch flight data from server.');
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    if (from && to && date) {
      fetchFlights();
    }
  }, [from, to, date]);

  const handleBookNow = (flight) => {
    navigate('/book', { state: { flight, from, to, date } });
  };

  return (
    <div className="results-page">
      <h2>
        Flights from <strong>{from}</strong> to <strong>{to}</strong> on <strong>{date}</strong>
      </h2>

      {loading && <p>Loading flights...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && flights.length === 0 && <p>No flights found.</p>}

      {!loading && !error &&
        flights.map((flight, idx) => (
          <div key={idx} className="flight-card">
            <div className="flight-info">
              <h3>{flight.airline?.name || 'Unknown Airline'}</h3>
              <p>Flight: {flight.number || 'N/A'}</p>
              <p>
                Departure: {flight.departure?.scheduledTimeLocal || 'N/A'} — 
                Arrival: {flight.arrival?.scheduledTimeLocal || 'N/A'}
              </p>
              <p>Status: {flight.status || 'N/A'}</p>
            </div>
            <button onClick={() => handleBookNow(flight)}>Book Now</button>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
