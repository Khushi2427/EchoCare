import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../../socket";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, ArrowLeft, AlertCircle, Heart } from "lucide-react";

/* ── Google Fonts (if not already loaded) ── */
(() => {
  if (document.getElementById("echocare-fonts")) return;
  const l = document.createElement("link");
  l.id = "echocare-fonts";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";
  l.rel = "stylesheet";
  document.head.appendChild(l);
})();

/* ── Global CSS ── */
(() => {
  if (document.getElementById("echocare-css")) return;
  const s = document.createElement("style");
  s.id = "echocare-css";
  s.textContent = `
    :root {
      --sage: #6B9E6B;
      --sage-hover: #598559;
      --sage-light: #EEF5EE;
      --sage-mid: #B8D4B8;
      --cream: #FAFAF7;
      --warm: #F6F0E8;
      --charcoal: #1A1A1A;
      --charcoal-2: #2C2C2C;
      --charcoal-3: #3E3E3E;
      --body: #4A4A4A;
      --muted: #7A7A7A;
      --light-muted: #A0A0A0;
      --border: rgba(0,0,0,0.08);
      --border-light: rgba(0,0,0,0.05);
      --shadow-sm: 0 2px 12px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.08);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.12);
      --r-sm: 14px;
      --r-md: 20px;
      --r-lg: 28px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    a { text-decoration: none; color: inherit; }
    .serif { font-family: 'Cormorant Garamond', serif; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--charcoal); color: #fff;
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 14px;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
    }
    .btn-ghost:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; }
    .btn-ghost-icon {
      padding: 8px; border-radius: 50%; background: transparent;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .btn-ghost-icon:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; }
    .btn-sage {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: #fff;
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-sage:hover { background: var(--sage-hover); transform: translateY(-2px); }
    .btn-sage:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .card {
      background: #fff; border: 1px solid var(--border);
      border-radius: var(--r-md); box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    .input {
      width: 100%;
      padding: 12px 16px;
      background: var(--cream);
      border: 1px solid var(--border);
      border-radius: 12px;
      font-size: 14px;
      font-family: 'Outfit', sans-serif;
      color: var(--charcoal);
      outline: none;
      transition: border-color 0.2s;
    }
    .input:focus {
      border-color: var(--sage);
    }
    .alert {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: 12px;
      color: #b91c1c;
    }
    .chat-message-user {
      background: var(--charcoal);
      color: #fff;
      border-radius: 18px 18px 4px 18px;
    }
    .chat-message-other {
      background: var(--sage-light);
      color: var(--charcoal);
      border-radius: 18px 18px 18px 4px;
    }
  `;
  document.head.appendChild(s);
})();

/* ── Helper for class merging ── */
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// Simple Button component
const Button = ({ children, variant = "primary", size = "default", onClick, disabled, className, ...props }) => {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 500,
    fontSize: size === "icon" ? "inherit" : "14px",
    padding: size === "icon" ? "8px" : size === "sm" ? "8px 16px" : "10px 20px",
    borderRadius: variant === "icon" ? "50%" : "100px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.25s ease",
    opacity: disabled ? 0.5 : 1,
    ...props.style
  };

  const variantStyles = {
    primary: { background: "var(--charcoal)", color: "#fff" },
    ghost: { background: "transparent", color: "var(--charcoal)", border: "1.5px solid var(--border)" },
    icon: { background: "transparent", color: "var(--charcoal)", border: "1.5px solid var(--border)", padding: "8px", borderRadius: "50%" }
  };

  const style = { ...baseStyle, ...variantStyles[variant] };

  return (
    <button style={style} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

// Simple Input component
const Input = ({ value, onChange, placeholder, onKeyDown, className, ...props }) => {
  return (
    <input
      className="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};

// Simple Alert component
const Alert = ({ variant = "default", children, className, ...props }) => {
  const style = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    borderRadius: "12px",
    ...(variant === "destructive" 
      ? { background: "#fee2e2", border: "1px solid #fecaca", color: "#b91c1c" }
      : { background: "var(--sage-light)", border: "1px solid var(--sage-mid)", color: "var(--sage)" })
  };

  return (
    <div style={style} {...props}>
      {children}
    </div>
  );
};

const AlertDescription = ({ children }) => <span style={{ fontSize: 14 }}>{children}</span>;

const CommunityChat = () => {
  /* ================= USER ================= */
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const userId = user?._id || user?.id;
  const token = localStorage.getItem("token");

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
    if (!communityId || !token) return;

    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ CORRECT URL (no double /api)
        const url = `${import.meta.env.VITE_API_URL}/messages/${communityId}`;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        setMessages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Failed to load messages");
        }
      } finally {
        setLoading(false);
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchMessages();

    return () => controller.abort();
  }, [communityId, token, scrollToBottom]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!communityId || !token) return;

    socket.auth = { token };
    socket.connect();

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
      socket.disconnect();
    };
  }, [communityId, token, scrollToBottom]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = useCallback(() => {
    if (!text.trim() || !userId) return;

    const optimisticMsg = {
      _id: `temp-${Date.now()}`,
      senderId: userId,
      senderName: user.name,
      text,
      communityId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setText("");
    scrollToBottom();

    socket.emit("sendMessage", {
      text,
      communityId,
    });
  }, [text, userId, communityId, scrollToBottom, user?.name]);

  /* ================= GUARD ================= */
  if (!userId || !token) {
    return (
      <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
        <Loader2 size={20} color="var(--sage)" style={{ animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      border: "1px solid var(--border)",
      borderRadius: 16,
      background: "#fff",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderBottom: "1px solid var(--border)"
      }}>
        <Button variant="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
        </Button>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)" }}>Community Chat</h3>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        background: "var(--cream)"
      }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <Loader2 size={24} color="var(--sage)" style={{ animation: "spin 1s linear infinite" }} />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle size={16} />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <AnimatePresence>
              {messages.map((msg) => {
                const isMe = msg.senderId === userId;

                return (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: "flex",
                      marginBottom: 12,
                      justifyContent: isMe ? "flex-end" : "flex-start"
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 16px",
                        maxWidth: "70%",
                        ...(isMe 
                          ? { background: "var(--charcoal)", color: "#fff", borderRadius: "18px 18px 4px 18px" }
                          : { background: "var(--sage-light)", color: "var(--charcoal)", borderRadius: "18px 18px 18px 4px" }
                        )
                      }}
                    >
                      {msg.text}
                      <div style={{
                        fontSize: 10,
                        marginTop: 4,
                        opacity: 0.7,
                        textAlign: isMe ? "right" : "left"
                      }}>
                        {msg.senderName || (isMe ? "You" : "Member")}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div style={{
        display: "flex",
        gap: 8,
        padding: "12px 16px",
        borderTop: "1px solid var(--border)",
        background: "#fff"
      }}>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button 
          variant="primary" 
          onClick={sendMessage}
          disabled={!text.trim()}
          style={{ padding: "12px", borderRadius: "12px" }}
        >
          <Send size={16} />
        </Button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CommunityChat;