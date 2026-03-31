import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  User, Mail, Lock, ShieldCheck, 
  Eye, EyeOff, Send, ArrowLeft, RefreshCcw, CheckCircle2 
} from "lucide-react";
import SocialLogin from './Social-buttons';

export default function Register() {
  const { 
    register, 
    handleSubmit, 
    watch, 
    trigger, // Used to manually trigger validation
    formState: { errors } 
  } = useForm();

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  
  // Loading States
  const [loading, setLoading] = useState({ otp: false, verify: false, reg: false });

  const email = watch("email");
  const otpValue = watch("otp");

  // Step 1: Validate Fields then Send OTP
  const handleInitialSubmit = async () => {
    // Validate name, email, and password specifically
    const isValid = await trigger(["name", "email", "password"]);
    
    if (!isValid) {
        toast.error("Please fix the errors above");
        return;
    }

    try {
      setLoading(prev => ({ ...prev, otp: true }));
      await axios.post("http://localhost:3000/send-otp", { email });
      setOtpSent(true);
      toast.success("Code sent to your inbox");
    } catch (error) {
      toast.error("Failed to send code. Try again.");
    } finally {
      setLoading(prev => ({ ...prev, otp: false }));
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(prev => ({ ...prev, verify: true }));
      const res = await axios.post("http://localhost:3000/verify-otp", { email, otp: otpValue });
      if (res.data.success) {
        setOtpVerified(true);
        setVerifiedEmail(email);
        toast.success("Email Verified!");
      }
    } catch (error) {
      toast.error("Invalid or expired code");
    } finally {
      setLoading(prev => ({ ...prev, verify: false }));
    }
  };

  const onRegister = async (data) => {
    if (data.email !== verifiedEmail) return toast.error("Email mismatch. Re-verify.");
    try {
      setLoading(prev => ({ ...prev, reg: true }));
      await axios.post("http://localhost:3000/register", data);
      toast.success("Welcome to the Nebula!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(prev => ({ ...prev, reg: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-10 shadow-2xl">
          
          <form onSubmit={handleSubmit(onRegister)} className="space-y-6">
            <AnimatePresence mode="wait">
              {!otpSent ? (
                /* STEP 1: INITIAL DETAILS WITH VALIDATION */
                <motion.div 
                  key="details-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">Join Nebula</h2>
                    <p className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-[0.2em]">Enter details to start verification</p>
                  </div>

                  <div className="space-y-4">
                    {/* NAME */}
                    <div className="space-y-1">
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                          {...register("name", { 
                            required: "Name is required", 
                            minLength: { value: 5, message: "Name must be at least 5 characters" } 
                          })} 
                          placeholder="Full Name" 
                          className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} focus:border-indigo-500 outline-none transition-all`} 
                        />
                      </div>
                      {errors.name && <p className="text-red-400 text-[10px] font-bold uppercase ml-2">{errors.name.message}</p>}
                    </div>

                    {/* EMAIL */}
                    <div className="space-y-1">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                          {...register("email", { 
                            required: "Email is required", 
                            pattern: { value: /^[a-z0-9._%+-]+@gmail\.com$/, message: "Must be a valid @gmail.com" } 
                          })} 
                          placeholder="Gmail Address" 
                          className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} focus:border-indigo-500 outline-none transition-all`} 
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase ml-2">{errors.email.message}</p>}
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-1">
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input 
                          type={showPassword ? "text" : "password"} 
                          {...register("password", { 
                            required: "Password is required", 
                            minLength: { value: 6, message: "Min 6 characters required" } 
                          })} 
                          placeholder="Create Password" 
                          className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} focus:border-indigo-500 outline-none transition-all`} 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-400 text-[10px] font-bold uppercase ml-2">{errors.password.message}</p>}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleInitialSubmit}
                    disabled={loading.otp}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                  >
                    {loading.otp ? "Requesting OTP..." : "Get Verification Code"}
                  </button>
                </motion.div>
              ) : (
                /* STEP 2: OTP VERIFICATION VIEW */
                <motion.div 
                  key="otp-step"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6 text-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20 shadow-inner">
                      <ShieldCheck className="text-indigo-400" size={36} />
                    </div>
                    <h2 className="text-xl font-black text-white uppercase tracking-widest">Confirm OTP</h2>
                    <div className="mt-3 bg-white/5 px-4 py-2 rounded-full border border-white/5 flex items-center gap-3">
                      <span className="text-[10px] text-slate-400 font-bold truncate max-w-[140px] tracking-tight">{email}</span>
                      <button onClick={() => setOtpSent(false)} className="text-[10px] text-indigo-400 font-black uppercase hover:text-white transition-colors">Edit</button>
                    </div>
                  </div>

                  {!otpVerified ? (
                    <div className="space-y-6 pt-4">
                      <input
                        {...register("otp", { required: true })}
                        maxLength={6}
                        autoFocus
                        placeholder="000000"
                        className="w-full bg-transparent border-b-2 border-slate-800 focus:border-indigo-500 outline-none text-center text-5xl font-black tracking-[0.4em] text-white py-4 transition-all placeholder:text-slate-900"
                      />
                      
                      <button
                        type="button"
                        onClick={verifyOTP}
                        disabled={loading.verify}
                        className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95"
                      >
                        {loading.verify ? "Verifying..." : "Validate Identity"}
                      </button>

                      <button type="button" onClick={handleInitialSubmit} className="flex items-center justify-center gap-2 w-full text-[10px] font-black text-slate-500 hover:text-indigo-400 transition-colors uppercase">
                        <RefreshCcw size={12} /> Resend OTP Code
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2.5rem] flex flex-col items-center"
                    >
                      <CheckCircle2 className="text-emerald-400 mb-2" size={44} />
                      <p className="text-emerald-400 font-black text-xs uppercase tracking-widest">Identity Confirmed</p>
                      <p className="text-slate-500 text-[10px] mt-1 font-medium">Click below to finalize your account</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={!otpVerified || loading.reg}
                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-lg ${
                      otpVerified 
                      ? "bg-indigo-600 text-white shadow-indigo-600/30 active:scale-95" 
                      : "bg-slate-800 text-slate-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {loading.reg ? "Creating..." : "Complete Registration"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {!otpSent && (
            <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
              <SocialLogin />
              <p className="text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                Member already? <Link to="/login" className="text-indigo-400 font-black hover:text-white transition-colors ml-1">Log In</Link>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}