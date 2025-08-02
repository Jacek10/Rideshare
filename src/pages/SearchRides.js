import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SearchRides() {
  const [rides, setRides] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rides');
      setRides(response.data);
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/rides/search?from=${from}&to=${to}&date=${date}`);
      setRides(response.data);
    } catch (error) {
      console.error('Error searching rides:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Find Rides</h1>
        <div>
          <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: '#007bff' }}>Login</Link>
          <Link to="/post" style={{ textDecoration: 'none', color: '#007bff' }}>Post a Ride</Link>
        </div>
      </div>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Search
        </button>
      </form>

      <div>
        <h2>Available Rides</h2>
        {rides.map((ride) => (
          <div key={ride._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
            <h3>{ride.from} → {ride.to}</h3>
            <p>Date: {new Date(ride.date).toLocaleDateString()}</p>
            <p>Time: {ride.time}</p>
            <p>Price: ₹{ride.price}</p>
            <p>Seats: {ride.seats}</p>
            <Link to={`/ride/${ride._id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchRides; 