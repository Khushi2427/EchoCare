import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Search, 
  UserCheck, 
  UserMinus, 
  MoreHorizontal, 
  Mail, 
  Calendar, 
  Download,
  Filter,
  ArrowUpDown,
  ShieldCheck,
  Users,
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
    .dropdown-content {
      position: absolute;
      right: 0;
      top: 100%;
      margin-top: 4px;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 8px;
      box-shadow: var(--shadow-md);
      min-width: 180px;
      z-index: 50;
    }
    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      width: 100%;
      border: none;
      background: transparent;
      color: var(--body);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }
    .dropdown-item:hover {
      background: var(--cream);
    }
    .dropdown-item.delete:hover {
      background: #fee2e2;
      color: #b91c1c;
    }
    .dropdown-label {
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 600;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--border);
    }
    .dropdown-separator {
      height: 1px;
      background: var(--border);
      margin: 4px 0;
    }
  `;
  document.head.appendChild(s);
})();

// Simple Dropdown Components
const DropdownMenu = ({ children, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setIsOpen(false)} />
          <div className="dropdown-content">
            {React.Children.map(children, child => 
              React.cloneElement(child, { closeDropdown: () => setIsOpen(false) })
            )}
          </div>
        </>
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, asChild }) => {
  return children;
};

const DropdownMenuContent = ({ children, align = "end", className }) => {
  return <>{children}</>;
};

const DropdownMenuItem = ({ children, onClick, className, closeDropdown }) => {
  const handleClick = (e) => {
    onClick?.(e);
    closeDropdown?.();
  };
  
  return (
    <button 
      className={`dropdown-item ${className || ''}`} 
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const DropdownMenuLabel = ({ children }) => {
  return <div className="dropdown-label">{children}</div>;
};

const DropdownMenuSeparator = () => {
  return <div className="dropdown-separator" />;
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`);
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        background: "var(--cream)"
      }}>
        <div style={{
          width: 32,
          height: 32,
          border: "3px solid var(--sage-light)",
          borderTopColor: "var(--sage)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }} />
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
                  User <span style={{ color: "var(--sage)" }}>Management</span>
                </h1>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>
                  View and manage all registered accounts across the platform.
                </p>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
              <span className="badge" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>
                {users.length} Total Users
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Control Bar */}
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
                placeholder="Search by name or email..."
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

            <button className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "300px" }}>User</th>
                  <th>Email</th>
                  <th>Joined Date</th>
                  <th>Role</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
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
                            fontWeight: 600,
                            fontSize: 14
                          }}>
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "var(--charcoal)", marginBottom: 2 }}>
                              {user.name}
                            </div>
                            <div style={{ fontSize: 11, color: "var(--muted)" }}>
                              ID: {user._id?.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--body)" }}>
                          <Mail size={12} color="var(--muted)" />
                          {user.email}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--body)" }}>
                          <Calendar size={12} color="var(--muted)" />
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-secondary" style={{ textTransform: "capitalize" }}>
                          {user.role || 'Student'}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <DropdownMenu
                          trigger={
                            <button className="btn-ghost-icon" style={{ width: 32, height: 32 }}>
                              <MoreHorizontal size={14} />
                            </button>
                          }
                        >
                          <DropdownMenuLabel>User Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <UserCheck size={14} style={{ marginRight: 8, color: "var(--sage)" }} />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShieldCheck size={14} style={{ marginRight: 8, color: "var(--sage)" }} />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="delete">
                            <UserMinus size={14} style={{ marginRight: 8 }} />
                            Deactivate User
                          </DropdownMenuItem>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ height: "128px", textAlign: "center", color: "var(--muted)" }}>
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;