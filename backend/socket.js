import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "./models/Message.js";
import User from "./models/User.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://echo-care-omega.vercel.app",
      methods: ["GET", "POST"],
      credentials: true, // ✅ Allow cookies/auth headers
      allowedHeaders: ["Content-Type", "Authorization"], // ✅ Explicitly allow headers
    },
    transports: ["websocket", "polling"], // ✅ Ensure both transports work
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinCommunity", (communityId) => {
      if (!communityId) {
        console.error("No communityId provided for joinCommunity");
        return;
      }
      socket.join(communityId);
      console.log(`${socket.id} joined community: ${communityId}`);
    });

    socket.on("sendMessage", async ({ token, text, communityId }) => {
      try {
        if (!token) {
          console.error("Token missing");
          socket.emit("error", { message: "Authentication required" });
          return;
        }

        if (!text || !text.trim()) {
          console.error("Message text is empty");
          socket.emit("error", { message: "Message cannot be empty" });
          return;
        }

        if (!communityId) {
          console.error("Community ID missing");
          socket.emit("error", { message: "Community ID required" });
          return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.id).select("name avatar");
        
        if (!user) {
          console.error("User not found");
          socket.emit("error", { message: "User not found" });
          return;
        }

        const message = await Message.create({
          senderId: user._id,
          senderName: user.name,
          senderAvatar: user.avatar,
          text: text.trim(),
          communityId,
          isAnonymous: false,
        });

        // Populate the message for better frontend display
        const populatedMessage = await Message.findById(message._id)
          .select("-__v")
          .lean();

        console.log(`Message sent to community ${communityId} by ${user.name}`);
        
        // Emit to all in the community room
        io.to(communityId).emit("receiveMessage", populatedMessage);

        // ✅ Also emit back to sender for confirmation
        socket.emit("messageSent", { 
          success: true, 
          message: populatedMessage 
        });

      } catch (err) {
        console.error("Socket message error:", err.message);
        
        if (err.name === "JsonWebTokenError") {
          socket.emit("error", { message: "Invalid token" });
        } else if (err.name === "TokenExpiredError") {
          socket.emit("error", { message: "Token expired" });
        } else {
          socket.emit("error", { 
            message: "Failed to send message", 
            details: err.message 
          });
        }
      }
    });

    // ✅ Add error handling for frontend
    socket.on("error", (error) => {
      console.error("Client-side error:", error);
    });

    // ✅ Add heartbeat/ping for connection monitoring
    socket.on("ping", () => {
      socket.emit("pong", { timestamp: Date.now() });
    });

    // ✅ Handle leaving community
    socket.on("leaveCommunity", (communityId) => {
      if (communityId) {
        socket.leave(communityId);
        console.log(`${socket.id} left community: ${communityId}`);
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", socket.id, "Reason:", reason);
    });
  });

  // ✅ Add global error handling
  io.engine.on("connection_error", (err) => {
    console.error("Socket.io connection error:", err);
  });

  return io;
};