import React from "react";
import { useEffect, useState } from "react";
import { getUserAppointments } from "../../services/appointmentService";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getUserAppointments().then((res) =>
      setAppointments(res.data)
    );
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">My Appointments</h2>

      {appointments.map((a) => (
  <div
    key={a._id}
    className="border p-4 rounded mb-3 bg-white"
  >
    <p>
      <b>Counsellor:</b>{" "}
      {a.counsellorId?.name || "Counsellor Removed"}
    </p>

    <p><b>Date:</b> {a.date}</p>
    <p><b>Time:</b> {a.timeSlot}</p>
    <p><b>Status:</b> {a.status}</p>

    {a.counsellorId?.phone && (
      <a
        href={`tel:${a.counsellorId.phone}`}
        className="inline-block mt-2 text-green-600 font-medium"
      >
        📞 Call Counsellor
      </a>
    )}
  </div>
))}

    </div>
  );
};

export default MyAppointments;
