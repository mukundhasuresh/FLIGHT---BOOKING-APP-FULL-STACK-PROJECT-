import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './BookFlight.css';

const BookFlight = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { flight, from, to, date } = location.state || {};

  const [name, setName] = useState('');
  const [passport, setPassport] = useState('');
  const [email, setEmail] = useState('');

  if (!flight) {
    return <p className="no-flight-msg">No flight selected for booking.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', {
        name,
        passport,
        email,
        flight,
        from,
        to,
        date,
      });

      alert('Booking successful!');
      console.log('Saved booking:', response.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Booking error:', err.message);
      alert('Booking failed!');
    }
  };

  return (
    <div className="book-flight-container">
      <h2>Book Your Flight</h2>

      <div className="flight-summary">
        <p><strong>Flight:</strong> {flight.airline?.name} - {flight.number}</p>
        <p><strong>From:</strong> {from} ➡️ <strong>To:</strong> {to}</p>
        <p><strong>Date:</strong> {date}</p>
        <p>
          <strong>Departure:</strong> {flight.departure?.scheduledTimeLocal || 'N/A'} <br />
          <strong>Arrival:</strong> {flight.arrival?.scheduledTimeLocal || 'N/A'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Passport Number"
          value={passport}
          onChange={(e) => setPassport(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookFlight;
