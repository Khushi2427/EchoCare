import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { initSocket } from "./socket.js";

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    // ✅ Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB Connected");

    // ✅ Create HTTP server
    const server = http.createServer(app);

    // ✅ Initialize Socket.IO
    initSocket(server);

    // ✅ Start server
    server.listen(PORT, () => {
      console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
