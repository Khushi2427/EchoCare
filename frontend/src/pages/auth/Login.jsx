import React, { useState, useEffect } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  LogIn,
  Sparkles,
  AlertCircle,
  User,
  Shield,
  Brain,
  Smartphone,
  ChevronLeft
} from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { login, user } = useAuth(); // ✅ get user
  const navigate = useNavigate();

  // ✅ ONLY login here — no navigation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });
      login(res.data.token); // async fetchUser happens inside
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userFromBackend));

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Navigate AFTER user is loaded
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") navigate("/admin", { replace: true });
    else if (user.role === "counsellor")
      navigate("/counsellor", { replace: true });
    else navigate("/student", { replace: true });
  }, [user, navigate]);

  const roleIcons = {
    student: <User className="w-4 h-4 md:w-5 md:h-5" />,
    counsellor: <Brain className="w-4 h-4 md:w-5 md:h-5" />,
    admin: <Shield className="w-4 h-4 md:w-5 md:h-5" />
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-3 md:p-4">
      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 bg-gradient-to-b from-purple-100 to-white z-0" />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 md:opacity-30"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 md:opacity-20"
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto z-10">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-center mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              EchoCare Login
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
          {/* Left Side - Branding & Info (Hidden on mobile, shown on tablet+) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block"
          >
            <div className="space-y-6 lg:space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl">
                  <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  EchoCare
                </h1>
              </div>

              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3 lg:mb-4">
                  Welcome Back to Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    Wellness Journey
                  </span>
                </h2>
                <p className="text-gray-600 text-base lg:text-lg">
                  Continue your path to better mental health with personalized support, 
                  AI counseling, and a caring community.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 lg:space-y-4">
                {[
                  { icon: <Brain />, text: "AI-Powered Emotional Support" },
                  { icon: <Shield />, text: "100% Confidential & Secure" },
                  { icon: <User />, text: "Personalized Care Plans" },
                  { icon: <Lock />, text: "End-to-End Encryption" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 lg:gap-3 text-sm lg:text-base text-gray-700"
                  >
                    <div className="p-1.5 lg:p-2 bg-purple-100 rounded-lg">
                      {React.cloneElement(feature.icon, { className: "w-4 h-4 lg:w-5 lg:h-5" })}
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Demo Accounts */}
              <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-white/80 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-2 lg:mb-3 text-sm lg:text-base">Demo Accounts</h3>
                <div className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Student</span>
                    <span className="truncate">student@test.com / password123</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Counsellor</span>
                    <span className="truncate">counsellor@test.com / password123</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Admin</span>
                    <span className="truncate">admin@test.com / password123</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Welcome Banner */}
          <div className="md:hidden mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Smartphone className="w-4 h-4" />
              <span className="text-sm font-medium">Welcome to EchoCare</span>
            </div>
            <p className="text-center text-xs opacity-90">
              Sign in to access AI counseling and mental wellness resources
            </p>
          </div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-3xl shadow-lg md:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl md:rounded-2xl mb-3 md:mb-4">
                  <LogIn className="w-5 h-5 md:w-8 md:h-8 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Sign in to continue your wellness journey
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Email Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-3 h-3 md:w-4 md:h-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      className="w-full p-3 md:p-4 pl-10 md:pl-12 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      disabled={isLoading}
                    />
                    <Mail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Lock className="w-3 h-3 md:w-4 md:h-4" />
                      Password
                    </label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs md:text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      className="w-full p-3 md:p-4 pl-10 md:pl-12 pr-10 md:pr-12 text-sm md:text-base bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
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
                </div>

                {/* Remember Me & Quick Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      disabled={isLoading}
                    />
                    <span className="text-gray-700 text-sm md:text-base">Remember me</span>
                  </label>
                  
                  {/* Mobile Quick Register */}
                  <Link 
                    to="/register" 
                    className="sm:hidden text-xs text-purple-600 hover:text-purple-700 font-medium hover:underline transition-colors"
                  >
                    Create new account
                  </Link>
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
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-red-600 text-xs md:text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className={`w-full py-3 md:py-4 px-6 rounded-lg md:rounded-xl font-semibold text-white transition-all duration-300 text-sm md:text-base ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-200"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span className="hidden sm:inline">Signing in...</span>
                      <span className="sm:hidden">Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogIn className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Sign In</span>
                    </div>
                  )}
                </motion.button>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-3 text-gray-500 text-xs md:text-sm">or continue with</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Login (Placeholder) */}
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1 md:gap-2 p-2.5 md:p-3 border-2 border-gray-200 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors text-xs md:text-sm"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="hidden sm:inline">Google</span>
                    <span className="sm:hidden">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1 md:gap-2 p-2.5 md:p-3 border-2 border-gray-200 rounded-lg md:rounded-xl hover:bg-gray-50 transition-colors text-xs md:text-sm"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="#000000" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="hidden sm:inline">GitHub</span>
                    <span className="sm:hidden">GitHub</span>
                  </button>
                </div>

                {/* Register Link */}
                <div className="text-center pt-2 md:pt-4">
                  <p className="text-gray-600 text-sm md:text-base">
                    Don't have an account?{" "}
                    <Link 
                      to="/register" 
                      className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
                    >
                      Sign up now
                    </Link>
                  </p>
                </div>
              </form>
            </div>

            {/* Role-Based Landing Page Info */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 md:mt-6 p-3 md:p-4 bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl border border-gray-200"
            >
              <p className="text-xs md:text-sm text-gray-600 text-center">
                After login, you'll be redirected based on your role
              </p>
              <div className="flex items-center justify-center gap-2 md:gap-4 mt-2">
                {Object.entries(roleIcons).map(([role, icon]) => (
                  <div key={role} className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                    <span className="p-1 bg-gray-100 rounded">
                      {icon}
                    </span>
                    <span className="capitalize hidden sm:inline">{role}</span>
                    <span className="capitalize sm:hidden text-xs">
                      {role === 'student' ? 'Student' : role === 'counsellor' ? 'Counselor' : 'Admin'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mobile Quick Links */}
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/"
                  className="flex items-center justify-center gap-2 py-2 px-4 border-2 border-purple-200 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors text-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Go Home
                </Link>
                <Link 
                  to="/resources"
                  className="text-center py-2 px-4 border-2 border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Resources
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

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

export default Login;