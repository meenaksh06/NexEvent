"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, Bell, LayoutGrid, BarChart2, Settings, Search, LogOut, User as UserIcon } from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { EventProvider, useEvents } from '@/contexts/EventContext';

function DashboardHeader() {
  const { user, logout } = useAuth();
  const { isConnected, searchQuery, setSearchQuery, filterCategory, setFilterCategory, filterSentiment, setFilterSentiment, categories } = useEvents();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-md z-50 relative">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-xl font-black tracking-tight uppercase hover:text-primary transition-colors">NexEvent</Link>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
          {isConnected ? 'Real-time pipeline active' : 'Pipe disconnected'}
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Filters */}
        <div className="hidden lg:flex items-center gap-2">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none max-w-[120px]"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select 
            value={filterSentiment} 
            onChange={(e) => setFilterSentiment(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
          >
            <option value="">All Sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>

        <div className="relative group hidden md:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search incidents or entities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-secondary/50 border border-border rounded-full py-1.5 pl-10 pr-4 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all font-mono"
          />
        </div>
        
        {/* Profile Menu */}
        <button 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 hover:border-primary/50 flex items-center justify-center text-[10px] font-bold transition-all relative"
        >
          {user ? user.initials : '?' }
        </button>

        {showProfileMenu && (
          <div className="absolute top-12 right-0 w-48 bg-card border border-border shadow-2xl rounded-xl overflow-hidden py-1 z-50">
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-bold">{user?.name || 'Guest'}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || 'Not logged in'}</p>
            </div>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-secondary flex items-center gap-2 transition-colors">
              <UserIcon size={14} /> Profile Settings
            </button>
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-secondary flex items-center gap-2 transition-colors">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: <LayoutGrid size={22} />, path: '/dashboard', label: 'Live Map' },
    { icon: <BarChart2 size={22} />, path: '/dashboard/trending', label: 'Trending' },
    { icon: <Bell size={22} />, path: '/dashboard/alerts', label: 'AI Alerts' },
  ];

  return (
    <aside className="w-16 md:w-20 border-r border-border flex flex-col items-center py-6 gap-8 bg-card animate-in fade-in slide-in-from-left duration-700 z-40">
      <Link href="/dashboard" className="p-3 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
        <Shield size={24} />
      </Link>
      
      <nav className="flex flex-col gap-6 mt-4 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`p-3 rounded-xl transition-all relative group ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'}`}
              title={item.label}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-md" />
              )}
              {item.icon}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button className="p-3 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors" title="Settings">
          <Settings size={22} />
        </button>
      </div>
    </aside>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <EventProvider>
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <DashboardHeader />
            <main className="flex-1 flex flex-col overflow-hidden relative">
              {children}
            </main>
          </div>
        </div>
      </EventProvider>
    </AuthProvider>
  );
}
