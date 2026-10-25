from fastapi import APIRouter
from typing import List
from app.models.schemas import DestinationInfo

router = APIRouter(prefix="/destinations", tags=["Destinations"])

POPULAR_DESTINATIONS: List[DestinationInfo] = [
    DestinationInfo(
        id="tokyo",
        name="Tokyo",
        country="Japan",
        tagline="Neon skylines, ancient shrines & world-class gastronomy",
        image_url="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
        suggested_days=3,
        average_daily_budget=140.0,
        popular_interests=["Food & Dining", "Sightseeing", "Culture & History", "Pop Culture"],
        best_season="Spring & Autumn (March - May, Oct - Nov)",
        description="Ideal for solo travelers and culture lovers seeking safety, ultra-efficient transit, and incredible food."
    ),
    DestinationInfo(
        id="amalfi",
        name="Amalfi Coast",
        country="Italy",
        tagline="Pastel cliffside villages, azure waters & private sailing",
        image_url="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
        suggested_days=4,
        average_daily_budget=350.0,
        popular_interests=["Romantic Spots", "Scenic Views", "Food & Wine", "Sailing"],
        best_season="Late Spring & Early Autumn (May - June, Sept - Oct)",
        description="The ultimate romantic getaway for couples looking for dramatic Mediterranean coastlines and Michelin dining."
    ),
    DestinationInfo(
        id="barcelona",
        name="Barcelona & Costa Brava",
        country="Spain",
        tagline="Gaudí architecture, sea kayaking & vibrant group tapas",
        image_url="https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
        suggested_days=5,
        average_daily_budget=160.0,
        popular_interests=["Architecture", "Adventure", "Beaches", "Nightlife"],
        best_season="Summer & Autumn (June - October)",
        description="Perfect for small groups of friends combining daytime coastal adventures with legendary tapas crawls."
    ),
    DestinationInfo(
        id="paris",
        name="Paris",
        country="France",
        tagline="Timeless art, iconic boulevards & café culture",
        image_url="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
        suggested_days=4,
        average_daily_budget=220.0,
        popular_interests=["Art & Museums", "Dining", "Romantic Spots", "History"],
        best_season="Spring & Autumn (April - June, Sept - Nov)",
        description="A premier destination for couples and solo culture enthusiasts wanting world-class museums and romantic strolls."
    ),
    DestinationInfo(
        id="bali",
        name="Bali",
        country="Indonesia",
        tagline="Lush rice terraces, spiritual temples & beach sunsets",
        image_url="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
        suggested_days=5,
        average_daily_budget=110.0,
        popular_interests=["Nature & Adventure", "Spiritual", "Relaxation & Spa", "Beaches"],
        best_season="Dry Season (April - October)",
        description="Tropical paradise offering stunning jungle villas, surfing, yoga retreats, and warm cultural hospitality."
    ),
    DestinationInfo(
        id="newyork",
        name="New York City",
        country="United States",
        tagline="The city that never sleeps: Broadway, museums & endless energy",
        image_url="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
        suggested_days=4,
        average_daily_budget=280.0,
        popular_interests=["Sightseeing", "Broadway", "Food & Dining", "Shopping"],
        best_season="Autumn & Spring (Sept - Nov, April - June)",
        description="High-octane urban playground ideal for solo adventurers and friend groups wanting culture, music, and food."
    )
]

@router.get("/popular", response_model=List[DestinationInfo])
def get_popular_destinations():
    """Returns curated popular destinations with travel tips."""
    return POPULAR_DESTINATIONS
