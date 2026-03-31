import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Navigation, Search, CircleDollarSign, 
  Map as MapIcon, ChevronDown, Check, 
  Star, Clock, HeartHandshake 
} from "lucide-react";

// The 31 Districts of Karnataka
const KARNATAKA_DISTRICTS = [
  "Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", 
  "Bidar", "Chamarajanagara", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", 
  "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", 
  "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", 
  "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", 
  "Vijayapura", "Yadgir", "Vijayanagara"
];

const Land = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSearch = () => {
    if (!from || !to) return;
    setIsSearching(true);
    // Mimic API delay
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 1200);
  };

  return (
    <div className="bg-[#020617] text-slate-200 min-h-screen selection:bg-indigo-500/30 font-sans">
      
      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px]" />
      </div>

      {/* NAV */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setShowResults(false)}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
            <Navigation className="text-white" size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">Hichhiker</span>
        </div>
        <div className="flex items-center gap-6">
          
          <Link to="/login" className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95">
            Login
          </Link>
        </div>
      </nav>

      {/* HERO & SEARCH SECTION */}
      <section className="relative z-10 pt-12 pb-10 px-6 max-w-5xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!showResults && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                ✨ Serving all 31 districts of Karnataka
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                HITCH A RIDE. <br />
                <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">KARNATAKA CONNECT.</span>
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SEARCH BAR */}
        <div className="p-2 rounded-[2.5rem] bg-slate-900/50 border border-white/5 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row gap-2 items-stretch">
          <DistrictDropdown 
            label="From" 
            icon={<MapIcon size={18} className="text-indigo-400" />} 
            value={from} 
            onChange={setFrom} 
          />
          <div className="hidden md:flex items-center justify-center px-1">
             <div className="w-[1px] h-10 bg-white/10" />
          </div>
          <DistrictDropdown 
            label="To" 
            icon={<Navigation size={18} className="text-emerald-400" />} 
            value={to} 
            onChange={setTo} 
          />
          
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-10 py-4 rounded-[1.8rem] font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-indigo-600/20"
          >
            {isSearching ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" /> : <Search size={20} />}
            SEARCH
          </button>
        </div>
      </section>

      {/* RESULTS OR FEATURES */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          {showResults ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-4"
            >
              <div className="mb-8 mt-6">
                <h2 className="text-3xl font-black text-white italic">Rides from {from}</h2>
                <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mt-1">To {to} • Today</p>
              </div>
              
              <RideCard driver="Prajwal K." price="₹450" time="08:00 AM" rating="4.9" />
              <RideCard driver="Sushma Gowda" price="₹320" time="11:45 AM" rating="4.7" />
              <RideCard driver="Kiran R." price="₹380" time="02:30 PM" rating="4.8" />

              <div className="p-10 border border-dashed border-white/10 rounded-[2.5rem] text-center mt-8">
                <p className="text-slate-500 font-medium">Looking for more? Login to see all 14 drivers on this route.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="features"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-6 mt-12"
            >
              <div className="group bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/20 transition-all">
                <HeartHandshake className="text-emerald-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-2xl font-bold text-white mb-2 italic">Local Social</h3>
                <p className="text-slate-400 leading-relaxed">Join verified travelers across Karnataka for free. Just share the vibes and the fuel.</p>
              </div>
              <div className="group bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/20 transition-all">
                <CircleDollarSign className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-2xl font-bold text-white mb-2 italic">Express Share</h3>
                <p className="text-slate-400 leading-relaxed">Reliable inter-district travel. Split fuel costs and save up to 70% compared to private cabs.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

/* CUSTOM DISTRICT DROPDOWN */
const DistrictDropdown = ({ label, icon, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const filtered = KARNATAKA_DISTRICTS.filter(d => 
    d.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 text-left" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="h-full flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-white/5 rounded-[1.8rem] transition-all"
      >
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1 overflow-hidden">
          <p className="text-[10px] uppercase font-black text-slate-500 tracking-wider leading-none mb-1.5">{label}</p>
          <p className="text-white font-bold truncate text-lg">{value || "Select District"}</p>
        </div>
        <ChevronDown size={18} className={`text-slate-600 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : ''}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-[110%] left-0 w-full min-w-[280px] bg-slate-900 border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] overflow-hidden backdrop-blur-xl"
          >
            <div className="p-3 border-b border-white/5 bg-white/5">
              <input 
                autoFocus
                type="text" 
                placeholder="Search district..." 
                className="w-full bg-slate-800 text-sm px-4 py-3 rounded-xl outline-none text-white border border-white/5 focus:border-indigo-500 transition-all"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <div className="max-h-64 overflow-y-auto custom-scrollbar p-2">
              {filtered.map(district => (
                <div 
                  key={district}
                  onClick={() => { onChange(district); setIsOpen(false); setSearch(""); }}
                  className={`px-4 py-3 text-sm rounded-xl flex justify-between items-center transition-colors mb-1 ${
                    value === district ? 'bg-indigo-600 text-white' : 'hover:bg-white/5 text-slate-300'
                  } cursor-pointer`}
                >
                  <span className="font-medium">{district}</span>
                  {value === district && <Check size={16} className="text-white" />}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-500 italic">
                  No district found for "{search}"
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* RIDE CARD COMPONENT */
const RideCard = ({ driver, price, time, rating }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className="bg-slate-900/40 border border-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-indigo-500/30 transition-all group"
  >
    <div className="flex items-center gap-5 w-full md:w-auto">
      <div className="w-14 h-14 bg-indigo-600/20 rounded-2xl border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400 text-xl shadow-inner">
        {driver[0]}
      </div>
      <div>
        <h4 className="font-bold text-white text-lg">{driver}</h4>
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
          <Star size={14} className="text-yellow-500 fill-yellow-500" /> 
          <span className="text-slate-300">{rating}</span> • 
          <span className="text-emerald-500/80">Verified Driver</span>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
      <div className="flex items-center gap-3">
        <Clock size={16} className="text-slate-500" />
        <div>
          <span className="block text-[10px] text-slate-500 font-black uppercase tracking-widest">Departure</span>
          <span className="text-white font-bold">{time}</span>
        </div>
      </div>
      
      <div className="text-right">
        <span className="block text-[10px] text-slate-500 font-black uppercase tracking-widest">Seats from</span>
        <span className="text-2xl font-black text-emerald-400 leading-none">{price}</span>
      </div>

      <button className="bg-white text-black px-8 py-3 rounded-xl font-black text-sm hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-lg">
        BOOK RIDE
      </button>
    </div>
  </motion.div>
);

export default Land;