import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../../socket";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, ArrowLeft } from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CommunityChat = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { communityId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // 1️⃣ FETCH OLD MESSAGES
  useEffect(() => {
    if (!communityId) {
      setError("No community ID provided");
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      console.log("Fetching messages for community:", communityId);
      
      try {
        setLoading(true);
        setError(null);
        
        // Direct API URL - no env variables for debugging
        const apiBase = "https://echocare-x83y.onrender.com";
        const url = `${apiBase}/api/messages/${communityId}`;
        
        console.log("API URL:", url);
        
        const res = await axios.get(url, { 
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
          }
        });
        
        console.log("Response status:", res.status);
        console.log("Messages received:", res.data.length);
        
        if (!Array.isArray(res.data)) {
          console.error("Response data is not an array:", res.data);
          setMessages([]);
        } else {
          setMessages(res.data);
        }
        
      } catch (err) {
        console.error("Fetch error:", err);
        
        if (err.response?.status === 404) {
          setError("Community not found or no messages yet");
        } else if (err.code === 'ECONNABORTED') {
          setError("Server is taking too long to respond. Try again in a moment.");
        } else {
          setError("Failed to load messages. Please try again.");
        }
        
        setMessages([]);
      } finally {
        setLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchMessages();
  }, [communityId]);

  // 2️⃣ SOCKET JOIN / LEAVE
  useEffect(() => {
    if (!communityId || error) return;

    console.log("Joining socket room:", communityId);
    socket.emit("joinCommunity", communityId);

    const handleReceiveMessage = (message) => {
      console.log("New message received:", message);
      if (message.communityId === communityId) {
        setMessages((prev) => [...prev, message]);
        setTimeout(scrollToBottom, 50);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      console.log("Leaving socket room:", communityId);
      socket.emit("leaveCommunity", communityId);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [communityId, error]);

  // 3️⃣ SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim()) return;

    const messageData = {
      token: localStorage.getItem("token"),
      text: text.trim(),
      communityId,
    };

    console.log("Sending message:", messageData);
    socket.emit("sendMessage", messageData);

    // Optimistically add message to UI
    const optimisticMessage = {
      _id: Date.now().toString(), // Temporary ID
      senderId: user.id,
      senderName: user.name,
      text: text.trim(),
      communityId,
      createdAt: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, optimisticMessage]);
    setText("");
    setTimeout(scrollToBottom, 50);
  };

  if (!user) return (
    <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin text-slate-400" />
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-white">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="font-semibold text-slate-800">Community Chat</h3>
          <p className="text-xs text-slate-500">
            ID: {communityId?.substring(0, 8)}...
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-xs text-slate-500 italic">Loading messages...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="m-4">
            <AlertDescription className="flex flex-col items-center gap-2 py-4">
              <span>{error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
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
                        <span className="text-[10px] text-slate-300 ml-2">
                          {new Date(msg.createdAt).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
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
            })}
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
            disabled={!!error}
          />
          <Button 
            size="icon" 
            onClick={sendMessage}
            disabled={!text.trim() || !!error}
            className={cn(
              "rounded-xl h-10 w-10 transition-all",
              text.trim() && !error ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-300"
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