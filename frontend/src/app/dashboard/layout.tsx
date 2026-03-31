"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, Bell, LayoutGrid, BarChart2, Settings, Search, LogOut, User as UserIcon, Menu, X } from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { EventProvider, useEvents } from '@/contexts/EventContext';
import { AnimatePresence, motion } from 'framer-motion';

function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const { isConnected, searchQuery, setSearchQuery, filterCategory, setFilterCategory, filterSentiment, setFilterSentiment, categories } = useEvents();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-card/60 backdrop-blur-xl z-30 sticky top-0 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <Link href="/dashboard" className="hidden md:flex items-center gap-3 group">
          <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white shadow-lg group-hover:shadow-blue-500/50 transition-all">
            <Shield size={18} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Eventra AI
          </span>
        </Link>
        
        <div className="hidden md:block h-5 w-px bg-border mx-2" />
        
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full border border-border">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
          {isConnected ? 'Pipeline Active' : 'Disconnected'}
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5 flex-1 justify-end">
        {/* Filters */}
        <div className="hidden lg:flex items-center gap-2">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none max-w-[130px] shadow-sm transition-all"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select 
            value={filterSentiment} 
            onChange={(e) => setFilterSentiment(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none shadow-sm transition-all"
          >
            <option value="">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="relative group w-full max-w-[200px] md:max-w-xs transition-all">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-400 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-mono shadow-inner text-white placeholder-gray-500"
          />
        </div>
        
        {/* Profile Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 border border-white/20 hover:border-white/50 flex items-center justify-center text-[11px] font-bold shadow-lg transition-all text-white"
          >
            {user ? user.initials : '?' }
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-12 right-0 w-56 bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden py-2 z-50 origin-top-right"
              >
                <div className="px-5 py-3 border-b border-white/10 mb-2 bg-white/5">
                  <p className="text-sm font-bold text-white">{user?.name || 'Guest'}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{user?.email || 'Not logged in'}</p>
                </div>
                <button className="w-full text-left px-5 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-3 transition-colors">
                  <UserIcon size={16} /> Profile Settings
                </button>
                <button onClick={handleLogout} className="w-full text-left px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-3 transition-colors mt-1">
                  <LogOut size={16} /> Disconnect
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function DashboardSidebar({ isMobileOpen, closeMobile }: { isMobileOpen: boolean, closeMobile: () => void }) {
  const pathname = usePathname();

  const navItems = [
    { icon: <LayoutGrid size={22} />, path: '/dashboard', label: 'Live Map' },
    { icon: <BarChart2 size={22} />, path: '/dashboard/trending', label: 'Trending' },
    { icon: <Bell size={22} />, path: '/dashboard/alerts', label: 'AI Alerts' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>

      <aside className={`fixed md:relative top-0 left-0 w-64 md:w-20 lg:w-20 h-full bg-[#030712] border-r border-white/10 flex flex-col items-center py-6 gap-8 z-50 transform transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <Link href="/" className="md:hidden flex items-center gap-3 w-full px-6 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-white shadow-lg">
            <Shield size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-white">Eventra AI</span>
        </Link>
        <button onClick={closeMobile} className="absolute top-6 right-4 md:hidden text-gray-400 hover:text-white"><X size={24} /></button>

        <Link href="/dashboard" className="hidden md:flex p-3 bg-blue-600 rounded-2xl text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-110 transition-transform">
          <Shield size={24} />
        </Link>
        
        <nav className="flex flex-col gap-4 mt-2 w-full px-4 md:px-0 md:items-center relative">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                onClick={closeMobile}
                className={`p-3 md:p-3.5 rounded-2xl transition-all relative group flex items-center gap-4 md:justify-center ${isActive ? 'bg-blue-500/10 text-blue-400' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                title={item.label}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-md hidden md:block" />
                )}
                {item.icon}
                <span className="md:hidden font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto w-full px-4 md:px-0 md:flex md:justify-center">
          <button className="w-full md:w-auto p-3 md:p-3.5 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors flex items-center gap-4 md:justify-center" title="Settings">
            <Settings size={22} />
            <span className="md:hidden font-semibold">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <EventProvider>
        <div className="flex h-screen w-full bg-[#020617] text-gray-100 overflow-hidden font-sans">
          <DashboardSidebar isMobileOpen={isMobileMenuOpen} closeMobile={() => setIsMobileMenuOpen(false)} />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
            <DashboardHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
            <main className="flex-1 flex flex-col overflow-hidden relative p-0 md:p-2 bg-[#020617]">
              <div className="w-full h-full bg-[#0f172a] md:rounded-[2rem] md:border border-white/5 overflow-hidden flex flex-col shadow-2xl relative">
                 {/* Subtle glowing orb in dashboard background */}
                 <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                 {children}
              </div>
            </main>
          </div>
        </div>
      </EventProvider>
    </AuthProvider>
  );
}
