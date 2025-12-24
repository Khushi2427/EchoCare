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

// 1. MIDDLEWARES (Enhanced CORS for Production)
app.use(cors({
  origin: "*", // Allows requests from Vercel and local dev
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// 2. PRIORITY ROUTES
// Move Message Routes to the top to avoid overlap with community route parameters
app.use("/api/messages", messageRoutes);

// 3. OTHER API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/counsellors", counsellorRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/communities", communityRoutes);

// 4. ADMIN ROUTES
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

// 5. HEALTH CHECK (Placed after routes to avoid catching API calls)
app.get("/", (req, res) => {
  res.send("Mental Wellness Backend Running 🚀");
});

// 6. 404 CATCH-ALL (Optional: helps debug what path actually failed)
app.use((req, res) => {
  console.log(`404 occurred on: ${req.originalUrl}`);
  res.status(404).json({ error: `Route ${req.originalUrl} not found on this server` });
});

export default app;