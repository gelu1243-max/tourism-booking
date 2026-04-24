import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, ArrowLeft, CheckCircle, Info } from "lucide-react";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    // Fetch destination details based on your tourRoutes.get("/:id")
    axios.get(`${API_URL}/tours/${id}`)
      .then(res => setDestination(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    // Check if logged in
    if (!token) {
      alert("Please login first");
      return navigate("/login");
    }

    setLoading(true);
    try {
      // Decode user ID from token (simple version: assuming your backend provides it or extracts it)
      // We send the data structure expected by your createBooking controller
      const bookingData = {
        destinationId: id,
        startDate: form.startDate,
        endDate: form.endDate,
        userId: 1 // This is usually extracted from the token by your backend middleware
      };

      await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Booking Successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Booking failed"));
    } finally {
      setLoading(false);
    }
  };

  if (!destination) return <div className="p-20 text-center animate-pulse">Loading Trip Information...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 font-bold text-slate-500 hover:text-blue-600">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image & Info */}
          <div>
            <img src={destination.imageURL} alt="" className="w-full h-96 object-cover rounded-[40px] shadow-2xl" />
            <h1 className="text-4xl font-black mt-8 text-slate-800">{destination.name}</h1>
            <p className="text-slate-500 mt-4 leading-relaxed">{destination.description}</p>
          </div>

          {/* Booking Form */}
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 h-fit">
            <h2 className="text-2xl font-black mb-6">Select Travel Dates</h2>
            <form onSubmit={handleBooking} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 ml-1">Start Date</label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-4 top-4 text-blue-500" size={18} />
                    <input 
                      type="date" required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold"
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-400 ml-1">End Date</label>
                  <div className="relative mt-2">
                    <Calendar className="absolute left-4 top-4 text-blue-500" size={18} />
                    <input 
                      type="date" required
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 font-bold"
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 text-blue-700 text-sm">
                <Info size={20} />
                <p>Your booking will be confirmed immediately. Please ensure your travel dates are correct.</p>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 transition active:scale-95 flex items-center justify-center gap-3"
              >
                {loading ? "Processing..." : "Confirm My Trip"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;