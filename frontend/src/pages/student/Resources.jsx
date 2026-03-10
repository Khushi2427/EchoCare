import React, { useEffect, useState } from "react";
import { getResources } from "../../services/resourceService";
import ResourcePlayer from "../../components/ResourcePlayer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Grid,
  List,
  BookOpen,
  Video,
  Headphones,
  FileText,
  Globe,
  Star,
  Download,
  Clock,
  TrendingUp,
  Sparkles,
  RefreshCw,
  PlayCircle,
  Bookmark,
  Award,
  Zap,
  Brain,
  Moon,
  Target,
  Users,
  Activity,
  Loader2,
  X
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
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    @media (max-width: 768px) {
      .mob-hide { display: none !important; }
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

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const categories = [
    { id: "", name: "Discovery", icon: <Sparkles size={16} /> },
    { id: "stress", name: "Stress", icon: <Brain size={16} /> },
    { id: "anxiety", name: "Anxiety", icon: <Activity size={16} /> },
    { id: "focus", name: "Focus", icon: <Target size={16} /> },
    { id: "sleep", name: "Sleep", icon: <Moon size={16} /> },
    { id: "mindfulness", name: "Mindfulness", icon: <Zap size={16} /> },
    { id: "relationships", name: "Relations", icon: <Users size={16} /> },
  ];

  const resourceTypes = [
    { id: "all", name: "All", icon: <BookOpen size={16} /> },
    { id: "video", name: "Videos", icon: <Video size={16} /> },
    { id: "audio", name: "Podcasts", icon: <Headphones size={16} /> },
    { id: "article", name: "Articles", icon: <FileText size={16} /> },
  ];

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await getResources({ 
        category,
        type: typeFilter !== "all" ? typeFilter : undefined,
        language: languageFilter !== "all" ? languageFilter : undefined,
        search: searchTerm || undefined
      });
      setResources(res.data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [category, typeFilter, languageFilter]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchResources();
  };

  const getResourceUI = (type) => {
    const configs = {
      video: { icon: <Video size={14} />, color: "var(--sage)", bg: "var(--sage-light)" },
      audio: { icon: <Headphones size={14} />, color: "var(--sage)", bg: "var(--sage-light)" },
      pdf: { icon: <FileText size={14} />, color: "var(--sage)", bg: "var(--sage-light)" },
      article: { icon: <BookOpen size={14} />, color: "var(--sage)", bg: "var(--sage-light)" }
    };
    return configs[type] || configs.article;
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  if (loading && !refreshing) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        background: "var(--cream)"
      }}>
        <Loader2 size={40} color="var(--sage)" style={{ animation: "spin 1s linear infinite", marginBottom: 16 }} />
        <p style={{ color: "var(--muted)", fontFamily: "'Outfit', sans-serif" }}>Personalizing your library...</p>
        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", paddingBottom: 80, position: "relative" }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      {/* Hero Section */}
      <div style={{
        position: "relative",
        height: "300px",
        background: "var(--charcoal)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(107,158,107,0.9) 0%, rgba(26,26,26,0.8) 100%)",
          zIndex: 1
        }} />
        
        <div style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          width: "100%"
        }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "6px 16px",
              borderRadius: 100,
              fontSize: 12,
              fontWeight: 500,
              marginBottom: 20,
              backdropFilter: "blur(10px)"
            }}>
              <Sparkles size={14} />
              Mindful Library
            </span>
            
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 300,
              color: "#fff",
              marginBottom: 12,
              letterSpacing: "-0.02em"
            }}>
              Find Your <span style={{ color: "var(--sage)" }}>Balance</span>
            </h1>
            
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", maxWidth: 500, lineHeight: 1.6 }}>
              Curated expert content to support your mental wellness journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", marginTop: -40, position: "relative", zIndex: 10 }}>
        
        {/* Search & Filter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="card"
          style={{ padding: 20, background: "#fff" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "stretch" }} className="md:flex-row md:items-center">
            
            {/* Search */}
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
              <input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchResources()}
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 42px",
                  background: "var(--cream)",
                  border: "1px solid var(--border)",
                  borderRadius: 100,
                  fontSize: 14,
                  fontFamily: "'Outfit', sans-serif",
                  color: "var(--charcoal)",
                  outline: "none"
                }}
              />
            </div>

            {/* Type Filters */}
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTypeFilter(type.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 100,
                    border: "1px solid",
                    borderColor: typeFilter === type.id ? "var(--sage)" : "var(--border)",
                    background: typeFilter === type.id ? "var(--sage-light)" : "transparent",
                    color: typeFilter === type.id ? "var(--sage)" : "var(--body)",
                    fontSize: 13,
                    fontWeight: typeFilter === type.id ? 500 : 400,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {type.icon}
                  <span className="mob-hide">{type.name}</span>
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div style={{ display: "flex", gap: 4 }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  background: viewMode === 'grid' ? "var(--sage-light)" : "transparent",
                  color: viewMode === 'grid' ? "var(--sage)" : "var(--muted)",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: "10px",
                  borderRadius: 8,
                  background: viewMode === 'list' ? "var(--sage-light)" : "transparent",
                  color: viewMode === 'list' ? "var(--sage)" : "var(--muted)",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 100,
                  border: "1px solid",
                  borderColor: category === cat.id ? "var(--sage)" : "var(--border)",
                  background: category === cat.id ? "var(--sage-light)" : "#fff",
                  color: category === cat.id ? "var(--sage)" : "var(--body)",
                  fontSize: 13,
                  fontWeight: category === cat.id ? 500 : 400,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s"
                }}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400 }}>
              {category === "" ? "Recent Resources" : `${categories.find(c => c.id === category)?.name} Selection`}
            </h2>
            <button
              onClick={handleRefresh}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                borderRadius: 100,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--body)",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--sage)";
                e.currentTarget.style.color = "var(--sage)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--body)";
              }}
            >
              <RefreshCw size={14} style={refreshing ? { animation: "spin 1s linear infinite" } : {}} />
              Refresh
            </button>
          </div>

          <div style={{
            display: "grid",
            gap: 20,
            gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(300px, 1fr))" : "1fr"
          }}>
            {resources.map((resource, idx) => {
              const ui = getResourceUI(resource.type);
              return (
                <motion.div
                  layout
                  key={resource._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="card" style={{
                    display: viewMode === "list" ? "flex" : "block",
                    overflow: "hidden",
                    height: viewMode === "list" ? "auto" : "100%"
                  }}>
                    {/* Thumbnail Area */}
                    <div style={{
                      background: "var(--cream)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      ...(viewMode === "grid" 
                        ? { aspectRatio: "16/9", width: "100%" }
                        : { width: 180, aspectRatio: "16/9", margin: 12, borderRadius: 12, flexShrink: 0 })
                    }}>
                      {resource.type === 'video' ? (
                        <PlayCircle size={40} color="var(--sage)" style={{ opacity: 0.5 }} />
                      ) : (
                        <BookOpen size={40} color="var(--sage)" style={{ opacity: 0.5 }} />
                      )}
                      
                      {/* Type badge */}
                      <span style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 10px",
                        background: "var(--sage-light)",
                        color: "var(--sage)",
                        borderRadius: 100,
                        fontSize: 11,
                        fontWeight: 500
                      }}>
                        {ui.icon}
                        <span style={{ textTransform: "capitalize" }}>{resource.type}</span>
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: 20, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
                          <Clock size={12} />
                          {resource.duration || "5 min"}
                        </div>
                        <button
                          onClick={() => toggleBookmark(resource._id)}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
                        >
                          <Bookmark 
                            size={16} 
                            color={bookmarks.includes(resource._id) ? "var(--sage)" : "var(--muted)"}
                            fill={bookmarks.includes(resource._id) ? "var(--sage)" : "none"}
                          />
                        </button>
                      </div>

                      <h3 style={{
                        fontSize: 18,
                        fontWeight: 600,
                        marginBottom: 8,
                        color: "var(--charcoal)",
                        lineClamp: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {resource.title}
                      </h3>
                      
                      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                        <ResourcePlayer resource={resource} />
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--muted)" }}>
                          <Star size={14} color="#FBBF24" fill="#FBBF24" />
                          <span style={{ fontWeight: 500 }}>{resource.rating || "4.8"}</span>
                          <span>•</span>
                          <span>{resource.author || "EchoCare Team"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .mob-hide { display: none !important; }
        }
        div[style*="overflowX: auto"] {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        div[style*="overflowX: auto"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Resources;