import React, { useEffect, useState } from "react";
import socket from "../../socket";
import axios from "axios";

const CommunityChat = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const communityId = "global";

  // 1️⃣ Load old messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5002/api/messages/${communityId}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error("Fetch messages error:", err);
      }
    };

    fetchMessages();
  }, []);

  // 2️⃣ Socket listeners
  useEffect(() => {
    socket.emit("joinCommunity", communityId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // 3️⃣ SEND MESSAGE (FINAL FIXED)
  const sendMessage = () => {
    if (!user || !(user._id || user.id)) {
      console.error("User id missing:", user);
      return;
    }

    if (!text.trim()) return;

    socket.emit("sendMessage", {
      senderId: user._id || user.id,   // ✅ FIX
      senderName: user.name || "Anonymous",
      text,
      communityId,
      isAnonymous: false,
    });

    setText("");
  };

  // 4️⃣ Safety render
  if (!user) return <div>Loading user...</div>;

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto border p-3">
        {messages.map((msg, index) => (
          <div key={msg._id || index} className="mb-2">
            <b>{msg.senderName}:</b> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunityChat;
