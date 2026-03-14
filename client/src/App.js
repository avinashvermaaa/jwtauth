import React, { useState } from "react";
import axios from "axios";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  
  const API_URL = process.env.REACT_APP_API_URL;

  const login = async () => {

  try {

    const res = await axios.post(`${API_URL}/login`, {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    alert("Login success");

  } catch (err) {
    alert("Login failed: " + err.response?.data?.message);
  }
  };

  const getProfile = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setData(JSON.stringify(res.data));
  };

  return (
    <div style={{padding:40}}>
        ${API_URL}
      <h2>JWT Auth Demo</h2>

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

      <br/><br/>

      <button onClick={getProfile}>Get Protected Data</button>

      <p>{data}</p>
    </div>
  );
}

export default App;