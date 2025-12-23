import React, { useEffect, useState } from "react";
import { getResources } from "../../services/resourceService";
import ResourcePlayer from "../../components/ResourcePlayer";
import { motion } from "framer-motion";
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
  Heart,
  Download,
  Share2,
  Clock,
  User,
  TrendingUp,
  Sparkles,
  RefreshCw,
  PlayCircle,
  Bookmark,
  Eye,
  Award,
  Zap,
  Brain,
  Moon,
  Target,
  Users,
  Activity,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const categories = [
    { id: "", name: "All", icon: <Sparkles className="w-4 h-4" />, color: "from-purple-500 to-pink-500" },
    { id: "stress", name: "Stress", icon: <Brain className="w-4 h-4" />, color: "from-red-500 to-orange-500" },
    { id: "anxiety", name: "Anxiety", icon: <Activity className="w-4 h-4" />, color: "from-blue-500 to-cyan-500" },
    { id: "focus", name: "Focus", icon: <Target className="w-4 h-4" />, color: "from-green-500 to-teal-500" },
    { id: "sleep", name: "Sleep", icon: <Moon className="w-4 h-4" />, color: "from-indigo-500 to-purple-500" },
    { id: "mindfulness", name: "Mindfulness", icon: <Zap className="w-4 h-4" />, color: "from-yellow-500 to-amber-500" },
    { id: "relationships", name: "Relations", icon: <Users className="w-4 h-4" />, color: "from-pink-500 to-rose-500" },
    { id: "self-esteem", name: "Self-esteem", icon: <Award className="w-4 h-4" />, color: "from-purple-500 to-violet-500" }
  ];

  const resourceTypes = [
    { id: "all", name: "All Types", icon: <BookOpen className="w-4 h-4" /> },
    { id: "video", name: "Video", icon: <Video className="w-4 h-4" /> },
    { id: "audio", name: "Audio", icon: <Headphones className="w-4 h-4" /> },
    { id: "article", name: "Article", icon: <FileText className="w-4 h-4" /> },
    { id: "pdf", name: "PDF", icon: <FileText className="w-4 h-4" /> },
  ];

  const languages = [
    { code: "all", name: "All Lang", icon: "🌐" },
    { code: "en", name: "English", icon: "🇬🇧" },
    { code: "hi", name: "Hindi", icon: "🇮🇳" },
    { code: "ta", name: "Tamil", icon: "🇮🇳" },
    { code: "bn", name: "Bengali", icon: "🇧🇩" },
    { code: "te", name: "Telugu", icon: "🇮🇳" },
    { code: "mr", name: "Marathi", icon: "🇮🇳" }
  ];

  useEffect(() => {
    fetchResources();
  }, [category, typeFilter, languageFilter]);

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
      
      // Update active filters display
      const filters = [];
      if (category) filters.push(`Category: ${categories.find(c => c.id === category)?.name}`);
      if (typeFilter !== "all") filters.push(`Type: ${typeFilter}`);
      if (languageFilter !== "all") filters.push(`Language: ${languages.find(l => l.code === languageFilter)?.name}`);
      setActiveFilters(filters);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setResources([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchResources();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      fetchResources();
    }
  };

  const toggleBookmark = (resourceId) => {
    if (bookmarks.includes(resourceId)) {
      setBookmarks(bookmarks.filter(id => id !== resourceId));
    } else {
      setBookmarks([...bookmarks, resourceId]);
    }
  };

  const clearFilters = () => {
    setCategory("");
    setTypeFilter("all");
    setLanguageFilter("all");
    setSearchTerm("");
    setActiveFilters([]);
  };

  const removeFilter = (filterIndex) => {
    const filterText = activeFilters[filterIndex];
    if (filterText.startsWith("Category:")) {
      setCategory("");
    } else if (filterText.startsWith("Type:")) {
      setTypeFilter("all");
    } else if (filterText.startsWith("Language:")) {
      setLanguageFilter("all");
    }
  };

  const getResourceIcon = (type) => {
    switch(type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Headphones className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'article': return <BookOpen className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getResourceColor = (type) => {
    switch(type) {
      case 'video': return "bg-red-100 text-red-600";
      case 'audio': return "bg-blue-100 text-blue-600";
      case 'pdf': return "bg-purple-100 text-purple-600";
      case 'article': return "bg-green-100 text-green-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getCategoryColor = (cat) => {
    const categoryObj = categories.find(c => c.id === cat);
    return categoryObj ? `bg-gradient-to-r ${categoryObj.color}` : "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  const filteredResources = resources.filter(resource => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        resource.title?.toLowerCase().includes(searchLower) ||
        resource.description?.toLowerCase().includes(searchLower) ||
        resource.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  if (loading && !refreshing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Loading resources...</h2>
          <p className="text-gray-500 mt-2">Fetching mental wellness content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Simplified Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Mental Wellness Resources
              </h1>
              <p className="text-purple-100 text-sm md:text-base">
                Curated content for your mental health journey
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-2xl font-bold">{resources.length}</div>
                <div className="text-xs text-purple-200">Resources</div>
              </div>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Simplified Search & Controls */}
        <div className="mb-6 space-y-4">
          {/* Compact Search Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={handleSearch}
                onKeyDown={handleSearchSubmit}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilters.length > 0 && (
                  <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                    {activeFilters.length}
                  </span>
                )}
              </button>
              
              <div className="bg-white border border-gray-300 rounded-lg p-0.5 flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-100 text-purple-600" : "text-gray-500"}`}
                  title="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-purple-100 text-purple-600" : "text-gray-500"}`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  <span>{filter}</span>
                  <button
                    onClick={() => removeFilter(index)}
                    className="ml-1 hover:text-purple-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Collapsible Advanced Filters */}
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="w-4 h-4 inline mr-1" />
                    Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  >
                    {resourceTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Language
                  </label>
                  <select
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.icon} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <TrendingUp className="w-4 h-4 inline mr-1" />
                    Sort By
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none">
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="rated">Highest Rated</option>
                    <option value="duration">Shortest First</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Category Tabs - Scrollable Horizontal */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap flex-shrink-0 ${
                  category === cat.id
                    ? "bg-gradient-to-r text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                } ${category === cat.id ? cat.color : ''}`}
              >
                <div className="p-1 rounded-md bg-white/20">
                  {cat.icon}
                </div>
                <span className="font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">
              {filteredResources.length} Resources
            </h2>
            {searchTerm && (
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                "{searchTerm}"
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-yellow-500" fill="currentColor" />
            {bookmarks.length} bookmarked
          </div>
        </div>

        {/* Resources Grid/List - KEEP EXISTING CODE BELOW EXACTLY AS IS */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No resources found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-4">
              {searchTerm 
                ? `No resources match "${searchTerm}". Try different keywords.`
                : "No resources available in this category. Check back soon!"}
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
                  {/* Resource Header */}
                  <div className={`h-1 ${getCategoryColor(resource.category)}`} />
                  
                  <div className="p-5">
                    {/* Resource Type & Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getResourceColor(resource.type)}`}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {resource.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleBookmark(resource._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            bookmarks.includes(resource._id)
                              ? 'text-yellow-500 hover:text-yellow-600'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" fill={bookmarks.includes(resource._id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                      {resource.description}
                    </p>

                    {/* Tags */}
                    {resource.tags && resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {resource.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {resource.tags.length > 2 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            +{resource.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resource.duration || '5 min'}
                        </span>
                        {resource.language && (
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {resource.language.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{resource.rating || '4.5'}</span>
                      </div>
                    </div>

                    {/* Player & Actions */}
                    <div className="space-y-3">
                      <ResourcePlayer resource={resource} />
                      
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                          <PlayCircle className="w-4 h-4" />
                          Play Now
                        </button>
                        <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:border-purple-400 hover:text-purple-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* List View - Keep existing but make slightly more compact */
          <div className="space-y-3">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:border-purple-300 transition-all p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Left Column */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getResourceColor(resource.type)}`}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {resource.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(resource.category).split(' ')[0]} text-white`}>
                              {categories.find(c => c.id === resource.category)?.name || resource.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {resource.duration || '5 min'} • {resource.language?.toUpperCase() || 'EN'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleBookmark(resource._id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Bookmark 
                          className="w-4 h-4" 
                          fill={bookmarks.includes(resource._id) ? "currentColor" : "none"}
                          color={bookmarks.includes(resource._id) ? "#f59e0b" : "#9ca3af"}
                        />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {resource.author || 'EchoCare Team'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {resource.views || '0'} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {resource.rating || '4.5'}
                      </span>
                    </div>
                  </div>

                  {/* Right Column - Actions */}
                  <div className="flex flex-col gap-2">
                    <ResourcePlayer resource={resource} compact />
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                        Access
                      </button>
                      <button className="p-1.5 border border-gray-300 text-gray-600 rounded-lg hover:border-purple-400 hover:text-purple-600">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Keep the existing Featured Resources Banner */}
        {filteredResources.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Explore Premium Resources</h3>
                <p className="text-purple-100 text-sm">
                  Unlock exclusive content with EchoCare Premium
                </p>
              </div>
              <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm">
                Upgrade to Premium
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resources;