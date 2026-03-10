import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import CommunityChat from "./CommunityChat";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Plus, 
  MessageSquare, 
  UserPlus, 
  LogOut, 
  Search, 
  Hash, 
  ChevronLeft,
  Users,
  Compass,
  ArrowRight,
  Loader2,
  MoreVertical,
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
      padding: 8px; border-radius: 50%; background: transparent;
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
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--body);
      padding: 10px 20px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 500; font-size: 14px;
      border: 1.5px solid var(--border); cursor: pointer; transition: all 0.25s ease;
    }
    .btn-outline:hover { border-color: var(--sage); color: var(--sage); }
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
    }
    .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
    .badge {
      display: inline-flex; align-items: center; gap: 4px;
      font-size: 11px; font-weight: 600; padding: 4px 12px;
      border-radius: 100px; background: var(--sage-light); color: var(--sage);
    }
    .badge-member {
      background: #d1fae5;
      color: #065f46;
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
    input, button, textarea, select {
      font-family: 'Outfit', sans-serif;
    }
    input:focus, textarea:focus {
      outline: none;
    }
    .scroll-area {
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--sage-light) var(--cream);
    }
    .scroll-area::-webkit-scrollbar {
      width: 6px;
    }
    .scroll-area::-webkit-scrollbar-track {
      background: var(--cream);
    }
    .scroll-area::-webkit-scrollbar-thumb {
      background-color: var(--sage-light);
      border-radius: 20px;
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
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] },
});

// Simple Dialog Component
const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 999
        }}
        onClick={() => onOpenChange(false)}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#fff",
          borderRadius: 20,
          padding: 24,
          maxWidth: 425,
          width: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
          zIndex: 1000,
          boxShadow: "var(--shadow-lg)"
        }}
      >
        {children}
      </div>
    </>
  );
};

const DialogHeader = ({ children }) => (
  <div style={{ marginBottom: 16 }}>{children}</div>
);

const DialogTitle = ({ children }) => (
  <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--charcoal)" }}>{children}</h2>
);

const DialogFooter = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>{children}</div>
);

const DialogContent = ({ children }) => <div>{children}</div>;
const DialogTrigger = ({ children, asChild }) => <div>{children}</div>;

