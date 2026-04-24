import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Recommended way to navigate
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // If no token, redirect to login
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`${API_URL}/bookings/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Ensure we are setting an array even if backend returns null
        setBookings(res.data.bookings || []);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate("/landing")} 
          className="flex items-center gap-2 text-slate-500 font-bold mb-6 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>
        
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900">My Travel Dashboard</h1>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-400">You haven't booked any trips yet.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                {/* Ensure property names match your Backend Model */}
                <img 
                  src={item.Destination?.imageURL || "https://via.placeholder.com/150"} 
                  alt={item.Destination?.name} 
                  className="w-full md:w-48 h-32 object-cover rounded-2xl bg-slate-200" 
                />
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-black text-slate-800">
                    {item.Destination?.name || "Unknown Destination"}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                    <span className="text-slate-500 font-bold text-sm">
                      From: {new Date(item.startDate).toLocaleDateString()}
                    </span>
                    <span className="text-slate-500 font-bold text-sm">
                      To: {new Date(item.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <span className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-black text-xs">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;