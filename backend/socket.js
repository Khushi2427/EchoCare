import { Server } from "socket.io";
import Message from "./models/Message.js";

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

    socket.on("sendMessage", async (data) => {
      try {
        const message = await Message.create(data);
        io.to(data.communityId).emit("receiveMessage", message);
      } catch (err) {
        console.error("Socket message error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  });
};
