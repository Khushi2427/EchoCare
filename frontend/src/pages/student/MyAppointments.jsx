import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, isPast, parseISO } from "date-fns";
import { getUserAppointments } from "../../services/appointmentService";

// Icons
import { 
  Calendar, 
  Clock, 
  Phone, 
  Video, 
  MessageSquare, 
  MoreVertical,
  CalendarCheck2,
  AlertCircle,
  ExternalLink,
  Heart
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
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 14px;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
    }
    .btn-ghost:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; }
    .btn-ghost-icon {
      padding: 10px; border-radius: 50%; background: transparent;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .btn-ghost-icon:hover { border-color: var(--charcoal); background: var(--charcoal); color: #fff; }
    .btn-sage {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--sage); color: #fff;
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-sage:hover { background: var(--sage-hover); transform: translateY(-2px); }
    .btn-sage:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .btn-link {
      background: none; border: none; color: var(--sage); font-size: 14px;
      font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
      padding: 0; transition: color 0.2s;
    }
    .btn-link:hover { color: var(--sage-hover); text-decoration: underline; }
    .card {
      background: #fff; border: 1px solid var(--border);
      border-radius: var(--r-md); box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .badge-confirmed {
      background: #d1fae5;
      color: #065f46;
    }
    .badge-pending {
      background: #fed7aa;
      color: #92400e;
    }
    .badge-cancelled {
      background: #fee2e2;
      color: #b91c1c;
    }
    .badge-default {
      background: var(--sage-light);
      color: var(--muted);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    .tabs {
      display: flex;
      background: var(--sage-light);
      padding: 4px;
      border-radius: 12px;
      width: 100%;
    }
    .tab {
      flex: 1;
      padding: 10px;
      border: none;
      background: transparent;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: var(--body);
      cursor: pointer;
      transition: all 0.2s;
    }
    .tab.active {
      background: #fff;
      color: var(--sage);
      box-shadow: var(--shadow-sm);
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--sage-light);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--sage);
      font-weight: 600;
      font-size: 18px;
      border: 2px solid #fff;
      box-shadow: var(--shadow-sm);
    }
  `;
  document.head.appendChild(s);
})();

/* ── Helper for class merging ── */
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    getUserAppointments()
      .then((res) => setAppointments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed": return "badge-confirmed";
      case "pending": return "badge-pending";
      case "cancelled": return "badge-cancelled";
      default: return "badge-default";
    }
  };

  const upcoming = appointments.filter(a => !isPast(parseISO(a.date)));
  const history = appointments.filter(a => isPast(parseISO(a.date)));

  if (loading) {
    return (
      <div style={{
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cream)"
      }}>
        <div style={{
          width: 32,
          height: 32,
          border: "3px solid var(--sage-light)",
          borderTopColor: "var(--sage)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const AppointmentCard = ({ a }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column" }} className="md:flex-row">
          
          {/* Left Side: Status & Time */}
          <div style={{
            padding: "24px",
            background: "var(--cream)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderBottom: "1px solid var(--border)"
          }} className="md:border-b-0 md:border-r md:w-48">
            
            <span className={`badge ${getStatusColor(a.status)}`} style={{ marginBottom: 12, textTransform: "capitalize" }}>
              {a.status || "Scheduled"}
            </span>
            
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--charcoal)" }}>
              {format(parseISO(a.date), "EEE, MMM do")}
            </p>
            
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={12} />
              {a.timeSlot}
            </p>
          </div>

          {/* Right Side: Details */}
          <div style={{ flex: 1, padding: 24 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 16 }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Avatar */}
                <div className="avatar">
                  {a.counsellorId?.name?.charAt(0) || "C"}
                </div>
                
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--charcoal)", marginBottom: 2 }}>
                    {a.counsellorId?.name || "Counsellor Removed"}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic", textTransform: "capitalize" }}>
                    {a.meetingType || "Voice Call"} Session
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                {a.counsellorId?.phone && (
                  <a
                    href={`tel:${a.counsellorId.phone}`}
                    className="btn-ghost-icon"
                    style={{ width: 36, height: 36 }}
                    title="Call"
                  >
                    <Phone size={16} color="var(--sage)" />
                  </a>
                )}
                <button className="btn-ghost-icon" style={{ width: 36, height: 36 }}>
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <button className="btn-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Video size={16} />
                  <span>Join Meeting</span>
                </button>
                <button className="btn-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <MessageSquare size={16} />
                  <span>Chat</span>
                </button>
              </div>

              <button className="btn-link" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                View Details
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "40px 20px",
      minHeight: "100vh",
      background: "var(--cream)",
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: "rgba(107,158,107,0.05)", top: -100, right: -100 }} />
      <div className="blob" style={{ width: 300, height: 300, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ position: "relative", zIndex: 10, marginBottom: 32 }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 300, marginBottom: 8 }}>
              My <span style={{ color: "var(--sage)" }}>Appointments</span>
            </h1>
            <p style={{ color: "var(--muted)" }}>
              Manage your scheduled therapy sessions and history.
            </p>
          </div>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "var(--sage-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <CalendarCheck2 size={28} color="var(--sage)" />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div style={{ marginBottom: 32, position: "relative", zIndex: 10 }}>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
            {upcoming.length > 0 && (
              <span style={{
                marginLeft: 8,
                padding: "2px 8px",
                background: "var(--sage-light)",
                color: "var(--sage)",
                borderRadius: 100,
                fontSize: 11
              }}>
                {upcoming.length}
              </span>
            )}
          </button>
          <button
            className={`tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Past Sessions
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" ? (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {upcoming.length > 0 ? (
                upcoming.map((a) => <AppointmentCard key={a._id} a={a} />)
              ) : (
                <NoAppointments message="No upcoming sessions found." />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              {history.length > 0 ? (
                history.map((a) => <AppointmentCard key={a._id} a={a} />)
              ) : (
                <NoAppointments message="You haven't had any sessions yet." />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          marginTop: 48,
          padding: 16,
          border: "1px dashed var(--border)",
          borderRadius: 12,
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          background: "var(--cream)",
          position: "relative",
          zIndex: 10
        }}
      >
        <AlertCircle size={20} color="var(--muted)" style={{ flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>
          Need to reschedule? Please contact your counsellor at least 24 hours in advance. 
          Session links will appear 5 minutes before the start time.
        </p>
      </motion.div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const NoAppointments = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{
      textAlign: "center",
      padding: "80px 20px",
      border: "2px dashed var(--border)",
      borderRadius: 16
    }}
  >
    <div style={{
      width: 64,
      height: 64,
      background: "var(--sage-light)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
      color: "var(--sage)"
    }}>
      <Calendar size={32} />
    </div>
    <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{message}</h3>
    <button className="btn-link" style={{ fontSize: 14 }}>
      Browse available counsellors
    </button>
  </motion.div>
);

export default MyAppointments;