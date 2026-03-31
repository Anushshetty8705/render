import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigation, Mail, ArrowLeft, Loader2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const sendResetLink = async (data) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/forgot-password",
        { email: data.email }
      );
      toast.success(res.data.message || "Reset link sent to your email!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* NEBULA BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
      </div>

      {/* BRANDING */}
      <Link to="/" className="relative z-10 flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
          <Navigation className="text-white" size={20} />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Nebula</span>
      </Link>

      <motion.div 
        variants={fadeUp} 
        initial="hidden" 
        animate="show" 
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight italic">Reset Access.</h2>
            <p className="text-slate-500 text-sm mt-2 px-4">
              Enter your email and we'll send you a recovery link.
            </p>
          </div>

          <form onSubmit={handleSubmit(sendResetLink)} className="space-y-6">
            
            {/* EMAIL INPUT */}
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-800/40 border transition-all outline-none ${
                    errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-indigo-500'
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Only @gmail.com addresses are allowed"
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[10px] font-bold uppercase ml-1 tracking-wider">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Sending Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* BACK TO LOGIN */}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors font-bold text-sm"
            >
              <ArrowLeft size={16} />
              Back to Login
            </button>

          </form>
        </div>
      </motion.div>

      {/* FOOTER DECORATION */}
      <p className="relative z-10 text-center text-slate-600 text-xs mt-8 tracking-widest uppercase font-medium">
        Secure Recovery Protocol v3.0
      </p>
    </div>
  );
}