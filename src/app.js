import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostRide from './pages/PostRide';
import SearchRides from './pages/SearchRides';
import RideDetails from './pages/RideDetails';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchRides />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post" element={<PostRide />} />
        <Route path="/ride/:id" element={<RideDetails />} />
      </Routes>
    </Router>
  );
}
export default App;