import express from "express";
import bcrypt from "bcryptjs";
import Counsellor from "../models/Counsellor.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

/**
 * ✅ GET ALL COUNSELLORS (Admin)
 */
router.get("/counsellors", verifyAdmin, async (req, res) => {
  try {
    const counsellors = await Counsellor.find().select("-password");
    res.json(counsellors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch counsellors" });
  }
});

/**
 * ✅ CREATE COUNSELLOR (FULL DATA)
 */
router.post("/counsellors", verifyAdmin, async (req, res) => {
  try {
    const {
      name,
      username,
      password,
      specialization,
      phone,
      email,
      availability,
    } = req.body;

    // basic validation
    if (
      !name ||
      !username ||
      !password ||
      !specialization ||
      !phone ||
      !email
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Counsellor.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const counsellor = new Counsellor({
      name,
      username,
      password: hashedPassword,
      specialization,
      phone,
      email,
      availability,
      role: "counsellor",
      isActive: true,
    });

    await counsellor.save();

    res.status(201).json({ message: "Counsellor created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create counsellor" });
  }
});

/**
 * ✅ DELETE COUNSELLOR
 */
router.delete("/counsellors/:id", verifyAdmin, async (req, res) => {
  try {
    await Counsellor.findByIdAndDelete(req.params.id);
    res.json({ message: "Counsellor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete counsellor" });
  }
});

export default router;
