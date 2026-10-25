# 🌍 WanderSync AI — Personalized Travel Itinerary Planner

A full-stack, AI-powered web application that automates travel planning through intelligent day-by-day itinerary synthesis, budget tracking, interactive route mapping, and logistics coordination.

Built with a **React** frontend, **FastAPI** backend, and **Supabase** database integration, utilizing prompt engineering and generative AI (with multi-tier support for Google Gemini and a high-fidelity built-in generative engine).

---

## 🚀 Key Features

- **Modern SaaS Dashboard & Smart Trip Builder**: 
  - Dynamic multi-step trip wizard configuring destination, dates, travel party type (solo, couple, group, family), group size, budget tier, pacing, interests, and dietary/transit preferences.
  - Zero-decision-fatigue interface saving hours of fragmented web research.

- **Pre-Loaded Scenario Demonstrations**:
  - **Scenario 1: Solo Traveler Planning a Weekend Getaway (Tokyo, Japan)**:
    - Time-efficient 3-day itinerary, optimized subway routing (Suica tips), solo dining counter booths (Ichiran), and iconic sights without crowds.
  - **Scenario 2: Couple Planning a Romantic Vacation (Amalfi Coast & Positano, Italy)**:
    - Relaxed pacing, cliffside boutique accommodations, private skippered Gozzo boat charters through Capri Faraglioni, sunset terrace aperitivos, and candlelit lemon grove dining.
  - **Scenario 3: Small Group Coordinating a Multi-Day Trip (Barcelona & Costa Brava, Spain)**:
    - 5-traveler coordination, shared apartment stays, budget limits with per-person expense breakdown, shared group sea kayaking, tapas crawls, and catamaran sunset sails.

- **Interactive Day-by-Day Timeline**:
  - Morning, Afternoon, Evening, and Night time slots with categorized badges (Attraction, Dining, Stay, Leisure, Nightlife).
  - Accurate estimated pricing ($), duration, and local pro-tips.
  - "Regenerate Day with AI" & "Swap Activity" with custom natural language prompts.
  - Editable activities with live cost recalculation.

- **Interactive Route Map (Leaflet & OpenStreetMap)**:
  - Geographical pins plotting all activities and attractions across days.
  - Color-coded day markers and sequenced route paths.
  - Interactive popups displaying activity highlights and costs.

- **Real-Time Budget & Expense Tracker**:
  - Live budget gauge comparing total estimated expenses against the user's target budget.
  - Categorized breakdown: Accommodation, Dining, Activities, Transit, and Buffer.
  - Per-person cost calculation for couples and group trips.

- **Weather & Packing Logistics**:
  - Destination-specific climate summary.
  - Interactive checkable packing lists (apparel and essential gear).
  - Local customs, tipping etiquette, and emergency assistance numbers.

- **Sharing & Collaboration**:
  - Unique shareable link for friends and companions.
  - Group invitation system for collaborative trip coordination.
  - 1-click Markdown itinerary export and PDF/print formatting.

---

## 🏗️ Architecture

```
Travel_partner/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI application & CORS
│   │   ├── config.py                # Environment & settings
│   │   ├── models/
│   │   │   └── schemas.py           # Pydantic trip & activity models
│   │   ├── routers/
│   │   │   ├── trips.py             # Trip generation, regeneration & CRUD
│   │   │   └── destinations.py      # Popular destinations catalog
│   │   └── services/
│   │       ├── ai_generator.py      # Gemini LLM + smart generative engine
│   │       ├── supabase_service.py  # Supabase client + local JSON sync
│   │       └── demo_scenarios.py    # Curated scenarios 1, 2, and 3
│   ├── tests/
│   │   └── test_api.py              # Pytest test suite (6 passing tests)
│   ├── requirements.txt             # Python dependencies
│   ├── schema.sql                   # Supabase PostgreSQL schema with RLS
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # App header & status
│   │   │   ├── HeroBanner.jsx       # SaaS hero section
│   │   │   ├── ScenarioSelector.jsx # Scenario 1, 2, 3 selector
│   │   │   ├── TripBuilderModal.jsx # Multi-step AI wizard
│   │   │   ├── ItineraryView.jsx    # Master trip workspace
│   │   │   ├── DayCard.jsx          # Day accordion & regen modal
│   │   │   ├── ActivityCard.jsx     # Activity card with AI swap
│   │   │   ├── BudgetOverview.jsx   # Expense breakdown & progress bar
│   │   │   ├── InteractiveMap.jsx   # Leaflet map with markers & paths
│   │   │   ├── PackingLogistics.jsx # Weather & interactive packing
│   │   │   ├── ShareModal.jsx       # Share link, group invite & export
│   │   │   └── EditActivityModal.jsx# Activity edit dialog
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx        # Hub & saved trips gallery
│   │   │   └── ExploreDestinations.jsx # Curated destinations
│   │   ├── context/
│   │   │   └── TripContext.jsx      # Global React state management
│   │   ├── data/
│   │   │   └── presetScenarios.js   # Scenarios metadata
│   │   ├── services/
│   │   │   └── api.js               # Frontend API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                # Tailwind directives & animations
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── run_app.py                       # Single command full-stack launcher
├── start_backend.bat                # Windows backend launcher
├── start_frontend.bat               # Windows frontend launcher
└── README.md
```

---

## ⚡ Quick Start

### Option A: Run Both Frontend & Backend (One Command)
```powershell
python run_app.py
```
This launches:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **FastAPI Backend**: [http://localhost:8000](http://localhost:8000)
- **Interactive API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option B: Run Individually

#### 1. Backend Setup:
```powershell
cd backend
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### 2. Frontend Setup:
```powershell
cd frontend
npm.cmd run dev
```

---

## 🧪 Running Backend Tests

The backend includes a comprehensive pytest suite covering all routers, demo scenarios, and custom generation:
```powershell
cd backend
python -m pytest tests
```
*Result: 6 passed in ~3.5s*

---

## 🗄️ Supabase Integration

1. The app works **100% out-of-the-box** using a local persistent JSON database (`backend/data/trips_db.json`), pre-seeded with all 3 scenarios.
2. To link an active **Supabase** cloud database:
   - Run the provided SQL migration in `backend/schema.sql` inside your Supabase SQL Editor.
   - Set `SUPABASE_URL` and `SUPABASE_KEY` in `backend/.env`.
   - The application automatically detects Supabase and handles hybrid cloud synchronization with local storage.

---

## 🤖 Generative AI Configuration

- To enable Google Gemini AI, set `GEMINI_API_KEY` in `backend/.env`.
- If no external API key is provided, the application automatically uses the built-in generative engine, ensuring uninterrupted planning for any custom destination with realistic routing and costs.
