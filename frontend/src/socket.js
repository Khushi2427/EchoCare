import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_URL, {
  autoConnect: false,      // VERY IMPORTANT
  transports: ["websocket"],
});

export default socket;
