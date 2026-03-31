from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Event(BaseModel):
    id: Optional[str] = None
    title: str
    category: str
    content: str
    date: datetime
    sentiment_score: float
    sentiment_label: str
    entities: List[dict] = []
    summary: Optional[str] = None
    location: Optional[dict] = None  # { "lat": float, "lng": float }
    
class EventCreate(BaseModel):
    title: str
    category: str
    content: str
    date: datetime
