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
  Award,
  MessageCircle,
  Zap,
  Lock,
  UserCheck,
  Stethoscope,
  Activity
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "AI Chat", path: "/ai-chat" },
    { name: "Book Session", path: "/book" },
    { name: "Resources", path: "/resources" },
    { name: "Community", path: "/community" },
    { name: "About", path: "/about" },
  ];

  // Features
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Mental Health Chat",
      description: "Talk freely with our empathetic AI that uses sentiment analysis to detect stress levels.",
      gradient: "from-teal-500 to-blue-500",
      delay: 0.1
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Certified Counsellors",
      description: "Connect with licensed professionals for private, confidential sessions.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Safe Community",
      description: "Join moderated peer support groups in a stigma-free environment.",
      gradient: "from-teal-600 to-emerald-500",
      delay: 0.3
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Wellness Resources",
      description: "Access guided meditations, mindfulness exercises, and educational content.",
      gradient: "from-sky-500 to-blue-600",
      delay: 0.4
    }
  ];

  // Stats
  const stats = [
    { number: "24/7", label: "Available Support", icon: <Clock className="w-5 h-5" /> },
    { number: "100%", label: "Confidential", icon: <Shield className="w-5 h-5" /> },
    { number: "Certified", label: "Counsellors", icon: <Users className="w-5 h-5" /> },
    { number: "Many", label: "Students Helped", icon: <Heart className="w-5 h-5" /> }
  ];

  // AI Features
  const aiFeatures = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Response",
      description: "Available 24/7 with immediate coping strategies.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Privacy First",
      description: "Completely confidential with end-to-end encryption.",
      color: "bg-teal-50 text-teal-600"
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Professional Referrals",
      description: "Smart connections to mental health professionals.",
      color: "bg-sky-50 text-sky-600"
    }
  ];

  // Resource Hub Items
  const resources = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Guides",
      description: "Expert-led wellness videos and tutorials.",
      count: "50+ Videos",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Guided Audios",
      description: "Meditation and breathing exercises.",
      count: "100+ Tracks",
      color: "bg-teal-100 text-teal-600"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Wellness Guides",
      description: "Comprehensive mental health guides.",
      count: "30+ Guides",
      color: "bg-sky-100 text-sky-600"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language",
      description: "Resources in 10+ languages.",
      count: "Hindi, English, Tamil",
      color: "bg-cyan-100 text-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
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
          className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10 py-4 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-lg" 
            : "bg-white shadow-sm"
        }`}
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <Activity className="w-6 h-6 text-teal-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            EchoCare
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={item.path}
                className="relative text-gray-600 hover:text-teal-600 font-medium px-3 py-2 transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full border-2 border-teal-500 text-teal-600 hover:bg-teal-50 font-medium transition-colors"
            >
              Sign In
            </Link>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 text-white font-medium hover:shadow-lg transition-shadow"
            >
              Sign Up Free
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
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
                    <Activity className="w-5 h-5 text-teal-600" />
                    <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
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
                      className="block p-3 rounded-lg hover:bg-teal-50 text-gray-700 hover:text-teal-600 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={toggleMobileMenu}
                    className="block w-full py-3 text-center border-2 border-teal-500 text-teal-600 rounded-lg font-medium hover:bg-teal-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={toggleMobileMenu}
                    className="block w-full py-3 text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-600 text-sm font-medium mb-6">
              <Stethoscope className="w-4 h-4" />
              Trusted by 100+ Colleges
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Your 24/7 Mental
              </span>
              <span className="block bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Wellness Companion
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Timely support, confidential care, and a strong student community. 
              Talk to AI, book private counselling sessions, and access wellness resources.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/ai-chat"
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  Start AI Conversation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/book"
                  className="group inline-flex items-center justify-center gap-3 border-2 border-gray-300 px-8 py-4 rounded-full font-semibold hover:border-teal-400 hover:bg-teal-50 transition-all w-full sm:w-auto"
                >
                  <Calendar className="w-5 h-5" />
                  Book Session
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {stat.icon}
                    <span className="text-2xl font-bold text-gray-800">{stat.number}</span>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-teal-100 to-blue-100 rounded-3xl p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                alt="Students support"
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">AI Chat Active</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need for Your{" "}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Mental Wellness
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A comprehensive platform combining AI technology with human empathy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <Link 
                    to={`/${feature.title.toLowerCase().replace(/ /g, "-")}`}
                    className="inline-flex items-center gap-2 text-teal-600 font-medium text-sm group-hover:gap-3 transition-all"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI First-Aid Section */}
      <section className="px-6 lg:px-10 py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                AI First-Aid Support
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Get instant, personalized coping strategies and professional referrals.
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
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

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg">
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
                      "I understand exam anxiety can be overwhelming. Let me share some breathing techniques..."
                    ].map((msg, i) => (
                      <div key={i} className={`flex ${i === 1 ? 'justify-end' : ''}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${i === 1 ? 'bg-teal-100 text-gray-800' : 'bg-gray-100 text-gray-800'}`}>
                          <p className="text-sm">{msg}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-2xl border border-teal-100"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-teal-600" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">Start a Conversation</h4>
                    <p className="text-sm text-gray-600 mb-4">Our AI provides compassionate, evidence-based support</p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/ai-chat"
                      className="block w-full py-3 text-center bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow"
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

      {/* Book Session Section */}
      <section className="px-6 lg:px-10 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Book Confidential Session
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Schedule private appointments with certified counselors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Schedule Your Session</h3>
              
              <div className="space-y-6">
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
                        className="w-full p-4 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
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
                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button className="w-full py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-shadow">
                    Book Appointment
                  </button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
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
                  color: "text-teal-600 bg-teal-50"
                },
                {
                  icon: <Calendar className="w-5 h-5" />,
                  title: "Flexible Scheduling",
                  description: "Book sessions that fit your schedule, with same-day availability.",
                  color: "text-cyan-600 bg-cyan-50"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg"
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

      {/* Resource Hub */}
      <section className="px-6 lg:px-10 py-20 bg-gradient-to-br from-gray-50 to-teal-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Wellness Resource Hub
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Access psychoeducational materials in your preferred language.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-lg ${resource.color} mb-4`}>
                  {resource.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <div className={`text-sm font-bold ${resource.color.split(' ')[1]}`}>
                  {resource.count}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/resources"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-shadow"
              >
                <BookOpen className="w-5 h-5" />
                Explore All Resources
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-gradient-to-br from-teal-500 via-blue-500 to-cyan-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <Heart className="w-16 h-16 mx-auto mb-6 text-white/20" />
              <h2 className="text-5xl font-bold mb-6">
                You're Never Alone
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                Join thousands of students who've found support and care through EchoCare.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/register"
                    className="inline-block px-8 py-4 bg-white text-teal-600 rounded-full font-bold hover:shadow-2xl transition-shadow"
                  >
                    Start Your Journey Free
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/colleges"
                    className="inline-block px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors"
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
      <footer className="px-6 lg:px-10 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-6 h-6 text-teal-400" />
                <span className="text-2xl font-bold">EchoCare</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering student mental wellness through AI and human connection.
              </p>
            </div>
            
            {["Product", "Company", "Resources", "Legal"].map((section) => (
              <div key={section}>
                <h4 className="font-bold mb-4">{section}</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  {section === "Product" && ["AI Chat", "Counselling", "Community", "Resources"].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                  {section === "Company" && ["About", "Careers", "Contact"].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase()}`} className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                  {section === "Resources" && ["Blog", "Guides", "Help Center"].map(item => (
                    <li key={item}>
                      <Link to={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                  {section === "Legal" && ["Privacy", "Terms", "Security"].map(item => (
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
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© 2025 EchoCare • Mental Wellness System for Colleges • Made with ❤️ for students</p>
            <p className="mt-2">Crisis Line: khushigupta16057@gmail.com • Available 24/7</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;