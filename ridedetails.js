import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
const RideDetails = () => {
  const { id } = useParams();
  const [ride, setRide] = useState(null);
  const [seats, setSeats] = useState(1);
  const userId = '64f8abc1234567890abcdeff'; // Replace with logged-in user

  useEffect(() => {
    const fetchRide = async () => {
      const res = await API.get(`/rides/${id}`);
      setRide(res.data);
    };
    fetchRide();
  }, [id]);

  const handlePayment = async () => {
    try {
      const orderRes = await API.post('/payment/create-order', {
        amount: ride.price * seats * 100 // amount in paisa
      });
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // from Razorpay dashboard
        amount: orderRes.data.amount,
        currency: 'INR',
        name: 'HopAlong Rideshare',
        description: 'Ride booking payment',
        order_id: orderRes.data.id,
        handler: async function (response) {
          // send to backend for verification
          await API.post('/payment/verify', {
            ...response,
            rideId: id,
            riderId: userId,
            seatsBooked: seats,
          });
          alert('Booking successful!');
        },
        prefill: {
          name: 'Demo User',
          email: 'demo@example.com',
        },
        theme: { color: '#3399cc' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  if (!ride) return <p>Loading...</p>;

  return (
    <div>
      <h2>{ride.from} → {ride.to}</h2>
      <p>Date: {new Date(ride.date).toLocaleDateString()}</p>
      <p>Price per seat: ₹{ride.price}</p>
      <input
        type="number"
        min="1"
        max={ride.seatsAvailable}
        value={seats}
        onChange={(e) => setSeats(parseInt(e.target.value))}
      />
      <button onClick={handlePayment}>Book & Pay ₹{ride.price * seats}</button>
    </div>
  );
};
export default RideDetails;