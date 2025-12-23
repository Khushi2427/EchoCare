import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Brain,
  Calendar,
  BookOpen,
  Users,
  Shield,
  LogOut,
  Bell,
  Settings,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Heart,
  Zap,
  Target,
  Star
} from "lucide-react";

const StudentDashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading your dashboard...</h2>
          <p className="text-gray-500 mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigation items
  const navItems = [
    { name: "Overview", icon: <Home className="w-5 h-5" />, id: "overview", link: "#" },
    { name: "Profile", icon: <User className="w-5 h-5" />, id: "profile", link: "/student/profile" },
    { name: "Counselling", icon: <Brain className="w-5 h-5" />, id: "counselling", link: "/student/counsellors" },
    { name: "Appointments", icon: <Calendar className="w-5 h-5" />, id: "appointments", link: "/student/appointments" },
    { name: "Resources", icon: <BookOpen className="w-5 h-5" />, id: "resources", link: "/student/resources" },
    { name: "AI Chat", icon: <Users className="w-5 h-5" />, id: "ai-chat", link: "/student/ai-chat" },
    { name: "Communities", icon: <Settings className="w-5 h-5" />, id: "settings", link: "/student/communities" },
  ];

  // Services Grid
  const services = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Counselling",
      description: "Access professional mental health support",
      link: "/student/counsellors",
      color: "from-purple-500 to-pink-500",
      suggestion: "Feeling overwhelmed? Talk to a professional counsellor"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Appointments",
      description: "Schedule and manage your counselling sessions",
      link: "/student/appointments",
      color: "from-green-500 to-teal-500",
      suggestion: "Book a session to start your wellness journey"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Resources",
      description: "Access educational materials and guides",
      link: "/student/resources",
      color: "from-orange-500 to-red-500",
      suggestion: "Explore articles and videos for self-help"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "AI Chat",
      description: "Talk to our AI-powered mental health assistant",
      link: "/student/ai-chat",
      color: "from-blue-500 to-cyan-500",
      suggestion: "Need immediate support? Chat with our AI assistant"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Emergency Help",
      description: "Get immediate assistance when you need it",
      link: "/student/emergency",
      color: "from-red-500 to-rose-500",
      suggestion: "Urgent support available 24/7"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Communities",
      description: "Connect with peers in support communities",
      link: "/student/communities",
      color: "from-indigo-500 to-violet-500",
      suggestion: "Join others on similar journeys"
    },
  ];

  // Suggestions for Services
  const suggestions = [
    {
      title: "Start Your Wellness Journey",
      description: "Take your first step towards better mental health",
      action: "Book First Session",
      icon: <Zap className="w-5 h-5" />,
      link: "/student/counsellors"
    },
    {
      title: "Explore Resources",
      description: "Learn coping strategies and mindfulness techniques",
      action: "Browse Library",
      icon: <BookOpen className="w-5 h-5" />,
      link: "/student/resources"
    },
    {
      title: "Try AI Chat",
      description: "Get instant support from our AI assistant",
      action: "Start Chat",
      icon: <Brain className="w-5 h-5" />,
      link: "/student/ai-chat"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-800">Dashboard</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar for Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">Wellness Portal</h2>
                      <p className="text-sm text-gray-600">Student Dashboard</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Profile Card */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 mb-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </nav>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Log Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen bg-white border-r border-gray-200 sticky top-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Wellness Portal</h2>
                <p className="text-sm text-gray-600">Student Dashboard</p>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Quick Tips */}
          <div className="p-6 border-t border-gray-200 mt-6">
            <h4 className="font-bold text-gray-800 mb-4">Quick Tips</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                <span>Take one step at a time</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Heart className="w-4 h-4 text-red-500 mt-0.5" />
                <span>Your mental health matters</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Star className="w-4 h-4 text-amber-500 mt-0.5" />
                <span>Be kind to yourself today</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">{user.name.split(' ')[0]}!</span> 👋
              </h1>
              <p className="text-gray-600 mt-2">Here's everything you need for your wellness journey</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Suggestions Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Get Started</h2>
              <p className="text-gray-600">Begin your wellness journey today</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Link
                    to={suggestion.link}
                    className="block group"
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white`}>
                          {suggestion.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{suggestion.title}</h3>
                          <p className="text-sm text-gray-600">{suggestion.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">{suggestion.action}</span>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Our Services</h2>
              <p className="text-gray-600">All support options available to you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Link
                    to={service.link}
                    className="block group"
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} text-white mb-4`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-sm text-blue-700 font-medium">{service.suggestion}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm font-medium text-blue-600">Access Service</span>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Main Content */}
      <div className="md:hidden p-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-6 text-white mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="opacity-90">Your wellness journey continues here</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Get Started Suggestions */}
        <h3 className="text-lg font-bold text-gray-800 mb-4">Get Started</h3>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {suggestions.map((suggestion, index) => (
            <Link
              key={index}
              to={suggestion.link}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Services Grid */}
        <h3 className="text-lg font-bold text-gray-800 mb-4">Our Services</h3>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {services.slice(0, 3).map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${service.color} text-white`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{service.title}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <div className="mt-2 p-2 bg-blue-50 rounded">
                    <p className="text-xs text-blue-700">{service.suggestion}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Need Help?</h3>
          <div className="space-y-3">
            <Link
              to="/student/ai-chat"
              className="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <span className="font-medium">AI Chat Support</span>
              <Brain className="w-5 h-5 text-blue-500" />
            </Link>
            <Link
              to="/student/emergency"
              className="flex items-center justify-between p-3 bg-white rounded-lg"
            >
              <span className="font-medium">Emergency Help</span>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;