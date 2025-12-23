import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Profile from "./pages/student/Profile";
import ProtectedRoute from "./components/common/ProtectedRoute";

import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import CounsellorDashboard1 from "./pages/counsellor/CounsellorDashboard";
import Unauthorized from "./pages/Unauthorized";

import AdminResourceUpload from "./pages/admin/ResourceUpload";
import CounsellorResourceUpload from "./pages/counsellor/ResourceUpload";
import StudentResources from "./pages/student/Resources";
import AdminResources from "./pages/admin/AdminResources";
import BookAppointment from "./pages/student/BookAppointment";
import MyAppointments from "./pages/student/MyAppointments";
import CounsellorAppointments from "./pages/counsellor/Appointments";
import CounsellorList from "./pages/student/CounsellorList";
import CounsellorLogin from "./pages/auth/CounsellorLogin";
import CounsellorProtectedRoute from "./components/common/CounsellorProtectedRoute";
import AdminCounsellors from "./pages/admin/AdminCounsellors";
import AIChatbot from "./pages/ai/AIChatbot";
import Communities from "./pages/student/Communities";
import CommunityChat from "./pages/student/CommunityChat";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (<>
  <Toaster richColors position="top-center" closeButton />
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/counsellor/login" element={<CounsellorLogin />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/resources/upload"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminResourceUpload />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/resources" element={<AdminResources />} />
      <Route
  path="/admin/counsellors"
  element={
    <ProtectedRoute roles={["admin"]}>
      <AdminCounsellors />
    </ProtectedRoute>
  }
/>



      {/* Student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute roles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
          path="/student/ai-chat"
          element={
            <ProtectedRoute roles={["student"]}>
              <AIChatbot />
            </ProtectedRoute>
          }
        />
      <Route
        path="/student/resources"
        element={
          <ProtectedRoute roles={["student"]}>
            <StudentResources />
          </ProtectedRoute>
        }
      />
<Route
  path="/student/counsellors"
  element={<CounsellorList />}
/>
<Route path="/student/book/:counsellorId" element={<BookAppointment />} />
<Route path="/student/appointments" element={<MyAppointments />} />

<Route
  path="/student/profile"
  element={
    <ProtectedRoute roles={["student"]}>
      <Profile />
    </ProtectedRoute>
  }
/>

{/* COMMUNITY CONNECT */}
<Route
  path="/student/communities"
  element={
    <ProtectedRoute roles={["student"]}>
      <Communities />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/communities/:communityId"
  element={
    <ProtectedRoute roles={["student"]}>
      <CommunityChat />
    </ProtectedRoute>
  }
/>

      {/* Counsellor */}
      <Route
  path="/counsellor"
  element={
    <CounsellorProtectedRoute>
      <CounsellorDashboard1 />
    </CounsellorProtectedRoute>
  }
/>
      <Route
        path="/counsellor/resources/upload"
        element={
          <ProtectedRoute roles={["counsellor"]}>
            <CounsellorResourceUpload />
          </ProtectedRoute>
        }
      />
      <Route path="/counsellor/appointments" element={<CounsellorAppointments />} />

      {/* Unauthorized / 404 */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Unauthorized />} />
    </Routes></>
  );
}

export default App;