const Communities = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  
  const [allCommunities, setAllCommunities] = useState([]);
  const [myCommunities, setMyCommunities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [communityDetails, setCommunityDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allRes, mineRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/communities`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/communities/my`, { headers })
      ]);
      setAllCommunities(allRes.data);
      setMyCommunities(mineRes.data);
      
      if (communityId) {
        const found = [...allRes.data, ...mineRes.data].find(c => c._id === communityId);
        if (found) {
          setSelectedCommunity(communityId);
          setCommunityDetails(found);
        }
      }
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [communityId]);

  const createCommunity = async () => {
    if (!name) return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/communities`, { name, description }, { headers });
      setName("");
      setDescription("");
      setIsCreating(false);
      fetchData();
    } catch (error) {
      console.error("Failed to create community:", error);
    }
  };

  const joinCommunity = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/communities/${id}/join`, {}, { headers });
      fetchData();
      if (selectedCommunity === id || communityId === id) {
        navigate(`/student/communities/${id}`);
      }
    } catch (error) {
      console.error("Failed to join:", error);
    }
  };

  const leaveCommunity = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/communities/${id}/leave`, {}, { headers });
      fetchData();
      if (selectedCommunity === id || communityId === id) {
        setSelectedCommunity(null);
        setCommunityDetails(null);
        navigate("/student/communities");
      }
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  const handleOpenCommunity = (community) => {
    setSelectedCommunity(community._id);
    setCommunityDetails(community);
    navigate(`/student/communities/${community._id}`);
  };

  if (loading) return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "var(--cream)"
    }}>
      <Loader2 size={40} color="var(--sage)" style={{ animation: "spin 1s linear infinite", marginBottom: 16 }} />
      <p style={{ color: "var(--charcoal)", fontWeight: 500 }}>Connecting to your circles...</p>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  // --- CHAT VIEW (Sidebar + Chat) ---
  if (communityId && selectedCommunity) {
    return (
      <div style={{
        display: "flex",
        height: "100vh",
        background: "#fff",
        overflow: "hidden",
        position: "relative"
      }}>
        
        {/* Background blobs */}
        <div className="blob" style={{ width: 500, height: 500, background: "rgba(107,158,107,0.05)", top: -100, right: -100 }} />
        <div className="blob" style={{ width: 300, height: 300, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

        {/* Left Drawer Sidebar */}
        <aside style={{
          width: 320,
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          background: "var(--cream)",
          position: "relative",
          zIndex: 10
        }} className="hidden lg:flex">
          
          <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--border)", background: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <h2 className="serif" style={{ fontSize: 20, fontWeight: 500 }}>Your Circles</h2>
              <button
                onClick={() => navigate("/student/communities")}
                className="btn-ghost-icon"
                style={{ width: 36, height: 36 }}
              >
                <Compass size={16} />
              </button>
            </div>
          </div>
          
          <div className="scroll-area" style={{ flex: 1, padding: "16px" }}>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--charcoal)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
                Joined
              </p>
              {myCommunities.map(c => (
                <button
                  key={c._id}
                  onClick={() => handleOpenCommunity(c)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px",
                    borderRadius: 10,
                    border: "none",
                    background: selectedCommunity === c._id ? "var(--sage)" : "transparent",
                    color: selectedCommunity === c._id ? "#fff" : "var(--body)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    marginBottom: 4
                  }}
                >
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: selectedCommunity === c._id ? "rgba(255,255,255,0.2)" : "var(--sage-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Hash size={14} color={selectedCommunity === c._id ? "#fff" : "var(--sage)"} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Chat Area */}
        <main style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          position: "relative",
          zIndex: 10
        }}>
          
          <header style={{
            height: 70,
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            background: "#fff"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button
                className="btn-ghost-icon"
                style={{ width: 36, height: 36, display: "flex" }}
                
                onClick={() => navigate("/student/communities")}
              >
                <ChevronLeft size={16} />
              </button>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  <Hash size={16} color="var(--sage)" />
                  {communityDetails?.name}
                </h2>
                <p style={{ fontSize: 12, color: "var(--charcoal)" }}>{communityDetails?.description}</p>
              </div>
            </div>
            
            <button
              onClick={() => leaveCommunity(selectedCommunity)}
              className="btn-outline"
              style={{ padding: "8px 16px", fontSize: 13, color: "var(--sage)", borderColor: "#fee2e2" }}
            >
              <LogOut size={14} />
              Leave
            </button>
          </header>

          <div style={{ flex: 1, background: "var(--cream)", overflow: "hidden" }}>
            <CommunityChat communityId={selectedCommunity} />
          </div>
        </main>
      </div>
    );
  }

  // --- DISCOVERY VIEW (Landing Page) ---
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      paddingBottom: 80,
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", position: "relative", zIndex: 10 }}>
        
        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }} className="md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="serif" style={{ fontSize: "clamp(32px, 5vw, 42px)", fontWeight: 300, marginBottom: 8 }}>
              Community <span style={{ color: "var(--sage)" }}>Connect</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--charcoal)" }}>
              Join circles that matter to you. Speak, listen, and heal together.
            </p>
          </div>
          
          {/* Create Circle Button */}
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary"
            style={{ padding: "12px 24px", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <Plus size={16} />
            Start a Circle
          </button>
        </motion.div>

        {/* My Joined Circles */}
        <motion.section {...fadeUp(0.1)} style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 4, height: 24, background: "var(--sage)", borderRadius: 4 }} />
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 400 }}>Your Active Circles</h2>
          </div>
          
          {myCommunities.length === 0 ? (
            <div style={{
              border: "2px dashed var(--border)",
              borderRadius: 16,
              padding: "48px 24px",
              textAlign: "center",
              background: "transparent"
            }}>
              <div style={{
                width: 64,
                height: 64,
                background: "#fff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "var(--shadow-sm)"
              }}>
                <Users size={32} color="var(--muted)" />
              </div>
              <p style={{ color: "var(--body)", fontWeight: 500, marginBottom: 4 }}>You haven't joined any circles yet.</p>
              <p style={{ fontSize: 13, color: "var(--charcoal)" }}>Discover communities below to get started.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {myCommunities.map((c) => (
                <motion.div
                  key={c._id}
                  whileHover={{ y: -5 }}
                  onClick={() => handleOpenCommunity(c)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card" style={{ overflow: "hidden", height: "100%" }}>
                    <div style={{ padding: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: "var(--sage-light)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <MessageSquare size={24} color="var(--sage)" />
                        </div>
                        <span className="badge badge-member" style={{ fontSize: 10 }}>Member</span>
                      </div>
                      
                      <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--charcoal)" }}>{c.name}</h3>
                      <p style={{ fontSize: 13, color: "var(--body)", marginBottom: 16, lineHeight: 1.6 }} className="line-clamp-2">
                        {c.description}
                      </p>
                      
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: 12,
                        borderTop: "1px solid var(--border)"
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sage)", textTransform: "uppercase" }}>
                          Open Chat
                        </span>
                        <ArrowRight size={16} color="var(--sage)" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Discovery Circles */}
        <motion.section {...fadeUp(0.2)}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <div style={{ width: 4, height: 24, background: "var(--charcoal)", borderRadius: 4 }} />
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 400 }}>Explore New Circles</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {allCommunities
              .filter(c => !myCommunities.some(m => m._id === c._id))
              .map((c) => (
                <div key={c._id} className="card" style={{ padding: 16 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "var(--charcoal)" }} className="truncate">
                    {c.name}
                  </h4>
                  <p style={{ fontSize: 12, color: "var(--body)", marginBottom: 16, lineHeight: 1.6 }} className="line-clamp-2">
                    {c.description}
                  </p>
                  <button
                    onClick={() => joinCommunity(c._id)}
                    className="btn-outline"
                    style={{ width: "100%", padding: "8px", fontSize: 13, justifyContent: "center" }}
                  >
                    <UserPlus size={14} />
                    Join Circle
                  </button>
                </div>
              ))}
          </div>
        </motion.section>
      </div>

      {/* Create Community Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Community</DialogTitle>
          </DialogHeader>
          
          <div style={{ display: "grid", gap: 16, padding: "8px 0" }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 4 }}>
                Circle Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Daily Mindfulness"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--cream)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "var(--charcoal)"
                }}
              />
            </div>
            
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--charcoal)", marginBottom: 4 }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this circle about?"
                rows="3"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--cream)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "var(--charcoal)",
                  resize: "none"
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <button
              onClick={() => setIsCreating(false)}
              className="btn-ghost"
              style={{ padding: "8px 16px" }}
            >
              Cancel
            </button>
            <button
              onClick={createCommunity}
              className="btn-primary"
              style={{ padding: "8px 16px", background: "var(--sage)" }}
            >
              Create Circle
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Communities;