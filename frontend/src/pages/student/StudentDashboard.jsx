import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  Menu, Home, User, Brain, Calendar, BookOpen, Users, LogOut,
  Bell, Settings, ChevronRight, AlertCircle, Sparkles, Heart,
  Zap, Target, Star, Search, ArrowRight, Clock, Activity,
  Award, X
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
    :root {
      --sage: #6B9E6B;
      --sage-hover: #598559;
      --sage-light: #EEF5EE;
      --cream: #FAFAF7;
      --warm: #F6F0E8;
      --charcoal: #1A1A1A;
      --charcoal-2: #2C2C2C;
      --body: #4A4A4A;
      --muted: #7A7A7A;
      --border: rgba(0,0,0,0.08);
      --shadow-sm: 0 2px 12px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 32px rgba(0,0,0,0.08);
      --shadow-lg: 0 20px 60px rgba(0,0,0,0.12);
      --r-md: 20px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    a { text-decoration: none; color: inherit; }
    .serif { font-family: 'Cormorant Garamond', serif; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--charcoal); color: #fff;
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 14px;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
    }
    .btn-ghost:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; }
    .btn-sage {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: #fff;
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-sage:hover { background: var(--sage-hover); transform: translateY(-2px); }
    .card {
      background: #fff; border: 1px solid var(--border);
      border-radius: var(--r-md); box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    @media (max-width: 1023px) {
      .desktop-only { display: none; }
      .mobile-only { display: flex; }
    }
    @media (min-width: 1024px) {
      .mobile-only { display: none; }
      .desktop-only { display: flex; }
    }
  `;
  document.head.appendChild(s);
})();

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const StudentDashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cream)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 64,
              height: 64,
              border: "4px solid var(--sage-light)",
              borderTopColor: "var(--sage)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }} />
            <Sparkles size={24} color="var(--sage)" style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }} />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 500, color: "var(--body)", animation: "pulse 2s infinite" }}>
            Loading Wellness Portal...
          </h2>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Overview", icon: Home, id: "overview", link: "#" },
    { name: "Profile", icon: User, id: "profile", link: "/student/profile" },
    { name: "Counselling", icon: Brain, id: "counselling", link: "/student/counsellors" },
    { name: "Appointments", icon: Calendar, id: "appointments", link: "/student/appointments" },
    { name: "Resources", icon: BookOpen, id: "resources", link: "/student/resources" },
    { name: "AI Chat", icon: Zap, id: "ai-chat", link: "/student/ai-chat" },
    { name: "Communities", icon: Users, id: "communities", link: "/student/communities" },
  ];

  const quickActions = [
    { title: "Book a Session", desc: "Talk to a counselor", icon: Calendar, link: "/student/counsellors" },
    { title: "Join Group", desc: "Peer support groups", icon: Users, link: "/student/communities" },
    { title: "Update Profile", desc: "Manage your account", icon: User, link: "/student/profile" }
  ];

  const services = [
    {
      icon: Brain,
      title: "Counselling",
      description: "Professional mental health support.",
      link: "/student/counsellors",
      suggestion: "Talk to a professional today."
    },
    {
      icon: Calendar,
      title: "Appointments",
      description: "Manage your upcoming sessions.",
      link: "/student/appointments",
      suggestion: "You have no sessions today."
    },
    {
      icon: BookOpen,
      title: "Resources",
      description: "Educational self-help guides.",
      link: "/student/resources",
      suggestion: "New: Mindfulness Guide 2024"
    },
    {
        icon: Zap,
        title: "AI Chat",
        description: "Instant AI-powered assistant.",
        link: "/student/ai-chat",
        suggestion: "Available 24/7 for you."
    }
  ];

  const upcomingAppointments = [
    { time: "Today, 3:00 PM", with: "Dr. Sharma", type: "Video Session" },
    { time: "Tomorrow, 11:00 AM", with: "Dr. Patel", type: "In-person" }
  ];

  const recentActivities = [
    { action: "Completed mindfulness exercise", time: "2 hours ago", icon: Heart },
    { action: "Joined 'Study Groups' community", time: "Yesterday", icon: Users },
    { action: "Booked counseling session", time: "2 days ago", icon: Calendar }
  ];

  const moodData = [
    { day: "Mon", value: 7 },
    { day: "Tue", value: 6 },
    { day: "Wed", value: 8 },
    { day: "Thu", value: 7 },
    { day: "Fri", value: 9 },
    { day: "Sat", value: 8 },
    { day: "Sun", value: 8 }
  ];

  const SidebarContent = () => (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      background: "#fff",
      borderRight: "1px solid var(--border)"
    }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--sage)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Heart size={18} color="white" />
        </div>
        <span className="serif" style={{ fontSize: 20, fontWeight: 500, color: "var(--charcoal)" }}>
          EchoCare
        </span>
      </div>

      {/* User Info */}
      <div style={{ padding: "0 20px 24px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "var(--sage)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 18,
            fontWeight: 500
          }}>
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)" }}>{user?.name || "User"}</p>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>{user?.role || "Student"}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, padding: "24px 16px", overflowY: "auto" }}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            onClick={() => {
              setActiveTab(item.id);
              if (isMobile) setMobileOpen(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 10,
              marginBottom: 4,
              textDecoration: "none",
              color: activeTab === item.id ? "var(--sage)" : "var(--body)",
              background: activeTab === item.id ? "var(--sage-light)" : "transparent",
              transition: "all 0.2s",
              fontWeight: activeTab === item.id ? 500 : 400
            }}
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}

        {/* Quick Tips */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 16, paddingLeft: 16 }}>
            Quick Tips
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 12, padding: "0 16px" }}>
              <Target size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: "var(--body)" }}>Set one small goal for today.</p>
            </div>
            <div style={{ display: "flex", gap: 12, padding: "0 16px" }}>
              <Heart size={16} color="var(--sage)" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: "var(--body)" }}>Self-care is not selfish.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div style={{ padding: "20px 16px", borderTop: "1px solid var(--border)" }}>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            width: "100%",
            borderRadius: 10,
            border: "none",
            background: "transparent",
            color: "var(--body)",
            cursor: "pointer",
            transition: "all 0.2s",
            textAlign: "left"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--cream)";
            e.currentTarget.style.color = "var(--charcoal)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--body)";
          }}
        >
          <LogOut size={18} />
          <span style={{ fontSize: 14 }}>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ 
      display: "flex", 
      minHeight: "100vh", 
      background: "var(--cream)",
      position: "relative"
    }}>
      
      {/* Background Blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: "rgba(107,158,107,0.05)", top: -100, right: -50 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside
          style={{
            width: 280,
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 50,
            boxShadow: "var(--shadow-md)"
          }}
        >
          <SidebarContent />
        </aside>
      )}

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                zIndex: 90,
              }}
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                width: 280,
                background: "#fff",
                zIndex: 100,
                boxShadow: "var(--shadow-lg)"
              }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : 280,
          transition: "margin-left 0.3s ease",
          position: "relative",
          zIndex: 10,
          width: "100%"
        }}
      >
        {/* Top Navbar */}
        <header
          style={{
            height: 70,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            position: "sticky",
            top: 0,
            zIndex: 40
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isMobile && (
              <button
                onClick={() => setMobileOpen(true)}
                style={{ 
                  border: "none", 
                  background: "none", 
                  cursor: "pointer",
                  padding: 8,
                  color: "var(--charcoal)"
                }}
              >
                <Menu size={24} />
              </button>
            )}
            
            {/* Search Bar - Desktop only */}
            <div className="desktop-only" style={{
              display: "flex",
              alignItems: "center",
              background: "var(--cream)",
              borderRadius: 100,
              padding: "8px 16px",
              border: "1px solid var(--border)",
              marginLeft: 16
            }}>
              <Search size={16} color="var(--muted)" style={{ marginRight: 8 }} />
              <input
                placeholder="Search resources..."
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 13,
                  color: "var(--charcoal)",
                  outline: "none",
                  width: 200
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <Bell size={18} color="var(--body)" style={{ cursor: "pointer" }} />
              <span style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                background: "var(--sage)",
                borderRadius: "50%"
              }} />
            </div>

            {/* Mobile User Avatar */}
            {isMobile && (
              <div style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "var(--sage)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 500,
                fontSize: 14
              }}>
                {user?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <div style={{ padding: "32px 24px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            
            {/* Hero Section */}
            <motion.div {...fadeUp(0)} style={{ marginBottom: 32 }}>
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row", 
                gap: 16, 
                alignItems: isMobile ? "flex-start" : "center", 
                justifyContent: "space-between" 
              }}>
                <div>
                  <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, marginBottom: 8 }}>
                    Welcome back, <span style={{ color: "var(--sage)" }}>{user?.name?.split(' ')[0]}</span>
                  </h1>
                  <p style={{ fontSize: 15, color: "var(--body)" }}>
                    Take a deep breath. How are you feeling today?
                  </p>
                </div>
                <div style={{ display: "flex", gap: 12, width: isMobile ? "100%" : "auto" }}>
                  <button
                    onClick={() => navigate("/student/communities")}
                    className="btn-ghost"
                    style={{ padding: "10px 20px", fontSize: 13, flex: isMobile ? 1 : "none" }}
                  >
                    <Users size={14} />
                    {!isMobile && "Communities"}
                  </button>
                  <button
                    onClick={() => navigate("/student/ai-chat")}
                    className="btn-primary"
                    style={{ padding: "10px 20px", fontSize: 13, flex: isMobile ? 1 : "none" }}
                  >
                    <Brain size={14} />
                    {!isMobile && "Talk to AI"}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Grid */}
            <motion.div {...fadeUp(0.1)} style={{ 
              display: "grid", 
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", 
              gap: 16, 
              marginBottom: 40 
            }}>
              {quickActions.map((action, i) => (
                <Link to={action.link} key={i} style={{ textDecoration: "none" }}>
                  <div className="card" style={{ padding: 20, cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <action.icon size={20} color="var(--sage)" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)", marginBottom: 4 }}>{action.title}</h3>
                        <p style={{ fontSize: 12, color: "var(--muted)" }}>{action.desc}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>

            {/* Main Dashboard Grid */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", 
              gap: 24 
            }}>
              
              {/* Left Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                
                {/* Mood Tracker Card */}
                <motion.div {...fadeUp(0.2)} className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)" }}>
                      <Activity size={16} style={{ marginRight: 8, display: "inline" }} />
                      Weekly Mood Tracker
                    </h3>
                    <span className="badge">Last 7 days</span>
                  </div>
                  
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120 }}>
                    {moodData.map((day, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                        <div style={{
                          width: "100%",
                          height: `${day.value * 10}px`,
                          background: day.value >= 8 ? "var(--sage)" : "var(--sage-light)",
                          borderRadius: "8px 8px 0 0",
                          transition: "height 0.3s"
                        }} />
                        <span style={{ fontSize: 11, color: "var(--muted)" }}>{day.day}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>Average: 7.6/10</span>
                    <Link to="#" style={{ fontSize: 12, color: "var(--sage)", display: "flex", alignItems: "center", gap: 4 }}>
                      View details <ChevronRight size={12} />
                    </Link>
                  </div>
                </motion.div>

                {/* Wellness Services */}
                <motion.div {...fadeUp(0.3)}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)" }}>Wellness Services</h3>
                    <Link to="#" style={{ fontSize: 12, color: "var(--sage)", display: "flex", alignItems: "center", gap: 4 }}>
                      View all <ArrowRight size={12} />
                    </Link>
                  </div>
                  
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", 
                    gap: 16 
                  }}>
                    {services.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                        <Link to={service.link} key={index} style={{ textDecoration: "none" }}>
                          <div className="card" style={{ padding: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                              <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <IconComponent size={18} color="var(--sage)" />
                              </div>
                              <div>
                                <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)" }}>{service.title}</h4>
                                <p style={{ fontSize: 11, color: "var(--muted)" }}>{service.description}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                
                {/* Upcoming Appointments */}
                <motion.div {...fadeUp(0.2)} className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)" }}>
                      <Calendar size={16} style={{ marginRight: 8, display: "inline" }} />
                      Upcoming
                    </h3>
                    <Link to="#" style={{ fontSize: 12, color: "var(--sage)" }}>View all</Link>
                  </div>
                  
                  {upcomingAppointments.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {upcomingAppointments.map((apt, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Calendar size={16} color="var(--sage)" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>{apt.time}</p>
                            <p style={{ fontSize: 11, color: "var(--muted)" }}>{apt.with} • {apt.type}</p>
                          </div>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sage)" }} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                      <p style={{ fontSize: 13, color: "var(--muted)" }}>No upcoming appointments</p>
                      <Link to="/student/counsellors" style={{ fontSize: 12, color: "var(--sage)", marginTop: 8, display: "inline-block" }}>
                        Book a session
                      </Link>
                    </div>
                  )}
                </motion.div>

                {/* Recent Activity */}
                <motion.div {...fadeUp(0.3)} className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)", marginBottom: 16 }}>
                    <Clock size={16} style={{ marginRight: 8, display: "inline" }} />
                    Recent Activity
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {recentActivities.map((activity, i) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <IconComponent size={14} color="var(--sage)" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, color: "var(--charcoal)" }}>{activity.action}</p>
                            <p style={{ fontSize: 10, color: "var(--muted)" }}>{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Wellness Streak */}
                <motion.div {...fadeUp(0.4)} style={{ background: "var(--sage)", borderRadius: 20, padding: 24, color: "#fff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <Award size={24} />
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>7 Day Streak!</h3>
                  </div>
                  <p style={{ fontSize: 13, opacity: 0.9, marginBottom: 16 }}>
                    You've been consistent with your wellness activities. Keep it up!
                  </p>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[...Array(7)].map((_, i) => (
                      <div key={i} style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 3 }}>
                        <div style={{ width: "100%", height: "100%", background: "#fff", borderRadius: 3 }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, opacity: 0.8 }}>Best streak: 12 days</span>
                    <Sparkles size={14} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;