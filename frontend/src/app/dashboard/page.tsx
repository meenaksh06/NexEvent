"use client";

import React, { useState } from 'react';
import MapView from '@/components/Map/MapView';
import Feed from '@/components/Feed/Feed';
import EventDetail from '@/components/Feed/EventDetail';
import { Event } from '@/types';
import { useEvents } from '@/contexts/EventContext';

export default function DashboardMapPage() {
  const { filteredEvents } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      <div className="flex-1 flex overflow-hidden p-4 md:p-6 gap-6 relative">
        {/* Map Section */}
        <div className="flex-[3] relative">
          <MapView events={filteredEvents} onSelectEvent={setSelectedEvent} />
        </div>

        {/* Feed Section */}
        <div className="flex-1 hidden lg:flex flex-col h-full">
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
