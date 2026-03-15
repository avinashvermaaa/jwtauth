import React, { useEffect, useState } from 'react';

const Home = () => {

  const [user,setUser] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(()=>{

    const fetchHome = async ()=>{

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/home`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setUser(data.user);
    };

    fetchHome();

  },[]);

  return (
    <div>
      <h1>Home</h1>
      {user && <pre>{JSON.stringify(user,null,2)}</pre>}
    </div>
  );
};

export default Home;