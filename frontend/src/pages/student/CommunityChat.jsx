import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const CommunityChat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { communityId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // 1️⃣ FETCH OLD MESSAGES
  useEffect(() => {
    if (!communityId) return;

    const fetchMessages = async () => {
      // Abort controller to handle hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      try {
        setLoading(true);
        
        // Use Env Var or hardcoded fallback for absolute certainty
        const apiBase = import.meta.env.VITE_API_URL || "https://echocare-x83y.onrender.com/api";
        const cleanBase = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
        const url = `${cleanBase}/messages/${communityId}`;
    
        console.log("Checking path:", url); 
    
        const res = await axios.get(url, { signal: controller.signal });
        
        // Ensure data is an array before setting
        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.error("Request timed out - Server might be sleeping on Render.");
        } else {
          console.error("API Error:", err.response?.data || err.message);
        }
        setMessages([]); // Fallback to empty list so loader stops
      } finally {
        clearTimeout(timeoutId);
        setLoading(false); // STOP SPINNER
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchMessages();
  }, [communityId]);

  // 2️⃣ SOCKET JOIN / LEAVE
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

  // 3️⃣ SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      token: localStorage.getItem("token"),
      text: text.trim(),
      communityId,
    });

    setText("");
  };

  if (!user) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-slate-400" />
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-xs text-slate-500 italic">Waking up server...</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.senderId === user.id || msg.senderName === user.name;
                
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
                    <div className={cn(
                      "flex max-w-[80%] gap-2",
                      isMe ? "flex-row-reverse" : "flex-row"
                    )}>
                      <Avatar className="h-8 w-8 shrink-0 border border-white shadow-sm">
                        <AvatarFallback className={cn(
                          "text-[10px] font-bold",
                          isMe ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"
                        )}>
                          {msg.senderName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className={cn(
                        "flex flex-col",
                        isMe ? "items-end" : "items-start"
                      )}>
                        <span className="text-[11px] font-bold text-slate-400 mb-1 px-1">
                          {isMe ? "You" : msg.senderName}
                        </span>
                        <div className={cn(
                          "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                          isMe 
                            ? "bg-indigo-600 text-white rounded-tr-none" 
                            : "bg-white text-slate-700 border border-slate-200 rounded-tl-none"
                        )}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
          />
          <Button 
            size="icon" 
            onClick={sendMessage}
            disabled={!text.trim()}
            className={cn(
              "rounded-xl h-10 w-10 transition-all",
              text.trim() ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-300"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;