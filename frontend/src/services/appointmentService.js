import axios from "../utils/axios"; // your axios instance

export const bookAppointment = (data) =>
  axios.post("/appointments/book", data);

export const getUserAppointments = () =>
  axios.get("/appointments/user");

export const getCounsellorAppointments = (id) =>
  axios.get(`/appointments/counsellor/${id}`);
