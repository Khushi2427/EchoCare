import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  MessageSquare,
  Heart,
  Lock,
  LogIn,
  UserPlus,
  ArrowRight,
  Search,
  Filter,
  Users2,
  MessageCircle,
  Calendar,
  Award,
  TrendingUp,
  Globe,
  Video,
  Music,
  Code,
  Dumbbell,
  Gamepad2,
  BookOpen,
  Coffee,
  Lightbulb,
  Shield,
  CheckCircle,
  ExternalLink,
  Bell,
  Star
} from "lucide-react";

const Community = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("communities");

  // Mock login check
  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const communityCategories = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Tech & Coding",
      description: "Connect with fellow programmers, share coding challenges, and support each other through tech stress.",
      members: "2.5k+ Members",
      color: "from-blue-500 to-cyan-500",
      topics: ["Programming", "Career", "Tech Stress", "Projects"]
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Study Groups",
      description: "Academic support, study tips, and collaborative learning with peers across different fields.",
      members: "3.9k+ Members",
      color: "from-purple-500 to-pink-500",
      topics: ["Exam Prep", "Homework", "Research", "Time Management"]
    },
    {
      icon: <Music className="w-5 h-5" />,
      title: "Music & Arts",
      description: "Express yourself through music, share beats, and find therapeutic rhythm with creative peers.",
      members: "1.8k+ Members",
      color: "from-green-500 to-teal-500",
      topics: ["Music Therapy", "Creative Expression", "Instrument", "Songwriting"]
    },
    {
      icon: <Dumbbell className="w-5 h-5" />,
      title: "Fitness & Wellness",
      description: "Share workout routines, wellness tips, and motivate each other towards healthier lifestyles.",
      members: "3.2k+ Members",
      color: "from-orange-500 to-red-500",
      topics: ["Exercise", "Nutrition", "Yoga", "Mental Wellness"]
    },
    {
      icon: <Gamepad2 className="w-5 h-5" />,
      title: "Gaming",
      description: "Game together, discuss healthy gaming habits, and build friendships through shared virtual experiences.",
      members: "4.1k+ Members",
      color: "from-indigo-500 to-violet-500",
      topics: ["Gaming Stress", "Team Building", "E-sports", "Balance"]
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Mental Health Support",
      description: "A safe space for sharing experiences, coping strategies, and supporting each other's mental health journey.",
      members: "5.7k+ Members",
      color: "from-pink-500 to-rose-500",
      topics: ["Anxiety", "Depression", "Coping", "Recovery"]
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      title: "Social Connections",
      description: "Make new friends, socialize, and combat loneliness through virtual and in-person meetups.",
      members: "4.8k+ Members",
      color: "from-amber-500 to-yellow-500",
      topics: ["Friendship", "Social Anxiety", "Networking", "Events"]
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Entrepreneurship",
      description: "Share startup ideas, discuss business challenges, and support each other's entrepreneurial journeys.",
      members: "2.1k+ Members",
      color: "from-emerald-500 to-green-500",
      topics: ["Startups", "Funding", "Innovation", "Stress Management"]
    }
  ];

  const categories = [
    { id: "all", label: "All Communities", icon: <Users2 className="w-4 h-4" /> },
    { id: "academic", label: "Academic", icon: <BookOpen className="w-4 h-4" /> },
    { id: "creative", label: "Creative", icon: <Music className="w-4 h-4" /> },
    { id: "health", label: "Health & Wellness", icon: <Heart className="w-4 h-4" /> },
    { id: "tech", label: "Tech", icon: <Code className="w-4 h-4" /> },
    { id: "social", label: "Social", icon: <Users className="w-4 h-4" /> }
  ];

  const upcomingEvents = [
    {
      title: "Weekly Support Circle",
      date: "Tomorrow, 7 PM",
      attendees: "45 attending",
      type: "Virtual",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Study Techniques Workshop",
      date: "Dec 28, 5 PM",
      attendees: "120 attending",
      type: "Webinar",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Mindfulness Meditation",
      date: "Daily, 8 AM",
      attendees: "Join anytime",
      type: "Daily Practice",
      color: "bg-green-100 text-green-600"
    }
  ];

  const communityGuidelines = [
    "Be respectful and kind to others",
    "Maintain confidentiality of shared experiences",
    "No discrimination or hate speech",
    "Share resources and support generously",
    "Report any concerns to moderators"
  ];

  const handleJoinCommunity = (community) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    alert(`Joining: ${community.title}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
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
            </div>
          </div>
        </header>

        {/* Login Required Section */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              EchoCare Community
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join supportive peer communities, share experiences, and grow together in a safe, stigma-free environment.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-bold text-gray-800">Community Access Required</h2>
            </div>
            
            <p className="text-gray-600 mb-8 text-center">
              Our supportive communities are available exclusively to EchoCare members.
              Register for free to connect with peers, join discussions, and participate in events.
            </p>

            {/* Community Preview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {communityCategories.slice(0, 4).map((community, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6"
                >
                  <div className={`inline-flex p-2 bg-gradient-to-br ${community.color} rounded-lg text-white mb-4`}>
                    {community.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{community.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{community.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">{community.members}</span>
                    <div className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">PREVIEW</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-full mb-6">
                <Shield className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-700 font-medium">Login required to join communities</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                >
                  <LogIn className="w-5 h-5" />
                  Login to Join Community
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-teal-500 text-teal-600 rounded-xl font-bold hover:bg-teal-50 transition-all hover:scale-105"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Free Account
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Already have an account? <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium">Login here</Link>
              </p>
            </div>
          </div>

          {/* Community Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Why Join EchoCare Community?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3">Peer Support</h3>
                <p className="text-gray-600 text-sm">
                  Connect with students who understand your experiences and challenges.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3">Safe Space</h3>
                <p className="text-gray-600 text-sm">
                  Moderated communities ensure respectful, stigma-free conversations.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-3">Events & Activities</h3>
                <p className="text-gray-600 text-sm">
                  Join workshops, support circles, and social events.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Community Guidelines Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-8"
          >
            <h3 className="font-bold text-gray-800 mb-6 text-center">Community Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {communityGuidelines.slice(0, 4).map((guideline, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{guideline}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // Logged in view
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
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
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-teal-600" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              EchoCare Community
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join supportive peer communities, share experiences, and grow together in a safe, stigma-free environment.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Members", value: "25,432", icon: <Users2 className="w-5 h-5" /> },
              { label: "Active Groups", value: "48", icon: <MessageCircle className="w-5 h-5" /> },
              { label: "Online Now", value: "1,248", icon: <Globe className="w-5 h-5" /> },
              { label: "Events Today", value: "12", icon: <Calendar className="w-5 h-5" /> }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {stat.icon}
                  <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search communities or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                />
              </div>
              
              <div className="flex gap-3">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none pl-10 pr-8 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                
                <div className="flex rounded-xl overflow-hidden border-2 border-gray-200">
                  <button
                    onClick={() => setActiveTab("communities")}
                    className={`px-4 py-3 font-medium ${activeTab === "communities" ? 'bg-teal-500 text-white' : 'bg-gray-50 text-gray-600'}`}
                  >
                    Communities
                  </button>
                  <button
                    onClick={() => setActiveTab("events")}
                    className={`px-4 py-3 font-medium ${activeTab === "events" ? 'bg-teal-500 text-white' : 'bg-gray-50 text-gray-600'}`}
                  >
                    Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Communities Grid */}
        {activeTab === "communities" && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {communityCategories.map((community, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group cursor-pointer"
                  onClick={() => handleJoinCommunity(community)}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
                    <div className={`h-2 bg-gradient-to-r ${community.color}`} />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`inline-flex p-2 bg-gradient-to-br ${community.color} rounded-lg text-white`}>
                          {community.icon}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">4.8</span>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-gray-800 mb-2 text-lg">{community.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{community.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-500 mb-2">POPULAR TOPICS</h4>
                        <div className="flex flex-wrap gap-1">
                          {community.topics.slice(0, 3).map((topic, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-600">{community.members}</span>
                        <div className="flex items-center gap-2 text-teal-600 font-medium text-sm group-hover:gap-3 transition-all">
                          Join
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Community Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-teal-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Community Guidelines</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 mb-6">
                      Our community is built on respect, empathy, and support. Please follow these guidelines:
                    </p>
                    <ul className="space-y-3">
                      {communityGuidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl p-6">
                    <h3 className="font-bold text-gray-800 mb-4">Need Help?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Community Moderators</h4>
                          <p className="text-sm text-gray-600">Available to help with any issues or concerns</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Peer Support</h4>
                          <p className="text-sm text-gray-600">Connect with trained peer supporters</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                          <Heart className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800 mb-1">Professional Help</h4>
                          <p className="text-sm text-gray-600">Access to counselors when needed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Upcoming Events */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg mb-1">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {event.attendees}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.color}`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Join our community for this supportive event designed to help students connect and grow together.
                      </p>
                      <div className="flex gap-3">
                        <button className="px-6 py-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
                          Join Event
                        </button>
                        <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Stats & Quick Actions */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6">
                  <h3 className="font-bold text-gray-800 mb-4">Your Communities</h3>
                  <div className="space-y-3">
                    {communityCategories.slice(0, 3).map((comm, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-1 bg-gradient-to-br ${comm.color} rounded`}>
                            {comm.icon}
                          </div>
                          <span className="font-medium text-gray-800">{comm.title}</span>
                        </div>
                        <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Joined</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-teal-50 rounded-lg transition-colors">
                      <span className="font-medium text-gray-800">Create New Group</span>
                      <Users className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-teal-50 rounded-lg transition-colors">
                      <span className="font-medium text-gray-800">Schedule Event</span>
                      <Calendar className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-teal-50 rounded-lg transition-colors">
                      <span className="font-medium text-gray-800">Find Peer Support</span>
                      <Heart className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Make Connections?</h2>
            <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
              Join thousands of students who've found friendship, support, and community through EchoCare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-teal-600 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105">
                Explore All Communities
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all hover:scale-105">
                Host an Event
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>
              EchoCare Community is a moderated, safe space for students to connect and support each other.
            </p>
            <p className="mt-2">
              © 2025 EchoCare Student Community. All discussions are confidential and protected by our privacy policy.
            </p>
            <p className="mt-2 text-teal-600 font-medium">
              Need immediate help? Call Crisis Line: 1-800-273-8255
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Community;