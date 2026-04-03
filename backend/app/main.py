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
    try:
        # Explicit handshake with no origin restriction
        await websocket.accept()
        print(f"WS: Accepted connection from {websocket.client}")
        
        await manager.connect(websocket)
        print(f"WS: Registered connection. Total active: {len(manager.active_connections)}")
        
        try:
            while True:
                # Keep connection alive and wait for client heartbeat or disconnection
                data = await websocket.receive_text()
        except WebSocketDisconnect:
            manager.disconnect(websocket)
            print(f"WS: Connection closed by client. Total active: {len(manager.active_connections)}")
    except Exception as e:
        print(f"WS Error during handshake or connection: {e}")
