import { io } from "socket.io-client";

// Access the environment variable using import.meta.env
const socket = io(import.meta.env.VITE_BASE_URL, {
  auth: {
    token: localStorage.getItem("token")
  },
  // Optional: good practice to specify transports to avoid CORS issues in some environments
  transports: ['websocket'] 
});

export default socket;