import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CounsellorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {user.role === "admin" ? "Admin Dashboard" : "Counsellor Dashboard"}
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome, <span className="font-semibold">{user.name}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Resources" value="124" />
        <StatCard title="Active Students" value="532" />
        <StatCard title="Counsellors" value="8" />
        <StatCard title="High Risk Cases" value="14" danger />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Upload Resource */}
        <ActionCard
          title="Upload Resource"
          description="Add PDFs, videos, audios & articles"
          icon="📤"
          onClick={() => navigate("/counsellor/resources/upload")}
        />

        {/* View Resources */}
        <ActionCard
          title="Manage Resources"
          description="Edit or delete uploaded resources"
          icon="📚"
          onClick={() => navigate("/counsellor/resources")}
        />

        {/* Manage Users (Admin only) */}
        {user.role === "admin" && (
          <ActionCard
            title="Manage Users"
            description="Approve counsellors & manage students"
            icon="👥"
            onClick={() => navigate("/counsellor/users")}
          />
        )}

        {/* Sessions */}
        <ActionCard
          title="Sessions"
          description="View upcoming & past counselling sessions"
          icon="📅"
          onClick={() => navigate("/counsellor/appointments")}
        />

        {/* Risk Monitoring */}
        <ActionCard
          title="High-Risk Students"
          description="Monitor students requiring urgent attention"
          icon="⚠️"
          onClick={() => navigate("/counsellor/high-risk")}
        />
      </div>
    </div>
  );
};

export default CounsellorDashboard;

/* ---------------- COMPONENTS ---------------- */

const StatCard = ({ title, value, danger }) => (
  <div
    className={`p-6 rounded-xl shadow bg-white ${
      danger ? "border-l-4 border-red-500" : "border-l-4 border-blue-500"
    }`}
  >
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className={`text-3xl font-bold mt-2 ${danger ? "text-red-500" : "text-gray-800"}`}>
      {value}
    </p>
  </div>
);

const ActionCard = ({ title, description, icon, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer p-6 bg-white rounded-xl shadow hover:shadow-lg transition border"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);
