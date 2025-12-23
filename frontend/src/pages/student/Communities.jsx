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
  MoreVertical
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from "@/components/ui/dialog";

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
        axios.get("http://localhost:5002/api/communities", { headers }),
        axios.get("http://localhost:5002/api/communities/my", { headers })
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
      toast.error("Could not load communities");
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
      await axios.post("http://localhost:5002/api/communities", { name, description }, { headers });
      setName("");
      setDescription("");
      setIsCreating(false);
      toast.success("Community created!");
      fetchData();
    } catch (error) {
      toast.error("Failed to create community");
    }
  };

  const joinCommunity = async (id) => {
    try {
      await axios.post(`http://localhost:5002/api/communities/${id}/join`, {}, { headers });
      toast.success("Joined successfully!");
      fetchData();
      if (selectedCommunity === id || communityId === id) {
        navigate(`/student/communities/${id}`);
      }
    } catch (error) {
      toast.error("Failed to join");
    }
  };

  const leaveCommunity = async (id) => {
    try {
      await axios.post(`http://localhost:5002/api/communities/${id}/leave`, {}, { headers });
      toast.info("Left community");
      fetchData();
      if (selectedCommunity === id || communityId === id) {
        setSelectedCommunity(null);
        setCommunityDetails(null);
        navigate("/student/communities");
      }
    } catch (error) {
      toast.error("Action failed");
    }
  };

  const handleOpenCommunity = (community) => {
    setSelectedCommunity(community._id);
    setCommunityDetails(community);
    navigate(`/student/communities/${community._id}`);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
      <p className="font-medium text-slate-500">Connecting to your circles...</p>
    </div>
  );

  // --- CHAT VIEW (Sidebar + Chat) ---
  if (communityId && selectedCommunity) {
    return (
      <div className="flex h-screen bg-white overflow-hidden">
        {/* Left Drawer Sidebar */}
        <aside className="w-80 border-r flex flex-col bg-slate-50 hidden lg:flex">
          <div className="p-6 border-b bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold tracking-tight">Circles</h2>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={() => navigate("/student/communities")}>
                <Compass className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Joined</p>
                {myCommunities.map(c => (
                  <button
                    key={c._id}
                    onClick={() => handleOpenCommunity(c)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all mb-1 ${
                      selectedCommunity === c._id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "hover:bg-white text-slate-600"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${selectedCommunity === c._id ? "bg-white/20" : "bg-indigo-100 text-indigo-600"}`}>
                      <Hash className="w-4 h-4" />
                    </div>
                    <span className="font-semibold truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Right Chat Area */}
        <main className="flex-1 flex flex-col relative bg-white">
          <header className="h-20 border-b flex items-center justify-between px-6 bg-white shrink-0">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => navigate("/student/communities")}>
                <ChevronLeft />
              </Button>
              <div>
                <h1 className="text-lg font-bold flex items-center gap-2 italic">
                  <Hash className="w-4 h-4 text-indigo-500" />
                  {communityDetails?.name}
                </h1>
                <p className="text-xs text-slate-500">{communityDetails?.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-full text-red-500 hover:bg-red-50" onClick={() => leaveCommunity(selectedCommunity)}>
                <LogOut className="w-4 h-4 mr-2" /> Leave
              </Button>
            </div>
          </header>

          <div className="flex-1 bg-slate-50 overflow-hidden">
             <CommunityChat communityId={selectedCommunity} />
          </div>
        </main>
      </div>
    );
  }

  // --- DISCOVERY VIEW (Landing Page) ---
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Community <span className="text-indigo-600">Connect</span></h1>
            <p className="text-slate-500 mt-2 text-lg">Join circles that matter to you. Speak, listen, and heal together.</p>
          </div>
          
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="rounded-full h-12 px-6 shadow-lg shadow-indigo-200 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-5 h-5 mr-2" /> Start a Circle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Community</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Circle Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Daily Mindfulness" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this circle about?" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                <Button onClick={createCommunity} className="bg-indigo-600">Create Circle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        {/* My Joined Circles */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 bg-indigo-600 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">Your Active Circles</h2>
          </div>
          
          {myCommunities.length === 0 ? (
            <Card className="border-dashed bg-transparent border-slate-300">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Users className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">You haven't joined any circles yet.</p>
                <p className="text-sm text-slate-400">Discover communities below to get started.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCommunities.map((c) => (
                <motion.div key={c._id} whileHover={{ y: -5 }}>
                  <Card className="overflow-hidden border-none shadow-sm hover:shadow-xl transition-all cursor-pointer bg-white group" onClick={() => handleOpenCommunity(c)}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <MessageSquare className="w-6 h-6" />
                        </div>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none">Member</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 truncate group-hover:text-indigo-600 transition-colors">{c.name}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10">{c.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Open Chat</span>
                        <ArrowRight className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Discovery Circles */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1.5 bg-slate-300 rounded-full" />
            <h2 className="text-xl font-bold text-slate-900">Explore New Circles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allCommunities
              .filter(c => !myCommunities.some(m => m._id === c._id))
              .map((c) => (
                <Card key={c._id} className="border-slate-200 hover:border-indigo-300 transition-all">
                  <CardContent className="p-5">
                    <h4 className="font-bold text-slate-900 mb-1 truncate">{c.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">{c.description}</p>
                    <Button 
                      onClick={() => joinCommunity(c._id)}
                      variant="outline" 
                      className="w-full rounded-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 group"
                    >
                      <UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Join Circle
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Communities;