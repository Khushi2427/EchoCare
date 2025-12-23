import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LogOut,
  Upload,
  FileText,
  AlertTriangle,
  Users,
  BarChart3,
  Settings,
  User,
  Shield,
  Bell,
  Search,
  ChevronRight,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Activity,
  Heart,
  Brain,
  Calendar,
  MessageSquare,
  TrendingUp,
  Lock,
  Globe,
  Sparkles
} from "lucide-react";

// Mock data for dashboard stats and recent activities
const getDashboardData = () => ({
  stats: [
    { id: 1, label: "Total Resources", value: "142", icon: <FileText className="w-5 h-5" />, color: "from-blue-500 to-cyan-500", change: "+12 this month" },
    { id: 2, label: "Flagged Students", value: "8", icon: <AlertTriangle className="w-5 h-5" />, color: "from-amber-500 to-orange-500", change: "2 new today" },
    { id: 3, label: "Active Counsellors", value: "15", icon: <Users className="w-5 h-5" />, color: "from-emerald-500 to-teal-500", change: "All available" },
    { id: 4, label: "Total Sessions", value: "284", icon: <MessageSquare className="w-5 h-5" />, color: "from-violet-500 to-purple-500", change: "+24 this week" },
    { id: 5, label: "AI Detections", value: "156", icon: <Brain className="w-5 h-5" />, color: "from-pink-500 to-rose-500", change: "98% accuracy" },
    { id: 6, label: "Avg. Wellness Score", value: "72%", icon: <TrendingUp className="w-5 h-5" />, color: "from-green-500 to-lime-500", change: "+5% from last month" },
  ],
  recentActivities: [
    { id: 1, action: "New student flagged by AI", user: "John Doe", time: "10 min ago", type: "alert" },
    { id: 2, action: "Resource uploaded", user: "Dr. Smith", time: "1 hour ago", type: "upload" },
    { id: 3, action: "Counsellor added", user: "Sarah Johnson", time: "2 hours ago", type: "add" },
    { id: 4, action: "Emergency session booked", user: "Michael Chen", time: "3 hours ago", type: "session" },
    { id: 5, action: "Report generated", user: "System", time: "5 hours ago", type: "report" },
  ],
  quickStats: [
    { label: "High Risk Students", value: "3", trend: "up" },
    { label: "Pending Approvals", value: "7", trend: "stable" },
    { label: "System Health", value: "100%", trend: "stable" },
    { label: "User Satisfaction", value: "94%", trend: "up" },
  ]
});

const AdminDashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user) {
      // Simulate API call
      setTimeout(() => {
        setDashboardData(getDashboardData());
      }, 300);
    }
  }, [user]);

  if (loading || !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Admin Dashboard...</h2>
          <p className="text-gray-500 mt-2">Preparing your workspace</p>
        </div>
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
      description: "Add articles, videos, audios for students",
      icon: <Upload className="w-6 h-6" />,
      link: "/admin/resources/upload",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      features: ["Multiple formats", "AI tagging", "Bulk upload"]
    },
    {
      title: "Manage Resources",
      description: "View, edit or delete uploaded content",
      icon: <FileText className="w-6 h-6" />,
      link: "/admin/resources",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      features: ["Search & filter", "Analytics", "Version control"]
    },
    {
      title: "Flagged Students",
      description: "High-risk students detected by AI",
      icon: <AlertTriangle className="w-6 h-6" />,
      link: "/admin/flagged-students",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      features: ["AI insights", "Risk levels", "Action plans"]
    },
    {
      title: "Counsellors",
      description: "Manage counsellor accounts and schedules",
      icon: <Users className="w-6 h-6" />,
      link: "/admin/counsellors",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50",
      features: ["Availability", "Performance", "Assignments"]
    },
    {
      title: "Analytics & Reports",
      description: "Comprehensive analytics & mental health insights",
      icon: <BarChart3 className="w-6 h-6" />,
      link: "/admin/reports",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      features: ["Real-time data", "Trends", "Export options"]
    },
    {
      title: "System Settings",
      description: "Configure platform settings and permissions",
      icon: <Settings className="w-6 h-6" />,
      link: "/admin/settings",
      color: "from-gray-600 to-gray-700",
      bgColor: "bg-gray-50",
      features: ["User roles", "AI settings", "Security"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-sm text-gray-600">Comprehensive administration panel</p>
                </div>
              </div>
              
              {/* Navigation Tabs */}
              <div className="hidden md:flex items-center gap-1 ml-8">
                {["overview", "analytics", "users", "content", "settings"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources, students, reports..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                {/* Logout Dropdown */}
                <div className="relative group">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:rotate-90 transition-transform" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Welcome Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome back, <span className="text-yellow-300">{user.name.split(' ')[0]}!</span>
                </h2>
                <p className="opacity-90">Here's what's happening with your platform today</p>
                <div className="flex items-center gap-4 mt-4">
                  {dashboardData.quickStats.map((stat, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <p className="text-sm opacity-90">{stat.label}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{stat.value}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stat.trend === 'up' ? 'bg-green-500/20 text-green-300' :
                          stat.trend === 'down' ? 'bg-red-500/20 text-red-300' :
                          'bg-gray-500/20 text-gray-300'
                        }`}>
                          {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <Sparkles className="w-24 h-24 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {dashboardData.stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Admin Controls Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Administration Controls</h3>
              <p className="text-gray-600">Manage all aspects of the wellness platform</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Live Monitor
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Link
                  to={action.link}
                  className="block group"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white`}>
                        {action.icon}
                      </div>
                      <div className="flex items-center gap-1">
                        {action.features.map((feature, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-gray-600 mb-4">{action.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600">Manage →</span>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity & Quick Access */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-gray-900">Recent Activity</h4>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All →
                </button>
              </div>
              
              <div className="space-y-4">
                {dashboardData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'alert' ? 'bg-red-100 text-red-600' :
                        activity.type === 'upload' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'add' ? 'bg-green-100 text-green-600' :
                        activity.type === 'session' ? 'bg-purple-100 text-purple-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {activity.type === 'alert' && <AlertTriangle className="w-4 h-4" />}
                        {activity.type === 'upload' && <Upload className="w-4 h-4" />}
                        {activity.type === 'add' && <PlusCircle className="w-4 h-4" />}
                        {activity.type === 'session' && <MessageSquare className="w-4 h-4" />}
                        {activity.type === 'report' && <BarChart3 className="w-4 h-4" />}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">{activity.action}</h5>
                        <p className="text-sm text-gray-500">
                          By {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white rounded-lg">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & System Status */}
          <div>
            {/* System Status */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-6 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">System Status</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Globe className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">API Services</p>
                      <p className="text-sm text-gray-500">All systems operational</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Brain className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">AI Engine</p>
                      <p className="text-sm text-gray-500">Processing data</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Lock className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Security</p>
                      <p className="text-sm text-gray-500">All checks passed</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                Run System Diagnostic
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg group-hover:bg-blue-100">
                      <PlusCircle className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <span className="font-medium">Add New Counsellor</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-amber-50 rounded-lg border border-gray-200 hover:border-amber-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg group-hover:bg-amber-100">
                      <AlertTriangle className="w-4 h-4 text-gray-600 group-hover:text-amber-600" />
                    </div>
                    <span className="font-medium">Review Alerts</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50 rounded-lg border border-gray-200 hover:border-emerald-200 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg group-hover:bg-emerald-100">
                      <BarChart3 className="w-4 h-4 text-gray-600 group-hover:text-emerald-600" />
                    </div>
                    <span className="font-medium">Generate Report</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;