import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import CommunityChat from "./models/CommunityChat.js";
import User from "./models/User.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://echo-care-omega.vercel.app",
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    /* ===============================
       JOIN COMMUNITY ROOM
    =============================== */
    socket.on("joinCommunity", (communityId) => {
      if (!communityId) {
        console.error("No communityId provided for joinCommunity");
        return;
      }

      socket.join(communityId);
      console.log(`${socket.id} joined community: ${communityId}`);
    });

    /* ===============================
       SEND MESSAGE
    =============================== */
    socket.on("sendMessage", async ({ token, text, communityId }) => {
      try {
        if (!token) {
          socket.emit("error", { message: "Authentication required" });
          return;
        }

        if (!text || !text.trim()) {
          socket.emit("error", { message: "Message cannot be empty" });
          return;
        }

        if (!communityId) {
          socket.emit("error", { message: "Community ID required" });
          return;
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await User.findById(decoded.id).select("name avatar");

        if (!user) {
          socket.emit("error", { message: "User not found" });
          return;
        }

        /* ===============================
           SAVE MESSAGE IN DATABASE
        =============================== */
        const message = await CommunityChat.create({
          senderId: user._id,
          senderName: user.name,
          senderAvatar: user.avatar,
          text: text.trim(),
          communityId,
          isAnonymous: false,
        });

        const populatedMessage = await CommunityChat.findById(message._id)
          .select("-__v")
          .lean();

        console.log(
          `Message sent to community ${communityId} by ${user.name}`
        );

        /* ===============================
           BROADCAST MESSAGE
        =============================== */
        io.to(communityId).emit("receiveMessage", populatedMessage);

        // confirmation for sender
        socket.emit("messageSent", {
          success: true,
          message: populatedMessage,
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
            details: err.message,
          });
        }
      }
    });

    /* ===============================
       CLIENT ERROR HANDLING
    =============================== */
    socket.on("error", (error) => {
      console.error("Client-side error:", error);
    });

    /* ===============================
       HEARTBEAT (OPTIONAL)
    =============================== */
    socket.on("ping", () => {
      socket.emit("pong", { timestamp: Date.now() });
    });

    /* ===============================
       LEAVE COMMUNITY
    =============================== */
    socket.on("leaveCommunity", (communityId) => {
      if (communityId) {
        socket.leave(communityId);
        console.log(`${socket.id} left community: ${communityId}`);
      }
    });

    /* ===============================
       DISCONNECT
    =============================== */
    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", socket.id, "Reason:", reason);
    });
  });

  /* ===============================
     GLOBAL SOCKET ERROR
  =============================== */
  io.engine.on("connection_error", (err) => {
    console.error("Socket.io connection error:", err);
  });

  return io;
};