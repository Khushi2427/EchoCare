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

// 1. CORRECTED CORS MIDDLEWARE
// Allow your specific frontend origin with proper headers
app.use(cors({
  origin: "https://echo-care-omega.vercel.app", // Your exact frontend URL
  credentials: true, // Allow cookies/auth tokens
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Accept", "Origin", "X-Requested-With"],
  exposedHeaders: ["Content-Range", "X-Content-Range"], // If you need these
  maxAge: 86400, // Cache preflight requests for 24 hours
}));

// Explicitly handle OPTIONS (preflight) requests
app.options("*", cors());

app.use(express.json());

// 2. PRIORITY API ROUTES
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

// 5. ROOT / HEALTH CHECK (Important for Render uptime)
app.get("/", (req, res) => {
  res.json({ 
    status: "OK", 
    service: "Mental Wellness Backend API",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 6. Health check endpoint for monitoring (Helps with cold starts)
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// 7. 404 DEBUGGER
app.use((req, res) => {
  console.log(`❌ 404 Catch-all triggered for: ${req.originalUrl}`);
  console.log(`Method: ${req.method}, Headers:`, req.headers);
  res.status(404).json({ 
    message: `Route ${req.originalUrl} not found on this server.`,
    availableRoutes: [
      "/api/messages/:communityId",
      "/api/auth/*",
      "/api/communities/*"
    ]
  });
});

// 8. Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  
  // Handle CORS errors specifically
  if (err.name === 'CorsError') {
    return res.status(403).json({
      message: "CORS error: Request blocked",
      detail: err.message
    });
  }
  
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;