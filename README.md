# NexEvent: Real-Time AI-Powered Incident Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

NexEvent is an enterprise-grade, real-time event detection and threat intelligence platform designed to process, analyze, and visualize global incidents as they unfold. Leveraging advanced Natural Language Processing (NLP) and a high-performance modern web stack, it serves as a robust system for discovering critical events across multiple data streams with minimal latency.

## Architecture Overview

Built for scale and real-time performance, NexEvent utilizes a decoupled client-server architecture:

### 1. Intelligence Engine (Backend)
- **Framework**: FastAPI (Python)
- **Database**: MongoDB for high-throughput, non-blocking asynchronous I/O
- **Real-Time Communication**: WebSockets for low-latency event broadcasting
- **AI/ML Pipeline**:
  - **Named Entity Recognition (NER)**: Powered by `spaCy` to autonomously extract locations, organizations, and key figures from raw text streams.
  - **Sentiment & Urgency Scoring**: Utilizes VADER sentiment analysis combined with custom risk-scoring algorithms to assign actionable "Urgency Scores" (0-100) to incoming events.

### 2. Visualization & Command Center (Frontend)
- **Framework**: Next.js 14 (React) with App Router
- **Language**: TypeScript for strict type-safety and enhanced developer experience
- **Styling & UI**: Tailwind CSS for utility-first styling, integrated with a bespoke glassmorphic design system to ensure high-contrast readability under SOC (Security Operations Center) conditions.
- **State Management**: React Context API for centralized real-time stream state (`EventContext`) and Authentication (`AuthContext`).
- **Data Visualization**:
  - GPU-accelerated MapLibre GL JS integration for real-time geographic incident plotting.
  - `recharts` for dynamic, live-updating global sentiment and category velocity analytics.
  - `framer-motion` for complex staggered entry animations and seamless layout transitions.

## Key Capabilities

* **Asynchronous Streaming**: Processes and broadcasts thousands of events per minute without blocking the main event loop.
* **Smart Filtering & Search**: O(1) complexity routing and highly-optimized client-side filtering by category, sentiment, and full-text keyword search.
* **Automated Threat Detection**: High-urgency events automatically trigger system-wide priority alerts and elevate to the "Critical Incidents" dashboard.
* **Component Lazy-Loading**: Next.js dynamic imports (`next/dynamic`) heavily utilized for heavy visualization libraries (Maps, Charts) to maintain optimal first contentful paint (FCP) and Time to Interactive (TTI).

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- Python (3.12+)
- MongoDB instance (Local or Atlas)

### Backend Deployment
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm

# Configure environment variables (.env)
# Ensure MONGODB_URI is set

uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Deployment
```bash
cd frontend
npm install

# Configure environment variables (.env.local)
# NEXT_PUBLIC_API_URL=http://localhost:8001
# NEXT_PUBLIC_WS_URL=ws://localhost:8001

npm run dev
```

## Production Deployment

The application is container-ready and structurally designed to be deployed across modern cloud providers:
- **Frontend**: Recommend edge deployment via Vercel.
- **Backend**: Recommend Render, AWS ECS, or Google Cloud Run for containerized deployment.
- **Database**: MongoDB Atlas.

Ensure proper CORS configuration and secure connection protocols (WSS/HTTPS) for production environments.
