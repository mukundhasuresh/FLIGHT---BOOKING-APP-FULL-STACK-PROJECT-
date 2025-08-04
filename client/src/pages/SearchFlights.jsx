import { useState } from 'react';

const SearchFlights = () => {
  const [form, setForm] = useState({ from: '', to: '', date: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = e => {
    e.preventDefault();
    alert(`Searching flights from ${form.from} to ${form.to} on ${form.date}`);
  };

  return (
    <div className="form-container">
      <h2>Book Your Flight</h2>
      <form onSubmit={handleSearch}>
        <input type="text" name="from" placeholder="From (City or Airport)" onChange={handleChange} required />
        <input type="text" name="to" placeholder="To (City or Airport)" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <button type="submit">Search Flights</button>
      </form>
    </div>
  );
};

export default SearchFlights;
