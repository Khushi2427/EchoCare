import React, { useState, useEffect } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Lock, Mail, AlertCircle,
  Shield, Brain, ChevronLeft, Heart,
  CheckCircle, ArrowRight,
} from "lucide-react";

/* ── Fonts (shared with homepage, guarded) ── */
(() => {
  if (document.getElementById("ec-fonts")) return;
  const l = document.createElement("link");
  l.id = "ec-fonts";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";
  l.rel = "stylesheet";
  document.head.appendChild(l);
})();

/* ── Scoped CSS (only what inline can't do: :focus, :hover, :placeholder, @keyframes, @media) ── */
(() => {
  if (document.getElementById("ec-login-css")) return;
  const s = document.createElement("style");
  s.id = "ec-login-css";
  s.textContent = `
    .ec-input {
      width: 100%;
      padding: 13px 16px 13px 44px;
      background: #F5F5F2;
      border: 1.5px solid rgba(0,0,0,0.08);
      border-radius: 14px;
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      color: #1A1A1A;
      outline: none;
      transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
    }
    .ec-input::placeholder { color: #A8A8A8; }
    .ec-input:focus {
      background: #fff;
      border-color: #6B9E6B;
      box-shadow: 0 0 0 4px rgba(107,158,107,0.12);
    }
    .ec-input:disabled { opacity: 0.5; cursor: not-allowed; }

    .ec-submit {
      width: 100%;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      background: #1A1A1A; color: #fff;
      padding: 14px 28px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer;
      transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
    }
    .ec-submit:hover:not(:disabled) {
      background: #2C2C2C;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.18);
    }
    .ec-submit:disabled { background: #D0D0CC; cursor: not-allowed; }

    .ec-feature-row { display: flex; align-items: flex-start; gap: 14px; }
    .ec-feature-icon {
      width: 36px; height: 36px; border-radius: 10px;
      background: rgba(107,158,107,0.14);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; transition: background 0.25s;
    }
    .ec-feature-row:hover .ec-feature-icon { background: rgba(107,158,107,0.26); }

    .ec-back {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.09em;
      text-transform: uppercase; color: #A0A0A0;
      transition: color 0.22s; font-family: 'Outfit', sans-serif;
      text-decoration: none;
    }
    .ec-back:hover { color: #6B9E6B; }

    .ec-register-link { color: #6B9E6B; font-weight: 600; transition: opacity 0.2s; text-decoration: none; }
    .ec-register-link:hover { opacity: 0.72; }

    .ec-forgot { font-size: 12px; font-weight: 500; color: #6B9E6B; transition: opacity 0.2s; text-decoration: none; }
    .ec-forgot:hover { opacity: 0.72; }

    .ec-eye { background: none; border: none; cursor: pointer; padding: 2px; color: #A0A0A0; display: flex; align-items: center; transition: color 0.2s; }
    .ec-eye:hover { color: #6B9E6B; }

    .ec-check { width: 15px; height: 15px; border-radius: 5px; accent-color: #6B9E6B; cursor: pointer; }

    @keyframes ec-spin { to { transform: rotate(360deg); } }
    .ec-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: ec-spin 0.7s linear infinite; }

    @keyframes ec-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .ec-dot-pulse { animation: ec-pulse 2s ease-in-out infinite; }

    @media (max-width: 700px) {
      .ec-card { grid-template-columns: 1fr !important; }
      .ec-sidebar { display: none !important; }
      .ec-form-panel { padding: 40px 28px !important; }
    }
  `;
  document.head.appendChild(s);
})();

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [remember, setRemember] = useState(false);

  const { login, user } = useAuth();
  const navigate        = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser({ email, password });
      login(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    if      (user.role === "admin")      navigate("/admin",      { replace: true });
    else if (user.role === "counsellor") navigate("/counsellor", { replace: true });
    else                                 navigate("/student",    { replace: true });
  }, [user, navigate]);

  /* ── design tokens — identical to Home.jsx ── */
  const C = {
    cream:     "#FAFAF7",
    charcoal:  "#1A1A1A",
    charcoal2: "#2C2C2C",
    sage:      "#6B9E6B",
    sageLight: "#EEF5EE",
    warm:      "#F6F0E8",
    body:      "#4A4A4A",
    muted:     "#7A7A7A",
    border:    "rgba(0,0,0,0.07)",
    serif:     "'Cormorant Garamond', serif",
    sans:      "'Outfit', sans-serif",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: C.cream,
      fontFamily: C.sans,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
      WebkitFontSmoothing: "antialiased",
    }}>

      {/* ── Blobs — identical to homepage hero ── */}
      <div style={{ position:"absolute", borderRadius:"50%", pointerEvents:"none", filter:"blur(72px)", width:520, height:520, background:"rgba(107,158,107,0.09)", top:-120, right:-100 }} />
      <div style={{ position:"absolute", borderRadius:"50%", pointerEvents:"none", filter:"blur(72px)", width:340, height:340, background:"rgba(246,240,232,0.85)", bottom:-60, left:-80 }} />

      {/* ── Card ── */}
      <motion.div
        className="ec-card"
        initial={{ opacity:0, y:26 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.65, ease:[0.25,0.1,0.25,1] }}
        style={{
          width: "100%",
          maxWidth: 980,
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.09)",
          border: `1px solid ${C.border}`,
          position: "relative",
          zIndex: 1,
        }}
      >

        {/* ══════════════════════════════════════
            LEFT SIDEBAR — dark charcoal panel
            mirrors the homepage Admin section
        ══════════════════════════════════════ */}
        <div className="ec-sidebar" style={{
          background: C.charcoal,
          padding: "52px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Dot grid overlay */}
          <div style={{ position:"absolute", inset:0, opacity:0.03, pointerEvents:"none", backgroundImage:"radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize:"22px 22px" }} />
          {/* Sage glow */}
          <div style={{ position:"absolute", width:260, height:260, borderRadius:"50%", background:"rgba(107,158,107,0.07)", filter:"blur(60px)", bottom:-60, right:-60, pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:1 }}>

            {/* Logo — identical to navbar */}
            <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:52, textDecoration:"none" }}>
              <div style={{ width:34, height:34, borderRadius:10, background:C.sage, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Heart size={16} color="#fff" />
              </div>
              <span style={{ fontFamily:C.serif, fontWeight:500, fontSize:20, color:"#fff", letterSpacing:"0.01em" }}>
                EchoCare
              </span>
            </Link>

            {/* Headline — same Cormorant italic style as hero h1 */}
            <h2 style={{ fontFamily:C.serif, fontWeight:300, fontSize:"clamp(28px, 3.2vw, 42px)", color:"#fff", lineHeight:1.18, letterSpacing:"-0.02em", marginBottom:16 }}>
              Welcome back<br />
              <em style={{ fontStyle:"italic", color:C.sage }}>to your safe space.</em>
            </h2>
            <p style={{ fontSize:14, fontWeight:300, color:"rgba(255,255,255,0.5)", lineHeight:1.78, marginBottom:48, maxWidth:280, fontFamily:C.sans }}>
              Sign in to access your personalised wellness dashboard and continue your journey.
            </p>

            {/* Feature rows — mirrors the homepage trust checklist */}
            <div style={{ display:"flex", flexDirection:"column", gap:22 }}>
              {[
                { icon:<Shield size={16} color={C.sage} />,      title:"Secure Access",        desc:"End-to-end encrypted sessions" },
                { icon:<Brain size={16} color={C.sage} />,        title:"Role-Based Dashboard", desc:"Tailored for students, counsellors & admins" },
                { icon:<CheckCircle size={16} color={C.sage} />,  title:"100% Confidential",    desc:"Your data is never shared or sold" },
              ].map((f, i) => (
                <div key={i} className="ec-feature-row">
                  <div className="ec-feature-icon">{f.icon}</div>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:600, color:"#fff", marginBottom:3, fontFamily:C.sans }}>{f.title}</div>
                    <div style={{ fontSize:12.5, fontWeight:300, color:"rgba(255,255,255,0.46)", lineHeight:1.6, fontFamily:C.sans }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stat row — mirrors hero stats block */}
          <div style={{ position:"relative", zIndex:1, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.08)", marginTop:44 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              {/* Avatar stack — identical to homepage community card */}
              <div style={{ display:"flex" }}>
                {["#B8D4B8","#9FC49F","#8FAF8F","#7a9e7a"].map((c, i) => (
                  <div key={i} style={{ width:30, height:30, borderRadius:"50%", background:c, border:`2.5px solid ${C.charcoal}`, marginLeft:i===0?0:-9, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontSize:9, color:"#fff", fontWeight:700 }}>{["P","A","K","R"][i]}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.75)", fontFamily:C.sans }}>15,000+ students</div>
                <div style={{ fontSize:11, fontWeight:300, color:"rgba(255,255,255,0.38)", marginTop:2, fontFamily:C.sans }}>trust EchoCare every day</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT PANEL — white form
            mirrors homepage step-cards style
        ══════════════════════════════════════ */}
        <div className="ec-form-panel" style={{
          background: "#fff",
          padding: "56px 52px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}>
          <div style={{ maxWidth:390, width:"100%", margin:"0 auto" }}>

            {/* Eyebrow + heading — exact homepage section pattern */}
            <motion.div
              initial={{ opacity:0, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay:0.18, ease:[0.25,0.1,0.25,1] }}
              style={{ marginBottom:36 }}
            >
              <span style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:C.sage, marginBottom:12, fontFamily:C.sans }}>
                Member Access
              </span>
              <h1 style={{ fontFamily:C.serif, fontWeight:300, fontSize:"clamp(28px, 3vw, 40px)", color:C.charcoal, lineHeight:1.15, letterSpacing:"-0.022em", marginBottom:12 }}>
                Sign in to your<br />
                <em style={{ fontStyle:"italic", color:C.sage }}>account.</em>
              </h1>
              <p style={{ fontSize:14, fontWeight:300, color:C.muted, lineHeight:1.7, fontFamily:C.sans }}>
                New here?{" "}
                <Link to="/register" className="ec-register-link">Create an account</Link>
              </p>
            </motion.div>

            {/* ── Form ── */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity:0, y:14 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay:0.28, ease:[0.25,0.1,0.25,1] }}
              style={{ display:"flex", flexDirection:"column", gap:22 }}
            >

              {/* Email */}
              <div>
                <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.09em", textTransform:"uppercase", color:C.muted, marginBottom:8, fontFamily:C.sans }}>
                  Email Address
                </label>
                <div style={{ position:"relative" }}>
                  <Mail size={15} color={C.muted} style={{ position:"absolute", left:15, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com" className="ec-input" required disabled={loading} />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <label style={{ fontSize:11, fontWeight:600, letterSpacing:"0.09em", textTransform:"uppercase", color:C.muted, fontFamily:C.sans }}>
                    Password
                  </label>
                  <Link to="/forgot-password" className="ec-forgot">Forgot password?</Link>
                </div>
                <div style={{ position:"relative" }}>
                  <Lock size={15} color={C.muted} style={{ position:"absolute", left:15, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                  <input type={showPw ? "text" : "password"} value={password}
                    onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    className="ec-input" style={{ paddingRight:46 }} required disabled={loading} />
                  <button type="button" onClick={() => setShowPw(v => !v)} className="ec-eye"
                    style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <input type="checkbox" id="ec-remember" checked={remember}
                  onChange={e => setRemember(e.target.checked)} className="ec-check" />
                <label htmlFor="ec-remember" style={{ fontSize:13.5, fontWeight:300, color:C.body, cursor:"pointer", userSelect:"none", fontFamily:C.sans }}>
                  Keep me signed in
                </label>
              </div>

              {/* Error — same banner style as homepage alert tiles */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity:0, y:-8, scale:0.98 }}
                    animate={{ opacity:1, y:0, scale:1 }}
                    exit={{ opacity:0, y:-6 }}
                    transition={{ duration:0.25 }}
                    style={{ display:"flex", alignItems:"center", gap:9, padding:"12px 16px", borderRadius:12, background:"#FEF2F2", border:"1px solid rgba(239,68,68,0.14)", fontSize:13, fontWeight:500, color:"#DC2626", fontFamily:C.sans }}
                  >
                    <AlertCircle size={14} style={{ flexShrink:0 }} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit — same pill shape as homepage btn-primary-ec */}
              <button type="submit" disabled={loading} className="ec-submit" style={{ marginTop:2 }}>
                {loading
                  ? <div className="ec-spinner" />
                  : <><span>Sign In to Dashboard</span><ArrowRight size={16} /></>
                }
              </button>

            </motion.form>

            {/* Footer */}
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.5, delay:0.42 }}
              style={{ marginTop:32, paddingTop:24, borderTop:"1px solid rgba(0,0,0,0.07)", display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}
            >
              <Link to="/" className="ec-back"><ChevronLeft size={13} /> Back to Website</Link>
              <div style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, fontWeight:300, color:C.muted, fontFamily:C.sans }}>
                <div className="ec-dot-pulse" style={{ width:6, height:6, borderRadius:"50%", background:"#4CAF50", flexShrink:0 }} />
                All sessions are 100% confidential and encrypted
              </div>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}