import pytest
import sys
from pathlib import Path

backend_path = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_path))

from app.routers.trips import list_trips, get_preset_scenario, generate_trip, get_trip
from app.routers.destinations import get_popular_destinations
from app.models.schemas import TripGenerationRequest

def test_popular_destinations():
    data = get_popular_destinations()
    assert len(data) >= 3
    names = [d.name for d in data]
    assert "Tokyo" in names
    assert "Amalfi Coast" in names
    assert "Barcelona & Costa Brava" in names

def test_list_preset_trips():
    trips = list_trips()
    assert len(trips) >= 3
    scenarios = [t.scenario_id for t in trips if t.scenario_id]
    assert "scenario_1" in scenarios
    assert "scenario_2" in scenarios
    assert "scenario_3" in scenarios

def test_scenario_1_solo_weekend():
    trip = get_preset_scenario("scenario_1")
    assert trip.trip_type == "solo"
    assert trip.total_days == 3
    assert len(trip.days) == 3
    assert "Tokyo" in trip.destination
    assert trip.cost_breakdown.total > 0

def test_scenario_2_couple_vacation():
    trip = get_preset_scenario("scenario_2")
    assert trip.trip_type == "couple"
    assert trip.group_size == 2
    assert "Amalfi" in trip.destination
    assert trip.cost_breakdown.total > 0

def test_scenario_3_group_adventure():
    trip = get_preset_scenario("scenario_3")
    assert trip.trip_type == "group"
    assert trip.group_size >= 4
    assert "Barcelona" in trip.destination
    assert trip.cost_breakdown.total > 0

def test_generate_custom_trip():
    req = TripGenerationRequest(
        destination="Kyoto, Japan",
        start_date="2026-11-10",
        end_date="2026-11-12",
        trip_type="solo",
        group_size=1,
        budget_level="moderate",
        travel_style="balanced",
        interests=["Culture & History", "Food & Dining"]
    )
    trip = generate_trip(req)
    assert trip.destination == "Kyoto, Japan"
    assert len(trip.days) == 3
    assert trip.cost_breakdown.total > 0
    # verify retrieval
    retrieved = get_trip(trip.id)
    assert retrieved is not None
    assert retrieved.id == trip.id
