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

// Virtualization or pagination for large message lists
const BATCH_SIZE = 50;

const CommunityChat = () => {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);
  
  const { communityId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  
  const scrollRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Optimized scroll to bottom with requestAnimationFrame
  const scrollToBottom = useCallback(() => {
    if (isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    
    requestAnimationFrame(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
      isScrollingRef.current = false;
    });
  }, []);

  // 1️⃣ FETCH OLD MESSAGES - Optimized with caching
  useEffect(() => {
    if (!communityId) {
      setError("No community ID provided");
      setLoading(false);
      return;
    }

    // Create an abort controller for cleanup
    const controller = new AbortController();
    let mounted = true;

    const fetchMessages = async () => {
      console.time('fetchMessages');
      
      try {
        setLoading(true);
        setError(null);
        
        // Use cached messages if available (for faster reloads)
        const cacheKey = `messages_${communityId}`;
        const cached = sessionStorage.getItem(cacheKey);
        
        if (cached) {
          const parsed = JSON.parse(cached);
          if (mounted) {
            setMessages(parsed);
            setLoading(false);
          }
        }
        
        // Always fetch fresh data in background
        const apiBase = "https://echocare-x83y.onrender.com";
        const url = `${apiBase}/api/messages/${communityId}`;
        
        console.log("API URL:", url);
        
        const res = await axios.get(url, { 
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          signal: controller.signal
        });
        
        if (!mounted) return;
        
        console.log("Response status:", res.status);
        console.log("Messages received:", res.data.length);
        
        if (!Array.isArray(res.data)) {
          console.error("Response data is not an array:", res.data);
          setMessages([]);
        } else {
          // Store in session storage for faster reloads
          sessionStorage.setItem(cacheKey, JSON.stringify(res.data));
          setMessages(res.data);
        }
        
      } catch (err) {
        if (!mounted) return;
        
        console.error("Fetch error:", err);
        
        if (axios.isCancel(err)) {
          console.log("Request cancelled");
          return;
        }
        
        if (err.response?.status === 404) {
          setError("Community not found or no messages yet");
        } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
          setError("Server is waking up. Please wait a moment...");
          // Auto-retry after 3 seconds
          setTimeout(() => {
            if (mounted && communityId) {
              fetchMessages();
            }
          }, 3000);
        } else {
          setError("Failed to load messages. Please try again.");
        }
        
      } finally {
        console.timeEnd('fetchMessages');
        if (mounted) {
          setLoading(false);
          // Delay scroll to ensure DOM is ready
          setTimeout(scrollToBottom, 100);
        }
      }
    };

    fetchMessages();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [communityId, scrollToBottom]);

  // 2️⃣ SOCKET JOIN / LEAVE - Optimized
  useEffect(() => {
    if (!communityId || error) return;

    console.log("Joining socket room:", communityId);
    socket.emit("joinCommunity", communityId);

    const handleReceiveMessage = (message) => {
      if (message.communityId === communityId) {
        setMessages(prev => {
          // Prevent duplicates
          const exists = prev.some(m => m._id === message._id);
          if (exists) return prev;
          
          // Update cache
          const cacheKey = `messages_${communityId}`;
          const updated = [...prev, message];
          sessionStorage.setItem(cacheKey, JSON.stringify(updated));
          
          return updated;
        });
        
        // Debounced scroll
        setTimeout(scrollToBottom, 50);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    // Handle connection errors
    const handleConnectError = (err) => {
      console.error("Socket connection error:", err);
    };

    socket.on("connect_error", handleConnectError);

    return () => {
      console.log("Leaving socket room:", communityId);
      socket.emit("leaveCommunity", communityId);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("connect_error", handleConnectError);
    };
  }, [communityId, error, scrollToBottom]);

  // 3️⃣ SEND MESSAGE - Optimistic update
  const sendMessage = useCallback(() => {
    if (!text.trim() || !user?.id) return;

    const messageData = {
      token: localStorage.getItem("token"),
      text: text.trim(),
      communityId,
    };

    // Optimistic update
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const optimisticMessage = {
      _id: tempId,
      senderId: user.id,
      senderName: user.name,
      text: text.trim(),
      communityId,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };
    
    setMessages(prev => {
      const updated = [...prev, optimisticMessage];
      // Update cache
      const cacheKey = `messages_${communityId}`;
      sessionStorage.setItem(cacheKey, JSON.stringify(updated));
      return updated;
    });
    
    setText("");
    scrollToBottom();
    
    // Send via socket
    socket.emit("sendMessage", messageData);
    
    // Remove optimistic message when real one arrives
    const handleRealMessage = (realMessage) => {
      if (realMessage.senderId === user.id && realMessage.text === optimisticMessage.text) {
        setMessages(prev => prev.map(msg => 
          msg._id === tempId ? realMessage : msg
        ));
        socket.off("receiveMessage", handleRealMessage);
      }
    };
    
    socket.on("receiveMessage", handleRealMessage);
    
    // Timeout cleanup
    setTimeout(() => {
      socket.off("receiveMessage", handleRealMessage);
    }, 5000);
  }, [text, communityId, user, scrollToBottom]);

  // Memoize message rendering to prevent unnecessary re-renders
  const renderedMessages = useMemo(() => {
    return messages.map((msg, index) => {
      const isMe = msg.senderId === user?.id || msg.senderName === user?.name;
      const isOptimistic = msg.isOptimistic;
      
      return (
        <motion.div
          key={msg._id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isOptimistic ? 0.7 : 1, 
            y: 0 
          }}
          transition={{ duration: 0.2 }}
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
                isMe ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600",
                isOptimistic && "opacity-50"
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
                {isOptimistic && " (Sending...)"}
                <span className="text-[10px] text-slate-300 ml-2">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  }) : 'Just now'}
                </span>
              </span>
              <div className={cn(
                "px-4 py-2.5 rounded-2xl text-sm shadow-sm max-w-full break-words",
                isMe 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-white text-slate-700 border border-slate-200 rounded-tl-none",
                isOptimistic && "opacity-70"
              )}>
                {msg.text}
              </div>
            </div>
          </div>
        </motion.div>
      );
    });
  }, [messages, user]);

  // Handle Enter key for sending
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }, [sendMessage]);

  if (!user?.id) return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      <p className="text-sm text-slate-500">Loading user data...</p>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-white sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-8 w-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-800 truncate">Community Chat</h3>
          <p className="text-xs text-slate-500 truncate">
            {messages.length} messages • {communityId?.substring(0, 8)}...
          </p>
        </div>
      </div>

      {/* Messages Area - Optimized with virtualization placeholder */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 bg-slate-50/50 relative"
        style={{ 
          contain: 'strict',
          contentVisibility: 'auto'
        }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-2">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
            <p className="text-xs text-slate-500 italic">
              Loading messages...
              <span className="block text-[10px] mt-1">
                First load may take a moment
              </span>
            </p>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex flex-col items-center gap-2 py-4">
              <span>{error}</span>
              <div className="flex gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/communities')}
                >
                  Go Back
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            <div className="mb-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Send className="w-8 h-8 text-slate-300" />
              </div>
            </div>
            <p className="font-medium mb-1">Start the conversation!</p>
            <p className="text-xs">Be the first to send a message</p>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false} mode="wait">
              <div className="space-y-4">
                {renderedMessages}
              </div>
            </AnimatePresence>
            {/* Invisible element for scroll-to-bottom */}
            <div ref={messagesEndRef} style={{ height: '1px' }} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400 flex-1 min-w-0"
            disabled={!!error || loading}
            autoFocus
          />
          <Button 
            size="icon" 
            onClick={sendMessage}
            disabled={!text.trim() || !!error || loading}
            className={cn(
              "rounded-xl h-10 w-10 transition-all shrink-0",
              text.trim() && !error ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-300"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {text.length > 200 && (
          <p className="text-xs text-amber-600 mt-2 px-2">
            Message is getting long ({text.length}/500)
          </p>
        )}
      </div>
    </div>
  );
};

export default CommunityChat;