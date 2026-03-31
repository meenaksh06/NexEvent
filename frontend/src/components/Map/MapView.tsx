"use client";

import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { Map, Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Event } from '@/types';
import { MapPin, AlertCircle } from 'lucide-react';

interface MapViewProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}


class MapErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Mapbox Error Caught:", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-card border border-border rounded-xl text-center p-6 shadow-2xl">
          <AlertCircle size={48} className="text-red-500 mb-4 opacity-80" />
          <h2 className="text-xl font-bold mb-2">Map Unavailable</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Please ensure you have an active internet connection to load the free map tiles.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function MapViewInner({ events, onSelectEvent }: MapViewProps) {
  const [popupInfo, setPopupInfo] = useState<Event | null>(null);

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl border border-border">
      <Map
        initialViewState={{
          longitude: 0,
          latitude: 20,
          zoom: 1.5
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        <NavigationControl position="top-right" />

        {events.map((event, index) => (
          <Marker
            key={`${event.title}-${index}`}
            longitude={event.location.lng}
            latitude={event.location.lat}
            anchor="bottom"
            onClick={(e: any) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(event);
              onSelectEvent(event);
            }}
          >
            <div className={`p-1 rounded-full cursor-pointer transition-transform hover:scale-125 ${event.sentiment_label === 'positive' ? 'bg-green-500' :
                event.sentiment_label === 'negative' ? 'bg-red-500' : 'bg-gray-500'
              }`}>
              <MapPin size={16} className="text-white" />
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.location.lng}
            latitude={popupInfo.location.lat}
            onClose={() => setPopupInfo(null)}
          >
            <div className="p-2 min-w-[200px] bg-card text-card-foreground">
              <h3 className="font-bold text-sm truncate">{popupInfo.title}</h3>
              <p className="text-xs mt-1 text-muted-foreground">{popupInfo.category}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default function MapView(props: MapViewProps) {
  return (
    <MapErrorBoundary>
      <MapViewInner {...props} />
    </MapErrorBoundary>
  );
}
