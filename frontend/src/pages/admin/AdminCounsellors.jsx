import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  UserPlus,
  Trash2,
  Edit2,
  Clock,
  Calendar,
  Users,
  Phone,
  Mail,
  Key,
  User,
  Tag,
  X,
  Plus,
  Save,
  AlertCircle,
  CheckCircle,
  Shield,
  Heart,
  Sparkles
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
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 8px 16px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 13px;
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
    .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .badge-success {
      background: #d1fae5;
      color: #065f46;
    }
    .badge-info {
      background: var(--sage-light);
      color: var(--sage);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    input, select, textarea {
      font-family: 'Outfit', sans-serif;
    }
    input:focus, select:focus, textarea:focus {
      outline: none;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      text-align: left;
      padding: 16px 20px;
      font-size: 12px;
      font-weight: 600;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--border);
      background: var(--cream);
    }
    td {
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
      color: var(--body);
      font-size: 14px;
    }
    tr:last-child td {
      border-bottom: none;
    }
    tr:hover td {
      background: var(--cream);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(s);
})();

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", 
  "17:00", "18:00", "19:00", "20:00"
];

const AdminCounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [availabilityList, setAvailabilityList] = useState([]);
  const [availabilityDay, setAvailabilityDay] = useState("");
  const [availabilitySlots, setAvailabilitySlots] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    specialization: "",
    phone: "",
    email: "",
  });

  const adminToken = localStorage.getItem("token");

  // 🔹 Fetch counsellors
  const fetchCounsellors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/counsellors`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setCounsellors(res.data);
    } catch (error) {
      console.error("Error fetching counsellors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounsellors();
  }, []);

  // 🔹 Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add availability
  const addAvailability = () => {
    if (!availabilityDay || !availabilitySlots) return;

    setAvailabilityList([
      ...availabilityList,
      {
        day: availabilityDay,
        slots: availabilitySlots.split(",").map((s) => s.trim()),
      },
    ]);

    setAvailabilityDay("");
    setAvailabilitySlots("");
  };

  // 🔹 Remove availability
  const removeAvailability = (index) => {
    setAvailabilityList(
      availabilityList.filter((_, i) => i !== index)
    );
  };

  // 🔹 Create counsellor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const payload = {
        ...form,
        specialization: form.specialization.split(",").map((s) => s.trim()),
        availability: availabilityList,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/counsellors`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setSuccessMessage("Counsellor created successfully!");
      setForm({
        name: "",
        username: "",
        password: "",
        specialization: "",
        phone: "",
        email: "",
      });
      setAvailabilityList([]);
      setShowForm(false);
      fetchCounsellors();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error creating counsellor:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete counsellor
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/counsellors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      fetchCounsellors();
    } catch (error) {
      console.error("Error deleting counsellor:", error);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      padding: "24px",
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: "var(--sage-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Users size={24} color="var(--sage)" />
                </div>
                <div>
                  <h1 className="serif" style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 300, marginBottom: 4 }}>
                    Counsellor <span style={{ color: "var(--sage)" }}>Management</span>
                  </h1>
                  <p style={{ fontSize: 14, color: "var(--muted)" }}>
                    Manage your team of mental health professionals
                  </p>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <span className="badge badge-info">
                  {counsellors.length} Active Counsellors
                </span>
                <span className="badge badge-success">
                  All Systems Operational
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px" }}
            >
              <UserPlus size={18} />
              {showForm ? "Cancel" : "Add Counsellor"}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div style={{
            marginBottom: 24,
            padding: "16px 20px",
            background: "#d1fae5",
            border: "1px solid #a7f3d0",
            borderRadius: 12,
            animation: "fadeIn 0.3s ease-out"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <CheckCircle size={20} color="#065f46" />
              <div>
                <p style={{ fontWeight: 600, color: "#065f46", marginBottom: 2 }}>{successMessage}</p>
                <p style={{ fontSize: 13, color: "#047857" }}>The counsellor has been added to the system</p>
              </div>
            </div>
          </div>
        )}

        {/* CREATE FORM */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 32 }}
            className="card"
          >
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--border)",
              background: "var(--cream)"
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                <UserPlus size={20} color="var(--sage)" />
                Add New Counsellor
              </h2>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Fill in the counsellor's details and availability</p>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: 24 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24
              }}>
                {/* Left Column - Basic Info */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <User size={14} color="var(--sage)" />
                      Full Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="name"
                      placeholder="Dr. John Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 14,
                        color: "var(--charcoal)"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <User size={14} color="var(--sage)" />
                      Username <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="username"
                      placeholder="john.smith"
                      value={form.username}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 14,
                        color: "var(--charcoal)"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <Key size={14} color="var(--sage)" />
                      Password <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 14,
                        color: "var(--charcoal)"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <Tag size={14} color="var(--sage)" />
                      Specialization <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="specialization"
                      placeholder="Anxiety, Depression, Stress Management"
                      value={form.specialization}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 14,
                        color: "var(--charcoal)"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                    />
                    <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>Separate specializations with commas</p>
                  </div>
                </div>

                {/* Right Column - Contact & Availability */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <Phone size={14} color="var(--sage)" />
                      Phone Number <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 14,
                        color: "var(--charcoal)"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                      <Mail size={14} color="var(--sage)" />
                      Email Address <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john.smith@clinic.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        fontSize: 14,
                        color: "var(--charcoal)"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>

                  {/* AVAILABILITY */}
                  <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      <Clock size={18} color="var(--sage)" />
                      Set Availability
                    </h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12
                      }}>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--charcoal)", marginBottom: 4 }}>Day</label>
                          <select
                            value={availabilityDay}
                            onChange={(e) => setAvailabilityDay(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              background: "var(--cream)",
                              border: "1px solid var(--border)",
                              borderRadius: 6,
                              fontSize: 13,
                              color: "var(--charcoal)"
                            }}
                          >
                            <option value="">Select a day</option>
                            {days.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--charcoal)", marginBottom: 4 }}>Time Slots</label>
                          <select
                            value={availabilitySlots}
                            onChange={(e) => setAvailabilitySlots(e.target.value)}
                            style={{
                              width: "100%",
                              padding: "10px 12px",
                              background: "var(--cream)",
                              border: "1px solid var(--border)",
                              borderRadius: 6,
                              fontSize: 13,
                              color: "var(--charcoal)"
                            }}
                          >
                            <option value="">Select time slots</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={addAvailability}
                        disabled={!availabilityDay || !availabilitySlots}
                        className="btn-outline"
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          padding: "10px",
                          opacity: (!availabilityDay || !availabilitySlots) ? 0.5 : 1,
                          cursor: (!availabilityDay || !availabilitySlots) ? "not-allowed" : "pointer"
                        }}
                      >
                        <Plus size={14} />
                        Add Time Slot
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Added Availability Display */}
              {availabilityList.length > 0 && (
                <div style={{
                  marginTop: 24,
                  padding: 16,
                  background: "var(--cream)",
                  borderRadius: 8,
                  border: "1px solid var(--border)"
                }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Scheduled Availability</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {availabilityList.map((a, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 12px",
                          background: "#fff",
                          borderRadius: 6,
                          border: "1px solid var(--border)"
                        }}
                      >
                        <Calendar size={14} color="var(--sage)" />
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{a.day}</span>
                        <span style={{ color: "var(--muted)" }}>•</span>
                        <span style={{ fontSize: 12 }}>{a.slots.join(", ")}</span>
                        <button
                          type="button"
                          onClick={() => removeAvailability(index)}
                          style={{
                            padding: 2,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#ef4444"
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 24px",
                    background: loading ? "var(--muted)" : "var(--sage)",
                    cursor: loading ? "not-allowed" : "pointer"
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{ width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Create Counsellor
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* COUNSELLORS LIST */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--cream)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={20} color="var(--sage)" />
              Active Counsellors
              <span style={{
                marginLeft: 8,
                padding: "2px 10px",
                background: "var(--sage-light)",
                color: "var(--sage)",
                borderRadius: 100,
                fontSize: 12
              }}>
                {counsellors.length}
              </span>
            </h2>
          </div>

          {loading ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, border: "4px solid var(--sage-light)", borderTopColor: "var(--sage)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
              <p style={{ color: "var(--muted)" }}>Loading counsellors...</p>
            </div>
          ) : counsellors.length === 0 ? (
            <div style={{ padding: "48px 24px", textAlign: "center" }}>
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
                <Users size={32} color="var(--muted)" />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No counsellors found</h3>
              <p style={{ color: "var(--muted)", marginBottom: 16 }}>Add your first counsellor to get started</p>
              <button
                onClick={() => setShowForm(true)}
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <UserPlus size={16} />
                Add Counsellor
              </button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Counsellor</th>
                    <th>Contact</th>
                    <th>Specialization</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {counsellors.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "var(--sage-light)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--sage)",
                            fontWeight: 600
                          }}>
                            {c.name?.charAt(0)?.toUpperCase() || "C"}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "var(--charcoal)" }}>{c.name}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)" }}>@{c.username}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                            <Mail size={12} color="var(--muted)" />
                            {c.email}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                            <Phone size={12} color="var(--muted)" />
                            {c.phone}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {Array.isArray(c.specialization) && c.specialization.map((spec, index) => (
                            <span
                              key={index}
                              style={{
                                padding: "4px 10px",
                                background: "var(--sage-light)",
                                color: "var(--sage)",
                                borderRadius: 100,
                                fontSize: 11,
                                fontWeight: 500
                              }}
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4 }}>
                          <button
                            onClick={() => {/* Edit functionality would go here */}}
                            className="btn-ghost-icon"
                            style={{ width: 32, height: 32 }}
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(c._id, c.name)}
                            className="btn-ghost-icon"
                            style={{ width: 32, height: 32, color: "#ef4444" }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Stats Footer */}
          {counsellors.length > 0 && (
            <div style={{
              padding: "12px 24px",
              background: "var(--cream)",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 13,
              color: "var(--muted)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Shield size={14} color="#10b981" />
                  <span>All accounts active</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Calendar size={14} color="var(--sage)" />
                  <span>Ready for appointments</span>
                </div>
              </div>
              <div>
                Showing {counsellors.length} counsellor{counsellors.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCounsellors;