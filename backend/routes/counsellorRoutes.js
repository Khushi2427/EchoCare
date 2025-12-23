import express from "express";
import { getAllCounsellors, createCounsellor } from "../controllers/counsellorController.js";
import { registerCounsellor, loginCounsellor } from "../controllers/counsellorController.js";
import { verifyCounsellor } from "../middlewares/authMiddleware.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// GET all counsellors
router.get("/", getAllCounsellors);

// POST new counsellor
router.post("/", createCounsellor);
router.post("/register", registerCounsellor);
router.post("/login", loginCounsellor);
router.get("/dashboard", verifyCounsellor, (req, res) => {
    res.json({ message: `Welcome ${req.counsellor.username}` });
  });
  router.get("/appointments", verifyCounsellor, async (req, res) => {
    try {
      const appointments = await Appointment.find({ counsellor: req.counsellor.id });
      res.json(appointments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch appointments" });
    }
  });
  

export default router;
