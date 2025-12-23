import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, User, Eye, EyeOff, CheckCircle, 
  XCircle, Sparkles, ArrowRight, ShieldCheck, ChevronLeft
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
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateStep1() || !validateStep2()) return;

    try {
      setLoading(true);
      const { data } = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setTimeout(() => {
        localStorage.setItem("token", data.token);
        navigate("/login", { 
          state: { message: "Registration successful! Please login to continue." } 
        });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    { label: "8+ Char", met: formData.password.length >= 8 },
    { label: "Uppercase", met: /[A-Z]/.test(formData.password) },
    { label: "Number", met: /[0-9]/.test(formData.password) },
    { label: "Special", met: /[^A-Za-z0-9]/.test(formData.password) }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-3 sm:p-4 md:p-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-50 rounded-full blur-[80px] md:blur-[120px] opacity-60" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-50 rounded-full blur-[70px] md:blur-[100px] opacity-50" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-10 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative z-10 border border-slate-100">
        
        {/* LEFT SIDEBAR: Professional Deep Slate */}
        <div className="md:col-span-4 bg-[#1e293b] p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2.5 mb-8 md:mb-16">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold tracking-tight">EchoCare</span>
            </Link>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight mb-6 md:mb-8">
              A secure space for your <br className="hidden md:block" />
              <span className="text-indigo-400">mental wellbeing.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 md:gap-8 mt-6 md:mt-12">
              {[
                { title: "Confidentiality", desc: "Data encryption at rest", icon: <Lock className="w-4 h-4 text-indigo-400"/> },
                { title: "AI Assistance", desc: "24/7 intelligent support", icon: <Sparkles className="w-4 h-4 text-indigo-400"/> },
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
             <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">Trusted by Healthcare Pros</p>
          </div>
        </div>

        {/* RIGHT SIDE: Register Form */}
        <div className="md:col-span-6 p-6 sm:p-10 lg:p-16 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            {/* Minimal Progress */}
            <div className="mb-8 md:mb-10 text-center md:text-left">
              <div className="flex gap-2 mb-4 md:mb-6">
                 <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 1 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                 <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 2 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Create account</h1>
              <p className="text-slate-500 text-sm mt-2">Already a member? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link></p>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 md:space-y-5"
                >
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alex Johnson"
                        className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm md:text-base text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className="w-full pl-11 pr-4 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm md:text-base text-slate-800"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full bg-slate-900 text-white py-3.5 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mt-4 shadow-lg shadow-slate-100"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 md:space-y-5"
                >
                   <button 
                    onClick={handlePrevStep}
                    className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest mb-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to Step 1
                  </button>

                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Create Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-11 pr-11 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm md:text-base"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                      >
                        {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                      </button>
                    </div>

                    {formData.password && (
                      <div className="pt-2">
                        <div className="flex gap-1 h-1 mb-3">
                          {[1,2,3,4].map((i) => (
                            <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i <= passwordStrength ? (passwordStrength <= 2 ? 'bg-amber-400' : 'bg-indigo-500') : 'bg-slate-100'}`} />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-y-2">
                          {passwordRequirements.map((req, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold uppercase tracking-tight">
                              <CheckCircle className={`w-3 h-3 ${req.met ? "text-indigo-500" : "text-slate-200"}`} />
                              <span className={req.met ? "text-slate-700" : "text-slate-400"}>{req.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-11 pr-11 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm md:text-base"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl border border-red-100 flex items-center gap-2">
                      <XCircle size={14} /> {error}
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3.5 md:py-4 rounded-xl font-bold transition-all hover:bg-indigo-700 disabled:bg-slate-200 mt-4 shadow-lg shadow-indigo-100"
                  >
                    {loading ? "Registering..." : "Complete Registration"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
               <p className="text-[10px] text-slate-400 leading-relaxed max-w-[280px] mx-auto">
                By joining, you agree to our <Link to="/terms" className="underline font-medium">Terms</Link> and <Link to="/privacy" className="underline font-medium">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;