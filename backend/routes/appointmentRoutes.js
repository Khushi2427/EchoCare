import express from "express";
import {
  bookAppointment,
  getUserAppointments,
  getCounsellorAppointments,
} from "../controllers/appointmentController.js";
import auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/book", auth, bookAppointment);
router.get("/user", auth, getUserAppointments);
router.get("/counsellor/:id", auth, getCounsellorAppointments);

export default router;
