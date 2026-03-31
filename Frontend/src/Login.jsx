import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigation, Mail, Lock, Chrome } from "lucide-react";
import SocialLogin from './components/Social-buttons';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Updated to typical login endpoint
      const res = await axios.post("http://localhost:3000/login", data);
      toast.success("Welcome back!");
      console.log(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* SHARED NEBULA BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
      </div>

      {/* BRANDING LINK */}
      <Link to="/" className="relative z-10 flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
          <Navigation className="text-white" size={20} />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">NEBULA</span>
      </Link>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white tracking-tight italic">Welcome Back.</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* EMAIL FIELD */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/40 border ${errors.email ? 'border-red-500' : 'border-white/5'} focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                  })}
                />
              </div>
              {errors.email && <p className="text-red-400 text-[10px] font-bold uppercase ml-1">{errors.email.message}</p>}
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Password
                </label>
                <Link to="/forgot-password" size={14} className="text-xs font-bold text-indigo-400 hover:text-indigo-300">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-800/40 border ${errors.password ? 'border-red-500' : 'border-white/5'} focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" }
                  })}
                />
              </div>
              {errors.password && <p className="text-red-400 text-[10px] font-bold uppercase ml-1">{errors.password.message}</p>}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-xl disabled:opacity-50 uppercase tracking-widest"
            >
              {isSubmitting ? "Authenticating..." : "Login"}
            </button>

      

            {/* SOCIAL LOGIN */}
            <SocialLogin/>
          </form>

          {/* FOOTER */}
          <p className="text-center text-slate-500 text-sm mt-8 font-medium">
            New here?{" "}
            <Link to="/signup" className="text-indigo-400 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}