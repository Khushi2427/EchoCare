import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

// Shadcn UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const CommunityChat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { communityId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);

  // ✅ Correct auto-scroll for shadcn ScrollArea
  const scrollToBottom = () => {
    if (!scrollRef.current) return;

    const viewport = scrollRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    );

    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };

  // 1️⃣ Fetch old messages
  useEffect(() => {
    if (!communityId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/messages/${communityId}`
        );
        setMessages(res.data);
        setTimeout(scrollToBottom, 150);
      } catch (err) {
        console.error("Fetch messages error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [communityId]);

  // 2️⃣ Socket join / receive
  useEffect(() => {
    if (!communityId) return;

    socket.emit("joinCommunity", communityId);

    const handleReceiveMessage = (message) => {
      if (message.communityId === communityId) {
        setMessages((prev) => [...prev, message]);
        setTimeout(scrollToBottom, 50);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.emit("leaveCommunity", communityId);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [communityId]);

  // 3️⃣ Send message
  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      token: localStorage.getItem("token"),
      text,
      communityId,
    });

    setText("");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4 bg-slate-50/50">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              // ✅ FIXED isMe logic
              const isMe =
                msg.senderId === user.id || msg.senderName === user.name;

              return (
                <motion.div
                  key={msg._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex w-full mb-4",
                    isMe ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex max-w-[80%] gap-2",
                      isMe ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback
                        className={cn(
                          "text-[10px] font-bold",
                          isMe
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-200 text-slate-600"
                        )}
                      >
                        {msg.senderName?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={cn(
                        "flex flex-col",
                        isMe ? "items-end" : "items-start"
                      )}
                    >
                      <span className="text-[11px] text-slate-400 mb-1 px-1">
                        {isMe ? "You" : msg.senderName}
                      </span>
                      <div
                        className={cn(
                          "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                          isMe
                            ? "bg-indigo-600 text-white rounded-tr-none"
                            : "bg-white text-slate-700 border rounded-tl-none"
                        )}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2 bg-slate-100 p-2 rounded-2xl">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="border-none bg-transparent"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!text.trim()}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
