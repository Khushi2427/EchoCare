import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Loader2,
  Save,
  ShieldCheck,
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
    .card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    input, textarea {
      font-family: 'Outfit', sans-serif;
    }
    input:focus {
      outline: none;
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

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setForm(res.data);
      })
      .catch(() => toast.error("Failed to load profile data"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile({
        name: form.name,
        phone: form.phone,
      });
      toast.success("Profile updated successfully", {
        description: "Your changes have been saved to our servers.",
      });
    } catch (error) {
      toast.error("Update failed", {
        description: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        background: "var(--cream)"
      }}>
        <Loader2 size={32} color="var(--sage)" style={{ animation: "spin 1s linear infinite", marginBottom: 12 }} />
        <p style={{ color: "var(--muted)", fontWeight: 500 }}>Loading your profile...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      padding: "40px 20px",
      position: "relative",
      minHeight: "100vh",
      background: "var(--cream)"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: "rgba(107,158,107,0.05)", top: -100, right: -100 }} />
      <div className="blob" style={{ width: 300, height: 300, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <motion.div
        {...fadeUp(0)}
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--sage-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px"
          }}>
            <Heart size={32} color="var(--sage)" />
          </div>
          <h1 className="serif" style={{ fontSize: 32, fontWeight: 300, marginBottom: 8 }}>
            Your <span style={{ color: "var(--sage)" }}>Profile</span>
          </h1>
          <p style={{ color: "var(--muted)" }}>Manage your account information and preferences.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gap: 24 }}>
            {/* Profile Card */}
            <div className="card" style={{ overflow: "hidden" }}>
              {/* Card Header */}
              <div style={{
                padding: "24px 24px 16px 24px",
                borderBottom: "1px solid var(--border)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <User size={20} color="var(--sage)" />
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: "var(--charcoal)" }}>Personal Information</h2>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>
                  This information will be visible to your assigned counsellors.
                </p>
              </div>

              {/* Card Content */}
              <div style={{ padding: "24px" }}>
                <div style={{ display: "grid", gap: 20 }}>
                  
                  {/* Name Field */}
                  <div style={{ display: "grid", gap: 6 }}>
                    <label htmlFor="name" style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>
                      Full Name
                    </label>
                    <div style={{ position: "relative" }}>
                      <User size={16} style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--muted)"
                      }} />
                      <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 42px",
                          background: "var(--cream)",
                          border: "1px solid var(--border)",
                          borderRadius: 10,
                          fontSize: 14,
                          color: "var(--charcoal)",
                          outline: "none",
                          transition: "border-color 0.2s"
                        }}
                        placeholder="John Doe"
                        required
                        onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>
                  </div>

                  {/* Email Field (Disabled) */}
                  <div style={{ display: "grid", gap: 6 }}>
                    <label htmlFor="email" style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>
                      Email Address
                    </label>
                    <div style={{ position: "relative" }}>
                      <Mail size={16} style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--muted)"
                      }} />
                      <input
                        id="email"
                        value={form.email}
                        disabled
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 42px",
                          background: "var(--cream)",
                          border: "1px dashed var(--border)",
                          borderRadius: 10,
                          fontSize: 14,
                          color: "var(--muted)",
                          outline: "none",
                          cursor: "not-allowed"
                        }}
                      />
                    </div>
                    <p style={{ fontSize: 11, color: "var(--light-muted)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <ShieldCheck size={12} />
                      Email cannot be changed for security reasons.
                    </p>
                  </div>

                  {/* Phone Field */}
                  <div style={{ display: "grid", gap: 6 }}>
                    <label htmlFor="phone" style={{ fontSize: 13, fontWeight: 500, color: "var(--charcoal)" }}>
                      Phone Number
                    </label>
                    <div style={{ position: "relative" }}>
                      <Phone size={16} style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--muted)"
                      }} />
                      <input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "12px 12px 12px 42px",
                          background: "var(--cream)",
                          border: "1px solid var(--border)",
                          borderRadius: 10,
                          fontSize: 14,
                          color: "var(--charcoal)",
                          outline: "none",
                          transition: "border-color 0.2s"
                        }}
                        placeholder="+91 98765 43210"
                        onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                        onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{
                padding: "16px 24px",
                background: "var(--cream)",
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "flex-end"
              }}>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="btn-primary"
                  style={{
                    padding: "12px 28px",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    minWidth: 140,
                    justifyContent: "center",
                    background: isUpdating ? "var(--muted)" : "var(--charcoal)",
                    cursor: isUpdating ? "not-allowed" : "pointer"
                  }}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;