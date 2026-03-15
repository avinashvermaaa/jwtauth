import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHome } from "../../services/user.service";
import "../home/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const data = await getHome();
        setUser(data.user);
      } catch (err) {
        setMessage("Failed to load Home Page");
      } finally {
        setLoading(false);
      }
    };
    loadHome();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderUserFields = (obj) => {
    if (!obj) return null;
    return Object.entries(obj).map(([key, value]) => (
      <div className="user-field" key={key}>
        <span className="user-field-key">{key.replace(/_/g, ' ')}</span>
        {key === 'role' ? (
          <span className={`badge ${value === 'admin' ? 'badge-admin' : 'badge-user'}`}>
            {value}
          </span>
        ) : (
          <span className="user-field-value">
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </span>
        )}
      </div>
    ));
  };

  const greeting = user?.name || user?.username || '';

  return (
    <div className="home-wrapper">
      <nav className="home-navbar">
        <div className="home-nav-brand">JWTAuth</div>
        <div className="home-nav-actions">
          <button className="btn btn-ghost" onClick={() => navigate("/profile")}>
            👤 Profile
          </button>
          <button className="btn btn-ghost" onClick={logout}>
            Sign Out
          </button>
        </div>
      </nav>

      <div className="home-content">
        <div className="home-welcome">
          <h1>Welcome back{greeting ? `, ${greeting}` : ''}!</h1>
          <p>Here's your account information</p>
        </div>

        {loading && (
          <div className="loading-spinner">Loading your data...</div>
        )}

        {message && !loading && (
          <div className="home-error">{message}</div>
        )}

        {user && !loading && (
          <div className="home-card">
            <div className="home-card-title">Account Details</div>
            {renderUserFields(user)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
