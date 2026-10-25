from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class Coordinates(BaseModel):
    lat: float
    lng: float

class ActivityItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4())[:8])
    time_slot: str  # "Morning", "Afternoon", "Evening", "Night"
    time: str       # e.g., "09:00 AM - 11:30 AM"
    title: str
    category: str   # "Attraction", "Dining", "Stay", "Transit", "Leisure", "Nightlife"
    description: str
    location: str
    coordinates: Optional[Coordinates] = None
    estimated_cost: float = 0.0
    currency: str = "USD"
    duration_hours: float = 2.0
    tips: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    booking_required: bool = False

class DayPlan(BaseModel):
    day_number: int
    date: Optional[str] = None
    title: str
    theme: str
    activities: List[ActivityItem]
    day_estimated_cost: float = 0.0
    highlight: str
    transit_advice: str

class CostBreakdown(BaseModel):
    accommodation: float = 0.0
    dining: float = 0.0
    activities: float = 0.0
    transit: float = 0.0
    misc: float = 0.0
    total: float = 0.0
    currency: str = "USD"

class LogisticsAndPacking(BaseModel):
    weather_summary: str
    recommended_clothing: List[str] = Field(default_factory=list)
    essential_items: List[str] = Field(default_factory=list)
    local_customs_and_tips: List[str] = Field(default_factory=list)
    emergency_numbers: Dict[str, str] = Field(default_factory=dict)

class TripGenerationRequest(BaseModel):
    destination: str
    start_date: str
    end_date: str
    total_days: Optional[int] = None
    trip_type: str = "solo"           # "solo", "couple", "group", "family"
    group_size: int = 1
    budget_level: str = "moderate"    # "budget", "moderate", "luxury"
    budget_amount: Optional[float] = None
    travel_style: str = "balanced"    # "relaxed", "balanced", "fast-paced"
    interests: List[str] = Field(default_factory=list)
    accommodation_type: Optional[str] = "Boutique Hotel"
    dietary_preferences: Optional[List[str]] = Field(default_factory=list)
    transportation_preference: Optional[str] = "Public Transit & Walking"
    custom_notes: Optional[str] = None
    scenario_preset: Optional[str] = None  # "scenario_1", "scenario_2", "scenario_3"

class RegenerateDayRequest(BaseModel):
    trip_id: str
    day_number: int
    refinement_prompt: Optional[str] = None
    target_budget_shift: Optional[str] = None  # "cheaper", "premium", "same"

class RegenerateActivityRequest(BaseModel):
    trip_id: str
    day_number: int
    activity_id: str
    category_preference: Optional[str] = None
    refinement_prompt: Optional[str] = None

class Trip(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    destination: str
    start_date: str
    end_date: str
    total_days: int
    trip_type: str
    group_size: int = 1
    budget_level: str
    budget_amount: Optional[float] = None
    travel_style: str
    interests: List[str] = Field(default_factory=list)
    accommodation_type: Optional[str] = None
    dietary_preferences: List[str] = Field(default_factory=list)
    transportation_preference: Optional[str] = None
    overview: str
    days: List[DayPlan]
    cost_breakdown: CostBreakdown
    logistics: LogisticsAndPacking
    is_public: bool = False
    share_token: str = Field(default_factory=lambda: str(uuid.uuid4())[:12])
    scenario_id: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class DestinationInfo(BaseModel):
    id: str
    name: str
    country: str
    tagline: str
    image_url: str
    suggested_days: int
    average_daily_budget: float
    popular_interests: List[str]
    best_season: str
    description: str
