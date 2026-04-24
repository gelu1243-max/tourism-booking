import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  PlusCircle, MapPin, DollarSign, ImageIcon, Search, Palmtree, 
  Globe, Trash2, Loader2, ArrowLeft, AlertCircle 
} from "lucide-react";

const AdminPage = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({ name: "", description: "", price: "", imageURL: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tours/");
      setDestinations(res.data);
    } catch (err) {
      console.error("Error fetching destinations", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/tours/destination", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Destination added!");
      setForm({ name: "", description: "", price: "", imageURL: "" });
      fetchDestinations();
    } catch (err) {
      alert("Error adding destination.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDestinations();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="bg-white border-b px-5 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => window.location.href = "/landing"} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft size={20} className="text-slate-500" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white"><Globe size={22} /></div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">Admin Panel</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        
        {/* --- FIXED STATS SECTION (Corrected Number Position) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Active Tours Card */}
          <div className="relative bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="relative bg-blue-100 p-4 rounded-2xl text-blue-600"><Palmtree size={28}/></div>
            <div className=" relativeflex flex-col">
              <p className=" absolute mt-5 text-2xl font-black  text-slate-900">{destinations.length}</p>
              <p className="absolute text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Tours</p>
            </div>
          </div>
          {/* Confirmed Sales Card */}
          <div className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className="bg-green-100 p-4 rounded-2xl text-green-600"><DollarSign size={28}/></div>
            <div className="flex flex-col">
              <p className=" absolute mt-5 text-2xl font-black leading-tight text-slate-900">12</p>
              <p className=" absolute text-slate-400 text-[10px] font-black uppercase tracking-widest">Confirmed Sales</p>
            </div>
          </div>
          {/* Action Needed Card */}
          <div className="bg-orange-50 p-6 rounded-[30px] shadow-sm border border-orange-100 flex items-center gap-6">
            <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><AlertCircle size={28}/></div>
            <div className="flex flex-col">
              <p className=" absolute mt-5 text-2xl font-black  text-orange-900 uppercase tracking-widest">4</p>
              <p className=" absolute text-orange-400  text-[10px] font-black uppercase tracking-widest">Action Needed</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: FORM */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-50 sticky top-32">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">Create Trip</h2>
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <input placeholder="Name" required className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input placeholder="Price" type="number" required className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
                <input placeholder="Image URL" required className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold" value={form.imageURL} onChange={e => setForm({...form, imageURL: e.target.value})} />
                <textarea placeholder="Description" rows="3" required className="w-full p-4 bg-slate-50 rounded-2xl border-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl">
                  {loading ? "Publishing..." : "Publish Destination"}
                </button>
              </form>
            </div>
          </div>

          {/* --- RIGHT: CATALOG (Fixed Overlap Issue) --- */}
          <div className="lg:col-span-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-black tracking-tight">Active Catalog</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-4 top-3 text-slate-300" size={18} />
                <input placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold" onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>

            {fetching ? (
              <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-blue-600" /></div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {filteredDestinations.map((dest) => (
                  <div key={dest.id} className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl">
                    {/* Image Area */}
                    <div className="h-64 w-full relative">
                      <img src={dest.imageURL} alt={dest.name} className="w-full h-full object-cover" />
                    </div>

                    {/* --- TEXT CONTENT AREA (Guaranteed NO Overlap) --- */}
                    <div className="p-8 flex flex-col items-start gap-3 bg-white">
                      <div className="flex justify-between w-full items-start">
                        <div>
                          <h3 className="text-2xl font-black text-slate-800 leading-tight">{dest.name}</h3>
                          <p className="text-blue-600 font-bold text-sm mt-1">${dest.price} / person</p>
                        </div>
                        <h2>{dest.name}</h2>
                        <p className="text-slate-500  leading-relaxed mt-2 flex-grow display: block">
                        {dest.description}
                      </p><br></br>   
                        <button onClick={() => handleDelete(dest.id)} className="p-2 hover:bg-red-100 rounded-full transition">
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                      
                      {/* Description - Clearly below the title */}
                      
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPage;