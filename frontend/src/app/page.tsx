"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ArrowRight, Activity, Globe, Zap, LogIn, Database, Cpu, BrainCircuit, Code2, Network, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      router.push('/dashboard');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
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
        className="w-full max-w-7xl mx-auto px-6 h-24 flex items-center justify-between z-20"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <Shield size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase text-white">NexEvent</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/meenaksh06" target="_blank" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden md:block">
            GitHub
          </Link>
          {user ? (
            <Link href="/dashboard" className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full font-bold transition-all flex items-center gap-2 backdrop-blur-md">
              Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full font-bold shadow-lg shadow-white/10 transition-all flex items-center gap-2"
            >
              Sign In <LogIn size={16} />
            </button>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-6 z-10 pt-20 pb-32">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center text-center max-w-4xl"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live Intelligence Stream Active
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] mb-8 text-white">
            Monitor the Globe. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
              Powered by AI.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed font-light">
            A production-grade intelligence platform that ingests unstructured data streams, executes distributed NLP reasoning, and plots critical incidents with zero-latency WebSockets.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
            {user ? (
              <Link href="/dashboard" className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center gap-3">
                Enter Platform <ArrowRight size={20} />
              </Link>
            ) : (
              <button onClick={() => setShowLogin(true)} className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center gap-3">
                Initialize Dashboard <Zap size={20} />
              </button>
            )}
            <Link href="#architecture" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold text-lg transition-all flex items-center gap-3 backdrop-blur-md">
              View Architecture
            </Link>
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
            <span className="text-4xl font-black text-white">O(1)</span>
            <span className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-widest">Routing Complexity</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-white">&lt;50ms</span>
            <span className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-widest">Socket Latency</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-white">spaCy</span>
            <span className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-widest">NER Pipeline</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-white">Async</span>
            <span className="text-sm text-gray-500 font-medium mt-2 uppercase tracking-widest">MotorDB I/O</span>
          </div>
        </motion.div>

        {/* Bento Box Architecture Showcase */}
        <div id="architecture" className="w-full mt-32 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Engineering Excellence</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Designed for scale. Every component is highly optimized for throughput, memory efficiency, and developer ergonomics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 max-w-6xl mx-auto">
            
            {/* Bento 1: Backend */}
            <div className="md:col-span-2 md:row-span-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] group-hover:bg-indigo-500/20 transition-colors" />
              <Network className="text-indigo-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                Distributed FastAPI Engine
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                A highly concurrent backend leveraging Python's `asyncio`. It manages persistent WebSocket connections across hundreds of simulated clients while simultaneously performing heavily non-blocking I/O against MongoDB using the async Motor driver.
              </p>
            </div>

            {/* Bento 2: NLP */}
            <div className="md:col-span-1 md:row-span-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-colors" />
              <BrainCircuit className="text-purple-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold text-white mb-3">AI & NLP Pipeline</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Real-time Named Entity Recognition (NER) via spaCy, combined with VADER sentiment scoring. Events are dynamically assigned a 0-100 `Urgency Score` based on compound polarity vectors.
              </p>
            </div>

            {/* Bento 3: Frontend */}
            <div className="md:col-span-1 md:row-span-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-colors" />
              <Code2 className="text-blue-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold text-white mb-3">Next.js 14</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Built on the App Router with React Server Components. Features global contexts for socket state preservation across routes, encapsulated layouts, and extreme Tailwind optimizations.
              </p>
            </div>

            {/* Bento 4: Map */}
            <div className="md:col-span-2 md:row-span-1 bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-colors" />
              <Globe className="text-emerald-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold text-white mb-3">WebGL Geospatial Parsing</h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Bypassed standard expensive proprietary map solutions by architecting a custom MapLibre GL JS integration using Carto's open-source vector tiles. Performs GPU-accelerated rendering capable of mapping thousands of active incident nodes without dropping frames.
              </p>
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
                <button type="submit" className="flex-[2] py-3.5 bg-white text-black hover:bg-gray-200 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                  Initialize <ChevronRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
