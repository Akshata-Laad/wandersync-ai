from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
from app.models.schemas import (
    Trip, TripGenerationRequest, RegenerateDayRequest, RegenerateActivityRequest
)
from app.services.ai_generator import ai_generator
from app.services.supabase_service import storage_service
from app.services.demo_scenarios import get_demo_scenarios_dict

router = APIRouter(prefix="/trips", tags=["Trips"])

@router.post("/generate", response_model=Trip)
def generate_trip(req: TripGenerationRequest):
    """Generate a full day-by-day itinerary tailored to user preferences."""
    try:
        trip = ai_generator.generate_itinerary(req)
        # Automatically save trip to storage
        saved_trip = storage_service.save_trip(trip)
        return saved_trip
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

@router.post("/regenerate-day", response_model=Trip)
def regenerate_day(req: RegenerateDayRequest):
    """Regenerate a single day within an existing trip."""
    trip = storage_service.get_trip(req.trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    new_day = ai_generator.regenerate_day(trip, req.day_number, req.refinement_prompt)
    
    # Replace the matching day
    day_replaced = False
    for idx, d in enumerate(trip.days):
        if d.day_number == req.day_number:
            trip.days[idx] = new_day
            day_replaced = True
            break
            
    if not day_replaced:
        trip.days.append(new_day)

    # Recompute cost breakdown
    total_act_cost = sum(d.day_estimated_cost for d in trip.days)
    trip.cost_breakdown.activities = round(total_act_cost * 0.45 * trip.group_size, 2)
    trip.cost_breakdown.dining = round(total_act_cost * 0.55 * trip.group_size, 2)
    trip.cost_breakdown.total = round(
        trip.cost_breakdown.accommodation +
        trip.cost_breakdown.dining +
        trip.cost_breakdown.activities +
        trip.cost_breakdown.transit +
        trip.cost_breakdown.misc, 2
    )
    trip.updated_at = datetime.utcnow().isoformat()

    return storage_service.save_trip(trip)

@router.post("/regenerate-activity", response_model=Trip)
def regenerate_activity(req: RegenerateActivityRequest):
    """Suggest an alternative activity and replace it in the itinerary."""
    trip = storage_service.get_trip(req.trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    new_activity = ai_generator.regenerate_activity(trip, req.day_number, req.activity_id, req.refinement_prompt)

    # Find and replace
    found = False
    for day in trip.days:
        if day.day_number == req.day_number:
            for idx, act in enumerate(day.activities):
                if act.id == req.activity_id:
                    day.activities[idx] = new_activity
                    found = True
                    break
            if found:
                day.day_estimated_cost = sum(a.estimated_cost for a in day.activities)
                break

    if not found:
        raise HTTPException(status_code=404, detail="Activity or day not found")

    trip.updated_at = datetime.utcnow().isoformat()
    return storage_service.save_trip(trip)

@router.get("", response_model=List[Trip])
def list_trips():
    """List all saved itineraries."""
    return storage_service.list_trips()

@router.get("/preset/{scenario_id}", response_model=Trip)
def get_preset_scenario(scenario_id: str):
    """Fetch pre-configured scenario (scenario_1, scenario_2, scenario_3)."""
    demos = get_demo_scenarios_dict()
    if scenario_id in demos:
        return demos[scenario_id]
    raise HTTPException(status_code=404, detail="Preset scenario not found")

@router.get("/share/{token}", response_model=Trip)
def get_trip_by_share(token: str):
    """Retrieve a trip via its unique shareable token."""
    trip = storage_service.get_trip_by_share_token(token)
    if not trip:
        raise HTTPException(status_code=404, detail="Shared trip not found or link expired")
    return trip

@router.get("/{trip_id}", response_model=Trip)
def get_trip(trip_id: str):
    """Retrieve details for a specific trip."""
    trip = storage_service.get_trip(trip_id)
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip

@router.put("/{trip_id}", response_model=Trip)
def update_trip(trip_id: str, trip_data: Trip):
    """Update trip details or custom user edits."""
    existing = storage_service.get_trip(trip_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Trip not found")

    trip_data.id = trip_id
    trip_data.updated_at = datetime.utcnow().isoformat()
    return storage_service.save_trip(trip_data)

@router.delete("/{trip_id}")
def delete_trip(trip_id: str):
    """Delete a trip."""
    success = storage_service.delete_trip(trip_id)
    if not success:
        raise HTTPException(status_code=404, detail="Trip not found or could not be deleted")
    return {"status": "success", "message": "Trip successfully deleted"}
