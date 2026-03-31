"use client";

import React, { useState } from 'react';
import { useSocket } from '@/hooks/useSocket';
import MapView from '@/components/Map/MapView';
import Feed from '@/components/Feed/Feed';
import EventDetail from '@/components/Feed/EventDetail';
import { Event } from '@/types';
import { Shield, Bell, LayoutGrid, BarChart2, Settings, Search } from 'lucide-react';

export default function Dashboard() {
  const { events, isConnected } = useSocket('ws://localhost:8001/ws/events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <main className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-16 md:w-20 border-r border-border flex flex-col items-center py-6 gap-8 bg-card animate-in fade-in slide-in-from-left duration-700">
        <div className="p-3 bg-primary rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
          <Shield size={24} />
        </div>
        
        <nav className="flex flex-col gap-6 mt-4">
          <button className="p-3 rounded-xl hover:bg-white/5 text-primary transition-colors">
            <LayoutGrid size={22} />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors">
            <BarChart2 size={22} />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors">
            <Bell size={22} />
          </button>
        </nav>

        <div className="mt-auto">
          <button className="p-3 rounded-xl hover:bg-white/5 text-muted-foreground transition-colors">
            <Settings size={22} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black tracking-tight uppercase">NexEvent</h1>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
              {isConnected ? 'Real-time pipeline active' : 'Pipe disconnected'}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search incidents..." 
                className="bg-secondary/50 border border-border rounded-full py-1.5 pl-10 pr-4 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[10px] font-bold">
              MS
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 flex overflow-hidden p-4 md:p-6 gap-6 relative">
          {/* Map Section */}
          <div className="flex-[3] relative">
            <MapView events={events} onSelectEvent={setSelectedEvent} />
          </div>

          {/* Feed Section */}
          <div className="flex-1 hidden lg:block">
            <Feed 
                events={events} 
                onSelectEvent={setSelectedEvent} 
                selectedEvent={selectedEvent} 
            />
          </div>
        </div>
        
        {/* Mobile Feed Toggle (Optional for later) */}
      </div>

      {/* Event Details Overlay */}
      <EventDetail 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </main>
  );
}
