import pandas as pd
import asyncio
import json
from datetime import datetime
from backend.app.services.websocket import manager
from backend.app.core.config import settings
from backend.app.services.processor import process_event
from backend.app.db.mongodb import db
import random

class EventStreamer:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.df = pd.DataFrame()
        self.running = False

    def load_data(self):
        print(f"Streamer: Loading data from {self.file_path}...")
        try:
            self.df = pd.read_csv(self.file_path)
            # Ensure date is datetime
            self.df['date'] = pd.to_datetime(self.df['date'])
            # Sort by date
            self.df = self.df.sort_values(by='date')
            print(f"Streamer: Successfully loaded {len(self.df)} events.")
        except Exception as e:
            print(f"Streamer Error loading data: {e}")
            self.df = pd.DataFrame()

    async def start(self):
        if self.df.empty:
            self.load_data()
        
        if self.df.empty:
            print("Streamer: No data loaded. Stopping.")
            return

        self.running = True
        index = 0
        total = len(self.df)
        
        while self.running:
            row = self.df.iloc[index % total]
            
            # Prepare event basic data
            raw_event = {
                "title": str(row['headline']),
                "category": str(row['category']),
                "content": str(row['short_description']),
                "date": row['date'],
                "sentiment_compound": float(row['sentiment_compound'])
            }
            
            # Process with ML pipeline (NER, etc.)
            processed_event = await process_event(raw_event)
            
            # Persist to MongoDB
            await db.db.events.insert_one(processed_event)
            
            # MongoDB injects an '_id' of type ObjectId, which is not JSON serializable.
            # Convert it to a string for the WebSocket broadcast.
            if '_id' in processed_event:
                processed_event['_id'] = str(processed_event['_id'])
            
            # Broadcast to all connected clients
            print(f"Streamer: Broadcasting event: {processed_event['title']}")
            await manager.broadcast(processed_event)
            
            index += 1
            await asyncio.sleep(settings.STREAM_INTERVAL)

    def stop(self):
        self.running = False

streamer = EventStreamer("data/processed/featured_news.csv")
