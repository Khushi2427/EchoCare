import React from "react";
import { useEffect, useState } from "react";
import { getCounsellorAppointments } from "../../services/appointmentService";
import { useAuth } from "../../context/AuthContext";

const CounsellorAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getCounsellorAppointments(user.id).then((res) =>
      setAppointments(res.data)
    );
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">My Bookings</h2>

      {appointments.map((a) => (
        <div key={a._id} className="border p-4 mb-3">
          <p><b>User:</b> {a.userId.name}</p>
          <p><b>Email:</b> {a.userId.email}</p>
          <p><b>Date:</b> {a.date}</p>
          <p><b>Time:</b> {a.timeSlot}</p>
        </div>
      ))}
    </div>
  );
};

export default CounsellorAppointments;
