from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.services.websocket import manager
from app.core.config import settings
import asyncio

from app.services.streamer import streamer
from contextlib import asynccontextmanager

from app.db.mongodb import db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect to MongoDB
    await db.connect()
    # Start streamer
    asyncio.create_task(streamer.start())
    yield
    # Stop streamer
    streamer.stop()
    # Close MongoDB
    await db.close()

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to NexEvent API"}

@app.get("/test")
async def test():
    return {"status": "ok", "message": "Backend is reachable"}

@app.websocket("/ws/events")
async def websocket_endpoint(websocket: WebSocket):
    print("WebSocket: New connection attempt...")
    await manager.connect(websocket)
    print(f"WebSocket: Connection established. Total: {len(manager.active_connections)}")
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
