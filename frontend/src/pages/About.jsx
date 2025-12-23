import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Users,
  Target,
  Award,
  Shield,
  Globe,
  TrendingUp,
  Clock,
  BookOpen,
  Brain,
  MessageSquare,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  LogIn,
  UserPlus,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Users2,
  GraduationCap,
  Briefcase,
  Activity,
  Eye,
  AlertCircle
} from "lucide-react";

const About = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock login check
  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const stats = [
    { number: "Many", label: "Students Helped", icon: <Users className="w-5 h-5" /> },
    { number: "We have", label: "Partner Colleges", icon: <GraduationCap className="w-5 h-5" /> },
    { number: "All", label: "Certified Counselors", icon: <Briefcase className="w-5 h-5" /> },
    { number: "24/7", label: "Available Support", icon: <Clock className="w-5 h-5" /> }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Empathy First",
      description: "We approach mental health with compassion, understanding, and genuine care for every student's journey.",
      color: "text-pink-600 bg-pink-50"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy & Safety",
      description: "Your privacy is our priority. All interactions are confidential and secure with end-to-end encryption.",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "We believe in the power of peer support and building strong, stigma-free communities.",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Evidence-Based",
      description: "All our methods and resources are grounded in scientific research and best practices.",
      color: "text-purple-600 bg-purple-50"
    }
  ];

  const team = [
    {
      name: "Dr. Ananya Sharma",
      role: "Clinical Director",
      expertise: "Clinical Psychology, CBT",
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
    },
    {
      name: "Khushi Gupta",
      role: "Head of Technology",
      expertise: "AI & Machine Learning",
      experience: "3 years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Khushi Gupta ",
      role: "Community Manager",
      expertise: "Peer Support Systems",
      experience: "3 years",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
    },
    {
      name: "Khushi Gupta",
      role: "Research Lead",
      expertise: "Digital Mental Health",
      experience: "3 years",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128"
    }
  ];

  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "AI Mental Health Chat",
      description: "24/7 AI companion trained to provide immediate, empathetic support."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Professional Counseling",
      description: "Connect with certified counselors for private, scheduled sessions."
    },
    {
      icon: <Users2 className="w-5 h-5" />,
      title: "Peer Communities",
      description: "Safe spaces for students to connect, share, and support each other."
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Wellness Resources",
      description: "Multi-language educational content and self-help tools."
    }
  ];

  const testimonials = [
    {
      text: "EchoCare helped me through my toughest semester. The AI chat was always there when I needed to talk.",
      author: "Computer Science Student",
      college: "IIT Delhi"
    },
    {
      text: "Being able to connect with a counselor from my dorm room made all the difference in managing my anxiety.",
      author: "Medical Student",
      college: "AIIMS"
    },
    {
      text: "The study group community helped me find friends who understood the pressure of engineering exams.",
      author: "Engineering Student",
      college: "NIT Trichy"
    }
  ];

  const timeline = [
    { year: "2025", event: "Founded with vision to bridge mental health gap in Indian colleges" },
    { year: "2025", event: "Launched AI chatbot and partnered to help students" },
    { year: "2025", event: "Expanded our services, introduced multi-language support" },
    { year: "2025", event: "Reached  counselors, launched community features" },
    { year: "2025", event: "Current: Want Serve colleges across India" }
  ];

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

        {/* Hero Section */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              About <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">EchoCare</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing student mental health support through technology, 
              empathy, and community. Learn about our mission to make mental wellness 
              accessible to every student in India.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-6 h-6 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 mb-6">
                To make mental health support accessible, affordable, and stigma-free 
                for every student in India through innovative technology and compassionate care.
              </p>
              <ul className="space-y-3">
                {[
                  "Provide 24/7 accessible mental health support",
                  "Break down stigma around mental health in colleges",
                  "Create safe spaces for students to share and heal",
                  "Bridge the gap between students and professional help"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-gray-600 mb-6">
                To create a future where no student suffers in silence, and mental 
                wellness is an integral part of every educational institution in India.
              </p>
              <ul className="space-y-3">
                {[
                  "Mental health support in every college by 2030",
                  "AI-assisted early intervention systems",
                  "Comprehensive wellness ecosystems",
                  "Nationwide peer support networks"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {stat.icon}
                    <span className="text-3xl font-bold text-gray-800">{stat.number}</span>
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why EchoCare */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why EchoCare?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">The Student Mental Health Crisis</h3>
                <p className="text-gray-600 mb-6">
                  In India, 1 in 4 students experiences mental health issues, yet less than 
                  10% receive professional help. The barriers include stigma, cost, and 
                  accessibility.
                </p>
                <div className="space-y-3">
                  {[
                    "80% of students hesitate to seek help due to stigma",
                    "Average wait time for counseling: 2-3 weeks",
                    "Only 30% of colleges have adequate mental health services",
                    "92% of students prefer digital mental health solutions"
                  ].map((fact, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Our Solution</h3>
                <p className="text-gray-600 mb-6">
                  EchoCare combines AI technology with human empathy to create a 
                  comprehensive mental wellness ecosystem for students.
                </p>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA to Register */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Join Our Mission?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Create your free EchoCare account to access mental health support, 
                join our community, and be part of the movement to transform student wellness.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                >
                  <UserPlus className="w-5 h-5" />
                  Join EchoCare Free
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-teal-500 text-teal-600 rounded-xl font-bold hover:bg-teal-50 transition-all hover:scale-105"
                >
                  <LogIn className="w-5 h-5" />
                  Already a Member? Login
                </Link>
              </div>
            </div>

            <p className="text-sm text-gray-500">
              EchoCare is free for all students. No credit card required.
            </p>
          </motion.div>
        </main>

        {/* Footer - Updated */}
        <footer className="border-t border-gray-200 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-sm text-gray-600">
              <p className="flex items-center justify-center gap-2">
                Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by Khushi
              </p>
              <p className="mt-2">
                © 2025 EchoCare Mental Wellness System. Making mental health accessible to every student.
              </p>
              <p className="mt-2 flex items-center justify-center gap-2 text-teal-600 font-medium">
                <Mail className="w-4 h-4" />
                khushigupta16057@gmail.com
              </p>
            </div>
          </div>
        </footer>
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
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Our <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Story</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering student mental wellness through technology, 
              empathy, and community since 2025.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  {stat.icon}
                  <span className="text-3xl font-bold text-gray-800">{stat.number}</span>
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="mb-6 text-teal-100">
              To make mental health support accessible, affordable, and stigma-free 
              for every student in India through innovative technology and compassionate care.
            </p>
            <ul className="space-y-3">
              {[
                "24/7 accessible mental health support",
                "Break down stigma in educational spaces",
                "Safe spaces for sharing and healing",
                "Bridge gap to professional help"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-200 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 mb-6">
              A future where mental wellness is integral to every educational 
              institution, and no student suffers in silence.
            </p>
            <ul className="space-y-3">
              {[
                "Mental health support in every college by 2030",
                "AI-assisted early intervention nationwide",
                "Comprehensive wellness ecosystems",
                "Strong peer support networks"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full">
                  <div className={`inline-flex p-3 rounded-lg ${value.color} mb-4`}>
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-3 text-lg">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-teal-500 to-blue-500"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="text-sm font-semibold text-teal-600 mb-2">{item.year}</div>
                      <p className="text-gray-700">{item.event}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-teal-100 to-blue-100"></div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{member.name}</h3>
                    <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{member.expertise}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{member.experience} experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Student Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                <div>
                  <div className="font-medium text-gray-800">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.college}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">khushigupta16057@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">+91 </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">Kurukshetra, India</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Follow Our Journey</h2>
              <div className="flex gap-4">
                {[
                  { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                  { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                  { icon: <Instagram className="w-5 h-5" />, label: "Instagram" }
                ].map((social, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:shadow-lg transition-shadow"
                  >
                    {social.icon}
                    <span className="font-medium">{social.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer - Updated */}
      <footer className="mt-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p className="flex items-center justify-center gap-2 mb-2">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by Khushi
            </p>
            <p className="mb-2">
              EchoCare is committed to making mental health support accessible to every student in India.
            </p>
            <p className="mb-2">
              © 2025 EchoCare Mental Wellness System. All rights reserved.
            </p>
            <p className="flex items-center justify-center gap-2 text-teal-600 font-medium">
              <Mail className="w-4 h-4" />
              khushigupta16057@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;