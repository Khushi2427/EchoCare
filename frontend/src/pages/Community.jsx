import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  Star,
  Menu,
  X,
  Brain
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

const Community = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("communities");
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

  const communityCategories = [
    {
      icon: <Code size={20} />,
      title: "Tech & Coding",
      description: "Connect with fellow programmers, share coding challenges, and support each other through tech stress.",
      members: "2.5k+ Members",
      color: "from-blue-500 to-cyan-500",
      bgColor: "#EEF5EE",
      topics: ["Programming", "Career", "Tech Stress", "Projects"]
    },
    {
      icon: <BookOpen size={20} />,
      title: "Study Groups",
      description: "Academic support, study tips, and collaborative learning with peers across different fields.",
      members: "3.9k+ Members",
      color: "from-purple-500 to-pink-500",
      bgColor: "#F6F0E8",
      topics: ["Exam Prep", "Homework", "Research", "Time Management"]
    },
    {
      icon: <Music size={20} />,
      title: "Music & Arts",
      description: "Express yourself through music, share beats, and find therapeutic rhythm with creative peers.",
      members: "1.8k+ Members",
      color: "from-green-500 to-teal-500",
      bgColor: "#EEF5EE",
      topics: ["Music Therapy", "Creative Expression", "Instrument", "Songwriting"]
    },
    {
      icon: <Dumbbell size={20} />,
      title: "Fitness & Wellness",
      description: "Share workout routines, wellness tips, and motivate each other towards healthier lifestyles.",
      members: "3.2k+ Members",
      color: "from-orange-500 to-red-500",
      bgColor: "#F6F0E8",
      topics: ["Exercise", "Nutrition", "Yoga", "Mental Wellness"]
    },
    {
      icon: <Gamepad2 size={20} />,
      title: "Gaming",
      description: "Game together, discuss healthy gaming habits, and build friendships through shared virtual experiences.",
      members: "4.1k+ Members",
      color: "from-indigo-500 to-violet-500",
      bgColor: "#EEF5EE",
      topics: ["Gaming Stress", "Team Building", "E-sports", "Balance"]
    },
    {
      icon: <Heart size={20} />,
      title: "Mental Health Support",
      description: "A safe space for sharing experiences, coping strategies, and supporting each other's mental health journey.",
      members: "5.7k+ Members",
      color: "from-pink-500 to-rose-500",
      bgColor: "#F6F0E8",
      topics: ["Anxiety", "Depression", "Coping", "Recovery"]
    },
    {
      icon: <Coffee size={20} />,
      title: "Social Connections",
      description: "Make new friends, socialize, and combat loneliness through virtual and in-person meetups.",
      members: "4.8k+ Members",
      color: "from-amber-500 to-yellow-500",
      bgColor: "#EEF5EE",
      topics: ["Friendship", "Social Anxiety", "Networking", "Events"]
    },
    {
      icon: <Lightbulb size={20} />,
      title: "Entrepreneurship",
      description: "Share startup ideas, discuss business challenges, and support each other's entrepreneurial journeys.",
      members: "2.1k+ Members",
      color: "from-emerald-500 to-green-500",
      bgColor: "#F6F0E8",
      topics: ["Startups", "Funding", "Innovation", "Stress Management"]
    }
  ];

  const categories = [
    { id: "all", label: "All Communities", icon: <Users2 size={16} /> },
    { id: "academic", label: "Academic", icon: <BookOpen size={16} /> },
    { id: "creative", label: "Creative", icon: <Music size={16} /> },
    { id: "health", label: "Health & Wellness", icon: <Heart size={16} /> },
    { id: "tech", label: "Tech", icon: <Code size={16} /> },
    { id: "social", label: "Social", icon: <Users size={16} /> }
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

        {/* ========== LOGIN REQUIRED SECTION ========== */}
        <main style={{ ...S.maxW, padding: "40px 40px 60px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", marginBottom: 48 }}
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
              <Users size={40} color="white" />
            </motion.div>
            
            <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 16 }}>
              EchoCare <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Community</em>
            </h1>
            <p style={{ fontSize: 16, color: "var(--body)", maxWidth: 600, margin: "0 auto 48px" }}>
              Join supportive peer communities, share experiences, and grow together in a safe, stigma-free environment.
            </p>

            <div className="card" style={{ padding: 48, marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
                <Lock size={24} color="var(--sage)" />
                <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Community Access Required</h2>
              </div>
              
              <p style={{ fontSize: 15, color: "var(--body)", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
                Our supportive communities are available exclusively to EchoCare members.
                Register for free to connect with peers, join discussions, and participate in events.
              </p>

              {/* Community Preview */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
                {communityCategories.slice(0, 4).map((community, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="card"
                    style={{ padding: 24, textAlign: "center", cursor: "pointer" }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: community.bgColor, color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      {community.icon}
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{community.title}</h3>
                    <p style={{ fontSize: 12, color: "var(--body)", marginBottom: 16, lineHeight: 1.6 }}>{community.description}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                      <span style={{ fontSize: 11, color: "var(--muted)" }}>{community.members}</span>
                      <span style={{ fontSize: 10, padding: "4px 8px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>PREVIEW</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--warm)", padding: "8px 20px", borderRadius: 100, marginBottom: 32 }}>
                  <Shield size={16} color="var(--sage)" />
                  <span style={{ fontSize: 13, color: "var(--charcoal)" }}>Login required to join communities</span>
                </div>
                
                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
                  <Link
                    to="/login"
                    className="btn-primary"
                    style={{ padding: "14px 32px", fontSize: 15 }}
                  >
                    <LogIn size={16} />
                    Login to Join Community
                  </Link>
                  <Link
                    to="/register"
                    className="btn-sage"
                    style={{ padding: "14px 32px", fontSize: 15 }}
                  >
                    <UserPlus size={16} />
                    Create Free Account
                  </Link>
                </div>

                <p style={{ fontSize: 13, color: "var(--muted)" }}>
                  Already have an account? <Link to="/login" style={{ color: "var(--sage)", textDecoration: "underline" }}>Login here</Link>
                </p>
              </div>
            </div>

            {/* Community Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 32, padding: 40 }}
            >
              <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>
                Why Join EchoCare <em style={{ color: "var(--sage)" }}>Community?</em>
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Users size={24} color="var(--sage)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>Peer Support</h3>
                  <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>
                    Connect with students who understand your experiences and challenges.
                  </p>
                </div>
                
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Shield size={24} color="var(--sage)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>Safe Space</h3>
                  <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>
                    Moderated communities ensure respectful, stigma-free conversations.
                  </p>
                </div>
                
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <Calendar size={24} color="var(--sage)" />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>Events & Activities</h3>
                  <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>
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
              className="card"
              style={{ padding: 32, marginTop: 32 }}
            >
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 20, textAlign: "center" }}>Community Guidelines</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {communityGuidelines.slice(0, 4).map((guideline, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <CheckCircle size={18} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 14, color: "var(--body)" }}>{guideline}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
          <div style={S.maxW}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                EchoCare Community is a moderated, safe space for students to connect and support each other.
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>
                © 2025 EchoCare Student Community. All discussions are confidential and protected.
              </p>
              <p style={{ fontSize: 12, color: "var(--sage)", marginTop: 16, fontWeight: 500 }}>
                Need immediate help? Call Crisis Line: 1-800-273-8255
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
          <div style={{ position: "relative" }}>
            <Bell size={18} color="var(--body)" style={{ cursor: "pointer" }} />
            <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: "var(--sage)", borderRadius: "50%" }} />
          </div>
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

      {/* ========== MAIN CONTENT ========== */}
      <main style={{ ...S.maxW, padding: "40px 40px 60px" }}>
        
        {/* Back link */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--body)", fontSize: 14 }}>
            <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} />
            Back to Home
          </Link>
        </motion.div>
        
        {/* Hero Section */}
        <motion.div {...fadeUp(0.1)} style={{ textAlign: "center", marginBottom: 40 }}>
          <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)", marginBottom: 16, display: "inline-flex" }}>
            <Users size={14} />
            Student Community
          </span>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            EchoCare <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Community</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--body)", maxWidth: 600, margin: "0 auto" }}>
            Join supportive peer communities, share experiences, and grow together in a safe, stigma-free environment.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.2)} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            { label: "Total Members", value: "25,432", icon: <Users2 size={18} /> },
            { label: "Active Groups", value: "48", icon: <MessageCircle size={18} /> },
            { label: "Online Now", value: "1,248", icon: <Globe size={18} /> },
            { label: "Events Today", value: "12", icon: <Calendar size={18} /> }
          ].map((stat, index) => (
            <div key={index} className="card" style={{ padding: 16, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ color: "var(--sage)" }}>{stat.icon}</span>
                <span className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>{stat.value}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div {...fadeUp(0.3)} className="card" style={{ padding: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input
                type="text"
                placeholder="Search communities or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 42px",
                  background: "var(--cream)",
                  border: "2px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 14,
                  fontFamily: "'Outfit', sans-serif",
                  color: "var(--charcoal)",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ position: "relative" }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    appearance: "none",
                    padding: "14px 40px 14px 42px",
                    background: "var(--cream)",
                    border: "2px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 14,
                    fontFamily: "'Outfit', sans-serif",
                    color: "var(--charcoal)",
                    outline: "none",
                    cursor: "pointer",
                    minWidth: 160
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <Filter size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
              </div>
              
              <div style={{ display: "flex", borderRadius: 12, overflow: "hidden", border: "2px solid var(--border)" }}>
                <button
                  onClick={() => setActiveTab("communities")}
                  style={{
                    padding: "14px 24px",
                    background: activeTab === "communities" ? "var(--sage)" : "var(--cream)",
                    color: activeTab === "communities" ? "#fff" : "var(--body)",
                    border: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Communities
                </button>
                <button
                  onClick={() => setActiveTab("events")}
                  style={{
                    padding: "14px 24px",
                    background: activeTab === "events" ? "var(--sage)" : "var(--cream)",
                    color: activeTab === "events" ? "#fff" : "var(--body)",
                    border: "none",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  Events
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Communities Grid */}
        {activeTab === "communities" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 48 }}>
              {communityCategories.map((community, index) => (
                <motion.div
                  key={index}
                  {...scaleIn(index * 0.05)}
                  whileHover={{ y: -6 }}
                  onClick={() => handleJoinCommunity(community)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card" style={{ padding: 0, overflow: "hidden", height: "100%" }}>
                    <div style={{ height: 4, background: `linear-gradient(90deg, ${community.color.split(' ')[1]} 0%, ${community.color.split(' ')[3]} 100%)` }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: community.bgColor, color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {community.icon}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Star size={14} color="#FBBF24" fill="#FBBF24" />
                          <span style={{ fontSize: 12, color: "var(--body)" }}>4.8</span>
                        </div>
                      </div>
                      
                      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{community.title}</h3>
                      <p style={{ fontSize: 12, color: "var(--body)", marginBottom: 16, lineHeight: 1.6 }}>{community.description}</p>
                      
                      <div style={{ marginBottom: 16 }}>
                        <h4 style={{ fontSize: 10, fontWeight: 600, color: "var(--light-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Popular Topics
                        </h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {community.topics.slice(0, 3).map((topic, idx) => (
                            <span key={idx} style={{ fontSize: 10, padding: "4px 10px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>{community.members}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--sage)", fontSize: 12, fontWeight: 500 }}>
                          Join
                          <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Community Guidelines */}
            <motion.div
              {...fadeUp(0.5)}
              style={{ marginBottom: 48 }}
            >
              <div style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 32, padding: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <Shield size={24} color="var(--sage)" />
                  <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Community Guidelines</h2>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                  <div>
                    <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 20 }}>
                      Our community is built on respect, empathy, and support. Please follow these guidelines:
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {communityGuidelines.map((guideline, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <CheckCircle size={18} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 14, color: "var(--body)" }}>{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="card" style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--charcoal)" }}>Need Help?</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }}>Community Moderators</h4>
                          <p style={{ fontSize: 12, color: "var(--body)" }}>Available to help with any issues or concerns</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Users size={18} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }}>Peer Support</h4>
                          <p style={{ fontSize: 12, color: "var(--body)" }}>Connect with trained peer supporters</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Heart size={18} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }}>Professional Help</h4>
                          <p style={{ fontSize: 12, color: "var(--body)" }}>Access to counselors when needed</p>
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
            {...fadeUp(0.3)}
            style={{ marginBottom: 48 }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
              {/* Upcoming Events */}
              <div>
                <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 24 }}>Upcoming Events</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="card" style={{ padding: 24 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                        <div>
                          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{event.title}</h3>
                          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "var(--muted)" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <Calendar size={14} />
                              {event.date}
                            </span>
                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <Users size={14} />
                              {event.attendees}
                            </span>
                          </div>
                        </div>
                        <span style={{ padding: "6px 14px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100, fontSize: 12, fontWeight: 500 }}>
                          {event.type}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--body)", marginBottom: 20, lineHeight: 1.7 }}>
                        Join our community for this supportive event designed to help students connect and grow together.
                      </p>
                      <div style={{ display: "flex", gap: 12 }}>
                        <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }}>
                          Join Event
                        </button>
                        <button className="btn-ghost" style={{ padding: "10px 20px", fontSize: 13 }}>
                          Add to Calendar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Stats & Quick Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 24, padding: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "var(--charcoal)" }}>Your Communities</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {communityCategories.slice(0, 3).map((comm, index) => (
                      <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, background: "#fff", borderRadius: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: comm.bgColor, color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {comm.icon}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>{comm.title}</span>
                        </div>
                        <span style={{ fontSize: 11, padding: "4px 10px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>Joined</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "var(--charcoal)" }}>Quick Actions</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--cream)", border: "none", borderRadius: 10, cursor: "pointer", color: "var(--body)", transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--sage-light)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "var(--cream)"}
                    >
                      <span style={{ fontSize: 13, fontWeight: 500 }}>Create New Group</span>
                      <Users size={16} color="var(--muted)" />
                    </button>
                    <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--cream)", border: "none", borderRadius: 10, cursor: "pointer", color: "var(--body)", transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--sage-light)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "var(--cream)"}
                    >
                      <span style={{ fontSize: 13, fontWeight: 500 }}>Schedule Event</span>
                      <Calendar size={16} color="var(--muted)" />
                    </button>
                    <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--cream)", border: "none", borderRadius: 10, cursor: "pointer", color: "var(--body)", transition: "background 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "var(--sage-light)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "var(--cream)"}
                    >
                      <span style={{ fontSize: 13, fontWeight: 500 }}>Find Peer Support</span>
                      <Heart size={16} color="var(--muted)" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          {...fadeUp(0.6)}
        >
          <div style={{ background: "linear-gradient(135deg, var(--sage) 0%, var(--sage-hover) 100%)", borderRadius: 32, padding: 48, textAlign: "center", color: "#fff" }}>
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 12 }}>Ready to Make Connections?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.9)", marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
              Join thousands of students who've found friendship, support, and community through EchoCare.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <button className="btn-white" style={{ padding: "14px 28px" }}>
                Explore All Communities
              </button>
              <button className="btn-ghost" style={{ padding: "14px 28px", borderColor: "#fff", color: "#fff" }}>
                Host an Event
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
        <div style={S.maxW}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              EchoCare Community is a moderated, safe space for students to connect and support each other.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>
              © 2025 EchoCare Student Community. All discussions are confidential and protected.
            </p>
            <p style={{ fontSize: 12, color: "var(--sage)", marginTop: 16, fontWeight: 500 }}>
              Need immediate help? Call Crisis Line: 1-800-273-8255
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .chevron-down {
          transition: transform 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Community;