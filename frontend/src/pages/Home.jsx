import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Brain, 
  Users, 
  Shield, 
  Clock, 
  BookOpen,
  MessageSquare,
  Calendar,
  AlertTriangle,
  GraduationCap,
  ArrowRight,
  Heart,
  Menu,
  X,
  Video,
  Headphones,
  FileText,
  Globe,
  Code,
  Music,
  Dumbbell,
  GamepadIcon,
  Stethoscope,
  Search,
  Filter,
  PlayCircle,
  Download,
  Share2,
  Star,
  Award,
  Languages,
  MessageCircle,
  UserCheck,
  Zap,
  Lock,
  Bell
} from "lucide-react";

const Home = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items
  const navItems = [
    { name: "Home", path: "/", icon: <Sparkles className="w-4 h-4" /> },
    { name: "AI Chat", path: "/ai-chat", icon: <Brain className="w-4 h-4" /> },
    { name: "Book", path: "/book", icon: <Calendar className="w-4 h-4" /> },
    { name: "Resources", path: "/resources", icon: <BookOpen className="w-4 h-4" /> },
    { name: "Community", path: "/community", icon: <Users className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <GraduationCap className="w-4 h-4" /> },
  ];

  // Features
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Mental Health Chat",
      description: "Talk freely with our empathetic AI that uses sentiment analysis to detect stress levels and provide personalized, instant support.",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Certified Counsellors",
      description: "Connect with licensed professionals for private sessions. Book appointments seamlessly with our integrated scheduling system.",
      color: "green",
      gradient: "from-green-500 to-teal-500",
      delay: 0.2
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Safe Community Spaces",
      description: "Join moderated peer support groups and Discord communities where students share experiences in a stigma-free environment.",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.3
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "Real-time Stress Detection",
      description: "Advanced AI monitors conversation patterns and flags high-stress situations for immediate counselor intervention.",
      color: "yellow",
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.4
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Wellness Resources",
      description: "Access guided meditations, mindfulness exercises, and educational content curated by mental health experts.",
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
      delay: 0.5
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Admin Dashboard",
      description: "Colleges get comprehensive analytics and tools to monitor student wellness trends and manage support resources.",
      color: "indigo",
      gradient: "from-indigo-500 to-violet-500",
      delay: 0.6
    }
  ];

  // Stats
  const stats = [
    { number: "24/7", label: "Available Support", icon: <Clock className="w-5 h-5" /> },
    { number: "100%", label: "Confidential", icon: <Shield className="w-5 h-5" /> },
    { number: "500+", label: "Active Counselors", icon: <Users className="w-5 h-5" /> },
    { number: "50K+", label: "Students Helped", icon: <Heart className="w-5 h-5" /> }
  ];

  // Resource Hub Items
  const resources = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Guides",
      description: "Expert-led wellness videos covering stress, anxiety, and mindfulness.",
      count: "50+ Videos Available",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Guided Audios",
      description: "Meditation, breathing exercises, and sleep stories.",
      count: "100+ Audio Tracks",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Wellness Guides",
      description: "Comprehensive guides on mental health topics and coping strategies.",
      count: "30+ Guides",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language",
      description: "Resources available in Hindi, English, Tamil, Bengali, and more.",
      count: "10+ Languages",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  // Community Categories
  const communities = [
    {
      icon: <Code className="w-5 h-5" />,
      title: "Coding Community",
      description: "Connect with fellow programmers, share coding challenges, and support each other through tech stress.",
      members: "2.5k+ Members",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Music className="w-5 h-5" />,
      title: "Music & Beatboxing",
      description: "Express yourself through music, share beats, and find therapeutic rhythm with creative peers.",
      members: "1.8k+ Members",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Dumbbell className="w-5 h-5" />,
      title: "Fitness & Wellness",
      description: "Share workout routines, wellness tips, and motivate each other towards healthier lifestyles.",
      members: "3.2k+ Members",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <GamepadIcon className="w-5 h-5" />,
      title: "Gaming Community",
      description: "Game together, discuss healthy gaming habits, and build friendships through shared virtual experiences.",
      members: "4.1k+ Members",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Stethoscope className="w-5 h-5" />,
      title: "Mental Health Support",
      description: "A safe space for sharing experiences, coping strategies, and supporting each other's mental health journey.",
      members: "5.7k+ Members",
      color: "from-indigo-500 to-violet-500"
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Study Groups",
      description: "Academic support, study tips, and collaborative learning with peers across different fields.",
      members: "3.9k+ Members",
      color: "from-yellow-500 to-amber-500"
    }
  ];

  // AI Features
  const aiFeatures = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Response",
      description: "Available 24/7 with immediate coping strategies and emotional support.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Privacy First",
      description: "Completely confidential conversations with end-to-end encryption.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Professional Referrals",
      description: "Smart connections to counselors and mental health professionals.",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9fc] to-white">
      {/* Animated Background Elements */}
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
          className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Sticky Navbar with Scroll Effect & Hamburger Menu */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-lg" 
            : "bg-white shadow-sm"
        }`}
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            EchoCare
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 lg:gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={item.path}
                className="relative text-gray-600 hover:text-purple-600 font-medium px-2 lg:px-3 py-1 lg:py-2 transition-colors group text-sm lg:text-base"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-2 lg:gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-medium transition-colors text-sm lg:text-base"
            >
              Sign In
            </Link>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              to="/register"
              className="px-4 lg:px-5 py-2 lg:py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-shadow text-sm lg:text-base"
            >
              Sign Up Free
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      EchoCare
                    </span>
                  </div>
                  <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1 mb-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={toggleMobileMenu}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-purple-600 transition-colors"
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={toggleMobileMenu}
                    className="block w-full py-3 text-center border-2 border-purple-500 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMobileMenu}
                    className="block w-full py-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Sign Up Free
                  </Link>
                </div>

                {/* Mobile Quick Stats */}
                <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-2">Quick Stats</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-white rounded-lg">
                      <div className="text-xs text-gray-500">Online</div>
                      <div className="text-sm font-bold text-green-600">1.2k+</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <div className="text-xs text-gray-500">Available</div>
                      <div className="text-sm font-bold text-purple-600">24/7</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative px-4 md:px-6 lg:px-10 py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs md:text-sm font-medium mb-4 md:mb-6">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              Trusted by 100+ Colleges
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your 24/7 AI Mental
              </span>
              <span className="block bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                Wellness Companion
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-xl leading-relaxed">
              Timely support, confidential care, and a strong student community. 
              Talk to AI, book private counselling sessions, and connect with peers 
              in a safe, stigma-free environment designed for student success.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  to="/ai-chat"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:shadow-xl transition-all w-full sm:w-auto text-sm md:text-base"
                >
                  Start AI Conversation
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link
                  to="/book"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 border-2 border-gray-300 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:border-purple-400 hover:bg-purple-50 transition-all w-full sm:w-auto text-sm md:text-base"
                >
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  Book Session
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-1 md:gap-2 mb-1 md:mb-2">
                    {stat.icon}
                    <span className="text-xl md:text-2xl font-bold text-gray-800">{stat.number}</span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 md:mt-0"
          >
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl md:rounded-3xl p-2 shadow-xl md:shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                alt="Students support"
                className="rounded-xl md:rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-1 md:gap-2">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs md:text-sm font-medium">AI Chat Active</span>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-white p-2 md:p-4 rounded-xl md:rounded-2xl shadow-lg"
            >
              <div className="text-xs md:text-sm font-bold text-purple-600">500+ Happy Students</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

            {/* Features Section */}
            <section className="px-4 md:px-6 lg:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Everything You Need for Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mental Wellness
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              A comprehensive platform combining AI technology with human empathy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`inline-flex p-2 md:p-3 rounded-lg bg-gradient-to-br ${feature.gradient} text-white mb-3 md:mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2 md:mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                    {feature.description}
                  </p>
                  <Link 
                    to={`/${feature.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                    className="inline-flex items-center gap-1 md:gap-2 text-purple-600 font-medium text-xs md:text-sm group-hover:gap-2 md:group-hover:gap-3 transition-all"
                  >
                    Learn more
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI First-Aid Section */}
      <section className="px-4 md:px-6 lg:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI First-Aid Support
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Get instant, personalized coping strategies and professional referrals through our advanced AI companion.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden mb-12 md:mb-16">
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {aiFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100"
                  >
                    <div className={`p-2 rounded-lg ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">EchoCare AI Assistant</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Online • Ready to chat</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Hi! I'm here to help. How are you feeling today?",
                      "I'm feeling really anxious about my exams",
                      "I understand exam anxiety can be overwhelming. Let me share some breathing techniques that can help..."
                    ].map((msg, i) => (
                      <div key={i} className={`flex ${i === 1 ? 'justify-end' : ''}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${i === 1 ? 'bg-purple-100 text-gray-800' : 'bg-gray-100 text-gray-800'}`}>
                          <p className="text-sm">{msg}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Start a Conversation</h4>
                    <p className="text-sm text-gray-600 mb-4">Our AI is trained to provide compassionate, evidence-based support</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/ai-chat"
                      className="block w-full py-3 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow text-sm md:text-base"
                    >
                      Start Free Chat
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Confidential Session */}
      <section className="px-4 md:px-6 lg:px-10 py-12 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Book Confidential Session
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Schedule private appointments with certified counselors at your convenience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6">Schedule Your Session</h3>
              
              <div className="space-y-4 md:space-y-6">
                {[
                  { label: "Preferred Date", placeholder: "dd-mm-yyyy", icon: <Calendar className="w-5 h-5 text-gray-400" /> },
                  { label: "Preferred Time", placeholder: "Morning (9 AM - 12 PM)", icon: <Clock className="w-5 h-5 text-gray-400" /> },
                  { label: "Session Type", placeholder: "Individual Counseling", icon: <Users className="w-5 h-5 text-gray-400" /> }
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full p-3 md:p-4 pl-10 md:pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 text-sm md:text-base"
                      />
                      <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2">
                        {field.icon}
                      </div>
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief Description (Optional)
                  </label>
                  <textarea
                    placeholder="Briefly describe what you'd like to discuss..."
                    rows="3"
                    className="w-full p-3 md:p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300 text-sm md:text-base"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button className="w-full py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow text-sm md:text-base">
                    Book Appointment
                  </button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 md:space-y-6"
            >
              {[
                {
                  icon: <Shield className="w-5 h-5" />,
                  title: "100% Confidential",
                  description: "Your privacy is our top priority. All sessions are completely confidential and secure.",
                  color: "text-blue-600 bg-blue-50"
                },
                {
                  icon: <Award className="w-5 h-5" />,
                  title: "Certified Professionals",
                  description: "Connect with licensed counselors and mental health professionals.",
                  color: "text-green-600 bg-green-50"
                },
                {
                  icon: <Calendar className="w-5 h-5" />,
                  title: "Flexible Scheduling",
                  description: "Book sessions that fit your schedule, with same-day availability for urgent needs.",
                  color: "text-purple-600 bg-purple-50"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-lg"
                >
                  <div className={`p-2 rounded-lg ${benefit.color}`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Multi-Language Resource Hub */}
      <section className="px-4 md:px-6 lg:px-10 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Multi-Language Resource Hub
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Access psychoeducational materials in your preferred language - videos, guided audios, and wellness guides.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-2 md:p-3 rounded-lg ${resource.color} mb-3 md:mb-4`}>
                  {resource.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">{resource.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">{resource.description}</p>
                <div className={`text-xs md:text-sm font-bold ${resource.color.split(' ')[1]}`}>
                  {resource.count}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:shadow-xl transition-shadow text-sm md:text-base"
              >
                <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                Explore All Resources
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Connect Section */}
      <section className="px-4 md:px-6 lg:px-10 py-12 md:py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Community Connect
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Join supportive peer communities based on your interests. Find your tribe and grow together.
            </p>
          </motion.div>

          {/* Community Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {communities.map((community, index) => (
              <motion.div
                key={community.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative overflow-hidden bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${community.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative p-4 md:p-6">
                  <div className={`inline-flex p-2 md:p-3 rounded-lg bg-gradient-to-br ${community.color} text-white mb-3 md:mb-4`}>
                    {community.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base">{community.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">{community.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-medium text-purple-600">{community.members}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 md:gap-3 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold transition-all duration-300 text-sm md:text-base"
              >
                <Users className="w-4 h-4 md:w-5 md:h-5" />
                Explore All Communities
              </Link>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Interactive Demo Section */}
      <section className="px-4 md:px-6 lg:px-10 py-12 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Try Our{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Wellness Chat
                </span>
              </h2>
              <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">
                Experience how our AI understands and responds to your emotions in real-time.
                It's always here to listen, 24/7.
              </p>
              
              <div className="space-y-3 md:space-y-4">
                {[
                  "How are you feeling today?",
                  "I'm here to listen, no judgment",
                  "Let's work through this together"
                ].map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                    <div className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm">
                      <p className="text-sm md:text-base text-gray-800">{msg}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mt-8 md:mt-0"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 md:p-6 text-white">
                  <h3 className="text-lg md:text-xl font-bold">AI Wellness Assistant</h3>
                  <p className="text-purple-100 text-sm">Online • Ready to chat</p>
                </div>
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    <div className="text-center py-4 md:py-8">
                      <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                        <Brain className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                      </div>
                      <p className="text-gray-600 text-sm md:text-base">Start a conversation about anything on your mind</p>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/ai-chat"
                      className="block w-full py-3 md:py-4 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg md:rounded-xl font-bold hover:shadow-lg transition-shadow text-sm md:text-base"
                    >
                      Start Free Chat
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 lg:px-10 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 20 + i * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute w-32 h-32 md:w-64 md:h-64 border border-white/10 rounded-full"
                  style={{
                    top: `${30 + i * 20}%`,
                    left: `${10 + i * 30}%`
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 text-white/20" />
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                You're Never Alone 💙
              </h2>
              <p className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-white/90">
                Join thousands of students who've found support, community, and 
                professional care through EchoCare.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/register"
                    className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-purple-600 rounded-full font-bold hover:shadow-2xl transition-shadow text-sm md:text-base"
                  >
                    Start Your Journey Free
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/colleges"
                    className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors text-sm md:text-base"
                  >
                    For Colleges
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 lg:px-10 py-8 md:py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                <span className="text-xl md:text-2xl font-bold">EchoCare</span>
              </div>
              <p className="text-gray-400 text-xs md:text-sm">
                Empowering student mental wellness through AI and human connection.
              </p>
            </div>
            
            {["Product", "Company", "Resources", "Legal"].map((section) => (
              <div key={section}>
                <h4 className="font-bold mb-2 md:mb-4 text-sm md:text-base">{section}</h4>
                <ul className="space-y-1 md:space-y-2 text-gray-400 text-xs md:text-sm">
                  {section === "Product" && ["AI Chat", "Counselling", "Community", "Resources"].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                  {section === "Company" && ["About", "Careers", "Contact", "Partners"].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                  {section === "Resources" && ["Blog", "Research", "Guides", "Help Center"].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                  {section === "Legal" && ["Privacy", "Terms", "Security", "Compliance"].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-6 md:pt-8 border-t border-gray-800 text-center text-gray-400 text-xs md:text-sm">
            <p>© 2025 EchoCare • Mental Wellness System for Colleges • Made with ❤️ for students</p>
            <p className="mt-1 md:mt-2">Crisis Line: 1-800-273-8255 • Available 24/7</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;