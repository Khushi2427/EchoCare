import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Upload, FileText, AlertTriangle, Users, BarChart3, Settings,
  User, Shield, Bell, Search, ChevronRight, PlusCircle, Eye, Edit,
  Trash2, Download, Activity, Brain, Globe, Sparkles, CheckCircle2,
  LayoutDashboard, Menu, X, Lock as LockIcon, // Fixed import alias
} from "lucide-react";

// Shadcn UI
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AdminDashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setDashboardData({
          recentActivities: [
            { id: 1, action: "New student flagged by AI", user: "John Doe", time: "10 min ago", type: "alert" },
            { id: 2, action: "Resource uploaded", user: "Dr. Smith", time: "1 hour ago", type: "upload" },
            { id: 3, action: "Counsellor added", user: "Sarah Johnson", time: "2 hours ago", type: "add" },
            { id: 4, action: "Emergency session booked", user: "Michael Chen", time: "3 hours ago", type: "session" },
          ],
          quickStats: [
            { label: "High Risk Students", value: "0", trend: "stable" },
            { label: "Pending Approvals", value: "0", trend: "stable" },
            { label: "System Health", value: "100%", trend: "stable" },
          ]
        });
      }, 300);
    }
  }, [user]);

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Activity className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <h2 className="text-lg font-medium text-slate-600">Initializing Admin Environment...</h2>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const adminActions = [
    {
      title: "Upload Resources",
      description: "Articles, videos, and audio for students",
      icon: <Upload className="w-5 h-5" />,
      link: "/admin/resources/upload",
      color: "bg-blue-600",
      features: ["AI tagging", "Bulk upload"]
    },
    {
      title: "Manage Resources",
      description: "Edit, review, or delete content",
      icon: <FileText className="w-5 h-5" />,
      link: "/admin/resources",
      color: "bg-emerald-600",
      features: ["Analytics", "Version control"]
    },
    {
      title: "Flagged Students",
      description: "High-risk cases detected by AI",
      icon: <AlertTriangle className="w-5 h-5" />,
      link: "/admin/flagged-students",
      color: "bg-orange-600",
      features: ["Risk insights", "Action plans"]
    },
    {
      title: "Manage Counsellors",
      description: "Counsellor accounts and schedules",
      icon: <Users className="w-5 h-5" />,
      link: "/admin/counsellors",
      color: "bg-violet-600",
      features: ["Assignments", "Performance"]
    },
    // {
    //   title: "Analytics Reports",
    //   description: "Platform-wide wellness trends",
    //   icon: <BarChart3 className="w-5 h-5" />,
    //   link: "/admin/reports",
    //   color: "bg-indigo-600",
    //   features: ["Real-time", "Export PDF"]
    // },
    // {
    //   title: "System Settings",
    //   description: "Configuration and permissions",
    //   icon: <Settings className="w-5 h-5" />,
    //   link: "/admin/settings",
    //   color: "bg-slate-700",
    //   features: ["Roles", "Security"]
    // },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">EchoCare <span className="text-blue-600">Admin</span></span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
  {["overview", "analytics", "users", "resources"].map((tab) => {
    // Determine the path: 'overview' goes to /admin, others go to /admin/tabName
    const path = tab === "overview" ? "/admin" : `/admin/${tab}`;
    
    return (
      <Link key={tab} to={path}>
        <Button
          variant={activeTab === tab ? "secondary" : "ghost"}
          onClick={() => setActiveTab(tab)}
          className="capitalize font-medium text-slate-600"
        >
          {tab}
        </Button>
      </Link>
    );
  })}
</nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search everything..."
                className="pl-9 bg-slate-100 border-none focus-visible:ring-1 focus-visible:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-2" />

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block leading-tight">
                <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider py-0 px-1 border-blue-200 text-blue-700 bg-blue-50">
                  {user?.role}
                </Badge>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200" onClick={handleLogout}>
                      <User className="w-5 h-5 text-slate-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Log Out</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 lg:px-10 max-w-[1600px] mx-auto w-full">
        <section className="mb-10 relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Admin Command Center</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back, <span className="text-blue-400">{user?.name?.split(' ')[0]}</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl">
                  Platform oversight and student wellness management. System integrity is currently at 100%.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {dashboardData?.quickStats.map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 min-w-[140px]">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <Badge className={stat.trend === 'up' ? 'bg-emerald-500/20 text-emerald-400 border-none' : 'bg-slate-500/20 text-slate-400 border-none'}>
                        {stat.trend === 'up' ? '↑' : '—'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] -mr-32 -mt-32 rounded-full" />
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Service Directory</h2>
                <p className="text-slate-500 text-sm">Access core management modules</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {adminActions.map((action, index) => (
                <motion.div key={index} whileHover={{ y: -4 }}>
                  <Link to={action.link} className="block group">
                    <Card className="h-full border-slate-200 transition-all group-hover:shadow-lg group-hover:border-blue-200">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-2xl text-white shadow-md ${action.color}`}>
                            {action.icon}
                          </div>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {action.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-white shadow-sm border-slate-200 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Platform Status</CardTitle>
                <CardDescription>Real-time system health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "API Services", icon: <Globe className="w-4 h-4 text-emerald-500" />, status: "Operational" },
                  { label: "AI Engine", icon: <Brain className="w-4 h-4 text-blue-500" />, status: "Processing" },
                  { label: "Data Security", icon: <LockIcon className="w-4 h-4 text-indigo-500" />, status: "Secure" }, // Corrected to LockIcon
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      {s.icon}
                      <span className="text-sm font-medium text-slate-700">{s.label}</span>
                    </div>
                    <Badge variant="outline" className="bg-white text-emerald-600 border-emerald-100">
                      {s.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-slate-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Events</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <div className="space-y-5">
                  {dashboardData.recentActivities.map((activity, i) => (
                    <div key={activity.id} className="flex gap-3 relative">
                      {i !== dashboardData.recentActivities.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-[-20px] w-px bg-slate-100" />
                      )}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        activity.type === 'alert' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {activity.type === 'alert' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 leading-none mb-1">{activity.action}</span>
                        <span className="text-xs text-slate-500">{activity.user} • {activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;