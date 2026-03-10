import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  FileText,
  Video,
  Music,
  MoreVertical,
  Trash2,
  ExternalLink,
  Plus,
  Search,
  Filter,
  FileDown,
  Loader2,
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
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      background: transparent; color: var(--charcoal);
      padding: 8px 16px; border-radius: 100px;
      font-family: 'Outfit', sans-serif; font-weight: 400; font-size: 13px;
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
    .badge-success {
      background: #d1fae5;
      color: #065f46;
    }
    .badge-secondary {
      background: var(--cream);
      color: var(--muted);
      border: 1px solid var(--border);
    }
    .blob {
      position: absolute; border-radius: 50%; pointer-events: none;
      filter: blur(72px); z-index: 0;
    }
    input:focus {
      outline: none;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      text-align: left;
      padding: 16px;
      font-size: 12px;
      font-weight: 600;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--border);
      background: var(--cream);
    }
    td {
      padding: 16px;
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
  `;
  document.head.appendChild(s);
})();

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const AdminResources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchResources = async () => {
    try {
      const res = await axios.get("/resources");
      setResources(res.data);
    } catch (error) {
      console.error("Failed to fetch resources", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/resources/${id}`);
      setResources(resources.filter((r) => r._id !== id));
    } catch (error) {
      alert("Failed to delete resource");
      console.error(error);
    }
  };

  // Helper to render correct icon based on resource type
  const getResourceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return <Video className="w-4 h-4" style={{ color: "var(--sage)" }} />;
      case 'audio': return <Music className="w-4 h-4" style={{ color: "var(--sage)" }} />;
      default: return <FileText className="w-4 h-4" style={{ color: "var(--sage)" }} />;
    }
  };

  const filteredResources = resources.filter(r => 
    r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--cream)"
      }}>
        <Loader2 size={32} color="var(--sage)" style={{ animation: "spin 1s linear infinite", marginBottom: 12 }} />
        <p style={{ color: "var(--muted)", fontWeight: 500 }}>Loading resources...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      padding: "24px",
      maxWidth: 1200,
      margin: "0 auto",
      position: "relative",
      minHeight: "100vh",
      background: "var(--cream)"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <div style={{ position: "relative", zIndex: 10 }}>
        
        {/* Header Section */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 24
        }} className="md:flex-row md:items-center md:justify-between">
          
          <div>
            <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 300, marginBottom: 8 }}>
              Resource <span style={{ color: "var(--sage)" }}>Library</span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--muted)" }}>
              Manage and organize educational content for students.
            </p>
          </div>

          <Link to="/admin/resources/upload">
            <button className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Plus size={16} />
              Upload New Resource
            </button>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="card" style={{ padding: 16, marginBottom: 24 }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12
          }} className="sm:flex-row">
            
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={16} style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)"
              }} />
              <input
                placeholder="Search by title or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 10px 10px 36px",
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

            <button className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="card" style={{ overflow: "hidden" }}>
          
          {filteredResources.length === 0 ? (
            <div style={{ padding: "80px 20px", textAlign: "center" }}>
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
                <FileText size={32} color="var(--muted)" />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>No resources found</h3>
              <p style={{ color: "var(--muted)" }}>Try adjusting your search or upload a new file.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Resource Title</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResources.map((resource) => (
                    <tr key={resource._id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: "var(--sage-light)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <span style={{ fontWeight: 500, color: "var(--charcoal)" }}>{resource.title}</span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-secondary" style={{ textTransform: "capitalize" }}>
                          {resource.type}
                        </span>
                      </td>
                      <td style={{ color: "var(--body)" }}>{resource.category}</td>
                      <td>
                        <span className="badge badge-success">Active</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                          
                          {/* External Link */}
                          {resource.fileUrl && (
                            <a href={resource.fileUrl} target="_blank" rel="noreferrer">
                              <button className="btn-ghost-icon" style={{ width: 32, height: 32 }}>
                                <ExternalLink size={14} />
                              </button>
                            </a>
                          )}
                          
                          {/* Dropdown Menu for Admin/Counsellor */}
                          {(user?.role === "admin" || user?.role === "counsellor") && (
                            <div style={{ position: "relative" }}>
                              <button 
                                className="btn-ghost-icon" 
                                style={{ width: 32, height: 32 }}
                                onClick={(e) => {
                                  const dropdown = e.currentTarget.nextSibling;
                                  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                                }}
                              >
                                <MoreVertical size={14} />
                              </button>
                              <div style={{
                                position: "absolute",
                                right: 0,
                                top: "100%",
                                marginTop: 4,
                                background: "#fff",
                                border: "1px solid var(--border)",
                                borderRadius: 8,
                                boxShadow: "var(--shadow-md)",
                                minWidth: 140,
                                zIndex: 50,
                                display: "none"
                              }}>
                                <button
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "10px 16px",
                                    width: "100%",
                                    border: "none",
                                    background: "transparent",
                                    color: "var(--body)",
                                    fontSize: 13,
                                    cursor: "pointer",
                                    textAlign: "left",
                                    borderBottom: "1px solid var(--border)"
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--cream)"}
                                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                >
                                  <FileDown size={14} />
                                  Download
                                </button>
                                <button
                                  onClick={() => handleDelete(resource._id)}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "10px 16px",
                                    width: "100%",
                                    border: "none",
                                    background: "transparent",
                                    color: "#b91c1c",
                                    fontSize: 13,
                                    cursor: "pointer",
                                    textAlign: "left"
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = "#fee2e2"}
                                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminResources;