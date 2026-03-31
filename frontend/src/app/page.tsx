"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ArrowRight, Activity, Globe, Zap, LogIn, Database, Cpu, BrainCircuit, Code2, Network, ChevronRight, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';

function CountUp({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easing * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function LandingPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      router.push('/dashboard');
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-foreground flex flex-col items-center relative overflow-hidden font-sans selection:bg-primary/30">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Navigation */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 w-full h-20 flex items-center justify-between z-50 px-6 lg:px-12 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <Shield size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">Eventra AI</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 relative h-full">
          <button onClick={() => router.push('/dashboard')} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors h-full flex items-center">
            AI Platform
          </button>
          
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('usecases')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-sm font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              Use Cases <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'usecases' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'usecases' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-56 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl"
                >
                  {['Disaster Monitoring', 'Protest Tracking', 'Crisis Management', 'News Intelligence'].map(item => (
                    <div key={item} className="px-4 py-2.5 hover:bg-white/10 rounded-xl cursor-pointer text-sm text-gray-200 hover:text-white transition-colors">{item}</div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setActiveDropdown('products')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="text-sm font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              Products <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'products' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-56 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl"
                >
                  {['Live Dashboard', 'Alert System', 'AI Insights Engine', 'API Access'].map(item => (
                    <div key={item} className="px-4 py-2.5 hover:bg-white/10 rounded-xl cursor-pointer text-sm text-gray-200 hover:text-white transition-colors">{item}</div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">About</button>
          <button className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">Contact</button>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full text-sm font-bold transition-all flex items-center gap-2 backdrop-blur-md">
              Dashboard <ArrowRight size={14} />
            </Link>
          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className="px-5 py-2 bg-white text-black hover:bg-gray-200 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center gap-2"
            >
              Sign In <LogIn size={14} />
            </button>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-6 z-10 pt-40 pb-24 min-h-screen relative">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center max-w-5xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live Intelligence Stream Active
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] mb-8 text-white relative">
            Real-Time AI-Powered <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              Event Intelligence
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 leading-relaxed font-light">
            Detect, analyze, and act on global events as they unfold.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-24">
            <Link href="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 w-full sm:w-auto hover:scale-105">
              Open Dashboard <ArrowRight size={20} />
            </Link>
            <Link href="#architecture" className="px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-md w-full sm:w-auto">
              Explore Platform
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center gap-2 text-gray-500 mt-auto"
          >
            <span className="text-xs uppercase tracking-widest font-semibold font-mono">Scroll to explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Rapid Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-24 pt-12 border-t border-white/10 w-full"
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-black text-white"><CountUp end={99} suffix=".9%" /></span>
            <span className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-widest text-center">Platform Uptime</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-black text-white">&lt;<CountUp end={50} suffix="ms" /></span>
            <span className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-widest text-center">Socket Latency</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-black text-white"><CountUp end={10} suffix="K+" /></span>
            <span className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-widest text-center">Data Sources</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-black text-white"><CountUp end={150} suffix="M+" /></span>
            <span className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-widest text-center">Events Processed</span>
          </div>
        </motion.div>

        {/* Dataminr Product Solutions */}
        <div id="architecture" className="w-full mt-32 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">The Leading AI Platform</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">From AI to Impact. Dataminr delivers instant clarity when it matters most, across four critical domains.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            
            {/* Cyber Defense */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-10 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <Network className="text-blue-500 mb-6" size={48} strokeWidth={1.5} />
              <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                Dataminr for Cyber Defense
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                Reduce cyber exposure with AI-driven detection across digital ecosystems. Gain real-time visibility of the full lifecycle of vulnerabilities affecting your tech stack and strengthen your cybersecurity posture with comprehensive threat intelligence.
              </p>
              <div className="text-blue-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-wider text-sm">Learn More <ArrowRight size={16} /></div>
            </div>

            {/* Corporate Security */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-10 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <Shield className="text-indigo-400 mb-6" size={48} strokeWidth={1.5} />
              <h3 className="text-3xl font-bold text-white mb-4">Dataminr for Corporate Security</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                Ensure the safety of your employees, executives, customers, and contractors against external risks and threats, wherever they are. Maintain awareness of events that could jeopardize the safety of diplomats and embassies.
              </p>
              <div className="text-indigo-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-wider text-sm">Learn More <ArrowRight size={16} /></div>
            </div>

            {/* First Alert */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-10 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <Activity className="text-red-500 mb-6" size={48} strokeWidth={1.5} />
              <h3 className="text-3xl font-bold text-white mb-4">First Alert</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                Respond as early as possible to any natural or man-made emergency, crisis, incident, disaster, or attack. Enable the quickest possible response to public safety incidents and emergencies for first responders globally.
              </p>
              <div className="text-red-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-wider text-sm">Learn More <ArrowRight size={16} /></div>
            </div>

            {/* News */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-10 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
              <Globe className="text-emerald-400 mb-6" size={48} strokeWidth={1.5} />
              <h3 className="text-3xl font-bold text-white mb-4">Dataminr for News</h3>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                Power your breaking news desk with real-time event intelligence. Identify risks and events that no other platform can detect—across both the physical and digital worlds—long before they trend on social media.
              </p>
              <div className="text-emerald-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-wider text-sm">Learn More <ArrowRight size={16} /></div>
            </div>

          </div>
        </div>

      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#0f172a] w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <h2 className="text-2xl font-bold mb-2 text-white">System Authentication</h2>
            <p className="text-gray-400 mb-8 text-sm">Enter testing credentials to access the production stream.</p>
            
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Operator Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Shield size={16} className="text-gray-500" />
                  </div>
                  <input 
                    type="email" 
                    required
                    placeholder="recruiter@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setShowLogin(false)} className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" className="flex-[2] py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
                  Launch Platform <ChevronRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
