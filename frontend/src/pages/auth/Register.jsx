import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Lock, User, Eye, EyeOff,
  CheckCircle, XCircle, ArrowRight,
  ChevronLeft, Heart, Shield, Sparkles,
} from "lucide-react";

/* ── Fonts (shared, guarded) ── */
(() => {
  if (document.getElementById("ec-fonts")) return;
  const l = document.createElement("link");
  l.id = "ec-fonts";
  l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";
  l.rel = "stylesheet";
  document.head.appendChild(l);
})();

/* ── Scoped CSS ── */
(() => {
  if (document.getElementById("ec-reg-css")) return;
  const s = document.createElement("style");
  s.id = "ec-reg-css";
  s.textContent = `
    .ecr-input {
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
    .ecr-input::placeholder { color: #A8A8A8; }
    .ecr-input:focus {
      background: #fff;
      border-color: #6B9E6B;
      box-shadow: 0 0 0 4px rgba(107,158,107,0.12);
    }
    .ecr-input:disabled { opacity: 0.5; cursor: not-allowed; }

    .ecr-btn-primary {
      width: 100%;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      background: #1A1A1A; color: #fff;
      padding: 14px 28px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer;
      transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
    }
    .ecr-btn-primary:hover:not(:disabled) { background: #2C2C2C; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
    .ecr-btn-primary:disabled { background: #D0D0CC; cursor: not-allowed; }

    .ecr-btn-sage {
      width: 100%;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      background: #6B9E6B; color: #fff;
      padding: 14px 28px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer;
      transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
    }
    .ecr-btn-sage:hover:not(:disabled) { background: #598559; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(107,158,107,0.32); }
    .ecr-btn-sage:disabled { background: #D0D0CC; cursor: not-allowed; }

    .ecr-feature-row { display: flex; align-items: flex-start; gap: 14px; }
    .ecr-feature-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(107,158,107,0.14); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.25s; }
    .ecr-feature-row:hover .ecr-feature-icon { background: rgba(107,158,107,0.26); }

    .ecr-back { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; color: #A0A0A0; transition: color 0.22s; font-family: 'Outfit', sans-serif; text-decoration: none; cursor: pointer; background: none; border: none; padding: 0; }
    .ecr-back:hover { color: #6B9E6B; }

    .ecr-link { color: #6B9E6B; font-weight: 600; transition: opacity 0.2s; text-decoration: none; }
    .ecr-link:hover { opacity: 0.72; }

    .ecr-eye { background: none; border: none; cursor: pointer; padding: 2px; color: #A0A0A0; display: flex; align-items: center; transition: color 0.2s; }
    .ecr-eye:hover { color: #6B9E6B; }

    @keyframes ecr-spin { to { transform: rotate(360deg); } }
    .ecr-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: ecr-spin 0.7s linear infinite; }

    @media (max-width: 700px) {
      .ecr-card { grid-template-columns: 1fr !important; }
      .ecr-sidebar { display: none !important; }
      .ecr-form-panel { padding: 40px 28px !important; }
    }
  `;
  document.head.appendChild(s);
})();

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [showCPw, setShowCPw]   = useState(false);
  const [pwStrength, setPwStrength] = useState(0);
  const [step, setStep]         = useState(1);
  const [success, setSuccess]   = useState(false);

  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === "password") {
      let s = 0;
      if (value.length >= 8)         s++;
      if (/[A-Z]/.test(value))       s++;
      if (/[0-9]/.test(value))       s++;
      if (/[^A-Za-z0-9]/.test(value)) s++;
      setPwStrength(s);
    }
  };

  const validateStep1 = () => {
    if (!form.name.trim() || !form.email.trim()) { setError("Please fill in all fields"); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Please enter a valid email"); return false; }
    return true;
  };
  const validateStep2 = () => {
    if (!form.password || !form.confirmPassword) { setError("Please fill in all password fields"); return false; }
    if (form.password !== form.confirmPassword)  { setError("Passwords do not match"); return false; }
    if (form.password.length < 8)                { setError("Password must be at least 8 characters"); return false; }
    return true;
  };

  const handleNext = () => { setError(""); if (validateStep1()) setStep(2); };
  const handleBack = () => { setStep(1); setError(""); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateStep1() || !validateStep2()) return;
    try {
      setLoading(true);
      const { data } = await registerUser({ name: form.name, email: form.email, password: form.password });
      setSuccess(true);
      setTimeout(() => {
        localStorage.setItem("token", data.token);
        navigate("/login", { state: { message: "Registration successful! Please sign in." } });
      }, 1600);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pwReqs = [
    { label: "8+ characters", met: form.password.length >= 8 },
    { label: "Uppercase",     met: /[A-Z]/.test(form.password) },
    { label: "Number",        met: /[0-9]/.test(form.password) },
    { label: "Special char",  met: /[^A-Za-z0-9]/.test(form.password) },
  ];

  const pwBarColor = pwStrength <= 1 ? "#F59E0B" : pwStrength <= 2 ? "#F59E0B" : "#6B9E6B";

  /* ── design tokens ── */
  const C = {
    cream:    "#FAFAF7",
    charcoal: "#1A1A1A",
    charcoal2:"#2C2C2C",
    sage:     "#6B9E6B",
    sageLight:"#EEF5EE",
    warm:     "#F6F0E8",
    body:     "#4A4A4A",
    muted:    "#7A7A7A",
    border:   "rgba(0,0,0,0.07)",
    serif:    "'Cormorant Garamond', serif",
    sans:     "'Outfit', sans-serif",
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

      {/* Blobs */}
      <div style={{ position:"absolute", borderRadius:"50%", pointerEvents:"none", filter:"blur(72px)", width:520, height:520, background:"rgba(107,158,107,0.09)", top:-120, right:-100 }} />
      <div style={{ position:"absolute", borderRadius:"50%", pointerEvents:"none", filter:"blur(72px)", width:340, height:340, background:"rgba(246,240,232,0.85)", bottom:-60, left:-80 }} />

      {/* Card */}
      <motion.div
        className="ecr-card"
        initial={{ opacity:0, y:26 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.65, ease:[0.25,0.1,0.25,1] }}
        style={{
          width:"100%", maxWidth:980,
          display:"grid", gridTemplateColumns:"1fr 1.2fr",
          borderRadius:28, overflow:"hidden",
          boxShadow:"0 24px 80px rgba(0,0,0,0.09)",
          border:`1px solid ${C.border}`,
          position:"relative", zIndex:1,
        }}
      >

        {/* ════ LEFT SIDEBAR ════ */}
        <div className="ecr-sidebar" style={{
          background: C.charcoal,
          padding: "52px 44px",
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          position: "relative", overflow: "hidden",
        }}>
          {/* Dot grid */}
          <div style={{ position:"absolute", inset:0, opacity:0.03, pointerEvents:"none", backgroundImage:"radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize:"22px 22px" }} />
          {/* Sage glow */}
          <div style={{ position:"absolute", width:260, height:260, borderRadius:"50%", background:"rgba(107,158,107,0.07)", filter:"blur(60px)", bottom:-60, right:-60, pointerEvents:"none" }} />

          <div style={{ position:"relative", zIndex:1 }}>
            {/* Logo */}
            <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:52, textDecoration:"none" }}>
              <div style={{ width:34, height:34, borderRadius:10, background:C.sage, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Heart size={16} color="#fff" />
              </div>
              <span style={{ fontFamily:C.serif, fontWeight:500, fontSize:20, color:"#fff", letterSpacing:"0.01em" }}>EchoCare</span>
            </Link>

            {/* Headline */}
            <h2 style={{ fontFamily:C.serif, fontWeight:300, fontSize:"clamp(28px,3.2vw,42px)", color:"#fff", lineHeight:1.18, letterSpacing:"-0.02em", marginBottom:16 }}>
              A secure space for<br />
              <em style={{ fontStyle:"italic", color:C.sage }}>your wellbeing.</em>
            </h2>
            <p style={{ fontSize:14, fontWeight:300, color:"rgba(255,255,255,0.5)", lineHeight:1.78, marginBottom:48, maxWidth:280, fontFamily:C.sans }}>
              Join thousands of students across India who've found support, clarity, and community through EchoCare.
            </p>

            {/* Features */}
            <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
              {[
                { icon:<Shield size={16} color={C.sage} />,   title:"100% Confidential",  desc:"End-to-end encrypted. Your data is never shared." },
                { icon:<Sparkles size={16} color={C.sage} />, title:"AI Support, 24/7",   desc:"Intelligent emotional support whenever you need it." },
                { icon:<CheckCircle size={16} color={C.sage}/>,title:"Free to Join",       desc:"No fees, no barriers — just support when it matters." },
              ].map((f,i) => (
                <div key={i} className="ecr-feature-row">
                  <div className="ecr-feature-icon">{f.icon}</div>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:600, color:"#fff", marginBottom:3, fontFamily:C.sans }}>{f.title}</div>
                    <div style={{ fontSize:12.5, fontWeight:300, color:"rgba(255,255,255,0.46)", lineHeight:1.6, fontFamily:C.sans }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ position:"relative", zIndex:1, paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.08)", marginTop:44 }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ display:"flex" }}>
                {["#B8D4B8","#9FC49F","#8FAF8F","#7a9e7a"].map((c,i) => (
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

        {/* ════ RIGHT FORM PANEL ════ */}
        <div className="ecr-form-panel" style={{
          background:"#fff",
          padding:"52px 52px",
          display:"flex", flexDirection:"column", justifyContent:"center",
        }}>
          <div style={{ maxWidth:390, width:"100%", margin:"0 auto" }}>

            {/* Step progress + heading */}
            <motion.div
              initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay:0.18, ease:[0.25,0.1,0.25,1] }}
              style={{ marginBottom:36 }}
            >
              {/* Progress bars */}
              <div style={{ display:"flex", gap:6, marginBottom:20 }}>
                {[1,2].map(n => (
                  <div key={n} style={{
                    flex:1, height:3, borderRadius:100,
                    background: step >= n ? C.sage : "rgba(0,0,0,0.08)",
                    transition:"background 0.4s ease",
                  }} />
                ))}
              </div>

              <span style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:C.sage, marginBottom:12, fontFamily:C.sans }}>
                Step {step} of 2
              </span>
              <h1 style={{ fontFamily:C.serif, fontWeight:300, fontSize:"clamp(28px,3vw,40px)", color:C.charcoal, lineHeight:1.15, letterSpacing:"-0.022em", marginBottom:12 }}>
                {step === 1 ? <>Create your<br /><em style={{ fontStyle:"italic", color:C.sage }}>account.</em></> : <>Set your<br /><em style={{ fontStyle:"italic", color:C.sage }}>password.</em></>}
              </h1>
              <p style={{ fontSize:14, fontWeight:300, color:C.muted, lineHeight:1.7, fontFamily:C.sans }}>
                Already a member?{" "}
                <Link to="/login" className="ecr-link">Sign in</Link>
              </p>
            </motion.div>

            {/* ── Steps ── */}
            <AnimatePresence mode="wait">

              {/* STEP 1 — name + email */}
              {step === 1 && (
                <motion.div key="step1"
                  initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
                  exit={{ opacity:0, x:-16 }}
                  transition={{ duration:0.35, ease:[0.25,0.1,0.25,1] }}
                  style={{ display:"flex", flexDirection:"column", gap:22 }}
                >
                  {/* Full name */}
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.09em", textTransform:"uppercase", color:C.muted, marginBottom:8, fontFamily:C.sans }}>Full Name</label>
                    <div style={{ position:"relative" }}>
                      <User size={15} color={C.muted} style={{ position:"absolute", left:15, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                      <input type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="Your full name" className="ecr-input" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.09em", textTransform:"uppercase", color:C.muted, marginBottom:8, fontFamily:C.sans }}>Email Address</label>
                    <div style={{ position:"relative" }}>
                      <Mail size={15} color={C.muted} style={{ position:"absolute", left:15, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="name@example.com" className="ecr-input" />
                    </div>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        style={{ display:"flex", alignItems:"center", gap:9, padding:"12px 16px", borderRadius:12, background:"#FEF2F2", border:"1px solid rgba(239,68,68,0.14)", fontSize:13, fontWeight:500, color:"#DC2626", fontFamily:C.sans }}>
                        <XCircle size={14} style={{ flexShrink:0 }} />{error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button onClick={handleNext} className="ecr-btn-primary" style={{ marginTop:2 }}>
                    Continue <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — passwords */}
              {step === 2 && (
                <motion.div key="step2"
                  initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }}
                  exit={{ opacity:0, x:-16 }}
                  transition={{ duration:0.35, ease:[0.25,0.1,0.25,1] }}
                  style={{ display:"flex", flexDirection:"column", gap:22 }}
                >
                  {/* Back button */}
                  <button onClick={handleBack} className="ecr-back" style={{ alignSelf:"flex-start" }}>
                    <ChevronLeft size={13} /> Back to step 1
                  </button>

                  {/* Password */}
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.09em", textTransform:"uppercase", color:C.muted, marginBottom:8, fontFamily:C.sans }}>Create Password</label>
                    <div style={{ position:"relative" }}>
                      <Lock size={15} color={C.muted} style={{ position:"absolute", left:15, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                      <input type={showPw?"text":"password"} name="password" value={form.password}
                        onChange={handleChange} placeholder="••••••••"
                        className="ecr-input" style={{ paddingRight:46 }} />
                      <button type="button" onClick={() => setShowPw(v=>!v)} className="ecr-eye"
                        style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
                        {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* Strength bar + requirements */}
                    {form.password && (
                      <div style={{ marginTop:12 }}>
                        {/* Strength bars */}
                        <div style={{ display:"flex", gap:5, marginBottom:12 }}>
                          {[1,2,3,4].map(i => (
                            <div key={i} style={{ flex:1, height:3, borderRadius:100, background: i <= pwStrength ? pwBarColor : "rgba(0,0,0,0.08)", transition:"background 0.35s" }} />
                          ))}
                        </div>
                        {/* Requirements grid */}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 12px" }}>
                          {pwReqs.map((r,i) => (
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <CheckCircle size={12} color={r.met ? C.sage : "rgba(0,0,0,0.15)"} />
                              <span style={{ fontSize:11, fontWeight: r.met ? 500 : 400, color: r.met ? C.body : C.muted, fontFamily:C.sans, transition:"color 0.2s" }}>{r.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.09em", textTransform:"uppercase", color:C.muted, marginBottom:8, fontFamily:C.sans }}>Confirm Password</label>
                    <div style={{ position:"relative" }}>
                      <Lock size={15} color={C.muted} style={{ position:"absolute", left:15, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                      <input type={showCPw?"text":"password"} name="confirmPassword" value={form.confirmPassword}
                        onChange={handleChange} placeholder="••••••••"
                        className="ecr-input" style={{ paddingRight:46 }} />
                      <button type="button" onClick={() => setShowCPw(v=>!v)} className="ecr-eye"
                        style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>
                        {showCPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Match indicator */}
                    {form.confirmPassword && (
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:8 }}>
                        {form.password === form.confirmPassword
                          ? <><CheckCircle size={12} color={C.sage} /><span style={{ fontSize:11, color:C.sage, fontFamily:C.sans }}>Passwords match</span></>
                          : <><XCircle size={12} color="#DC2626" /><span style={{ fontSize:11, color:"#DC2626", fontFamily:C.sans }}>Passwords don't match</span></>
                        }
                      </div>
                    )}
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        style={{ display:"flex", alignItems:"center", gap:9, padding:"12px 16px", borderRadius:12, background:"#FEF2F2", border:"1px solid rgba(239,68,68,0.14)", fontSize:13, fontWeight:500, color:"#DC2626", fontFamily:C.sans }}>
                        <XCircle size={14} style={{ flexShrink:0 }} />{error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Success state */}
                  <AnimatePresence>
                    {success && (
                      <motion.div initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }}
                        style={{ display:"flex", alignItems:"center", gap:9, padding:"14px 16px", borderRadius:14, background:C.sageLight, border:`1px solid rgba(107,158,107,0.2)`, fontSize:13.5, fontWeight:500, color:C.sage, fontFamily:C.sans }}>
                        <CheckCircle size={16} style={{ flexShrink:0 }} />
                        Account created! Redirecting you to sign in…
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button onClick={handleSubmit} disabled={loading || success} className="ecr-btn-sage" style={{ marginTop:2 }}>
                    {loading ? <div className="ecr-spinner" /> : success ? <><CheckCircle size={16} /> Account created!</> : <>Complete registration <ArrowRight size={16} /></>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.42 }}
              style={{ marginTop:32, paddingTop:24, borderTop:"1px solid rgba(0,0,0,0.07)", textAlign:"center" }}>
              <p style={{ fontSize:12, fontWeight:300, color:C.muted, lineHeight:1.75, maxWidth:300, margin:"0 auto", fontFamily:C.sans }}>
                By joining, you agree to our{" "}
                <Link to="/terms" className="ecr-link">Terms</Link> and{" "}
                <Link to="/privacy" className="ecr-link">Privacy Policy</Link>.
              </p>
            </motion.div>

          </div>
        </div>

      </motion.div>
    </div>
  );
}