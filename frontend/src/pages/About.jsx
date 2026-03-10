import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Users, Target, Award, Shield, Clock, BookOpen, Brain,
  MessageSquare, Calendar, Star, CheckCircle, ArrowRight, LogIn,
  UserPlus, Linkedin, Twitter, Instagram, Mail, Phone, MapPin,
  Users2, GraduationCap, Briefcase, Activity, Eye, AlertCircle,
  Menu, X, ChevronRight
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
  if (document.getElementById("echocare-about-css")) return;
  const s = document.createElement("style");
  s.id = "echocare-about-css";
  s.textContent = `
    /* ── Grids ── */
    .about-2col      { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .about-4col      { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .about-3col      { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .why-grid        { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .contact-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }

    /* ── Timeline: centered alternating on desktop ── */
    .timeline-wrap   { position: relative; padding: 20px 0; }
    .timeline-line   { position: absolute; left: 50%; transform: translateX(-50%); width: 2px; height: 100%; background: var(--sage-light); }
    .timeline-item   { display: flex; align-items: center; margin-bottom: 32px; }
    .timeline-item:nth-child(odd)  { justify-content: flex-start; }
    .timeline-item:nth-child(even) { justify-content: flex-end; }
    .timeline-card   { width: 45%; }
    .timeline-dot    { position: absolute; left: 50%; transform: translateX(-50%); width: 38px; height: 38px; border-radius: 50%; background: var(--sage); display: flex; align-items: center; justify-content: center; border: 4px solid var(--cream); z-index: 1; }

    /* ── Auth CTA row ── */
    .auth-cta-row    { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .social-row      { display: flex; gap: 12px; flex-wrap: wrap; }

    /* ── Tablet: ≤900px ── */
    @media (max-width: 900px) {
      .mob-hide    { display: none !important; }
      .mob-show    { display: flex !important; }

      .about-4col  { grid-template-columns: 1fr 1fr; gap: 16px; }
      .about-3col  { grid-template-columns: 1fr 1fr; gap: 16px; }
      .why-grid    { grid-template-columns: 1fr; gap: 24px; }
      .contact-grid { grid-template-columns: 1fr; gap: 24px; }

      .main-pad    { padding: 28px 24px 48px !important; }
      .navbar-pad  { padding: 0 24px !important; }
      .footer-pad  { padding: 28px 24px 20px !important; }
      .why-section { padding: 28px 24px !important; border-radius: 24px !important; }
      .contact-section { padding: 28px 24px !important; border-radius: 24px !important; }
    }

    /* ── Mobile: ≤600px ── */
    @media (max-width: 600px) {
      .main-pad    { padding: 20px 16px 40px !important; }
      .navbar-pad  { padding: 0 16px !important; }
      .footer-pad  { padding: 22px 16px 16px !important; }

      .about-2col  { grid-template-columns: 1fr; gap: 16px; }
      .about-4col  { grid-template-columns: 1fr 1fr; gap: 12px; }
      .about-3col  { grid-template-columns: 1fr; gap: 14px; }
      .why-grid    { grid-template-columns: 1fr; gap: 20px; }
      .contact-grid { grid-template-columns: 1fr; gap: 20px; }

      /* Timeline: switch to left-aligned vertical */
      .timeline-line { left: 20px; }
      .timeline-item { justify-content: flex-end !important; }
      .timeline-card { width: calc(100% - 52px); }
      .timeline-dot  { left: 20px; }

      .auth-cta-row { flex-direction: column; }
      .auth-cta-row a { width: 100% !important; justify-content: center !important; }

      .social-row  { gap: 8px; }
      .social-row button { padding: 9px 14px !important; font-size: 13px !important; }

      .page-h1     { font-size: clamp(26px, 7vw, 40px) !important; }
      .section-h2  { font-size: clamp(20px, 4vw, 28px) !important; margin-bottom: 20px !important; }
      .why-section { padding: 22px 18px !important; border-radius: 20px !important; }
      .contact-section { padding: 22px 18px !important; border-radius: 20px !important; }
      .cta-card    { padding: 28px 20px !important; }
      .mission-card { padding: 24px 20px !important; }
    }

    /* ── Very small: ≤380px ── */
    @media (max-width: 380px) {
      .about-4col  { grid-template-columns: 1fr; }
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
  <footer className="footer-pad" style={{ background: "var(--charcoal)", padding: "36px 40px 22px", marginTop: 40 }}>
    <div style={S.maxW}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          Made with <Heart size={13} color="var(--sage)" fill="var(--sage)" /> by Khushi
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
          EchoCare is committed to making mental health support accessible to every student in India.
        </p>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>
          © 2025 EchoCare Mental Wellness System. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: "var(--sage)", marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Mail size={13} /> khushigupta16057@gmail.com
        </p>
      </div>
    </div>
  </footer>
);

/* ── Shared section heading ── */
const SectionH2 = ({ children, style = {} }) => (
  <h2 className="serif section-h2" style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 400, marginBottom: 28, textAlign: "center", ...style }}>
    {children}
  </h2>
);

const About = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setIsLoggedIn(!!localStorage.getItem("authToken")); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleLogout = () => { localStorage.removeItem("authToken"); setIsLoggedIn(false); navigate("/"); };

  const stats = [
    { number: "Many", label: "Students Helped", icon: <Users size={19} /> },
    { number: "We have", label: "Partner Colleges", icon: <GraduationCap size={19} /> },
    { number: "All", label: "Certified Counselors", icon: <Briefcase size={19} /> },
    { number: "24/7", label: "Available Support", icon: <Clock size={19} /> },
  ];

  const values = [
    { icon: <Heart size={22} />, title: "Empathy First", description: "We approach mental health with compassion, understanding, and genuine care for every student's journey.", bgColor: "#EEF5EE" },
    { icon: <Shield size={22} />, title: "Privacy & Safety", description: "Your privacy is our priority. All interactions are confidential and secure with end-to-end encryption.", bgColor: "#F6F0E8" },
    { icon: <Users size={22} />, title: "Community Support", description: "We believe in the power of peer support and building strong, stigma-free communities.", bgColor: "#EEF5EE" },
    { icon: <Target size={22} />, title: "Evidence-Based", description: "All our methods and resources are grounded in scientific research and best practices.", bgColor: "#F6F0E8" },
  ];

  const team = [
    { name: "Dr. Ananya Sharma", role: "Clinical Director", expertise: "Clinical Psychology, CBT", experience: "12 years" },
    { name: "Khushi Gupta", role: "Head of Technology", expertise: "AI & Machine Learning", experience: "3 years" },
    { name: "Khushi Gupta", role: "Community Manager", expertise: "Peer Support Systems", experience: "3 years" },
    { name: "Khushi Gupta", role: "Research Lead", expertise: "Digital Mental Health", experience: "3 years" },
  ];

  const features = [
    { icon: <Brain size={19} />, title: "AI Mental Health Chat", description: "24/7 AI companion trained to provide immediate, empathetic support." },
    { icon: <Calendar size={19} />, title: "Professional Counseling", description: "Connect with certified counselors for private, scheduled sessions." },
    { icon: <Users2 size={19} />, title: "Peer Communities", description: "Safe spaces for students to connect, share, and support each other." },
    { icon: <BookOpen size={19} />, title: "Wellness Resources", description: "Multi-language educational content and self-help tools." },
  ];

  const testimonials = [
    { text: "EchoCare helped me through my toughest semester. The AI chat was always there when I needed to talk.", author: "Computer Science Student", college: "IIT Delhi" },
    { text: "Being able to connect with a counselor from my dorm room made all the difference in managing my anxiety.", author: "Medical Student", college: "AIIMS" },
    { text: "The study group community helped me find friends who understood the pressure of engineering exams.", author: "Engineering Student", college: "NIT Trichy" },
  ];

  const timeline = [
    { year: "2025", event: "Founded with vision to bridge mental health gap in Indian colleges" },
    { year: "2025", event: "Launched AI chatbot and partnered to help students" },
    { year: "2025", event: "Expanded our services, introduced multi-language support" },
    { year: "2025", event: "Reached counselors, launched community features" },
    { year: "2025", event: "Current: Want to serve colleges across India" },
  ];

  const S = { maxW: { maxWidth: 1280, margin: "0 auto", width: "100%" } };

  /* ── Shared Stats Grid ── */
  const StatsGrid = () => (
    <div className="about-4col" style={{ marginBottom: 44 }}>
      {stats.map((stat, i) => (
        <motion.div key={i} {...fadeUp(i * 0.07)} className="card" style={{ padding: "18px 16px", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ color: "var(--sage)" }}>{stat.icon}</span>
            <span className="serif" style={{ fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 400, color: "var(--charcoal)" }}>{stat.number}</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );

  /* ── Shared Mission/Vision cards (logged-out variant) ── */
  const MissionVisionBasic = () => (
    <div className="about-2col" style={{ marginBottom: 52 }}>
      {[
        { icon: <Target size={22} />, title: "Our Mission", body: "To make mental health support accessible, affordable, and stigma-free for every student in India through innovative technology and compassionate care.", items: ["Provide 24/7 accessible mental health support", "Break down stigma around mental health in colleges", "Create safe spaces for students to share and heal", "Bridge the gap between students and professional help"] },
        { icon: <Eye size={22} />, title: "Our Vision", body: "To create a future where no student suffers in silence, and mental wellness is an integral part of every educational institution in India.", items: ["Mental health support in every college by 2030", "AI-assisted early intervention systems", "Comprehensive wellness ecosystems", "Nationwide peer support networks"] },
      ].map((card, i) => (
        <div key={i} className="card mission-card" style={{ padding: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>{card.icon}</div>
            <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>{card.title}</h2>
          </div>
          <p style={{ fontSize: 13.5, color: "var(--body)", marginBottom: 20, lineHeight: 1.8 }}>{card.body}</p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 11, listStyle: "none" }}>
            {card.items.map((item, idx) => (
              <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <CheckCircle size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13, color: "var(--body)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  /* ── Shared Timeline ── */
  const Timeline = () => (
    <motion.div {...fadeUp(0.5)} style={{ marginBottom: 44 }}>
      <SectionH2>Our Journey</SectionH2>
      <div className="timeline-wrap">
        <div className="timeline-line" />
        {timeline.map((item, i) => (
          <motion.div key={i} className="timeline-item"
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="timeline-card">
              <div className="card" style={{ padding: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sage)", marginBottom: 7, letterSpacing: "0.04em" }}>{item.year}</div>
                <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.6 }}>{item.event}</p>
              </div>
            </div>
            <div className="timeline-dot">
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff" }} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  /* ── Shared Team Grid ── */
  const TeamGrid = () => (
    <motion.div {...fadeUp(0.6)} style={{ marginBottom: 44 }}>
      <SectionH2>Meet Our Team</SectionH2>
      <div className="about-4col">
        {team.map((member, i) => (
          <motion.div key={i} {...scaleIn(i * 0.08)} whileHover={{ y: -5 }} className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 130, background: "var(--sage-light)" }} />
            <div style={{ padding: 18 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 3, color: "var(--charcoal)" }}>{member.name}</h3>
              <p style={{ fontSize: 12, color: "var(--sage)", fontWeight: 500, marginBottom: 12 }}>{member.role}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Award size={13} color="var(--muted)" />
                  <span style={{ fontSize: 11.5, color: "var(--body)" }}>{member.expertise}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Clock size={13} color="var(--muted)" />
                  <span style={{ fontSize: 11.5, color: "var(--body)" }}>{member.experience} experience</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  /* ── Shared Testimonials ── */
  const Testimonials = () => (
    <motion.div {...fadeUp(0.7)} style={{ marginBottom: 44 }}>
      <SectionH2>Student Stories</SectionH2>
      <div className="about-3col">
        {testimonials.map((t, i) => (
          <div key={i} className="card" style={{ padding: 22 }}>
            <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
              {[...Array(5)].map((_, si) => <Star key={si} size={14} color="#FBBF24" fill="#FBBF24" />)}
            </div>
            <p style={{ fontSize: 13, color: "var(--body)", fontStyle: "italic", marginBottom: 18, lineHeight: 1.8 }}>"{t.text}"</p>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--charcoal)" }}>{t.author}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{t.college}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  /* ════ NOT LOGGED IN VIEW ════ */
  if (!isLoggedIn) {
    return (
      <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>
        <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
        <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.8)", bottom: -100, left: -100 }} />

        <Navbar scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} isLoggedIn={false} onLogout={handleLogout} />

        <main className="main-pad" style={{ ...S.maxW, padding: "40px 40px 60px" }}>

          {/* Hero */}
          <motion.div {...fadeUp(0)} style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }}
              style={{ width: 72, height: 72, borderRadius: 22, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 10px 30px rgba(107,158,107,0.3)" }}>
              <Activity size={36} color="white" />
            </motion.div>
            <h1 className="serif page-h1" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, marginBottom: 14 }}>
              About <em style={{ color: "var(--sage)", fontStyle: "italic" }}>EchoCare</em>
            </h1>
            <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 680, margin: "0 auto", lineHeight: 1.8 }}>
              We're revolutionizing student mental health support through technology, empathy, and community. Learn about our mission to make mental wellness accessible to every student in India.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div {...fadeUp(0.1)}>
            <MissionVisionBasic />
          </motion.div>

          {/* Stats */}
          <motion.div {...fadeUp(0.2)}>
            <SectionH2>Our Impact</SectionH2>
            <StatsGrid />
          </motion.div>

          {/* Why EchoCare */}
          <motion.div {...fadeUp(0.3)} style={{ marginBottom: 52 }}>
            <div className="why-section" style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 28, padding: "36px 32px", border: "1px solid rgba(107,158,107,0.15)" }}>
              <SectionH2>Why EchoCare?</SectionH2>
              <div className="why-grid">
                <div>
                  <h3 style={{ fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 600, marginBottom: 14, color: "var(--charcoal)" }}>The Student Mental Health Crisis</h3>
                  <p style={{ fontSize: 13.5, color: "var(--body)", marginBottom: 18, lineHeight: 1.8 }}>
                    In India, 1 in 4 students experiences mental health issues, yet less than 10% receive professional help. The barriers include stigma, cost, and accessibility.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {["80% of students hesitate to seek help due to stigma", "Average wait time for counseling: 2-3 weeks", "Only 30% of colleges have adequate mental health services", "92% of students prefer digital mental health solutions"].map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <AlertCircle size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: "var(--body)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 600, marginBottom: 14, color: "var(--charcoal)" }}>Our Solution</h3>
                  <p style={{ fontSize: 13.5, color: "var(--body)", marginBottom: 18, lineHeight: 1.8 }}>
                    EchoCare combines AI technology with human empathy to create a comprehensive mental wellness ecosystem for students.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {features.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: "#fff", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>{f.icon}</div>
                        <div>
                          <h4 style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 3, color: "var(--charcoal)" }}>{f.title}</h4>
                          <p style={{ fontSize: 12, color: "var(--body)", lineHeight: 1.6 }}>{f.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp(0.4)} style={{ textAlign: "center" }}>
            <div className="card cta-card" style={{ padding: 44, marginBottom: 20 }}>
              <h2 className="serif" style={{ fontSize: "clamp(22px, 3.5vw, 28px)", fontWeight: 400, marginBottom: 14 }}>Ready to Join Our Mission?</h2>
              <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "var(--body)", marginBottom: 28, maxWidth: 580, margin: "0 auto 28px", lineHeight: 1.8 }}>
                Create your free EchoCare account to access mental health support, join our community, and be part of the movement to transform student wellness.
              </p>
              <div className="auth-cta-row" style={{ marginBottom: 8 }}>
                <Link to="/register" className="btn-primary" style={{ padding: "13px 28px", fontSize: 14, gap: 8 }}>
                  <UserPlus size={15} /> Join EchoCare Free
                </Link>
                <Link to="/login" className="btn-ghost" style={{ padding: "13px 28px", fontSize: 14, gap: 8 }}>
                  <LogIn size={15} /> Already a Member?
                </Link>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>EchoCare is free for all students. No credit card required.</p>
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
        <motion.div {...fadeUp(0.1)} style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)", marginBottom: 14, display: "inline-flex", gap: 6 }}>
            <Activity size={13} /> Our Story
          </span>
          <h1 className="serif page-h1" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 300, marginBottom: 12 }}>
            Our <em style={{ color: "var(--sage)", fontStyle: "italic" }}>Story</em>
          </h1>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "var(--body)", maxWidth: 600, margin: "0 auto", lineHeight: 1.8 }}>
            Empowering student mental wellness through technology, empathy, and community since 2025.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.2)}>
          <StatsGrid />
        </motion.div>

        {/* Mission & Vision — coloured variant */}
        <motion.div {...fadeUp(0.3)}>
          <div className="about-2col" style={{ marginBottom: 44 }}>
            {/* Mission — sage gradient */}
            <div className="mission-card" style={{ background: "linear-gradient(135deg, var(--sage) 0%, var(--sage-hover) 100%)", borderRadius: 22, padding: 28, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Target size={22} color="#fff" />
                </div>
                <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, color: "#fff" }}>Our Mission</h2>
              </div>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.9)", marginBottom: 20, lineHeight: 1.8 }}>
                To make mental health support accessible, affordable, and stigma-free for every student in India.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 11, listStyle: "none" }}>
                {["24/7 accessible mental health support", "Break down stigma in educational spaces", "Safe spaces for sharing and healing", "Bridge gap to professional help"].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle size={16} color="#fff" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision — card */}
            <div className="card mission-card" style={{ padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--sage-light)", color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Eye size={22} />
                </div>
                <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, color: "var(--charcoal)" }}>Our Vision</h2>
              </div>
              <p style={{ fontSize: 13.5, color: "var(--body)", marginBottom: 20, lineHeight: 1.8 }}>
                A future where mental wellness is integral to every educational institution, and no student suffers in silence.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 11, listStyle: "none" }}>
                {["Mental health support in every college by 2030", "AI-assisted early intervention nationwide", "Comprehensive wellness ecosystems", "Strong peer support networks"].map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: "var(--body)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div {...fadeUp(0.4)} style={{ marginBottom: 44 }}>
          <SectionH2>Our Core Values</SectionH2>
          <div className="about-4col">
            {values.map((v, i) => (
              <motion.div key={i} {...scaleIn(i * 0.08)} whileHover={{ y: -5 }} className="card" style={{ padding: 22 }}>
                <div style={{ width: 50, height: 50, borderRadius: 13, background: v.bgColor, color: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>{v.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 7, color: "var(--charcoal)" }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.7 }}>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <Timeline />

        {/* Team */}
        <TeamGrid />

        {/* Testimonials */}
        <Testimonials />

        {/* Contact & Social */}
        <motion.div {...fadeUp(0.8)}>
          <div className="contact-section" style={{ background: "linear-gradient(135deg, var(--sage-light) 0%, #fff 100%)", borderRadius: 28, padding: "36px 32px", border: "1px solid rgba(107,158,107,0.15)" }}>
            <div className="contact-grid">
              <div>
                <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, marginBottom: 20, color: "var(--charcoal)" }}>Get In Touch</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { icon: <Mail size={17} />, text: "khushigupta16057@gmail.com" },
                    { icon: <Phone size={17} />, text: "+91" },
                    { icon: <MapPin size={17} />, text: "Kurukshetra, India" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "var(--sage)" }}>{item.icon}</span>
                      <span style={{ fontSize: 13.5, color: "var(--body)" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="serif" style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 400, marginBottom: 20, color: "var(--charcoal)" }}>Follow Our Journey</h2>
                <div className="social-row">
                  {[{ icon: <Twitter size={17} />, label: "Twitter" }, { icon: <Linkedin size={17} />, label: "LinkedIn" }, { icon: <Instagram size={17} />, label: "Instagram" }].map((s, i) => (
                    <button key={i} className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px" }}>
                      {s.icon} <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer S={S} />
    </div>
  );
};

export default About;