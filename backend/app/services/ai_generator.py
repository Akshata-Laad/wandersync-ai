import json
import logging
import uuid
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from app.config import settings
from app.models.schemas import (
    Trip, DayPlan, ActivityItem, Coordinates, CostBreakdown,
    LogisticsAndPacking, TripGenerationRequest
)
from app.services.demo_scenarios import (
    get_scenario_1_solo_weekend,
    get_scenario_2_couple_vacation,
    get_scenario_3_group_adventure
)

logger = logging.getLogger(__name__)

# Curated destination database for geo-accurate generation
KNOWN_DESTINATIONS = {
    "paris": {
        "coords": (48.8566, 2.3522),
        "currency": "EUR",
        "attractions": [
            ("Eiffel Tower & Champ de Mars", 48.8584, 2.2945, "Attraction", "Iconic iron tower with summit elevator views across Paris.", 28.0, 2.5, "Book summit tickets 2 months ahead for sunset slot."),
            ("Louvre Museum & Glass Pyramid", 48.8606, 2.3376, "Attraction", "World's largest museum featuring Mona Lisa and Venus de Milo.", 22.0, 3.5, "Enter via Porte des Lions or Carrousel du Louvre to bypass pyramid lines."),
            ("Musée d'Orsay & Impressionist Masters", 48.8599, 2.3265, "Attraction", "Former Beaux-Arts railway station housing masterpieces by Monet, Van Gogh, and Renoir.", 16.0, 2.5, "Don't miss the 5th floor clock face view looking out towards Sacré-Cœur."),
            ("Montmartre & Sacré-Cœur Basilica", 48.8867, 2.3431, "Attraction", "Winding cobblestone hill, street portrait artists at Place du Tertre, and city panorama.", 0.0, 2.5, "Walk up Rue de l'Abreuvoir past La Maison Rose for iconic photos."),
            ("Sainte-Chapelle Stained Glass", 48.8554, 2.3450, "Attraction", "13th-century Gothic royal chapel with 1,113 dazzling stained-glass biblical scenes.", 13.0, 1.5, "Visit on a sunny morning when jewel-colored light floods the upper chapel."),
            ("Seine River Sunset Bateaux Mouches", 48.8624, 2.3012, "Attraction", "Glide past illuminated bridges, Notre Dame, and the sparkling Eiffel Tower from the water.", 17.0, 1.5, "Sit on the top deck with a light jacket.")
        ],
        "dining": [
            ("Le Comptoir du Relais Bistro", 48.8520, 2.3387, "Dining", "Beloved Saint-Germain bistro serving duck confit and braised beef cheek.", 45.0, 1.5, "Arrive right at opening or prepare to wait in a lively line."),
            ("Café de Flore / Les Deux Magots", 48.8540, 2.3325, "Dining", "Historic existentialist literary café; hot chocolate and warm croissants on sidewalk terrace.", 22.0, 1.0, "Classic French café people-watching spot."),
            ("Bouillon Chartier Historic Hall", 48.8719, 2.3434, "Dining", "Belle Époque dining hall serving traditional French comfort food at unbeatable prices.", 20.0, 1.5, "Orders are written directly on the paper tablecloth!"),
            ("Le Marais Gourmet Falafel at L'As du Fallafel", 48.8575, 2.3592, "Dining", "World-famous pita stuffed with spiced chickpeas, fried eggplant, and tahini.", 12.0, 1.0, "Grab takeaway and eat at nearby Place des Vosges.")
        ],
        "weather": "Mild temperate climate with sunny spells (16°C - 22°C). Occasional brief Parisian shower.",
        "packing": ["Chic comfortable walking shoes", "Layerable trench coat or blazer", "Compact umbrella", "Canvas tote bag for shopping"],
        "customs": ["Always greet shopkeepers with 'Bonjour Madame/Monsieur' when entering.", "Dining is meant to be savored; waiters do not rush you with the bill.", "Metro tickets can be loaded directly onto mobile Navigo Easy cards."]
    },
    "rome": {
        "coords": (41.9028, 12.4964),
        "currency": "EUR",
        "attractions": [
            ("Colosseum & Roman Forum", 41.8902, 12.4922, "Attraction", "Walk the ancient gladiator arena and the political heart of the Roman Empire.", 24.0, 3.5, "Book combined ticket with Arena floor access for early morning."),
            ("Vatican Museums & Sistine Chapel", 41.9065, 12.4536, "Attraction", "Michelangelo's ceiling frescoes, Raphael rooms, and St. Peter's Basilica.", 29.0, 4.0, "Strict dress code: shoulders and knees must be fully covered."),
            ("Pantheon & Piazza della Rotonda", 41.8986, 12.4769, "Attraction", "2,000-year-old concrete dome with open oculus to the sky.", 5.0, 1.5, "Listen to the acoustics under the center of the dome."),
            ("Trevi Fountain & Spanish Steps", 41.9009, 12.4833, "Attraction", "Toss a coin over your left shoulder to ensure your return to the Eternal City.", 0.0, 1.5, "Visit after 10 PM when floodlights create golden marble reflections.")
        ],
        "dining": [
            ("Trattoria Da Enzo al 29 (Trastevere)", 41.8885, 12.4770, "Dining", "Legendary carbonara, crispy fried artichoke (carciofo alla giudia), and tiramisu.", 32.0, 1.5, "Queue starts 20 minutes before opening; worth every second."),
            ("Roscioli Salumeria con Cucina", 41.8943, 12.4735, "Dining", "Gourmet deli & restaurant famous for Cacio e Pepe and 300+ Italian cheeses.", 55.0, 2.0, "Book weeks in advance; ask for a seat near the cheese counter."),
            ("Giolitti Gelateria Artigianale", 41.9011, 12.4779, "Dining", "Rome's oldest gelateria: dark chocolate, pistachio, and fresh zabaione.", 5.0, 0.5, "Pay at the cash register first, then present your ticket at the flavor counter.")
        ],
        "weather": "Warm Mediterranean sunshine (21°C - 26°C), clear skies and pleasant twilight.",
        "packing": ["Breathable linen clothes", "Comfortable walking shoes for cobblestones (sanpietrini)", "Refillable water bottle for public fountains (nasoni)", "Modest clothing for basilicas"],
        "customs": ["Cappuccino is traditionally only ordered in the morning before 11:00 AM.", "Drinking fountains across Rome flow with cold, fresh mountain water for free.", "Coperto cover charge on bills is normal."]
    },
    "bali": {
        "coords": (-8.4095, 115.1889),
        "currency": "IDR",
        "attractions": [
            ("Tegallalang Rice Terraces & Jungle Swing", -8.4312, 115.2798, "Attraction", "Emerald stepped hills sculpted by ancient subak irrigation system.", 8.0, 2.5, "Arrive at sunrise (6:30 AM) for golden mist over the palm groves."),
            ("Sacred Monkey Forest Sanctuary", -8.5188, 115.2585, "Attraction", "Ancient mossy temple ruins inhabited by hundreds of playful grey macaques.", 6.0, 2.0, "Secure sunglasses and shiny accessories before walking through."),
            ("Uluwatu Clifftop Temple & Kecak Sunset Dance", -8.8291, 115.0849, "Attraction", "Dramatic 70-meter cliff hanging over Indian Ocean waves with hypnotic chorus fire dance.", 12.0, 3.0, "Arrive by 5 PM to get front-row sunset stadium seats."),
            ("Tirta Empul Holy Water Temple Purification", -8.4149, 115.3150, "Attraction", "Participate in Balinese melukat purification ritual under sacred natural springs.", 5.0, 2.0, "Traditional sarong provided; rental locker available for dry clothes.")
        ],
        "dining": [
            ("Locavore NXT / Merah Putih", -8.5085, 115.2650, "Dining", "Modern Indonesian culinary innovation celebrating sustainable local ingredients.", 60.0, 2.5, "Book dinner tasting menu for an unforgettable date or group night."),
            ("Warung Babi Guling Ibu Oka", -8.5065, 115.2628, "Dining", "Ubud institution for crisp spit-roasted suckling pig with spiced cassava leaves.", 8.0, 1.0, "Best enjoyed early for the crispiest skin."),
            ("Single Fin Uluwatu Sunset Lounge", -8.8152, 115.0883, "Dining", "Perched over the world's most famous surf break; cocktails, poke bowls, and DJs.", 25.0, 2.0, "Spectacular vantage point to watch surfers catching barrels at sunset.")
        ],
        "weather": "Tropical warm sunshine (27°C - 31°C) with refreshing ocean breezes.",
        "packing": ["Breathable lightweight clothes", "Reef-safe sunscreen & insect repellent", "Swimwear & water shoes", "Temple sarong (or rent on site)"],
        "customs": ["Step around small floral offerings (Canang Sari) on pavements.", "Dress respectfully with knees and shoulders covered when entering temples.", "Use right hand for giving or receiving items."]
    },
    "new york": {
        "coords": (40.7128, -74.0060),
        "currency": "USD",
        "attractions": [
            ("Central Park & The Ramble Stroll", 40.785091, -73.968285, "Attraction", "Wander through Bethesda Terrace, Bow Bridge, and scenic green woodlands in the heart of Manhattan.", 0.0, 2.5, "Rent a rowboat at Loeb Boathouse for picturesque photos."),
            ("The High Line & Chelsea Market", 40.7480, -74.0048, "Attraction", "Elevated freight rail park with Hudson River views, wildflowers, and artisan food hall.", 0.0, 2.0, "Grab artisanal tacos at Los Tacos No. 1 inside Chelsea Market."),
            ("Summit One Vanderbilt or Top of the Rock", 40.7527, -73.9772, "Attraction", "Mirrored immersive observation decks framing the Empire State Building and Manhattan skyline.", 42.0, 2.0, "Sunglasses recommended for the reflective mirror rooms on bright days."),
            ("Brooklyn Bridge Walk & DUMBO Waterfront", 40.7061, -73.9969, "Attraction", "Iconic suspension bridge promenade ending at Jane's Carousel and Manhattan skyline vistas.", 0.0, 2.0, "Snap the Washington Street view framing the Manhattan Bridge.")
        ],
        "dining": [
            ("Katz's Delicatessen", 40.7222, -73.9874, "Dining", "Legendary pastrami on rye with sour pickles since 1888.", 30.0, 1.0, "Do NOT lose the small paper ticket handed to you at the door!"),
            ("Joe's Pizza (Greenwich Village)", 40.7306, -74.0021, "Dining", "The definitive New York thin-crust cheese slice, hot and folding perfectly.", 5.0, 0.5, "Grab two slices on paper plates and eat on the sidewalk bench."),
            ("Gramercy Tavern / Balthazar", 40.7383, -73.9884, "Dining", "Celebrated New York dining institution with warm hospitality and seasonal dishes.", 75.0, 2.0, "Walk-ins often welcome at the tavern bar if dining room is booked.")
        ],
        "weather": "Crisp urban seasons (15°C - 23°C). Great walking weather.",
        "packing": ["Durable broken-in walking sneakers (18,000+ daily steps)", "Layerable stylish outerwear", "Compact crossbody bag", "MetroCard / OMNY contactless payment ready"],
        "customs": ["Stand to the right on subway escalators; walk on the left.", "Tap your contactless credit card or Apple/Google Pay directly at subway turnstiles.", "Standard tipping is 18-22% in restaurants."]
    }
}

