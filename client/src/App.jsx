import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import LandingPage from '../components/Landingp'; // Renamed for clarity
import UserDashboard from '../components/Dashboard'; // Renamed and Capitalized
import AdminPage from '../components/AdminPage';
import BookingPage from '../components/booking';
import PrivateRoute from '../utils/PrivateRoute';
import '../components/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/landing" element={<PrivateRoute><LandingPage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/AdminPage" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        <Route path="/booking/:id" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}


export default App;