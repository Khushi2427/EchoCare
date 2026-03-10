import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle,
  Menu,
  X,
  Brain,
  Users,
  Calendar,
  Shield,
  Star
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

const Resources = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
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

  const resourceCategories = [
    {
      icon: <Video size={24} />,
      title: "Video Guides",
      description: "Expert-led wellness videos and tutorials.",
      count: "50+ Videos",
      color: "bg-blue-100 text-blue-600",
      bgColor: "#EEF5EE",
      iconColor: "var(--sage)",
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
      icon: <Headphones size={24} />,
      title: "Guided Audios",
      description: "Meditation and breathing exercises.",
      count: "100+ Tracks",
      color: "bg-green-100 text-green-600",
      bgColor: "#F6F0E8",
      iconColor: "var(--sage)",
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
      icon: <FileText size={24} />,
      title: "Wellness Guides",
      description: "Comprehensive mental health guides.",
      count: "30+ Guides",
      color: "bg-purple-100 text-purple-600",
      bgColor: "#EEF5EE",
      iconColor: "var(--sage)",
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
      icon: <Globe size={24} />,
      title: "Multi-Language",
      description: "Resources in 10+ languages.",
      count: "Hindi, English, Tamil",
      color: "bg-orange-100 text-orange-600",
      bgColor: "#F6F0E8",
      iconColor: "var(--sage)",
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
              <BookOpen size={40} color="white" />
            </motion.div>
            
            <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 16 }}>
              Wellness Resource <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Hub</em>
            </h1>
            <p style={{ fontSize: 16, color: "var(--body)", maxWidth: 600, margin: "0 auto 48px" }}>
              Access psychoeducational materials in your preferred language.
              Please login or sign up to access our complete wellness library.
            </p>

            <div className="card" style={{ padding: 48, marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
                <Lock size={24} color="var(--sage)" />
                <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Premium Resources Access</h2>
              </div>
              
              <p style={{ fontSize: 15, color: "var(--body)", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
                Our wellness resources are available exclusively to EchoCare members.
                Register for free to access guided meditations, educational videos,
                and mental health guides curated by professionals.
              </p>

              {/* Preview of Resources */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
                {resourceCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="card"
                    style={{ padding: 24, textAlign: "center", cursor: "pointer" }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      {category.icon}
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{category.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--body)", marginBottom: 12, lineHeight: 1.6 }}>{category.description}</p>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "var(--sage)" }}>{category.count}</div>
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 11, color: "var(--light-muted)", fontWeight: 500 }}>PREVIEW</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--warm)", padding: "8px 20px", borderRadius: 100, marginBottom: 32 }}>
                  <AlertCircle size={16} color="var(--sage)" />
                  <span style={{ fontSize: 13, color: "var(--charcoal)" }}>Login required to access resources</span>
                </div>
                
                <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
                  <Link
                    to="/login"
                    className="btn-primary"
                    style={{ padding: "14px 32px", fontSize: 15 }}
                  >
                    <LogIn size={16} />
                    Login to Access Resources
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

            {/* Benefits of Registering */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 32, padding: 40 }}
            >
              <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 32, textAlign: "center" }}>
                What You'll Get <em style={{ color: "var(--sage)" }}>Access To</em>
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div className="card" style={{ padding: 28 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--charcoal)" }}>Resource Library Includes:</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      "Professional mental health video guides",
                      "Guided meditation & relaxation audios",
                      "Downloadable wellness worksheets",
                      "Multi-language support for all resources",
                      "Expert-curated coping strategies",
                      "Evidence-based therapy techniques"
                    ].map((item, index) => (
                      <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <CheckCircle size={18} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 14, color: "var(--body)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="card" style={{ padding: 28 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: "var(--charcoal)" }}>Additional Benefits:</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      "Track your wellness progress",
                      "Save favorite resources",
                      "Personalized recommendations",
                      "Access to community forums",
                      "Regular content updates",
                      "Professional counselor access"
                    ].map((item, index) => (
                      <li key={index} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <Heart size={18} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 14, color: "var(--body)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
          <div style={S.maxW}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                All resources are created by licensed mental health professionals and reviewed by our clinical team.
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>
                © 2025 EchoCare Wellness Resources. For educational purposes only. Not a substitute for professional medical advice.
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
            <BookOpen size={14} />
            Wellness Library
          </span>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            Wellness Resource <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Hub</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--body)", maxWidth: 600, margin: "0 auto" }}>
            Access psychoeducational materials in your preferred language.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div {...fadeUp(0.2)} className="card" style={{ padding: 24, marginBottom: 40 }}>
          <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input
                type="text"
                placeholder="Search resources..."
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
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <Filter size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
              </div>
              
              <div style={{ position: "relative" }}>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
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
                  <option value="all">All Languages</option>
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
                  ))}
                </select>
                <Globe size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                <ChevronDown size={16} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resource Categories Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 48 }}>
          {resourceCategories.map((category, index) => (
            <motion.div
              key={index}
              {...scaleIn(index * 0.1)}
              whileHover={{ y: -6 }}
              onClick={() => handleResourceClick(category)}
              style={{ cursor: "pointer" }}
            >
              <div className="card" style={{ padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  {category.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{category.title}</h3>
                <p style={{ fontSize: 13, color: "var(--body)", marginBottom: 16, lineHeight: 1.7, flex: 1 }}>{category.description}</p>
                
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--sage)", marginBottom: 20 }}>
                  {category.count}
                </div>
                
                {category.type !== 'language' ? (
                  <div style={{ marginTop: 8, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <h4 style={{ fontSize: 11, fontWeight: 600, color: "var(--light-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Sample Content
                    </h4>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {category.items.slice(0, 3).map((item, idx) => (
                        <li key={idx} style={{ fontSize: 12, color: "var(--body)", display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 3, height: 3, background: "var(--sage)", borderRadius: "50%" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div style={{ marginTop: 8, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <h4 style={{ fontSize: 11, fontWeight: 600, color: "var(--light-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Available In
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {category.languages.slice(0, 5).map((lang, idx) => (
                        <span key={idx} style={{ fontSize: 11, padding: "4px 10px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>
                          {lang}
                        </span>
                      ))}
                      {category.languages.length > 5 && (
                        <span style={{ fontSize: 11, padding: "4px 10px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>
                          +{category.languages.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "var(--sage)", fontWeight: 500 }}>Access Now</span>
                  <ArrowRight size={14} color="var(--sage)" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language Support Section */}
        <motion.div
          {...fadeUp(0.4)}
          style={{ marginBottom: 48 }}
        >
          <div style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 32, padding: 40, border: "1px solid rgba(107,158,107,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <Languages size={24} color="var(--sage)" />
              <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Multi-Language Support</h2>
            </div>
            
            <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 32, maxWidth: 600 }}>
              All our resources are available in multiple Indian languages to ensure 
              everyone can access mental health support in their preferred language.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="card"
                  style={{ padding: 16, textAlign: "center", cursor: "pointer" }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{lang.flag}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>{lang.name}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Resources */}
        <motion.div
          {...fadeUp(0.5)}
          style={{ marginBottom: 48 }}
        >
          <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 24 }}>
            Featured <em style={{ color: "var(--sage)" }}>This Week</em>
          </h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              {
                title: "Stress-Free Exam Prep",
                type: "Video Series",
                duration: "45 min",
                language: "Hindi & English",
                icon: <Film size={20} />
              },
              {
                title: "Guided Sleep Meditation",
                type: "Audio Session",
                duration: "20 min",
                language: "Tamil & English",
                icon: <Volume2 size={20} />
              },
              {
                title: "Anxiety Management Guide",
                type: "PDF Workbook",
                pages: "24 pages",
                language: "Multiple",
                icon: <Book size={20} />
              }
            ].map((resource, index) => (
              <div key={index} className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {resource.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)", marginBottom: 4 }}>{resource.title}</h3>
                    <p style={{ fontSize: 12, color: "var(--muted)" }}>{resource.type}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontSize: 13, color: "var(--body)" }}>{resource.duration || resource.pages}</span>
                  <span style={{ fontSize: 12, padding: "4px 12px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>{resource.language}</span>
                </div>
                <button className="btn-primary" style={{ width: "100%", padding: "12px", justifyContent: "center" }}>
                  Access Now
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          {...fadeUp(0.6)}
        >
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 12 }}>
              Need Personalized <em style={{ color: "var(--sage)" }}>Support?</em>
            </h2>
            <p style={{ fontSize: 15, color: "var(--body)", marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>
              Our resources are helpful, but sometimes you need direct support from a professional.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <Link
                to="/ai-chat"
                className="btn-primary"
                style={{ padding: "14px 28px" }}
              >
                <Brain size={16} />
                Talk to AI Assistant
              </Link>
              <Link
                to="/book"
                className="btn-sage"
                style={{ padding: "14px 28px" }}
              >
                <Calendar size={16} />
                Book Counseling Session
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
        <div style={S.maxW}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
              All resources are created by licensed mental health professionals and reviewed by our clinical team.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 12 }}>
              © 2025 EchoCare Wellness Resources. For educational purposes only. Not a substitute for professional medical advice.
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

export default Resources;