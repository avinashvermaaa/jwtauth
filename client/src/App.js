import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import ProtectedRoute from "./ProtectedRoute";

function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    navigate("/");
  };

  return (
    <div>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>

      <Routes>
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/*" element={<Layout />} />

      </Routes>

    </BrowserRouter>
  );
}