import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  AlertCircle,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Filter
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

/* ── Animation helpers ── */
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

const About = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mock login check
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

  const stats = [
    { number: "Many", label: "Students Helped", icon: <Users size={20} /> },
    { number: "We have", label: "Partner Colleges", icon: <GraduationCap size={20} /> },
    { number: "All", label: "Certified Counselors", icon: <Briefcase size={20} /> },
    { number: "24/7", label: "Available Support", icon: <Clock size={20} /> }
  ];

  const values = [
    {
      icon: <Heart size={24} />,
      title: "Empathy First",
      description: "We approach mental health with compassion, understanding, and genuine care for every student's journey.",
      bgColor: "#EEF5EE"
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy & Safety",
      description: "Your privacy is our priority. All interactions are confidential and secure with end-to-end encryption.",
      bgColor: "#F6F0E8"
    },
    {
      icon: <Users size={24} />,
      title: "Community Support",
      description: "We believe in the power of peer support and building strong, stigma-free communities.",
      bgColor: "#EEF5EE"
    },
    {
      icon: <Target size={24} />,
      title: "Evidence-Based",
      description: "All our methods and resources are grounded in scientific research and best practices.",
      bgColor: "#F6F0E8"
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
      name: "Khushi Gupta",
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
      icon: <Brain size={20} />,
      title: "AI Mental Health Chat",
      description: "24/7 AI companion trained to provide immediate, empathetic support."
    },
    {
      icon: <Calendar size={20} />,
      title: "Professional Counseling",
      description: "Connect with certified counselors for private, scheduled sessions."
    },
    {
      icon: <Users2 size={20} />,
      title: "Peer Communities",
      description: "Safe spaces for students to connect, share, and support each other."
    },
    {
      icon: <BookOpen size={20} />,
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
    { year: "2025", event: "Reached counselors, launched community features" },
    { year: "2025", event: "Current: Want Serve colleges across India" }
  ];

  const S = {
    maxW: { maxWidth: 1280, margin: "0 auto", width: "100%" },
  };

  if (!isLoggedIn) {
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
            <Link to="/login" className="btn-ghost" style={{ padding: "10px 24px" }}>Sign in</Link>
            <Link to="/register" className="btn-primary" style={{ padding: "10px 24px" }}>
              Get Started <ArrowRight size={16} />
            </Link>
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
                  <Link to="/login" className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                    Sign in
                  </Link>
                  <Link to="/register" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========== ABOUT CONTENT (NOT LOGGED IN) ========== */}
        <main style={{ ...S.maxW, padding: "40px 40px 60px" }}>
          
          {/* Hero Section */}
          <motion.div
            {...fadeUp(0)}
            style={{ textAlign: "center", marginBottom: 60 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                width: 80, height: 80, borderRadius: 24,
                background: "var(--sage)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 32px",
                boxShadow: "0 10px 30px rgba(107,158,107,0.3)"
              }}
            >
              <Activity size={40} color="white" />
            </motion.div>
            
            <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 16 }}>
              About <em style={{ color: "var(--sage)", fontStyle: "italic" }}>EchoCare</em>
            </h1>
            <p style={{ fontSize: 16, color: "var(--body)", maxWidth: 700, margin: "0 auto" }}>
              We're revolutionizing student mental health support through technology, 
              empathy, and community. Learn about our mission to make mental wellness 
              accessible to every student in India.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            {...fadeUp(0.1)}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 60 }}
          >
            <div className="card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Target size={24} />
                </div>
                <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Our Mission</h2>
              </div>
              <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 24, lineHeight: 1.8 }}>
                To make mental health support accessible, affordable, and stigma-free 
                for every student in India through innovative technology and compassionate care.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Provide 24/7 accessible mental health support",
                  "Break down stigma around mental health in colleges",
                  "Create safe spaces for students to share and heal",
                  "Bridge the gap between students and professional help"
                ].map((item, index) => (
                  <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle size={18} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: "var(--body)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card" style={{ padding: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Eye size={24} />
                </div>
                <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Our Vision</h2>
              </div>
              <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 24, lineHeight: 1.8 }}>
                To create a future where no student suffers in silence, and mental 
                wellness is an integral part of every educational institution in India.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Mental health support in every college by 2030",
                  "AI-assisted early intervention systems",
                  "Comprehensive wellness ecosystems",
                  "Nationwide peer support networks"
                ].map((item, index) => (
                  <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle size={18} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: "var(--body)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            {...fadeUp(0.2)}
            style={{ marginBottom: 60 }}
          >
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>Our Impact</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {stats.map((stat, index) => (
                <div key={index} className="card" style={{ padding: 24, textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: "var(--sage)" }}>{stat.icon}</span>
                    <span className="serif" style={{ fontSize: 28, fontWeight: 400, color: "var(--charcoal)" }}>{stat.number}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Why EchoCare */}
          <motion.div
            {...fadeUp(0.3)}
            style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 32, padding: 40, marginBottom: 60 }}
          >
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>Why EchoCare?</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--charcoal)" }}>The Student Mental Health Crisis</h3>
                <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 20, lineHeight: 1.8 }}>
                  In India, 1 in 4 students experiences mental health issues, yet less than 
                  10% receive professional help. The barriers include stigma, cost, and 
                  accessibility.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    "80% of students hesitate to seek help due to stigma",
                    "Average wait time for counseling: 2-3 weeks",
                    "Only 30% of colleges have adequate mental health services",
                    "92% of students prefer digital mental health solutions"
                  ].map((fact, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <AlertCircle size={18} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "var(--body)" }}>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, color: "var(--charcoal)" }}>Our Solution</h3>
                <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 20, lineHeight: 1.8 }}>
                  EchoCare combines AI technology with human empathy to create a 
                  comprehensive mental wellness ecosystem for students.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {features.map((feature, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }}>{feature.title}</h4>
                        <p style={{ fontSize: 12, color: "var(--body)" }}>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA to Register */}
          <motion.div
            {...fadeUp(0.4)}
            style={{ textAlign: "center" }}
          >
            <div className="card" style={{ padding: 48, marginBottom: 24 }}>
              <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 16 }}>Ready to Join Our Mission?</h2>
              <p style={{ fontSize: 15, color: "var(--body)", marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
                Create your free EchoCare account to access mental health support, 
                join our community, and be part of the movement to transform student wellness.
              </p>
              
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
                <Link
                  to="/register"
                  className="btn-primary"
                  style={{ padding: "14px 32px", fontSize: 15 }}
                >
                  <UserPlus size={16} />
                  Join EchoCare Free
                </Link>
                <Link
                  to="/login"
                  className="btn-ghost"
                  style={{ padding: "14px 32px", fontSize: 15 }}
                >
                  <LogIn size={16} />
                  Already a Member?
                </Link>
              </div>
            </div>

            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              EchoCare is free for all students. No credit card required.
            </p>
          </motion.div>
        </main>

        {/* Footer */}
        <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
          <div style={S.maxW}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                Made with <Heart size={14} color="var(--sage)" fill="var(--sage)" /> by Khushi
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>
                © 2025 EchoCare Mental Wellness System. Making mental health accessible to every student.
              </p>
              <p style={{ fontSize: 12, color: "var(--sage)", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Mail size={14} />
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

        {/* Desktop user menu */}
        <div className="mob-hide" style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== ABOUT CONTENT (LOGGED IN) ========== */}
      <main style={{ ...S.maxW, padding: "40px 40px 60px" }}>
        
        {/* Back link */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--body)", fontSize: 14 }}>
            <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
            Back to Home
          </Link>
        </motion.div>
        
        {/* Hero Section */}
        <motion.div {...fadeUp(0.1)} style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)", marginBottom: 16, display: "inline-flex" }}>
            <Activity size={14} />
            Our Story
          </span>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            Our <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Story</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--body)", maxWidth: 600, margin: "0 auto" }}>
            Empowering student mental wellness through technology, empathy, and community since 2025.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.2)} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 48 }}>
          {stats.map((stat, index) => (
            <div key={index} className="card" style={{ padding: 24, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ color: "var(--sage)" }}>{stat.icon}</span>
                <span className="serif" style={{ fontSize: 28, fontWeight: 400, color: "var(--charcoal)" }}>{stat.number}</span>
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div {...fadeUp(0.3)} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
          <div style={{ background: "linear-gradient(135deg, var(--sage) 0%, var(--sage-hover) 100%)", borderRadius: 24, padding: 32, color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Target size={24} color="#fff" />
              </div>
              <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "#fff" }}>Our Mission</h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", marginBottom: 24, lineHeight: 1.8 }}>
              To make mental health support accessible, affordable, and stigma-free for every student in India.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "24/7 accessible mental health support",
                "Break down stigma in educational spaces",
                "Safe spaces for sharing and healing",
                "Bridge gap to professional help"
              ].map((item, index) => (
                <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle size={18} color="#fff" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Eye size={24} />
              </div>
              <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Our Vision</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 24, lineHeight: 1.8 }}>
              A future where mental wellness is integral to every educational institution, and no student suffers in silence.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Mental health support in every college by 2030",
                "AI-assisted early intervention nationwide",
                "Comprehensive wellness ecosystems",
                "Strong peer support networks"
              ].map((item, index) => (
                <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle size={18} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div {...fadeUp(0.4)} style={{ marginBottom: 48 }}>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>Our Core Values</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                {...scaleIn(index * 0.1)}
                whileHover={{ y: -5 }}
                className="card"
                style={{ padding: 24 }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: value.bgColor, color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  {value.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{value.title}</h3>
                <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div {...fadeUp(0.5)} style={{ marginBottom: 48 }}>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>Our Journey</h2>
          
          <div style={{ position: "relative", padding: "20px 0" }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 2, height: "100%", background: "var(--sage-light)" }} />
            
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: index % 2 === 0 ? "flex-start" : "flex-end" }}
                >
                  <div style={{ width: "45%", position: "relative" }}>
                    <div className="card" style={{ padding: 20 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sage)", marginBottom: 8 }}>{item.year}</div>
                      <p style={{ fontSize: 13, color: "var(--body)" }}>{item.event}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 40, height: 40, borderRadius: "50%", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", border: "4px solid var(--cream)" }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div {...fadeUp(0.6)} style={{ marginBottom: 48 }}>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>Meet Our Team</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {team.map((member, index) => (
              <motion.div
                key={index}
                {...scaleIn(index * 0.1)}
                whileHover={{ y: -5 }}
                className="card"
                style={{ padding: 0, overflow: "hidden" }}
              >
                <div style={{ height: 160, background: "var(--sage-light)" }} />
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }}>{member.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--sage)", fontWeight: 500, marginBottom: 12 }}>{member.role}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Award size={14} color="var(--muted)" />
                      <span style={{ fontSize: 12, color: "var(--body)" }}>{member.expertise}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Clock size={14} color="var(--muted)" />
                      <span style={{ fontSize: 12, color: "var(--body)" }}>{member.experience} experience</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div {...fadeUp(0.7)} style={{ marginBottom: 48 }}>
          <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>Student Stories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} color="#FBBF24" fill="#FBBF24" />
                  ))}
                </div>
                <p style={{ fontSize: 13, color: "var(--body)", fontStyle: "italic", marginBottom: 20, lineHeight: 1.8 }}>
                  "{testimonial.text}"
                </p>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)" }}>{testimonial.author}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{testimonial.college}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact & Social */}
        <motion.div
          {...fadeUp(0.8)}
          style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 32, padding: 40 }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 20, color: "var(--charcoal)" }}>Get In Touch</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Mail size={18} color="var(--sage)" />
                  <span style={{ fontSize: 14, color: "var(--body)" }}>khushigupta16057@gmail.com</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Phone size={18} color="var(--sage)" />
                  <span style={{ fontSize: 14, color: "var(--body)" }}>+91 </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <MapPin size={18} color="var(--sage)" />
                  <span style={{ fontSize: 14, color: "var(--body)" }}>Kurukshetra, India</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 20, color: "var(--charcoal)" }}>Follow Our Journey</h2>
              <div style={{ display: "flex", gap: 16 }}>
                {[
                  { icon: <Twitter size={18} />, label: "Twitter" },
                  { icon: <Linkedin size={18} />, label: "LinkedIn" },
                  { icon: <Instagram size={18} />, label: "Instagram" }
                ].map((social, index) => (
                  <button
                    key={index}
                    className="btn-ghost"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px" }}
                  >
                    {social.icon}
                    <span>{social.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
        <div style={S.maxW}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
              Made with <Heart size={14} color="var(--sage)" fill="var(--sage)" /> by Khushi
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              EchoCare is committed to making mental health support accessible to every student in India.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>
              © 2025 EchoCare Mental Wellness System. All rights reserved.
            </p>
            <p style={{ fontSize: 12, color: "var(--sage)", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Mail size={14} />
              khushigupta16057@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;