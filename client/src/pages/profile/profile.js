import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/user.service";
import "../profile/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
    
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
        setMessage(data.message);
      } catch (err) {
        setMessage("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const getInitial = (u) => {
    if (!u) return "G";
    const name = u.name || u.username || u.useremail || "Guest";
    return name.charAt(0).toUpperCase();
  };

  const renderFields = (obj) => {
    if (!obj) return null;
    const hidden = ['password', '__v'];
    return Object.entries(obj)
      .filter(([key]) => !hidden.includes(key))
      .map(([key, value]) => (
        <div className="profile-field" key={key}>
          <span className="profile-field-key">{key.replace(/_/g, ' ')}</span>
          <span className="profile-field-value">
            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
          </span>
        </div>
      ));
  };

  const isError = message === "Failed to load profile";

  return (
    <div className="profile-wrapper">
      <nav className="profile-navbar">
        <div className="profile-nav-brand">JWTAuth</div>
        <div className="profile-nav-actions">        
           <button className="btn btn-ghost" onClick={() => navigate("/home")}>
              ← Home
               </button>
              <button className="btn btn-ghost" onClick={logout}>
                Sign Out
              </button>        
        </div>
      </nav>

      <div className="profile-content">
        {loading && (
          <div className="loading-spinner">Loading your profile...</div>
        )}

        {!loading && (
          <>
            <div className="profile-header-card">
              <div className="profile-avatar">{getInitial(user)}</div>
              <div className="profile-name">{user?.name || user?.username || "User"}</div>
              <div className="profile-email">{user?.email || ""}</div>
              {user?.role && (
                <span className="profile-role-badge">{user.role}</span>
              )}
            </div>

            {message && !isError && (
              <div className="profile-message">✓ {message}</div>
            )}
            {isError && (
              <div className="profile-error">{message}</div>
            )}

            {user && (
              <div className="profile-details-card">
                <div className="profile-card-title">Account Information</div>
                {renderFields(user)}
              </div>
            )}

          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
