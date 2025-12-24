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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                AI Wellness Assistant
              </h1>
              <p className="text-gray-600">24/7 emotional support powered by AI</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
              <Heart className="w-3 h-3" />
              Confidential
            </div>
            <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium flex items-center gap-1">
              <Bot className="w-3 h-3" />
              Always Available
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-semibold">Wellness Assistant</h2>
                      <p className="text-xs opacity-90">AI Emotional Support</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearChat}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                      title="Clear chat"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-4 ${message.role === "user" 
                      ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-br-none" 
                      : "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-bl-none"
                    }`}>
                      <div className="flex items-start gap-3">
                        {message.role === "ai" && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="whitespace-pre-wrap">{message.text}</p>
                          <div className={`flex items-center justify-between mt-2 text-xs ${message.role === "user" ? "text-blue-200" : "text-gray-500"}`}>
                            <span>{message.timestamp}</span>
                            {message.role === "ai" && (
                              <div className="flex items-center gap-2">
                                <button className="hover:text-emerald-600">
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button className="hover:text-red-600">
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        {message.role === "user" && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 flex items-center justify-center flex-shrink-0">
                            <User className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-bl-none">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Responses */}
              {messages.length === 1 && (
                <div className="px-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Quick responses:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickResponses.map((response, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickResponse(response)}
                        className="px-3 py-2 bg-gradient-to-r from-blue-50 to-violet-50 hover:from-blue-100 hover:to-violet-100 text-gray-700 rounded-lg text-sm font-medium transition-all border border-gray-200 hover:border-blue-300"
                      >
                        {response}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="relative">
                  <textarea
                    className="w-full px-4 py-3 pr-24 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell me how you're feeling today..."
                    rows="2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                      <Mic className="w-4 h-4" />
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info & Tips */}
          <div className="space-y-6">
            {/* AI Assistant Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">About Your AI Assistant</h3>
                  <p className="text-sm text-gray-600">Powered by advanced AI</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  Provides emotional support and coping strategies
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  Maintains 100% confidentiality
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  Available 24/7 for immediate support
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  Trained on mental wellness resources
                </li>
              </ul>
            </div>

            {/* Safety Notice */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900">Important Notice</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    This AI provides emotional support and is not a substitute for professional medical advice, diagnosis, or treatment.
                  </p>
                </div>
              </div>
              <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm">
                Need Urgent Help? Contact Support
              </button>
            </div>

            {/* Conversation Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl border border-blue-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Tips for Better Conversation</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Be specific about your feelings
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Share recent experiences
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Ask for specific help if needed
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  Take your time to express yourself
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;