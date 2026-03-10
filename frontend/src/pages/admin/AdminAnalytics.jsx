import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, Users, Calendar, Activity, Heart, Sparkles } from "lucide-react";

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
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    .stat-card {
      background: var(--cream);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      border: 1px solid var(--border);
      transition: all 0.3s ease;
    }
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md);
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

const AdminAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/analytics/users-per-day`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // transform backend data
        const formatted = res.data.map((item) => ({
          date: item._id,
          users: item.count,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Analytics error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 24 }}>
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
              <TrendingUp size={24} color="var(--sage)" />
            </div>
            <div>
              <h1 className="serif" style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 300, marginBottom: 4 }}>
                User <span style={{ color: "var(--sage)" }}>Analytics</span>
              </h1>
              <p style={{ fontSize: 14, color: "var(--charcoal)" }}>
                Number of users registered per day
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div {...fadeUp(0.1)} className="card" style={{ padding: 24 }}>
          
          {loading && (
            <div style={{ 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center", 
              padding: "60px 0",
              gap: 16
            }}>
              <div style={{
                width: 40,
                height: 40,
                border: "3px solid var(--sage-light)",
                borderTopColor: "var(--sage)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }} />
              <p style={{ color: "var(--muted)" }}>Loading analytics...</p>
            </div>
          )}

          {!loading && data.length === 0 && (
            <div style={{ 
              textAlign: "center", 
              padding: "60px 0",
              color: "var(--charcoal)"
            }}>
              <Activity size={48} color="var(--muted)" style={{ marginBottom: 16, opacity: 0.5 }} />
              <p style={{ fontSize: 16 }}>No data available</p>
            </div>
          )}

          {!loading && data.length > 0 && (
            <>
              {/* Chart */}
              <div style={{ width: "100%", height: 320, marginBottom: 32 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis 
                      dataKey="date" 
                      stroke="var(--muted)"
                      tick={{ fill: 'var(--charcoal)', fontSize: 12 }}
                    />
                    <YAxis 
                      allowDecimals={false} 
                      stroke="var(--muted)"
                      tick={{ fill: 'var(--charcoal)', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#fff', 
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        boxShadow: 'var(--shadow-md)'
                      }}
                      labelStyle={{ color: 'var(--charcoal)', fontWeight: 600 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="var(--sage)"
                      strokeWidth={3}
                      dot={{ fill: 'var(--sage)', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: 'var(--sage-hover)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Stats */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
                marginTop: 24
              }}>
                {/* Total Days */}
                <div className="stat-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                    <Calendar size={16} color="var(--sage)" />
                    <p style={{ fontSize: 13, color: "var(--charcoal)" }}>Total Days</p>
                  </div>
                  <p className="serif" style={{ fontSize: 28, fontWeight: 400, color: "var(--charcoal)" }}>
                    {data.length}
                  </p>
                </div>

                {/* Total Users */}
                <div className="stat-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                    <Users size={16} color="var(--sage)" />
                    <p style={{ fontSize: 13, color: "var(--charcoal)" }}>Total Users</p>
                  </div>
                  <p className="serif" style={{ fontSize: 28, fontWeight: 400, color: "var(--charcoal)" }}>
                    {data.reduce((sum, d) => sum + d.users, 0)}
                  </p>
                </div>

                {/* Max in a Day */}
                <div className="stat-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                    <Activity size={16} color="var(--sage)" />
                    <p style={{ fontSize: 13, color: "var(--charcoal)" }}>Max in a Day</p>
                  </div>
                  <p className="serif" style={{ fontSize: 28, fontWeight: 400, color: "var(--charcoal)" }}>
                    {Math.max(...data.map((d) => d.users))}
                  </p>
                </div>

                {/* Latest Day */}
                <div className="stat-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 8 }}>
                    <TrendingUp size={16} color="var(--sage)" />
                    <p style={{ fontSize: 13, color: "var(--charcoal)" }}>Latest Day</p>
                  </div>
                  <p className="serif" style={{ fontSize: 28, fontWeight: 400, color: "var(--charcoal)" }}>
                    {data[data.length - 1]?.users}
                  </p>
                </div>
              </div>

              {/* Additional Insights */}
              <div style={{
                marginTop: 24,
                padding: "16px 20px",
                background: "var(--cream)",
                borderRadius: 12,
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Sparkles size={16} color="var(--sage)" />
                  <span style={{ fontSize: 13, color: "var(--body)" }}>
                    Average daily registrations: <strong>{Math.round(data.reduce((sum, d) => sum + d.users, 0) / data.length)}</strong>
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Heart size={12} color="var(--sage)" />
                  <span style={{ fontSize: 12, color: "var(--charcoal)" }}>Updated in real-time</span>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminAnalytics;