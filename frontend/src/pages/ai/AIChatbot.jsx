import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  Heart,
  Brain,
  AlertCircle,
  Mic,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  MessageSquare
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
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 14px;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
    }
    .btn-ghost:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; }
    .btn-sage {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: #fff;
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-sage:hover { background: var(--sage-hover); transform: translateY(-2px); }
    .card {
      background: #fff; border: 1px solid var(--border);
      border-radius: var(--r-md); box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    @media (max-width: 1024px) {
      .grid-cols-3 { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(s);
})();

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      role: "ai", 
      text: "Hello! I'm here to support you. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      // Simulate typing delay for better UX
      setTimeout(async () => {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/ai/chat`, {
            message: input,
          });

          const aiMessage = {
            role: "ai",
            text: res.data.reply || "I'm here to listen. Could you tell me more about how you're feeling?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };

          setMessages(prev => [...prev, aiMessage]);
        } catch {
          const errorMessage = {
            role: "ai",
            text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or consider reaching out to a human counsellor if you need immediate support.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setLoading(false);
          setIsTyping(false);
        }
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickResponse = (response) => {
    setInput(response);
    setTimeout(() => sendMessage(), 100);
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat?")) {
      setMessages([
        { 
          role: "ai", 
          text: "Hello! I'm here to support you. How are you feeling today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const quickResponses = [
    "I'm feeling anxious",
    "I'm stressed about school",
    "I need coping strategies",
    "I'm feeling lonely",
    "How can I sleep better?"
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "var(--cream)",
      padding: "24px",
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "var(--sage)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-md)"
            }}>
              <Brain size={28} color="white" />
            </div>
            <div>
              <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 300, marginBottom: 4 }}>
                AI Wellness <span style={{ color: "var(--sage)" }}>Assistant</span>
              </h1>
              <p style={{ color: "var(--body)" }}>24/7 emotional support powered by AI</p>
            </div>
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 12px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100, fontSize: 13, fontWeight: 500 }}>
              <Sparkles size={14} />
              AI-Powered
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 12px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100, fontSize: 13, fontWeight: 500 }}>
              <Heart size={14} />
              Confidential
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 12px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100, fontSize: 13, fontWeight: 500 }}>
              <Bot size={14} />
              Always Available
            </span>
          </div>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "2fr 1fr", 
          gap: 24
        }} className="grid-cols-3">
          
          {/* Left Column - Chat Interface */}
          <div style={{ gridColumn: "span 2" }}>
            <div className="card" style={{
              height: "600px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "#fff"
            }}>
              {/* Chat Header */}
              <div style={{
                background: "var(--sage)",
                padding: "16px 20px",
                color: "#fff"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Bot size={16} color="white" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 600 }}>Wellness Assistant</h3>
                      <p style={{ fontSize: 11, opacity: 0.9 }}>AI Emotional Support</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                      onClick={clearChat}
                      style={{
                        padding: 6,
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.2)",
                        border: "none",
                        cursor: "pointer",
                        color: "#fff"
                      }}
                      title="Clear chat"
                    >
                      <RotateCcw size={14} />
                    </button>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#4CAF50",
                      animation: "pulse 2s infinite"
                    }} />
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
                background: "var(--cream)"
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", justifyContent: message.role === "user" ? "flex-end" : "flex-start" }}
                    >
                      <div style={{
                        maxWidth: "80%",
                        padding: "12px 16px",
                        borderRadius: 16,
                        background: message.role === "user" ? "var(--charcoal)" : "var(--sage-light)",
                        color: message.role === "user" ? "#fff" : "var(--charcoal)",
                        borderBottomRightRadius: message.role === "user" ? 4 : 16,
                        borderBottomLeftRadius: message.role === "ai" ? 4 : 16
                      }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                          {message.role === "ai" && (
                            <div style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: "var(--sage)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0
                            }}>
                              <Bot size={12} color="white" />
                            </div>
                          )}
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{message.text}</p>
                            <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginTop: 8,
                              fontSize: 10,
                              color: message.role === "user" ? "rgba(255,255,255,0.5)" : "var(--muted)"
                            }}>
                              <span>{message.timestamp}</span>
                              {message.role === "ai" && (
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
                                    <ThumbsUp size={10} />
                                  </button>
                                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}>
                                    <ThumbsDown size={10} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          {message.role === "user" && (
                            <div style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              background: "var(--charcoal-2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0
                            }}>
                              <User size={12} color="white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                      <div style={{
                        padding: "12px 16px",
                        borderRadius: 16,
                        background: "var(--sage-light)",
                        borderBottomLeftRadius: 4
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{
                            width: 24,
                            height: 24,
                            borderRadius: 6,
                            background: "var(--sage)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <Bot size={12} color="white" />
                          </div>
                          <div style={{ display: "flex", gap: 4 }}>
                            <div style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", animation: "bounce 1.4s infinite" }} />
                            <div style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", animation: "bounce 1.4s infinite", animationDelay: "0.2s" }} />
                            <div style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", animation: "bounce 1.4s infinite", animationDelay: "0.4s" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Quick Responses */}
              {messages.length === 1 && (
                <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
                  <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 8 }}>Quick responses:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {quickResponses.map((response, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickResponse(response)}
                        style={{
                          padding: "8px 16px",
                          background: "var(--sage-light)",
                          color: "var(--sage)",
                          border: "1px solid var(--sage-mid)",
                          borderRadius: 100,
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--sage)";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--sage-light)";
                          e.currentTarget.style.color = "var(--sage)";
                        }}
                      >
                        {response}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)", background: "#fff" }}>
                <div style={{ position: "relative" }}>
                  <textarea
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      paddingRight: "120px",
                      background: "var(--cream)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 14,
                      fontFamily: "'Outfit', sans-serif",
                      color: "var(--charcoal)",
                      outline: "none",
                      resize: "none",
                      transition: "border-color 0.2s"
                    }}
                    placeholder="Tell me how you're feeling today..."
                    rows="2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                  />
                  <div style={{
                    position: "absolute",
                    right: 8,
                    bottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 4
                  }}>
                    <button style={{
                      padding: 8,
                      borderRadius: 6,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--muted)"
                    }}>
                      <Paperclip size={16} />
                    </button>
                    <button style={{
                      padding: 8,
                      borderRadius: 6,
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--muted)"
                    }}>
                      <Mic size={16} />
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 16px",
                        background: !input.trim() || loading ? "var(--muted)" : "var(--sage)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: !input.trim() || loading ? "not-allowed" : "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      {loading ? (
                        <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                      ) : (
                        <Send size={14} />
                      )}
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info & Tips */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* AI Assistant Info */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Brain size={24} color="var(--sage)" />
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)" }}>About Your AI Assistant</h3>
                  <p style={{ fontSize: 13, color: "var(--muted)" }}>Powered by advanced AI</p>
                </div>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>Provides emotional support and coping strategies</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>Maintains 100% confidentiality</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>Available 24/7 for immediate support</span>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>Trained on mental wellness resources</span>
                </li>
              </ul>
            </div>

            {/* Safety Notice */}
            <div style={{
              background: "var(--warm)",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(107,158,107,0.2)"
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                <AlertCircle size={20} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)" }}>Important Notice</h3>
                  <p style={{ fontSize: 13, color: "var(--body)", marginTop: 4 }}>
                    This AI provides emotional support and is not a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                </div>
              </div>
              <button style={{
                width: "100%",
                padding: "12px",
                background: "var(--sage)",
                color: "#fff",
                border: "none",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--sage-hover)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "var(--sage)"}
              >
                Need Urgent Help? Contact Support
              </button>
            </div>

            {/* Conversation Tips */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <MessageSquare size={20} color="var(--sage)" />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)" }}>Tips for Better Conversation</h3>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%" }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>Be specific about your feelings</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%" }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>Share recent experiences</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%" }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>Ask for specific help if needed</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%" }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>Take your time to express yourself</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        @media (max-width: 1024px) {
          .grid-cols-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AIChatbot;