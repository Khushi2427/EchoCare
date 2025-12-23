import { io } from "socket.io-client";

const socket = io("http://localhost:5002", {
  auth: {
    token: localStorage.getItem("token")
  }
});

export default socket;
