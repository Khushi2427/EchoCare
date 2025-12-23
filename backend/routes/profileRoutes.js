import express from "express";
import User from "../models/User.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

// ✅ Get logged-in user's profile
router.get("/", verifyUser, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

// ✅ Update profile
router.put("/", verifyUser, async (req, res) => {
  const { name, phone } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone },
    { new: true }
  ).select("-password");

  res.json(updatedUser);
});

export default router;
