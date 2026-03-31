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
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-background">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
              <Bell size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">AI Threat Alerts</h2>
              <p className="text-muted-foreground mt-1">Real-time incidents requiring immediate attention</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-red-500">{alerts.length}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Active Alerts</div>
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
              <div key={idx} className={`p-6 bg-card border border-border rounded-2xl shadow-lg relative overflow-hidden flex gap-6 hover:border-border/80 transition-colors animate-in slide-in-from-bottom-2 fade-in duration-500`} style={{ animationFillMode: 'both', animationDelay: `${idx * 50}ms` }}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${colorClass.split(' ')[0].replace('text-', 'bg-')}`} />
                
                <div className={`shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border ${colorClass}`}>
                  <AlertIcon size={24} className="mb-1" />
                  <span className="text-xs font-bold">{urgency}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold truncate pr-4">{alert.title}</h3>
                    <div className="shrink-0 flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      <Clock size={12} />
                      {formatDistanceToNow(new Date(alert.date), { addSuffix: true })}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {alert.content}
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-secondary text-primary">
                      {alert.category}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md ${
                      alert.sentiment_label === 'negative' ? 'bg-red-500/10 text-red-500' :
                      alert.sentiment_label === 'positive' ? 'bg-green-500/10 text-green-500' :
                      'bg-gray-500/10 text-gray-500'
                    }`}>
                      {alert.sentiment_label}
                    </span>
                    <span className="ml-auto text-xs font-mono text-muted-foreground">
                      {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="p-12 text-center bg-card border border-border rounded-2xl">
              <ShieldAlert className="mx-auto text-muted-foreground/50 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">System Secure</h3>
              <p className="text-muted-foreground">No high-urgency alerts detected in the current stream window.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
