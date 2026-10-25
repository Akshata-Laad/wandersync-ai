import React from 'react';
import { useTrip } from '../context/TripContext';
import { Compass, Sparkles, Plus, MapPin, Database, CloudCheck, Layers, Calendar, Luggage } from 'lucide-react';

export const Navbar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setIsBuilderOpen, 
    savedTrips, 
    backendHealth,
    currentTrip
  } = useTrip();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-teal-900 to-teal-700 bg-clip-text text-transparent">
                  WanderSync
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-teal-100 text-teal-800 rounded-md border border-teal-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Personalized Itinerary Planner
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              Scenarios & Hub
            </button>

            {currentTrip && (
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'itinerary'
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Active Trip ({currentTrip.destination.split(',')[0]})
              </button>
            )}

            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'explore'
                  ? 'bg-teal-50 text-teal-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Destinations
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Supabase status badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-slate-100 border border-slate-200 text-slate-600">
              <span className={`w-2 h-2 rounded-full ${backendHealth.supabase_connected ? 'bg-emerald-500 animate-pulse' : 'bg-teal-500'}`} />
              <span>{backendHealth.supabase_connected ? 'Supabase Connected' : 'Hybrid Local / Cloud DB'}</span>
            </div>

            {/* Smart Trip Builder CTA */}
            <button
              onClick={() => setIsBuilderOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 active:scale-95 transition-all text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Smart Trip Builder</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
