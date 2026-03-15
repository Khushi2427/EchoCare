import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, Users, BookOpen, Calendar,
  ArrowRight, Menu, X, Shield,
  Heart, CheckCircle, Lock, TrendingUp,
  Bell, Send, LayoutDashboard, Star,
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

/* ── Global CSS ── */
(() => {
  if (document.getElementById("echocare-css")) return;
  const s = document.createElement("style");
  s.id = "echocare-css";
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --sage: #6B9E6B;
      --sage-hover: #598559;
      --sage-light: #EEF5EE;
      --sage-mid: #B8D4B8;
      --cream: #FAFAF7;
      --warm: #F6F0E8;
      --charcoal: #1A1A1A;
      --charcoal-2: #2C2C2C;
      --charcoal-3: #3E3E3E;
      --body: #4A4A4A;
      --muted: #7A7A7A;
      --light-muted: #A0A0A0;
      --border: rgba(0,0,0,0.08);
      --border-light: rgba(0,0,0,0.05);
      --shadow-sm: 0 2px 12px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.08);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.12);
      --r-sm: 14px;
      --r-md: 20px;
      --r-lg: 28px;
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    a { text-decoration: none; color: inherit; }
    .serif { font-family: 'Cormorant Garamond', serif; }

    /* ── Nav links ── */
    .nav-link {
      font-size: 14px; font-weight: 400; color: var(--body);
      padding: 4px 2px; position: relative; transition: color 0.22s ease;
      white-space: nowrap;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1.5px; background: var(--sage);
      transition: width 0.28s ease; border-radius: 2px;
    }
    .nav-link:hover { color: var(--charcoal); }
    .nav-link:hover::after { width: 100%; }

    /* ── Buttons ── */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--charcoal); color: #fff;
      padding: 13px 28px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; white-space: nowrap;
      transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 12px 26px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 14px;
      border: 1.5px solid var(--border); cursor: pointer; white-space: nowrap;
      transition: all 0.25s ease;
    }
    .btn-ghost:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; transform: translateY(-2px); }

    .btn-sage {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: #fff;
      padding: 13px 28px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; white-space: nowrap;
      transition: all 0.25s ease;
    }
    .btn-sage:hover { background: var(--sage-hover); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(107,158,107,0.35); }

    .btn-white {
      display: inline-flex; align-items: center; gap: 8px;
      background: #fff; color: var(--charcoal);
      padding: 13px 28px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; white-space: nowrap;
      transition: all 0.25s ease;
    }
    .btn-white:hover { background: var(--sage-light); transform: translateY(-2px); }

    /* ── Cards ── */
    .card {
      background: #fff; border: 1px solid var(--border-light);
      border-radius: var(--r-md); box-shadow: var(--shadow-sm);
      transition: transform 0.32s cubic-bezier(.25,.1,.25,1), box-shadow 0.32s;
    }
    .card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }

    /* ── Tag / Badge ── */
    .badge {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.09em;
      text-transform: uppercase; padding: 5px 13px;
      border-radius: 100px; font-family: 'Outfit', sans-serif;
    }

    /* ── Section label ── */
    .section-eyebrow {
      font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--sage);
      font-family: 'Outfit', sans-serif; display: block; margin-bottom: 14px;
    }

    /* ── Chat bubbles ── */
    .bubble { padding: 10px 15px; border-radius: 14px; font-size: 13px; line-height: 1.55; max-width: 86%; }
    .bubble-ai { background: var(--sage-light); color: var(--body); border-bottom-left-radius: 3px; }
    .bubble-user { background: var(--charcoal); color: #fff; border-bottom-right-radius: 3px; margin-left: auto; }

    /* ── Animations ── */
    @keyframes softPulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
    .pulse { animation: softPulse 2s ease-in-out infinite; }

    @keyframes gentleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .float-a { animation: gentleFloat 5s ease-in-out infinite; }
    .float-b { animation: gentleFloat 5s ease-in-out 1.6s infinite; }

    /* ── Blobs ── */
    .blob { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(72px); }

    /* ─────────────────────────────────────────
       RESPONSIVE BREAKPOINTS
    ───────────────────────────────────────── */

    /* Tablet & below: ≤900px */
    @media (max-width: 900px) {
      .mob-hide { display: none !important; }
      .mob-show { display: flex !important; }

      /* Hero: stack columns */
      .hero-grid { grid-template-columns: 1fr !important; }

      /* Feature band: wrap */
      .feature-band-inner { flex-wrap: wrap; gap: 10px !important; justify-content: flex-start !important; }

      /* Pillars bento: 2 col */
      .feat-grid {
        grid-template-columns: 1fr 1fr !important;
        grid-template-rows: auto !important;
      }
      .feat-grid > *:first-child {
        grid-column: span 2 !important;
        grid-row: span 1 !important;
      }

      /* How it works: 2 col */
      .steps-grid { grid-template-columns: 1fr 1fr !important; }

      /* Trust + testimonials: stack */
      .trust-grid { grid-template-columns: 1fr !important; gap: 48px !important; }

      /* Admin / colleges: stack */
      .admin-grid { grid-template-columns: 1fr !important; gap: 40px !important; }

      /* Footer: 2 col */
      .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
      .footer-brand { grid-column: span 2 !important; }

      /* CTA box padding */
      .cta-box { padding: 56px 36px !important; }

      /* Section padding */
      .section-pad { padding: 72px 24px !important; }
      .section-pad-sm { padding: 56px 24px !important; }
    }

    /* Mobile: ≤600px */
    @media (max-width: 600px) {
      /* Navbar */
      .navbar-inner { padding: 0 20px !important; }

      /* Hero */
      .hero-section { padding: 72px 20px 80px !important; min-height: auto !important; }
      .hero-stats { gap: 24px !important; flex-wrap: wrap; }
      .hero-cta-row { flex-direction: column !important; }
      .hero-cta-row a, .hero-cta-row button { width: 100% !important; justify-content: center !important; }

      /* Feature band */
      .feature-band { padding: 14px 20px !important; }
      .feature-band-inner { gap: 8px !important; }
      .feature-band-item { font-size: 12px !important; }

      /* Pillars: single col */
      .feat-grid {
        grid-template-columns: 1fr !important;
        grid-template-rows: auto !important;
      }
      .feat-grid > *:first-child {
        grid-column: span 1 !important;
      }

      /* How it works: single col */
      .steps-grid { grid-template-columns: 1fr !important; }

      /* Footer: single col */
      .footer-grid { grid-template-columns: 1fr !important; }
      .footer-brand { grid-column: span 1 !important; }
      .footer-bottom { flex-direction: column !important; gap: 8px !important; align-items: flex-start !important; }

      /* CTA */
      .cta-box { padding: 44px 24px !important; border-radius: 20px !important; }
      .cta-buttons { flex-direction: column !important; }
      .cta-buttons a, .cta-buttons button { width: 100% !important; justify-content: center !important; }

      /* Admin dashboard preview: reduce padding */
      .admin-preview { padding: 18px !important; }
      .admin-stat-grid { grid-template-columns: 1fr 1fr !important; }
      .admin-bottom-tiles { flex-direction: column !important; }

      /* Testimonials: reduce horizontal movement */
      .section-pad { padding: 60px 20px !important; }
      .section-pad-sm { padding: 48px 20px !important; }
    }

    /* Very small: ≤380px */
    @media (max-width: 380px) {
      .hero-stats > div { min-width: 80px; }
      .feat-grid > *:first-child { padding: 24px !important; }
      .admin-stat-grid { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(s);
})();

/* ── Animation helpers ── */
const up = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const zoomIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
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

/* ════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const S = {
    maxW: { maxWidth: 1160, margin: "0 auto", width: "100%" },
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ════ NAVBAR ════ */}
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          position: "sticky", top: 0, zIndex: 300,
          height: 66,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: scrolled ? "rgba(250,250,247,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.38s ease",
          padding: "0 40px",
        }}
        className="navbar-inner"
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Heart size={16} color="white" />
          </div>
          <span className="serif" style={{ fontWeight: 500, fontSize: 21, color: "var(--charcoal)", letterSpacing: "0.01em" }}>
            EchoCare
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="mob-hide" style={{ display: "flex", gap: 30, alignItems: "center" }}>
          {NAV_ITEMS.map(n => <Link key={n.label} to={n.path} className="nav-link">{n.label}</Link>)}
        </nav>

        {/* Desktop CTA */}
        <div className="mob-hide" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link to="/login" className="btn-ghost" style={{ padding: "10px 22px" }}>Sign in</Link>
          <Link to="/register" className="btn-primary" style={{ padding: "10px 22px" }}>Get Started</Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="mob-show"
          style={{ background: "none", border: "none", cursor: "pointer", display: "none", padding: 6, color: "var(--charcoal)" }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
              position: "sticky", top: 66, zIndex: 299,
            }}
          >
            <div style={{ padding: "20px 0", display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_ITEMS.map(n => (
                <Link key={n.label} to={n.path} onClick={() => setMobileOpen(false)}
                  style={{ padding: "12px 10px", color: "var(--body)", fontSize: 15, borderRadius: 8, display: "block" }}>
                  {n.label}
                </Link>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <Link to="/login" className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Sign in</Link>
                <Link to="/register" className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Get Started</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════ HERO ════ */}
      <section
        className="hero-section section-pad"
        style={{
          position: "relative",
          padding: "90px 40px 110px",
          overflow: "hidden",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="blob" style={{ width: 560, height: 560, background: "rgba(107,158,107,0.10)", top: -120, right: -100 }} />
        <div className="blob" style={{ width: 360, height: 360, background: "rgba(246,240,232,0.9)", bottom: -60, left: -80 }} />

        <div style={{ ...S.maxW, position: "relative", zIndex: 1 }}>
          <div
            className="hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <motion.div {...up(0)} style={{ marginBottom: 32 }}>
                <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>
                  <span style={{ width: 6, height: 6, background: "var(--sage)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
                  Mental Wellness Platform for Colleges
                </span>
              </motion.div>

              <motion.h1 {...up(0.07)} className="serif"
                style={{ fontSize: "clamp(42px, 6.5vw, 88px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 26 }}>
                A calmer mind<br />
                <em style={{ fontStyle: "italic", color: "var(--sage)" }}>begins here.</em>
              </motion.h1>

              <motion.p {...up(0.13)}
                style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: "var(--body)", lineHeight: 1.82, maxWidth: 500, marginBottom: 44, fontWeight: 300 }}>
                AI-powered support, peer community, curated resources, and certified counsellors — all in one quiet, confidential space built for students.
              </motion.p>

              <motion.div {...up(0.18)}
                className="hero-cta-row"
                style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 64 }}
              >
                <Link to="/ai-chat" className="btn-primary">Begin your journey <ArrowRight size={16} /></Link>
                <Link to="/book" className="btn-ghost"><Calendar size={15} /> Book a counsellor</Link>
              </motion.div>

              {/* Stats */}
              <motion.div {...up(0.23)}
                className="hero-stats"
                style={{ display: "flex", gap: 44, flexWrap: "wrap" }}
              >
                {[
                  { n: "500+", l: "Students supported" },
                  { n: "98%", l: "Satisfaction rate" },
                  { n: "24/7", l: "Always available" },
                  { n: "5+", l: "Partner colleges" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="serif" style={{ fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 400, color: "var(--charcoal)", lineHeight: 1, marginBottom: 5 }}>{s.n}</div>
                    <div style={{ fontSize: 13, color: "var(--charcoal)", fontWeight: 300 }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Floating chat widget — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.35 }}
              className="float-a mob-hide"
              style={{
                width: 292,
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 24,
                boxShadow: "0 20px 56px rgba(0,0,0,0.1)",
                padding: 22,
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14, marginBottom: 16, borderBottom: "1px solid var(--border)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Brain size={17} color="white" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: "var(--charcoal)" }}>EchoCare AI</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                    <span className="pulse" style={{ width: 6, height: 6, background: "#4CAF50", borderRadius: "50%", display: "inline-block" }} />
                    Active now
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 16 }}>
                {[
                  { t: "ai", m: "How are you feeling today? I'm here to listen 🌿" },
                  { t: "user", m: "Really anxious about exams." },
                  { t: "ai", m: "That's common. Let's try a quick grounding exercise together." },
                ].map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.4 }}
                    style={{ display: "flex", justifyContent: c.t === "user" ? "flex-end" : "flex-start" }}>
                    <div className={`bubble bubble-${c.t}`}>{c.m}</div>
                  </motion.div>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--sage-light)", borderRadius: 12, padding: "10px 14px" }}>
                <span style={{ flex: 1, fontSize: 12.5, color: "var(--muted)" }}>Type your thoughts…</span>
                <Send size={14} color="var(--sage)" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ FEATURE BAND ════ */}
      <div
        className="feature-band"
        style={{ background: "var(--charcoal)", padding: "18px 40px" }}
      >
        <div style={{ ...S.maxW }}>
          <div
            className="feature-band-inner"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}
          >
            {["AI Chat Support", "Peer Community", "Wellness Resources", "Counsellor Booking", "Admin Health Tracking"].map(t => (
              <div
                key={t}
                className="feature-band-item"
                style={{ display: "flex", alignItems: "center", gap: 9, color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 400 }}
              >
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--sage)", flexShrink: 0 }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════ 5 PILLARS ════ */}
      <section className="section-pad" style={{ padding: "96px 40px" }}>
        <div style={S.maxW}>
          <motion.div {...up(0)} style={{ marginBottom: 56, textAlign: "center" }}>
            <span className="section-eyebrow">Five Pillars</span>
            <h2 className="serif" style={{ fontSize: "clamp(28px, 4.5vw, 54px)", fontWeight: 300, letterSpacing: "-0.022em", lineHeight: 1.18, maxWidth: 700, margin: "0 auto" }}>
              Everything a student needs,{" "}
              <em style={{ color: "var(--sage)" }}>beautifully unified.</em>
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div
            className="feat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "auto auto",
              gap: 20,
            }}
          >
            {/* ── 1. AI CHAT ── */}
            <motion.div {...zoomIn(0.05)}
              style={{
                gridColumn: "span 2",
                gridRow: "span 2",
                borderRadius: 24,
                padding: "36px",
                background: "var(--charcoal)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
              }}
              whileHover={{ y: -6, boxShadow: "0 28px 72px rgba(0,0,0,0.28)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Brain size={24} color="white" />
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>24 / 7</span>
              </div>

              <h3 className="serif" style={{ fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 400, color: "#fff", marginBottom: 12, lineHeight: 1.2 }}>
                AI Mental Health Chat
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 24, maxWidth: "90%" }}>
                An empathetic AI companion powered by sentiment analysis. It listens, detects stress patterns, and guides you through evidence-based coping techniques — day or night.
              </p>

              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: 16, marginBottom: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { t: "ai", m: "I notice you might be under pressure. Want to talk?" },
                    { t: "user", m: "Yes, I'm overwhelmed with deadlines." },
                    { t: "ai", m: "Let's try the 4-7-8 breathing technique. Just 2 minutes 🌿" },
                  ].map((c, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: c.t === "user" ? "flex-end" : "flex-start" }}>
                      <div style={{
                        padding: "8px 12px", borderRadius: 10, fontSize: 12, lineHeight: 1.4, maxWidth: "90%",
                        background: c.t === "ai" ? "rgba(255,255,255,0.11)" : "var(--sage)",
                        color: "#fff",
                        borderBottomLeftRadius: c.t === "ai" ? 3 : 10,
                        borderBottomRightRadius: c.t === "user" ? 3 : 10,
                      }}>
                        {c.m}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                {["Sentiment Analysis", "CBT Techniques", "Crisis Detection"].map(t => (
                  <span key={t} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 100, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                ))}
              </div>

              <Link to="/ai-chat" className="btn-sage" style={{ alignSelf: "flex-start", padding: "10px 22px", fontSize: 13 }}>
                Start chatting <ArrowRight size={14} />
              </Link>
            </motion.div>

            {/* ── 2. COMMUNITY ── */}
            <motion.div {...zoomIn(0.1)}
              style={{
                gridColumn: "span 1",
                borderRadius: 22, padding: "28px",
                background: "var(--warm)",
                border: "1px solid rgba(0,0,0,0.04)",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 0.32s, box-shadow 0.32s",
                display: "flex", flexDirection: "column",
              }}
              whileHover={{ y: -5, boxShadow: "var(--shadow-lg)" }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <Users size={20} color="var(--charcoal)" />
              </div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: "var(--charcoal)", marginBottom: 8 }}>Community</h3>
              <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                Moderated peer groups where students share, support, and grow — completely stigma-free.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ display: "flex" }}>
                  {["#B8D4B8", "#9FC49F", "#8FAF8F"].map((c, i) => (
                    <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", background: c, border: "2px solid var(--warm)", marginLeft: i === 0 ? 0 : -8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 9, color: "#fff", fontWeight: 600 }}>{["P","A","K"][i]}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: "var(--body)" }}>+2.4k members</span>
              </div>
              <Link to="/community" style={{ fontSize: 13, color: "var(--sage)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, marginTop: "auto" }}>
                Join community <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* ── 3. RESOURCES ── */}
            <motion.div {...zoomIn(0.15)}
              style={{
                gridColumn: "span 1",
                borderRadius: 22, padding: "28px",
                background: "var(--sage-light)",
                border: "1px solid rgba(107,158,107,0.12)",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 0.32s, box-shadow 0.32s",
                display: "flex", flexDirection: "column",
              }}
              whileHover={{ y: -5, boxShadow: "var(--shadow-lg)" }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <BookOpen size={20} color="var(--charcoal)" />
              </div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: "var(--charcoal)", marginBottom: 8 }}>Resources</h3>
              <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                Guided meditations, exercises, and guides in 10+ languages.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                {[
                  { label: "Videos", n: "50+" },
                  { label: "Audios", n: "100+" },
                  { label: "Guides", n: "30+" },
                  { label: "Languages", n: "10+" },
                ].map(s => (
                  <div key={s.label} style={{ background: "#fff", borderRadius: 8, padding: "10px" }}>
                    <div className="serif" style={{ fontSize: 18, fontWeight: 400, color: "var(--charcoal)", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/resources" style={{ fontSize: 13, color: "var(--sage)", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, marginTop: "auto" }}>
                Explore library <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* ── 4. COUNSELLOR BOOKING ── */}
            <motion.div {...zoomIn(0.2)}
              style={{
                gridColumn: "span 1",
                borderRadius: 22, padding: "28px",
                background: "#fff",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 0.32s, box-shadow 0.32s",
                display: "flex", flexDirection: "column",
              }}
              whileHover={{ y: -5, boxShadow: "var(--shadow-lg)" }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <Calendar size={20} color="var(--sage)" />
              </div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: "var(--charcoal)", marginBottom: 8 }}>Counsellor</h3>
              <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.6, marginBottom: 16 }}>
                Private, confidential sessions with certified professionals.
              </p>
              <div style={{ background: "var(--sage-light)", borderRadius: 10, padding: "12px", marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: "var(--sage)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase" }}>Available today</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {["9:00", "11:30", "2:00", "4:30"].map((t, i) => (
                    <span key={t} style={{
                      fontSize: 11, padding: "4px 8px", borderRadius: 6, fontWeight: 500,
                      background: i === 1 ? "var(--charcoal)" : "#fff",
                      color: i === 1 ? "#fff" : "var(--body)",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 16 }}>
                <Shield size={12} color="var(--sage)" />
                <span style={{ fontSize: 11, color: "var(--muted)" }}>100% confidential</span>
              </div>
              <Link to="/book" className="btn-primary" style={{ padding: "8px 16px", fontSize: 12, justifyContent: "center" }}>
                Book now <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* ── 5. ADMIN DASHBOARD ── */}
            <motion.div {...zoomIn(0.25)}
              style={{
                gridColumn: "span 1",
                borderRadius: 22, padding: "28px",
                background: "var(--charcoal-2)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
                transition: "transform 0.32s, box-shadow 0.32s",
                display: "flex", flexDirection: "column",
              }}
              whileHover={{ y: -5, boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <LayoutDashboard size={20} color="white" />
              </div>
              <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 8 }}>Admin</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 16 }}>
                Real-time anonymised analytics to identify at-risk students early.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[
                  { label: "Avg. Mood", val: "7.2" },
                  { label: "Sessions", val: "142" },
                ].map(s => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "10px" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: 1, marginBottom: 2 }}>{s.val}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["Early Alerts", "Trends"].map(t => (
                  <span key={t} style={{ fontSize: 10, padding: "4px 8px", borderRadius: 100, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════ */}
      <section className="section-pad-sm" style={{ padding: "72px 40px", background: "var(--warm)" }}>
        <div style={S.maxW}>
          <motion.div {...up(0)} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 52 }}>
            <div>
              <span className="section-eyebrow">Process</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.22 }}>
                Simple by design,{" "}
                <em style={{ color: "var(--sage)" }}>powerful in practice.</em>
              </h2>
            </div>
            <Link to="/register" className="btn-primary">Start free <ArrowRight size={15} /></Link>
          </motion.div>

          <div
            className="steps-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
          >
            {[
              { n: "01", icon: <CheckCircle size={19} />, title: "Create account", body: "Private sign-up in under 2 minutes. No college ID needed." },
              { n: "02", icon: <Brain size={19} />, title: "Talk to AI", body: "Chat anytime. The AI adapts to your emotional state in real time." },
              { n: "03", icon: <Calendar size={19} />, title: "Book a counsellor", body: "Connect with a licensed professional for a private, confidential session." },
              { n: "04", icon: <TrendingUp size={19} />, title: "Track your journey", body: "Log your mood daily and see how far you've come over time." },
            ].map((s, i) => (
              <motion.div key={s.n} {...up(i * 0.1)} className="card" style={{ padding: "28px 26px" }}>
                <div style={{ fontSize: 11, color: "var(--light-muted)", fontWeight: 600, marginBottom: 22, letterSpacing: "0.09em", fontFamily: "'Outfit', sans-serif" }}>{s.n}</div>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "var(--sage)" }}>
                  {s.icon}
                </div>
                <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 10, color: "var(--charcoal)" }}>{s.title}</h4>
                <p style={{ fontSize: 13.5, color: "var(--body)", lineHeight: 1.72, fontWeight: 300 }}>{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TRUST + TESTIMONIALS ════ */}
      <section className="section-pad" style={{ padding: "96px 40px" }}>
        <div style={S.maxW}>
          <div
            className="trust-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}
          >
            {/* Trust column */}
            <motion.div {...slideRight(0)}>
              <span className="section-eyebrow">Built on trust</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.22, marginBottom: 24 }}>
                Your privacy is{" "}
                <em style={{ color: "var(--sage)" }}>non-negotiable.</em>
              </h2>
              <p style={{ fontSize: "clamp(14px, 1.5vw, 15.5px)", color: "var(--body)", lineHeight: 1.85, fontWeight: 300, marginBottom: 36, maxWidth: 440 }}>
                Everything you share stays between you and the platform. We use end-to-end encryption, anonymised data policies, and zero third-party advertising.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: <Lock size={16} />, t: "End-to-end encrypted conversations" },
                  { icon: <Shield size={16} />, t: "Anonymous community mode available" },
                  { icon: <CheckCircle size={16} />, t: "No data sold to third parties — ever" },
                  { icon: <Heart size={16} />, t: "HIPAA-compliant session records" },
                ].map(item => (
                  <div key={item.t} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sage)", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: 14.5, color: "var(--body)", fontWeight: 400, lineHeight: 1.5 }}>{item.t}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials column */}
            <motion.div {...slideLeft(0.1)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { text: "EchoCare helped me through my worst semester. The AI was there at 3 AM when no one else was.", name: "Priya S.", role: "Engineering, Delhi", dark: false },
                { text: "I was hesitant, but the counsellor I matched with completely changed how I handle stress.", name: "Arjun M.", role: "MBA, Mumbai", dark: true },
                { text: "The community made me realise I wasn't alone. It's the safest online space I've ever been in.", name: "Kavya R.", role: "Law, Bangalore", dark: false },
              ].map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.55 }}
                  whileHover={{ x: 5, transition: { duration: 0.22 } }}
                  style={{
                    background: t.dark ? "var(--charcoal)" : "#fff",
                    border: `1px solid ${t.dark ? "transparent" : "var(--border-light)"}`,
                    borderRadius: 18, padding: "24px 26px",
                    boxShadow: t.dark ? "0 12px 40px rgba(0,0,0,0.18)" : "var(--shadow-sm)",
                  }}
                >
                  <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                    {Array(5).fill(0).map((_, j) => (
                      <Star key={j} size={13} fill={t.dark ? "var(--sage)" : "#F59E0B"} color={t.dark ? "var(--sage)" : "#F59E0B"} />
                    ))}
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.78, marginBottom: 18, color: t.dark ? "rgba(255,255,255,0.8)" : "var(--body)", fontWeight: 300 }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.dark ? "rgba(255,255,255,0.12)" : "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: t.dark ? "#fff" : "var(--sage)" }}>{t.name[0]}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: t.dark ? "#fff" : "var(--charcoal)" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: t.dark ? "rgba(255,255,255,0.5)" : "var(--muted)", marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ ADMIN / FOR COLLEGES ════ */}
      <section className="section-pad" style={{ padding: "96px 40px", background: "var(--charcoal)" }}>
        <div style={S.maxW}>
          <div
            className="admin-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          >
            {/* Left copy */}
            <motion.div {...slideRight(0)}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage)", fontFamily: "'Outfit', sans-serif", display: "block", marginBottom: 14 }}>For Institutions</span>
              <h2 className="serif" style={{ fontSize: "clamp(26px, 4vw, 50px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.2, color: "#fff", marginBottom: 22 }}>
                Give your college<br />
                <em style={{ color: "var(--sage)" }}>a pulse check.</em>
              </h2>
              <p style={{ fontSize: "clamp(14px, 1.5vw, 15.5px)", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, fontWeight: 300, marginBottom: 32, maxWidth: 430 }}>
                The admin dashboard gives counselling teams and welfare officers anonymised, real-time insights into campus mental health — enabling proactive, not reactive, care.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 36 }}>
                {[
                  "Anonymised wellbeing trend reports",
                  "Early-alert system for at-risk students",
                  "Session booking & counsellor load balancing",
                  "Department-level mood analytics",
                  "Custom resource deployment by campus",
                ].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <CheckCircle size={15} color="var(--sage)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/colleges" className="btn-sage">Request a demo <ArrowRight size={15} /></Link>
            </motion.div>

            {/* Dashboard preview */}
            <motion.div {...slideLeft(0.1)}>
              <div
                className="admin-preview"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: 28 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>Wellness Overview</div>
                    <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>March 2025 · Anonymised</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["1W", "1M", "3M"].map((l, i) => (
                      <span key={l} style={{
                        fontSize: 12, padding: "5px 12px", borderRadius: 7, cursor: "pointer", fontWeight: 500,
                        background: i === 1 ? "var(--sage)" : "rgba(255,255,255,0.07)",
                        color: i === 1 ? "#fff" : "rgba(255,255,255,0.5)",
                      }}>{l}</span>
                    ))}
                  </div>
                </div>

                <div
                  className="admin-stat-grid"
                  style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}
                >
                  {[
                    { label: "Avg. Mood Score", val: "7.4", sub: "↑ 0.3 this week", up: true },
                    { label: "Active Users", val: "428", sub: "↑ 12% vs last month", up: true },
                    { label: "Alerts", val: "3", sub: "↓ 2 resolved today", up: false },
                  ].map(s => (
                    <div key={s.label} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 13px" }}>
                      <div className="serif" style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 400, color: "#fff", lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 5, marginBottom: 6, lineHeight: 1.4 }}>{s.label}</div>
                      <div style={{ fontSize: 11.5, color: s.up ? "var(--sage)" : "#FBBF24", fontWeight: 500 }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Weekly Mood Trend</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 7, height: 60 }}>
                    {[55, 62, 58, 74, 70, 80, 76].map((h, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                        <div style={{ width: "100%", height: `${h}%`, borderRadius: "5px 5px 0 0", background: i === 5 ? "var(--sage)" : "rgba(255,255,255,0.15)" }} />
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 400 }}>{["M","T","W","T","F","S","S"][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="admin-bottom-tiles"
                  style={{ display: "flex", gap: 10 }}
                >
                  {[
                    { icon: <Bell size={14} />, label: "3 new alerts", sub: "Require review" },
                    { icon: <Calendar size={14} />, label: "18 sessions", sub: "Booked this week" },
                  ].map(item => (
                    <div key={item.label} style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 11, padding: "13px 14px" }}>
                      <div style={{ color: "var(--sage)", marginBottom: 8 }}>{item.icon}</div>
                      <div style={{ fontSize: 13.5, color: "#fff", fontWeight: 600, marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="section-pad" style={{ padding: "96px 40px" }}>
        <div style={S.maxW}>
          <motion.div {...zoomIn(0)}>
            <div
              className="cta-box"
              style={{ background: "var(--sage-light)", borderRadius: 28, padding: "80px 64px", textAlign: "center", border: "1px solid rgba(107,158,107,0.15)", position: "relative", overflow: "hidden" }}
            >
              <div className="blob" style={{ width: 400, height: 400, background: "rgba(107,158,107,0.12)", top: -100, left: "50%", transform: "translateX(-50%)" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                  animate={{ scale: [1, 1.07, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ width: 60, height: 60, background: "#fff", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: "0 8px 28px rgba(0,0,0,0.09)" }}
                >
                  <Heart size={26} color="var(--sage)" />
                </motion.div>
                <h2 className="serif" style={{ fontSize: "clamp(30px, 5vw, 60px)", fontWeight: 300, letterSpacing: "-0.025em", marginBottom: 18, color: "var(--charcoal)", lineHeight: 1.12 }}>
                  You are never alone.<br />
                  <em style={{ color: "var(--sage)" }}>We're always here.</em>
                </h2>
                <p style={{ fontSize: "clamp(14px, 1.5vw, 16.5px)", color: "var(--body)", maxWidth: 480, margin: "0 auto 44px", lineHeight: 1.82, fontWeight: 300 }}>
                  Join thousands of students across India who've found support, clarity, and community through EchoCare.
                </p>
                <div
                  className="cta-buttons"
                  style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
                >
                  <Link to="/register" className="btn-primary">Begin for free <ArrowRight size={16} /></Link>
                  <Link to="/colleges" className="btn-ghost">For colleges</Link>
                </div>
                <p style={{ marginTop: 32, fontSize: 13, color: "var(--muted)" }}>
                  Crisis support:{" "}
                  <a href="mailto:echocare25@gmail.com" style={{ color: "var(--charcoal)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                    echocare25@gmail.com
                  </a>{" "}
                  · 24 / 7
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background: "var(--charcoal)", padding: "60px 40px 32px" }}>
        <div style={S.maxW}>
          <div
            className="footer-grid"
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40, marginBottom: 52, paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Brand */}
            <div className="footer-brand">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Heart size={15} color="white" />
                </div>
                <span className="serif" style={{ fontWeight: 500, fontSize: 19, color: "#fff" }}>EchoCare</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 220, fontWeight: 300 }}>
                Empowering student mental wellness through compassionate AI and human connection.
              </p>
            </div>

            {[
              { h: "Platform", items: [["AI Chat", "/ai-chat"], ["Community", "/community"], ["Resources", "/resources"], ["Book Session", "/book"]] },
              { h: "Company", items: [["About", "/about"], ["Careers", "/careers"], ["Contact", "/contact"]] },
              { h: "Institutions", items: [["For Colleges", "/colleges"], ["Admin Panel", "/admin"], ["Request Demo", "/demo"]] },
              { h: "Legal", items: [["Privacy", "/privacy"], ["Terms", "/terms"], ["Security", "/security"]] },
            ].map(col => (
              <div key={col.h}>
                <h4 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.11em", color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>
                  {col.h}
                </h4>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                  {col.items.map(([label, path]) => (
                    <li key={label}>
                      <Link to={path}
                        style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontWeight: 300, transition: "color 0.22s" }}
                        onMouseEnter={e => e.target.style.color = "#fff"}
                        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}
                      >{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="footer-bottom"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}
          >
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>
              © 2025 EchoCare · Made with care for students
            </p>
            <p className="serif" style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
              A calmer mind begins here.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
