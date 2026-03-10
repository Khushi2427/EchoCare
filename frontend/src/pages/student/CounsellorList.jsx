import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import {
  User,
  Phone,
  Star,
  Calendar,
  Users,
  Brain,
  Shield,
  Clock,
  Award,
  Search,
  Filter,
  Sparkles,
  MessageSquare,
  GraduationCap,
  Heart,
  ChevronRight,
  Info
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
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 14px;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
    }
    .btn-ghost:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; }
    .btn-sage {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: #fff;
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-sage:hover { background: var(--sage-hover); transform: translateY(-2px); }
    .btn-sage:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
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
    .badge-available {
      background: #d1fae5;
      color: #065f46;
    }
    .badge-soon {
      background: #dbeafe;
      color: #1e40af;
    }
    .badge-unavailable {
      background: var(--sage-light);
      color: var(--muted);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    input, button, select, textarea {
      font-family: 'Outfit', sans-serif;
    }
    input:focus {
      outline: none;
    }
    @media (max-width: 768px) {
      .mobile-stack {
        flex-direction: column;
      }
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

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] },
});

// Simple Select Component
const SimpleSelect = ({ value, onValueChange, placeholder, options, className }) => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        style={{
          width: "100%",
          height: 48,
          padding: "0 16px",
          paddingRight: 32,
          background: "var(--cream)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          fontSize: 14,
          color: "var(--charcoal)",
          outline: "none",
          appearance: "none",
          cursor: "pointer"
        }}
      >
        <option value="all">{placeholder || "All Specializations"}</option>
        {options.filter(opt => opt !== "all").map((opt) => (
          <option key={opt} value={opt} style={{ textTransform: "capitalize" }}>
            {opt}
          </option>
        ))}
      </select>
      <Filter size={16} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", pointerEvents: "none" }} />
    </div>
  );
};

