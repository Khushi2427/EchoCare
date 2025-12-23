import React, { useEffect, useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Shadcn UI Components
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Icons
import {
  User,
  Phone,
  Star,
  Calendar,
  Users,
  Brain,
  Shield,
  Clock,
  Award,
  Search,
  Filter,
  Sparkles,
  MessageSquare,
  GraduationCap,
  Heart,
  ChevronRight,
  Info
} from "lucide-react";

const CounsellorList = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [filteredCounsellors, setFilteredCounsellors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounsellors = async () => {
      try {
        setLoading(true);
        const res = await api.get("/counsellors");
        setCounsellors(res.data);
        setFilteredCounsellors(res.data);
      } catch (err) {
        console.error("Fetch counsellor error:", err.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchCounsellors();
  }, []);

  useEffect(() => {
    let filtered = counsellors;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.specialization?.some(s => s.toLowerCase().includes(term)) ||
        c.bio?.toLowerCase().includes(term)
      );
    }
    if (selectedSpecialization !== "all") {
      filtered = filtered.filter(c =>
        c.specialization?.includes(selectedSpecialization)
      );
    }
    setFilteredCounsellors(filtered);
  }, [searchTerm, selectedSpecialization, counsellors]);

  const specializations = ["all", ...new Set(counsellors.flatMap(c => c.specialization || []))];

  const getAvailabilityStatus = (availability) => {
    if (!availability || availability.length === 0) return "unavailable";
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hasTodaySlot = availability.some(a => a.day === today && a.slots?.length > 0);
    return hasTodaySlot ? "available" : "available-soon";
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "available": return { text: "Available Today", class: "bg-emerald-100 text-emerald-700 border-emerald-200" };
      case "available-soon": return { text: "Available Soon", class: "bg-blue-100 text-blue-700 border-blue-200" };
      default: return { text: "No Slots", class: "bg-slate-100 text-slate-700 border-slate-200" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground font-medium animate-pulse">Finding specialists for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              Expert Network
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Meet our Counsellors</h1>
            <p className="text-muted-foreground text-lg">Licensed professionals dedicated to your mental well-being.</p>
          </div>
          
          <div className="flex items-center bg-card p-2 rounded-2xl border shadow-sm">
             <div className="px-4 border-r">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total Experts</p>
                <p className="text-2xl font-bold">{counsellors.length}</p>
             </div>
             <div className="px-4">
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Satisfaction</p>
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <p className="text-2xl font-bold">4.9</p>
                </div>
             </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-card border rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search name, expertise, or bio..." 
              className="pl-10 h-12 bg-slate-50/50 border-none ring-offset-0 focus-visible:ring-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
            <SelectTrigger className="w-full md:w-[240px] h-12 bg-slate-50/50 border-none">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="All Specializations" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec} className="capitalize">
                  {spec === "all" ? "All Specializations" : spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Counsellors Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCounsellors.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-20 text-center space-y-4"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold">No matches found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedSpecialization("all"); }}>
                Reset All Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCounsellors.map((counsellor, index) => {
                const status = getAvailabilityStatus(counsellor.availability);
                const config = getStatusConfig(status);
                
                return (
                  <motion.div
                    key={counsellor._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="group overflow-hidden border-slate-200 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5">
                      <CardHeader className="p-6 pb-4">
                        <div className="flex justify-between items-start">
                          <div className="relative">
                            <Avatar className="w-16 h-16 border-2 border-background shadow-md">
                              <AvatarImage src={counsellor.profilePic} />
                              <AvatarFallback className="bg-gradient-to-br from-primary to-violet-600 text-white font-bold text-xl">
                                {counsellor.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${status === 'available' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                          </div>
                          <Badge variant="outline" className={`${config.class} border shadow-sm`}>
                            {config.text}
                          </Badge>
                        </div>
                        
                        <div className="mt-4 space-y-1">
                          <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                            {counsellor.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                            <GraduationCap className="w-4 h-4" />
                            {counsellor.title || "Licensed Practitioner"}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6 pt-0 space-y-6">
                        <div className="flex flex-wrap gap-1.5">
                          {counsellor.specialization?.slice(0, 3).map((spec) => (
                            <Badge key={spec} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none capitalize text-[10px] py-0 px-2">
                              {spec}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed italic">
                          "{counsellor.bio || "Helping individuals navigate life challenges through professional guidance."}"
                        </p>

                        <div className="grid grid-cols-2 gap-4 py-2">
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <Award className="w-4 h-4 text-amber-500" />
                                {counsellor.experience || 0}+ Yrs Exp
                            </div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                4.9 Rating
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            className="flex-1 shadow-md shadow-primary/20"
                            onClick={() => navigate(`/student/book/${counsellor._id}`)}
                          >
                            Book Now
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => navigate(`/student/counsellor/${counsellor._id}`)}
                          >
                            <User className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Privacy Note */}
        <div className="relative overflow-hidden bg-primary/5 rounded-3xl border border-primary/10 p-8">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-background rounded-2xl shadow-sm">
                    <Shield className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center md:text-left space-y-2">
                    <h4 className="text-xl font-bold">Your Privacy is Our Priority</h4>
                    <p className="text-muted-foreground max-w-2xl">
                        Every session is encrypted and strictly confidential. We adhere to international 
                        healthcare standards to ensure your journey remains your own.
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-primary/80 uppercase tracking-widest">
                            <Heart className="w-3.5 h-3.5" /> HIPAA Compliant
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-primary/80 uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5" /> Licensed Experts
                        </span>
                    </div>
                </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default CounsellorList;