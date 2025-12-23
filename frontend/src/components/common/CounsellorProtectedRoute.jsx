import { Navigate } from "react-router-dom";

const CounsellorProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("counsellorToken");

  if (!token) {
    return <Navigate to="/counsellor/login" replace />;
  }

  return children;
};

export default CounsellorProtectedRoute;
