import React, { useState } from "react";
import axios from "axios";
import "./index.css";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; 
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const res = await axios.post(`${API_URL}/users/login`, form, {
          headers: { "Content-Type": "application/json" },
        });

        // 1. Log the response to see EXACTLY what the DB sent
    console.log("Response Data:", res.data);

    const { token, user } = res.data;
    
    // 2. Save token once (applies to both admin and user)
    localStorage.setItem("token", token);

    // 3. Check role safely (using toLowerCase() to ignore case issues)
    const userRole = user.role ? user.role.toLowerCase() : "";

    if (userRole === "admin") {
      alert("Logged in as admin!");
      window.location.href = "/AdminPage";
    } else {
      alert("Logged in!");
      window.location.href = "/landing";
    }

  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    alert("Login failed: " + (err.response?.data?.message || "Check your credentials"));
  }
};
  const signup = () => {
    window.location.href = "/register";
  };

  return (
    <main>
       <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br></br>
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /><br></br>
      <button type="submit">Login</button><br></br>
      <p className="link" onClick={signup}>Create Account</p>
    </form>
    </div>
    </main>
     
    
      
    
    
    
  );
}
