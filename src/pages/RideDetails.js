import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRideDetails();
  }, [id]);

  const fetchRideDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/rides/${id}`);
      setRide(response.data);
    } catch (error) {
      console.error('Error fetching ride details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookRide = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to book a ride');
        navigate('/login');
        return;
      }

      const response = await axios.post(`http://localhost:5000/api/payment/create-order`, {
        rideId: id,
        amount: ride.price
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const options = {
        key: 'rzp_test_YOUR_KEY', // Replace with your Razorpay test key
        amount: response.data.amount,
        currency: response.data.currency,
        name: 'RideShare',
        description: `Booking ride from ${ride.from} to ${ride.to}`,
        order_id: response.data.id,
        handler: function (response) {
          alert('Payment successful!');
          navigate('/');
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com'
        },
        theme: {
          color: '#007bff'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert('Failed to book ride');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (!ride) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Ride not found</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h2>Ride Details</h2>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '5px' }}>
        <h3>{ride.from} → {ride.to}</h3>
        <p><strong>Date:</strong> {new Date(ride.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {ride.time}</p>
        <p><strong>Price:</strong> ₹{ride.price}</p>
        <p><strong>Available Seats:</strong> {ride.seats}</p>
        {ride.description && (
          <p><strong>Description:</strong> {ride.description}</p>
        )}
        <p><strong>Posted by:</strong> {ride.user?.name || 'Unknown'}</p>
        
        <button 
          onClick={handleBookRide}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Book This Ride
        </button>
      </div>
    </div>
  );
}

export default RideDetails; 