"use client";

import React from 'react';
import { Event } from '@/types';
import { formatEventDate, cn } from '@/lib/utils';
import { ChevronRight, Zap } from 'lucide-react';

interface FeedProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  selectedEvent?: Event | null;
}

export default function Feed({ events, onSelectEvent, selectedEvent }: FeedProps) {
  return (
    <div className="flex flex-col h-full bg-card/50 glass rounded-xl overflow-hidden border border-border">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Zap size={18} className="text-yellow-500 fill-yellow-500" />
          Live Intelligence
        </h2>
        <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded-full animate-pulse">
            Live
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2 relative">
        {events.length === 0 ? (
          <div className="w-full h-full p-2 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 rounded-lg border border-white/5 bg-white/[0.02] animate-pulse flex flex-col gap-3">
                <div className="flex justify-between w-full">
                  <div className="w-16 h-4 bg-white/10 rounded-full" />
                  <div className="w-12 h-3 bg-white/5 rounded-full" />
                </div>
                <div className="w-3/4 h-4 bg-white/10 rounded-md" />
                <div className="w-1/2 h-4 bg-white/5 rounded-md" />
                <div className="w-20 h-3 bg-white/5 rounded-full mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {events.map((event, index) => (
          <div
            key={`${event.title}-${index}`}
            onClick={() => onSelectEvent(event)}
            className={cn(
              "p-4 rounded-lg cursor-pointer transition-all border border-transparent hover:bg-white/5",
              selectedEvent?.title === event.title ? "bg-white/10 border-white/20" : "bg-transparent"
            )}
          >
            <div className="flex justify-between items-start mb-1">
              <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                event.sentiment_label === 'positive' ? 'bg-green-500/20 text-green-500' : 
                event.sentiment_label === 'negative' ? 'bg-red-500/20 text-red-500' : 'bg-gray-500/20 text-gray-400'
              }`}>
                {event.category}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {formatEventDate(event.date)}
              </span>
            </div>
            <h3 className="font-medium text-sm line-clamp-2 leading-tight">
              {event.title}
            </h3>
            <div className="mt-2 flex items-center text-xs text-muted-foreground group">
                Deep analysis
                <ChevronRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
