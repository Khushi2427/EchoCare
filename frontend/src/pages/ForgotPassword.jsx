import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Mail, ArrowLeft, Loader2 } from "lucide-react";

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
      padding: 12px 24px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: none; cursor: pointer; transition: all 0.25s ease;
      width: 100%;
      justify-content: center;
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .btn-link {
      background: none; border: none; color: var(--sage); font-size: 14px;
      font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
      padding: 0; transition: color 0.2s;
    }
    .btn-link:hover { color: var(--sage-hover); text-decoration: underline; }
    .card {
      background: #fff; border: 1px solid var(--border);
      border-radius: var(--r-md); box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
      padding: 32px;
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    input {
      font-family: 'Outfit', sans-serif;
    }
    input:focus {
      outline: none;
    }
  `;
  document.head.appendChild(s);
})();

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
      setMessage("Check your email for the reset link!");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--cream)",
      padding: "16px",
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 500, height: 500, background: "rgba(107,158,107,0.05)", top: -100, right: -50 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <motion.div
        {...fadeUp(0)}
        style={{ maxWidth: 420, width: "100%", position: "relative", zIndex: 10 }}
      >
        <div className="card" style={{ padding: 40 }}>
          
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "var(--sage-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Heart size={28} color="var(--sage)" />
            </div>
          </div>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 className="serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 8 }}>
              Forgot <span style={{ color: "var(--sage)" }}>Password?</span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--charcoal)" }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" style={{
                display: "block",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--charcoal)",
                marginBottom: 6
              }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--charcoal)"
                }} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 16px 12px 42px",
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "var(--charcoal)",
                    transition: "border-color 0.2s"
                  }}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                />
              </div>
            </div>

            {/* Message Alert */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "12px 16px",
                  borderRadius: 8,
                  fontSize: 13,
                  textAlign: "center",
                  ...(message.includes("wrong") 
                    ? { background: "#fee2e2", color: "#b91c1c", border: "1px solid #fecaca" }
                    : { background: "#d1fae5", color: "#065f46", border: "1px solid #a7f3d0" }
                  )
                }}
              >
                {message}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "12px 24px",
                background: loading ? "var(--muted)" : "var(--sage)",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link to="/login" className="btn-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <ArrowLeft size={14} />
              Back to login
            </Link>
          </div>
        </div>
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

export default ForgotPassword;