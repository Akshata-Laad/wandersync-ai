import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { DayCard } from './DayCard';
import { InteractiveMap } from './InteractiveMap';
import { BudgetOverview } from './BudgetOverview';
import { PackingLogistics } from './PackingLogistics';
import { ShareModal } from './ShareModal';
import { EditActivityModal } from './EditActivityModal';
import { SCENARIO_PRESETS } from '../data/presetScenarios';
import { 
  Calendar, MapPin, Users, DollarSign, Clock, Share2, 
  Sparkles, Layers, Map, PieChart, Luggage, ArrowLeft,
  ChevronRight, Heart, User, Compass
} from 'lucide-react';

export const ItineraryView = () => {
  const { 
    currentTrip, 
    setActiveTab, 
    regenerateDayPlan, 
    regenerateSingleActivity, 
    updateTripDetails,
    loadScenario
  } = useTrip();

  const [subTab, setSubTab] = useState('days'); // 'days', 'map', 'budget', 'logistics'
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [editingDayNumber, setEditingDayNumber] = useState(null);

  if (!currentTrip) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
        <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-bounce" />
        <h3 className="font-bold text-xl text-slate-800 mb-2">No Active Itinerary Selected</h3>
        <p className="text-slate-500 text-sm mb-6">Choose one of the 3 scenarios or create a new trip with our AI trip builder.</p>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-5 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm"
        >
          View Dashboard & Scenarios
        </button>
      </div>
    );
  }

  const handleEditActivity = (activity, dayNumber) => {
    setEditingActivity(activity);
    setEditingDayNumber(dayNumber);
  };

  const handleSaveActivity = (updatedActivity, dayNumber) => {
    const updatedTrip = { ...currentTrip };
    const day = updatedTrip.days.find(d => d.day_number === dayNumber);
    if (day) {
      const idx = day.activities.findIndex(a => a.id === updatedActivity.id);
      if (idx !== -1) {
        day.activities[idx] = updatedActivity;
        day.day_estimated_cost = day.activities.reduce((sum, a) => sum + (a.estimated_cost || 0), 0);
        updateTripDetails(updatedTrip);
      }
    }
  };

  const getTripTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'solo': return <User className="w-3.5 h-3.5 text-emerald-600" />;
      case 'couple': return <Heart className="w-3.5 h-3.5 text-rose-600" />;
      case 'group': return <Users className="w-3.5 h-3.5 text-indigo-600" />;
      default: return <Users className="w-3.5 h-3.5 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Breadcrumb & Scenario Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="hover:text-teal-700 flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-teal-800 font-bold">{currentTrip.destination}</span>
        </div>

        {/* Quick Scenario Jumper */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Jump to Scenario:
          </span>
          {SCENARIO_PRESETS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => loadScenario(sc.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                currentTrip.scenario_id === sc.id
                  ? 'bg-teal-600 text-white font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{sc.tag}:</span>
              <span>{sc.destination.split(',')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Trip Banner */}
      <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden shadow-xl border border-slate-800 p-6 sm:p-10">
        <div className="relative z-10 max-w-3xl">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center gap-1.5">
              {getTripTypeIcon(currentTrip.trip_type)}
              <span className="capitalize">{currentTrip.trip_type} Travel</span>
              {currentTrip.group_size > 1 && <span>({currentTrip.group_size} travelers)</span>}
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/10">
              {currentTrip.total_days} Days
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/10 capitalize">
              {currentTrip.travel_style} Pace
            </span>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 capitalize">
              {currentTrip.budget_level} Tier
            </span>
          </div>

          {/* Trip Title & Destination */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2">
            {currentTrip.title}
          </h1>

          <div className="flex items-center gap-2 text-teal-300 text-sm font-semibold mb-4">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{currentTrip.destination}</span>
            <span className="text-slate-400">•</span>
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{currentTrip.start_date} to {currentTrip.end_date}</span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
            {currentTrip.overview}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-teal-500/20"
            >
              <Share2 className="w-4 h-4" />
              <span>Share & Export</span>
            </button>

            {currentTrip.interests && currentTrip.interests.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {currentTrip.interests.slice(0, 4).map((tag, idx) => (
                  <span key={idx} className="text-[11px] bg-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex items-center border-b border-slate-200 overflow-x-auto gap-2 text-sm font-semibold">
        <button
          onClick={() => setSubTab('days')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            subTab === 'days'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Day-by-Day Timeline</span>
          <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-slate-100 text-slate-600">
            {currentTrip.days.length}
          </span>
        </button>

        <button
          onClick={() => setSubTab('map')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            subTab === 'map'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Map className="w-4 h-4" />
          <span>Interactive Route Map</span>
        </button>

        <button
          onClick={() => setSubTab('budget')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            subTab === 'budget'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Budget & Expenses</span>
        </button>

        <button
          onClick={() => setSubTab('logistics')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            subTab === 'logistics'
              ? 'border-teal-600 text-teal-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Luggage className="w-4 h-4" />
          <span>Weather & Packing</span>
        </button>
      </div>

      {/* Tab Panels */}
      {subTab === 'days' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {currentTrip.days.map((day) => (
            <DayCard
              key={day.day_number}
              day={day}
              onRegenerateDay={regenerateDayPlan}
              onRegenerateActivity={regenerateSingleActivity}
              onEditActivity={handleEditActivity}
            />
          ))}
        </div>
      )}

      {subTab === 'map' && (
        <div className="animate-in fade-in duration-200">
          <InteractiveMap trip={currentTrip} />
        </div>
      )}

      {subTab === 'budget' && (
        <div className="animate-in fade-in duration-200">
          <BudgetOverview trip={currentTrip} />
        </div>
      )}

      {subTab === 'logistics' && (
        <div className="animate-in fade-in duration-200">
          <PackingLogistics trip={currentTrip} />
        </div>
      )}

      {/* Share & Export Modal */}
      <ShareModal
        trip={currentTrip}
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Edit Activity Modal */}
      <EditActivityModal
        activity={editingActivity}
        dayNumber={editingDayNumber}
        isOpen={!!editingActivity}
        onClose={() => setEditingActivity(null)}
        onSave={handleSaveActivity}
      />

    </div>
  );
};
