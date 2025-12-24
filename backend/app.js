import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import roleMiddleware from "./middlewares/roleMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import counsellorRoutes from "./routes/counsellorRoutes.js";
import adminCounsellorRoutes from "./routes/adminCounsellorRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// 1. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2. API ROUTES (Grouped for clarity)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/counsellors", counsellorRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/communities", communityRoutes);

// Messages route - ensure this is visible
app.use("/api/messages", messageRoutes);

// Admin routes
app.get(
    "/api/admin/test",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {
      res.json({ message: "Admin access granted" });
    }
);
app.use("/api/admin", adminCounsellorRoutes);
app.use("/api/admin", adminRoutes);

// 3. FALLBACK / HEALTH CHECK (Always at the bottom)
app.get("/", (req, res) => {
  res.send("Mental Wellness Backend Running 🚀");
});

export default app;