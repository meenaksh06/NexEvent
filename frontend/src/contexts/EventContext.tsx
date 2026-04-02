"use client";

import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { Event } from '@/types';

interface EventContextType {
  events: Event[];
  filteredEvents: Event[];
  isConnected: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterSentiment: string;
  setFilterSentiment: (sentiment: string) => void;
  categories: string[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const { events, isConnected } = useSocket('ws://127.0.0.1:10000/ws/events');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('');

  // Extract unique categories dynamically for the filter dropdown
  const categories = useMemo(() => {
    const cats = new Set(events.map(e => e.category));
    return Array.from(cats);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = query === '' || 
        event.title.toLowerCase().includes(query) ||
        event.content.toLowerCase().includes(query) ||
        event.entities.some(ent => ent.text.toLowerCase().includes(query));
      
      const matchesCategory = filterCategory === '' || event.category === filterCategory;
      const matchesSentiment = filterSentiment === '' || event.sentiment_label === filterSentiment;

      return matchesSearch && matchesCategory && matchesSentiment;
    });
  }, [events, searchQuery, filterCategory, filterSentiment]);

  return (
    <EventContext.Provider value={{ 
      events, 
      filteredEvents, 
      isConnected,
      searchQuery,
      setSearchQuery,
      filterCategory,
      setFilterCategory,
      filterSentiment,
      setFilterSentiment,
      categories
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
