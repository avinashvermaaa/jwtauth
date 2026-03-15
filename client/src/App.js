import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import ProtectedRoute from "./ProtectedRoute";

function LoginPage() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const login = async () => {

    try {

      const res = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      navigate("/home");

    } catch(err) {

      alert("Invalid Credentials");
    }
  };

  return (
    <div style={{padding:40}}>

      <h2>Login</h2>

      <input
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={login}>Login</button>

    </div>
  );
}

function Layout() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.clear();

    document.cookie.split(";").forEach(c => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    navigate("/");
  };

  return (
    <div>

      <button onClick={logout}>Logout</button>

      <Routes>

        <Route path="/home" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>

      </Routes>

    </div>
  );
}

export default function App(){

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage/>}/>

        <Route path="/*" element={<Layout/>}/>

      </Routes>

    </BrowserRouter>
  );
}