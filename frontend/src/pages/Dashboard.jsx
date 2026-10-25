import React from 'react';
import { useTrip } from '../context/TripContext';
import { HeroBanner } from '../components/HeroBanner';
import { ScenarioSelector } from '../components/ScenarioSelector';
import { 
  Calendar, MapPin, Users, DollarSign, Clock, ArrowRight, 
  Trash2, Sparkles, Compass, PlusCircle, CheckCircle2 
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    savedTrips, 
    setCurrentTrip, 
    setActiveTab, 
    setIsBuilderOpen,
    deleteTripById 
  } = useTrip();

  const handleOpenTrip = (trip) => {
    setCurrentTrip(trip);
    setActiveTab('itinerary');
  };

  return (
    <div>
      {/* SaaS Hero Section */}
      <HeroBanner />

      {/* Target Travel Scenarios Showcase */}
      <ScenarioSelector />

      {/* Saved Itineraries Hub */}
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Saved Itineraries
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              All cloud & local trip plans saved in your workspace ({savedTrips.length} available)
            </p>
          </div>

          <button
            onClick={() => setIsBuilderOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm self-start sm:self-auto shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>

        {savedTrips.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
            <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold text-sm">No saved trips yet.</p>
            <p className="text-slate-400 text-xs mt-1 mb-4">Start by launching one of the 3 scenarios above or building your own.</p>
            <button
              onClick={() => setIsBuilderOpen(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold"
            >
              Launch Smart Trip Builder
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTrips.map((trip) => {
              const totalCost = trip.cost_breakdown?.total || trip.budget_amount || 0;

              return (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-teal-400 transition-all flex flex-col justify-between group"
                >
                  <div className="p-5">
                    {/* Destination & Type */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{trip.destination}</span>
                      </div>

                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md capitalize">
                        {trip.trip_type}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base mb-2 group-hover:text-teal-800 transition-colors line-clamp-1">
                      {trip.title}
                    </h4>

                    <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
                      {trip.overview}
                    </p>

                    {/* Stats pills */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-2">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{trip.total_days} Days</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-teal-700">${totalCost.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenTrip(trip)}
                      className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                    >
                      <span>Open Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteTripById(trip.id)}
                      title="Delete trip"
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
