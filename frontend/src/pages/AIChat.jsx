import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Brain,
  Shield,
  UserCheck,
  Zap,
  Lock,
  MessageCircle,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Bot,
  User,
  Loader2,
  LogIn,
  UserPlus,
  Heart,
  Menu,
  X,
  ChevronRight,
  Clock,
  CheckCircle,
  Star
} from "lucide-react";

/* ── Google Fonts (if not already loaded) ── */
(() => {
  if (document.getElementById("echocare-fonts")) return;
  const l = document.createElement("link");
  l.id = "echocare-fonts";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";
  l.rel = "stylesheet";
  document.head.appendChild(l);
})();

/* ── Animation helpers (matching Home) ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
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
    { id: 3, text: "I understand exam anxiety can be overwhelming. Let me share some breathing techniques...", sender: "ai", time: "9:46 PM" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check login status (in real app, this would be from auth context)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponses = [
        "I hear you. Let's work through this together.",
        "That sounds challenging. Would you like to try a grounding exercise?",
        "It's okay to feel this way. Remember to breathe deeply.",
        "I'm here to support you. Tell me more about what's bothering you.",
        "Let's focus on one thing at a time. What's the most pressing concern?"
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const newAiMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const aiFeatures = [
    {
      icon: <Zap size={20} />,
      title: "Instant Response",
      description: "Available 24/7 with immediate coping strategies.",
    },
    {
      icon: <Lock size={20} />,
      title: "Privacy First",
      description: "Completely confidential with end-to-end encryption.",
    },
    {
      icon: <UserCheck size={20} />,
      title: "Professional Referrals",
      description: "Smart connections to mental health professionals.",
    }
  ];

  // Shared style tokens (matching Home)
  const S = {
    maxW: { maxWidth: 1280, margin: "0 auto", width: "100%" },
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.8)", bottom: -100, left: -100 }} />

      {/* ========== NAVBAR ========== */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
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
        {/* Logo */}
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

        {/* Desktop nav */}
        <nav className="mob-hide" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {NAV_ITEMS.map(item => (
            <Link key={item.label} to={item.path} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
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
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 500 }}>
                  U
                </div>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsLoggedIn(false);
                  navigate("/");
                }}
                className="btn-ghost"
                style={{ padding: "8px 20px" }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mob-show"
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "none", padding: 8, color: "var(--charcoal)"
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#fff", borderBottom: "1px solid var(--border)",
              padding: "0 24px", overflow: "hidden",
              position: "sticky", top: 70, zIndex: 299
            }}
          >
            <div style={{ padding: "24px 0", display: "flex", flexDirection: "column", gap: 8 }}>
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: "14px 12px", color: "var(--body)", fontSize: 16,
                    borderRadius: 10, display: "block",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--sage-light)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {item.label}
                </Link>
              ))}
              <div style={{
                display: "flex", gap: 12, marginTop: 24,
                paddingTop: 24, borderTop: "1px solid var(--border)"
              }}>
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                      Sign in
                    </Link>
                    <Link to="/register" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                      Get Started
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      setIsLoggedIn(false);
                      navigate("/");
                    }}
                    className="btn-ghost"
                    style={{ flex: 1, justifyContent: "center" }}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== MAIN CONTENT ========== */}
      <main style={{ ...S.maxW, padding: "40px 40px 60px" }}>
        
        {/* Page Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 40, textAlign: "center" }}>
          <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)", marginBottom: 16, display: "inline-flex" }}>
            <Brain size={14} />
            AI-Powered Mental Health Support
          </span>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            Chat with <em style={{ color: "var(--sage)", fontStyle: "italic" }}>EchoCare AI</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--body)", maxWidth: 600, margin: "0 auto" }}>
            A compassionate AI companion, available 24/7 to listen, support, and guide you through difficult moments.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 24 }}>
          
          {/* ========== LEFT SIDEBAR ========== */}
          <motion.div {...slideRight(0.1)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* AI Features Card */}
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--charcoal)" }}>AI Features</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {aiFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ display: "flex", gap: 12 }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: "var(--sage-light)", color: "var(--sage)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0
                      }}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }}>{feature.title}</h4>
                        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Human Support Card */}
              <div style={{
                background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)",
                borderRadius: 20,
                padding: 24,
                border: "1px solid rgba(107,158,107,0.2)"
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>Need Human Support?</h3>
                <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7, marginBottom: 20 }}>
                  Our AI can connect you with certified counselors for more personalized support.
                </p>
                <Link
                  to="/book"
                  className="btn-sage"
                  style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}
                >
                  <UserCheck size={16} />
                  Book Session
                </Link>
              </div>

              {/* Stats Card */}
              <div style={{
                background: "var(--charcoal)",
                borderRadius: 20,
                padding: 24,
                color: "#fff"
              }}>
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

          {/* ========== CHAT INTERFACE ========== */}
          <motion.div {...slideLeft(0.1)}>
            <div style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow: "var(--shadow-lg)",
              overflow: "hidden",
              height: "650px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--border)"
            }}>
              
              {/* Chat Header */}
              <div style={{
                padding: 20,
                borderBottom: "1px solid var(--border)",
                background: "#fff"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: "linear-gradient(135deg, var(--sage) 0%, var(--sage-hover) 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <Brain size={24} color="white" />
                      </div>
                      <span style={{
                        position: "absolute", bottom: -2, right: -2,
                        width: 14, height: 14, background: "#4CAF50",
                        borderRadius: "50%", border: "2px solid #fff"
                      }} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)" }}>EchoCare AI Assistant</h2>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                        <span className="pulse" style={{ width: 8, height: 8, background: "#4CAF50", borderRadius: "50%" }} />
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>Online · Ready to help</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--sage-light)", padding: "6px 12px", borderRadius: 100 }}>
                    <Lock size={12} color="var(--sage)" />
                    <span style={{ fontSize: 11, color: "var(--sage)", fontWeight: 500 }}>Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div style={{ flex: 1, overflowY: "auto", padding: 24, background: "var(--cream)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: "flex", justifyContent: message.sender === "user" ? "flex-end" : "flex-start" }}
                    >
                      <div style={{ maxWidth: "70%" }}>
                        <div className={`bubble ${message.sender === "ai" ? "bubble-ai" : "bubble-user"}`}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                            {message.sender === "ai" && (
                              <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <Bot size={14} color="white" />
                              </div>
                            )}
                            <div>
                              <p style={{ fontSize: 14, lineHeight: 1.6 }}>{message.text}</p>
                              <div style={{ fontSize: 10, marginTop: 6, color: message.sender === "ai" ? "var(--muted)" : "rgba(255,255,255,0.6)" }}>
                                {message.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <div className="bubble bubble-ai">
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Brain size={16} color="var(--sage)" />
                          <div style={{ display: "flex", gap: 4 }}>
                            <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", animation: "softPulse 1s infinite" }} />
                            <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", animation: "softPulse 1s infinite", animationDelay: "0.2s" }} />
                            <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", animation: "softPulse 1s infinite", animationDelay: "0.4s" }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div style={{ padding: 20, borderTop: "1px solid var(--border)", background: "#fff" }}>
                {!isLoggedIn ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div style={{
                      background: "var(--sage-light)",
                      borderRadius: 16,
                      padding: 20,
                      textAlign: "center"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
                        <AlertCircle size={18} color="var(--sage)" />
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)" }}>Authentication Required</h3>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--body)", marginBottom: 20 }}>
                        Please login or register to start chatting with our AI wellness assistant.
                      </p>
                      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                        <Link to="/login" className="btn-ghost" style={{ padding: "10px 20px" }}>
                          <LogIn size={14} />
                          Login
                        </Link>
                        <Link to="/register" className="btn-primary" style={{ padding: "10px 20px" }}>
                          <UserPlus size={14} />
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1, position: "relative" }}>
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here... (Press Enter to send)"
                        style={{
                          width: "100%",
                          padding: "14px 16px",
                          background: "var(--cream)",
                          border: "2px solid var(--border)",
                          borderRadius: 16,
                          fontSize: 14,
                          fontFamily: "'Outfit', sans-serif",
                          color: "var(--charcoal)",
                          outline: "none",
                          resize: "none",
                          transition: "border-color 0.2s"
                        }}
                        rows="2"
                        disabled={isTyping}
                        onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        style={{
                          position: "absolute", right: 12, bottom: 12,
                          width: 36, height: 36, borderRadius: 10,
                          background: !inputMessage.trim() || isTyping ? "var(--border)" : "var(--sage)",
                          border: "none", cursor: !inputMessage.trim() || isTyping ? "not-allowed" : "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s"
                        }}
                      >
                        {isTyping ? (
                          <Loader2 size={16} color="white" className="spin" />
                        ) : (
                          <Send size={16} color="white" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security Note */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
              <Lock size={14} color="var(--muted)" />
              <span style={{ fontSize: 12, color: "var(--muted)" }}>
                All conversations are encrypted and confidential
              </span>
            </div>
          </motion.div>
        </div>

        {/* ========== QUICK TIPS ========== */}
        <motion.div
          {...fadeUp(0.2)}
          style={{ marginTop: 48 }}
        >
          <div style={{
            background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)",
            borderRadius: 32,
            padding: 40,
            border: "1px solid rgba(107,158,107,0.15)"
          }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 className="serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 8 }}>
                How to get the most from <em style={{ color: "var(--sage)" }}>AI Chat</em>
              </h2>
              <p style={{ fontSize: 14, color: "var(--body)" }}>
                Our AI is trained to provide compassionate, evidence-based mental health support
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                {
                  title: "Be Specific",
                  description: "The more details you share, the better our AI can understand and help you."
                },
                {
                  title: "Share Feelings",
                  description: "Express your emotions freely. Our AI is here to listen without judgment."
                },
                {
                  title: "Follow Suggestions",
                  description: "Try the coping strategies and exercises suggested by the AI for best results."
                }
              ].map((tip, index) => (
                <div key={index} className="card" style={{ padding: 24 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <CheckCircle size={16} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{tip.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* ========== FOOTER ========== */}
      <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
        <div style={S.maxW}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
              Need immediate help? Call the National Suicide Prevention Lifeline:{" "}
              <span style={{ color: "var(--sage)", fontWeight: 500 }}>1-800-273-8255</span>
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              © 2025 EchoCare AI Wellness Assistant. This AI is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes softPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AiChat;