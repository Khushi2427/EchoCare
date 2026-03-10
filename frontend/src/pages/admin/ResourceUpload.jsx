import React, { useState } from "react";
import { uploadResource } from "../../services/resourceService";
import { motion } from "framer-motion";
import { Upload, FileText, Film, Headphones, BookOpen, Tag, X } from "lucide-react";

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
    }
    .btn-primary:hover { background: var(--charcoal-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
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
    input, textarea, select {
      font-family: 'Outfit', sans-serif;
    }
    input:focus, textarea:focus, select:focus {
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

const ResourceUpload = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "article",
    category: "general",
    tags: "",
    content: "",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        data.append(key, value)
      );

      if (form.type !== "article" && file) {
        data.append("file", file);
      }

      if (form.type !== "article" && !file) {
        alert("Please select a file for this resource type.");
        setLoading(false);
        return;
      }

      await uploadResource(data);
      alert("Resource uploaded successfully");

      setForm({
        title: "",
        description: "",
        type: "article",
        category: "general",
        tags: "",
        content: "",
      });
      setFile(null);
    } catch (err) {
      console.error("Upload Error:", err);
      alert(
        err.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case "video": return <Film size={16} />;
      case "audio": return <Headphones size={16} />;
      case "pdf": return <FileText size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--cream)",
      padding: "40px 20px",
      position: "relative"
    }}>
      
      {/* Background blobs */}
      <div className="blob" style={{ width: 600, height: 600, background: "rgba(107,158,107,0.05)", top: -200, right: -100 }} />
      <div className="blob" style={{ width: 400, height: 400, background: "rgba(246,240,232,0.6)", bottom: -50, left: -50 }} />

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        <motion.div {...fadeUp(0)}>
          <div className="card" style={{ padding: 40 }}>
            
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "var(--sage-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Upload size={28} color="var(--sage)" />
              </div>
              <div>
                <h1 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 4 }}>
                  Upload <span style={{ color: "var(--sage)" }}>Resource</span>
                </h1>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>
                  Share wellness content with the EchoCare community
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              
              {/* Title */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--charcoal)",
                  marginBottom: 6
                }}>
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter resource title"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    fontSize: 14,
                    color: "var(--charcoal)",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--charcoal)",
                  marginBottom: 6
                }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Short description"
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    fontSize: 14,
                    color: "var(--charcoal)",
                    resize: "vertical",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                />
              </div>

              {/* Type & Category */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--charcoal)",
                    marginBottom: 6
                  }}>
                    Resource Type
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        paddingRight: 32,
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        borderRadius: 10,
                        fontSize: 14,
                        color: "var(--charcoal)",
                        appearance: "none",
                        cursor: "pointer",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                      onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                    >
                      <option value="article">Article</option>
                      <option value="pdf">PDF</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </select>
                    <div style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--muted)",
                      pointerEvents: "none"
                    }}>
                      {getTypeIcon(form.type)}
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--charcoal)",
                    marginBottom: 6
                  }}>
                    Category
                  </label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="stress, anxiety, motivation"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--cream)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      fontSize: 14,
                      color: "var(--charcoal)",
                      transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                    required
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--charcoal)",
                  marginBottom: 6
                }}>
                  Tags
                </label>
                <div style={{ position: "relative" }}>
                  <Tag size={16} style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)"
                  }} />
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="comma separated tags"
                    style={{
                      width: "100%",
                      padding: "12px 16px 12px 42px",
                      background: "var(--cream)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      fontSize: 14,
                      color: "var(--charcoal)",
                      transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                  />
                </div>
              </div>

              {/* Content or File */}
              {form.type === "article" ? (
                <div>
                  <label style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--charcoal)",
                    marginBottom: 6
                  }}>
                    Article Content
                  </label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Write article content here..."
                    rows="6"
                    style={{
                      width: "100%",
                      padding: "16px",
                      background: "var(--cream)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      fontSize: 14,
                      color: "var(--charcoal)",
                      resize: "vertical",
                      lineHeight: 1.6,
                      transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "var(--sage)"}
                    onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                  />
                </div>
              ) : (
                <div>
                  <label style={{
                    display: "block",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--charcoal)",
                    marginBottom: 6
                  }}>
                    Upload File
                  </label>
                  <div style={{
                    border: "2px dashed var(--border)",
                    borderRadius: 10,
                    padding: "24px",
                    textAlign: "center",
                    background: "var(--cream)",
                    cursor: "pointer",
                    transition: "border-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--sage)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      accept={
                        form.type === "pdf"
                          ? "application/pdf"
                          : form.type === "audio"
                          ? "audio/*"
                          : "video/*"
                      }
                      required
                    />
                    <label htmlFor="file-upload" style={{ cursor: "pointer", display: "block" }}>
                      <Upload size={32} color="var(--sage)" style={{ marginBottom: 12 }} />
                      <p style={{ fontSize: 14, fontWeight: 500, color: "var(--charcoal)", marginBottom: 4 }}>
                        {file ? file.name : "Click to select a file"}
                      </p>
                      <p style={{ fontSize: 12, color: "var(--muted)" }}>
                        {form.type === "pdf" ? "PDF files only" : 
                         form.type === "audio" ? "Audio files (MP3, WAV, etc.)" : 
                         "Video files (MP4, MOV, etc.)"}
                      </p>
                      {file && (
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          style={{
                            marginTop: 12,
                            padding: "4px 12px",
                            background: "var(--sage-light)",
                            color: "var(--sage)",
                            border: "none",
                            borderRadius: 100,
                            fontSize: 12,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4
                          }}
                        >
                          <X size={12} />
                          Remove file
                        </button>
                      )}
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "14px",
                  fontSize: 15,
                  justifyContent: "center",
                  marginTop: 12,
                  background: loading ? "var(--muted)" : "var(--sage)",
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                {loading ? (
                  <>
                    <span style={{
                      width: 16,
                      height: 16,
                      border: "2px solid #fff",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite"
                    }} />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Upload Resource
                  </>
                )}
              </button>
            </form>
          </div>
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

export default ResourceUpload;