import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, Users, Shield, Award, Sparkles,
  User, CheckCircle, ArrowRight, MessageSquare, Video,
  Phone, MapPin, AlertCircle, Heart, LogIn, UserPlus,
  ChevronDown, CalendarDays, Menu, X, Star, Lock, Brain
} from "lucide-react";

/* ── Google Fonts ── */
(() => {
  if (document.getElementById("echocare-fonts")) return;
  const l = document.createElement("link");
  l.id = "echocare-fonts";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";
  l.rel = "stylesheet";
  document.head.appendChild(l);
})();

/* ── Responsive CSS ── */
(() => {
  if (document.getElementById("echocare-book-css")) return;
  const s = document.createElement("style");
  s.id = "echocare-book-css";
  s.textContent = `
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    .spin { animation: spin 1s linear infinite; }

    /* ── Book layout ── */
    .book-layout {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 32px;
    }

    /* ── Date grid: 7 columns ── */
    .date-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
    }

    /* ── Why register grid ── */
    .why-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }

    /* ── Benefits preview ── */
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    /* ── Tablet: ≤900px ── */
    @media (max-width: 900px) {
      .mob-hide { display: none !important; }
      .mob-show { display: flex !important; }

      .book-layout {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .date-grid {
        grid-template-columns: repeat(7, 1fr);
        gap: 6px;
      }

      .benefits-grid {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }

      .main-pad { padding: 28px 24px 48px !important; }
      .navbar-pad { padding: 0 24px !important; }
      .footer-pad { padding: 28px 24px 20px !important; }
    }

    /* ── Mobile: ≤600px ── */
    @media (max-width: 600px) {
      .main-pad { padding: 20px 16px 40px !important; }
      .navbar-pad { padding: 0 16px !important; }
      .footer-pad { padding: 22px 16px 16px !important; }

      /* Date picker: 4 cols then 3 */
      .date-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
      }

      .why-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .benefits-grid {
        grid-template-columns: 1fr;
        gap: 14px;
      }

      .auth-cta-btns {
        flex-direction: column !important;
      }
      .auth-cta-btns a {
        width: 100% !important;
        justify-content: center !important;
      }

      .form-card { padding: 22px 18px !important; }
      .sidebar-col { gap: 18px !important; }

      .page-header h1 { font-size: clamp(28px, 7vw, 40px) !important; }
      .page-header p { font-size: 14px !important; }
    }

    /* ── Very small: ≤380px ── */
    @media (max-width: 380px) {
      .date-grid {
        grid-template-columns: repeat(3, 1fr) !important;
        gap: 5px;
      }
      .date-btn { padding: 9px 2px !important; font-size: 10px !important; }
    }
  `;
  document.head.appendChild(s);
})();

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
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

/* ── Shared Navbar ── */
const Navbar = ({ scrolled, mobileOpen, setMobileOpen, isLoggedIn, onLogout }) => (
  <>
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="navbar-pad"
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
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <motion.div whileHover={{ rotate: 5, scale: 1.05 }}
          style={{ width: 36, height: 36, borderRadius: 12, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={18} color="white" />
        </motion.div>
        <span className="serif" style={{ fontWeight: 500, fontSize: 22, color: "var(--charcoal)", letterSpacing: "-0.02em" }}>EchoCare</span>
      </Link>

      <nav className="mob-hide" style={{ display: "flex", gap: 36, alignItems: "center" }}>
        {NAV_ITEMS.map(item => <Link key={item.label} to={item.path} className="nav-link">{item.label}</Link>)}
      </nav>

      <div className="mob-hide" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn-ghost" style={{ padding: "10px 24px" }}>Sign in</Link>
            <Link to="/register" className="btn-primary" style={{ padding: "10px 24px" }}>Get Started <ArrowRight size={16} /></Link>
          </>
        ) : (
          <>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 500 }}>U</div>
            <button onClick={onLogout} className="btn-ghost" style={{ padding: "8px 20px" }}>Logout</button>
          </>
        )}
      </div>

      <button onClick={() => setMobileOpen(!mobileOpen)} className="mob-show"
        style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 8, color: "var(--charcoal)" }}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </motion.header>

    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
          style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "0 24px", overflow: "hidden", position: "sticky", top: 70, zIndex: 299 }}
        >
          <div style={{ padding: "24px 0", display: "flex", flexDirection: "column", gap: 8 }}>
            {NAV_ITEMS.map(item => (
              <Link key={item.label} to={item.path} onClick={() => setMobileOpen(false)}
                style={{ padding: "14px 12px", color: "var(--body)", fontSize: 16, borderRadius: 10, display: "block", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--sage-light)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{item.label}</Link>
            ))}
            <div style={{ display: "flex", gap: 12, marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Sign in</Link>
                  <Link to="/register" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Get Started</Link>
                </>
              ) : (
                <button onClick={onLogout} className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Logout</button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);

/* ── Shared Footer ── */
const Footer = ({ S }) => (
  <footer className="footer-pad" style={{ background: "var(--charcoal)", padding: "40px 40px 24px", marginTop: 40 }}>
    <div style={S.maxW}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "rgba(255,255,255,0.5)", marginBottom: 12, lineHeight: 1.7 }}>
          Need immediate help? Call the National Suicide Prevention Lifeline:{" "}
          <span style={{ color: "var(--sage)", fontWeight: 500 }}>1-800-273-8255</span>
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          © 2025 EchoCare Counseling Services. All sessions are confidential and protected.
        </p>
      </div>
    </div>
  </footer>
);