const CounsellorList = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [filteredCounsellors, setFilteredCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        setLoading(true);
        const res = await api.get("/counsellors");
        setCounsellors(res.data);
        setFilteredCounsellors(res.data);
      } catch (err) {
        console.error("Fetch counsellor error:", err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchCounsellors();
  }, []);

  useEffect(() => {
    let filtered = counsellors;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.name?.toLowerCase().includes(term) ||
        c.specialization?.some(s => s.toLowerCase().includes(term)) ||
        c.bio?.toLowerCase().includes(term)
      );
    }
    if (selectedSpecialization !== "all") {
      filtered = filtered.filter(c =>
        c.specialization?.includes(selectedSpecialization)
      );
    }
    setFilteredCounsellors(filtered);
  }, [searchTerm, selectedSpecialization, counsellors]);

  const specializations = ["all", ...new Set(counsellors.flatMap(c => c.specialization || []))];

  const getAvailabilityStatus = (availability) => {
    if (!availability || availability.length === 0) return "unavailable";
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hasTodaySlot = availability.some(a => a.day === today && a.slots?.length > 0);
    return hasTodaySlot ? "available" : "available-soon";
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "available": return { text: "Available Today", class: "badge-available" };
      case "available-soon": return { text: "Available Soon", class: "badge-soon" };
      default: return { text: "No Slots", class: "badge-unavailable" };
    }
  };

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
          <div style={{
            width: 48,
            height: 48,
            border: "4px solid var(--sage-light)",
            borderTopColor: "var(--sage)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
          <p style={{ color: "var(--muted)", fontWeight: 500, animation: "pulse 2s infinite" }}>
            Finding specialists for you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      padding: "40px 24px",
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* Header Section */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 40 }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            alignItems: "flex-start"
          }} className="md:flex-row md:items-end md:justify-between">
            
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--sage-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Users size={20} color="var(--sage)" />
                </div>
                <span style={{ color: "var(--sage)", fontWeight: 500, fontSize: 14 }}>Expert Network</span>
              </div>
              
              <h1 className="serif" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, marginBottom: 8 }}>
                Meet our <span style={{ color: "var(--sage)" }}>Counsellors</span>
              </h1>
              
              <p style={{ fontSize: 16, color: "var(--muted)" }}>
                Licensed professionals dedicated to your mental well-being.
              </p>
            </div>

            {/* Stats Card */}
            <div style={{
              display: "flex",
              background: "#fff",
              borderRadius: 16,
              border: "1px solid var(--border)",
              padding: "12px 20px",
              boxShadow: "var(--shadow-sm)"
            }}>
              <div style={{ paddingRight: 20, borderRight: "1px solid var(--border)" }}>
                <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>
                  Total Experts
                </p>
                <p style={{ fontSize: 28, fontWeight: 600, color: "var(--charcoal)" }}>{counsellors.length}</p>
              </div>
              <div style={{ paddingLeft: 20 }}>
                <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>
                  Satisfaction
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={18} color="#FBBF24" fill="#FBBF24" />
                  <p style={{ fontSize: 28, fontWeight: 600, color: "var(--charcoal)" }}>4.9</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div {...fadeUp(0.1)} style={{
          background: "#fff",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 32,
          boxShadow: "var(--shadow-sm)"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 16
          }} className="md:flex-row md:items-center">
            
            {/* Search */}
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input
                placeholder="Search name, expertise, or bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 42px",
                  background: "var(--cream)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  fontSize: 14,
                  color: "var(--charcoal)",
                  outline: "none",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
            </div>

            {/* Specialization Filter */}
            <div style={{ width: "100%" }} className="md:w-[240px]">
              <SimpleSelect
                value={selectedSpecialization}
                onValueChange={setSelectedSpecialization}
                placeholder="All Specializations"
                options={specializations}
              />
            </div>
          </div>
        </motion.div>

        {/* Counsellors Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCounsellors.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ padding: "80px 20px", textAlign: "center" }}
            >
              <div style={{
                width: 80,
                height: 80,
                background: "var(--sage-light)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}>
                <Search size={32} color="var(--sage)" />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>No matches found</h3>
              <p style={{ color: "var(--muted)", marginBottom: 20 }}>Try adjusting your filters or search terms.</p>
              <button
                onClick={() => { setSearchTerm(""); setSelectedSpecialization("all"); }}
                className="btn-ghost"
                style={{ padding: "10px 24px" }}
              >
                Reset All Filters
              </button>
            </motion.div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24
            }}>
              {filteredCounsellors.map((counsellor, index) => {
                const status = getAvailabilityStatus(counsellor.availability);
                const config = getStatusConfig(status);
                
                return (
                  <motion.div
                    key={counsellor._id}
                    layout
                    {...scaleIn(index * 0.05)}
                  >
                    <div className="card" style={{
                      overflow: "hidden",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column"
                    }}>
                      {/* Card Header */}
                      <div style={{ padding: 24 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                          {/* Avatar */}
                          <div style={{ position: "relative" }}>
                            <div style={{
                              width: 64,
                              height: 64,
                              borderRadius: "50%",
                              background: "var(--sage-light)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 24,
                              fontWeight: 600,
                              color: "var(--sage)",
                              border: "2px solid #fff",
                              boxShadow: "var(--shadow-sm)"
                            }}>
                              {counsellor.name?.charAt(0)}
                            </div>
                            <span style={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              background: status === 'available' ? "#4CAF50" : "var(--muted)",
                              border: "2px solid #fff"
                            }} />
                          </div>

                          {/* Status Badge */}
                          <span className={`badge ${config.class}`}>
                            {config.text}
                          </span>
                        </div>

                        {/* Name & Title */}
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }}>
                          {counsellor.name}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
                          <GraduationCap size={14} />
                          {counsellor.title || "Licensed Practitioner"}
                        </div>

                        {/* Specializations */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                          {counsellor.specialization?.slice(0, 3).map((spec) => (
                            <span key={spec} className="badge" style={{ textTransform: "capitalize", fontSize: 10, padding: "2px 8px" }}>
                              {spec}
                            </span>
                          ))}
                        </div>

                        {/* Bio */}
                        <p style={{ fontSize: 13, color: "var(--body)", lineHeight: 1.6, marginBottom: 16 }} className="line-clamp-2">
                          "{counsellor.bio || "Helping individuals navigate life challenges through professional guidance."}"
                        </p>

                        {/* Experience & Rating */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Award size={16} color="var(--sage)" />
                            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>
                              {counsellor.experience || 0}+ Yrs Exp
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Star size={16} color="#FBBF24" fill="#FBBF24" />
                            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>
                              4.9 Rating
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            className="btn-primary"
                            style={{ flex: 1, padding: "12px", justifyContent: "center" }}
                            onClick={() => navigate(`/student/book/${counsellor._id}`)}
                          >
                            Book Now
                          </button>
                          <button
                            className="btn-ghost"
                            style={{ padding: "12px", width: 48, justifyContent: "center" }}
                            onClick={() => navigate(`/student/counsellor/${counsellor._id}`)}
                          >
                            <User size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Privacy Note */}
        <motion.div
          {...fadeUp(0.2)}
          style={{
            marginTop: 48,
            position: "relative",
            overflow: "hidden",
            background: "var(--sage-light)",
            borderRadius: 24,
            padding: 32,
            border: "1px solid rgba(107,158,107,0.2)"
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            position: "relative",
            zIndex: 2
          }} className="md:flex-row md:items-center">
            
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-sm)"
            }}>
              <Shield size={32} color="var(--sage)" />
            </div>

            <div style={{ flex: 1, textAlign: "center" }} className="md:text-left">
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>
                Your Privacy is Our Priority
              </h3>
              <p style={{ fontSize: 14, color: "var(--body)", marginBottom: 12, maxWidth: 600 }}>
                Every session is encrypted and strictly confidential. We adhere to international 
                healthcare standards to ensure your journey remains your own.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center" }} className="md:justify-start">
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "var(--sage)", textTransform: "uppercase" }}>
                  <Heart size={12} />
                  HIPAA Compliant
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "var(--sage)", textTransform: "uppercase" }}>
                  <Sparkles size={12} />
                  Licensed Experts
                </span>
              </div>
            </div>
          </div>

          {/* Background Decoration */}
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 200,
            height: 200,
            background: "rgba(107,158,107,0.1)",
            borderRadius: "50%",
            filter: "blur(60px)",
            transform: "translate(50%, -50%)",
            zIndex: 1
          }} />
        </motion.div>
      </div>

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

export default CounsellorList;