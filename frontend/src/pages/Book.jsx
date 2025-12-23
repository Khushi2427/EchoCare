import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Shield,
  Award,
  Sparkles,
  User,
  CheckCircle,
  ArrowRight,
  MessageSquare,
  Video,
  Phone,
  MapPin,
  AlertCircle,
  Heart,
  LogIn,
  UserPlus,
  ChevronDown,
  CalendarDays
} from "lucide-react";

const Book = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "morning",
    type: "individual",
    description: "",
    counselor: "",
    mode: "video"
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock login check
  const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  };

  React.useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, []);

  const timeSlots = [
    { value: "morning", label: "Morning (9 AM - 12 PM)", icon: "🌅" },
    { value: "afternoon", label: "Afternoon (1 PM - 4 PM)", icon: "☀️" },
    { value: "evening", label: "Evening (5 PM - 8 PM)", icon: "🌙" }
  ];

  const sessionTypes = [
    { value: "individual", label: "Individual Counseling", icon: <User className="w-4 h-4" /> },
    { value: "couple", label: "Couple Counseling", icon: <Users className="w-4 h-4" /> },
    { value: "group", label: "Group Therapy", icon: <Users className="w-4 h-4" /> }
  ];

  const benefits = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "100% Confidential",
      description: "Your privacy is our top priority. All sessions are completely confidential and secure.",
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Certified Professionals",
      description: "Connect with licensed counselors and mental health professionals.",
      color: "text-green-600 bg-green-50"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule, with same-day availability.",
      color: "text-purple-600 bg-purple-50"
    }
  ];

  // Sample dates for next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert("Appointment booked successfully! You will receive a confirmation email shortly.");
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-teal-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  EchoCare
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-lg transition-shadow text-sm font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Login Required Section */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-teal-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Book Confidential Session
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule private appointments with certified counselors. Please login or sign up to access booking services.
            </p>

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-gray-800">Authentication Required</h2>
              </div>
              
              <p className="text-gray-600 mb-8 text-center">
                To book counseling sessions and ensure your privacy, you need to have an account with EchoCare.
                This allows us to provide you with secure, confidential support and manage your appointments effectively.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-blue-700 mb-3">Why Register?</h3>
                  <ul className="space-y-2 text-sm text-blue-600">
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Secure & confidential session management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Easy appointment scheduling & reminders</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Personalized wellness recommendations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-teal-50 rounded-xl p-6">
                  <h3 className="font-bold text-teal-700 mb-3">What You Get</h3>
                  <ul className="space-y-2 text-sm text-teal-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Access to certified mental health professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Free AI wellness chat included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Join supportive student communities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                >
                  <LogIn className="w-5 h-5" />
                  Login to Book Session
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-teal-500 text-teal-600 rounded-xl font-bold hover:bg-teal-50 transition-all hover:scale-105"
                >
                  <UserPlus className="w-5 h-5" />
                  Create Free Account
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-6 text-center">
                Already have an account? <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium">Login here</Link>
              </p>
            </div>

            {/* Benefits Preview */}
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-800 mb-6">What to Expect</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className={`inline-flex p-3 rounded-lg ${benefit.color} mb-4`}>
                      {benefit.icon}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  // Logged in view
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-teal-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                EchoCare
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white font-medium">
                U
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setIsLoggedIn(false);
                  navigate("/");
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Book Confidential Session
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Schedule private appointments with certified counselors.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Schedule Your Session</h2>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Preferred Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                  {dates.map((dateObj) => (
                    <button
                      key={dateObj.value}
                      type="button"
                      onClick={() => handleChange('date', dateObj.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${formData.date === dateObj.value
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-300 hover:bg-teal-50/50'
                        }`}
                    >
                      <div className="text-xs text-gray-500 mb-1">
                        {dateObj.display.split(' ')[0]}
                      </div>
                      <div className="font-medium">
                        {dateObj.display.split(' ').slice(1).join(' ')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Preferred Time
                </label>
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <label
                      key={slot.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.time === slot.value
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="time"
                        value={slot.value}
                        checked={formData.time === slot.value}
                        onChange={(e) => handleChange('time', e.target.value)}
                        className="w-4 h-4 text-teal-600"
                      />
                      <span className="text-xl">{slot.icon}</span>
                      <span className="font-medium">{slot.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Session Type */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Session Type
                </label>
                <div className="space-y-2">
                  {sessionTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.type === type.value
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-teal-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={(e) => handleChange('type', e.target.value)}
                        className="w-4 h-4 text-teal-600"
                      />
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {type.icon}
                      </div>
                      <span className="font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Brief Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Briefly describe what you'd like to discuss..."
                  rows="4"
                  className="w-full p-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-300 resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  This helps your counselor prepare for your session. All information is confidential.
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || !formData.date}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${!formData.date || isSubmitting
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-600 to-blue-600 text-white hover:shadow-xl'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Book Appointment"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Benefits & Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Why Choose EchoCare</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${benefit.color} mt-1`}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{benefit.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Confirmation</h4>
                    <p className="text-sm text-gray-600">Receive instant confirmation via email</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Counselor Match</h4>
                    <p className="text-sm text-gray-600">Get matched with the best counselor for your needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Reminder</h4>
                    <p className="text-sm text-gray-600">Get session reminders 24 hours before</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <h3 className="font-bold text-gray-800">Need Immediate Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                If you're in crisis or need immediate support, please contact:
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 font-bold text-center">
                  National Suicide Prevention Lifeline:{" "}
                  <span className="text-lg">1-800-273-8255</span>
                </p>
                <p className="text-red-600 text-sm text-center mt-1">Available 24/7</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>All counseling sessions are confidential and protected by HIPAA-compliant privacy measures.</p>
            <p className="mt-2">
              © 2025 EchoCare Counseling Services. This service connects you with licensed mental health professionals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Book;