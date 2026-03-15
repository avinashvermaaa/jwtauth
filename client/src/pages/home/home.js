import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHome } from "../../services/user.service";
import "../home/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await getHome();
        setUser(data.user);

      } catch (err) {
        setMessage("Failed to load Home Page");
      }
    };
    loadHome();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      {message}
      <pre className='user-json'>{JSON.stringify(user, null, 2)}</pre>
      <button className='profile-btn' onClick={() => navigate("/profile")}>
        Go to Profile
      </button>
    </div>
  );
};

export default Home;