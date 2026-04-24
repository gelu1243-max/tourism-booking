import React, { useState } from 'react';
import axios from 'axios';
import "./index.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; 
export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password || !form.username) {
    setError("Please fill all fields.");
    return;
  }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    setError("Please enter a valid email address.");
    return;
  }
    if (form.password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }
    try{
    await axios.post(`${API_URL}/users/register`, form);
    alert('Registered successfully!');
    window.location.href = "/login";
  } catch (err) {
    setError('Registration failed. Please try again.');
  }
    
  };
  const login = () => {
    window.location.href = "/login";
  };

  return (
    <main>
      <div className='container'>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})}/><br></br>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/><br></br>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/><br></br>
      <button className='submit'>Register</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <p className="link" onClick={login}>
        Already have an account? Login
      </p>
    </form>
    </div>
    </main>
    
    
    
  );
}
 