const Book = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    date: "", time: "morning", type: "individual", description: "", mode: "video"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const timeSlots = [
    { value: "morning", label: "Morning (9 AM – 12 PM)", icon: "🌅" },
    { value: "afternoon", label: "Afternoon (1 PM – 4 PM)", icon: "☀️" },
    { value: "evening", label: "Evening (5 PM – 8 PM)", icon: "🌙" },
  ];

  const sessionTypes = [
    { value: "individual", label: "Individual Counseling", icon: <User size={15} /> },
    { value: "couple", label: "Couple Counseling", icon: <Users size={15} /> },
    { value: "group", label: "Group Therapy", icon: <Users size={15} /> },
  ];

  const benefits = [
    { icon: <Shield size={20} />, title: "100% Confidential", description: "Your privacy is our top priority. All sessions are completely confidential and secure." },
    { icon: <Award size={20} />, title: "Certified Professionals", description: "Connect with licensed counselors and mental health professionals." },
    { icon: <Calendar size={20} />, title: "Flexible Scheduling", description: "Book sessions that fit your schedule, with same-day availability." },
  ];

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split("T")[0],
      display: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) { navigate("/login"); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Appointment booked successfully! You will receive a confirmation email shortly.");
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const S = { maxW: { maxWidth: 1280, margin: "0 auto", width: "100%" } };

  /* ════ NOT LOGGED IN VIEW ════ */
  if (!isLoggedIn) {
    return (
      <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>
        <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
        <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.8)", bottom: -100, left: -100 }} />

        <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isLoggedIn={false} onLogout={handleLogout} />

        <main className="main-pad" style={{ ...S.maxW, padding: "40px 40px 60px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center" }}>

            {/* Icon */}
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}
              style={{ width: 72, height: 72, borderRadius: 22, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 10px 30px rgba(107,158,107,0.3)" }}>
              <Calendar size={36} color="white" />
            </motion.div>

            <h1 className="serif page-header" style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 300, marginBottom: 14 }}>
              Book Confidential <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Session</em>
            </h1>
            <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 600, margin: "0 auto 44px" }}>
              Schedule private appointments with certified counselors. Please login or sign up to access booking services.
            </p>

            {/* Auth card */}
            <div className="card" style={{ padding: "36px 32px", marginBottom: 44, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
                <AlertCircle size={22} color="var(--sage)" />
                <h2 className="serif" style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>Authentication Required</h2>
              </div>

              <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "var(--body)", marginBottom: 28, maxWidth: 500, margin: "0 auto 28px" }}>
                To book counseling sessions and ensure your privacy, you need an EchoCare account.
              </p>

              {/* Why register / what you get */}
              <div className="why-grid">
                <div style={{ background: "var(--sage-light)", borderRadius: 16, padding: 22, textAlign: "left" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)", marginBottom: 14 }}>Why Register?</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 11, listStyle: "none" }}>
                    {[
                      [<Shield size={14} />, "Secure & confidential session management"],
                      [<Calendar size={14} />, "Easy appointment scheduling & reminders"],
                      [<Heart size={14} />, "Personalized wellness recommendations"],
                    ].map(([icon, text], i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <span style={{ color: "var(--sage)", flexShrink: 0, marginTop: 1 }}>{icon}</span>
                        <span style={{ fontSize: 13, color: "var(--body)" }}>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "var(--warm)", borderRadius: 16, padding: 22, textAlign: "left" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)", marginBottom: 14 }}>What You Get</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 11, listStyle: "none" }}>
                    {[
                      [<CheckCircle size={14} />, "Access to certified mental health professionals"],
                      [<MessageSquare size={14} />, "Free AI wellness chat included"],
                      [<Users size={14} />, "Join supportive student communities"],
                    ].map(([icon, text], i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <span style={{ color: "var(--sage)", flexShrink: 0, marginTop: 1 }}>{icon}</span>
                        <span style={{ fontSize: 13, color: "var(--body)" }}>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="auth-cta-btns" style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
                <Link to="/login" className="btn-primary" style={{ padding: "13px 28px", fontSize: 14, gap: 8 }}>
                  <LogIn size={15} /> Login to Book Session
                </Link>
                <Link to="/register" className="btn-sage" style={{ padding: "13px 28px", fontSize: 14, gap: 8 }}>
                  <UserPlus size={15} /> Create Free Account
                </Link>
              </div>

              <p style={{ fontSize: 13, color: "var(--muted)" }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "var(--sage)", textDecoration: "underline" }}>Login here</Link>
              </p>
            </div>

            {/* Benefits preview */}
            <div style={{ textAlign: "left" }}>
              <h3 className="serif" style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 400, marginBottom: 22 }}>What to Expect</h3>
              <div className="benefits-grid">
                {benefits.map((b, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="card" style={{ padding: 22 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      {b.icon}
                    </div>
                    <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 7, color: "var(--charcoal)" }}>{b.title}</h4>
                    <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>{b.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>

        <Footer S={S} />
      </div>
    );
  }

  /* ════ LOGGED IN VIEW ════ */
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.8)", bottom: -100, left: -100 }} />

      <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isLoggedIn={true} onLogout={handleLogout} />

      <main className="main-pad" style={{ ...S.maxW, padding: "40px 40px 60px" }}>

        {/* Back link */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 22 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--body)", fontSize: 14 }}>
            <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fadeUp(0.1)} className="page-header" style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)", marginBottom: 14, display: "inline-flex", gap: 6 }}>
            <Calendar size={13} /> Confidential Counseling
          </span>
          <h1 className="serif" style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            Book Your <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Session</em>
          </h1>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 500, margin: "0 auto" }}>
            Schedule private appointments with certified counselors.
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="book-layout">

          {/* ── Booking Form ── */}
          <motion.div {...slideRight(0.2)}>
            <div className="card form-card" style={{ padding: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 26 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CalendarDays size={22} color="white" />
                </div>
                <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>Schedule Your Session</h2>
              </div>

              <form onSubmit={handleSubmit}>

                {/* Date Selection */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 12 }}>
                    Preferred Date
                  </label>
                  <div className="date-grid">
                    {dates.map((dateObj) => (
                      <button
                        key={dateObj.value}
                        type="button"
                        className="date-btn"
                        onClick={() => handleChange("date", dateObj.value)}
                        style={{
                          padding: "10px 4px", borderRadius: 11,
                          border: "2px solid",
                          borderColor: formData.date === dateObj.value ? "var(--sage)" : "var(--border)",
                          background: formData.date === dateObj.value ? "var(--sage-light)" : "#fff",
                          color: formData.date === dateObj.value ? "var(--sage)" : "var(--body)",
                          cursor: "pointer", transition: "all 0.2s",
                          fontSize: 11,
                          fontWeight: formData.date === dateObj.value ? 600 : 400,
                          lineHeight: 1.3,
                        }}
                      >
                        <div style={{ fontSize: 9, color: formData.date === dateObj.value ? "var(--sage)" : "var(--muted)", marginBottom: 3 }}>
                          {dateObj.display.split(" ")[0]}
                        </div>
                        <div>{dateObj.display.split(" ")[1]} {dateObj.display.split(" ")[2]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 12 }}>
                    Preferred Time
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {timeSlots.map((slot) => (
                      <label key={slot.value} style={{
                        display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                        borderRadius: 12, border: "2px solid",
                        borderColor: formData.time === slot.value ? "var(--sage)" : "var(--border)",
                        background: formData.time === slot.value ? "var(--sage-light)" : "#fff",
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                        <input type="radio" name="time" value={slot.value}
                          checked={formData.time === slot.value}
                          onChange={(e) => handleChange("time", e.target.value)}
                          style={{ accentColor: "var(--sage)" }} />
                        <span style={{ fontSize: 16 }}>{slot.icon}</span>
                        <span style={{ fontSize: 13.5, color: "var(--charcoal)" }}>{slot.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Session Type */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 12 }}>
                    Session Type
                  </label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {sessionTypes.map((type) => (
                      <label key={type.value} style={{
                        display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                        borderRadius: 12, border: "2px solid",
                        borderColor: formData.type === type.value ? "var(--sage)" : "var(--border)",
                        background: formData.type === type.value ? "var(--sage-light)" : "#fff",
                        cursor: "pointer", transition: "all 0.2s",
                      }}>
                        <input type="radio" name="type" value={type.value}
                          checked={formData.type === type.value}
                          onChange={(e) => handleChange("type", e.target.value)}
                          style={{ accentColor: "var(--sage)" }} />
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage)", flexShrink: 0 }}>
                          {type.icon}
                        </div>
                        <span style={{ fontSize: 13.5, color: "var(--charcoal)" }}>{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 10 }}>
                    Brief Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Briefly describe what you'd like to discuss..."
                    rows="3"
                    style={{
                      width: "100%", padding: "12px 14px",
                      background: "var(--cream)", border: "2px solid var(--border)",
                      borderRadius: 12, fontSize: 13.5,
                      fontFamily: "'Outfit', sans-serif", color: "var(--charcoal)",
                      outline: "none", resize: "none", transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "var(--sage)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                  />
                  <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 7 }}>
                    This helps your counselor prepare for your session. All information is confidential.
                  </p>
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || !formData.date}
                  className={!formData.date || isSubmitting ? "btn-ghost" : "btn-primary"}
                  style={{ width: "100%", padding: "15px", fontSize: 15, justifyContent: "center", opacity: !formData.date || isSubmitting ? 0.6 : 1, cursor: !formData.date || isSubmitting ? "not-allowed" : "pointer" }}
                >
                  {isSubmitting ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="spin" style={{ width: 17, height: 17, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block" }} />
                      Processing...
                    </span>
                  ) : "Book Appointment"}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* ── Right Sidebar ── */}
          <motion.div {...slideLeft(0.2)}>
            <div className="sidebar-col" style={{ display: "flex", flexDirection: "column", gap: 22 }}>

              {/* Benefits */}
              <div className="card" style={{ padding: 24 }}>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 20 }}>Why Choose EchoCare</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {benefits.map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {b.icon}
                      </div>
                      <div>
                        <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 3, color: "var(--charcoal)" }}>{b.title}</h4>
                        <p style={{ fontSize: 12.5, color: "var(--body)", lineHeight: 1.7 }}>{b.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What Happens Next */}
              <div style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 20, padding: 24, border: "1px solid rgba(107,158,107,0.2)" }}>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, marginBottom: 18 }}>What Happens Next?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { n: 1, title: "Confirmation", body: "Receive instant confirmation via email" },
                    { n: 2, title: "Counselor Match", body: "Get matched with the best counselor for your needs" },
                    { n: 3, title: "Reminder", body: "Get session reminders 24 hours before" },
                  ].map(step => (
                    <div key={step.n} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--sage)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{step.n}</div>
                      <div>
                        <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 2, color: "var(--charcoal)" }}>{step.title}</h4>
                        <p style={{ fontSize: 13, color: "var(--body)" }}>{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crisis */}
              <div className="card" style={{ padding: 24, background: "var(--charcoal)", border: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <AlertCircle size={18} color="var(--sage)" />
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Need Immediate Help?</h3>
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>
                  If you're in crisis or need immediate support, please contact:
                </p>
                <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                  <p style={{ color: "var(--sage)", fontWeight: 600, marginBottom: 4, fontSize: 13 }}>National Suicide Prevention Lifeline</p>
                  <p style={{ color: "#fff", fontSize: 20, fontWeight: 600 }}>1-800-273-8255</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>Available 24/7</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer S={S} />
    </div>
  );
};

export default Book;