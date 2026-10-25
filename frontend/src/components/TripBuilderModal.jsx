import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { 
  X, Sparkles, MapPin, Calendar, Users, DollarSign, 
  Compass, Heart, Coffee, ShieldAlert, ArrowRight, Check,
  Utensils, Hotel, Car
} from 'lucide-react';

const INTEREST_OPTIONS = [
  'Food & Dining', 'Sightseeing', 'Culture & History', 
  'Nature & Adventure', 'Nightlife', 'Relaxation & Spa', 
  'Photography', 'Romantic Spots', 'Shopping', 'Local Markets'
];

const POPULAR_CHIPS = ['Tokyo', 'Amalfi Coast', 'Barcelona', 'Paris', 'Bali', 'Rome', 'New York'];

export const TripBuilderModal = () => {
  const { isBuilderOpen, setIsBuilderOpen, generateTrip, isLoading, generatingStatus } = useTrip();

  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('Kyoto, Japan');
  const [startDate, setStartDate] = useState('2026-11-10');
  const [endDate, setEndDate] = useState('2026-11-13');
  const [tripType, setTripType] = useState('solo');
  const [groupSize, setGroupSize] = useState(1);
  const [budgetLevel, setBudgetLevel] = useState('moderate');
  const [budgetAmount, setBudgetAmount] = useState('600');
  const [travelStyle, setTravelStyle] = useState('balanced');
  const [accommodationType, setAccommodationType] = useState('Boutique Hotel');
  const [interests, setInterests] = useState(['Food & Dining', 'Culture & History', 'Sightseeing']);
  const [transportationPreference, setTransportationPreference] = useState('Public Transit & Walking');
  const [customNotes, setCustomNotes] = useState('');

  if (!isBuilderOpen) return null;

  const toggleInterest = (tag) => {
    if (interests.includes(tag)) {
      setInterests(interests.filter(i => i !== tag));
    } else {
      setInterests([...interests, tag]);
    }
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    if (type === 'solo') setGroupSize(1);
    else if (type === 'couple') setGroupSize(2);
    else if (type === 'group' && groupSize < 3) setGroupSize(4);
    else if (type === 'family' && groupSize < 3) setGroupSize(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      destination,
      start_date: startDate,
      end_date: endDate,
      trip_type: tripType,
      group_size: parseInt(groupSize, 10),
      budget_level: budgetLevel,
      budget_amount: budgetAmount ? parseFloat(budgetAmount) : undefined,
      travel_style: travelStyle,
      accommodation_type: accommodationType,
      interests,
      transportation_preference: transportationPreference,
      custom_notes: customNotes
    };

    try {
      await generateTrip(payload);
    } catch {
      // Handled in context
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Smart Trip Builder</h3>
              <p className="text-xs text-slate-300">Generative AI Personalized Itinerary Engine</p>
            </div>
          </div>
          <button
            onClick={() => setIsBuilderOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin" />
              <Compass className="w-8 h-8 text-teal-600 absolute inset-0 m-auto animate-pulse" />
            </div>
            <h4 className="font-extrabold text-xl text-slate-900 mb-2">
              Generating Your Custom Itinerary
            </h4>
            <p className="text-sm text-teal-700 font-medium animate-pulse max-w-md">
              {generatingStatus || 'Optimizing travel routes, curated dining & daily timing...'}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>Synthesizing attractions & realistic local pricing</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Step 1: Destination & Dates */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b pb-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">1</span>
              <span>Where & When are you traveling?</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Destination</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Kyoto, Japan or Florence, Italy"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                />
              </div>

              {/* Popular chips */}
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[11px] text-slate-400 font-medium">Popular:</span>
                {POPULAR_CHIPS.map(chip => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setDestination(chip)}
                    className="px-2 py-0.5 rounded-md text-xs bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Trip Type & Party Size */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b pb-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">2</span>
              <span>Traveler Style & Party Size</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'solo', label: 'Solo', icon: '👤' },
                { id: 'couple', label: 'Couple', icon: '💑' },
                { id: 'group', label: 'Group', icon: '👥' },
                { id: 'family', label: 'Family', icon: '👨‍👩‍👧' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTripTypeChange(item.id)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    tripType === item.id
                      ? 'border-teal-600 bg-teal-50/70 text-teal-800 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-base mb-0.5">{item.icon}</div>
                  <div className="text-xs">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Stepper for group size */}
            {['group', 'family'].includes(tripType) && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-slate-700">Number of Travelers in Group:</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGroupSize(Math.max(2, groupSize - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-slate-900 w-4 text-center">{groupSize}</span>
                  <button
                    type="button"
                    onClick={() => setGroupSize(Math.min(12, groupSize + 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 flex items-center justify-center hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Budget & Pacing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b pb-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">3</span>
              <span>Budget & Pacing</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'budget', label: 'Budget ($)', desc: 'Affordable, hostels & metro' },
                { id: 'moderate', label: 'Moderate ($$)', desc: 'Balanced boutique stays' },
                { id: 'luxury', label: 'Luxury ($$$)', desc: 'Premium 5-star & private' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBudgetLevel(item.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    budgetLevel === item.id
                      ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>

            {/* Travel Pace */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Travel Pacing</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'relaxed', label: 'Relaxed', desc: 'Fewer stops, lazy mornings' },
                  { id: 'balanced', label: 'Balanced', desc: 'Mix of sights & downtime' },
                  { id: 'fast-paced', label: 'Packed', desc: 'See everything possible' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTravelStyle(item.id)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      travelStyle === item.id
                        ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[10px] text-slate-500">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4: Interests & Vibes */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b pb-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">4</span>
              <span>Interests & Vibes</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {INTEREST_OPTIONS.map(opt => {
                const selected = interests.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleInterest(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                      selected
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3" />}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Special Preferences / Custom Notes</label>
              <textarea
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Vegetarian dining preference, love photography at golden hour, prefer walking..."
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsBuilderOpen(false)}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !destination}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-teal-600/25 transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Itinerary</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