class AIGeneratorService:
    def __init__(self):
        self.gemini_client = None
        self._init_gemini()

    def _init_gemini(self):
        if settings.GEMINI_API_KEY:
            try:
                from google import genai
                self.gemini_client = genai.Client(api_key=settings.GEMINI_API_KEY)
                logger.info("Gemini AI client initialized.")
            except Exception as e:
                logger.warning(f"Failed to init Gemini client: {e}. Using built-in generator.")
                self.gemini_client = None

    def generate_itinerary(self, req: TripGenerationRequest) -> Trip:
        """Main itinerary generation router."""
        # 1. Quick preset check for predefined demo scenarios
        if req.scenario_preset == "scenario_1":
            return get_scenario_1_solo_weekend()
        elif req.scenario_preset == "scenario_2":
            return get_scenario_2_couple_vacation()
        elif req.scenario_preset == "scenario_3":
            return get_scenario_3_group_adventure()

        # 2. If Gemini API key is configured, attempt LLM generation
        if self.gemini_client:
            try:
                trip = self._generate_with_gemini(req)
                if trip:
                    return trip
            except Exception as e:
                logger.warning(f"Gemini generation failed: {e}. Falling back to smart built-in generator.")

        # 3. Fallback to smart built-in generative engine
        return self._generate_with_builtin_engine(req)

    def _generate_with_gemini(self, req: TripGenerationRequest) -> Optional[Trip]:
        """Generates structured itinerary using Gemini 2.5 Flash / Pro model."""
        prompt = f"""
You are an expert AI Travel Planner. Generate a complete, day-by-day personalized travel itinerary in JSON format matching the schema below.

Trip Parameters:
- Destination: {req.destination}
- Dates: {req.start_date} to {req.end_date}
- Trip Type: {req.trip_type} (Group Size: {req.group_size})
- Budget Level: {req.budget_level} (Target Amount: ${req.budget_amount or 'Optimized'})
- Travel Style: {req.travel_style}
- Interests: {', '.join(req.interests) if req.interests else 'General Exploration, Food & Culture'}
- Accommodation: {req.accommodation_type or 'Recommended'}
- Notes: {req.custom_notes or 'None'}

Return ONLY a valid JSON object with this exact structure:
{{
  "title": "Inspiring trip title",
  "overview": "2-3 sentence engaging summary tailored to {req.trip_type} travel",
  "total_days": 3,
  "cost_breakdown": {{
    "accommodation": 400.0,
    "dining": 250.0,
    "activities": 180.0,
    "transit": 70.0,
    "misc": 50.0,
    "total": 950.0,
    "currency": "USD"
  }},
  "logistics": {{
    "weather_summary": "Expected temperature and conditions",
    "recommended_clothing": ["Item 1", "Item 2"],
    "essential_items": ["Item 1", "Item 2"],
    "local_customs_and_tips": ["Tip 1", "Tip 2"],
    "emergency_numbers": {{"Police": "911", "Ambulance": "911"}}
  }},
  "days": [
    {{
      "day_number": 1,
      "date": "{req.start_date}",
      "title": "Day Theme & Focus",
      "theme": "Theme description",
      "highlight": "Day highlight",
      "transit_advice": "Specific transit pass or line recommendation",
      "day_estimated_cost": 120.0,
      "activities": [
        {{
          "id": "act-1",
          "time_slot": "Morning",
          "time": "09:00 AM - 11:30 AM",
          "title": "Activity name",
          "category": "Attraction",
          "description": "Specific, vivid description with why it fits the traveler",
          "location": "Address or landmark name",
          "coordinates": {{"lat": 48.8566, "lng": 2.3522}},
          "estimated_cost": 25.0,
          "duration_hours": 2.5,
          "tips": "Pro-tip for avoiding crowds or booking",
          "tags": ["Culture", "Landmark"],
          "booking_required": false
        }}
      ]
    }}
  ]
}}
"""
        response = self.gemini_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        text = response.text.strip()
        # Clean potential markdown fences
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()

        data = json.loads(text)
        total_days = data.get("total_days", len(data.get("days", [])))
        
        return Trip(
            title=data.get("title", f"Personalized Trip to {req.destination}"),
            destination=req.destination,
            start_date=req.start_date,
            end_date=req.end_date,
            total_days=total_days,
            trip_type=req.trip_type,
            group_size=req.group_size,
            budget_level=req.budget_level,
            budget_amount=req.budget_amount or data.get("cost_breakdown", {}).get("total", 0.0),
            travel_style=req.travel_style,
            interests=req.interests,
            accommodation_type=req.accommodation_type,
            dietary_preferences=req.dietary_preferences or [],
            transportation_preference=req.transportation_preference,
            overview=data.get("overview", ""),
            days=[DayPlan(**d) for d in data.get("days", [])],
            cost_breakdown=CostBreakdown(**data.get("cost_breakdown", {})),
            logistics=LogisticsAndPacking(**data.get("logistics", {}))
        )

    def _generate_with_builtin_engine(self, req: TripGenerationRequest) -> Trip:
        """Intelligent fallback generative engine that synthesizes high-quality itineraries."""
        dest_lower = req.destination.lower()
        matched_dest = None
        for key in KNOWN_DESTINATIONS:
            if key in dest_lower:
                matched_dest = KNOWN_DESTINATIONS[key]
                break

        # Calculate number of days
        num_days = 3
        try:
            d1 = datetime.strptime(req.start_date, "%Y-%m-%d")
            d2 = datetime.strptime(req.end_date, "%Y-%m-%d")
            diff = (d2 - d1).days + 1
            if diff > 0:
                num_days = min(diff, 7)  # limit to max 7 days for responsive synthesis
        except Exception:
            num_days = req.total_days or 3

        # Base coordinates
        if matched_dest:
            base_lat, base_lng = matched_dest["coords"]
            currency = matched_dest["currency"]
            weather = matched_dest["weather"]
            packing = matched_dest["packing"]
            customs = matched_dest["customs"]
        else:
            base_lat, base_lng = 40.7128, -74.0060
            currency = "USD"
            weather = f"Pleasant seasonal weather for {req.destination} with comfortable daytime temperatures."
            packing = [
                "Versatile walking sneakers for full days of exploration",
                "Light layers and a weather-appropriate jacket",
                "Universal travel power adapter",
                "Daypack with RFID-blocking passport sleeve"
            ]
            customs = [
                f"Respect local cultural norms and etiquette throughout {req.destination}.",
                "Keep emergency contact numbers handy on your phone.",
                "Download offline map areas on Google Maps before heading out."
            ]

        # Multipliers based on budget
        budget_mult = 1.0
        if req.budget_level == "budget":
            budget_mult = 0.6
        elif req.budget_level == "luxury":
            budget_mult = 2.2

        days: List[DayPlan] = []
        total_act_cost = 0.0

        for day_i in range(1, num_days + 1):
            try:
                current_date = (datetime.strptime(req.start_date, "%Y-%m-%d") + timedelta(days=day_i - 1)).strftime("%Y-%m-%d")
            except Exception:
                current_date = f"Day {day_i}"

            day_acts: List[ActivityItem] = []
            
            # Themes based on day index & interests
            themes = [
                ("Arrival, Iconic Landmarks & Welcome Flavors", "Orientation and must-see city sights"),
                ("Cultural Immersion, Hidden Alleys & Artisan Dining", "Deep dive into heritage, architecture, and local specialties"),
                ("Scenic Views, Outdoor Wonder & Sunset Gathering", "Panoramic viewpoints and vibrant social atmosphere"),
                ("Neighborhood Wandering, Vintage Cafes & Markets", "Local bohemian streets, vintage hunting, and culinary tastings"),
                ("Adventure Excursion & Spectacular Nature", "Active morning excursion and relaxing evening unwind"),
                ("Modern Arts, Rooftop Cocktails & Celebration", "Contemporary scene, skyline vistas, and signature dinner"),
                ("Farewell Stroll & Souvenir Treasures", "Peaceful botanical strolls, last bites, and departure prep")
            ]
            title, theme = themes[(day_i - 1) % len(themes)]

            # Generate 4 slots: Morning, Afternoon, Evening, Night
            slots = ["Morning", "Afternoon", "Evening", "Night"]
            timings = ["09:00 AM - 12:00 PM", "12:30 PM - 03:00 PM", "04:30 PM - 07:30 PM", "08:00 PM - 10:30 PM"]

            day_cost = 0.0
            for slot_idx, slot in enumerate(slots):
                act_id = f"day{day_i}-act{slot_idx+1}-{uuid.uuid4().hex[:4]}"
                offset_lat = base_lat + (0.005 * (slot_idx + day_i) * (1 if slot_idx % 2 == 0 else -1))
                offset_lng = base_lng + (0.006 * (slot_idx + 1) * (1 if day_i % 2 == 0 else -1))
                
                # Check if we have curated attractions for this matched destination
                if matched_dest and slot in ["Morning", "Evening"] and matched_dest["attractions"]:
                    curated = matched_dest["attractions"][(day_i * 2 + slot_idx) % len(matched_dest["attractions"])]
                    act_title, c_lat, c_lng, cat, desc, cost, duration, tip = curated
                    cost_val = round(cost * budget_mult, 1)
                elif matched_dest and slot in ["Afternoon", "Night"] and matched_dest["dining"]:
                    curated = matched_dest["dining"][(day_i + slot_idx) % len(matched_dest["dining"])]
                    act_title, c_lat, c_lng, cat, desc, cost, duration, tip = curated
                    cost_val = round(cost * budget_mult, 1)
                else:
                    # Dynamic tailored activity
                    if slot == "Morning":
                        cat = "Attraction"
                        act_title = f"{req.destination} Heritage Landmark & Historic Walk"
                        desc = f"Start Day {day_i} with a guided or self-paced exploration of one of {req.destination}'s most renowned landmarks tailored for a {req.trip_type} trip."
                        cost_val = round(15.0 * budget_mult, 1)
                        tip = "Visit early in the morning to enjoy uncrowded photo opportunities."
                        duration = 3.0
                    elif slot == "Afternoon":
                        cat = "Dining"
                        act_title = f"Artisan Gastronomic Lunch in {req.destination}"
                        desc = f"Savor authentic regional dishes, fresh local ingredients, and refreshments at a charming local eatery."
                        cost_val = round(22.0 * budget_mult, 1)
                        tip = "Ask for the daily chef special or seasonal pairing."
                        duration = 1.5
                    elif slot == "Evening":
                        cat = "Attraction" if slot_idx == 2 else "Leisure"
                        act_title = f"Scenic Viewpoint & Sunset Over {req.destination}"
                        desc = f"Experience panoramic city or coastal vistas as the late afternoon light illuminates {req.destination}."
                        cost_val = round(12.0 * budget_mult, 1)
                        tip = "Arrive 30 minutes before sunset for the golden hour transition."
                        duration = 2.5
                    else:
                        cat = "Nightlife" if "Nightlife" in req.interests else "Dining"
                        act_title = f"Atmospheric Evening Dining & Night Stroll"
                        desc = f"End the day with a relaxed {req.travel_style} dinner, craft drinks, and an evening stroll through historic illuminated streets."
                        cost_val = round(35.0 * budget_mult, 1)
                        tip = "Reservations recommended for dinner on weekends."
                        duration = 2.0

                    c_lat, c_lng = offset_lat, offset_lng

                day_acts.append(
                    ActivityItem(
                        id=act_id,
                        time_slot=slot,
                        time=timings[slot_idx],
                        title=act_title,
                        category=cat,
                        description=desc,
                        location=f"{req.destination} Center & Surroundings",
                        coordinates=Coordinates(lat=c_lat, lng=c_lng),
                        estimated_cost=cost_val,
                        currency="USD",
                        duration_hours=duration,
                        tips=tip,
                        tags=req.interests[:3] if req.interests else ["Sightseeing", "Food"],
                        booking_required=slot in ["Morning", "Night"] and budget_mult > 1.2
                    )
                )
                day_cost += cost_val

            total_act_cost += day_cost
            days.append(
                DayPlan(
                    day_number=day_i,
                    date=current_date,
                    title=f"Day {day_i}: {title}",
                    theme=theme,
                    activities=day_acts,
                    day_estimated_cost=round(day_cost, 1),
                    highlight=f"The sunset view and evening dining on Day {day_i}",
                    transit_advice=f"Easily navigated via {req.transportation_preference or 'public transit and scenic walking'}."
                )
            )

        # Cost Breakdown synthesis
        est_accom = round(num_days * (80.0 if req.budget_level == "budget" else 190.0 if req.budget_level == "moderate" else 420.0) * (1 if req.trip_type in ["solo", "couple"] else 1.8), 2)
        est_transit = round(num_days * (15.0 if req.budget_level == "budget" else 30.0 if req.budget_level == "moderate" else 75.0) * req.group_size, 2)
        est_dining = round(total_act_cost * 0.55 * req.group_size, 2)
        est_activities = round(total_act_cost * 0.45 * req.group_size, 2)
        est_misc = round((est_accom + est_dining + est_activities) * 0.08, 2)
        total_cost = round(est_accom + est_transit + est_dining + est_activities + est_misc, 2)

        return Trip(
            title=f"{req.trip_type.capitalize()} Getaway: {req.destination} Highlights",
            destination=req.destination,
            start_date=req.start_date,
            end_date=req.end_date,
            total_days=num_days,
            trip_type=req.trip_type,
            group_size=req.group_size,
            budget_level=req.budget_level,
            budget_amount=req.budget_amount or total_cost,
            travel_style=req.travel_style,
            interests=req.interests,
            accommodation_type=req.accommodation_type,
            dietary_preferences=req.dietary_preferences or [],
            transportation_preference=req.transportation_preference,
            overview=f"An intelligently balanced {num_days}-day itinerary in {req.destination} designed for {req.group_size} {'traveler' if req.group_size==1 else 'travelers'} seeking a {req.travel_style} pace with curated dining, sights, and logistics.",
            days=days,
            cost_breakdown=CostBreakdown(
                accommodation=est_accom,
                dining=est_dining,
                activities=est_activities,
                transit=est_transit,
                misc=est_misc,
                total=total_cost,
                currency="USD"
            ),
            logistics=LogisticsAndPacking(
                weather_summary=weather,
                recommended_clothing=packing,
                essential_items=[
                    "Smartphone with offline navigation maps & translator",
                    "Portable battery power bank (minimum 10,000 mAh)",
                    "Digital copy of passport, insurance & hotel bookings",
                    "Compact travel umbrella or light rain shell"
                ],
                local_customs_and_tips=customs,
                emergency_numbers={
                    "Emergency Services": "112 / 911",
                    "Local Embassy / Tourist Assistance": "+1 202-501-4444"
                }
            )
        )

    def regenerate_day(self, trip: Trip, day_number: int, refinement_prompt: Optional[str] = None) -> DayPlan:
        """Regenerates a single day's plan with custom refinements."""
        matched_dest = None
        for key in KNOWN_DESTINATIONS:
            if key in trip.destination.lower():
                matched_dest = KNOWN_DESTINATIONS[key]
                break

        base_lat = matched_dest["coords"][0] if matched_dest else 40.7128
        base_lng = matched_dest["coords"][1] if matched_dest else -74.0060

        new_activities = [
            ActivityItem(
                id=f"regen-d{day_number}-a1-{uuid.uuid4().hex[:4]}",
                time_slot="Morning",
                time="09:30 AM - 12:30 PM",
                title=f"Refreshed Exploration: {refinement_prompt or 'Artisan District & Architecture'}",
                category="Attraction",
                description=f"Tailored morning experience updated with your preference: {refinement_prompt or 'relaxed stroll through vibrant historical quarter.'}",
                location=f"{trip.destination} Historic Quarter",
                coordinates=Coordinates(lat=base_lat + 0.008, lng=base_lng - 0.004),
                estimated_cost=18.0,
                duration_hours=3.0,
                tips="Updated recommendation to optimize routing.",
                tags=["Refined", "Custom"],
                booking_required=False
            ),
            ActivityItem(
                id=f"regen-d{day_number}-a2-{uuid.uuid4().hex[:4]}",
                time_slot="Afternoon",
                time="01:00 PM - 02:45 PM",
                title="Curated Chef Lunch & Wine Tasting",
                category="Dining",
                description="Selected seasonal dining spot featuring locally sourced menu items and authentic regional hospitality.",
                location=f"{trip.destination} Dining Alley",
                coordinates=Coordinates(lat=base_lat + 0.003, lng=base_lng + 0.005),
                estimated_cost=30.0,
                duration_hours=1.75,
                tips="Try the house signature specialty.",
                tags=["Dining", "Gourmet"],
                booking_required=False
            ),
            ActivityItem(
                id=f"regen-d{day_number}-a3-{uuid.uuid4().hex[:4]}",
                time_slot="Evening",
                time="04:30 PM - 07:00 PM",
                title="Sunset Vista & Local Artisan Workshop",
                category="Leisure",
                description="Experience local craft-makers, boutique studios, and a tranquil golden hour viewpoint.",
                location=f"{trip.destination} Terrace Gardens",
                coordinates=Coordinates(lat=base_lat - 0.005, lng=base_lng + 0.007),
                estimated_cost=15.0,
                duration_hours=2.5,
                tips="Great photo lighting between 5:30 PM and 6:30 PM.",
                tags=["Scenic", "Sunset"],
                booking_required=False
            ),
            ActivityItem(
                id=f"regen-d{day_number}-a4-{uuid.uuid4().hex[:4]}",
                time_slot="Night",
                time="07:30 PM - 10:30 PM",
                title="Intimate Supper & Acoustic Live Music",
                category="Nightlife",
                description="Unwind at a cozy candlelit venue offering ambient music, tapas or dessert, and handcrafted drinks.",
                location=f"{trip.destination} Arts Quarter",
                coordinates=Coordinates(lat=base_lat - 0.002, lng=base_lng - 0.006),
                estimated_cost=35.0,
                duration_hours=3.0,
                tips="Ask the bartender for the local cocktail of the season.",
                tags=["Evening", "Music", "Relaxed"],
                booking_required=False
            )
        ]

        day_cost = sum(a.estimated_cost for a in new_activities)
        return DayPlan(
            day_number=day_number,
            date=trip.days[day_number - 1].date if (day_number - 1 < len(trip.days)) else f"Day {day_number}",
            title=f"Day {day_number}: Custom Refined Experience",
            theme=f"Personalized around '{refinement_prompt}'" if refinement_prompt else "Refined pacing & alternative highlights",
            activities=new_activities,
            day_estimated_cost=round(day_cost, 1),
            highlight="Tailored afternoon & evening activities tailored to your feedback.",
            transit_advice="Efficient transit path linking each venue within 15 minutes."
        )

    def regenerate_activity(self, trip: Trip, day_number: int, activity_id: str, refinement_prompt: Optional[str] = None) -> ActivityItem:
        """Suggests a new alternative activity for a specific slot."""
        return ActivityItem(
            id=f"alt-{uuid.uuid4().hex[:6]}",
            time_slot="Afternoon",
            time="02:00 PM - 04:30 PM",
            title=f"Alternative: {refinement_prompt or 'Curated Hidden Gem'}",
            category="Attraction",
            description=f"Specially curated alternative for {trip.destination} focused on {refinement_prompt or 'local culture and relaxing vibe'}.",
            location=f"{trip.destination} Historic District",
            coordinates=Coordinates(lat=40.7150, lng=-74.0020),
            estimated_cost=20.0,
            duration_hours=2.5,
            tips="Less crowded alternative with high traveler satisfaction ratings.",
            tags=["Alternative", "Recommended"],
            booking_required=False
        )

ai_generator = AIGeneratorService()
