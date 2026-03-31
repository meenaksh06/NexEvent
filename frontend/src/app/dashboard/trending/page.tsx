"use client";

import React, { useMemo } from 'react';
import { useEvents } from '@/contexts/EventContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Flame, AlertTriangle, TrendingUp, BarChart as BarChartIcon, PieChart as PieChartIcon } from 'lucide-react';

export default function TrendingDashboard() {
  const { filteredEvents } = useEvents();

  // 1. Category Distribution
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredEvents.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Top 10 categories
  }, [filteredEvents]);

  // 2. High Urgency Events
  const topEvents = useMemo(() => {
    return [...filteredEvents]
      .sort((a, b) => (b.urgency || 0) - (a.urgency || 0))
      .slice(0, 5);
  }, [filteredEvents]);

  // Colors for charts
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="text-primary" size={28} />
        <h2 className="text-2xl font-bold">Trending Intelligence</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Distribution Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChartIcon className="text-muted-foreground" size={20} /> Category Velocity
          </h3>
          <div className="h-72 w-full">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fill: '#888', fontSize: 12 }} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} 
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">Waiting for incoming data...</div>
            )}
          </div>
        </div>

        {/* Sentiment Distribution Pie Chart */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-red-500" />
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <PieChartIcon className="text-muted-foreground" size={20} /> Global Sentiment
          </h3>
          <div className="h-72 w-full flex items-center justify-center">
             {filteredEvents.length > 0 ? (() => {
               const pos = filteredEvents.filter(e => e.sentiment_label === 'positive').length;
               const neg = filteredEvents.filter(e => e.sentiment_label === 'negative').length;
               const neu = filteredEvents.filter(e => e.sentiment_label === 'neutral').length;
               const data = [
                 { name: 'Positive', value: pos, color: '#10b981' },
                 { name: 'Negative', value: neg, color: '#ef4444' },
                 { name: 'Neutral', value: neu, color: '#64748b' }
               ].filter(d => d.value > 0);

               return (
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} 
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
               );
             })() : (
               <div className="text-muted-foreground">No data available</div>
             )}
          </div>
        </div>
      </div>

      {/* High-Urgency Top Events */}
      <div className="bg-card border border-border rounded-2xl p-0 shadow-xl overflow-hidden mt-6">
        <div className="px-6 py-4 border-b border-border bg-card/50 flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Flame className="text-red-500 animate-pulse" size={20} /> Critical Incidents (Highest Urgency)
          </h3>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">Live</span>
        </div>
        <div className="divide-y divide-border">
          {topEvents.length > 0 ? topEvents.map((event, idx) => (
            <div key={idx} className="p-4 hover:bg-white/5 transition-colors flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center text-red-500">
                <span className="text-xs font-bold leading-none">{event.urgency || 0}</span>
                <span className="text-[9px] uppercase tracking-wider mt-1 opacity-80">Score</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-foreground truncate">{event.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-primary font-mono">{event.category}</span>
                  <span className="text-xs text-muted-foreground">{new Date(event.date).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-6 text-center text-muted-foreground">Monitoring for critical events...</div>
          )}
        </div>
      </div>
    </div>
  );
}
