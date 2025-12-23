import React from "react";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  Heart
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

  // Filter counsellors based on search and specialization
  useEffect(() => {
    let filtered = counsellors;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.specialization?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        c.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specialization
    if (selectedSpecialization !== "all") {
      filtered = filtered.filter(c =>
        c.specialization?.includes(selectedSpecialization)
      );
    }

    setFilteredCounsellors(filtered);
  }, [searchTerm, selectedSpecialization, counsellors]);

  // Get unique specializations from counsellors
  const specializations = ["all", ...new Set(counsellors.flatMap(c => c.specialization || []))];

  // Get availability status
  const getAvailabilityStatus = (availability) => {
    if (!availability || availability.length === 0) return "unavailable";
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const hasTodaySlot = availability.some(a => a.day === today && a.slots?.length > 0);
    
    return hasTodaySlot ? "available" : "available-soon";
  };

  // Get availability text
  const getAvailabilityText = (status) => {
    switch (status) {
      case "available": return "Available Today";
      case "available-soon": return "Available This Week";
      default: return "Check Availability";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-700";
      case "available-soon": return "bg-amber-100 text-amber-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Get experience text
  const getExperienceText = (exp) => {
    if (!exp) return "Experience not specified";
    if (exp < 1) return "New counsellor";
    if (exp === 1) return "1 year experience";
    return `${exp}+ years experience`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading counsellors...</h2>
          <p className="text-gray-500 mt-2">Finding the best professionals for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Counsellor</h1>
              <p className="text-gray-600">Connect with licensed mental health professionals</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6">
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Available Counsellors</p>
              <p className="text-xl font-bold text-gray-900">{counsellors.length}</p>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Average Rating</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-xl font-bold text-gray-900">4.8</span>
              </div>
            </div>
            <div className="px-4 py-2 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">Response Time</p>
              <p className="text-xl font-bold text-gray-900">24h</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, specialization, or expertise..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="all">All Specializations</option>
                {specializations
                  .filter(s => s !== "all")
                  .map((spec, index) => (
                    <option key={index} value={spec}>
                      {spec.charAt(0).toUpperCase() + spec.slice(1)}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>All counsellors are licensed professionals</span>
          </div>
        </div>

        {/* Counsellors Grid */}
        {filteredCounsellors.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No counsellors found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedSpecialization !== "all" 
                ? "Try adjusting your search criteria" 
                : "No counsellors are currently available"}
            </p>
            {(searchTerm || selectedSpecialization !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialization("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounsellors.map((counsellor, index) => {
              const availabilityStatus = getAvailabilityStatus(counsellor.availability);
              
              return (
                <motion.div
                  key={counsellor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Counsellor Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {counsellor.name?.charAt(0)?.toUpperCase() || "C"}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${getStatusColor(availabilityStatus)}`}>
                            <div className="w-2 h-2 rounded-full bg-current"></div>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{counsellor.name}</h3>
                              <p className="text-sm text-gray-600">{counsellor.title || "Licensed Therapist"}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-current" />
                              <span className="font-semibold text-gray-900">4.8</span>
                            </div>
                          </div>
                          
                          <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(availabilityStatus)}`}>
                            <Clock className="w-3 h-3" />
                            {getAvailabilityText(availabilityStatus)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Counsellor Details */}
                    <div className="p-6">
                      {/* Specializations */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          <Brain className="w-4 h-4 text-blue-500" />
                          Specializations
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {counsellor.specialization?.slice(0, 3).map((spec, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                            >
                              {spec}
                            </span>
                          ))}
                          {counsellor.specialization?.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{counsellor.specialization.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Experience & Bio */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span>{getExperienceText(counsellor.experience)}</span>
                        </div>
                        
                        {counsellor.bio && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {counsellor.bio}
                          </p>
                        )}
                      </div>

                      {/* Contact & Actions */}
                      <div className="space-y-3">
                        {counsellor.phone && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4 text-green-500" />
                            <span>{counsellor.phone}</span>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <button
                            onClick={() => navigate(`/student/book/${counsellor._id}`)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                          >
                            <Calendar className="w-5 h-5" />
                            Book Session
                          </button>
                          
                          <button
                            onClick={() => navigate(`/student/counsellor/${counsellor._id}`)}
                            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            title="View Profile"
                          >
                            <User className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        {filteredCounsellors.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Your Privacy is Protected</h4>
                <p className="text-gray-600 text-sm">
                  All sessions are confidential and secure. Your conversations with counsellors are private 
                  and protected by professional ethics and privacy laws.
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    Licensed Professionals
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Heart className="w-4 h-4 text-red-500" />
                    Confidential Sessions
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    Flexible Scheduling
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CounsellorList;