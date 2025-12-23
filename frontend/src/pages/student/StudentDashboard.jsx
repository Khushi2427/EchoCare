import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

// Shadcn UI Components (Assuming standard path)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Icons
import {
  Menu, Home, User, Brain, Calendar, BookOpen, Users, LogOut,
  Bell, Settings, ChevronRight, AlertCircle, Sparkles, Heart,
  Zap, Target, Star, Search
} from "lucide-react";

const StudentDashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-xl font-medium animate-pulse">Loading Wellness Portal...</h2>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Overview", icon: Home, id: "overview", link: "#" },
    { name: "Profile", icon: User, id: "profile", link: "/student/profile" },
    { name: "Counselling", icon: Brain, id: "counselling", link: "/student/counsellors" },
    { name: "Appointments", icon: Calendar, id: "appointments", link: "/student/appointments" },
    { name: "Resources", icon: BookOpen, id: "resources", link: "/student/resources" },
    { name: "AI Chat", icon: Zap, id: "ai-chat", link: "/student/ai-chat" },
    { name: "Communities", icon: Users, id: "communities", link: "/student/communities" },
  ];

  const services = [
    {
      icon: Brain,
      title: "Counselling",
      description: "Professional mental health support.",
      link: "/student/counsellors",
      color: "bg-purple-500",
      suggestion: "Talk to a professional today."
    },
    {
      icon: Calendar,
      title: "Appointments",
      description: "Manage your upcoming sessions.",
      link: "/student/appointments",
      color: "bg-emerald-500",
      suggestion: "You have no sessions today."
    },
    {
      icon: BookOpen,
      title: "Resources",
      description: "Educational self-help guides.",
      link: "/student/resources",
      color: "bg-orange-500",
      suggestion: "New: Mindfulness Guide 2024"
    },
    {
        icon: Users,
        title: "AI Chat",
        description: "Instant AI-powered assistant.",
        link: "/student/ai-chat",
        color: "bg-blue-500",
        suggestion: "Available 24/7 for you."
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="p-2 bg-primary rounded-xl">
          <Sparkles className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">Wellness</span>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-1 py-2">
          {navItems.map((item) => (
            <Link key={item.id} to={item.link} onClick={() => setActiveTab(item.id)}>
              <Button
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 transition-all ${activeTab === item.id ? "bg-secondary font-semibold" : ""}`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-primary" : "text-muted-foreground"}`} />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="px-4 py-2">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-4">Quick Tips</h4>
          <div className="space-y-4">
            <div className="flex gap-3 items-start text-sm">
              <Target className="w-4 h-4 text-primary shrink-0" />
              <p className="text-muted-foreground">Set one small goal for today.</p>
            </div>
            <div className="flex gap-3 items-start text-sm">
              <Heart className="w-4 h-4 text-destructive shrink-0" />
              <p className="text-muted-foreground">Self-care is not selfish.</p>
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-zinc-950">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col fixed inset-y-0 z-50 bg-card border-r shadow-sm">
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:pl-72 flex flex-col">
        {/* Navbar */}
        <header className="h-16 border-b bg-card/80 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <div className="hidden sm:flex items-center bg-secondary/50 rounded-full px-3 py-1.5 border">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input 
                placeholder="Search resources..." 
                className="bg-transparent border-none text-sm focus:outline-none w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex items-center gap-3 pl-2 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{user.role}</p>
              </div>
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <ScrollArea className="flex-1 p-6 lg:p-10">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Welcome back, <span className="text-primary">{user.name.split(' ')[0]}!</span>
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Take a deep breath. How are you feeling today?
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={() => navigate("/student/communities")}>
                    <Users className="w-4 h-4" />
                    Communities
                </Button>
                <Button className="gap-2 shadow-lg shadow-primary/25" onClick={() => navigate("/student/ai-chat")}>
                    <Brain className="w-4 h-4" />
                    Talk to AI
                </Button>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Book a Session", desc: "Talk to a counselor", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10", link: "/student/counsellors" },
                    { title: "Join Group", desc: "Peer support groups", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10", link: "/student/communities" },
                    { title: "Profile", desc: "Update your profile", icon: User, color: "text-red-500", bg: "bg-red-500/10", link: "/student/profile" }
                ].map((action, i) => (
                    <Link to={action.link} key={i}>
                        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${action.bg}`}>
                                        <action.icon className={`w-6 h-6 ${action.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold group-hover:text-primary transition-colors">{action.title}</h3>
                                        <p className="text-sm text-muted-foreground">{action.desc}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Main Services Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Wellness Services</h2>
                <Button variant="link" className="text-primary">View all services</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <motion.div key={index} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="h-full border-none shadow-md overflow-hidden bg-card">
                      <div className={`h-2 ${service.color}`} />
                      <CardHeader className="pb-2">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-2">
                            <service.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-3 bg-muted/50 rounded-lg text-xs font-medium text-muted-foreground">
                            {service.suggestion}
                        </div>
                        <Button variant="secondary" className="w-full group" asChild>
                          <Link to={service.link}>
                            Access Service
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default StudentDashboard;