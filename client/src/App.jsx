import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SearchResults from './pages/SearchResults';
import BookFlight from './pages/BookFlight';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/book" element={<BookFlight />} />
      </Routes>
    </Router>
  );
}

export default App;
