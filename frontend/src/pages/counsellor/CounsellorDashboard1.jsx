import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CounsellorDashboard1() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("counsellorToken");

  useEffect(() => {
    if (!token) {
      navigate("/counsellor/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5002/api/counsellors/appointments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, [token, navigate]);

  return (
    <div>
      <h1>Counsellor Dashboard</h1>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a._id}>
              {a.patientName} – {a.date} – {a.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
