import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserPlus,
  Trash2,
  Edit2,
  Clock,
  Calendar,
  Users,
  Phone,
  Mail,
  Key,
  User,
  Tag,
  X,
  Plus,
  Save,
  AlertCircle,
  CheckCircle,
  Shield
} from "lucide-react";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00", 
  "17:00", "18:00", "19:00", "20:00"
];

const AdminCounsellors = () => {
  const [counsellors, setCounsellors] = useState([]);
  const [availabilityList, setAvailabilityList] = useState([]);
  const [availabilityDay, setAvailabilityDay] = useState("");
  const [availabilitySlots, setAvailabilitySlots] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    specialization: "",
    phone: "",
    email: "",
  });

  const adminToken = localStorage.getItem("token");

  // 🔹 Fetch counsellors
  const fetchCounsellors = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/counsellors`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      setCounsellors(res.data);
    } catch (error) {
      console.error("Error fetching counsellors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounsellors();
  }, []);

  // 🔹 Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add availability
  const addAvailability = () => {
    if (!availabilityDay || !availabilitySlots) return;

    setAvailabilityList([
      ...availabilityList,
      {
        day: availabilityDay,
        slots: availabilitySlots.split(",").map((s) => s.trim()),
      },
    ]);

    setAvailabilityDay("");
    setAvailabilitySlots("");
  };

  // 🔹 Remove availability
  const removeAvailability = (index) => {
    setAvailabilityList(
      availabilityList.filter((_, i) => i !== index)
    );
  };

  // 🔹 Create counsellor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const payload = {
        ...form,
        specialization: form.specialization.split(",").map((s) => s.trim()),
        availability: availabilityList,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/counsellors`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      setSuccessMessage("Counsellor created successfully!");
      setForm({
        name: "",
        username: "",
        password: "",
        specialization: "",
        phone: "",
        email: "",
      });
      setAvailabilityList([]);
      setShowForm(false);
      fetchCounsellors();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error creating counsellor:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete counsellor
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/counsellors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      fetchCounsellors();
    } catch (error) {
      console.error("Error deleting counsellor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Counsellor Management</h1>
                  <p className="text-gray-600">Manage your team of mental health professionals</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {counsellors.length} Active Counsellors
                </div>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  All Systems Operational
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              <UserPlus className="w-5 h-5" />
              {showForm ? "Cancel" : "Add Counsellor"}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">{successMessage}</p>
                <p className="text-sm text-green-600">The counsellor has been added to the system</p>
              </div>
            </div>
          </div>
        )}

        {/* CREATE FORM */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Add New Counsellor
              </h2>
              <p className="text-gray-600 text-sm mt-1">Fill in the counsellor's details and availability</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      placeholder="Dr. John Smith"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="username"
                      placeholder="john.smith"
                      value={form.username}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Specialization <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="specialization"
                      placeholder="Anxiety, Depression, Stress Management"
                      value={form.specialization}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <p className="mt-1 text-sm text-gray-500">Separate specializations with commas</p>
                  </div>
                </div>

                {/* Right Column - Contact & Availability */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john.smith@clinic.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* AVAILABILITY */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Set Availability
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                          <select
                            value={availabilityDay}
                            onChange={(e) => setAvailabilityDay(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          >
                            <option value="">Select a day</option>
                            {days.map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Time Slots</label>
                          <select
                            value={availabilitySlots}
                            onChange={(e) => setAvailabilitySlots(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                          >
                            <option value="">Select time slots</option>
                            {timeSlots.map((time) => (
                              <option key={time} value={time}>{time}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={addAvailability}
                        disabled={!availabilityDay || !availabilitySlots}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                        Add Time Slot
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Added Availability Display */}
              {availabilityList.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-3">Scheduled Availability</h4>
                  <div className="flex flex-wrap gap-2">
                    {availabilityList.map((a, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200"
                      >
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-gray-700">{a.day}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{a.slots.join(", ")}</span>
                        <button
                          type="button"
                          onClick={() => removeAvailability(index)}
                          className="ml-2 p-1 hover:bg-red-50 rounded text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Create Counsellor
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* COUNSELLORS LIST */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Active Counsellors
              <span className="ml-2 px-2.5 py-0.5 bg-blue-100 text-blue-700 text-sm rounded-full">
                {counsellors.length}
              </span>
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading counsellors...</p>
            </div>
          ) : counsellors.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No counsellors found</h3>
              <p className="text-gray-600 mb-4">Add your first counsellor to get started</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                <UserPlus className="w-4 h-4" />
                Add Counsellor
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Counsellor</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Contact</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Specialization</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {counsellors.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {c.name?.charAt(0)?.toUpperCase() || "C"}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{c.name}</div>
                            <div className="text-sm text-gray-500">@{c.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            {c.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            {c.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(c.specialization) && c.specialization.map((spec, index) => (
                            <span
                              key={index}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {/* Edit functionality would go here */}}
                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(c._id, c.name)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Stats Footer */}
          {counsellors.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>All accounts active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Ready for appointments</span>
                  </div>
                </div>
                <div>
                  Showing {counsellors.length} counsellor{counsellors.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// Add motion from framer-motion
import { motion } from "framer-motion";

export default AdminCounsellors;