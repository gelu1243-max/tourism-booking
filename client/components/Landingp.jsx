import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  MapPin, 
  ArrowRight, 
  Loader2, 
  Menu, 
  X, 
  User, 
  Globe, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck 
} from "lucide-react";
import AutoSlider from "./AutoSlider"; 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; 
const LandingPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Auth State from LocalStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Make sure your login saves this!

  // 1. Handle Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Fetch Destinations from Backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${API_URL}/tours/`);
        setDestinations(res.data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // 3. Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-x-hidden">
      
      {/* --- DYNAMIC NAVIGATION BAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-xl py-3" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => window.location.href = "/"}
          >
            <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
              <Globe size={28} />
            </div>
            <span className={`text-2xl font-black tracking-tighter ${scrolled ? "text-slate-900" : "text-white"}`}>
              ETHIO<span className="text-blue-500">TRAVEL</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-8 font-bold text-xs uppercase tracking-[0.2em] ${
            scrolled ? "text-slate-600" : "text-white/90"
          }`}>
            <a href="/" className="hover:text-blue-500 transition">Home</a>
            <a href="#destinations" className="hover:text-blue-500 transition">Destinations</a>
            
            {token ? (
              <div className="flex items-center gap-6 border-l pl-8 border-slate-300/30">
                <a href="/dashboard" className="flex items-center gap-2 hover:text-blue-500 transition">
                  <LayoutDashboard size={18} /> Dashboard
                </a>
                
                {userRole?.toLowerCase() === "admin" && (
                  <a href="/AdminPage" className="text-orange-500 hover:text-orange-400 flex items-center gap-2 transition">
                    <ShieldCheck size={18} /> Admin
                  </a>
                )}

                <button 
                  onClick={handleLogout}
                  className="bg-red-500/10 text-red-500 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <a href="/login" className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition shadow-2xl shadow-blue-600/20 active:scale-95">
                <User size={18} /> Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} className="text-slate-900"/> : <Menu size={32} className={scrolled ? "text-slate-900" : "text-white"}/>}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl p-8 flex flex-col gap-6 md:hidden border-t border-slate-100 animate-in fade-in zoom-in duration-300">
            <a href="/" className="font-black text-slate-800 text-2xl">Home</a>
            <a href="#destinations" className="font-black text-slate-800 text-2xl">Destinations</a>
            {token ? (
              <>
                <div className="font-black text-blue-600 text-2xl cursor-pointer" onClick={() => window.location.href = "/dashboard"}>My Dashboard</div>
                {userRole?.toLowerCase() === "admin" && (
                  <a href="/AdminPage" className="font-black text-orange-500 text-2xl">Admin Panel</a>
                )}
                <button onClick={handleLogout} className="bg-red-500 text-white text-center py-5 rounded-3xl font-black text-xl">Logout Account</button>
              </>
            ) : (
              <a href="/login" className="bg-blue-600 text-white text-center py-5 rounded-3xl font-black text-xl">Sign In</a>
            )}
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[750px] w-full overflow-hidden bg-slate-900">
        <AutoSlider />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-slate-50 flex flex-col items-center justify-center text-white p-6 text-center z-10">
          <h1 className="text-12xl md:text-14xl font-black leading-none mb-6 drop-shadow-2xl tracking-tighter uppercase italic">
            Discover <br/> <span className="text-blue-500">Ethiopia</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl text-slate-200 font-medium leading-relaxed drop-shadow-lg">
            Experience the land of origins. From the peak of the Simien Mountains 
            to the volcanic wonders of the Danakil Depression.
          </p>
          <a 
            href="#destinations" 
            className="mt-12 bg-white text-slate-900 px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-2xl hover:-translate-y-2"
          >
            Start Your Journey
          </a>
        </div>
      </section>

      {/* --- DESTINATIONS GRID --- */}
      <section id="destinations" className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter">Explore Tours</h2>
            <div className="h-2 w-32 bg-blue-600 mt-4 rounded-full mx-auto md:ml-0"></div>
          </div>
          <p className="text-slate-500 max-w-md font-medium text-lg italic">
            "The world is a book, and those who do not travel read only one page."
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={50} />
            <p className="text-slate-400 font-bold uppercase tracking-widest">Loading Destinations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {destinations.map((dest) => (
              <div 
                key={dest.id} 
                className="group bg-white rounded-[50px] shadow-2xl shadow-slate-200/60 overflow-hidden flex flex-col hover:-translate-y-6 transition-all duration-700 border border-slate-100"
              >
                {/* LARGER IMAGE CONTAINER */}
                <div className="relative h-[600px] w-full overflow-hidden">
                  <img 
                    src={dest.imageURL} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] " 
                  />
                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl shadow-xl">
                    <span className="text-slate-400 text-xs font-black uppercase block">Price</span>
                    <span className="text-2xl font-black text-blue-600">${dest.price}</span>
                  </div>
                  {/* Category Overlay */}
                  <div className="absolute top-8 right-8 bg-blue-600/80 backdrop-blur-sm text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                    Featured
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-12 flex flex-col flex-grow">
                  
                  <h3 className="text-4xl font-black text-blue-600 mb-6 tracking-tight z-20">
                    {dest.name}
                  </h3>
                  
                  <p className="text-slate-500 text-lg leading-relaxed line-clamp-3 mb-10">
                    {dest.description}
                  </p>
                  
                  <button 
                    onClick={() => window.location.href=`/booking/${dest.id}`}
                    className="mt-auto w-full bg-slate-900 text-white py-6 rounded-3xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 shadow-xl active:scale-95"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- PREMIUM FOOTER --- */}
      
    </div>
  );
};

export default LandingPage;