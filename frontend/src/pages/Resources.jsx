import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Video,
  Headphones,
  FileText,
  Globe,
  BookOpen,
  PlayCircle,
  Download,
  Search,
  Filter,
  Lock,
  LogIn,
  UserPlus,
  ArrowRight,
  ExternalLink,
  Languages,
  Volume2,
  Film,
  Book,
  AlertCircle,
  Heart,
  CheckCircle
} from "lucide-react";

const Resources = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  // Mock login check
  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const resourceCategories = [
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Guides",
      description: "Expert-led wellness videos and tutorials.",
      count: "50+ Videos",
      color: "bg-blue-100 text-blue-600",
      type: "video",
      items: [
        "Managing Exam Anxiety",
        "Mindfulness Meditation Guide",
        "Stress Relief Techniques",
        "Building Resilience",
        "Sleep Better Series",
        "Emotional Regulation"
      ]
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Guided Audios",
      description: "Meditation and breathing exercises.",
      count: "100+ Tracks",
      color: "bg-green-100 text-green-600",
      type: "audio",
      items: [
        "5-Minute Breathing Exercise",
        "Sleep Meditation",
        "Anxiety Relief Session",
        "Body Scan Relaxation",
        "Focus & Concentration",
        "Morning Mindfulness"
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Wellness Guides",
      description: "Comprehensive mental health guides.",
      count: "30+ Guides",
      color: "bg-purple-100 text-purple-600",
      type: "guide",
      items: [
        "Understanding Depression",
        "Coping with Anxiety",
        "Building Healthy Habits",
        "Academic Stress Management",
        "Social Connection Guide",
        "Self-Care Workbook"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language",
      description: "Resources in 10+ languages.",
      count: "Hindi, English, Tamil",
      color: "bg-orange-100 text-orange-600",
      type: "language",
      languages: ["Hindi", "English", "Tamil", "Bengali", "Telugu", "Marathi", "Gujarati", "Malayalam", "Kannada", "Punjabi"]
    }
  ];

  const languages = [
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" },
    { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" },
    { code: "pa", name: "Punjabi", flag: "🇮🇳" }
  ];

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "stress", label: "Stress Management" },
    { id: "anxiety", label: "Anxiety Relief" },
    { id: "sleep", label: "Sleep & Relaxation" },
    { id: "mindfulness", label: "Mindfulness" },
    { id: "academic", label: "Academic Support" }
  ];

  const handleResourceClick = (resource) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    // Handle resource access
    alert(`Accessing: ${resource.title}`);
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
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Wellness Resource Hub
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access psychoeducational materials in your preferred language.
              Please login or sign up to access our complete wellness library.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-yellow-600" />
              <h2 className="text-xl font-bold text-gray-800">Premium Resources Access</h2>
            </div>
            
            <p className="text-gray-600 mb-8 text-center">
              Our wellness resources are available exclusively to EchoCare members.
              Register for free to access guided meditations, educational videos,
              and mental health guides curated by professionals.
            </p>

            {/* Preview of Resources */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {resourceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 text-center group"
                >
                  <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{category.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className={`text-sm font-bold ${category.color.split(' ')[1]}`}>
                    {category.count}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 font-medium">PREVIEW</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-full mb-6">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-700 font-medium">Login required to access resources</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                >
                  <LogIn className="w-5 h-5" />
                  Login to Access Resources
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

          {/* Benefits of Registering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              What You'll Get Access To
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">Resource Library Includes:</h3>
                <ul className="space-y-3">
                  {[
                    "Professional mental health video guides",
                    "Guided meditation & relaxation audios",
                    "Downloadable wellness worksheets",
                    "Multi-language support for all resources",
                    "Expert-curated coping strategies",
                    "Evidence-based therapy techniques"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4">Additional Benefits:</h3>
                <ul className="space-y-3">
                  {[
                    "Track your wellness progress",
                    "Save favorite resources",
                    "Personalized recommendations",
                    "Access to community forums",
                    "Regular content updates",
                    "Professional counselor access"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
              Wellness Resource Hub
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access psychoeducational materials in your preferred language.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
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
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                
                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="appearance-none pl-10 pr-8 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300"
                  >
                    <option value="all">All Languages</option>
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
                    ))}
                  </select>
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resource Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resourceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleResourceClick(category)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 h-full">
                <div className={`inline-flex p-3 rounded-lg ${category.color} mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-lg">{category.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                
                <div className={`text-sm font-bold mb-6 ${category.color.split(' ')[1]}`}>
                  {category.count}
                </div>
                
                {category.type !== 'language' ? (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-500 mb-2">SAMPLE CONTENT</h4>
                    <ul className="space-y-1">
                      {category.items.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs text-gray-600 truncate">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-500 mb-2">AVAILABLE IN</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.languages.slice(0, 5).map((lang, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {lang}
                        </span>
                      ))}
                      {category.languages.length > 5 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{category.languages.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-teal-600 font-medium text-sm group-hover:gap-2 transition-all">
                    Access Now
                  </span>
                  <ArrowRight className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Languages className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-800">Multi-Language Support</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              All our resources are available in multiple Indian languages to ensure 
              everyone can access mental health support in their preferred language.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="bg-white p-4 rounded-xl text-center hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-2xl mb-2">{lang.flag}</div>
                  <div className="font-medium text-gray-800">{lang.name}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured This Week</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Stress-Free Exam Prep",
                type: "Video Series",
                duration: "45 min",
                language: "Hindi & English",
                icon: <Film className="w-5 h-5" />
              },
              {
                title: "Guided Sleep Meditation",
                type: "Audio Session",
                duration: "20 min",
                language: "Tamil & English",
                icon: <Volume2 className="w-5 h-5" />
              },
              {
                title: "Anxiety Management Guide",
                type: "PDF Workbook",
                pages: "24 pages",
                language: "Multiple",
                icon: <Book className="w-5 h-5" />
              }
            ].map((resource, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
                    {resource.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{resource.title}</h3>
                    <p className="text-sm text-gray-500">{resource.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{resource.duration || resource.pages}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">{resource.language}</span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-shadow">
                  Access Now
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Personalized Support?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our resources are helpful, but sometimes you need direct support from a professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai-chat"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
              >
                <PlayCircle className="w-5 h-5" />
                Talk to AI Assistant
              </Link>
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-teal-500 text-teal-600 rounded-xl font-bold hover:bg-teal-50 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Book Counseling Session
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>
              All resources are created by licensed mental health professionals and reviewed by our clinical team.
            </p>
            <p className="mt-2">
              © 2025 EchoCare Wellness Resources. For educational purposes only. Not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resources;