import React, { useState } from 'react';
import API from '../services/api';
function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'rider' });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/signup', formData);
    alert('User signed up!');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setFormData({ ...formData, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
      <select onChange={e => setFormData({ ...formData, role: e.target.value })}>
        <option value="rider">Rider</option>
        <option value="driver">Driver</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
}
export default Signup;