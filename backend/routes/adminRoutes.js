import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import User from "../models/User.js";
import {verifyAdmin}  from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/analytics/users-per-day", verifyAdmin, async (req, res) => {
    try {
      const analytics = await User.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      res.json(analytics);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
