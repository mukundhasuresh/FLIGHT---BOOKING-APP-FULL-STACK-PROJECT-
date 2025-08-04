import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSearch.css'; 

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

const HeroSearch = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const fromCode = cityToIATA[fromCity.trim().toLowerCase()];
    const toCode = cityToIATA[toCity.trim().toLowerCase()];

    if (!fromCode || !toCode) {
      alert('Please enter valid cities (e.g., London, Paris, Tokyo)');
      return;
    }

    navigate(`/results?from=${fromCode}&to=${toCode}&date=${date}`);
  };

  return (
    <div className="hero-container">
      <h1>Find Your Flight</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="From (e.g., London)"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="To (e.g., Paris)"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Search Flights</button>
      </form>

      <footer className="hero-footer">
        © {new Date().getFullYear()} SKYHIGH - Mukundha S. All rights reserved.
      </footer>
    </div>
  );
};

export default HeroSearch;
