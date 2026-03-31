import { useState, useEffect, useRef } from 'react';
import { Event } from '@/types';

export function useSocket(url: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let socket: WebSocket | null = null;

    const connect = () => {
      socket = new WebSocket(url);

      socket.onopen = () => {
        setIsConnected(true);
        console.log('Connected to WebSocket at', url);
      };

      socket.onmessage = (event) => {
        try {
          const newEvent: Event = JSON.parse(event.data);
          setEvents((prev) => [newEvent, ...prev].slice(0, 100)); // Keep last 100 events
        } catch (e) {
          console.error("Failed to parse event:", e);
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };

      socket.onclose = () => {
        setIsConnected(false);
        console.log('Disconnected from WebSocket. Reconnecting in 3 seconds...');
        reconnectTimeoutRef.current = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (socket) {
        socket.onclose = null; // Prevent reconnect logic when unmounting
        socket.close();
      }
    };
  }, [url]);

  return { events, isConnected };
}
