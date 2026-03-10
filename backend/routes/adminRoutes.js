import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import User from "../models/User.js";
import {verifyAdmin}  from "../middlewares/authMiddleware.js";
import FlaggedStudent from "../models/FlaggedStudent.js";

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

  router.get("/flagged-students", async (req, res) => {
    const students = await FlaggedStudent.find({ status: "pending" })
      .populate("userId", "name email role")   // 👈 fetch user info
      .sort({ createdAt: -1 });
  
    res.json(students);
  });
  
  // remove after support
  router.delete("/flagged-students/:id", async (req, res) => {
    await FlaggedStudent.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from flagged list" });
  });

export default router;
