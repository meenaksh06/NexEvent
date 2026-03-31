"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ArrowRight, Activity, Globe, Zap, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Nav */}
      <header className="w-full max-w-7xl mx-auto px-6 h-24 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
            <Shield size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight uppercase">NexEvent</span>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-bold transition-all flex items-center gap-2">
              Go to Dashboard <ArrowRight size={18} />
            </Link>
          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
            >
              Sign In <LogIn size={18} />
            </button>
          )}
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 text-center z-10 -mt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          v2.0 Architecture Deployed
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter max-w-5xl leading-[1.1] mb-8">
          Incident Intelligence <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">In Real-Time.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
          Monitor the globe with AI. We transform unstructured social and news streams into structured alerts, sentiment analysis, and interactive geospatial intelligence without the noise.
        </p>

        {user ? (
          <Link href="/dashboard" className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-lg shadow-[0_0_40px_rgba(var(--primary),0.3)] hover:scale-105 transition-all flex items-center gap-3">
            Open Live Map <ArrowRight size={22} />
          </Link>
        ) : (
          <button onClick={() => setShowLogin(true)} className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-bold text-lg shadow-[0_0_40px_rgba(var(--primary),0.3)] hover:scale-105 transition-all flex items-center gap-3">
            Start Monitoring <ArrowRight size={22} />
          </button>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left w-full max-w-5xl">
          <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors">
            <Globe className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Global Geospatial</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Instantly visualize emerging crises on an interactive, high-performance dark vector map powered by Carto and MapLibre.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors">
            <Zap className="text-yellow-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">AI Urgency Engine</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Our ML pipeline scores events from 0-100 based on sentiment polarity and category impact, alerting you only when it matters.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-colors">
            <Activity className="text-green-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">WebSocket Streaming</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">Zero-latency data ingestion. Watch the intelligence feed populate live as our scalable FastAPI backend processes the world.</p>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card w-full max-w-md p-8 rounded-3xl border border-border shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold mb-2">Access Platform</h2>
            <p className="text-muted-foreground mb-6">Enter your email to authenticate.</p>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input 
                type="email" 
                required
                placeholder="analyst@nexevent.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono"
              />
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setShowLogin(false)} className="flex-1 py-3 bg-secondary hover:bg-secondary/80 rounded-xl font-bold transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold transition-all shadow-lg shadow-primary/20">Authenticate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
