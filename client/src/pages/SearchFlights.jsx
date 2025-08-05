import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const cityToIATA = {
  london: 'LHR',
  paris: 'CDG',
  'new york': 'JFK',
  tokyo: 'HND',
  delhi: 'DEL',
  mumbai: 'BOM',
  toronto: 'YYZ',
  dubai: 'DXB',
  singapore: 'SIN',
  sydney: 'SYD',
};

const SearchFlights = () => {
  const [form, setForm] = useState({ from: '', to: '', date: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = e => {
    e.preventDefault();

    const fromCode = cityToIATA[form.from.trim().toLowerCase()];
    const toCode = cityToIATA[form.to.trim().toLowerCase()];

    if (!fromCode || !toCode) {
      alert('Please enter valid cities (e.g., London, Paris, Tokyo)');
      return;
    }

    // Navigate to results with query params
    navigate(`/results?from=${fromCode}&to=${toCode}&date=${form.date}`);
  };

  return (
    <div className="form-container">
      <h2>Book Your Flight</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="from"
          placeholder="From (City or Airport)"
          value={form.from}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="to"
          placeholder="To (City or Airport)"
          value={form.to}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Search Flights</button>
      </form>
    </div>
  );
};

export default SearchFlights;
