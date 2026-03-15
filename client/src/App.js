import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import ProtectedRoute from "./ProtectedRoute";

function Layout() {
    
  return (
    <div>

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