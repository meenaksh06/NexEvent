from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "NexEvent API"
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "nexevent"
    STREAM_INTERVAL: float = 2.0  # seconds between events
    
    class Config:
        env_file = ".env"

settings = Settings()
