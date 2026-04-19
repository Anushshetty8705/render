import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigation, Lock, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  // Watch the password field to compare with confirmPassword
  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put("http://localhost:3000/update-password", {
        token: token,
        password: data.password
      });

      toast.success(res.data.message || "Security credentials updated");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* NEBULA BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
      </div>

      <Link to="/" className="relative z-10 flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
          <Navigation className="text-white" size={20} />
        </div>
        <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Nebula</span>
      </Link>

      <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tight italic text-balance">New Credentials.</h2>
            <p className="text-slate-500 text-sm mt-2 px-4">
              Enter a strong password to secure your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* NEW PASSWORD */}
            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="New Password"
                  className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-800/40 border transition-all outline-none ${
                    errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-indigo-500'
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters required" }
                  })}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-[10px] font-bold uppercase ml-1">{errors.password.message}</p>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-1">
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-800/40 border transition-all outline-none ${
                    errors.confirmPassword ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-indigo-500'
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match"
                  })}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-[10px] font-bold uppercase ml-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm hover:bg-emerald-500 hover:text-white transition-all active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mt-4 uppercase tracking-widest flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
