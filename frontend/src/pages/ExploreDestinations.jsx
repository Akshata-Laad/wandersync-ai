import React from 'react';
import { useTrip } from '../context/TripContext';
import { MapPin, Calendar, DollarSign, Sun, Compass, ArrowRight, Sparkles } from 'lucide-react';

export const ExploreDestinations = () => {
  const { popularDestinations, setIsBuilderOpen } = useTrip();

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold mb-2">
          Destination Guide & Inspiration
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Curated Global Destinations
        </h2>
        <p className="text-slate-600 text-sm max-w-2xl mt-1">
          Explore top-rated travel destinations, seasonal recommendations, and estimated daily budgets.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularDestinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={dest.image_url}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-teal-300">
                    {dest.country}
                  </span>
                  <h3 className="font-extrabold text-xl leading-tight">
                    {dest.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-xs font-semibold text-teal-800 italic mb-3">
                  "{dest.tagline}"
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {dest.description}
                </p>

                {/* Meta details */}
                <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Best Season:</span>
                    <span className="font-semibold text-slate-800">{dest.best_season}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Suggested Duration:</span>
                    <span className="font-semibold text-slate-800">{dest.suggested_days} Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Avg. Daily Budget:</span>
                    <span className="font-extrabold text-teal-700">${dest.average_daily_budget} / day</span>
                  </div>
                </div>

                {/* Popular interest tags */}
                <div className="flex flex-wrap gap-1">
                  {dest.popular_interests?.map((interest, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-5 pt-0">
              <button
                onClick={() => setIsBuilderOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Build Itinerary for {dest.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
