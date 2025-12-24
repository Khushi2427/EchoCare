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
app.use(cors({
  origin: "*", // Allows requests from Vercel
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// 2. PRIORITY API ROUTES
// We move messages to the VERY TOP to ensure no other route steals the path
app.use("/api/messages", messageRoutes);

// 3. REMAINING API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/counsellors", counsellorRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/admin", adminCounsellorRoutes);
app.use("/api/admin", adminRoutes);

// 4. ADMIN TEST ROUTE
app.get(
    "/api/admin/test",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {
      res.json({ message: "Admin access granted" });
    }
);

// 5. ROOT / HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Mental Wellness Backend Running 🚀");
});

// 6. 404 DEBUGGER (Add this! It will show up in your Render logs)
app.use((req, res) => {
  console.log(`❌ 404 Catch-all triggered for: ${req.originalUrl}`);
  res.status(404).json({ 
    message: `Route ${req.originalUrl} not found on this server.` 
  });
});

export default app;