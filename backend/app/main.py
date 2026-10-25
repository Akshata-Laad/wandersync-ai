from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.config import settings
from app.routers import trips, destinations
from app.services.supabase_service import storage_service

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Full-stack AI-Powered Personalized Travel Itinerary Planner API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits dev frontend on any local port or deployed domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(trips.router, prefix=settings.API_V1_STR)
app.include_router(destinations.router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    # Ensure local database is initialized with the 3 scenario trips
    storage_service._init_local_db()

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "supabase_connected": storage_service.supabase_client is not None,
        "mode": "hybrid-supabase-local"
    }

# Check if pre-built frontend dist exists for single-service full-stack deployment
FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"
if FRONTEND_DIST.exists():
    app.mount("/", StaticFiles(directory=str(FRONTEND_DIST), html=True), name="frontend")
else:
    @app.get("/")
    def root():
        return {
            "message": "Welcome to WanderSync AI - Personalized Travel Itinerary Planner API",
            "docs": "/docs",
            "health": "/api/health"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
