import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';  // ✅ Custom CSS for layout & cards

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const userId = 'guest';

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/bookings/${userId}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err.message);
        alert('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [backendURL]); 

  return (
    <div className="dashboard-page">
      <h2>Your Bookings</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="booking-cards">
          {bookings.map((booking, idx) => (
            <div key={idx} className="booking-card">
              <h3>{booking.airline || 'Airline'}</h3>
              <p><strong>Flight No:</strong> {booking.flightNumber}</p>
              <p><strong>From:</strong> {booking.from} → <strong>To:</strong> {booking.to}</p>
              <p><strong>Date:</strong> {booking.flightDate}</p>
              <p><strong>Departure:</strong> {booking.departureTime}</p>
              <p><strong>Arrival:</strong> {booking.arrivalTime}</p>
              <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
