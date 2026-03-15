import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { getProfile } from "../../services/user.service";
import "../profile/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
        setMessage(data.message);

      } catch (err) {
        setMessage("Failed to load profile");
      }
    };
    loadProfile();
  }, []);


  return (
    <>
      <h2>Profile Page</h2>
      <p>{message}</p>

      <pre className='profile-msg'>{JSON.stringify(user, null, 2)}</pre>
      <button className="home-btn" onClick={() => navigate("/home")}>
        Go to Home
      </button>
    </>
  );
};

export default Profile;