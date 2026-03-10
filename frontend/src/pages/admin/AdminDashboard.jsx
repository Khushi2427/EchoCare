import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Upload, FileText, AlertTriangle, Users, BarChart3, Settings,
  User, Shield, Bell, Search, ChevronRight, PlusCircle, Eye, Edit,
  Trash2, Download, Activity, Brain, Globe, Sparkles, CheckCircle2,
  LayoutDashboard, Menu, X, Lock as LockIcon,
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
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--body);
      padding: 8px 16px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 13px;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
    }
    .btn-outline:hover { border-color: var(--sage); color: var(--sage); }
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
    .badge-outline {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--body);
    }
    .badge-success {
      background: #d1fae5;
      color: #065f46;
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    input:focus {
      outline: none;
    }
    @media (max-width: 1023px) {
      .desktop-only { display: none; }
    }
    @media (min-width: 1024px) {
      .mobile-only { display: none; }
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

const AdminDashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setDashboardData({
          recentActivities: [
            { id: 1, action: "New student flagged by AI", user: "John Doe", time: "10 min ago", type: "alert" },
            { id: 2, action: "Resource uploaded", user: "Dr. Smith", time: "1 hour ago", type: "upload" },
            { id: 3, action: "Counsellor added", user: "Sarah Johnson", time: "2 hours ago", type: "add" },
            { id: 4, action: "Emergency session booked", user: "Michael Chen", time: "3 hours ago", type: "session" },
          ],
          quickStats: [
            { label: "High Risk Students", value: "0", trend: "stable" },
            { label: "Pending Approvals", value: "0", trend: "stable" },
            { label: "System Health", value: "100%", trend: "stable" },
          ]
        });
      }, 300);
    }
  }, [user]);

  if (loading || !dashboardData) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "var(--cream)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Activity size={40} color="var(--sage)" style={{ animation: "spin 1s linear infinite", marginBottom: 16 }} />
        <h2 style={{ fontSize: 18, fontWeight: 500, color: "var(--body)" }}>Initializing Admin Environment...</h2>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const adminActions = [
    {
      title: "Upload Resources",
      description: "Articles, videos, and audio for students",
      icon: <Upload size={20} />,
      link: "/admin/resources/upload",
      color: "var(--sage)",
      features: ["AI tagging", "Bulk upload"]
    },
    {
      title: "Manage Resources",
      description: "Edit, review, or delete content",
      icon: <FileText size={20} />,
      link: "/admin/resources",
      color: "var(--sage)",
      features: ["Analytics", "Version control"]
    },
    {
      title: "Flagged Students",
      description: "High-risk cases detected by AI",
      icon: <AlertTriangle size={20} />,
      link: "/admin/flagged-students",
      color: "var(--sage)",
      features: ["Risk insights", "Action plans"]
    },
    {
      title: "Manage Counsellors",
      description: "Counsellor accounts and schedules",
      icon: <Users size={20} />,
      link: "/admin/counsellors",
      color: "var(--sage)",
      features: ["Assignments", "Performance"]
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      {/* Header */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        borderBottom: "1px solid var(--border)",
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)"
      }}>
        <div style={{
          padding: "0 24px",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          
          {/* Left side */}
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <Link to="/admin" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                background: "var(--sage)",
                padding: "6px",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Shield size={20} color="white" />
              </div>
              <span style={{ fontWeight: 600, fontSize: 18, color: "var(--charcoal)" }}>
                EchoCare <span style={{ color: "var(--sage)" }}>Admin</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {["overview", "analytics", "users", "resources"].map((tab) => {
                const path = tab === "overview" ? "/admin" : `/admin/${tab}`;
                return (
                  <Link key={tab} to={path}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 100,
                        border: "none",
                        background: activeTab === tab ? "var(--sage-light)" : "transparent",
                        color: activeTab === tab ? "var(--sage)" : "var(--body)",
                        fontSize: 14,
                        fontWeight: activeTab === tab ? 500 : 400,
                        cursor: "pointer",
                        textTransform: "capitalize"
                      }}
                    >
                      {tab}
                    </button>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="mobile-only"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 8,
                display: "none"
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            
            {/* Search */}
            <div className="desktop-only" style={{
              display: "flex",
              alignItems: "center",
              background: "var(--cream)",
              borderRadius: 100,
              padding: "8px 16px",
              border: "1px solid var(--border)",
              width: 240
            }}>
              <Search size={16} color="var(--charcoal)" style={{ marginRight: 8 }} />
              <input
                placeholder="Search everything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 13,
                  color: "var(--charcoal)",
                  outline: "none",
                  width: "100%"
                }}
              />
            </div>

            {/* Notifications */}
            <button style={{
              position: "relative",
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: 4
            }}>
              <Bell size={18} color="var(--body)" />
              <span style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 8,
                height: 8,
                background: "var(--sage)",
                borderRadius: "50%"
              }} />
            </button>

            <div style={{ width: 1, height: 24, background: "var(--border)", margin: "0 8px" }} />

            {/* User Info */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="desktop-only" style={{ textAlign: "right" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--charcoal)" }}>{user?.name}</p>
                <span style={{
                  fontSize: 10,
                  padding: "2px 8px",
                  background: "var(--sage-light)",
                  color: "var(--sage)",
                  borderRadius: 100,
                  textTransform: "uppercase",
                  fontWeight: 600
                }}>
                  {user?.role}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--cream)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--body)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--sage-light)";
                  e.currentTarget.style.color = "var(--sage)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--cream)";
                  e.currentTarget.style.color = "var(--body)";
                }}
                title="Logout"
              >
                <User size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-only"
              style={{
                borderTop: "1px solid var(--border)",
                background: "#fff",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 4
              }}
            >
              {["overview", "analytics", "users", "resources"].map((tab) => {
                const path = tab === "overview" ? "/admin" : `/admin/${tab}`;
                return (
                  <Link key={tab} to={path}>
                    <button
                      onClick={() => {
                        setActiveTab(tab);
                        setMobileMenuOpen(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 8,
                        border: "none",
                        background: activeTab === tab ? "var(--sage-light)" : "transparent",
                        color: activeTab === tab ? "var(--sage)" : "var(--body)",
                        fontSize: 14,
                        fontWeight: activeTab === tab ? 500 : 400,
                        textAlign: "left",
                        cursor: "pointer",
                        textTransform: "capitalize"
                      }}
                    >
                      {tab}
                    </button>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: "24px",
        maxWidth: 1600,
        margin: "0 auto",
        width: "100%",
        position: "relative",
        zIndex: 10
      }}>
        
        {/* Hero Section */}
        <motion.section {...fadeUp(0)} style={{
          marginBottom: 40,
          position: "relative",
          overflow: "hidden",
          borderRadius: 24,
          background: "var(--charcoal)",
          padding: "40px 32px",
          color: "#fff"
        }}>
          <div style={{ position: "relative", zIndex: 10 }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              alignItems: "flex-start"
            }} className="md:flex-row md:items-center md:justify-between">
              
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--sage)", marginBottom: 12 }}>
                  <Sparkles size={16} />
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Admin Command Center</span>
                </div>
                
                <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 300, marginBottom: 8 }}>
                  Welcome back, <span style={{ color: "var(--sage)" }}>{user?.name?.split(' ')[0]}</span>
                </h1>
                
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 500 }}>
                  Platform oversight and student wellness management. System integrity is currently at 100%.
                </p>
              </div>

              {/* Quick Stats */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {dashboardData?.quickStats.map((stat, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 16,
                    padding: "16px",
                    minWidth: 140,
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                      {stat.label}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 24, fontWeight: 600 }}>{stat.value}</span>
                      <span style={{
                        fontSize: 11,
                        padding: "2px 8px",
                        background: stat.trend === 'up' ? 'rgba(16,185,129,0.2)' : 'rgba(107,158,107,0.2)',
                        color: stat.trend === 'up' ? '#10b981' : 'var(--sage)',
                        borderRadius: 100
                      }}>
                        {stat.trend === 'up' ? '↑' : '—'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Background Decoration */}
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 300,
            height: 300,
            background: "rgba(107,158,107,0.2)",
            borderRadius: "50%",
            filter: "blur(80px)",
            transform: "translate(50%, -50%)"
          }} />
        </motion.section>

        {/* Main Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 32
        }}>
          
          {/* Left Column - Service Directory */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 4 }}>Service Directory</h2>
              <p style={{ fontSize: 13, color: "var(--charcoal)" }}>Access core management modules</p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16
            }}>
              {adminActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                >
                  <Link to={action.link} style={{ textDecoration: "none", display: "block" }}>
                    <div className="card" style={{ height: "100%", padding: 20 }}>
                      <div style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "var(--sage-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16
                      }}>
                        {action.icon}
                      </div>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)", marginBottom: 4 }}>
                        {action.title}
                      </h3>
                      <p style={{ fontSize: 12, color: "var(--charcoal)", lineHeight: 1.6 }}>
                        {action.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Platform Status & Recent Events */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Platform Status */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)", marginBottom: 4 }}>Platform Status</h3>
              <p style={{ fontSize: 12, color: "var(--charcoal)", marginBottom: 20 }}>Real-time system health</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "API Services", icon: <Globe size={16} />, status: "Operational", color: "#10b981" },
                  { label: "AI Engine", icon: <Brain size={16} />, status: "Processing", color: "var(--sage)" },
                  { label: "Data Security", icon: <LockIcon size={16} />, status: "Secure", color: "var(--sage)" },
                ].map((s, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    background: "var(--cream)",
                    borderRadius: 12
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: s.color }}>{s.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>{s.label}</span>
                    </div>
                    <span style={{
                      fontSize: 11,
                      padding: "4px 12px",
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: 100,
                      color: s.color
                    }}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Events */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)", marginBottom: 16 }}>Recent Events</h3>
              
              {/* Commented out as in original */}
              {/* <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {dashboardData.recentActivities.map((activity, i) => (
                  <div key={activity.id} style={{ display: "flex", gap: 12, position: "relative" }}>
                    {i !== dashboardData.recentActivities.length - 1 && (
                      <div style={{
                        position: "absolute",
                        left: 15,
                        top: 28,
                        bottom: -20,
                        width: 1,
                        background: "var(--border)"
                      }} />
                    )}
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: activity.type === 'alert' ? '#fee2e2' : 'var(--sage-light)',
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: activity.type === 'alert' ? '#ef4444' : 'var(--sage)',
                      zIndex: 10
                    }}>
                      {activity.type === 'alert' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 2 }}>{activity.action}</p>
                      <p style={{ fontSize: 11, color: "var(--muted)" }}>{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;