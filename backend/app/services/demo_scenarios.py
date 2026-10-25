from typing import List, Dict, Any
from app.models.schemas import Trip, DayPlan, ActivityItem, Coordinates, CostBreakdown, LogisticsAndPacking
import uuid
from datetime import datetime

def get_scenario_1_solo_weekend() -> Trip:
    """Scenario 1: Solo Traveler Planning a Weekend Getaway in Tokyo"""
    days = [
        DayPlan(
            day_number=1,
            date="Day 1",
            title="Modern Metropolis & Electric Alleys",
            theme="Urban exploration, iconic landmarks & authentic ramen",
            highlight="Panoramic Shibuya Sky sunset & Golden Gai solo bar discovery",
            transit_advice="Use Tokyo Subway 72-Hour Pass or Suica card for seamless hopping across JR Yamanote and metro lines.",
            day_estimated_cost=85.0,
            activities=[
                ActivityItem(
                    id="sc1-d1-a1",
                    time_slot="Morning",
                    time="09:30 AM - 12:00 PM",
                    title="Shinjuku Gyoen National Garden Stroll",
                    category="Attraction",
                    description="Peaceful solo walk through traditional Japanese landscape gardens, English lawns, and greenhouse. Ideal serene start to the weekend.",
                    location="11 Naitomachi, Shinjuku City, Tokyo",
                    coordinates=Coordinates(lat=35.6852, lng=139.7101),
                    estimated_cost=4.0,
                    duration_hours=2.5,
                    tips="Enter through Shinjuku Gate; tickets can be purchased via automated vending machines.",
                    tags=["Nature", "Solo-Friendly", "Photography"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc1-d1-a2",
                    time_slot="Afternoon",
                    time="12:30 PM - 02:00 PM",
                    title="Solo Counter Ramen at Ichiran Shinjuku",
                    category="Dining",
                    description="Iconic private dining flavor booth where you customize noodle firmness, broth richness, and garlic levels without spoken words.",
                    location="3-34-11 Shinjuku, Tokyo",
                    coordinates=Coordinates(lat=35.6900, lng=139.7020),
                    estimated_cost=14.0,
                    duration_hours=1.5,
                    tips="Order via the ticket vending machine before sitting down; perfect introverted solo culinary ritual.",
                    tags=["Food & Dining", "Solo Dining", "Cultural"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc1-d1-a3",
                    time_slot="Evening",
                    time="04:30 PM - 07:00 PM",
                    title="Shibuya Scramble & Shibuya Sky Observation Deck",
                    category="Attraction",
                    description="Cross the world's most bustling intersection, then take the glass elevator to the open-air rooftop observatory at 229 meters high.",
                    location="2-24-12 Shibuya, Shibuya City, Tokyo",
                    coordinates=Coordinates(lat=35.6585, lng=139.7013),
                    estimated_cost=18.0,
                    duration_hours=2.5,
                    tips="Book the 4:40 PM sunset slot in advance to see Tokyo transition from golden hour into dazzling neon twilight.",
                    tags=["Sightseeing", "Views", "Must-See"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc1-d1-a4",
                    time_slot="Night",
                    time="07:30 PM - 10:00 PM",
                    title="Omoide Yokocho (Memory Lane) Yakitori & Craft Beer",
                    category="Dining",
                    description="Atmospheric narrow alleyway packed with tiny charcoal grills serving sizzling chicken skewers and draft beer alongside friendly locals.",
                    location="1-2 Nishishinjuku, Shinjuku City, Tokyo",
                    coordinates=Coordinates(lat=35.6932, lng=139.6998),
                    estimated_cost=25.0,
                    duration_hours=2.0,
                    tips="Bring cash (yen); pick stalls with English photo boards if you don't speak Japanese.",
                    tags=["Nightlife", "Local Eats", "Street Food"],
                    booking_required=False
                )
            ]
        ),
        DayPlan(
            day_number=2,
            date="Day 2",
            title="Edo Heritage & Digital Art Universe",
            theme="Historic temple charm transitioning into futuristic multimedia art",
            highlight="Morning incense ritual at Senso-ji & mind-bending sensory mirrors at teamLab",
            transit_advice="Ginza Line directly connects Asakusa to Ginza; take Yurikamome monorail to Toyosu.",
            day_estimated_cost=95.0,
            activities=[
                ActivityItem(
                    id="sc1-d2-a1",
                    time_slot="Morning",
                    time="08:30 AM - 11:30 AM",
                    title="Senso-ji Temple & Nakamise-dori Market",
                    category="Attraction",
                    description="Tokyo's oldest and most sacred Buddhist temple. Beat the tour crowds in early morning, smell sandalwood incense, and sample fresh melon pan.",
                    location="2-3-1 Asakusa, Taito City, Tokyo",
                    coordinates=Coordinates(lat=35.7148, lng=139.7967),
                    estimated_cost=5.0,
                    duration_hours=3.0,
                    tips="Draw an omikuji (fortune) for 100 yen near the main prayer hall.",
                    tags=["Culture & History", "Landmark", "Walking Tour"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc1-d2-a2",
                    time_slot="Afternoon",
                    time="12:30 PM - 01:45 PM",
                    title="Tsukiji Outer Market Seafood Donburi",
                    category="Dining",
                    description="Vibrant bustling marketplace stall lunch featuring melt-in-your-mouth bluefin tuna, sea urchin, and grilled tamagoyaki egg skewers.",
                    location="4-16-2 Tsukiji, Chuo City, Tokyo",
                    coordinates=Coordinates(lat=35.6654, lng=139.7707),
                    estimated_cost=22.0,
                    duration_hours=1.25,
                    tips="Stalls close by 2:00 PM; arrive with an appetite and follow the local queues.",
                    tags=["Food & Dining", "Seafood", "Markets"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc1-d2-a3",
                    time_slot="Evening",
                    time="03:00 PM - 06:00 PM",
                    title="teamLab Planets TOKYO Immersive Art",
                    category="Attraction",
                    description="Barefoot museum experience where you walk through mirror rooms filled with floating orchids and wade through knee-deep water projected with koi fish.",
                    location="6-1-16 Toyosu, Koto City, Tokyo",
                    coordinates=Coordinates(lat=35.6491, lng=139.7898),
                    estimated_cost=28.0,
                    duration_hours=3.0,
                    tips="Wear shorts or easily rollable pants as you will be barefoot in water.",
                    tags=["Digital Art", "Unique Experience", "Sensory"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc1-d2-a4",
                    time_slot="Night",
                    time="07:30 PM - 10:00 PM",
                    title="Akihabara Vintage Gaming & Capsule Toy Exploration",
                    category="Leisure",
                    description="Solo stroll through multi-story retro arcades at Super Potato and Gashapon Hall, ending with piping hot matcha dorayaki.",
                    location="1 Chome Sotokanda, Chiyoda City, Tokyo",
                    coordinates=Coordinates(lat=35.6983, lng=139.7719),
                    estimated_cost=20.0,
                    duration_hours=2.5,
                    tips="Try the retro claw machines on upper floors for exclusive Tokyo souvenirs.",
                    tags=["Gaming", "Pop Culture", "Night Walk"],
                    booking_required=False
                )
            ]
        ),
        DayPlan(
            day_number=3,
            date="Day 3",
            title="Vintage Indie Culture & Scenic Tokyo Farewell",
            theme="Boutique coffee, vinyl records & peaceful park wrap-up",
            highlight="Shimokitazawa thrift treasure hunting & Meiji Jingu wish tablet",
            transit_advice="Keio Inokashira line connects Shimokitazawa directly to Shibuya in 5 minutes.",
            day_estimated_cost=70.0,
            activities=[
                ActivityItem(
                    id="sc1-d3-a1",
                    time_slot="Morning",
                    time="09:00 AM - 11:30 AM",
                    title="Meiji Shrine Forest Walk & Yoyogi Park",
                    category="Attraction",
                    description="Soothing morning pilgrimage through towering cedar trees, massive torii gates, and barrel sake tributes dedicated to Emperor Meiji.",
                    location="1-1 Yoyogikamizonocho, Shibuya City, Tokyo",
                    coordinates=Coordinates(lat=35.6764, lng=139.6993),
                    estimated_cost=0.0,
                    duration_hours=2.5,
                    tips="Write a travel wish on an Ema wooden tablet for 500 yen.",
                    tags=["Nature", "Culture", "Peaceful"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc1-d3-a2",
                    time_slot="Afternoon",
                    time="12:00 PM - 03:30 PM",
                    title="Shimokitazawa Bohemian Cafes & Thrift Hunting",
                    category="Leisure",
                    description="Tokyo's trendiest indie neighborhood: browse curated vintage streetwear, specialty drip coffee roasters, and record stores.",
                    location="Kitazawa, Setagaya City, Tokyo",
                    coordinates=Coordinates(lat=35.6617, lng=139.6672),
                    estimated_cost=30.0,
                    duration_hours=3.5,
                    tips="Stop at Bear Pond Espresso for an intense velvety single-origin macchiato.",
                    tags=["Shopping", "Coffee", "Vintage"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc1-d3-a3",
                    time_slot="Evening",
                    time="04:30 PM - 07:00 PM",
                    title="Ginza Six Rooftop Garden & Pre-Departure Bento",
                    category="Dining",
                    description="Sunset sky garden overlooking the Ginza luxury district, followed by picking up a gourmet master chef bento box for the journey.",
                    location="6-10-1 Ginza, Chuo City, Tokyo",
                    coordinates=Coordinates(lat=35.6696, lng=139.7640),
                    estimated_cost=25.0,
                    duration_hours=2.5,
                    tips="The B2 food hall in Ginza Six has world-class Japanese pastries and matcha truffles.",
                    tags=["Culinary", "Views", "Departure"],
                    booking_required=False
                )
            ]
        )
    ]

    return Trip(
        id="scenario-1-solo-tokyo",
        title="Solo Weekend Getaway: Tokyo Pulse & Hidden Alleys",
        destination="Tokyo, Japan",
        start_date="2026-11-06",
        end_date="2026-11-08",
        total_days=3,
        trip_type="solo",
        group_size=1,
        budget_level="budget",
        budget_amount=450.0,
        travel_style="balanced",
        interests=["Food & Dining", "Sightseeing", "Culture & History", "Photography"],
        accommodation_type="Modern Boutique Capsule / Micro-Hotel in Shinjuku",
        transportation_preference="Tokyo Metro & JR Yamanote Line",
        overview="A precision-crafted 3-day solo weekend itinerary designed to eliminate decision fatigue. Combines iconic neon vistas and world-class digital art with quiet morning shrines and solo-friendly counter dining spots.",
        days=days,
        cost_breakdown=CostBreakdown(
            accommodation=160.0,
            dining=115.0,
            activities=75.0,
            transit=35.0,
            misc=30.0,
            total=415.0,
            currency="USD"
        ),
        logistics=LogisticsAndPacking(
            weather_summary="Mild autumn weather (14°C to 19°C), crisp evenings and clear skies with low rain probability.",
            recommended_clothing=[
                "Comfortable walking sneakers (15,000+ daily steps expected)",
                "Light layerable jacket or trench coat for chilly evenings",
                "Slip-on shoes for temple visits and teamLab",
                "Crossbody sling bag for hands-free navigation"
            ],
            essential_items=[
                "Digital Suica / Pasmo added to Apple/Google Wallet",
                "eSIM / Pocket WiFi with unlimited data for Google Maps",
                "Portable power bank (10,000mAh)",
                "Small coin purse (Japan still utilizes coins for vending & shrines)"
            ],
            local_customs_and_tips=[
                "No tipping in Japan; exceptional service is already standard.",
                "Stand on the left on escalators in Tokyo (walk on the right).",
                "Carry a small bag for your trash, as street trash cans are rare.",
                "Ramen booths are quiet zones; slurping noodles is considered a compliment to the chef."
            ],
            emergency_numbers={
                "Police": "110",
                "Ambulance / Fire": "119",
                "Japan Travel Help": "+81 3-3201-3331"
            }
        ),
        scenario_id="scenario_1"
    )

def get_scenario_2_couple_vacation() -> Trip:
    """Scenario 2: Couple Planning a Romantic Vacation on the Amalfi Coast & Capri"""
    days = [
        DayPlan(
            day_number=1,
            date="Day 1",
            title="Positano Arrival & Sunset Aperitivo",
            theme="Cliffside glamour, pastel villages, and sea breezes",
            highlight="Sunset spritz at Franco's Bar overlooking the Mediterranean",
            transit_advice="Private transfer or ferry from Naples/Salerno to Positano pier.",
            day_estimated_cost=240.0,
            activities=[
                ActivityItem(
                    id="sc2-d1-a1",
                    time_slot="Morning",
                    time="10:00 AM - 01:00 PM",
                    title="Scenic Coastal Drive & Positano Check-in",
                    category="Stay",
                    description="Arrival at your cliffside boutique hotel. Unpack, sip welcoming chilled limoncello on your private balcony overlooking the Tyrrhenian Sea.",
                    location="Via Cristoforo Colombo, Positano, Italy",
                    coordinates=Coordinates(lat=40.6281, lng=14.4850),
                    estimated_cost=0.0,
                    duration_hours=3.0,
                    tips="Request luggage porter service from the pier to spare climbing steep staircases.",
                    tags=["Luxury", "Romantic", "Views"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc2-d1-a2",
                    time_slot="Afternoon",
                    time="01:30 PM - 03:30 PM",
                    title="Leisurely Lunch at Chez Black on Spiaggia Grande",
                    category="Dining",
                    description="Famous beachfront institution known for Heart-shaped Pizza, Tagliolini with Sea Urchin, and relaxed oceanfront people-watching.",
                    location="Via del Brigantino 19, Positano, Italy",
                    coordinates=Coordinates(lat=40.6275, lng=14.4862),
                    estimated_cost=90.0,
                    duration_hours=2.0,
                    tips="Reserve an outdoor beachfront front-row table 3 weeks ahead.",
                    tags=["Seafood", "Romantic Lunch", "Beachfront"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc2-d1-a3",
                    time_slot="Evening",
                    time="06:00 PM - 08:30 PM",
                    title="Golden Hour Drinks at Franco's Bar",
                    category="Leisure",
                    description="World-renowned open-air terrace with panoramic vistas of pastel Positano houses glowing under twilight, accompanied by live lounge violin.",
                    location="Via Cristoforo Colombo 30, Positano, Italy",
                    coordinates=Coordinates(lat=40.6290, lng=14.4845),
                    estimated_cost=65.0,
                    duration_hours=2.5,
                    tips="No reservations; arrive at 5:15 PM to secure prime front terrace lounge seats.",
                    tags=["Cocktails", "Sunset", "Scenic"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc2-d1-a4",
                    time_slot="Night",
                    time="09:00 PM - 11:00 PM",
                    title="Candlelit Dining at Ristorante Max",
                    category="Dining",
                    description="Intimate dining inside an antique art gallery and secluded lemon garden, featuring hand-made ravioli and aged Campanian wine.",
                    location="Piazza dei Mulini 22, Positano, Italy",
                    coordinates=Coordinates(lat=40.6288, lng=14.4839),
                    estimated_cost=120.0,
                    duration_hours=2.0,
                    tips="Ask the sommelier to pair a Greco di Tufo DOCG white with the catch of the day.",
                    tags=["Fine Dining", "Romantic", "Wine"],
                    booking_required=True
                )
            ]
        ),
        DayPlan(
            day_number=2,
            date="Day 2",
            title="Private Gozzo Boat Excursion to Capri",
            theme="Turquoise grottos, champagne on deck, and Faraglioni arches",
            highlight="Cruising through the Faraglioni rock arch with custom chilled prosecco",
            transit_advice="Private skippered classic Italian wooden Gozzo boat chartered from Positano pier.",
            day_estimated_cost=380.0,
            activities=[
                ActivityItem(
                    id="sc2-d2-a1",
                    time_slot="Morning",
                    time="09:30 AM - 01:00 PM",
                    title="Private Capri Coastal Cruise & Hidden Grottos",
                    category="Attraction",
                    description="Sail along the dramatic cliffs of Capri, stop to swim in crystal-clear emerald waters of the Green Grotto and White Grotto.",
                    location="Faraglioni Rocks, Capri, Italy",
                    coordinates=Coordinates(lat=40.5446, lng=14.2505),
                    estimated_cost=220.0,
                    duration_hours=3.5,
                    tips="Bring reef-safe sunscreen, polarized sunglasses, and your camera for turquoise water portraits.",
                    tags=["Sailing", "Swimming", "Couples Adventure"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc2-d2-a2",
                    time_slot="Afternoon",
                    time="01:30 PM - 03:30 PM",
                    title="Seafood Clifftop Lunch at La Fontelina Capri",
                    category="Dining",
                    description="Legendary beach club nestled directly into limestone rocks facing the Faraglioni. Fresh grilled sea bass and cold sangria with peaches.",
                    location="Località Faraglioni, Capri, Italy",
                    coordinates=Coordinates(lat=40.5439, lng=14.2512),
                    estimated_cost=140.0,
                    duration_hours=2.0,
                    tips="Must be booked months in advance via their online portal.",
                    tags=["Luxury Dining", "Iconic", "Sea Views"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc2-d2-a3",
                    time_slot="Evening",
                    time="04:30 PM - 07:00 PM",
                    title="Anacapri Chairlift to Monte Solaro & Gardens of Augustus",
                    category="Attraction",
                    description="Single-seater scenic chairlift ascending to Capri's highest peak with 360-degree vistas across the entire Bay of Naples.",
                    location="Via Caposcuro 10, Anacapri, Italy",
                    coordinates=Coordinates(lat=40.5528, lng=14.2230),
                    estimated_cost=30.0,
                    duration_hours=2.5,
                    tips="Hold your sandals tight while riding the chairlift above peaceful olive groves.",
                    tags=["Panoramic", "Romantic", "Nature"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc2-d2-a4",
                    time_slot="Night",
                    time="08:00 PM - 10:30 PM",
                    title="Sunset Sail Return to Positano & Gelato Walk",
                    category="Leisure",
                    description="Watch Positano's cliffside lights illuminate like a cascade of diamonds as your boat glides back, followed by pistachio gelato along the marina.",
                    location="Marina Grande, Positano, Italy",
                    coordinates=Coordinates(lat=40.6272, lng=14.4865),
                    estimated_cost=20.0,
                    duration_hours=2.5,
                    tips="Grab gelato from Buca di Bacco right beside the beach.",
                    tags=["Gelato", "Stroll", "Evening"],
                    booking_required=False
                )
            ]
        ),
        DayPlan(
            day_number=3,
            date="Day 3",
            title="Ravello Heights, Clifftop Gardens & Symphony",
            theme="Classical elegance, historic villas, and infinite horizons",
            highlight="The Infinity Terrace of Villa Cimbrone overlooking Salerno Bay",
            transit_advice="Private chauffeur or scenic ferry + taxi to mountaintop Ravello.",
            day_estimated_cost=290.0,
            activities=[
                ActivityItem(
                    id="sc2-d3-a1",
                    time_slot="Morning",
                    time="10:00 AM - 12:30 PM",
                    title="Villa Rufolo Moorish Gardens & Cloisters",
                    category="Attraction",
                    description="Enchanting 13th-century palace that inspired composer Richard Wagner. Stunning multi-tier floral gardens suspended high above the coastline.",
                    location="Piazza Vescovado 1, Ravello, Italy",
                    coordinates=Coordinates(lat=40.6489, lng=14.6117),
                    estimated_cost=16.0,
                    duration_hours=2.5,
                    tips="Check the Ravello Festival concert calendar for morning chamber music rehearsals.",
                    tags=["Architecture", "Gardens", "History"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc2-d3-a2",
                    time_slot="Afternoon",
                    time="01:00 PM - 03:00 PM",
                    title="Terrace Lunch at Ristorante Salvatore Ravello",
                    category="Dining",
                    description="Family-run gem serving wood-fired truffle pizzas, fresh burrata, and hand-cut paccheri pasta with sweeping valley views.",
                    location="Via Repubblica delle Marinate 2, Ravello, Italy",
                    coordinates=Coordinates(lat=40.6502, lng=14.6105),
                    estimated_cost=80.0,
                    duration_hours=2.0,
                    tips="Try the house specialty lemon soufflé dessert.",
                    tags=["Authentic Italian", "Valley Views", "Pasta"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc2-d3-a3",
                    time_slot="Evening",
                    time="03:30 PM - 06:30 PM",
                    title="Villa Cimbrone 'Terrace of Infinity' Walk",
                    category="Attraction",
                    description="Walk hand-in-hand through wisteria-lined pergolas to the famous marble bust terrace where sky meets the deep blue sea seamlessly.",
                    location="Via Santa Chiara 26, Ravello, Italy",
                    coordinates=Coordinates(lat=40.6456, lng=14.6128),
                    estimated_cost=20.0,
                    duration_hours=3.0,
                    tips="The most photographed romantic viewpoint on the entire Mediterranean.",
                    tags=["Iconic Views", "Photography", "Romantic Walk"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc2-d3-a4",
                    time_slot="Night",
                    time="08:00 PM - 10:30 PM",
                    title="Michelin-Star Tasting at Rossellinis or Il Flauto di Pan",
                    category="Dining",
                    description="Gourmet multi-course culinary journey celebrating Amalfi seafood, heirloom herbs, and Campania fine wines under starlight.",
                    location="Via San Giovanni del Toro 28, Ravello, Italy",
                    coordinates=Coordinates(lat=40.6514, lng=14.6122),
                    estimated_cost=220.0,
                    duration_hours=2.5,
                    tips="Gentlemen: smart casual dress code (collared shirt and trousers).",
                    tags=["Michelin Star", "Fine Dining", "Celebration"],
                    booking_required=True
                )
            ]
        ),
        DayPlan(
            day_number=4,
            date="Day 4",
            title="Path of the Gods (Piazza Bomerano) & Lemon Grove Tasting",
            theme="Scenic nature walk, artisanal mozzarella, and lemon groves",
            highlight="Private organic lemon grove tour and handmade limoncello tasting in Amalfi",
            transit_advice="Morning taxi to Bomerano trailhead, descending to Nocelle, then private shuttle.",
            day_estimated_cost=190.0,
            activities=[
                ActivityItem(
                    id="sc2-d4-a1",
                    time_slot="Morning",
                    time="08:30 AM - 12:30 PM",
                    title="Sentiero degli Dei (Path of the Gods) Gentle Hike",
                    category="Attraction",
                    description="Moderate clifftop hike featuring breathtaking panoramic views of the entire peninsula all the way to Capri.",
                    location="Trailhead Bomerano, Agerola to Nocelle, Italy",
                    coordinates=Coordinates(lat=40.6315, lng=14.5360),
                    estimated_cost=0.0,
                    duration_hours=4.0,
                    tips="Wear sturdy hiking sneakers and carry 1.5L water per person.",
                    tags=["Nature", "Hiking", "Scenic Views"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc2-d4-a2",
                    time_slot="Afternoon",
                    time="01:00 PM - 03:00 PM",
                    title="Rustic Farmhouse Lunch at Rifugio dei Mele",
                    category="Dining",
                    description="Rewarding end-of-hike sanctuary in Nocelle serving handmade gnocchi alla Sorrentina, fresh ricotta, and garden salads.",
                    location="Via Nocelle 66, Positano, Italy",
                    coordinates=Coordinates(lat=40.6322, lng=14.5002),
                    estimated_cost=70.0,
                    duration_hours=2.0,
                    tips="Relax on the terrace with fresh freshly squeezed lemon lemonade.",
                    tags=["Farm-to-Table", "Rustic", "Recharge"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc2-d4-a3",
                    time_slot="Evening",
                    time="04:30 PM - 07:00 PM",
                    title="Amalfi Historical Center & Cathedral of St. Andrew",
                    category="Attraction",
                    description="Explore the ancient Maritime Republic of Amalfi, admire the Arab-Norman cathedral facade and bronze doors from Constantinople.",
                    location="Piazza Duomo, Amalfi, Italy",
                    coordinates=Coordinates(lat=40.6341, lng=14.6027),
                    estimated_cost=10.0,
                    duration_hours=2.5,
                    tips="Climb the 62 steps to the atrium for photos of the sunlit piazza below.",
                    tags=["History", "Architecture", "Piazza"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc2-d4-a4",
                    time_slot="Night",
                    time="08:00 PM - 10:30 PM",
                    title="Lemon Grove Dining at Ristorante Donna Stella",
                    category="Dining",
                    description="Dine directly under an arched canopy of ripe Amalfi sfusato lemons hanging above your table. Fragrant, romantic, and quintessentially Italian.",
                    location="Salita Rascica 2, Amalfi, Italy",
                    coordinates=Coordinates(lat=40.6350, lng=14.6015),
                    estimated_cost=90.0,
                    duration_hours=2.5,
                    tips="Their lemon spaghetti and lemon tiramisu are unmissable.",
                    tags=["Lemon Grove", "Charming", "Local Pasta"],
                    booking_required=True
                )
            ]
        )
    ]

    return Trip(
        id="scenario-2-couple-amalfi",
        title="Amalfi Coast Romance: Positano, Capri & Clifftop Serenade",
        destination="Amalfi Coast & Positano, Italy",
        start_date="2026-09-12",
        end_date="2026-09-16",
        total_days=4,
        trip_type="couple",
        group_size=2,
        budget_level="luxury",
        budget_amount=2800.0,
        travel_style="relaxed",
        interests=["Romantic Spots", "Scenic Views", "Food & Dining", "Culture & History", "Photography"],
        accommodation_type="Cliffside Luxury Boutique Hotel with Sea Balcony",
        transportation_preference="Private Boat Charters & Chauffeured Transfers",
        overview="A tailored luxury escape for couples seeking intimacy, breathtaking coastal scenery, and curated gastronomy. Balancing lazy terrace mornings with private Capri sailing, Ravello's classical clifftops, and candlelit Michelin dining.",
        days=days,
        cost_breakdown=CostBreakdown(
            accommodation=1400.0,
            dining=750.0,
            activities=350.0,
            transit=200.0,
            misc=100.0,
            total=2800.0,
            currency="USD"
        ),
        logistics=LogisticsAndPacking(
            weather_summary="Warm Mediterranean sunshine (24°C to 27°C), gentle sea breezes, warm water perfect for swimming, mild balmy evenings.",
            recommended_clothing=[
                "Breezy linen shirts and resort dresses",
                "Smart dinner wear for Michelin venues (no beach shorts)",
                "Quality swimwear and UV rash guards for boat charters",
                "Comfortable espadrilles or leather walking sandals for cobblestone steps"
            ],
            essential_items=[
                "Reef-safe sunscreen and high SPF facial lotion",
                "Dry bag for boat trips to Capri",
                "Polarized sunglasses",
                "Universal European plug adapters (Type C/L)"
            ],
            local_customs_and_tips=[
                "Dinner in Italy usually starts around 8:30 PM or 9:00 PM.",
                "Tipping 5-10% is appreciated for exceptional table service, though coperto (cover charge) is standard on bills.",
                "Always carry a little cash for porter bags and beach loungers."
            ],
            emergency_numbers={
                "Carabinieri (Police)": "112",
                "Emergency Medical": "118",
                "Coast Guard (Capitaneria)": "1530"
            }
        ),
        scenario_id="scenario_2"
    )

def get_scenario_3_group_adventure() -> Trip:
    """Scenario 3: Small Group Coordinating a Multi-Day Holiday in Barcelona & Costa Brava"""
    days = [
        DayPlan(
            day_number=1,
            date="Day 1",
            title="Gothic Quarter Quests, Group Tapas Crawl & Sangria",
            theme="Historic winding alleys, shared tapas platters, and rooftop welcome vibes",
            highlight="Private El Born craft tapas tour with porrón wine challenge",
            transit_advice="Use T-Casual 10-trip metro cards (individually) or Ola Barcelona travel cards.",
            day_estimated_cost=75.0,
            activities=[
                ActivityItem(
                    id="sc3-d1-a1",
                    time_slot="Morning",
                    time="10:00 AM - 01:00 PM",
                    title="Shared Eixample Apartment Check-in & Coffee Gathering",
                    category="Stay",
                    description="Unpack at your spacious 4-bedroom modernist apartment in Eixample with high ceilings and balconies. Quick group briefing with local pastries.",
                    location="Carrer de Mallorca, Eixample, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.3935, lng=2.1648),
                    estimated_cost=0.0,
                    duration_hours=3.0,
                    tips="Set up a shared Splitwise group early to track joint groceries, taxis, and ticket expenses.",
                    tags=["Group Stay", "Coordination", "Coffee"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc3-d1-a2",
                    time_slot="Afternoon",
                    time="01:30 PM - 03:30 PM",
                    title="Mercat de la Boqueria Group Food Exploration",
                    category="Dining",
                    description="Vibrant food stalls: divide and conquer fresh jamón ibérico cones, empanadas, tropical fruit juices, and fried calamari.",
                    location="La Rambla 91, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.3817, lng=2.1716),
                    estimated_cost=20.0,
                    duration_hours=2.0,
                    tips="Meet back at the central seafood bar Bar Pinotxo after 45 minutes of roaming.",
                    tags=["Market", "Tasting", "Group Friendly"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc3-d1-a3",
                    time_slot="Evening",
                    time="04:30 PM - 07:00 PM",
                    title="Gothic Quarter (Barri Gòtic) Mystery Walking Scavenger",
                    category="Attraction",
                    description="Explore 2,000-year-old Roman walls, the Barcelona Cathedral courtyard with its 13 white geese, and hidden squares like Plaça del Rei.",
                    location="Plaça de la Seu, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.3839, lng=2.1762),
                    estimated_cost=9.0,
                    duration_hours=2.5,
                    tips="Stop by the Kiss of Freedom mural in Carrer dels Capellans for an iconic group photo.",
                    tags=["History", "Walking", "Architecture"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc3-d1-a4",
                    time_slot="Night",
                    time="08:00 PM - 11:30 PM",
                    title="El Born Tapas Crawl: Cal Pep & El Xampanyet",
                    category="Dining",
                    description="High-energy tapas crawl with sparkling cava, pan con tomate, pimientos de padrón, patatas bravas, and grilled razor clams.",
                    location="Carrer de Montcada 22, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.3846, lng=2.1818),
                    estimated_cost=40.0,
                    duration_hours=3.5,
                    tips="No bookings at El Xampanyet; queue at 7:45 PM together with your group.",
                    tags=["Tapas", "Nightlife", "Group Dining"],
                    booking_required=False
                )
            ]
        ),
        DayPlan(
            day_number=2,
            date="Day 2",
            title="Gaudí Masterpieces: Sagrada Família & Park Güell",
            theme="Unearthly architecture, stained glass light spectrums, and city panoramas",
            highlight="Afternoon sun streaming through Sagrada Família's rainbow stained-glass towers",
            transit_advice="L2 or L5 Metro to Sagrada Família; then group taxi or bus 24 up to Park Güell.",
            day_estimated_cost=90.0,
            activities=[
                ActivityItem(
                    id="sc3-d2-a1",
                    time_slot="Morning",
                    time="09:15 AM - 12:30 PM",
                    title="Sagrada Família Basilique & Nativity Tower Climb",
                    category="Attraction",
                    description="Antoni Gaudí's magnum opus. Towering stone tree trunks, kaleidoscopic light, and climb the spiral towers overlooking Barcelona to the ocean.",
                    location="Carrer de Mallorca 401, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.4036, lng=2.1744),
                    estimated_cost=36.0,
                    duration_hours=3.25,
                    tips="Book the group tower access ticket well in advance. Shoulders and knees must be covered.",
                    tags=["UNESCO", "Must See", "Architecture"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc3-d2-a2",
                    time_slot="Afternoon",
                    time="01:00 PM - 02:45 PM",
                    title="Traditional Paella Feast at 7 Portes or Arume",
                    category="Dining",
                    description="Large shared seafood paella, black rice with squid ink (arroz negro), and large pitchers of sangria de cava for the table.",
                    location="Passeig d'Isabel II 14, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.3820, lng=2.1834),
                    estimated_cost=35.0,
                    duration_hours=1.75,
                    tips="Paella portions are huge; 3-4 pans are plenty for a group of 5-6.",
                    tags=["Paella", "Sangria", "Group Lunch"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc3-d2-a3",
                    time_slot="Evening",
                    time="03:30 PM - 06:30 PM",
                    title="Park Güell Monumental Zone & Mosaic Serpent Bench",
                    category="Attraction",
                    description="Fairy-tale park with serpentine trencadís tile benches, gingerbread gatehouses, and the famous smiling mosaic salamander (El Drac).",
                    location="Carrer d'Olot 5, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.4145, lng=2.1527),
                    estimated_cost=14.0,
                    duration_hours=3.0,
                    tips="Great vantage point for group portraits with the Barcelona skyline in the background.",
                    tags=["Park", "Art", "Views"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc3-d2-a4",
                    time_slot="Night",
                    time="07:30 PM - 11:00 PM",
                    title="Bunkers del Carmel Sunset & Craft Beer Gathering",
                    category="Nightlife",
                    description="Former Spanish Civil War anti-aircraft bunkers offering the undisputed 360-degree panoramic view of the sunset over the city grid.",
                    location="Carrer de Marià Labèrnia, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.4193, lng=2.1616),
                    estimated_cost=10.0,
                    duration_hours=3.5,
                    tips="Bring snacks and cold drinks from a local supermarket; access closes at 7:30 PM so arrive beforehand.",
                    tags=["Sunset", "Social", "Views"],
                    booking_required=False
                )
            ]
        ),
        DayPlan(
            day_number=3,
            date="Day 3",
            title="Costa Brava Adventure: Sea Kayaking, Cliff Jumping & Coves",
            theme="Outdoor thrills, Mediterranean sea kayaking, and hidden coastal villages",
            highlight="Paddling into sea caves and cliff jumping at Tossa de Mar",
            transit_advice="Shared rental van or Sarfa bus directly to Tossa de Mar / Sant Feliu de Guíxols (1 hour 15 min).",
            day_estimated_cost=95.0,
            activities=[
                ActivityItem(
                    id="sc3-d3-a1",
                    time_slot="Morning",
                    time="08:30 AM - 01:00 PM",
                    title="Guided Group Sea Kayaking & Snorkeling in Costa Brava",
                    category="Attraction",
                    description="Tandem sea kayaks paddling through crystalline turquoise waters, exploring granite sea caves, and snorkeling among marine life.",
                    location="Platja Gran, Tossa de Mar, Spain",
                    coordinates=Coordinates(lat=41.7196, lng=2.9328),
                    estimated_cost=45.0,
                    duration_hours=4.5,
                    tips="Wetsuits, life vests, and waterproof barrels provided; bring towel and dry change of clothes.",
                    tags=["Adventure", "Water Sports", "Group Activity"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc3-d3-a2",
                    time_slot="Afternoon",
                    time="01:30 PM - 03:30 PM",
                    title="Chiringuito Beachfront Lunch: Grilled Sardines & Fideuà",
                    category="Dining",
                    description="Casual seaside diner on the sand serving freshly grilled sardines with sea salt, noodle fideuà with garlic alioli, and cold Estrella Damm.",
                    location="Passeig del Mar, Tossa de Mar, Spain",
                    coordinates=Coordinates(lat=41.7180, lng=2.9310),
                    estimated_cost=25.0,
                    duration_hours=2.0,
                    tips="Order alioli on the side for dipping crusty bread.",
                    tags=["Beach Dining", "Seafood", "Casual"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc3-d3-a3",
                    time_slot="Evening",
                    time="04:00 PM - 06:30 PM",
                    title="Vila Vella (Old Town Castle) Wall Walk & Cliff Views",
                    category="Attraction",
                    description="Wander through the only fortified medieval village still standing on the Catalan coast, climbing up to the Tossa lighthouse.",
                    location="Vila Vella, Tossa de Mar, Spain",
                    coordinates=Coordinates(lat=41.7165, lng=2.9333),
                    estimated_cost=0.0,
                    duration_hours=2.5,
                    tips="Spectacular view looking down into secluded Cala Codolar cove.",
                    tags=["History", "Castle", "Coastline"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc3-d3-a4",
                    time_slot="Night",
                    time="07:30 PM - 10:30 PM",
                    title="Return to Barcelona & Group Cookout / Balcony Social",
                    category="Leisure",
                    description="Gather around the apartment kitchen to cook fresh market pastas, crack open local Priorat wines, and plan the next morning.",
                    location="Eixample Apartment Terrace, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.3935, lng=2.1648),
                    estimated_cost=15.0,
                    duration_hours=3.0,
                    tips="Play background Spanish guitar tunes; great bonding night after a high-energy water sports day.",
                    tags=["Social", "Apartment", "Group Bonding"],
                    booking_required=False
                )
            ]
        ),
        DayPlan(
            day_number=4,
            date="Day 4",
            title="Montserrat Mountain Monoliths & Sunset Catamaran Sail",
            theme="Sacred jagged mountain peaks, funicular railways & catamaran party sail",
            highlight="Group 2-hour private catamaran cruise along the Barcelona coastline with swimming",
            transit_advice="R5 train from Plaça d'Espanya to Aeri de Montserrat (cable car) or Cremallera (rack railway).",
            day_estimated_cost=85.0,
            activities=[
                ActivityItem(
                    id="sc3-d4-a1",
                    time_slot="Morning",
                    time="08:30 AM - 01:30 PM",
                    title="Montserrat Abbey & Sant Jeroni Peak Hike",
                    category="Attraction",
                    description="Surreal multi-peaked mountain range housing the Santa Maria de Montserrat Abbey. Take the Sant Joan funicular and hike up for views stretching to Mallorca.",
                    location="08199 Montserrat, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.5933, lng=1.8361),
                    estimated_cost=24.0,
                    duration_hours=5.0,
                    tips="Catch the famous Escolania boy's choir singing the Virolai at 1:00 PM if timing permits.",
                    tags=["Mountain", "Hiking", "Spiritual"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc3-d4-a2",
                    time_slot="Afternoon",
                    time="02:30 PM - 04:00 PM",
                    title="Late Spanish Lunch in Gràcia Neighborhood",
                    category="Dining",
                    description="Bohemian Gràcia district: sit at Plaça del Sol for gourmet burgers, patatas bravas, Catalan cheeses, and cold vermouth.",
                    location="Plaça del Sol, Gràcia, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.4019, lng=2.1565),
                    estimated_cost=20.0,
                    duration_hours=1.5,
                    tips="Gràcia's plazas are pedestrianized and perfect for big group tables.",
                    tags=["Local Neighborhood", "Outdoor Seating", "Gracia"],
                    booking_required=False
                ),
                ActivityItem(
                    id="sc3-d4-a3",
                    time_slot="Evening",
                    time="05:30 PM - 07:30 PM",
                    title="Sunset Catamaran Cruise with Music & Drinks",
                    category="Attraction",
                    description="Shared group catamaran cruise from Port Olímpic: lay on the giant forward nets, listen to chill summer beats, sip white sangria, and watch city skyline turn pink.",
                    location="Moll de Marina, Port Olímpic, Barcelona, Spain",
                    coordinates=Coordinates(lat=41.3856, lng=2.1969),
                    estimated_cost=35.0,
                    duration_hours=2.0,
                    tips="Includes 2 drinks and light snacks; jump into the open sea net when the boat anchors.",
                    tags=["Boat Party", "Sunset", "Highlight"],
                    booking_required=True
                ),
                ActivityItem(
                    id="sc3-d4-a4",
                    time_slot="Night",
                    time="09:00 PM - 01:00 AM",
                    title="Barceloneta Beach Club & Nightlife",
                    category="Nightlife",
                    description="Celebratory farewell night at iconic open-air beach clubs along Passeig Marítim (Opium, Shôko, or CDLC) dancing under palm trees.",
                    location="Passeig Marítim de la Barceloneta 34, Spain",
                    coordinates=Coordinates(lat=41.3837, lng=2.1953),
                    estimated_cost=30.0,
                    duration_hours=4.0,
                    tips="Book guest list or arrive before 11:30 PM for cheaper/free entry.",
                    tags=["Nightlife", "Beach Club", "Dancing"],
                    booking_required=False
                )
            ]
        )
    ]

    return Trip(
        id="scenario-3-group-barcelona",
        title="Group Adventure: Barcelona Culture & Costa Brava Thrills",
        destination="Barcelona & Costa Brava, Spain",
        start_date="2026-07-15",
        end_date="2026-07-19",
        total_days=4,
        trip_type="group",
        group_size=5,
        budget_level="moderate",
        budget_amount=750.0, # per person
        travel_style="fast-paced",
        interests=["Adventure", "Culture & History", "Food & Dining", "Nightlife", "Nature & Adventure"],
        accommodation_type="Shared Modern 4-Bedroom Eixample Apartment with Terrace",
        transportation_preference="T-Casual Metro & Coastal Group Van",
        overview="The ultimate stress-free multi-day group holiday coordinating schedule, shared budget, and mixed interests. Blends Gaudí's monumental architecture, competitive tapas hopping, sea kayaking along Costa Brava cliffs, and sunset catamaran sailing.",
        days=days,
        cost_breakdown=CostBreakdown(
            accommodation=260.0,
            dining=210.0,
            activities=160.0,
            transit=50.0,
            misc=40.0,
            total=720.0, # per person
            currency="USD"
        ),
        logistics=LogisticsAndPacking(
            weather_summary="Warm Mediterranean summer (26°C to 31°C), vibrant sunshine, warm evenings, sea temp ~23°C.",
            recommended_clothing=[
                "Light breathable cotton/linen tops and shorts",
                "Swimwear, boardshorts, and water shoes for rocky Costa Brava coves",
                "Comfortable walking shoes for steep Gothic Quarter cobblestones",
                "Smart-casual clubwear for beachfront nightlife"
            ],
            essential_items=[
                "Group Splitwise or Tricount app setup before departure",
                "Waterproof phone pouch for kayaking and catamaran trip",
                "High-SPF water-resistant sunscreen and sunglasses",
                "Power bank for long days away from the apartment"
            ],
            local_customs_and_tips=[
                "Watch out for pickpockets on La Rambla and crowded metro transfers — keep bags in front.",
                "Lunch runs from 2:00 PM to 4:00 PM; dinner begins after 9:00 PM.",
                "Split bills: Most tapas bars prefer one card payment or cash, so use Splitwise to balance group accounts."
            ],
            emergency_numbers={
                "General Emergencies": "112",
                "Mossos d'Esquadra (Catalan Police)": "088",
                "Tourist Police Station (Ciutat Vella)": "+34 932 562 430"
            }
        ),
        scenario_id="scenario_3"
    )

def get_demo_scenarios_dict() -> Dict[str, Trip]:
    return {
        "scenario_1": get_scenario_1_solo_weekend(),
        "scenario_2": get_scenario_2_couple_vacation(),
        "scenario_3": get_scenario_3_group_adventure(),
    }
