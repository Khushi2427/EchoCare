import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Shield,
  Award,
  Sparkles,
  User,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Video,
  Phone,
  MapPin,
  AlertCircle,
  Heart,
  LogIn,
  UserPlus,
  ChevronDown,
  CalendarDays,
  Menu,
  X,
  Star,
  Lock,
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

const Book = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "morning",
    type: "individual",
    description: "",
    counselor: "",
    mode: "video"
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mock login check
  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const timeSlots = [
    { value: "morning", label: "Morning (9 AM - 12 PM)", icon: "🌅" },
    { value: "afternoon", label: "Afternoon (1 PM - 4 PM)", icon: "☀️" },
    { value: "evening", label: "Evening (5 PM - 8 PM)", icon: "🌙" }
  ];

  const sessionTypes = [
    { value: "individual", label: "Individual Counseling", icon: <User size={16} /> },
    { value: "couple", label: "Couple Counseling", icon: <Users size={16} /> },
    { value: "group", label: "Group Therapy", icon: <Users size={16} /> }
  ];

  const benefits = [
    {
      icon: <Shield size={20} />,
      title: "100% Confidential",
      description: "Your privacy is our top priority. All sessions are completely confidential and secure.",
    },
    {
      icon: <Award size={20} />,
      title: "Certified Professionals",
      description: "Connect with licensed counselors and mental health professionals.",
    },
    {
      icon: <Calendar size={20} />,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule, with same-day availability.",
    }
  ];

  // Sample dates for next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert("Appointment booked successfully! You will receive a confirmation email shortly.");
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
            style={{ textAlign: "center" }}
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
              <Calendar size={40} color="white" />
            </motion.div>
            
            <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 16 }}>
              Book Confidential <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Session</em>
            </h1>
            <p style={{ fontSize: 16, color: "var(--body)", marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
              Schedule private appointments with certified counselors. Please login or sign up to access booking services.
            </p>

            <div className="card" style={{ padding: 48, marginBottom: 48, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
                <AlertCircle size={24} color="var(--sage)" />
                <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Authentication Required</h2>
              </div>
              
              <p style={{ fontSize: 15, color: "var(--body)", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
                To book counseling sessions and ensure your privacy, you need to have an account with EchoCare.
                This allows us to provide you with secure, confidential support and manage your appointments effectively.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                <div style={{ background: "var(--sage-light)", borderRadius: 16, padding: 24, textAlign: "left" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)", marginBottom: 16 }}>Why Register?</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Shield size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "var(--body)" }}>Secure & confidential session management</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Calendar size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "var(--body)" }}>Easy appointment scheduling & reminders</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Heart size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "var(--body)" }}>Personalized wellness recommendations</span>
                    </li>
                  </ul>
                </div>
                
                <div style={{ background: "var(--warm)", borderRadius: 16, padding: 24, textAlign: "left" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)", marginBottom: 16 }}>What You Get</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <CheckCircle size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "var(--body)" }}>Access to certified mental health professionals</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <MessageSquare size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "var(--body)" }}>Free AI wellness chat included</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Users size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: "var(--body)" }}>Join supportive student communities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 24 }}>
                <Link
                  to="/login"
                  className="btn-primary"
                  style={{ padding: "14px 32px", fontSize: 15 }}
                >
                  <LogIn size={16} />
                  Login to Book Session
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

            {/* Benefits Preview */}
            <div style={{ textAlign: "left" }}>
              <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 24 }}>What to Expect</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card"
                    style={{ padding: 24 }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      {benefit.icon}
                    </div>
                    <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{benefit.title}</h4>
                    <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
          <div style={S.maxW}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
                Need immediate help? Call the National Suicide Prevention Lifeline:{" "}
                <span style={{ color: "var(--sage)", fontWeight: 500 }}>1-800-273-8255</span>
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                © 2025 EchoCare Counseling Services. All sessions are confidential and protected.
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
        
        {/* Header */}
        <motion.div {...fadeUp(0.1)} style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)", marginBottom: 16, display: "inline-flex" }}>
            <Calendar size={14} />
            Confidential Counseling
          </span>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            Book Your <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Session</em>
          </h1>
          <p style={{ fontSize: 16, color: "var(--body)", maxWidth: 500, margin: "0 auto" }}>
            Schedule private appointments with certified counselors.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 32 }}>
          
          {/* Left Column - Booking Form */}
          <motion.div
            {...slideRight(0.2)}
            className="card"
            style={{ padding: 32 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CalendarDays size={24} color="white" />
              </div>
              <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>Schedule Your Session</h2>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Date Selection */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 12 }}>
                  Preferred Date
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                  {dates.map((dateObj) => (
                    <button
                      key={dateObj.value}
                      type="button"
                      onClick={() => handleChange('date', dateObj.value)}
                      style={{
                        padding: "12px 4px",
                        borderRadius: 12,
                        border: "2px solid",
                        borderColor: formData.date === dateObj.value ? "var(--sage)" : "var(--border)",
                        background: formData.date === dateObj.value ? "var(--sage-light)" : "#fff",
                        color: formData.date === dateObj.value ? "var(--sage)" : "var(--body)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        fontSize: 12,
                        fontWeight: formData.date === dateObj.value ? 500 : 400,
                      }}
                    >
                      <div style={{ fontSize: 10, color: formData.date === dateObj.value ? "var(--sage)" : "var(--muted)", marginBottom: 4 }}>
                        {dateObj.display.split(' ')[0]}
                      </div>
                      <div>
                        {dateObj.display.split(' ')[1]} {dateObj.display.split(' ')[2]}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 12 }}>
                  Preferred Time
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {timeSlots.map((slot) => (
                    <label
                      key={slot.value}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: 12,
                        borderRadius: 12,
                        border: "2px solid",
                        borderColor: formData.time === slot.value ? "var(--sage)" : "var(--border)",
                        background: formData.time === slot.value ? "var(--sage-light)" : "#fff",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={slot.value}
                        checked={formData.time === slot.value}
                        onChange={(e) => handleChange('time', e.target.value)}
                        style={{ accentColor: "var(--sage)" }}
                      />
                      <span style={{ fontSize: 18 }}>{slot.icon}</span>
                      <span style={{ fontSize: 14, color: "var(--charcoal)" }}>{slot.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Session Type */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 12 }}>
                  Session Type
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {sessionTypes.map((type) => (
                    <label
                      key={type.value}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: 12,
                        borderRadius: 12,
                        border: "2px solid",
                        borderColor: formData.type === type.value ? "var(--sage)" : "var(--border)",
                        background: formData.type === type.value ? "var(--sage-light)" : "#fff",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={(e) => handleChange('type', e.target.value)}
                        style={{ accentColor: "var(--sage)" }}
                      />
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage)" }}>
                        {type.icon}
                      </div>
                      <span style={{ fontSize: 14, color: "var(--charcoal)" }}>{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 12 }}>
                  Brief Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Briefly describe what you'd like to discuss..."
                  rows="4"
                  style={{
                    width: "100%",
                    padding: 14,
                    background: "var(--cream)",
                    border: "2px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 14,
                    fontFamily: "'Outfit', sans-serif",
                    color: "var(--charcoal)",
                    outline: "none",
                    resize: "none",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                />
                <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
                  This helps your counselor prepare for your session. All information is confidential.
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || !formData.date}
                className={!formData.date || isSubmitting ? "btn-ghost" : "btn-primary"}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: 16,
                  justifyContent: "center",
                  opacity: !formData.date || isSubmitting ? 0.6 : 1,
                  cursor: !formData.date || isSubmitting ? "not-allowed" : "pointer"
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="spin" style={{ width: 18, height: 18, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%" }} />
                    Processing...
                  </span>
                ) : (
                  "Book Appointment"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Benefits & Features */}
          <motion.div
            {...slideLeft(0.2)}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            {/* Benefits */}
            <div className="card" style={{ padding: 24 }}>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 20 }}>Why Choose EchoCare</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {benefits.map((benefit, index) => (
                  <div key={index} style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }}>{benefit.title}</h4>
                      <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What Happens Next */}
            <div style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 20, padding: 24, border: "1px solid rgba(107,158,107,0.2)" }}>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 16 }}>What Happens Next?</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--sage)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>1</div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, color: "var(--charcoal)" }}>Confirmation</h4>
                    <p style={{ fontSize: 13, color: "var(--body)" }}>Receive instant confirmation via email</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--sage)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>2</div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, color: "var(--charcoal)" }}>Counselor Match</h4>
                    <p style={{ fontSize: 13, color: "var(--body)" }}>Get matched with the best counselor for your needs</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--sage)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>3</div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, color: "var(--charcoal)" }}>Reminder</h4>
                    <p style={{ fontSize: 13, color: "var(--body)" }}>Get session reminders 24 hours before</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Crisis Support */}
            <div className="card" style={{ padding: 24, background: "var(--charcoal)", border: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <AlertCircle size={20} color="var(--sage)" />
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Need Immediate Help?</h3>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
                If you're in crisis or need immediate support, please contact:
              </p>
              <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <p style={{ color: "var(--sage)", fontWeight: 600, marginBottom: 4 }}>
                  National Suicide Prevention Lifeline
                </p>
                <p style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>1-800-273-8255</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>Available 24/7</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
        <div style={S.maxW}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
              All counseling sessions are confidential and protected by HIPAA-compliant privacy measures.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              © 2025 EchoCare Counseling Services. This service connects you with licensed mental health professionals.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Book;