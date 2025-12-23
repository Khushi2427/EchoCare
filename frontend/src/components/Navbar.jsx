import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import React from "react";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="font-bold">Mental Wellness System</h1>

      <div className="flex items-center gap-4">
        <span>{user.name} ({user.role})</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
