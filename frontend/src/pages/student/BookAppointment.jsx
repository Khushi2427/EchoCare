import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookAppointment } from "../../services/appointmentService";

const BookAppointment = () => {
  const { counsellorId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [meetingType, setMeetingType] = useState("call");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookAppointment({
        counsellorId,
        date,
        timeSlot,
        meetingType,
      });
      alert("Appointment booked!");
      navigate("/student/appointments");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>

      <input
        type="date"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <select
        required
        value={timeSlot}
        onChange={(e) => setTimeSlot(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="">Select Time Slot</option>
        <option value="10:00 - 10:30">10:00 - 10:30</option>
        <option value="11:00 - 11:30">11:00 - 11:30</option>
        <option value="16:00 - 16:30">4:00 - 4:30</option>
      </select>

      <button className="w-full bg-purple-600 text-white py-2 rounded">
        Book Appointment
      </button>
    </form>
  );
};

export default BookAppointment;
