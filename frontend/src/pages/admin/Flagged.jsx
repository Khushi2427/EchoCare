import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, AlertTriangle, User, Mail, Calendar, Shield, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

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
      padding: 8px 16px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 13px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-danger {
      display: inline-flex; align-items: center; gap: 8px;
      background: #ef4444; color: #fff;
      padding: 8px 16px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 13px;
      border: none; cursor: pointer; transition: all 0.25s ease;
    }
    .btn-danger:hover { background: #dc2626; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(239,68,68,0.2); }
    .card {
      background: #fff; border: 1px solid var(--border);
      border-radius: var(--r-md); box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
      padding: 20px;
    }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 10px;
      border-radius: 100px;
    }
    .badge-critical {
      background: #fee2e2;
      color: #b91c1c;
    }
    .badge-high {
      background: #fee2e2;
      color: #b91c1c;
    }
    .badge-medium {
      background: #fed7aa;
      color: #92400e;
    }
    .badge-low {
      background: #d1fae5;
      color: #065f46;
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
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

const Flagged = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlaggedStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/flagged-students`
      );
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching flagged students", error);
    } finally {
      setLoading(false);
    }
  };

  const removeStudent = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/flagged-students/${id}`
      );

      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error removing student", error);
    }
  };

  useEffect(() => {
    fetchFlaggedStudents();
  }, []);

  const getRiskBadge = (riskLevel) => {
    switch(riskLevel) {
      case 'critical': return 'badge-critical';
      case 'high': return 'badge-high';
      case 'medium': return 'badge-medium';
      default: return 'badge-low';
    }
  };

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
        <p style={{ marginLeft: 12, color: "var(--charcoal)" }}>Loading flagged students...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      padding: "24px",
      maxWidth: 1000,
      margin: "0 auto",
      position: "relative",
      minHeight: "100vh",
      background: "var(--cream)"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: "rgba(107,158,107,0.05)", top: -100, right: -50 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <div style={{ position: "relative", zIndex: 10 }}>
        
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <AlertTriangle size={24} color="#b91c1c" />
            </div>
            <div>
              <h1 className="serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 4 }}>
                Flagged <span style={{ color: "var(--sage)" }}>Students</span>
              </h1>
              <p style={{ fontSize: 14, color: "var(--charcoal)" }}>
                Students who need immediate attention and support
              </p>
            </div>
          </div>
          
          {/* Stats Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
            <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>
              {students.length} Student{students.length !== 1 ? 's' : ''} Flagged
            </span>
          </div>
        </motion.div>

        {/* Content */}
        {students.length === 0 ? (
          <motion.div
            {...fadeUp(0.1)}
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#fff",
              borderRadius: 16,
              border: "1px solid var(--border)"
            }}
          >
            <div style={{
              width: 64,
              height: 64,
              background: "var(--cream)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Shield size={32} color="var(--muted)" />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>All clear!</h3>
            <p style={{ color: "var(--charcoal)" }}>No students currently flagged for support.</p>
          </motion.div>
        ) : (
          <motion.div {...fadeUp(0.1)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {students.map((student, index) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="card" style={{
                  border: "1px solid #fee2e2",
                  boxShadow: "0 4px 12px rgba(239,68,68,0.05)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>

                    {/* Student Info */}
                    <div style={{ flex: 1 }}>
                      {/* Name and Email */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <div style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: "var(--sage-light)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--sage)",
                          fontWeight: 600,
                          fontSize: 16
                        }}>
                          {student.userId?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--charcoal)" }}>
                            {student.userId?.name || "Unknown User"}
                          </h3>
                          <p style={{ fontSize: 13, color: "var(--sage)", display: "flex", alignItems: "center", gap: 4 }}>
                            <Mail size={12} />
                            {student.userId?.email || "No email"}
                          </p>
                        </div>
                      </div>

                      {/* Role and Risk Level */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <span style={{ fontSize: 12, color: "var(--sage)", display: "flex", alignItems: "center", gap: 4 }}>
                          <Shield size={12} />
                          {student.userId?.role || "Student"}
                        </span>
                        <span className={`badge ${getRiskBadge(student.riskLevel)}`}>
                          <AlertCircle size={12} />
                          {student.riskLevel} risk
                        </span>
                      </div>

                      {/* Reason */}
                      {student.reason && (
                        <div style={{
                          background: "var(--cream)",
                          padding: "12px 16px",
                          borderRadius: 8,
                          marginBottom: 12
                        }}>
                          <p style={{ fontSize: 13, color: "var(--charcoal)" }}>
                            <span style={{ fontWeight: 600 }}>Reason:</span> {student.reason}
                          </p>
                        </div>
                      )}

                      {/* Conversation Snippet */}
                      {student.conversationSnippet && (
                        <div style={{
                          background: "var(--cream)",
                          padding: "12px 16px",
                          borderRadius: 8,
                          marginBottom: 12,
                          border: "1px solid var(--border)"
                        }}>
                          <p style={{ fontSize: 13, color: "var(--charcoal)" }}>
                            <span style={{ fontWeight: 600 }}>Conversation:</span> {student.conversationSnippet}
                          </p>
                        </div>
                      )}

                      {/* Timestamp */}
                      <p style={{ fontSize: 11, color: "var(--light-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Calendar size={10} />
                        {student.createdAt ? new Date(student.createdAt).toLocaleString() : 'Date unknown'}
                      </p>
                    </div>

                    {/* Resolve Button */}
                    <button
                      onClick={() => removeStudent(student._id)}
                      className="btn-danger"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 16px",
                        whiteSpace: "nowrap"
                      }}
                    >
                      <Trash2 size={14} />
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Flagged;