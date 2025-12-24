import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "./models/Message.js";
import User from "./models/User.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinCommunity", (communityId) => {
      socket.join(communityId);
    });

    socket.on("sendMessage", async ({ token, text, communityId }) => {
      try {
        if (!token) {
          console.error("Token missing");
          return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("name");

        if (!user) {
          console.error("User not found");
          return;
        }

        const message = await Message.create({
          senderId: user._id,
          senderName: user.name,
          text,
          communityId,
          isAnonymous: false,
        });

        io.to(communityId).emit("receiveMessage", message);
      } catch (err) {
        console.error("Socket message error:", err.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
