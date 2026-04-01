"use client";

import React, { useMemo } from 'react';
import { useEvents } from '@/contexts/EventContext';
import { Bell, Flame, ShieldAlert, AlertTriangle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function AlertsDashboard() {
  const { filteredEvents } = useEvents();

  const alerts = useMemo(() => {
    return filteredEvents
      .filter(e => (e.urgency || 0) >= 40)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [filteredEvents]);

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-transparent">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            <div className="p-3.5 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20 shadow-lg shadow-red-500/10">
              <Bell size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">AI Threat Alerts</h2>
              <p className="text-gray-400 mt-1 font-medium">Real-time incidents requiring immediate attention</p>
            </div>
          </div>
          <div className="text-right bg-[#0f172a]/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
            <div className="text-3xl font-black text-red-500 leading-none">{alerts.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Active Alerts</div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.length > 0 ? alerts.map((alert, idx) => {
            const urgency = alert.urgency || 0;
            let AlertIcon = AlertTriangle;
            let colorClass = "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
            
            if (urgency >= 80) {
              AlertIcon = Flame;
              colorClass = "text-red-500 bg-red-500/10 border-red-500/20";
            } else if (urgency >= 60) {
              AlertIcon = ShieldAlert;
              colorClass = "text-orange-500 bg-orange-500/10 border-orange-500/20";
            }

            return (
              <div key={idx} className={`p-6 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 hover:border-white/20 transition-all animate-in slide-in-from-bottom-2 fade-in duration-500`} style={{ animationFillMode: 'both', animationDelay: `${idx * 50}ms` }}>
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colorClass.split(' ')[0].replace('text-', 'bg-')}`} />
                
                <div className={`shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border shadow-inner ${colorClass}`}>
                  <AlertIcon size={24} className="mb-1" />
                  <span className="text-sm font-black">{urgency}</span>
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-4 mb-3">
                    <h3 className="text-xl font-bold truncate pr-4 text-white hover:text-blue-400 transition-colors cursor-pointer">{alert.title}</h3>
                    <div className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-mono">
                      <Clock size={12} className="text-blue-400" />
                      {formatDistanceToNow(new Date(alert.date), { addSuffix: true })}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 line-clamp-2 mb-5 leading-relaxed">
                    {alert.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md bg-white/10 border border-white/5 text-blue-300 font-mono">
                      {alert.category}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border ${
                      alert.sentiment_label === 'negative' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      alert.sentiment_label === 'positive' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      'bg-gray-500/10 text-gray-400 border-white/10'
                    }`}>
                      {alert.sentiment_label}
                    </span>
                    <span className="md:ml-auto text-xs font-mono text-gray-500 bg-black/40 px-3 py-1 rounded-lg border border-white/5">
                      Lat: {alert.location.lat.toFixed(4)}, Lng: {alert.location.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="p-16 text-center bg-[#0f172a]/60 backdrop-blur-sm border border-white/5 rounded-3xl shadow-inner">
              <ShieldAlert className="mx-auto text-green-500/50 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" size={64} />
              <h3 className="text-2xl font-black mb-2 text-white tracking-tight">System Secure</h3>
              <p className="text-gray-400 font-medium">No high-urgency alerts detected in the current stream window.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
