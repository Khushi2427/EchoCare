import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Users, MessageSquare, Heart, Lock, LogIn, UserPlus,
  ArrowRight, Search, Filter, Users2, MessageCircle, Calendar,
  Award, TrendingUp, Globe, Video, Music, Code, Dumbbell,
  Gamepad2, BookOpen, Coffee, Lightbulb, Shield, CheckCircle,
  ExternalLink, Bell, Star, Menu, X, Brain, ChevronDown
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
  if (document.getElementById("echocare-community-css")) return;
  const s = document.createElement("style");
  s.id = "echocare-community-css";
  s.textContent = `
    /* ── Grids ── */
    .comm-grid       { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .preview-grid    { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 36px; }
    .stats-grid      { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
    .benefits-grid   { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .guidelines-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .events-layout   { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; }
    .guidelines-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    /* ── Search bar ── */
    .search-row   { display: flex; flex-direction: row; gap: 14px; align-items: center; }
    .search-right { display: flex; gap: 10px; flex-shrink: 0; }

    /* ── CTA buttons ── */
    .cta-btns     { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .auth-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

    /* ── Tab toggle ── */
    .tab-toggle { display: flex; border-radius: 12px; overflow: hidden; border: 2px solid var(--border); flex-shrink: 0; }

    /* ── Tablet: ≤900px ── */
    @media (max-width: 900px) {
      .mob-hide    { display: none !important; }
      .mob-show    { display: flex !important; }

      .comm-grid       { grid-template-columns: 1fr 1fr; gap: 16px; }
      .preview-grid    { grid-template-columns: 1fr 1fr; gap: 12px; }
      .stats-grid      { grid-template-columns: 1fr 1fr; gap: 12px; }
      .benefits-grid   { grid-template-columns: 1fr 1fr; gap: 16px; }
      .guidelines-grid { grid-template-columns: 1fr; gap: 24px; }
      .events-layout   { grid-template-columns: 1fr; gap: 24px; }

      .main-pad   { padding: 28px 24px 48px !important; }
      .navbar-pad { padding: 0 24px !important; }
      .footer-pad { padding: 28px 24px 20px !important; }
      .guidelines-section { padding: 28px 24px !important; border-radius: 24px !important; }
      .auth-card  { padding: 32px 24px !important; }
    }

    /* ── Mobile: ≤600px ── */
    @media (max-width: 600px) {
      .main-pad   { padding: 20px 16px 40px !important; }
      .navbar-pad { padding: 0 16px !important; }
      .footer-pad { padding: 22px 16px 16px !important; }

      .comm-grid       { grid-template-columns: 1fr; gap: 14px; }
      .preview-grid    { grid-template-columns: 1fr 1fr; gap: 10px; }
      .stats-grid      { grid-template-columns: 1fr 1fr; gap: 10px; }
      .benefits-grid   { grid-template-columns: 1fr; gap: 14px; }
      .guidelines-preview { grid-template-columns: 1fr; gap: 12px; }

      .search-row   { flex-direction: column; gap: 10px; }
      .search-right { width: 100%; flex-wrap: wrap; }
      .search-right select { flex: 1; min-width: 0 !important; }
      .tab-toggle   { width: 100%; }
      .tab-toggle button { flex: 1; padding: 12px 10px !important; font-size: 13px !important; }

      .auth-cta-row { flex-direction: column; }
      .auth-cta-row a { width: 100% !important; justify-content: center !important; }

      .cta-btns { flex-direction: column; }
      .cta-btns button { width: 100% !important; justify-content: center !important; }

      .page-h1 { font-size: clamp(26px, 7vw, 40px) !important; }
      .auth-card  { padding: 24px 18px !important; }
      .guidelines-section { padding: 22px 18px !important; border-radius: 20px !important; }
      .benefits-section { padding: 24px 18px !important; border-radius: 20px !important; }

      /* Events tab */
      .event-actions { flex-direction: column !important; }
      .event-actions button { width: 100% !important; justify-content: center !important; }
    }

    /* ── Very small: ≤380px ── */
    @media (max-width: 380px) {
      .preview-grid { grid-template-columns: 1fr; }
      .stats-grid   { grid-template-columns: 1fr 1fr; }
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
const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
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
      initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
      className="navbar-pad"
      style={{
        position: "sticky", top: 0, zIndex: 300, height: 70, padding: "0 40px",
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
        {NAV_ITEMS.map(n => <Link key={n.label} to={n.path} className="nav-link">{n.label}</Link>)}
      </nav>

      <div className="mob-hide" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn-ghost" style={{ padding: "10px 24px" }}>Sign in</Link>
            <Link to="/register" className="btn-primary" style={{ padding: "10px 24px" }}>Get Started <ArrowRight size={16} /></Link>
          </>
        ) : (
          <>
            <div style={{ position: "relative" }}>
              <Bell size={18} color="var(--body)" style={{ cursor: "pointer" }} />
              <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: "var(--sage)", borderRadius: "50%" }} />
            </div>
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
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
          style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "0 24px", overflow: "hidden", position: "sticky", top: 70, zIndex: 299 }}>
          <div style={{ padding: "24px 0", display: "flex", flexDirection: "column", gap: 8 }}>
            {NAV_ITEMS.map(n => (
              <Link key={n.label} to={n.path} onClick={() => setMobileOpen(false)}
                style={{ padding: "14px 12px", color: "var(--body)", fontSize: 16, borderRadius: 10, display: "block", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--sage-light)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{n.label}</Link>
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
        <p style={{ fontSize: "clamp(12px, 1.4vw, 13px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
          EchoCare Community is a moderated, safe space for students to connect and support each other.
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>
          © 2025 EchoCare Student Community. All discussions are confidential and protected.
        </p>
        <p style={{ fontSize: 12, color: "var(--sage)", marginTop: 14, fontWeight: 500 }}>
          Need immediate help? Call Crisis Line: 1-800-273-8255
        </p>
      </div>
    </div>
  </footer>
);

const Community = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("communities");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setIsLoggedIn(!!localStorage.getItem("authToken")); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleLogout = () => { localStorage.removeItem("authToken"); setIsLoggedIn(false); navigate("/"); };

  const communityCategories = [
    { icon: <Code size={19} />, title: "Tech & Coding", description: "Connect with fellow programmers, share coding challenges, and support each other through tech stress.", members: "2.5k+ Members", bgColor: "#EEF5EE", topics: ["Programming", "Career", "Tech Stress", "Projects"] },
    { icon: <BookOpen size={19} />, title: "Study Groups", description: "Academic support, study tips, and collaborative learning with peers across different fields.", members: "3.9k+ Members", bgColor: "#F6F0E8", topics: ["Exam Prep", "Homework", "Research", "Time Management"] },
    { icon: <Music size={19} />, title: "Music & Arts", description: "Express yourself through music, share beats, and find therapeutic rhythm with creative peers.", members: "1.8k+ Members", bgColor: "#EEF5EE", topics: ["Music Therapy", "Creative Expression", "Instrument", "Songwriting"] },
    { icon: <Dumbbell size={19} />, title: "Fitness & Wellness", description: "Share workout routines, wellness tips, and motivate each other towards healthier lifestyles.", members: "3.2k+ Members", bgColor: "#F6F0E8", topics: ["Exercise", "Nutrition", "Yoga", "Mental Wellness"] },
    { icon: <Gamepad2 size={19} />, title: "Gaming", description: "Game together, discuss healthy gaming habits, and build friendships through shared virtual experiences.", members: "4.1k+ Members", bgColor: "#EEF5EE", topics: ["Gaming Stress", "Team Building", "E-sports", "Balance"] },
    { icon: <Heart size={19} />, title: "Mental Health Support", description: "A safe space for sharing experiences, coping strategies, and supporting each other's mental health journey.", members: "5.7k+ Members", bgColor: "#F6F0E8", topics: ["Anxiety", "Depression", "Coping", "Recovery"] },
    { icon: <Coffee size={19} />, title: "Social Connections", description: "Make new friends, socialize, and combat loneliness through virtual and in-person meetups.", members: "4.8k+ Members", bgColor: "#EEF5EE", topics: ["Friendship", "Social Anxiety", "Networking", "Events"] },
    { icon: <Lightbulb size={19} />, title: "Entrepreneurship", description: "Share startup ideas, discuss business challenges, and support each other's entrepreneurial journeys.", members: "2.1k+ Members", bgColor: "#F6F0E8", topics: ["Startups", "Funding", "Innovation", "Stress Management"] },
  ];

  const categories = [
    { id: "all", label: "All Communities" }, { id: "academic", label: "Academic" },
    { id: "creative", label: "Creative" }, { id: "health", label: "Health & Wellness" },
    { id: "tech", label: "Tech" }, { id: "social", label: "Social" },
  ];

  const upcomingEvents = [
    { title: "Weekly Support Circle", date: "Tomorrow, 7 PM", attendees: "45 attending", type: "Virtual" },
    { title: "Study Techniques Workshop", date: "Dec 28, 5 PM", attendees: "120 attending", type: "Webinar" },
    { title: "Mindfulness Meditation", date: "Daily, 8 AM", attendees: "Join anytime", type: "Daily Practice" },
  ];

  const communityGuidelines = [
    "Be respectful and kind to others",
    "Maintain confidentiality of shared experiences",
    "No discrimination or hate speech",
    "Share resources and support generously",
    "Report any concerns to moderators",
  ];

  const selectStyle = {
    appearance: "none", padding: "13px 36px 13px 40px",
    background: "var(--cream)", border: "2px solid var(--border)",
    borderRadius: 12, fontSize: 13.5, fontFamily: "'Outfit', sans-serif",
    color: "var(--charcoal)", outline: "none", cursor: "pointer", width: "100%",
  };

  const S = { maxW: { maxWidth: 1280, margin: "0 auto", width: "100%" } };

  /* ════ NOT LOGGED IN VIEW ════ */
  if (!isLoggedIn) {
    return (
      <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>
        <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
        <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.8)", bottom: -100, left: -100 }} />

        <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isLoggedIn={false} onLogout={handleLogout} />

        <main className="main-pad" style={{ ...S.maxW, padding: "40px 40px 60px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: 48 }}>

            {/* Icon */}
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}
              style={{ width: 72, height: 72, borderRadius: 22, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 10px 30px rgba(107,158,107,0.3)" }}>
              <Users size={36} color="white" />
            </motion.div>

            <h1 className="serif page-h1" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, marginBottom: 14 }}>
              EchoCare <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Community</em>
            </h1>
            <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 600, margin: "0 auto 44px", lineHeight: 1.8 }}>
              Join supportive peer communities, share experiences, and grow together in a safe, stigma-free environment.
            </p>

            {/* Auth card */}
            <div className="card auth-card" style={{ padding: 44, marginBottom: 44 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
                <Lock size={22} color="var(--sage)" />
                <h2 className="serif" style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>Community Access Required</h2>
              </div>
              <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "var(--body)", marginBottom: 36, maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.8 }}>
                Our supportive communities are available exclusively to EchoCare members.
                Register for free to connect with peers, join discussions, and participate in events.
              </p>

              {/* Preview */}
              <div className="preview-grid">
                {communityCategories.slice(0, 4).map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }} className="card" style={{ padding: 18, textAlign: "center", cursor: "pointer" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 11, background: c.bgColor, color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                      {c.icon}
                    </div>
                    <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: "var(--charcoal)" }}>{c.title}</h3>
                    <p style={{ fontSize: 11, color: "var(--body)", marginBottom: 10, lineHeight: 1.6 }}>{c.description}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, color: "var(--muted)" }}>{c.members}</span>
                      <span style={{ fontSize: 9, padding: "3px 7px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100, fontWeight: 600, letterSpacing: "0.04em" }}>PREVIEW</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Auth CTAs */}
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--warm)", padding: "8px 18px", borderRadius: 100, marginBottom: 28 }}>
                  <Shield size={15} color="var(--sage)" />
                  <span style={{ fontSize: 13, color: "var(--charcoal)" }}>Login required to join communities</span>
                </div>
                <div className="auth-cta-row" style={{ marginBottom: 20 }}>
                  <Link to="/login" className="btn-primary" style={{ padding: "13px 26px", fontSize: 14, gap: 8 }}>
                    <LogIn size={15} /> Login to Join Community
                  </Link>
                  <Link to="/register" className="btn-sage" style={{ padding: "13px 26px", fontSize: 14, gap: 8 }}>
                    <UserPlus size={15} /> Create Free Account
                  </Link>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "var(--sage)", textDecoration: "underline" }}>Login here</Link>
                </p>
              </div>
            </div>

            {/* Benefits */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="benefits-section" style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 28, padding: "36px 28px", border: "1px solid rgba(107,158,107,0.15)", marginBottom: 28 }}>
                <h2 className="serif" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, marginBottom: 28, textAlign: "center" }}>
                  Why Join EchoCare <em style={{ color: "var(--sage)" }}>Community?</em>
                </h2>
                <div className="benefits-grid">
                  {[
                    { icon: <Users size={22} />, title: "Peer Support", body: "Connect with students who understand your experiences and challenges." },
                    { icon: <Shield size={22} />, title: "Safe Space", body: "Moderated communities ensure respectful, stigma-free conversations." },
                    { icon: <Calendar size={22} />, title: "Events & Activities", body: "Join workshops, support circles, and social events." },
                  ].map((b, i) => (
                    <div key={i} className="card" style={{ padding: 22 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, color: "var(--sage)" }}>{b.icon}</div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 7, color: "var(--charcoal)" }}>{b.title}</h3>
                      <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>{b.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Guidelines preview */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="card" style={{ padding: "28px 24px" }}>
              <h3 className="serif" style={{ fontSize: "clamp(18px, 2.5vw, 20px)", fontWeight: 400, marginBottom: 20, textAlign: "center" }}>Community Guidelines</h3>
              <div className="guidelines-preview">
                {communityGuidelines.slice(0, 4).map((g, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13.5, color: "var(--body)" }}>{g}</span>
                  </div>
                ))}
              </div>
            </motion.div>
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

        {/* Back */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 22 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--body)", fontSize: 14 }}>
            <ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> Back to Home
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div {...fadeUp(0.1)} style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)", marginBottom: 14, display: "inline-flex", gap: 6 }}>
            <Users size={13} /> Student Community
          </span>
          <h1 className="serif page-h1" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            EchoCare <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Community</em>
          </h1>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 600, margin: "0 auto" }}>
            Join supportive peer communities, share experiences, and grow together in a safe, stigma-free environment.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: "Total Members", value: "25,432", icon: <Users2 size={17} /> },
            { label: "Active Groups", value: "48", icon: <MessageCircle size={17} /> },
            { label: "Online Now", value: "1,248", icon: <Globe size={17} /> },
            { label: "Events Today", value: "12", icon: <Calendar size={17} /> },
          ].map((stat, i) => (
            <motion.div key={i} {...fadeUp(i * 0.06)} className="card" style={{ padding: "14px 16px", textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ color: "var(--sage)" }}>{stat.icon}</span>
                <span className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>{stat.value}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search & Filters */}
        <motion.div {...fadeUp(0.3)}>
          <div className="card" style={{ padding: 18, margin: "24px 0 28px" }}>
            <div className="search-row">
              {/* Search input */}
              <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                <Search size={16} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                <input type="text" placeholder="Search communities or topics..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: "100%", padding: "12px 12px 12px 38px", background: "var(--cream)", border: "2px solid var(--border)", borderRadius: 12, fontSize: 13.5, fontFamily: "'Outfit', sans-serif", color: "var(--charcoal)", outline: "none", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "var(--sage)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>

              {/* Right controls */}
              <div className="search-right">
                {/* Category select */}
                <div style={{ position: "relative", minWidth: 148 }}>
                  <Filter size={15} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={selectStyle}
                    onFocus={e => e.target.style.borderColor = "var(--sage)"} onBlur={e => e.target.style.borderColor = "var(--border)"}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                </div>

                {/* Tab toggle */}
                <div className="tab-toggle">
                  {["communities", "events"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      style={{ padding: "12px 20px", background: activeTab === tab ? "var(--sage)" : "var(--cream)", color: activeTab === tab ? "#fff" : "var(--body)", border: "none", fontSize: 13.5, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize" }}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── COMMUNITIES TAB ── */}
        {activeTab === "communities" && (
          <>
            <div className="comm-grid" style={{ marginBottom: 44 }}>
              {communityCategories.map((c, i) => (
                <motion.div key={i} {...scaleIn(i * 0.04)} whileHover={{ y: -5 }}
                  onClick={() => alert(`Joining: ${c.title}`)} style={{ cursor: "pointer" }}>
                  <div className="card" style={{ padding: 0, overflow: "hidden", height: "100%" }}>
                    <div style={{ height: 4, background: "var(--sage)", opacity: 0.6 }} />
                    <div style={{ padding: 18 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bgColor, color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {c.icon}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Star size={12} color="#FBBF24" fill="#FBBF24" />
                          <span style={{ fontSize: 11, color: "var(--body)" }}>4.8</span>
                        </div>
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: "var(--charcoal)" }}>{c.title}</h3>
                      <p style={{ fontSize: 12, color: "var(--body)", marginBottom: 14, lineHeight: 1.6 }}>{c.description}</p>
                      <div style={{ marginBottom: 14 }}>
                        <h4 style={{ fontSize: 9, fontWeight: 700, color: "var(--light-muted)", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.06em" }}>Popular Topics</h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {c.topics.slice(0, 3).map((t, idx) => (
                            <span key={idx} style={{ fontSize: 10, padding: "3px 8px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>{c.members}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--sage)", fontSize: 12, fontWeight: 500 }}>
                          Join <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Guidelines */}
            <motion.div {...fadeUp(0.5)} style={{ marginBottom: 44 }}>
              <div className="guidelines-section" style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 28, padding: 36, border: "1px solid rgba(107,158,107,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
                  <Shield size={22} color="var(--sage)" />
                  <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>Community Guidelines</h2>
                </div>
                <div className="guidelines-grid">
                  <div>
                    <p style={{ fontSize: 13.5, color: "var(--body)", marginBottom: 18, lineHeight: 1.75 }}>
                      Our community is built on respect, empathy, and support. Please follow these guidelines:
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: 11, listStyle: "none" }}>
                      {communityGuidelines.map((g, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <CheckCircle size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13.5, color: "var(--body)" }}>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card" style={{ padding: 22 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 18, color: "var(--charcoal)" }}>Need Help?</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                      {[
                        { icon: <MessageSquare size={17} />, title: "Community Moderators", body: "Available to help with any issues or concerns" },
                        { icon: <Users size={17} />, title: "Peer Support", body: "Connect with trained peer supporters" },
                        { icon: <Heart size={17} />, title: "Professional Help", body: "Access to counselors when needed" },
                      ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                          <div>
                            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 3, color: "var(--charcoal)" }}>{item.title}</h4>
                            <p style={{ fontSize: 12, color: "var(--body)" }}>{item.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* ── EVENTS TAB ── */}
        {activeTab === "events" && (
          <motion.div {...fadeUp(0.3)} style={{ marginBottom: 44 }}>
            <div className="events-layout">
              {/* Upcoming Events */}
              <div>
                <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, marginBottom: 22 }}>Upcoming Events</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {upcomingEvents.map((ev, i) => (
                    <div key={i} className="card" style={{ padding: 22 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
                        <div>
                          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{ev.title}</h3>
                          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12, color: "var(--muted)", flexWrap: "wrap" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Calendar size={13} />{ev.date}</span>
                            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Users size={13} />{ev.attendees}</span>
                          </div>
                        </div>
                        <span style={{ padding: "5px 12px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100, fontSize: 11, fontWeight: 500, flexShrink: 0 }}>{ev.type}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--body)", marginBottom: 18, lineHeight: 1.7 }}>
                        Join our community for this supportive event designed to help students connect and grow together.
                      </p>
                      <div className="event-actions" style={{ display: "flex", gap: 10 }}>
                        <button className="btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>Join Event</button>
                        <button className="btn-ghost" style={{ padding: "10px 18px", fontSize: 13 }}>Add to Calendar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 22, padding: 22, border: "1px solid rgba(107,158,107,0.15)" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "var(--charcoal)" }}>Your Communities</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {communityCategories.slice(0, 3).map((c, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#fff", borderRadius: 11 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: 8, background: c.bgColor, color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</div>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>{c.title}</span>
                        </div>
                        <span style={{ fontSize: 10, padding: "3px 9px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>Joined</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card" style={{ padding: 22 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, color: "var(--charcoal)" }}>Quick Actions</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { label: "Create New Group", icon: <Users size={15} /> },
                      { label: "Schedule Event", icon: <Calendar size={15} /> },
                      { label: "Find Peer Support", icon: <Heart size={15} /> },
                    ].map((a, i) => (
                      <button key={i} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: "var(--cream)", border: "none", borderRadius: 10, cursor: "pointer", color: "var(--body)", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--sage-light)"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--cream)"}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{a.label}</span>
                        <span style={{ color: "var(--muted)" }}>{a.icon}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div {...fadeUp(0.6)}>
          <div style={{ background: "linear-gradient(135deg, var(--sage) 0%, var(--sage-hover) 100%)", borderRadius: 28, padding: "44px 32px", textAlign: "center" }}>
            <h2 className="serif" style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 400, marginBottom: 12, color: "#fff" }}>Ready to Make Connections?</h2>
            <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "rgba(255,255,255,0.9)", marginBottom: 28, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.8 }}>
              Join thousands of students who've found friendship, support, and community through EchoCare.
            </p>
            <div className="cta-btns">
              <button className="btn-white" style={{ padding: "13px 26px" }}>Explore All Communities</button>
              <button className="btn-ghost" style={{ padding: "13px 26px", borderColor: "#fff", color: "#fff" }}>Host an Event</button>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer S={S} />
    </div>
  );
};

export default Community;