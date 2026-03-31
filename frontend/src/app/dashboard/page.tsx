"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Feed from '@/components/Feed/Feed';
import EventDetail from '@/components/Feed/EventDetail';
import { Loader2 } from 'lucide-react';

const MapView = dynamic(() => import('@/components/Map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#030712] flex items-center justify-center rounded-2xl border border-white/5">
      <Loader2 className="animate-spin text-blue-500" size={32} />
    </div>
  )
});
import { Event } from '@/types';
import { useEvents } from '@/contexts/EventContext';

export default function DashboardMapPage() {
  const { filteredEvents } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent relative overflow-hidden">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-0 gap-0 relative rounded-b-[2rem] md:rounded-[2rem]">
        {/* Map Section */}
        <div className="flex-[3] relative h-[50vh] lg:h-full">
          <MapView events={filteredEvents} onSelectEvent={setSelectedEvent} />
        </div>

        {/* Feed Section */}
        <div className="flex-1 lg:max-w-md w-full h-[50vh] lg:h-full bg-[#0f172a]/95 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
          <Feed 
              events={filteredEvents} 
              onSelectEvent={setSelectedEvent} 
              selectedEvent={selectedEvent} 
          />
        </div>
      </div>
      
      {/* Event Details Overlay */}
      <EventDetail 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
}
