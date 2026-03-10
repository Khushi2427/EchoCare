import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Brain, Shield, UserCheck, Zap, Lock,
  MessageCircle, ArrowRight, Sparkles, AlertCircle,
  Bot, User, Loader2, LogIn, UserPlus, Heart,
  Menu, X, ChevronRight, Clock, CheckCircle, Star
} from "lucide-react";

/* ── Google Fonts ── */
(() => {
  if (document.getElementById("echocare-fonts")) return;
  const l = document.createElement("link");
  l.id = "echocare-fonts";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";
  l.rel = "stylesheet";
  document.head.appendChild(l);
})();

/* ── Responsive CSS ── */
(() => {
  if (document.getElementById("echocare-aichat-css")) return;
  const s = document.createElement("style");
  s.id = "echocare-aichat-css";
  s.textContent = `
    @keyframes softPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    .spin { animation: spin 1s linear infinite; }
    .pulse { animation: softPulse 2s ease-in-out infinite; }

    /* ── Scrollbar ── */
    .messages-scroll::-webkit-scrollbar { width: 4px; }
    .messages-scroll::-webkit-scrollbar-track { background: transparent; }
    .messages-scroll::-webkit-scrollbar-thumb { background: var(--sage-mid); border-radius: 4px; }

    /* ── Chat layout ── */
    .chat-layout {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 24px;
    }

    /* ── Tips grid ── */
    .tips-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    /* ── Chat window fixed height on desktop ── */
    .chat-window { height: 620px; }

    /* ── Tablet: ≤900px ── */
    @media (max-width: 900px) {
      .mob-hide { display: none !important; }
      .mob-show { display: flex !important; }

      .chat-layout {
        grid-template-columns: 1fr;
        gap: 20px;
      }

      /* Sidebar becomes a horizontal strip */
      .sidebar-stack {
        display: grid !important;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .sidebar-stats { display: none !important; }

      .tips-grid {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .chat-window { height: 560px; }

      .main-pad { padding: 28px 24px 48px !important; }
      .navbar-pad { padding: 0 24px !important; }
      .footer-pad { padding: 28px 24px 20px !important; }
      .tips-box { padding: 28px 24px !important; border-radius: 24px !important; }
    }

    /* ── Mobile: ≤600px ── */
    @media (max-width: 600px) {
      .sidebar-stack {
        grid-template-columns: 1fr !important;
      }

      .tips-grid {
        grid-template-columns: 1fr !important;
      }

      .chat-window { height: 480px; }

      .main-pad { padding: 20px 16px 40px !important; }
      .navbar-pad { padding: 0 16px !important; }
      .footer-pad { padding: 24px 16px 16px !important; }
      .tips-box { padding: 22px 18px !important; }

      .page-header { margin-bottom: 24px !important; }
      .page-header h1 { font-size: clamp(28px, 7vw, 40px) !important; }
      .page-header p { font-size: 14px !important; }

      .chat-header-text h2 { font-size: 14px !important; }
      .chat-msg-bubble { max-width: 88% !important; }

      .auth-prompt-btns { flex-direction: column !important; }
      .auth-prompt-btns a { width: 100% !important; justify-content: center !important; }
    }

    /* ── Very small: ≤380px ── */
    @media (max-width: 380px) {
      .chat-window { height: 420px; }
    }
  `;
  document.head.appendChild(s);
})();

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});
const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});
const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "AI Chat", path: "/ai-chat" },
  { label: "Book Session", path: "/book" },
  { label: "Resources", path: "/resources" },
  { label: "Community", path: "/community" },
  { label: "About", path: "/about" },
];

const AiChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm here to help. How are you feeling today?", sender: "ai", time: "9:45 PM" },
    { id: 2, text: "I'm feeling really anxious about my exams", sender: "user", time: "9:46 PM" },
    { id: 3, text: "I understand exam anxiety can be overwhelming. Let me share some breathing techniques...", sender: "ai", time: "9:46 PM" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!isLoggedIn) return;
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponses = [
        "I hear you. Let's work through this together.",
        "That sounds challenging. Would you like to try a grounding exercise?",
        "It's okay to feel this way. Remember to breathe deeply.",
        "I'm here to support you. Tell me more about what's bothering you.",
        "Let's focus on one thing at a time. What's the most pressing concern?",
      ];
      const newAiMessage = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const aiFeatures = [
    { icon: <Zap size={18} />, title: "Instant Response", description: "Available 24/7 with immediate coping strategies." },
    { icon: <Lock size={18} />, title: "Privacy First", description: "Completely confidential with end-to-end encryption." },
    { icon: <UserCheck size={18} />, title: "Professional Referrals", description: "Smart connections to mental health professionals." },
  ];

  const S = { maxW: { maxWidth: 1280, margin: "0 auto", width: "100%" } };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.8)", bottom: -100, left: -100 }} />

      {/* ════ NAVBAR ════ */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="navbar-pad"
        style={{
          position: "sticky", top: 0, zIndex: 300,
          height: 70, padding: "0 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(250,250,247,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.38s ease",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            style={{ width: 36, height: 36, borderRadius: 12, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Heart size={18} color="white" />
          </motion.div>
          <span className="serif" style={{ fontWeight: 500, fontSize: 22, color: "var(--charcoal)", letterSpacing: "-0.02em" }}>
            EchoCare
          </span>
        </Link>

        <nav className="mob-hide" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.label} to={item.path} className="nav-link">{item.label}</Link>
          ))}
        </nav>

        <div className="mob-hide" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn-ghost" style={{ padding: "10px 24px" }}>Sign in</Link>
              <Link to="/register" className="btn-primary" style={{ padding: "10px 24px" }}>
                Get Started <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 500 }}>U</div>
              <button onClick={() => { localStorage.removeItem("authToken"); setIsLoggedIn(false); navigate("/"); }} className="btn-ghost" style={{ padding: "8px 20px" }}>Logout</button>
            </div>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="mob-show"
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 8, color: "var(--charcoal)" }}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "0 24px", overflow: "hidden", position: "sticky", top: 70, zIndex: 299 }}
          >
            <div style={{ padding: "24px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              {NAV_ITEMS.map(item => (
                <Link key={item.label} to={item.path} onClick={() => setMobileOpen(false)}
                  style={{ padding: "14px 12px", color: "var(--body)", fontSize: 16, borderRadius: 10, display: "block" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--sage-light)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >{item.label}</Link>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Sign in</Link>
                    <Link to="/register" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Get Started</Link>
                  </>
                ) : (
                  <button onClick={() => { localStorage.removeItem("authToken"); setIsLoggedIn(false); navigate("/"); }} className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Logout</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ MAIN ════ */}
      <main className="main-pad" style={{ ...S.maxW, padding: "40px 40px 60px" }}>

        {/* Page Header */}
        <motion.div {...fadeUp(0)} className="page-header" style={{ marginBottom: 40, textAlign: "center" }}>
          <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)", marginBottom: 16, display: "inline-flex", gap: 6 }}>
            <Brain size={14} />
            AI-Powered Mental Health Support
          </span>
          <h1 className="serif" style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            Chat with <em style={{ color: "var(--sage)", fontStyle: "italic" }}>EchoCare AI</em>
          </h1>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 600, margin: "0 auto" }}>
            A compassionate AI companion, available 24/7 to listen, support, and guide you through difficult moments.
          </p>
        </motion.div>

        {/* Chat Layout */}
        <div className="chat-layout">

          {/* ════ SIDEBAR ════ */}
          <motion.div {...slideRight(0.1)}>
            <div className="sidebar-stack" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* AI Features */}
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 18, color: "var(--charcoal)" }}>AI Features</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {aiFeatures.map((feature, index) => (
                    <motion.div key={index}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ display: "flex", gap: 12 }}
                    >
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 3, color: "var(--charcoal)" }}>{feature.title}</h4>
                        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Human Support */}
              <div style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 20, padding: 24, border: "1px solid rgba(107,158,107,0.2)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>Need Human Support?</h3>
                <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7, marginBottom: 20 }}>
                  Connect with certified counselors for more personalized support.
                </p>
                <Link to="/book" className="btn-sage" style={{ width: "100%", justifyContent: "center", padding: "11px 20px" }}>
                  <UserCheck size={15} /> Book Session
                </Link>
              </div>

              {/* Stats */}
              <div className="sidebar-stats" style={{ background: "var(--charcoal)", borderRadius: 20, padding: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <div className="serif" style={{ fontSize: 28, fontWeight: 400, color: "var(--sage)", lineHeight: 1 }}>15k+</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Conversations</div>
                  </div>
                  <div>
                    <div className="serif" style={{ fontSize: 28, fontWeight: 400, color: "var(--sage)", lineHeight: 1 }}>98%</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ════ CHAT WINDOW ════ */}
          <motion.div {...slideLeft(0.1)}>
            <div className="chat-window" style={{
              background: "#fff", borderRadius: 24, boxShadow: "var(--shadow-lg)",
              overflow: "hidden", display: "flex", flexDirection: "column",
              border: "1px solid var(--border)",
            }}>

              {/* Chat Header */}
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: "#fff", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, var(--sage) 0%, var(--sage-hover) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Brain size={22} color="white" />
                      </div>
                      <span style={{ position: "absolute", bottom: -2, right: -2, width: 12, height: 12, background: "#4CAF50", borderRadius: "50%", border: "2px solid #fff" }} />
                    </div>
                    <div className="chat-header-text" style={{ minWidth: 0 }}>
                      <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>EchoCare AI Assistant</h2>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                        <span className="pulse" style={{ width: 7, height: 7, background: "#4CAF50", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>Online · Ready to help</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--sage-light)", padding: "5px 11px", borderRadius: 100, flexShrink: 0 }}>
                    <Lock size={11} color="var(--sage)" />
                    <span style={{ fontSize: 11, color: "var(--sage)", fontWeight: 500 }}>Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 16px", background: "var(--cream)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {messages.map((message) => (
                    <motion.div key={message.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      style={{ display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}
                    >
                      <div className="chat-msg-bubble" style={{ maxWidth: "72%" }}>
                        <div className={`bubble ${message.sender === "ai" ? "bubble-ai" : "bubble-user"}`} style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                            {message.sender === "ai" && (
                              <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                                <Bot size={13} color="white" />
                              </div>
                            )}
                            <div>
                              <p style={{ fontSize: 13.5, lineHeight: 1.6 }}>{message.text}</p>
                              <div style={{ fontSize: 10, marginTop: 5, color: message.sender === "ai" ? "var(--muted)" : "rgba(255,255,255,0.6)" }}>
                                {message.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", justifyContent: "flex-start" }}>
                      <div className="bubble bubble-ai" style={{ padding: "10px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Brain size={14} color="var(--sage)" />
                          <div style={{ display: "flex", gap: 4 }}>
                            {[0, 0.2, 0.4].map((d, i) => (
                              <span key={i} style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", animation: `softPulse 1s ${d}s infinite` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div style={{ padding: "14px 16px", borderTop: "1px solid var(--border)", background: "#fff", flexShrink: 0 }}>
                {!isLoggedIn ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <div style={{ background: "var(--sage-light)", borderRadius: 16, padding: "18px 20px", textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
                        <AlertCircle size={17} color="var(--sage)" />
                        <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)" }}>Login to start chatting</h3>
                      </div>
                      <p style={{ fontSize: 12, color: "var(--body)", marginBottom: 16 }}>
                        Sign in or create a free account to chat with our AI wellness assistant.
                      </p>
                      <div className="auth-prompt-btns" style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                        <Link to="/login" className="btn-ghost" style={{ padding: "9px 18px", fontSize: 13, gap: 6 }}>
                          <LogIn size={13} /> Login
                        </Link>
                        <Link to="/register" className="btn-primary" style={{ padding: "9px 18px", fontSize: 13, gap: 6 }}>
                          <UserPlus size={13} /> Sign Up
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: 1, position: "relative" }}>
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message… (Enter to send)"
                        rows="2"
                        disabled={isTyping}
                        style={{
                          width: "100%", padding: "12px 50px 12px 14px",
                          background: "var(--cream)", border: "2px solid var(--border)",
                          borderRadius: 14, fontSize: 13.5,
                          fontFamily: "'Outfit', sans-serif", color: "var(--charcoal)",
                          outline: "none", resize: "none", transition: "border-color 0.2s",
                          lineHeight: 1.5,
                        }}
                        onFocus={e => e.target.style.borderColor = "var(--sage)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        style={{
                          position: "absolute", right: 10, bottom: 10,
                          width: 34, height: 34, borderRadius: 9,
                          background: !inputMessage.trim() || isTyping ? "var(--border)" : "var(--sage)",
                          border: "none", cursor: !inputMessage.trim() || isTyping ? "not-allowed" : "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}
                      >
                        {isTyping ? <Loader2 size={15} color="white" className="spin" /> : <Send size={15} color="white" />}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security note */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 14 }}>
              <Lock size={12} color="var(--muted)" />
              <span style={{ fontSize: 12, color: "var(--muted)" }}>All conversations are encrypted and confidential</span>
            </div>
          </motion.div>
        </div>

        {/* ════ QUICK TIPS ════ */}
        <motion.div {...fadeUp(0.2)} style={{ marginTop: 48 }}>
          <div className="tips-box" style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 32, padding: 40, border: "1px solid rgba(107,158,107,0.15)" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 className="serif" style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 300, marginBottom: 8 }}>
                How to get the most from <em style={{ color: "var(--sage)" }}>AI Chat</em>
              </h2>
              <p style={{ fontSize: 14, color: "var(--body)" }}>
                Our AI is trained to provide compassionate, evidence-based mental health support
              </p>
            </div>

            <div className="tips-grid">
              {[
                { title: "Be Specific", description: "The more details you share, the better our AI can understand and help you." },
                { title: "Share Feelings", description: "Express your emotions freely. Our AI is here to listen without judgment." },
                { title: "Follow Suggestions", description: "Try the coping strategies and exercises suggested by the AI for best results." },
              ].map((tip, index) => (
                <div key={index} className="card" style={{ padding: 22 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <CheckCircle size={15} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 7, color: "var(--charcoal)" }}>{tip.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* ════ FOOTER ════ */}
      <footer className="footer-pad" style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
        <div style={S.maxW}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "rgba(255,255,255,0.5)", marginBottom: 12, lineHeight: 1.7 }}>
              Need immediate help? Call the National Suicide Prevention Lifeline:{" "}
              <span style={{ color: "var(--sage)", fontWeight: 500 }}>1-800-273-8255</span>
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              © 2025 EchoCare AI Wellness Assistant. This AI is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default AiChat;