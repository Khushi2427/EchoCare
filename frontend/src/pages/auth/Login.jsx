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
  AlertCircle,
  User,
  Shield,
  Brain,
  ChevronLeft,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await loginUser({ email, password });
      login(res.data.token); 
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") navigate("/admin", { replace: true });
    else if (user.role === "counsellor") navigate("/counsellor", { replace: true });
    else navigate("/student", { replace: true });
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden font-sans">
      {/* Background Aesthetic Elements - Optimized for mobile performance */}
      <div className="absolute top-[-5%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-50 rounded-full blur-[80px] md:blur-[120px] opacity-60" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-50 rounded-full blur-[70px] md:blur-[100px] opacity-50" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-10 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative z-10 border border-slate-100">
        
        {/* LEFT SIDEBAR: Hidden or Stacked on Mobile */}
        <div className="md:col-span-4 bg-[#1e293b] p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Pattern for Sidebar */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
             <svg width="100%" height="100%"><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
          </div>

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2.5 mb-8 md:mb-16 group">
              <div className="p-2 bg-indigo-500 rounded-lg group-hover:bg-indigo-400 transition-colors">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight">EchoCare</span>
            </Link>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-4 md:mb-8">
              Welcome back to <br className="hidden md:block" />
              <span className="text-indigo-400">your safe space.</span>
            </h2>

            {/* Features List - Horizontal on small screens, Vertical on medium+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 md:gap-8 mt-6 md:mt-12">
              {[
                { title: "Secure Access", desc: "Sessions protected with E2E encryption", icon: <Shield className="w-4 h-4 md:w-5 md:h-5 text-indigo-400"/> },
                { title: "Role-Based Hub", desc: "Tailored for your specific needs", icon: <Brain className="w-4 h-4 md:w-5 md:h-5 text-indigo-400"/> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4">
                  <div className="mt-1 flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-medium text-slate-100 text-sm md:text-base">{item.title}</h4>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-6 md:pt-8 border-t border-slate-700/50 mt-8 md:mt-0">
             <div className="flex flex-wrap gap-4 items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 md:w-7 md:h-7 rounded-full border-2 border-[#1e293b] bg-slate-700 flex items-center justify-center text-[8px]">
                      <User className="w-3 h-3 text-slate-300" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] md:text-[11px] text-slate-400 uppercase tracking-widest font-bold">Join 2,000+ Students</p>
             </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="md:col-span-6 p-6 sm:p-10 lg:p-16 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            <div className="mb-6 md:mb-10 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Sign In</h1>
              <p className="text-slate-500 text-sm mt-2">
                New here? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Create an account</Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm md:text-base text-slate-800"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <Link to="/forgot-password" size="sm" className="text-[10px] md:text-xs font-bold text-indigo-600 hover:text-indigo-700">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm md:text-base text-slate-800"
                    required
                    disabled={isLoading}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center gap-2 px-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="remember" className="text-xs md:text-sm text-slate-600 cursor-pointer select-none">
                  Keep me signed in
                </label>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-100 flex items-center gap-2"
                  >
                    <AlertCircle size={14} /> {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-slate-900 text-white py-3.5 md:py-4 rounded-xl font-bold transition-all hover:bg-slate-800 active:scale-[0.99] disabled:bg-slate-200 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 shadow-lg shadow-slate-100 md:shadow-xl md:shadow-slate-200"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="text-sm md:text-base">Sign In to Dashboard</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Back to Home Link */}
            <div className="mt-8 md:mt-10 pt-6 border-t border-slate-100 flex justify-center">
              <Link to="/" className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">
                <ChevronLeft size={14} /> Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;