import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../../socket";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, ArrowLeft, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CommunityChat = () => {
  /* ================= USER ================= */
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const userId = user?.id || user?._id;

  /* ================= ROUTER ================= */
  const { communityId } = useParams();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ================= FETCH MESSAGES ================= */
  useEffect(() => {
    if (!communityId) return;

    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiBase = import.meta.env.VITE_API_URL;
        const url = `${apiBase}/api/messages/${communityId}`;

        console.log("API URL:", url);

        const res = await axios.get(url, {
          signal: controller.signal,
        });

        console.log("Messages received:", res.data.length);

        setMessages(res.data || []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError("Failed to load messages");
      } finally {
        setLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchMessages();

    return () => controller.abort();
  }, [communityId, scrollToBottom]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!communityId) return;

    console.log("Joining socket room:", communityId);
    socket.emit("joinCommunity", communityId);

    const onReceive = (msg) => {
      if (msg.communityId !== communityId) return;

      setMessages((prev) =>
        prev.some((m) => m._id === msg._id) ? prev : [...prev, msg]
      );

      setTimeout(scrollToBottom, 50);
    };

    socket.on("receiveMessage", onReceive);

    return () => {
      socket.emit("leaveCommunity", communityId);
      socket.off("receiveMessage", onReceive);
    };
  }, [communityId, scrollToBottom]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = useCallback(() => {
    if (!text.trim() || !userId) return;

    const optimisticId = `temp-${Date.now()}`;

    const optimisticMsg = {
      _id: optimisticId,
      senderId: userId,
      senderName: user.name,
      text,
      communityId,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setText("");
    scrollToBottom();

    socket.emit("sendMessage", {
      token: localStorage.getItem("token"),
      text,
      communityId,
    });
  }, [text, userId, communityId, scrollToBottom, user.name]);

  /* ================= GUARD ================= */
  if (!userId) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div className="flex flex-col h-full border rounded-xl bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft />
        </Button>
        <h3 className="font-semibold">Community Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <AnimatePresence>
            {messages.map((msg) => {
              const isMe = msg.senderId === userId;

              return (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "mb-3 flex",
                    isMe ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2 rounded-xl max-w-[70%]",
                      isMe
                        ? "bg-indigo-600 text-white"
                        : "bg-white border"
                    )}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default CommunityChat;
