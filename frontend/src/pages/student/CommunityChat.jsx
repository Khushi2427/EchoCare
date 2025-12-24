import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../../socket";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, ArrowLeft, AlertCircle } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CommunityChat = () => {
  // 1. Get User Data safely
  const user = useMemo(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("User parse error", err);
      return null;
    }
  }, []);

  const { communityId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // 2. Fetch Messages with clear Loading state management
  useEffect(() => {
    if (!communityId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiBase = "https://echocare-x83y.onrender.com";
        const url = `${apiBase}/api/messages/${communityId}`;
        
        const res = await axios.get(url, { timeout: 15000 });
        
        if (Array.isArray(res.data)) {
          setMessages(res.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.status === 404 ? "Chat not found" : "Connection slow. Retrying...");
      } finally {
        setLoading(false);
        // Small delay to allow DOM to render before scrolling
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchMessages();
  }, [communityId, scrollToBottom]);

  // 3. Socket Connection
  useEffect(() => {
    if (!communityId) return;

    socket.emit("joinCommunity", communityId);

    const handleReceiveMessage = (message) => {
      if (message.communityId === communityId) {
        setMessages((prev) => {
          // Prevent duplicate messages if socket emits twice
          if (prev.find(m => m._id === message._id)) return prev;
          return [...prev, message];
        });
        setTimeout(scrollToBottom, 50);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.emit("leaveCommunity", communityId);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [communityId, scrollToBottom]);

  // 4. Send Message Logic
  const sendMessage = async () => {
    if (!text.trim() || !user) return;

    const messageData = {
      token: localStorage.getItem("token"),
      text: text.trim(),
      communityId,
    };

    socket.emit("sendMessage", messageData);
    setText("");
  };

  if (!user) return <div className="p-10 text-center">Please login again.</div>;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-white">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="font-semibold text-slate-800">Community Chat</h3>
          <p className="text-[10px] text-indigo-500 font-medium tracking-tight uppercase">Live Connection Active</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-2" />
            <p className="text-xs text-slate-400">Loading conversation...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            {messages.map((msg, index) => {
              // Ensure we check against user.id or user._id correctly
              const isMe = msg.senderId === (user.id || user._id);
              
              return (
                <motion.div
                  key={msg._id || index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}
                >
                  <div className={cn("flex max-w-[85%] gap-2", isMe ? "flex-row-reverse" : "flex-row")}>
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className={isMe ? "bg-indigo-600 text-white text-[10px]" : "bg-slate-200 text-[10px]"}>
                        {msg.senderName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                      <span className="text-[10px] text-slate-400 mb-0.5 px-1">{isMe ? "You" : msg.senderName}</span>
                      <div className={cn(
                        "px-3 py-2 rounded-2xl text-sm",
                        isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-700 rounded-tl-none"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Write a message..."
            className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button 
            size="icon" 
            onClick={sendMessage}
            disabled={!text.trim()}
            className={cn("rounded-xl h-9 w-9", text.trim() ? "bg-indigo-600" : "bg-slate-300")}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;