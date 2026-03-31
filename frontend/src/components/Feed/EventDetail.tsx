"use client";

import React from 'react';
import { Event } from '@/types';
import { X, MapPin, Tag, Brain, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { formatEventDate } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface EventDetailProps {
  event: Event | null;
  onClose: () => void;
}

export default function EventDetail({ event, onClose }: EventDetailProps) {
  if (!event) return null;

  const SentimentIcon = event.sentiment_label === 'positive' ? TrendingUp : 
                        event.sentiment_label === 'negative' ? TrendingDown : Minus;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-card border-l border-border z-50 shadow-2xl overflow-y-auto"
      >
        <div className="p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="mt-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold">
                {event.category}
              </span>
              <h2 className="text-2xl font-bold mt-2 leading-tight">
                {event.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {formatEventDate(event.date)}
              </p>
            </div>

            <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex-1 text-center border-r border-white/10">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Sentiment</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <SentimentIcon size={16} className={
                            event.sentiment_label === 'positive' ? 'text-green-500' : 
                            event.sentiment_label === 'negative' ? 'text-red-500' : 'text-gray-400'
                        } />
                        <span className="font-bold">{Math.round(event.sentiment_score * 100) / 100}</span>
                    </div>
                </div>
                <div className="flex-1 text-center">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Reliability</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                        <span className="text-green-500 text-sm font-bold">High</span>
                    </div>
                </div>
            </div>

            <section>
              <h3 className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                <Brain size={16} className="text-primary" />
                AI Analysis
              </h3>
              <div className="mt-3 p-4 rounded-xl bg-primary/5 border border-primary/10 italic text-sm leading-relaxed">
                "{event.summary}"
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                <Tag size={16} className="text-primary" />
                Entities Detected
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {event.entities.map((entity, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
                    title={entity.label}
                  >
                    {entity.text}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest mb-3">
                <MapPin size={16} className="text-primary" />
                Location
              </h3>
              <div className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs text-muted-foreground">
                  Map View Unavailable
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                  Lat: {event.location.lat.toFixed(4)}, Lng: {event.location.lng.toFixed(4)}
              </p>
            </section>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
