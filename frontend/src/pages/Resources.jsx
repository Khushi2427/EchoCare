import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Video, Headphones, FileText, Globe, BookOpen,
  PlayCircle, Download, Search, Filter, Lock, LogIn, UserPlus,
  ArrowRight, ExternalLink, Languages, Volume2, Film, Book,
  AlertCircle, Heart, CheckCircle, Menu, X, Brain, Users,
  Calendar, Shield, Star, ChevronDown
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
  if (document.getElementById("echocare-resources-css")) return;
  const s = document.createElement("style");
  s.id = "echocare-resources-css";
  s.textContent = `
    /* ── Resource category grid ── */
    .res-cat-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    /* ── Preview cards (logged-out) ── */
    .res-preview-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }

    /* ── Language grid ── */
    .lang-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
    }

    /* ── Featured grid ── */
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    /* ── Benefits grid (logged-out) ── */
    .benefits-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    /* ── Search bar row ── */
    .search-row {
      display: flex;
      flex-direction: row;
      gap: 14px;
      align-items: center;
    }
    .search-selects {
      display: flex;
      gap: 12px;
      flex-shrink: 0;
    }

    /* ── Quick actions ── */
    .quick-actions-btns {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* ── Auth CTA row ── */
    .auth-cta-row {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* ── Tablet: ≤900px ── */
    @media (max-width: 900px) {
      .mob-hide { display: none !important; }
      .mob-show { display: flex !important; }

      .res-cat-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
      .res-preview-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
      .lang-grid { grid-template-columns: repeat(5, 1fr); gap: 10px; }
      .featured-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
      .benefits-2col { gap: 16px; }

      .search-selects { flex-wrap: wrap; }

      .main-pad { padding: 28px 24px 48px !important; }
      .navbar-pad { padding: 0 24px !important; }
      .footer-pad { padding: 28px 24px 20px !important; }
      .lang-section { padding: 28px 24px !important; border-radius: 24px !important; }
    }

    /* ── Mobile: ≤600px ── */
    @media (max-width: 600px) {
      .main-pad { padding: 20px 16px 40px !important; }
      .navbar-pad { padding: 0 16px !important; }
      .footer-pad { padding: 22px 16px 16px !important; }

      .res-cat-grid { grid-template-columns: 1fr; gap: 14px; }
      .res-preview-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
      .lang-grid { grid-template-columns: repeat(4, 1fr); gap: 8px; }
      .featured-grid { grid-template-columns: 1fr; gap: 14px; }
      .benefits-2col { grid-template-columns: 1fr; gap: 14px; }

      .search-row { flex-direction: column; gap: 10px; }
      .search-selects { width: 100%; }
      .search-selects select { flex: 1; min-width: 0 !important; width: 100%; }

      .auth-cta-row { flex-direction: column; }
      .auth-cta-row a { width: 100% !important; justify-content: center !important; }

      .quick-actions-btns { flex-direction: column; }
      .quick-actions-btns a { width: 100% !important; justify-content: center !important; }

      .page-h1 { font-size: clamp(26px, 7vw, 40px) !important; }
      .lang-section { padding: 22px 18px !important; border-radius: 20px !important; }
      .search-card { padding: 16px !important; }
      .quick-card { padding: 28px 20px !important; }
    }

    /* ── Very small: ≤380px ── */
    @media (max-width: 380px) {
      .res-preview-grid { grid-template-columns: 1fr; }
      .lang-grid { grid-template-columns: repeat(3, 1fr); }
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
          All resources are created by licensed mental health professionals and reviewed by our clinical team.
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 10 }}>
          © 2025 EchoCare Wellness Resources. For educational purposes only. Not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  </footer>
);

const Resources = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setIsLoggedIn(!!localStorage.getItem("authToken")); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleLogout = () => { localStorage.removeItem("authToken"); setIsLoggedIn(false); navigate("/"); };

  const resourceCategories = [
    {
      icon: <Video size={22} />, title: "Video Guides", description: "Expert-led wellness videos and tutorials.",
      count: "50+ Videos", type: "video",
      items: ["Managing Exam Anxiety", "Mindfulness Meditation Guide", "Stress Relief Techniques", "Building Resilience", "Sleep Better Series", "Emotional Regulation"]
    },
    {
      icon: <Headphones size={22} />, title: "Guided Audios", description: "Meditation and breathing exercises.",
      count: "100+ Tracks", type: "audio",
      items: ["5-Minute Breathing Exercise", "Sleep Meditation", "Anxiety Relief Session", "Body Scan Relaxation", "Focus & Concentration", "Morning Mindfulness"]
    },
    {
      icon: <FileText size={22} />, title: "Wellness Guides", description: "Comprehensive mental health guides.",
      count: "30+ Guides", type: "guide",
      items: ["Understanding Depression", "Coping with Anxiety", "Building Healthy Habits", "Academic Stress Management", "Social Connection Guide", "Self-Care Workbook"]
    },
    {
      icon: <Globe size={22} />, title: "Multi-Language", description: "Resources in 10+ languages.",
      count: "Hindi, English, Tamil", type: "language",
      languages: ["Hindi", "English", "Tamil", "Bengali", "Telugu", "Marathi", "Gujarati", "Malayalam", "Kannada", "Punjabi"]
    },
  ];

  const languages = [
    { code: "hi", name: "Hindi", flag: "🇮🇳" }, { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ta", name: "Tamil", flag: "🇮🇳" }, { code: "bn", name: "Bengali", flag: "🇮🇳" },
    { code: "te", name: "Telugu", flag: "🇮🇳" }, { code: "mr", name: "Marathi", flag: "🇮🇳" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳" }, { code: "ml", name: "Malayalam", flag: "🇮🇳" },
    { code: "kn", name: "Kannada", flag: "🇮🇳" }, { code: "pa", name: "Punjabi", flag: "🇮🇳" },
  ];

  const categories = [
    { id: "all", label: "All Resources" }, { id: "stress", label: "Stress Management" },
    { id: "anxiety", label: "Anxiety Relief" }, { id: "sleep", label: "Sleep & Relaxation" },
    { id: "mindfulness", label: "Mindfulness" }, { id: "academic", label: "Academic Support" },
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
              <BookOpen size={36} color="white" />
            </motion.div>

            <h1 className="serif page-h1" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, marginBottom: 14 }}>
              Wellness Resource <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Hub</em>
            </h1>
            <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 600, margin: "0 auto 44px", lineHeight: 1.8 }}>
              Access psychoeducational materials in your preferred language.
              Please login or sign up to access our complete wellness library.
            </p>

            {/* Auth card */}
            <div className="card" style={{ padding: "36px 28px", marginBottom: 44 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
                <Lock size={22} color="var(--sage)" />
                <h2 className="serif" style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>Premium Resources Access</h2>
              </div>
              <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "var(--body)", marginBottom: 36, maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.8 }}>
                Our wellness resources are available exclusively to EchoCare members.
                Register for free to access guided meditations, educational videos, and mental health guides.
              </p>

              {/* Preview cards */}
              <div className="res-preview-grid">
                {resourceCategories.map((cat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }} className="card" style={{ padding: 20, textAlign: "center", cursor: "pointer" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                      {cat.icon}
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "var(--charcoal)" }}>{cat.title}</h3>
                    <p style={{ fontSize: 12, color: "var(--body)", marginBottom: 10, lineHeight: 1.6 }}>{cat.description}</p>
                    <div style={{ fontSize: 11, fontWeight: 500, color: "var(--sage)" }}>{cat.count}</div>
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 10, color: "var(--light-muted)", fontWeight: 600, letterSpacing: "0.05em" }}>PREVIEW</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Login alert + CTAs */}
              <div style={{ textAlign: "center", marginTop: 8 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--warm)", padding: "8px 18px", borderRadius: 100, marginBottom: 28 }}>
                  <AlertCircle size={15} color="var(--sage)" />
                  <span style={{ fontSize: 13, color: "var(--charcoal)" }}>Login required to access resources</span>
                </div>
                <div className="auth-cta-row" style={{ marginBottom: 20 }}>
                  <Link to="/login" className="btn-primary" style={{ padding: "13px 26px", fontSize: 14, gap: 8 }}>
                    <LogIn size={15} /> Login to Access Resources
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

            {/* What You'll Get */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 28, padding: "36px 28px", border: "1px solid rgba(107,158,107,0.15)" }}>
              <h2 className="serif" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, marginBottom: 28, textAlign: "center" }}>
                What You'll Get <em style={{ color: "var(--sage)" }}>Access To</em>
              </h2>
              <div className="benefits-2col">
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 18, color: "var(--charcoal)" }}>Resource Library Includes:</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
                    {["Professional mental health video guides", "Guided meditation & relaxation audios", "Downloadable wellness worksheets", "Multi-language support for all resources", "Expert-curated coping strategies", "Evidence-based therapy techniques"].map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <CheckCircle size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13.5, color: "var(--body)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 18, color: "var(--charcoal)" }}>Additional Benefits:</h3>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none" }}>
                    {["Track your wellness progress", "Save favorite resources", "Personalized recommendations", "Access to community forums", "Regular content updates", "Professional counselor access"].map((item, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <Heart size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13.5, color: "var(--body)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
            <BookOpen size={13} /> Wellness Library
          </span>
          <h1 className="serif page-h1" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            Wellness Resource <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Hub</em>
          </h1>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 600, margin: "0 auto" }}>
            Access psychoeducational materials in your preferred language.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div {...fadeUp(0.2)}>
          <div className="card search-card" style={{ padding: 20, marginBottom: 36 }}>
            <div className="search-row">
              {/* Search input */}
              <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
                <Search size={17} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%", padding: "13px 13px 13px 40px",
                    background: "var(--cream)", border: "2px solid var(--border)",
                    borderRadius: 12, fontSize: 13.5,
                    fontFamily: "'Outfit', sans-serif", color: "var(--charcoal)", outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--sage)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
              </div>

              {/* Selects */}
              <div className="search-selects" style={{ display: "flex", gap: 10 }}>
                <div style={{ position: "relative", minWidth: 150 }}>
                  <Filter size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={selectStyle}
                    onFocus={e => e.target.style.borderColor = "var(--sage)"} onBlur={e => e.target.style.borderColor = "var(--border)"}>
                    <option value="all">All Categories</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                  <ChevronDown size={15} style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                </div>
                <div style={{ position: "relative", minWidth: 150 }}>
                  <Globe size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                  <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} style={selectStyle}
                    onFocus={e => e.target.style.borderColor = "var(--sage)"} onBlur={e => e.target.style.borderColor = "var(--border)"}>
                    <option value="all">All Languages</option>
                    {languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
                  </select>
                  <ChevronDown size={15} style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resource Categories */}
        <div className="res-cat-grid" style={{ marginBottom: 44 }}>
          {resourceCategories.map((cat, i) => (
            <motion.div key={i} {...scaleIn(i * 0.08)} whileHover={{ y: -5 }}
              onClick={() => alert(`Accessing: ${cat.title}`)} style={{ cursor: "pointer" }}>
              <div className="card" style={{ padding: 24, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ width: 52, height: 52, borderRadius: 13, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 7, color: "var(--charcoal)" }}>{cat.title}</h3>
                <p style={{ fontSize: 13, color: "var(--body)", marginBottom: 14, lineHeight: 1.7, flex: 1 }}>{cat.description}</p>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--sage)", marginBottom: 18 }}>{cat.count}</div>

                {cat.type !== "language" ? (
                  <div style={{ paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                    <h4 style={{ fontSize: 10, fontWeight: 700, color: "var(--light-muted)", marginBottom: 9, textTransform: "uppercase", letterSpacing: "0.06em" }}>Sample Content</h4>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                      {cat.items.slice(0, 3).map((item, idx) => (
                        <li key={idx} style={{ fontSize: 12, color: "var(--body)", display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 3, height: 3, background: "var(--sage)", borderRadius: "50%", flexShrink: 0 }} />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div style={{ paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                    <h4 style={{ fontSize: 10, fontWeight: 700, color: "var(--light-muted)", marginBottom: 9, textTransform: "uppercase", letterSpacing: "0.06em" }}>Available In</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {cat.languages.slice(0, 5).map((lang, idx) => (
                        <span key={idx} style={{ fontSize: 11, padding: "3px 9px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>{lang}</span>
                      ))}
                      {cat.languages.length > 5 && (
                        <span style={{ fontSize: 11, padding: "3px 9px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>+{cat.languages.length - 5} more</span>
                      )}
                    </div>
                  </div>
                )}

                <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "var(--sage)", fontWeight: 500 }}>Access Now</span>
                  <ArrowRight size={14} color="var(--sage)" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language Support */}
        <motion.div {...fadeUp(0.4)} style={{ marginBottom: 44 }}>
          <div className="lang-section" style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 28, padding: 36, border: "1px solid rgba(107,158,107,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <Languages size={22} color="var(--sage)" />
              <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>Multi-Language Support</h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 28, maxWidth: 600, lineHeight: 1.75 }}>
              All our resources are available in multiple Indian languages to ensure everyone can access mental health support in their preferred language.
            </p>
            <div className="lang-grid">
              {languages.map(lang => (
                <div key={lang.code} className="card" style={{ padding: "13px 8px", textAlign: "center", cursor: "pointer" }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{lang.flag}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--charcoal)" }}>{lang.name}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured This Week */}
        <motion.div {...fadeUp(0.5)} style={{ marginBottom: 44 }}>
          <h2 className="serif" style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 400, marginBottom: 22 }}>
            Featured <em style={{ color: "var(--sage)" }}>This Week</em>
          </h2>
          <div className="featured-grid">
            {[
              { title: "Stress-Free Exam Prep", type: "Video Series", duration: "45 min", language: "Hindi & English", icon: <Film size={19} /> },
              { title: "Guided Sleep Meditation", type: "Audio Session", duration: "20 min", language: "Tamil & English", icon: <Volume2 size={19} /> },
              { title: "Anxiety Management Guide", type: "PDF Workbook", pages: "24 pages", language: "Multiple", icon: <Book size={19} /> },
            ].map((res, i) => (
              <div key={i} className="card" style={{ padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {res.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)", marginBottom: 3 }}>{res.title}</h3>
                    <p style={{ fontSize: 12, color: "var(--muted)" }}>{res.type}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 6 }}>
                  <span style={{ fontSize: 13, color: "var(--body)" }}>{res.duration || res.pages}</span>
                  <span style={{ fontSize: 11, padding: "4px 11px", background: "var(--sage-light)", color: "var(--sage)", borderRadius: 100 }}>{res.language}</span>
                </div>
                <button className="btn-primary" style={{ width: "100%", padding: "11px", justifyContent: "center", fontSize: 13 }}>
                  Access Now
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div {...fadeUp(0.6)}>
          <div className="card quick-card" style={{ padding: 36, textAlign: "center" }}>
            <h2 className="serif" style={{ fontSize: "clamp(20px, 3vw, 24px)", fontWeight: 400, marginBottom: 10 }}>
              Need Personalized <em style={{ color: "var(--sage)" }}>Support?</em>
            </h2>
            <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "var(--body)", marginBottom: 28, maxWidth: 560, margin: "0 auto 28px", lineHeight: 1.8 }}>
              Our resources are helpful, but sometimes you need direct support from a professional.
            </p>
            <div className="quick-actions-btns">
              <Link to="/ai-chat" className="btn-primary" style={{ padding: "13px 26px", gap: 8 }}>
                <Brain size={15} /> Talk to AI Assistant
              </Link>
              <Link to="/book" className="btn-sage" style={{ padding: "13px 26px", gap: 8 }}>
                <Calendar size={15} /> Book Counseling Session
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer S={S} />
    </div>
  );
};

export default Resources;