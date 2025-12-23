import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET CURRENT LOGGED IN USER
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

export default router;
