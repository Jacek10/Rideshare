import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

function SearchRides() {
  const [query, setQuery] = useState({ from: '', to: '' });
  const [rides, setRides] = useState([]);

  const handleSearch = async () => {
    const res = await API.get(`/rides/search?from=${query.from}&to=${query.to}`);
    setRides(res.data);
  };

  return (
    <div>
      <input placeholder="From" onChange={e => setQuery({ ...query, from: e.target.value })} />
      <input placeholder="To" onChange={e => setQuery({ ...query, to: e.target.value })} />
      <button onClick={handleSearch}>Search</button>

      {rides.map(ride => (
        <div key={ride._id}>
          <p>{ride.from} → {ride.to}</p>
          <p>Seats: {ride.seatsAvailable}</p>
          <p>Price: ₹{ride.price}</p>
          <Link to={`/ride/${ride._id}`}>Book</Link>
        </div>
      ))}
    </div>
  );
}
export default SearchRides;