import spacy
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import random
import asyncio

# Load spaCy model (installed via requirements.txt)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback to a minimal functional state if the model somehow isn't loaded
    print("Warning: en_core_web_sm not found. Falling back to blank model.")
    nlp = spacy.blank("en")

analyzer = SentimentIntensityAnalyzer()

async def process_event(raw_event: dict):
    # Sentiment Analysis (already done in CSV, but let's re-verify or use it)
    text = f"{raw_event['title']} {raw_event['content']}"
    
    # NER
    doc = nlp(text)
    entities = []
    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_
        })
    
    # Simple Location Mocking (if not found in NER)
    # In a real app, we'd geocode locations found in NER
    lat = random.uniform(-90, 90)
    lng = random.uniform(-180, 180)
    
    # Summarization (Place-holder for LLM)
    summary = f"Summary: {raw_event['title']}. This event is related to {raw_event['category']}."
    
    return {
        "title": raw_event['title'],
        "category": raw_event['category'],
        "content": raw_event['content'],
        "date": raw_event['date'].isoformat(),
        "sentiment_score": raw_event['sentiment_compound'],
        "sentiment_label": "positive" if raw_event['sentiment_compound'] > 0.05 else "negative" if raw_event['sentiment_compound'] < -0.05 else "neutral",
        "entities": entities[:5], # Limit to top 5
        "summary": summary,
        "location": {"lat": lat, "lng": lng}
    }
