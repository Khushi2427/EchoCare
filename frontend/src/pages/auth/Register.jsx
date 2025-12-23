import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  Sparkles,
  ArrowRight,
  Smartphone
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Calculate password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const validateStep1 = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please fill in all required fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password.trim() || !formData.confirmPassword.trim()) {
      setError("Please fill in all password fields");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    setError("");
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateStep1() || !validateStep2()) {
      return;
    }

    try {
      setLoading(true);

      const { data } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Success animation before navigation
      setTimeout(() => {
        // Save token
        localStorage.setItem("token", data.token);
        // Redirect to login with success message
        navigate("/login", { 
          state: { 
            message: "Registration successful! Please login to continue." 
          } 
        });
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "One number", met: /[0-9]/.test(formData.password) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 flex items-center justify-center p-3 md:p-4">
      {/* Mobile Background (Shows only on mobile) */}
      <div className="md:hidden fixed inset-0 bg-gradient-to-b from-pink-100 to-white z-0" />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 left-1/4 w-64 h-64 md:w-80 md:h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, -30, 0],
            rotate: [0, -90, 0]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        />
      </div>

      <div className="relative w-full max-w-4xl mx-auto z-10">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              EchoCare
            </h1>
          </div>
        </div>

        {/* Progress Bar - Mobile Optimized */}
        <div className="flex justify-center mb-6 md:mb-8 px-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            {[1, 2].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <motion.div
                  animate={{ 
                    scale: step >= stepNumber ? 1.1 : 1,
                    backgroundColor: step >= stepNumber ? "#db2777" : "#f3f4f6"
                  }}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base ${
                    step >= stepNumber ? "text-white" : "text-gray-500"
                  }`}
                >
                  {stepNumber}
                </motion.div>
                {stepNumber < 2 && (
                  <div className="w-16 md:w-24 h-1 bg-gray-200 mx-1 md:mx-2">
                    <motion.div 
                      animate={{ width: step >= 2 ? "100%" : "0%" }}
                      className="h-full bg-pink-600"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl overflow-hidden mx-2 md:mx-0"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Side - Welcome (Hidden on mobile, shown on tablet+) */}
            <div className="hidden md:block bg-gradient-to-br from-pink-600 to-rose-600 p-8 lg:p-12 text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6 lg:mb-8">
                    <div className="p-3 bg-white/20 rounded-2xl">
                      <Sparkles className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold">EchoCare</h1>
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
                    Join Our
                    <span className="block text-white/90">Wellness Family</span>
                  </h2>
                  
                  <p className="text-white/80 text-base lg:text-lg mb-6 lg:mb-8">
                    Start your journey towards better mental health with personalized support, 
                    AI counseling, and a caring community.
                  </p>

                  <div className="space-y-3 lg:space-y-4">
                    {[
                      "🤖 24/7 AI Mental Health Support",
                      "👥 Safe & Supportive Community",
                      "🔒 100% Confidential & Secure",
                      "🎓 Student-Focused Resources"
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base"
                      >
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-white/10 rounded-xl">
                  <p className="text-xs lg:text-sm opacity-90">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold underline hover:text-white/90">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Welcome Card (Shows only on mobile) */}
            <div className="md:hidden p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-t-2xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm font-medium">Welcome to EchoCare</span>
              </div>
              <p className="text-center text-sm opacity-90">
                Join thousands of students on their mental wellness journey
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl md:rounded-2xl mb-3 md:mb-4">
                  <UserPlus className="w-5 h-5 md:w-8 md:h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Create Account
                </h2>
                <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
                  Step {step} of 2 • Quick & Secure
                </p>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full p-3 md:p-4 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full p-3 md:p-4 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-300"
                        required
                      />
                    </div>

                    <motion.button
                      type="button"
                      onClick={handleNextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 md:py-4 px-6 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg md:rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      Continue to Password
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.button>

                    {/* Mobile Divider */}
                    <div className="pt-4 border-t border-gray-200 md:hidden">
                      <p className="text-center text-gray-600 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-pink-600 hover:text-rose-700 font-semibold">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a strong password"
                          className="w-full p-3 md:p-4 pl-10 md:pl-12 pr-10 md:pr-12 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-300"
                          required
                        />
                        <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? 
                            <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : 
                            <Eye className="w-4 h-4 md:w-5 md:h-5" />
                          }
                        </button>
                      </div>

                      {/* Password Strength Meter */}
                      {formData.password && (
                        <div className="mt-2 md:mt-3">
                          <div className="flex justify-between text-xs md:text-sm mb-1">
                            <span className="text-gray-600">Password strength</span>
                            <span className={`font-medium ${
                              passwordStrength === 4 ? "text-green-600" :
                              passwordStrength >= 2 ? "text-yellow-600" : "text-red-600"
                            }`}>
                              {passwordStrength === 4 ? "Strong" :
                               passwordStrength >= 2 ? "Good" : "Weak"}
                            </span>
                          </div>
                          <div className="h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                              className={`h-full ${
                                passwordStrength === 4 ? "bg-green-500" :
                                passwordStrength >= 2 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                            />
                          </div>

                          {/* Password Requirements - Mobile Compact */}
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-2">
                            {passwordRequirements.map((req, idx) => (
                              <div key={idx} className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                                {req.met ? (
                                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                  <XCircle className="w-3 h-3 md:w-4 md:h-4 text-gray-300 flex-shrink-0" />
                                )}
                                <span className={req.met ? "text-green-600" : "text-gray-500"}>
                                  {req.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Lock className="w-4 h-4" />
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className="w-full p-3 md:p-4 pl-10 md:pl-12 pr-10 md:pr-12 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-300"
                          required
                        />
                        <Lock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? 
                            <EyeOff className="w-4 h-4 md:w-5 md:h-5" /> : 
                            <Eye className="w-4 h-4 md:w-5 md:h-5" />
                          }
                        </button>
                      </div>
                      {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 flex items-center gap-2 text-green-600 text-xs md:text-sm"
                        >
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                          Passwords match
                        </motion.div>
                      )}
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-start gap-2 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg md:rounded-xl"
                        >
                          <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-red-600 text-xs md:text-sm">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        disabled={loading}
                        className="order-2 sm:order-1 flex-1 py-3 md:py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-lg md:rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 text-sm md:text-base"
                      >
                        Back
                      </button>

                      <motion.button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        whileHover={loading ? {} : { scale: 1.02 }}
                        whileTap={loading ? {} : { scale: 0.98 }}
                        className={`order-1 sm:order-2 flex-1 py-3 md:py-4 px-6 rounded-lg md:rounded-xl font-semibold text-white transition-all duration-300 text-sm md:text-base ${
                          loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-lg hover:shadow-pink-200"
                        }`}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span className="hidden sm:inline">Creating Account...</span>
                            <span className="sm:hidden">Creating...</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer Links */}
              <div className="mt-6 md:mt-8 text-center">
                <p className="text-gray-600 text-xs md:text-sm px-4">
                  By registering, you agree to our{" "}
                  <Link to="/terms" className="text-pink-600 hover:text-rose-700 font-medium hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-pink-600 hover:text-rose-700 font-medium hover:underline">
                    Privacy
                  </Link>
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-200 hidden md:block">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-pink-600 hover:text-rose-700 font-semibold hover:underline">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>

              {/* Mobile Quick Links */}
              <div className="md:hidden mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/login"
                    className="text-center py-2 px-4 border-2 border-pink-200 text-pink-600 rounded-lg font-medium hover:bg-pink-50 transition-colors text-sm"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/forgot-password"
                    className="text-center py-2 px-4 border-2 border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Footer */}
        <div className="mt-4 text-center md:hidden">
          <p className="text-xs text-gray-500">
            © 2025 EchoCare • Mental Wellness Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;