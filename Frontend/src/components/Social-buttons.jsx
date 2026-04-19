import React from 'react';
import { Chrome, Github } from "lucide-react";

const SocialLogin = () => {
  const handleGoogle = () => {
       window.open("http://localhost:3000/auth/google", "_self");
  };

  const handleGithub = () => {
    window.open("http://localhost:3000/auth/github", "_self");
  };
  

  return (
    <div className="w-full  space-y-3">
      {/* Divider */}
      <div className="flex items-center gap-4 py-2">
        <div className="h-px bg-white/5 flex-1"></div>
        <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">OR</span>
        <div className="h-px bg-white/5 flex-1"></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full bg-slate-800/40 border border-white/5 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-800 hover:border-indigo-500/30 transition-all active:scale-95 group cursor-pointer"
      >
        <Chrome size={18} className="group-hover:text-indigo-400 transition-colors" />
        <span className="text-slate-200"  >Continue with Google</span>
      </button>

      {/* GitHub Button */}
      <button
        type="button"
        onClick={handleGithub}
        className="w-full bg-slate-800/40 border border-white/5 py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-800 hover:border-indigo-500/30 transition-all active:scale-95 group cursor-pointer"
      >
        <Github size={18} className="group-hover:text-white transition-colors" />
        <span className="text-slate-200" >Continue with GitHub</span>
      </button>
    </div>
  );
};

export default SocialLogin;