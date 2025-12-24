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

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/resources", resourceRoutes);

app.use("/api/appointments", appointmentRoutes);
app.use("/api/counsellors", counsellorRoutes);
app.get(
    "/api/admin/test",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {
      res.json({ message: "Admin access granted" });
    }
  );
  app.use("/api/admin", adminCounsellorRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/communities", communityRoutes);
app.get("/", (req, res) => {
  res.send("Mental Wellness Backend Running 🚀");
});
// Test route to check messages
app.get('/api/debug/messages/:communityId', async (req, res) => {
  try {
    const messages = await Message.find({ communityId: req.params.communityId })
      .populate('senderId', 'name email')
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json({
      count: messages.length,
      messages: messages.map(m => ({
        _id: m._id,
        content: m.content,
        communityId: m.communityId,
        sender: m.senderId,
        createdAt: m.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use("/api/messages", messageRoutes);

app.use("/api/admin", adminRoutes);

export default app;