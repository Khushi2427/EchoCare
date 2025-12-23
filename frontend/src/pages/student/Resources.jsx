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

// Shadcn & Utils
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
    { id: "", name: "Discovery", icon: <Sparkles className="w-4 h-4" />, color: "from-purple-500 to-pink-500" },
    { id: "stress", name: "Stress", icon: <Brain className="w-4 h-4" />, color: "from-red-500 to-orange-500" },
    { id: "anxiety", name: "Anxiety", icon: <Activity className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" },
    { id: "focus", name: "Focus", icon: <Target className="w-4 h-4" />, color: "from-green-500 to-teal-500" },
    { id: "sleep", name: "Sleep", icon: <Moon className="w-4 h-4" />, color: "from-indigo-500 to-purple-500" },
    { id: "mindfulness", name: "Mindfulness", icon: <Zap className="w-4 h-4" />, color: "from-yellow-500 to-amber-500" },
    { id: "relationships", name: "Relations", icon: <Users className="w-4 h-4" />, color: "from-pink-500 to-rose-500" },
  ];

  const resourceTypes = [
    { id: "all", name: "All", icon: <BookOpen className="w-4 h-4" /> },
    { id: "video", name: "Videos", icon: <Video className="w-4 h-4" /> },
    { id: "audio", name: "Podcasts", icon: <Headphones className="w-4 h-4" /> },
    { id: "article", name: "Articles", icon: <FileText className="w-4 h-4" /> },
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

  // FIXED: Added missing handleRefresh function
  const handleRefresh = () => {
    setRefreshing(true);
    fetchResources();
  };

  const getResourceUI = (type) => {
    const configs = {
      video: { icon: <Video className="w-4 h-4" />, color: "bg-red-500/10 text-red-600" },
      audio: { icon: <Headphones className="w-4 h-4" />, color: "bg-blue-500/10 text-blue-600" },
      pdf: { icon: <FileText className="w-4 h-4" />, color: "bg-orange-500/10 text-orange-600" },
      article: { icon: <BookOpen className="w-4 h-4" />, color: "bg-emerald-500/10 text-emerald-600" }
    };
    return configs[type] || configs.article;
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Personalizing your library...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Cinematic Hero */}
      <div className="relative h-[300px] md:h-[350px] overflow-hidden bg-slate-900 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/80 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Badge className="mb-4 bg-white/20 text-white backdrop-blur-md border-white/30 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-2" />
              Mindful Library
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Balance</span>
            </h1>
            <p className="text-purple-100 text-lg max-w-xl leading-relaxed opacity-90">
              Curated expert content to support your mental wellness journey.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-30">
        {/* Search & Mode Toggle */}
        <Card className="border-none shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-4 bg-white">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search resources..." 
                  className="pl-11 h-12 bg-slate-50 border-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchResources()}
                />
              </div>
              <div className="flex items-center gap-2">
                <Tabs value={typeFilter} onValueChange={setTypeFilter}>
                  <TabsList className="h-12">
                    {resourceTypes.map(t => (
                      <TabsTrigger key={t.id} value={t.id} className="px-4 gap-2">
                        {t.icon} <span className="hidden sm:inline">{t.name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <Separator orientation="vertical" className="h-8 mx-2" />
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="icon" 
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="mt-8">
          <ScrollArea className="w-full pb-4">
            <div className="flex space-x-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-full transition-all border font-medium whitespace-nowrap",
                    category === cat.id 
                      ? "bg-slate-900 text-white border-slate-900 shadow-lg" 
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  )}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Content */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {category === "" ? "Recent Resources" : `${categories.find(c => c.id === category)?.name} Selection`}
            </h2>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="rounded-full gap-2">
              <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin")} />
              Refresh
            </Button>
          </div>

          <div className={cn(
            "gap-6",
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"
          )}>
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
                  <Card className={cn(
                    "group overflow-hidden border-slate-200 transition-all hover:shadow-xl",
                    viewMode === "list" && "flex flex-row items-center"
                  )}>
                    {/* Thumbnail Area */}
                    <div className={cn(
                      "relative bg-slate-100 flex items-center justify-center",
                      viewMode === "grid" ? "aspect-video" : "w-48 aspect-video m-2 rounded-lg shrink-0"
                    )}>
                       {resource.type === 'video' ? <PlayCircle className="w-12 h-12 text-slate-300" /> : ui.icon}
                       <Badge className={cn("absolute top-3 left-3 border-none shadow-sm", ui.color)}>
                         {ui.icon} <span className="ml-1.5 capitalize">{resource.type}</span>
                       </Badge>
                    </div>

                    <CardContent className="p-5 flex-1">
                      <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                           <Clock className="w-3.5 h-3.5" />
                           {resource.duration || "5 min"}
                         </div>
                         <Button 
                          variant="ghost" size="icon" className="h-8 w-8"
                          onClick={() => toggleBookmark(resource._id)}
                         >
                           <Bookmark className={cn("w-4 h-4", bookmarks.includes(resource._id) && "fill-purple-500 text-purple-500")} />
                         </Button>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 line-clamp-1">
                        {resource.title}
                      </h3>
                      
                      <div className="mt-4 flex flex-col gap-3">
                        <ResourcePlayer resource={resource} />
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          {resource.rating || "4.8"} • {resource.author || "EchoCare Team"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;