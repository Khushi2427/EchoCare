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
  UserPlus
} from "lucide-react";

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

  // Check login status (in real app, this would be from auth context)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
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
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Response",
      description: "Available 24/7 with immediate coping strategies.",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Privacy First",
      description: "Completely confidential with end-to-end encryption.",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Professional Referrals",
      description: "Smart connections to mental health professionals.",
      color: "text-purple-600 bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-teal-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                EchoCare
              </span>
            </Link>

            <div className="flex items-center gap-4">
              {!isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors text-sm font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-lg transition-shadow text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-medium">
                    U
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      setIsLoggedIn(false);
                      navigate("/");
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - AI Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">AI Features</h2>
              <div className="space-y-4">
                {aiFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-3">Need Human Support?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our AI can connect you with certified counselors for more personalized support.
              </p>
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow text-sm"
              >
                <UserCheck className="w-4 h-4" />
                Book Session with Counselor
              </Link>
            </div>
          </motion.div>

          {/* Middle Column - Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">EchoCare AI Assistant</h1>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">Online • Ready to chat</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">End-to-End Encrypted</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] ${message.sender === "user"
                            ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-2xl rounded-tr-none"
                            : "bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none"
                          } p-4`}
                      >
                        <div className="flex items-start gap-3">
                          {message.sender === "ai" && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="whitespace-pre-wrap">{message.text}</p>
                            <div className={`text-xs mt-2 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}>
                              {message.time}
                            </div>
                          </div>
                          {message.sender === "user" && (
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-6">
                {!isLoggedIn ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-4">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-bold text-gray-800">Authentication Required</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Please login or register to start chatting with our AI wellness assistant.
                        Your conversations are completely private and secure.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                          to="/login"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                        >
                          <LogIn className="w-4 h-4" />
                          Login to Continue
                        </Link>
                        <Link
                          to="/register"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-teal-500 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors"
                        >
                          <UserPlus className="w-4 h-4" />
                          Create Free Account
                        </Link>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Already have an account? <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium">Login here</Link>
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex gap-3">
                    <div className="flex-1 relative">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here... (Press Enter to send)"
                        className="w-full p-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300 resize-none"
                        rows="2"
                        disabled={isTyping}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        className={`absolute right-3 bottom-3 p-2 rounded-lg ${!inputMessage.trim() || isTyping
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-gradient-to-r from-teal-500 to-blue-500 hover:shadow-lg"
                          } transition-all`}
                      >
                        {isTyping ? (
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        ) : (
                          <Send className="w-5 h-5 text-white" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security Note */}
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>All conversations are encrypted and confidential</span>
            </div>
          </motion.div>
        </div>

        {/* Quick Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">How to Get the Most from AI Chat</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI is trained to provide compassionate, evidence-based mental health support
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
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
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-teal-600 font-bold text-lg mb-2">{tip.title}</div>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Need immediate help? Call the National Suicide Prevention Lifeline:{" "}
              <span className="font-semibold text-teal-600">1-800-273-8255</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              © 2025 EchoCare AI Wellness Assistant. This AI is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AiChat;